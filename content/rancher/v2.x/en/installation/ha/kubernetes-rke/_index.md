---
title: 2—Install Kubernetes with RKE
weight: 190
---

Use RKE to install Kubernetes with a high availability etcd configuration.

### Create the `rancher-cluster.yml` File

Using the sample below create the `rancher-cluster.yml` file. Replace the IP Addresses in the `nodes` list with the IP address or DNS names of the 3 Nodes you created.

> **Notes:** 
>
>- Air Gap User? [Add a private registry section]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/#add-private-registry-to-rke-yaml) to the sample below.
>- If your node has public and internal addresses, it is recommended to set the `internal_address:` so Kubernetes will use it for intra-cluster communication.  Some services like AWS EC2 require setting the `internal_address:` if you want to use self-referencing security groups or firewalls.


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
```

#### Common RKE Nodes: Options

| Option | Description |
| --- | --- |
| `address` | (required) The public DNS or IP address |
| `internal_address` | (optional) The private DNS or IP address for internal cluster traffic |
| `role` | (required) List of Kubernetes roles assigned to the node |
| `ssh_key_path` | (optional) Path to SSH private key used to authenticate to the node |
| `user` | (required) A user that can run docker commands |

#### Advanced Configurations

RKE has many configuration options for customizing the install to suit your specific environment.

Please see the [RKE Documentation]({{< baseurl >}}/rke/v0.1.x/en/) for the full list of options and capabilities.

### Run RKE

```
rke up --config ./rancher-cluster.yml
```

### Testing Your Cluster

RKE should have created a file `kube_config_rancher-cluster.yml`. This file has the credentials for `kubectl` and `helm`.

You can copy this file to `$HOME/.kube/config` or if you are working with multiple Kubernetes clusters, set the `KUBECONFIG` environmental variable to the path of `kube_config_rancher-cluster.yml`.

```
export KUBECONFIG=$(pwd)/kube_config_rancher-cluster.yml
```

Test your connectivity with `kubectl` and see if you can get the list of nodes back.

```
kubectl get nodes

NAME                          STATUS    ROLES                      AGE       VERSION
165.227.114.63                Ready     controlplane,etcd,worker   11m       v1.10.1
165.227.116.167               Ready     controlplane,etcd,worker   11m       v1.10.1
165.227.127.226               Ready     controlplane,etcd,worker   11m       v1.10.1
```

### Check the Health of Your Cluster Pods

Check that all the required pods and containers are healthy are ready to continue.

* Pods are in `Running` or `Completed` state.
* `READY` column shows all the containers are running (i.e. `3/3`) for pods with `STATUS` `Running`
* Pods with `STATUS` `Completed` are run-one Jobs. For these pods `READY` should be `0/1`.

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

Save a copy of the `kube_config_rancher-cluster.yml` and `rancher-cluster.yml` files. You will need these files to maintain and upgrade your Rancher instance.

### Issues or errors?

See the [Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/troubleshooting/) page.

### [Next: Initialize Helm]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/)
