---
title: Setting up a High-availability RKE Kubernetes Cluster
shortTitle: Set up RKE Kubernetes
weight: 3
---


This section describes how to install a Kubernetes cluster. This cluster should be dedicated to run only the Rancher server.

:::note

Rancher can run on any Kubernetes cluster, included hosted Kubernetes solutions such as Amazon EKS. The below instructions represent only one possible way to install Kubernetes.

:::

For systems without direct internet access, refer to [Air Gap: Kubernetes install.](../../../pages-for-subheaders/air-gapped-helm-cli-install.md)

:::tip Single-node Installation Tip:

In a single-node Kubernetes cluster, the Rancher server does not have high availability, which is important for running Rancher in production. However, installing Rancher on a single-node cluster can be useful if you want to save resources by using a single node in the short term, while preserving a high-availability migration path.

To set up a single-node RKE cluster, configure only one node in the `cluster.yml` . The single node should have all three roles: `etcd`, `controlplane`, and `worker`.

In both single-node setups, Rancher can be installed with Helm on the Kubernetes cluster in the same way that it would be installed on any other cluster.

:::

# Installing Kubernetes

### Required CLI Tools

Install [kubectl,](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) a Kubernetes command-line tool.

Also install [RKE,](https://rancher.com/docs/rke/latest/en/installation/) the Rancher Kubernetes Engine, a Kubernetes distribution and command-line tool.

### 1. Create the cluster configuration file

In this section, you will create a Kubernetes cluster configuration file called `rancher-cluster.yml`. In a later step, when you set up the cluster with an RKE command, it will use this file to install Kubernetes on your nodes.

Using the sample below as a guide, create the `rancher-cluster.yml` file. Replace the IP addresses in the `nodes` list with the IP address or DNS names of the 3 nodes you created.

If your node has public and internal addresses, it is recommended to set the `internal_address:` so Kubernetes will use it for intra-cluster communication. Some services like AWS EC2 require setting the `internal_address:` if you want to use self-referencing security groups or firewalls.

RKE will need to connect to each node over SSH, and it will look for a private key in the default location of `~/.ssh/id_rsa`. If your private key for a certain node is in a different location than the default, you will also need to configure the `ssh_key_path` option for that node.

```yaml
nodes:
  - address: 165.227.114.63
    internal_address: 172.16.22.12
    user: ubuntu
    role: [controlplane, worker, etcd]
  - address: 165.227.116.167
    internal_address: 172.16.32.37
    user: ubuntu
    role: [controlplane, worker, etcd]
  - address: 165.227.127.226
    internal_address: 172.16.42.73
    user: ubuntu
    role: [controlplane, worker, etcd]

services:
  etcd:
    snapshot: true
    creation: 6h
    retention: 24h

# Required for external TLS termination with
# ingress-nginx v0.22+
ingress:
  provider: nginx
  options:
    use-forwarded-headers: "true"
```

<figcaption>Common RKE Nodes Options</figcaption>

| Option             | Required | Description                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| `address`          | yes      | The public DNS or IP address                                                           |
| `user`             | yes      | A user that can run docker commands                                                    |
| `role`             | yes      | List of Kubernetes roles assigned to the node                                          |
| `internal_address` | no       | The private DNS or IP address for internal cluster traffic                             |
| `ssh_key_path`     | no       | Path to SSH private key used to authenticate to the node (defaults to `~/.ssh/id_rsa`) |

:::note Advanced Configurations:

RKE has many configuration options for customizing the install to suit your specific environment.

Please see the [RKE Documentation](https://rancher.com/docs/rke/latest/en/config-options/) for the full list of options and capabilities.
 
For tuning your etcd cluster for larger Rancher installations, see the [etcd settings guide](../../../getting-started/installation-and-upgrade/advanced-options/advanced-use-cases/tune-etcd-for-large-installs.md).

For more information regarding Dockershim support, refer to [this page](../../../getting-started/installation-and-upgrade/installation-requirements/dockershim.md)

:::

### 2. Run RKE

```
rke up --config ./rancher-cluster.yml
```

When finished, it should end with the line: `Finished building Kubernetes cluster successfully`.

### 3. Test Your Cluster

This section describes how to set up your workspace so that you can interact with this cluster using the `kubectl` command-line tool.

Assuming you have installed `kubectl`, you need to place the `kubeconfig` file in a location where `kubectl` can reach it. The `kubeconfig` file contains the credentials necessary to access your cluster with `kubectl`.

When you ran `rke up`, RKE should have created a `kubeconfig` file named `kube_config_cluster.yml`. This file has the credentials for `kubectl` and `helm`.

:::note

If you have used a different file name from `rancher-cluster.yml`, then the kube config file will be named `kube_config_<FILE_NAME>.yml`.

:::

Move this file to `$HOME/.kube/config`, or if you are working with multiple Kubernetes clusters, set the `KUBECONFIG` environmental variable to the path of `kube_config_cluster.yml`:

```
export KUBECONFIG=$(pwd)/kube_config_cluster.yml
```

Test your connectivity with `kubectl` and see if all your nodes are in `Ready` state:

```
kubectl get nodes

NAME                          STATUS    ROLES                      AGE       VERSION
165.227.114.63                Ready     controlplane,etcd,worker   11m       v1.13.5
165.227.116.167               Ready     controlplane,etcd,worker   11m       v1.13.5
165.227.127.226               Ready     controlplane,etcd,worker   11m       v1.13.5
```

### 4. Check the Health of Your Cluster Pods

Check that all the required pods and containers are healthy are ready to continue.

- Pods are in `Running` or `Completed` state.
- `READY` column shows all the containers are running (i.e. `3/3`) for pods with `STATUS` `Running`
- Pods with `STATUS` `Completed` are run-once Jobs. For these pods `READY` should be `0/1`.

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

This confirms that you have successfully installed a Kubernetes cluster that the Rancher server will run on.

### 5. Save Your Files

:::note Important:

The files mentioned below are needed to maintain, troubleshoot and upgrade your cluster.

:::

Save a copy of the following files in a secure location:

- `rancher-cluster.yml`: The RKE cluster configuration file.
- `kube_config_cluster.yml`: The [Kubeconfig file](https://rancher.com/docs/rke/latest/en/kubeconfig/) for the cluster, this file contains credentials for full access to the cluster.
- `rancher-cluster.rkestate`: The [Kubernetes Cluster State file](https://rancher.com/docs/rke/latest/en/installation/#kubernetes-cluster-state), this file contains credentials for full access to the cluster.<br/><br/>_The Kubernetes Cluster State file is only created when using RKE v0.2.0 or higher._

:::note

The "rancher-cluster" parts of the two latter file names are dependent on how you name the RKE cluster configuration file.

:::

### Issues or errors?

See the [Troubleshooting](../../../getting-started/installation-and-upgrade/install-upgrade-on-a-kubernetes-cluster/troubleshooting.md) page.


### [Next: Install Rancher](../../../pages-for-subheaders/install-upgrade-on-a-kubernetes-cluster.md)

