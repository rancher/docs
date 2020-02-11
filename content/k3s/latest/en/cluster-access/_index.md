---
title: Cluster Access
weight: 21
---

The kubeconfig file is used to configure access to the Kubernetes cluster. It is required to be set up properly in order to access the Kubernetes API such as with kubectl or for installing applications with Helm. You may set the kubeconfig by either exporting the KUBECONFIG environment variable or by specifying a flag for kubectl and helm. Refer to the examples below for details.

Leverage the KUBECONFIG environment variable:

```
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl get pods --all-namespaces
helm ls --all-namespaces
```

Or specify the location of the kubeconfig file per command:

```
kubectl --kubeconfig /etc/rancher/k3s/k3s.yaml get pods --all-namespaces
helm --kubeconfig /etc/rancher/k3s/k3s.yaml ls --all-namespaces
```

### Accessing the Cluster from Outside with kubectl

Copy `/etc/rancher/k3s/k3s.yaml` on your machine located outside the cluster as `~/.kube/config`. Then replace "localhost" with the IP or name of your K3s server. `kubectl` can now manage your K3s cluster.