---
title: Installing and Configuring kubectl
weight: 100
---

`kubectl` is a CLI utility for running commands against Kubernetes clusters. It's required for many maintenance and administrative tasks in Rancher 2.x.

### Installation

See [kubectl Installation](https://kubernetes.io/docs/tasks/tools/install-kubectl/) for installation on your operating system.

### Configuration

When you create a Kubernetes cluster with RKE, RKE creates a `kube_config_rancher-cluster.yml` in the local directory that contains credentials to connect to your new cluster with tools like `kubectl` or `helm`.

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
