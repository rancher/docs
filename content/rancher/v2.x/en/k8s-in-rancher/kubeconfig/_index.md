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

>**Note:** By default, kubectl checks `~/.kube/config` for a kubeconfig file, but you can use any directory you want using the `--kubeconfig` flag. For example:
>```
kubectl --kubeconfig /custom/path/kube.config get pods
```

## Accessing Rancher Launched Kubernetes clusters without Rancher server running

By default, Rancher generates a kubeconfig file that will proxy through the Rancher server to connect to the Kubernetes API server on a cluster.

For [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters) clusters, which have  _[authorized cluster endpoints]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options)_ enabled, Rancher generates extra context(s) in the kubeconfig file in order to connect directly to the cluster.

> **Note:** By default, all Rancher Launched Kubernetes clusters are enabled as _[authorized cluster endpoints]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options)_.

To find the name of the context(s), view the kubeconfig file.

### Clusters with FQDN defined as an Authorized Cluster Endpoint

If an FQDN is defined for the cluster, a single context referencing the FQDN will be created. The context will be named `<CLUSTER_NAME>-fqdn`. When you want to use `kubectl` to access this cluster without Rancher, you will need to use this context.

```
# Assuming the kubeconfig file is located at ~/.kube/config
kubectl --context <CLUSTER_NAME>-fqdn get nodes

# Directly referencing the location of the kubeconfig file
kubectl --kubeconfig /custom/path/kube.config --context <CLUSTER_NAME>-fqdn get pods
```

### Clusters without FQDN defined as an Authorized Cluster Endpoint

If there is no FQDN defined for the cluster, extra contexts will be created referencing the IP address of each node in the control plane. Each context will be named `<CLUSTER_NAME>-<NODE_NAME>`. When you want to use `kubectl` to access this cluster without Rancher, you will need to use this context.

```
# Assuming the kubeconfig file is located at ~/.kube/config
kubectl --context <CLUSTER_NAME>-<NODE_NAME> get nodes

# Directly referencing the location of the kubeconfig file
kubectl --kubeconfig /custom/path/kube.config --context <CLUSTER_NAME>-<NODE_NAME> get pods
```
