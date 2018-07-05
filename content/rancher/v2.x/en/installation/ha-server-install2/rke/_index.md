---
title: 3 - Install Kubernetes with RKE
weight: 276
---

Configure the RKE `cluster.yml` and run `rke` to install Kubernetes with a HA `etcd` install.

### Create a `cluster.yml` File

Using the sample below create a `cluster.yml` file. Replace the IP Addresses in the `nodes` list with the IP address or DNS names of the 3 Nodes you created.

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
  # internal_address: 10.10.0.1
  # ssh_key_path: /home/user/.ssh/id_rsa
```

#### Common RKE Options

| Option | Description |
| --- | --- |
| `address` | (required) The public DNS or IP address |
| `internal_address` | (optional) The private DNS or IP address for internal cluster traffic |
| `role` | (required) List of Kubernetes roles assigned to the node |
| `ssh_key_path` | (optional) Path to SSH private key used to authenticate to the node |
| `user` | (required) A user that can run docker commands |

<br/>

#### Advanced Configurations

RKE has many configuration options for customizing the install to suit your specific environment. Here are some common advanced scenarios.

* [SSH Bastion/Jump Server]({{< baseurl >}}/rke/v0.1.x/en/config-options/bastion-host/)
* [System Images for Air Gap Network]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/)
* [Private Docker Image Registry]({{< baseurl >}}/rke/v0.1.x/en/config-options/private-registries/)

Please see the [RKE Documentation]({{< baseurl >}}/rke/v0.1.x/en/) for the full list of options and capabilities.

### Run RKE

```
rke up --config ./cluster.yaml
```

### Testing your cluster

`rke` should have created a file `kube_config_cluster.yml`. This file has the credentials for `kubectl` and `helm`.

You can copy this file to `$HOME/.kube/config` or if you are working with multiple Kubernetes clusters, set`KUBECONFIG` environmental variable to the path of `kube_config_cluster.yml`.

```
export KUBECONFIG=$(pwd)/kube_config_cluster.yml
```

Test you connectivity with `kubectl` and see if you can get the list of nodes back.

```
kubectl get nodes

NAME                          STATUS    ROLES                      AGE       VERSION
165.227.114.63                Ready     controlplane,etcd,worker   11m       v1.10.1
165.227.116.167               Ready     controlplane,etcd,worker   11m       v1.10.1
165.227.127.226               Ready     controlplane,etcd,worker   11m       v1.10.1
```
