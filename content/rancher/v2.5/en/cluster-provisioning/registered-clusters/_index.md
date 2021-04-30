---
title: Registering Existing Clusters
weight: 6
aliases:
  - /rancher/v2.5/en/cluster-provisioning/imported-clusters
---

The cluster registration feature replaced the feature to import clusters.

The control that Rancher has to manage a registered cluster depends on the type of cluster. For details, see [Management Capabilities for Registered Clusters.](#management-capabilities-for-registered-clusters)

- [Prerequisites](#prerequisites)
- [Registering a Cluster](#registering-a-cluster)
- [Management Capabilities for Registered Clusters](#management-capabilities-for-registered-clusters)
- [Configuring K3s Cluster Upgrades](#configuring-k3s-cluster-upgrades)
- [Debug Logging and Troubleshooting for Registered K3s Clusters](#debug-logging-and-troubleshooting-for-registered-k3s-clusters)
- [Annotating Registered Clusters](#annotating-registered-clusters)

# Prerequisites

If your existing Kubernetes cluster already has a `cluster-admin` role defined, you must have this `cluster-admin` privilege to register the cluster in Rancher.

In order to apply the privilege, you need to run:

```plain
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user [USER_ACCOUNT]
```

before running the `kubectl` command to register the cluster.

By default, GKE users are not given this privilege, so you will need to run the command before registering GKE clusters. To learn more about role-based access control for GKE, please click [here](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).

If you are registering a K3s cluster, make sure the `cluster.yml` is readable. It is protected by default. For details, refer to [Configuring a K3s cluster to enable importation to Rancher.](#configuring-a-k3s-cluster-to-enable-registration-in-rancher)

# Registering a Cluster

1. From the **Clusters** page, click **Add Cluster**.
2. Choose **Register**.
3. Enter a **Cluster Name**.
4. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
5. For Rancher v2.5.6+, use **Agent Environment Variables** under **Cluster Options** to set environment variables for [rancher cluster agent]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/rancher-agents/). The environment variables can be set using key value pairs. If rancher agent requires use of proxy to communicate with Rancher server, `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY` environment variables can be set using agent environment variables.
6. Click **Create**.
7. The prerequisite for `cluster-admin` privileges is shown (see **Prerequisites** above), including an example command to fulfil the prerequisite.
8. Copy the `kubectl` command to your clipboard and run it on a node where kubeconfig is configured to point to the cluster you want to import. If you are unsure it is configured correctly, run `kubectl get nodes` to verify before running the command shown in Rancher.
9. If you are using self signed certificates, you will receive the message `certificate signed by unknown authority`. To work around this validation, copy the command starting with `curl` displayed in Rancher to your clipboard. Then run the command on a node where kubeconfig is configured to point to the cluster you want to import.
10. When you finish running the command(s) on your node, click **Done**.


**Result:**

- Your cluster is registered and assigned a state of **Pending.** Rancher is deploying resources to manage your cluster.</li>
- You can access your cluster after its state is updated to **Active.**
- **Active** clusters are assigned two Projects: `Default` (containing the namespace `default`) and `System` (containing the namespaces `cattle-system`, `ingress-nginx`, `kube-public` and `kube-system`, if present).


> **Note:**
> You can not re-register a cluster that is currently active in a Rancher setup.

### Configuring a K3s Cluster to Enable Registration in Rancher

The K3s server needs to be configured to allow writing to the kubeconfig file.

This can be accomplished by passing `--write-kubeconfig-mode 644` as a flag during installation:

```
$ curl -sfL https://get.k3s.io | sh -s - --write-kubeconfig-mode 644
```

The option can also be specified using the environment variable `K3S_KUBECONFIG_MODE`:

```
$ curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -s -
```

# Management Capabilities for Registered Clusters

The control that Rancher has to manage a registered cluster depends on the type of cluster.

{{% tabs %}}
{{% tab "Rancher v2.5.8+" %}}

- [Changes in v2.5.8](#changes-in-v2-5-8)
- [Features for All Registered Clusters](#2-5-8-features-for-all-registered-clusters)
- [Additional Features for Registered K3s Clusters](#2-5-8-additional-features-for-registered-k3s-clusters)
- [Additional Features for Registered EKS and GKE Clusters](#additional-features-for-registered-eks-and-gke-clusters)

### Changes in v2.5.8

Greater management capabilities are now available for [registered GKE clusters.](#additional-features-for-registered-eks-and-gke-clusters) The same configuration options are available for registered GKE clusters as for the GKE clusters created through the Rancher UI.

<a id="2-5-8-features-for-all-registered-clusters"></a>
### Features for All Registered Clusters

After registering a cluster, the cluster owner can:

- [Manage cluster access]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/) through role-based access control
- Enable [monitoring, alerts and notifiers]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/)
- Enable [logging]({{<baseurl>}}/rancher/v2.5/en/logging/v2.5/)
- Enable [Istio]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/)
- Use [pipelines]({{<baseurl>}}/rancher/v2.5/en/project-admin/pipelines/)
- Manage projects and workloads

<a id="2-5-8-additional-features-for-registered-k3s-clusters"></a>
### Additional Features for Registered K3s Clusters

[K3s]({{<baseurl>}}/k3s/latest/en/) is a lightweight, fully compliant Kubernetes distribution.

When a K3s cluster is registered in Rancher, Rancher will recognize it as K3s. The Rancher UI will expose the features for [all registered clusters,](#features-for-all-registered-clusters) in addition to the following features for editing and upgrading the cluster:

- The ability to [upgrade the K3s version]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/upgrading-kubernetes/)
- The ability to configure the maximum number of nodes that will be upgraded concurrently
- The ability to see a read-only version of the K3s cluster's configuration arguments and environment variables used to launch each node in the cluster

### Additional Features for Registered EKS and GKE Clusters

Registering an Amazon EKS cluster or GKE cluster allows Rancher to treat it as though it were created in Rancher.

Amazon EKS clusters and GKE clusters can now be registered in Rancher. For the most part, these registered clusters are treated the same way as clusters created in the Rancher UI, except for deletion.

When you delete an EKS cluster or GKE cluster that was created in Rancher, the cluster is destroyed. When you delete a cluster that was registered in Rancher, it is disconnected from the Rancher server, but it still exists and you can still access it in the same way you did before it was registered in Rancher.

The capabilities for registered clusters are listed in the table on [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/)


{{% /tab %}}
{{% tab "Rancher v2.5.0-v2.5.8" %}}

- [Features for All Registered Clusters](#before-2-5-8-features-for-all-registered-clusters)
- [Additional Features for Registered K3s Clusters](#before-2-5-8-additional-features-for-registered-k3s-clusters)
- [Additional Features for Registered EKS Clusters](#additional-features-for-registered-eks-clusters)

<a id="before-2-5-8-features-for-all-registered-clusters"></a>
### Features for All Registered Clusters

After registering a cluster, the cluster owner can:

- [Manage cluster access]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/) through role-based access control
- Enable [monitoring, alerts and notifiers]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/)
- Enable [logging]({{<baseurl>}}/rancher/v2.5/en/logging/v2.5/)
- Enable [Istio]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/)
- Use [pipelines]({{<baseurl>}}/rancher/v2.5/en/project-admin/pipelines/)
- Manage projects and workloads

<a id="before-2-5-8-additional-features-for-registered-k3s-clusters"></a>
### Additional Features for Registered K3s Clusters

[K3s]({{<baseurl>}}/k3s/latest/en/) is a lightweight, fully compliant Kubernetes distribution.

When a K3s cluster is registered in Rancher, Rancher will recognize it as K3s. The Rancher UI will expose the features for [all registered clusters,](#features-for-all-registered-clusters) in addition to the following features for editing and upgrading the cluster:

- The ability to [upgrade the K3s version]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/upgrading-kubernetes/)
- The ability to configure the maximum number of nodes that will be upgraded concurrently
- The ability to see a read-only version of the K3s cluster's configuration arguments and environment variables used to launch each node in the cluster

### Additional Features for Registered EKS Clusters

Registering an Amazon EKS cluster allows Rancher to treat it as though it were created in Rancher.

Amazon EKS clusters can now be registered in Rancher. For the most part, registered EKS clusters and EKS clusters created in Rancher are treated the same way in the Rancher UI, except for deletion.

When you delete an EKS cluster that was created in Rancher, the cluster is destroyed. When you delete an EKS cluster that was registered in Rancher, it is disconnected from the Rancher server, but it still exists and you can still access it in the same way you did before it was registered in Rancher.

The capabilities for registered EKS clusters are listed in the table on [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/)
{{% /tab %}}
{{% /tabs %}}



# Configuring K3s Cluster Upgrades

> It is a Kubernetes best practice to back up the cluster before upgrading. When upgrading a high-availability K3s cluster with an external database, back up the database in whichever way is recommended by the relational database provider.

The **concurrency** is the maximum number of nodes that are permitted to be unavailable during an upgrade. If number of unavailable nodes is larger than the **concurrency,** the upgrade will fail. If an upgrade fails, you may need to repair or remove failed nodes before the upgrade can succeed.

- **Controlplane concurrency:** The maximum number of server nodes to upgrade at a single time; also the maximum unavailable server nodes
- **Worker concurrency:** The maximum number worker nodes to upgrade at the same time; also the maximum unavailable worker nodes

In the K3s documentation, controlplane nodes are called server nodes. These nodes run the Kubernetes master, which maintains the desired state of the cluster. In K3s, these controlplane nodes have the capability to have workloads scheduled to them by default.

Also in the K3s documentation, nodes with the worker role are called agent nodes. Any workloads or pods that are deployed in the cluster can be scheduled to these nodes by default.

# Debug Logging and Troubleshooting for Registered K3s Clusters

Nodes are upgraded by the system upgrade controller running in the downstream cluster. Based on the cluster configuration, Rancher deploys two [plans](https://github.com/rancher/system-upgrade-controller#example-upgrade-plan) to upgrade K3s nodes: one for controlplane nodes and one for workers. The system upgrade controller follows the plans and upgrades the nodes. 

To enable debug logging on the system upgrade controller deployment, edit the [configmap](https://github.com/rancher/system-upgrade-controller/blob/50a4c8975543d75f1d76a8290001d87dc298bdb4/manifests/system-upgrade-controller.yaml#L32) to set the debug environment variable to true. Then restart the `system-upgrade-controller` pod.

Logs created by the `system-upgrade-controller` can be viewed by running this command:

```
kubectl logs -n cattle-system system-upgrade-controller
```

The current status of the plans can be viewed with this command:

```
kubectl get plans -A -o yaml
```

If the cluster becomes stuck in upgrading, restart the `system-upgrade-controller`.

To prevent issues when upgrading, the [Kubernetes upgrade best practices](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/) should be followed.




# Annotating Registered Clusters

For all types of registered Kubernetes clusters except for K3s Kubernetes clusters, Rancher doesn't have any information about how the cluster is provisioned or configured.

Therefore, when Rancher registers a cluster, it assumes that several capabilities are disabled by default. Rancher assumes this in order to avoid exposing UI options to the user even when the capabilities are not enabled in the registered cluster.

However, if the cluster has a certain capability, such as the ability to use a pod security policy, a user of that cluster might still want to select pod security policies for the cluster in the Rancher UI. In order to do that, the user will need to manually indicate to Rancher that pod security policies are enabled for the cluster.

By annotating a registered cluster, it is possible to indicate to Rancher that a cluster was given a pod security policy, or another capability, outside of Rancher.

This example annotation indicates that a pod security policy is enabled:

```
"capabilities.cattle.io/pspEnabled": "true"
```

The following annotation indicates Ingress capabilities. Note that that the values of non-primitive objects need to be JSON encoded, with quotations escaped.

```
"capabilities.cattle.io/ingressCapabilities": "[  
  {
    "customDefaultBackend":true,
    "ingressProvider":"asdf"
  }
]"
```

These capabilities can be annotated for the cluster:

- `ingressCapabilities`
- `loadBalancerCapabilities`
- `nodePoolScalingSupported`
- `nodePortRange`
- `pspEnabled`
- `taintSupport`

All the capabilities and their type definitions can be viewed in the Rancher API view, at `[Rancher Server URL]/v3/schemas/capabilities`.

To annotate a registered cluster,

1. Go to the cluster view in Rancher and select **&#8942; > Edit.**
1. Expand the **Labels & Annotations** section.
1. Click **Add Annotation.**
1. Add an annotation to the cluster with the format `capabilities/<capability>: <value>` where `value` is the cluster capability that will be overridden by the annotation. In this scenario, Rancher is not aware of any capabilities of the cluster until you add the annotation.
1. Click **Save.**

**Result:** The annotation does not give the capabilities to the cluster, but it does indicate to Rancher that the cluster has those capabilities.

