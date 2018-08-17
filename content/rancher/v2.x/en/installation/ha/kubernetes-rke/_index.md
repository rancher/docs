---
title: 2 - Install Kubernetes with RKE
weight: 190
---

Use RKE to install Kubernetes with a high-availability etcd configuration.

### Create the rancher-cluster.yml file

Using the sample below create the `rancher-cluster.yml` file. Replace the IP Addresses in the `nodes` list with the IP address or DNS names of the 3 Nodes you created.

```yaml
nodes:
- address: 165.227.114.63
  user: ubuntu
  role: [controlplane,worker,etcd]
- address: 165.227.116.167
  user: ubuntu
  role: [controlplane,worker,etcd]
- address: 165.227.127.226
  user: ubuntu
  role: [controlplane,worker,etcd]
```

#### Common RKE nodes: options

| Option | Description |
| --- | --- |
| `address` | (required) The public DNS or IP address |
| `internal_address` | (optional) The private DNS or IP address for internal cluster traffic |
| `role` | (required) List of Kubernetes roles assigned to the node |
| `ssh_key_path` | (optional) Path to SSH private key used to authenticate to the node |
| `user` | (required) A user that can run docker commands |

<br/>

#### Advanced configurations

RKE has many configuration options for customizing the install to suit your specific environment. Here are some common advanced scenarios.

* [System Images for Air Gap Network]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/)
* [Private Docker Image Registry]({{< baseurl >}}/rke/v0.1.x/en/config-options/private-registries/)

Please see the [RKE Documentation]({{< baseurl >}}/rke/v0.1.x/en/) for the full list of options and capabilities.

### Run RKE

```
rke up --config ./rancher-cluster.yml
```

### Testing your cluster

RKE should have created a file `kube_config_rancher-cluster.yml`. This file has the credentials for `kubectl` and `helm`.

You can copy this file to `$HOME/.kube/config` or if you are working with multiple Kubernetes clusters, set the `KUBECONFIG` environmental variable to the path of `kube_config_rancher-cluster.yml`.

```
export KUBECONFIG=$(pwd)/kube_config_rancher-cluster.yml
```

Test you connectivity with `kubectl` and see if you can get the list of nodes back.

```
kubectl get nodes

NAME                          STATUS    ROLES                      AGE       VERSION
165.227.114.63                Ready     controlplane,etcd,worker   11m       v1.10.1
165.227.116.167               Ready     controlplane,etcd,worker   11m       v1.10.1
165.227.127.226               Ready     controlplane,etcd,worker   11m       v1.10.1
```

### Save your files

Save a copy of the `kube_config_rancher-cluster.yml` and `rancher-cluster.yml` files. You will need these files to maintain and upgrade your Rancher instance.

### Issues or errors?

See the [Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/troubleshooting/) page.

### [Next: Initialize Helm]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/)