---
title: "Access a Cluster with Kubectl and kubeconfig"
description: "Learn how you can access and manage your Kubernetes clusters using kubectl with kubectl Shell or with kubectl CLI and kubeconfig file. A kubeconfig file is used to configure access to Kubernetes. When you create a cluster with Rancher, it automatically creates a kubeconfig for your cluster."
weight: 2010
aliases:
  - /rancher/v2.5/en/k8s-in-rancher/kubectl/
  - /rancher/v2.5/en/cluster-admin/kubectl
  - /rancher/v2.5/en/concepts/clusters/kubeconfig-files/
  - /rancher/v2.5/en/k8s-in-rancher/kubeconfig/
  - /rancher/2.x/en/cluster-admin/kubeconfig
---

This section describes how to manipulate your downstream Kubernetes cluster with kubectl from the Rancher UI or from your workstation.

For more information on using kubectl, see [Kubernetes Documentation: Overview of kubectl](https://kubernetes.io/docs/reference/kubectl/overview/).

- [Accessing clusters with kubectl shell in the Rancher UI](#accessing-clusters-with-kubectl-shell-in-the-rancher-ui)
- [Accessing clusters with kubectl from your workstation](#accessing-clusters-with-kubectl-from-your-workstation)
- [Note on Resources created using kubectl](#note-on-resources-created-using-kubectl)
- [Authenticating Directly with a Downstream Cluster](#authenticating-directly-with-a-downstream-cluster)
  - [Connecting Directly to Clusters with FQDN Defined](#connecting-directly-to-clusters-with-fqdn-defined)
  - [Connecting Directly to Clusters without FQDN Defined](#connecting-directly-to-clusters-without-fqdn-defined)


### Accessing Clusters with kubectl Shell in the Rancher UI

You can access and manage your clusters by logging into Rancher and opening the kubectl shell in the UI. No further configuration necessary.

1. From the **Global** view, open the cluster that you want to access with kubectl.

2. Click **Launch kubectl**. Use the window that opens to interact with your Kubernetes cluster.

### Accessing Clusters with kubectl from Your Workstation

This section describes how to download your cluster's kubeconfig file, launch kubectl from your workstation, and access your downstream cluster.

This alternative method of accessing the cluster allows you to authenticate with Rancher and manage your cluster without using the Rancher UI.

> **Prerequisites:** These instructions assume that you have already created a Kubernetes cluster, and that kubectl is installed on your workstation. For help installing kubectl, refer to the official [Kubernetes documentation.](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

1. Log into Rancher. From the **Global** view, open the cluster that you want to access with kubectl.
1. Click **Kubeconfig File**.
1. Copy the contents displayed to your clipboard.
1. Paste the contents into a new file on your local computer. Move the file to `~/.kube/config`. Note: The default location that kubectl uses for the kubeconfig file is `~/.kube/config`, but you can use any directory and specify it using the `--kubeconfig` flag, as in this command:
  ```
  kubectl --kubeconfig /custom/path/kube.config get pods
  ```
1. From your workstation, launch kubectl. Use it to interact with your kubernetes cluster.


### Note on Resources Created Using kubectl

Rancher will discover and show resources created by `kubectl`. However, these resources might not have all the necessary annotations on discovery. If an operation (for instance, scaling the workload) is done to the resource using the Rancher UI/API, this may trigger recreation of the resources due to the missing annotations. This should only happen the first time an operation is done to the discovered resource.

# Authenticating Directly with a Downstream Cluster

This section intended to help you set up an alternative method to access an [RKE cluster.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters)

This method is only available for RKE clusters that have the [authorized cluster endpoint]({{<baseurl>}}/rancher/v2.5/en/overview/architecture/#4-authorized-cluster-endpoint) enabled. When Rancher creates this RKE cluster, it generates a kubeconfig file that includes additional kubectl context(s) for accessing your cluster. This additional context allows you to use kubectl to authenticate with the downstream cluster without authenticating through Rancher. For a longer explanation of how the authorized cluster endpoint works, refer to [this page.](../ace)

We recommend that as a best practice, you should set up this method to access your RKE cluster, so that just in case you can’t connect to Rancher, you can still access the cluster.

> **Prerequisites:** The following steps assume that you have created a Kubernetes cluster and followed the steps to [connect to your cluster with kubectl from your workstation.](#accessing-clusters-with-kubectl-from-your-workstation)

To find the name of the context(s) in your downloaded kubeconfig file, run:

```
kubectl config get-contexts --kubeconfig /custom/path/kube.config
CURRENT   NAME                        CLUSTER                     AUTHINFO     NAMESPACE
*         my-cluster                  my-cluster                  user-46tmn
          my-cluster-controlplane-1   my-cluster-controlplane-1   user-46tmn
```

In this example, when you use `kubectl` with the first context, `my-cluster`, you will be authenticated through the Rancher server.

With the second context, `my-cluster-controlplane-1`, you would authenticate with the authorized cluster endpoint, communicating with an downstream RKE cluster directly.

We recommend using a load balancer with the authorized cluster endpoint. For details, refer to the [recommended architecture section.]({{<baseurl>}}/rancher/v2.5/en/overview/architecture-recommendations/#architecture-for-an-authorized-cluster-endpoint)

Now that you have the name of the context needed to authenticate directly with the cluster, you can pass the name of the context in as an option when running kubectl commands. The commands will differ depending on whether your cluster has an FQDN defined. Examples are provided in the sections below.

When `kubectl` works normally, it confirms that you can access your cluster while bypassing Rancher's authentication proxy.

### Connecting Directly to Clusters with FQDN Defined

If an FQDN is defined for the cluster, a single context referencing the FQDN will be created. The context will be named `<CLUSTER_NAME>-fqdn`. When you want to use `kubectl` to access this cluster without Rancher, you will need to use this context.

Assuming the kubeconfig file is located at `~/.kube/config`:

```
kubectl --context <CLUSTER_NAME>-fqdn get nodes
```
Directly referencing the location of the kubeconfig file:
```
kubectl --kubeconfig /custom/path/kube.config --context <CLUSTER_NAME>-fqdn get pods
```

### Connecting Directly to Clusters without FQDN Defined

If there is no FQDN defined for the cluster, extra contexts will be created referencing the IP address of each node in the control plane. Each context will be named `<CLUSTER_NAME>-<NODE_NAME>`. When you want to use `kubectl` to access this cluster without Rancher, you will need to use this context.

Assuming the kubeconfig file is located at `~/.kube/config`:
```
kubectl --context <CLUSTER_NAME>-<NODE_NAME> get nodes
```
Directly referencing the location of the kubeconfig file:
```
kubectl --kubeconfig /custom/path/kube.config --context <CLUSTER_NAME>-<NODE_NAME> get pods
```
