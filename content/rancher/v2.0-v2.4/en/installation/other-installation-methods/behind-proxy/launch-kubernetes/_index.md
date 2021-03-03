---
title: '2. Install Kubernetes'
weight: 200
---

Once the infrastructure is ready, you can continue with setting up an RKE cluster to install Rancher in.

### Installing Docker

First, you have to install Docker and setup the HTTP proxy on all three Linux nodes. For this perform the following steps on all three nodes.

For convenience export the IP address and port of your proxy into an environment variable and set up the HTTP_PROXY variables for your current shell:

```
export proxy_host="10.0.0.5:8888"
export HTTP_PROXY=http://${proxy_host}
export HTTPS_PROXY=http://${proxy_host}
export NO_PROXY=127.0.0.0/8,10.0.0.0/8,cattle-system.svc,172.16.0.0/12,192.168.0.0/16
```

Next configure apt to use this proxy when installing packages. If you are not using Ubuntu, you have to adapt this step accordingly:

```
cat <<'EOF' | sudo tee /etc/apt/apt.conf.d/proxy.conf > /dev/null
Acquire::http::Proxy "http://${proxy_host}/";
Acquire::https::Proxy "http://${proxy_host}/";
EOF
```

Now you can install Docker:

```
curl -sL https://releases.rancher.com/install-docker/19.03.sh | sh
```

Then ensure that your current user is able to access the Docker daemon without sudo:

```
sudo usermod -aG docker YOUR_USERNAME
```

And configure the Docker daemon to use the proxy to pull images:

```
sudo mkdir -p /etc/systemd/system/docker.service.d
cat <<'EOF' | sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf > /dev/null
[Service]
Environment="HTTP_PROXY=http://${proxy_host}"
Environment="HTTPS_PROXY=http://${proxy_host}"
Environment="NO_PROXY=127.0.0.0/8,10.0.0.0/8,cattle-system.svc,172.16.0.0/12,192.168.0.0/16"
EOF
```

To apply the configuration, restart the Docker daemon:

```
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### Creating the RKE Cluster

You need several command line tools on the host where you have SSH access to the Linux nodes to create and interact with the cluster:

*  [RKE CLI binary]({{<baseurl>}}/rke/latest/en/installation/#download-the-rke-binary)

```
sudo curl -fsSL -o /usr/local/bin/rke https://github.com/rancher/rke/releases/download/v1.1.4/rke_linux-amd64
sudo chmod +x /usr/local/bin/rke
```

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

```
curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```

* [helm](https://helm.sh/docs/intro/install/)

```
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod +x get_helm.sh
sudo ./get_helm.sh
```

Next, create a YAML file that describes the RKE cluster. Ensure that the IP addresses of the nodes and the SSH username are correct. For more information on the cluster YAML, have a look at the [RKE documentation]({{<baseurl>}}/rke/latest/en/example-yamls/).

```
nodes:
  - address: 10.0.1.200
    user: ubuntu
    role: [controlplane,worker,etcd]
  - address: 10.0.1.201
    user: ubuntu
    role: [controlplane,worker,etcd]
  - address: 10.0.1.202
    user: ubuntu
    role: [controlplane,worker,etcd]

services:
  etcd:
    backup_config:
      interval_hours: 12
      retention: 6
```

After that, you can create the Kubernetes cluster by running:

```
rke up --config rancher-cluster.yaml
```

RKE creates a state file called `rancher-cluster.rkestate`, this is needed if you want to perform updates, modify your cluster configuration or restore it from a backup. It also creates a `kube_config_rancher-cluster.yaml` file, that you can use to connect to the remote Kubernetes cluster locally with tools like kubectl or Helm. Make sure to save all of these files in a secure location, for example by putting them into a version control system.

To have a look at your cluster run:

```
export KUBECONFIG=kube_config_rancher-cluster.yaml
kubectl cluster-info
kubectl get pods --all-namespaces
```

You can also verify that your external load balancer works, and the DNS entry is set up correctly. If you send a request to either, you should receive HTTP 404 response from the ingress controller:

```
$ curl 10.0.1.100
default backend - 404
$ curl rancher.example.com
default backend - 404
```

### Save Your Files

> **Important**
> The files mentioned below are needed to maintain, troubleshoot and upgrade your cluster.

Save a copy of the following files in a secure location:

- `rancher-cluster.yml`: The RKE cluster configuration file.
- `kube_config_rancher-cluster.yml`: The [Kubeconfig file]({{<baseurl>}}/rke/latest/en/kubeconfig/) for the cluster, this file contains credentials for full access to the cluster.
- `rancher-cluster.rkestate`: The [Kubernetes Cluster State file]({{<baseurl>}}/rke/latest/en/installation/#kubernetes-cluster-state), this file contains the current state of the cluster including the RKE configuration and the certificates.

> **Note:** The "rancher-cluster" parts of the two latter file names are dependent on how you name the RKE cluster configuration file.

### Issues or errors?

See the [Troubleshooting]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/troubleshooting/) page.

### [Next: Install Rancher](../install-rancher)
