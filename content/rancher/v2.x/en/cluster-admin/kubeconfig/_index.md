---
title: Kubeconfig File
weight: 2010
aliases:
  - /rancher/v2.x/en/concepts/clusters/kubeconfig-files/
  - /rancher/v2.x/en/k8s-in-rancher/kubeconfig/
---

A _kubeconfig file_ is a file used to configure access to Kubernetes when used in conjunction with the kubectl commandline tool (or other clients).

For more details on how kubeconfig and kubectl work together, see the [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/).

When you create a cluster using the Rancher GUI, Rancher automatically creates a kubeconfig for your cluster.

This kubeconfig file and its contents are specific to the cluster you are viewing. You will need a separate kubeconfig file for each cluster that you have access to in Rancher.

For more information, see [Using kubectl to Access a Cluster]({{< baseurl >}}/rancher/v2.x/en//k8s-in-rancher/kubectl).

>**Note:** By default, kubectl checks `~/.kube/config` for a kubeconfig file, but you can use any directory you want using the `--kubeconfig` flag. For example:

```
kubectl --kubeconfig /custom/path/kube.config get pods
```

## Accessing Rancher Launched Kubernetes clusters without Rancher server running

By default, Rancher generates a kubeconfig file that will proxy through the Rancher server to connect to the Kubernetes API server on a cluster.

For [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters) clusters, which have [Authorized Cluster Endpoint]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#authorized-cluster-endpoint) enabled, Rancher generates extra context(s) in the kubeconfig file in order to connect directly to the cluster.

> **Note:** By default, all Rancher Launched Kubernetes clusters have [Authorized Cluster Endpoint]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#authorized-cluster-endpoint) enabled.

To find the name of the context(s), run:

```
kubectl config get-contexts --kubeconfig /custom/path/kube.config
CURRENT   NAME                        CLUSTER                     AUTHINFO     NAMESPACE
*         my-cluster                  my-cluster                  user-46tmn
          my-cluster-controlplane-1   my-cluster-controlplane-1   user-46tmn
```

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

### kube-api-auth

The `kube-api-auth` resource is deployed to provide the functionality for Authorized Cluster Endpoint.

During cluster provisioning, the file `/etc/kubernetes/kube-api-authn-webhook.yaml` is deployed and `kube-apiserver` is configured with `--authentication-token-webhook-config-file=/etc/kubernetes/kube-api-authn-webhook.yaml`. This configures the `kube-apiserver` to query `http://127.0.0.1:6440/v1/authenticate` to determine authentication for bearer tokens.

The scheduling rules for `kube-api-auth` are listed below:

_Applies to v2.3.0 and higher_

| Component            | nodeAffinity nodeSelectorTerms             | nodeSelector | Tolerations                                                                    |
| -------------------- | ------------------------------------------ | ------------ | ------------------------------------------------------------------------------ |
| kube-api-auth        | `beta.kubernetes.io/os:NotIn:windows`<br/>`node-role.kubernetes.io/controlplane:In:"true"` | none         | `operator:Exists`              |
