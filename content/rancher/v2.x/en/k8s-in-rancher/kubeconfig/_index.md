---
title: Kubeconfig Files
weight: 3010
aliases:
  - /rancher/v2.x/en/concepts/clusters/kubeconfig-files/
---

A _kubeconfig file_ is a file used to configure access to Kubernetes when used in conjunction with the kubectl commandline tool (or other clients).

For more details on how kubeconfig and kubectl work together, see the [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/).

When you create a cluster using the Rancher GUI, Rancher automatically creates a kubeconfig for your cluster.

This kubeconfig file and its contents are specific to the cluster you are viewing. You will need a separate kubeconfig file for each cluster that you have access to in Rancher.

For more information, see [Using kubectl to Access a Cluster]({{< baseurl >}}/rancher/v2.x/en//k8s-in-rancher/kubectl).

>**Note:** By default, kubectl checks `~/.kube/config` for kubeconfig files, but you can use any directory you want using the `--kubeconfig` flag. For example:
>```
kubectl --kubeconfig /custom/path/kube.config get pods
```

Rancher generates kubeconfig files that by default proxy through Rancher server to connect to the Kubernetes API server on a cluster.

For RKE clusters which are configured as _authorized cluster endpoints_ we will generate extra contexts in the kubeconfig file for connecting directly to a cluster.
If an FQDN is defined for the cluster then a single extra context will be created, otherwise an extra context which points to the IP address of each node in the control plane will be created.
Please examine the kubeconfig file for a complete list of available contexts.

>Example of using the FQDN context for an RKE cluster:
>```
kubectl --context rke-fqdn api-resources
```
>or node context without FQDN defined:
>```
kubectl --context rke-node1 api-resources
```

See [Cluster Options for Provisioning RKE in Rancher]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/) and [RKE Config Options]({{< baseurl >}}/rke/v0.1.x/en/config-options/authentication/) for more information on user authentication in a cluster.
