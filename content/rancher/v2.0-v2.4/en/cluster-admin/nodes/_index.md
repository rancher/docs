---
title: Nodes and Node Pools
weight: 2030
---

After you launch a Kubernetes cluster in Rancher, you can manage individual nodes from the cluster's **Node** tab. Depending on the [option used]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/) to provision the cluster, there are different node options available.

> If you want to manage the _cluster_ and not individual nodes, see [Editing Clusters]({{< baseurl >}}/rancher/v2.0-v2.4/en/cluster-admin/editing-clusters/#editing-clusters-with-yaml).

This section covers the following topics:

- [Node options available for each cluster creation option](#node-options-available-for-each-cluster-creation-option)
  - [Nodes hosted by an infrastructure provider](#nodes-hosted-by-an-infrastructure-provider)
  - [Nodes provisioned by hosted Kubernetes providers](#nodes-provisioned-by-hosted-kubernetes-providers)
  - [Imported nodes](#imported-nodes)
- [Managing and editing individual nodes](#managing-and-editing-individual-nodes)
- [Viewing a node in the Rancher API](#viewing-a-node-in-the-rancher-api)
- [Deleting a node](#deleting-a-node)
- [Scaling nodes](#scaling-nodes)
- [SSH into a node hosted by an infrastructure provider](#ssh-into-a-node-hosted-by-an-infrastructure-provider)
- [Cordoning a node](#cordoning-a-node)
- [Draining a node](#draining-a-node)
  - [Aggressive and safe draining options](#aggressive-and-safe-draining-options)
  - [Grace period](#grace-period)
  - [Timeout](#timeout)
  - [Drained and cordoned state](#drained-and-cordoned-state)
- [Labeling a node to be ignored by Rancher](#labeling-a-node-to-be-ignored-by-rancher)

# Node Options Available for Each Cluster Creation Option

The following table lists which node options are available for each type of cluster in Rancher. Click the links in the **Option** column for more detailed information about each feature.

| Option                                           | [Nodes Hosted by an Infrastructure Provider][1]                                   | [Custom Node][2] | [Hosted Cluster][3] | [Imported Nodes][4] | Description                                                        |
| ------------------------------------------------ | ------------------------------------------------ | ---------------- | ------------------- | ------------------- | ------------------------------------------------------------------ |
| [Cordon](#cordoning-a-node)                      | ✓                                                | ✓                | ✓                   |                     | Marks the node as unschedulable.                                   |
| [Drain](#draining-a-node)                        | ✓                                                | ✓                | ✓                   |                     | Marks the node as unschedulable _and_ evicts all pods.             |
| [Edit](#managing-and-editing-individual-nodes)                          | ✓                                                | ✓                | ✓                   |                     | Enter a custom name, description, label, or taints for a node. |
| [View API](#viewing-a-node-in-the-rancher-api)                  | ✓                                                | ✓                | ✓                   |                     | View API data.                                                     |
| [Delete](#deleting-a-node)                       | ✓                                                | ✓                |                     |                     | Deletes defective nodes from the cluster.                          |
| [Download Keys](#ssh-into-a-node-hosted-by-an-infrastructure-provider) | ✓                                                |                  |                     |                     | Download SSH key for in order to SSH into the node.                     |
| [Node Scaling](#scaling-nodes)                   | ✓                                                |                  |                     |                     | Scale the number of nodes in the node pool up or down.               |

[1]: {{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/
[2]: {{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes/
[3]: {{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/
[4]: {{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/imported-clusters/

### Nodes Hosted by an Infrastructure Provider

Node pools are available when you provision Rancher-launched Kubernetes clusters on nodes that are [hosted in an infrastructure provider.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/)

Clusters provisioned using [one of the node pool options]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) can be scaled up or down if the node pool is edited.

A node pool can also automatically maintain the node scale that's set during the initial cluster provisioning if [node auto-replace is enabled.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#about-node-auto-replace) This scale determines the number of active nodes that Rancher maintains for the cluster.

Rancher uses [node templates]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) to replace nodes in the node pool. Each node template uses cloud provider credentials to allow Rancher to set up the node in the infrastructure provider.

### Nodes Provisioned by Hosted Kubernetes Providers

Options for managing nodes [hosted by a Kubernetes provider]({{<baseurl >}}/rancher/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/) are somewhat limited in Rancher. Rather than using the Rancher UI to make edits such as scaling the number of nodes up or down, edit the cluster directly.

### Imported Nodes

Although you can deploy workloads to an [imported cluster]({{< baseurl >}}/rancher/v2.0-v2.4/en/cluster-provisioning/imported-clusters/) using Rancher, you cannot manage individual cluster nodes. All management of imported cluster nodes must take place outside of Rancher.

# Managing and Editing Individual Nodes

Editing a node lets you:

* Change its name
* Change its description
* Add [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)
* Add/Remove [taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/)

To manage individual nodes, browse to the cluster that you want to manage and then select **Nodes** from the main menu. You can open the options menu for a node by clicking its **&#8942;** icon (**...**).

# Viewing a Node in the Rancher API

Select this option to view the node's [API endpoints]({{< baseurl >}}/rancher/v2.0-v2.4/en/api/).

# Deleting a Node

Use **Delete** to remove defective nodes from the cloud provider.

When you the delete a defective node, Rancher can automatically replace it with an identically provisioned node if the node is in a node pool and [node auto-replace is enabled.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#about-node-auto-replace)

>**Tip:** If your cluster is hosted by an infrastructure provider, and you want to scale your cluster down instead of deleting a defective node, [scale down](#scaling-nodes) rather than delete.

# Scaling Nodes

For nodes hosted by an infrastructure provider, you can scale the number of nodes in each [node pool]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) by using the scale controls. This option isn't available for other cluster types.

# SSH into a Node Hosted by an Infrastructure Provider

For [nodes hosted by an infrastructure provider]({{< baseurl >}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/), you have the option of downloading its SSH key so that you can connect to it remotely from your desktop.

1. From the cluster hosted by an infrastructure provider, select **Nodes** from the main menu.

1. Find the node that you want to remote into. Select **&#8942; > Download Keys**.

    **Step Result:** A ZIP file containing files used for SSH is downloaded.

1. Extract the ZIP file to any location.

1. Open Terminal. Change your location to the extracted ZIP file.

1. Enter the following command:

    ```
    ssh -i id_rsa root@<IP_OF_HOST>
    ```

# Cordoning a Node

_Cordoning_ a node marks it as unschedulable. This feature is useful for performing short tasks on the node during small maintenance windows, like reboots, upgrades, or decommissions.  When you're done, power back on and make the node schedulable again by uncordoning it.

# Draining a Node

_Draining_ is the process of first cordoning the node, and then evicting all its pods. This feature is useful for performing node maintenance (like kernel upgrades or hardware maintenance). It prevents new pods from deploying to the node while redistributing existing pods so that users don't experience service interruption.

- For pods with a replica set, the pod is replaced by a new pod that will be scheduled to a new node. Additionally, if the pod is part of a service, then clients will automatically be redirected to the new pod.

- For pods with no replica set, you need to bring up a new copy of the pod, and assuming it is not part of a service, redirect clients to it.

You can drain nodes that are in either a `cordoned` or `active` state. When you drain a node, the node is cordoned, the nodes are evaluated for conditions they must meet to be drained, and then (if it meets the conditions) the node evicts its pods.

However, you can override the conditions draining when you initiate the drain. You're also given an opportunity to set a grace period and timeout value.

### Aggressive and Safe Draining Options

The node draining options are different based on your version of Rancher.

{{% tabs %}}
{{% tab "Rancher v2.2.x+" %}}
There are two drain modes: aggressive and safe.

- **Aggressive Mode**

    In this mode, pods won't get rescheduled to a new node, even if they do not have a controller. Kubernetes expects you to have your own logic that handles the deletion of these pods.

    Kubernetes also expects the implementation to decide what to do with pods using emptyDir. If a pod uses emptyDir to store local data, you might not be able to safely delete it, since the data in the emptyDir will be deleted once the pod is removed from the node. Choosing aggressive mode will delete these pods.

- **Safe Mode**

    If a node has standalone pods or ephemeral data it will be cordoned but not drained.
{{% /tab %}}
{{% tab "Rancher before v2.2.x" %}}

The following list describes each drain option:

- **Even if there are pods not managed by a ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet**

    These types of pods won't get rescheduled to a new node, since they do not have a controller. Kubernetes expects you to have your own logic that handles the deletion of these pods. Kubernetes forces you to choose this option (which will delete/evict these pods) or drain won't proceed.

- **Even if there are DaemonSet-managed pods**

    Similar to above, if you have any daemonsets, drain would proceed only if this option is selected. Even when this option is on, pods won't be deleted since they'll immediately be replaced. On startup, Rancher currently has a few daemonsets running by default in the system, so this option is turned on by default.

- **Even if there are pods using emptyDir**

    If a pod uses emptyDir to store local data, you might not be able to safely delete it, since the data in the emptyDir will be deleted once the pod is removed from the node. Similar to the first option, Kubernetes expects the implementation to decide what to do with these pods. Choosing this option will delete these pods.
{{% /tab %}}
{{% /tabs %}}

### Grace Period

The timeout given to each pod for cleaning things up, so they will have chance to exit gracefully. For example, when pods might need to finish any outstanding requests, roll back transactions or save state to some external storage. If negative, the default value specified in the pod will be used.

### Timeout

The amount of time drain should continue to wait before giving up.

>**Kubernetes Known Issue:** The [timeout setting](https://github.com/kubernetes/kubernetes/pull/64378) was not enforced while draining a node before Kubernetes 1.12.

### Drained and Cordoned State

If there's any error related to user input, the node enters a `cordoned` state because the drain failed. You can either correct the input and attempt to drain the node again, or you can abort by uncordoning the node.

If the drain continues without error, the node enters a `draining` state. You'll have the option to stop the drain when the node is in this state, which will stop the drain process and change the node's state to `cordoned`.

Once drain successfully completes, the node will be in a state of `drained`. You can then power off or delete the node.

>**Want to know more about cordon and drain?** See the [Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/cluster-management/#maintenance-on-a-node).

# Labeling a Node to be Ignored by Rancher

_Available as of 2.3.3_

Some solutions, such as F5's BIG-IP integration, may require creating a node that is never registered to a cluster.

Since the node will never finish registering, it will always be shown as unhealthy in the Rancher UI.

In that case, you may want to label the node to be ignored by Rancher so that Rancher only shows nodes as unhealthy when they are actually failing.

You can label nodes to be ignored by using a setting in the Rancher UI, or by using `kubectl`.

> **Note:** There is an [open issue](https://github.com/rancher/rancher/issues/24172) in which nodes labeled to be ignored can get stuck in an updating state.

### Labeling Nodes to be Ignored with the Rancher UI

To add a node that is ignored by Rancher,

1. From the **Global** view, click the **Settings** tab.
1. Go to the `ignore-node-name` setting and click **&#8942; > Edit.**
1. Enter a name that Rancher will use to ignore nodes. All nodes with this name will be ignored.
1. Click **Save.**

**Result:** Rancher will not wait to register nodes with this name. In the UI, the node will displayed with a grayed-out status. The node is still part of the cluster and can be listed with `kubectl`.

If the setting is changed afterward, the ignored nodes will continue to be hidden.

### Labeling Nodes to be Ignored with kubectl

To add a node that will be ignored by Rancher, use `kubectl` to create a node that has the following label:

```
cattle.rancher.io/node-status: ignore
```

**Result:** If you add the node to a cluster, Rancher will not attempt to sync with this node. The node can still be part of the cluster and can be listed with `kubectl`.

If the label is added before the node is added to the cluster, the node will not be shown in the Rancher UI. 

If the label is added after the node is added to a Rancher cluster, the node will not be removed from the UI.

If you delete the node from the Rancher server using the Rancher UI or API, the node will not be removed from the cluster if the `nodeName` is listed in the Rancher settings under `ignore-node-name`.
