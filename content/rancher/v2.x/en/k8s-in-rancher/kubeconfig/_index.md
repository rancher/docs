---
metaTitle: "Kubeconfig File | Kubectl | Accessing Kubernetes | Rancher"
title: Kubeconfig Files
weight: 3010
aliases:
  - /rancher/v2.x/en/concepts/clusters/kubeconfig-files/
---

A _kubeconfig file_ is a file used to configure access to Kubernetes when used in conjunction with the kubectl commandline tool (or other clients).

For more details on how kubeconfig and kubectl work together, see the [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/).

When you create a cluster using the Rancher GUI, Rancher automatically creates a kubeconfig file for your cluster.

This kubeconfig file and its contents are specific to the cluster you are viewing. You will need a separate kubeconfig file for each cluster that you have access to in Rancher.

For more information, see [Using kubectl to Access a Cluster]({{< baseurl >}}/rancher/v2.x/en//k8s-in-rancher/kubectl).

>**Note:** By default, kubectl checks `~/.kube/config` for kubeconfig files, but you can use any directory you want using the `--kubeconfig` flag. For example:
>```
kubectl --kubeconfig /custom/path/kube.config get pods
```
