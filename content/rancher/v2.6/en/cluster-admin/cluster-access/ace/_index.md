---
title: How the Authorized Cluster Endpoint Works
weight: 2015
---

This section describes how the kubectl CLI, the kubeconfig file, and the authorized cluster endpoint work together to allow you to access a downstream Kubernetes cluster directly, without authenticating through the Rancher server. It is intended to provide background information and context to the instructions for [how to set up kubectl to directly access a cluster.](../kubectl/#authenticating-directly-with-a-downstream-cluster)

### About the kubeconfig File

The _kubeconfig file_ is a file used to configure access to Kubernetes when used in conjunction with the kubectl command line tool (or other clients).

This kubeconfig file and its contents are specific to the cluster you are viewing. It can be downloaded from the cluster view in Rancher. You will need a separate kubeconfig file for each cluster that you have access to in Rancher.

After you download the kubeconfig file, you will be able to use the kubeconfig file and its Kubernetes [contexts](https://kubernetes.io/docs/reference/kubectl/cheatsheet/#kubectl-context-and-configuration) to access your downstream cluster.

If admins have [enforced TTL on kubeconfig tokens]({{<baseurl>}}/rancher/v2.5/en/api/api-tokens/#setting-ttl-on-kubeconfig-tokens), the kubeconfig file requires [rancher cli](../cli) to be present in your PATH. 


### Two Authentication Methods for RKE Clusters

If the cluster is not an [RKE cluster,]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) the kubeconfig file allows you to access the cluster in only one way: it lets you be authenticated with the Rancher server, then Rancher allows you to run kubectl commands on the cluster.

For RKE clusters, the kubeconfig file allows you to be authenticated in two ways:

- **Through the Rancher server authentication proxy:** Rancher's authentication proxy validates your identity, then connects you to the downstream cluster that you want to access.
- **Directly with the downstream cluster's API server:** RKE clusters have an authorized cluster endpoint enabled by default. This endpoint allows you to access your downstream Kubernetes cluster with the kubectl CLI and a kubeconfig file, and it is enabled by default for RKE clusters. In this scenario, the downstream cluster's Kubernetes API server authenticates you by calling a webhook (the `kube-api-auth` microservice) that Rancher set up.

This second method, the capability to connect directly to the cluster's Kubernetes API server, is important because it lets you access your downstream cluster if you can't connect to Rancher.

To use the authorized cluster endpoint, you will need to configure kubectl to use the extra kubectl context in the kubeconfig file that Rancher generates for you when the RKE cluster is created. This file can be downloaded from the cluster view in the Rancher UI, and the instructions for configuring kubectl are on [this page.](../kubectl/#authenticating-directly-with-a-downstream-cluster)

These methods of communicating with downstream Kubernetes clusters are also explained in the [architecture page]({{<baseurl>}}/rancher/v2.5/en/overview/architecture/#communicating-with-downstream-user-clusters) in the larger context of explaining how Rancher works and how Rancher communicates with downstream clusters.

### About the kube-api-auth Authentication Webhook

The `kube-api-auth` microservice is deployed to provide the user authentication functionality for the [authorized cluster endpoint,]({{<baseurl>}}/rancher/v2.5/en/overview/architecture/#4-authorized-cluster-endpoint) which is only available for [RKE clusters.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) When you access the user cluster using `kubectl`, the cluster's Kubernetes API server authenticates you by using the `kube-api-auth` service as a webhook.

During cluster provisioning, the file `/etc/kubernetes/kube-api-authn-webhook.yaml` is deployed and `kube-apiserver` is configured with `--authentication-token-webhook-config-file=/etc/kubernetes/kube-api-authn-webhook.yaml`. This configures the `kube-apiserver` to query `http://127.0.0.1:6440/v1/authenticate` to determine authentication for bearer tokens.

The scheduling rules for `kube-api-auth` are listed below:

| Component            | nodeAffinity nodeSelectorTerms             | nodeSelector | Tolerations                                                                    |
| -------------------- | ------------------------------------------ | ------------ | ------------------------------------------------------------------------------ |
| kube-api-auth        | `beta.kubernetes.io/os:NotIn:windows`<br/>`node-role.kubernetes.io/controlplane:In:"true"` | none         | `operator:Exists`              |
