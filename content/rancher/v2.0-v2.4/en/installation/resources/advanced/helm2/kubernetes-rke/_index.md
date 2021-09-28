---
title: "2. Install Kubernetes with RKE"
weight: 190
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/helm2/kubernetes-rke
  - /rancher/v2.x/en/installation/resources/advanced/helm2/kubernetes-rke/
---

Use RKE to install Kubernetes with a high availability etcd configuration.

>**Note:** For systems without direct internet access see [Air Gap: Kubernetes install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/air-gap-high-availability/) for install details.

### Create the `rancher-cluster.yml` File

Using the sample below create the `rancher-cluster.yml` file. Replace the IP Addresses in the `nodes` list with the IP address or DNS names of the 3 nodes you created.

> **Note:**  If your node has public and internal addresses, it is recommended to set the `internal_address:` so Kubernetes will use it for intra-cluster communication.  Some services like AWS EC2 require setting the `internal_address:` if you want to use self-referencing security groups or firewalls.


```yaml
nodes:
  - address: 165.227.114.63
    internal_address: 172.16.22.12
    user: ubuntu
    role: [controlplane,worker,etcd]
  - address: 165.227.116.167
    internal_address: 172.16.32.37
    user: ubuntu
    role: [controlplane,worker,etcd]
  - address: 165.227.127.226
    internal_address: 172.16.42.73
    user: ubuntu
    role: [controlplane,worker,etcd]

services:
  etcd:
    snapshot: true
    creation: 6h
    retention: 24h
```

#### Common RKE Nodes Options

| Option | Required | Description |
| --- | --- | --- |
| `address` | yes | The public DNS or IP address |
| `user` | yes | A user that can run docker commands |
| `role` | yes | List of Kubernetes roles assigned to the node |
| `internal_address` | no | The private DNS or IP address for internal cluster traffic |
| `ssh_key_path` | no | Path to SSH private key used to authenticate to the node (defaults to `~/.ssh/id_rsa`) |

#### Advanced Configurations

RKE has many configuration options for customizing the install to suit your specific environment.

Please see the [RKE Documentation]({{<baseurl>}}/rke/latest/en/config-options/) for the full list of options and capabilities.

For tuning your etcd cluster for larger Rancher installations see the [etcd settings guide]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/etcd/).

### Run RKE

```
rke up --config ./rancher-cluster.yml
```

When finished, it should end with the line: `Finished building Kubernetes cluster successfully`.

### Testing Your Cluster

RKE should have created a file `kube_config_rancher-cluster.yml`. This file has the credentials for `kubectl` and `helm`.

> **Note:** If you have used a different file name from `rancher-cluster.yml`, then the kube config file will be named `kube_config_<FILE_NAME>.yml`.

You can copy this file to `$HOME/.kube/config` or if you are working with multiple Kubernetes clusters, set the `KUBECONFIG` environmental variable to the path of `kube_config_rancher-cluster.yml`.

```
export KUBECONFIG=$(pwd)/kube_config_rancher-cluster.yml
```

Test your connectivity with `kubectl` and see if all your nodes are in `Ready` state.

```
kubectl get nodes

NAME                          STATUS    ROLES                      AGE       VERSION
165.227.114.63                Ready     controlplane,etcd,worker   11m       v1.13.5
165.227.116.167               Ready     controlplane,etcd,worker   11m       v1.13.5
165.227.127.226               Ready     controlplane,etcd,worker   11m       v1.13.5
```

### Check the Health of Your Cluster Pods

Check that all the required pods and containers are healthy are ready to continue.

* Pods are in `Running` or `Completed` state.
* `READY` column shows all the containers are running (i.e. `3/3`) for pods with `STATUS` `Running`
* Pods with `STATUS` `Completed` are run-once Jobs. For these pods `READY` should be `0/1`.

```
kubectl get pods --all-namespaces

NAMESPACE       NAME                                      READY     STATUS      RESTARTS   AGE
ingress-nginx   nginx-ingress-controller-tnsn4            1/1       Running     0          30s
ingress-nginx   nginx-ingress-controller-tw2ht            1/1       Running     0          30s
ingress-nginx   nginx-ingress-controller-v874b            1/1       Running     0          30s
kube-system     canal-jp4hz                               3/3       Running     0          30s
kube-system     canal-z2hg8                               3/3       Running     0          30s
kube-system     canal-z6kpw                               3/3       Running     0          30s
kube-system     kube-dns-7588d5b5f5-sf4vh                 3/3       Running     0          30s
kube-system     kube-dns-autoscaler-5db9bbb766-jz2k6      1/1       Running     0          30s
kube-system     metrics-server-97bc649d5-4rl2q            1/1       Running     0          30s
kube-system     rke-ingress-controller-deploy-job-bhzgm   0/1       Completed   0          30s
kube-system     rke-kubedns-addon-deploy-job-gl7t4        0/1       Completed   0          30s
kube-system     rke-metrics-addon-deploy-job-7ljkc        0/1       Completed   0          30s
kube-system     rke-network-plugin-deploy-job-6pbgj       0/1       Completed   0          30s
```

### Save Your Files

> **Important**
> The files mentioned below are needed to maintain, troubleshoot and upgrade your cluster.

Save a copy of the following files in a secure location:

- `rancher-cluster.yml`: The RKE cluster configuration file.
- `kube_config_rancher-cluster.yml`: The [Kubeconfig file]({{<baseurl>}}/rke/latest/en/kubeconfig/) for the cluster, this file contains credentials for full access to the cluster.
- `rancher-cluster.rkestate`: The [Kubernetes Cluster State file]({{<baseurl>}}/rke/latest/en/installation/#kubernetes-cluster-state), this file contains credentials for full access to the cluster.<br/><br/>_The Kubernetes Cluster State file is only created when using RKE v0.2.0 or higher._

> **Note:** The "rancher-cluster" parts of the two latter file names are dependent on how you name the RKE cluster configuration file.

### Issues or errors?

See the [Troubleshooting]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/kubernetes-rke/troubleshooting/) page.

### [Next: Initialize Helm (Install tiller)]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/helm-init/)
