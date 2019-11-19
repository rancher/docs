---
title: Nodes Hosted in an Infrastructure Provider
weight: 2205
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/node-templates/
---

# Node Templates

A node template is the saved configuration for the parameters to use when provisioning nodes in a specific cloud provider. These nodes can be launched from the UI. Rancher uses [Docker Machine](https://docs.docker.com/machine/) to provision these nodes. The available cloud providers to create node templates are based on the active node drivers in Rancher.

After you create a node template in Rancher, it's saved so that you can use this template again to create node pools. Node templates are bound to your login. After you add a template, you can remove them from your user profile.

### Node Labels

You can add [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) on each node template, so that any nodes created from the node template will automatically have these labels on them.

### Node Taints

_Available as of Rancher v2.3.0_

You can add [taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) on each node template, so that any nodes created from the node template will automatically have these taints on them.

Since taints can be added at a node template and node pool, if there is no conflict with the same key and effect of the taints, all taints will be added to the nodes. If there are taints with the same key and different effect, the taints from the node pool will override the taints from the node template.

# Node Pools

Using Rancher, you can create pools of nodes based on a [node template](#node-templates). The benefit of using a node pool is that if a node is destroyed or deleted, you can increase the number of live nodes to compensate for the node that was lost. The node pool helps you ensure that the count of the node pool is as expected.

Each node pool is assigned with a [node component]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#kubernetes-cluster-node-components) to specify how these nodes should be configured for the Kubernetes cluster.

> Self-healing node pools are designed to help you replace worker nodes for stateless applications. It is not recommended to enable node auto-replace on a node pool of master nodes or nodes with persistent volumes attached, because VMs are treated ephemerally. When a node in a node pool loses connectivity with the cluster, its persistent volumes are destroyed, resulting in data loss for stateful applications.

### Node Pool Taints

_Available as of Rancher v2.3.0_

If you haven't defined [taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) on your node template, you can add taints for each node pool. The benefit of adding taints at a node pool is beneficial over adding it at a node template is that you can swap out the node templates without worrying if the taint is on the node template.

For each taint, they will automatically be added to any created node in the node pool. Therefore, if you add taints to a node pool that have existing nodes, the taints won't apply to existing nodes in the node pool, but any new node added into the node pool will get the taint.

When there are taints on the node pool and node template, if there is no conflict with the same key and effect of the taints, all taints will be added to the nodes. If there are taints with the same key and different effect, the taints from the node pool will override the taints from the node template.

### Node Auto-replace

_Available as of Rancher v2.3.0_

If a node is in a node pool, Rancher can automatically replace unreachable nodes. Rancher will use the existing node template for the given node pool to recreate the node if it becomes inactive for a specified number of minutes.

{{% accordion id="how-does-node-auto-replace-work" label="How does Node Auto-replace Work?" %}}
   Node auto-replace works on top of the Kubernetes node controller. The node controller periodically checks the status of all the nodes (configurable via the `--node-monitor-period` flag of the `kube-controller`). When a node is unreachable, the node controller will taint that node. When this occurs, Rancher will begin its deletion countdown. You can configure the amount of time Rancher waits to delete the node. If the taint is not removed before the deletion countdown ends, Rancher will proceed to delete the node object. Rancher will then provision a node in accordance with the set quantity of the node pool.
{{% /accordion %}}

### Enabling Node Auto-replace

When you create the node pool, you can specify the amount of time in minutes that Rancher will wait to replace an unresponsive node.

1. In the form for creating a cluster, go to the **Node Pools** section.
1. Go to the node pool where you want to enable node auto-replace. In the **Recreate Unreachable After** field, enter the number of minutes that Rancher should wait for a node to respond before replacing the node.
1. Fill out the rest of the form for creating a cluster.

**Result:** Node auto-replace is enabled for the node pool.

You can also enable node auto-replace after the cluster is created with the following steps:

1. From the Global view, click the Clusters tab.
1. Go to the cluster where you want to enable node auto-replace, click the vertical ellipsis **(…)**, and click **Edit.**
1. In the **Node Pools** section, go to the node pool where you want to enable node auto-replace. In the **Recreate Unreachable After** field, enter the number of minutes that Rancher should wait for a node to respond before replacing the node.
1. Click **Save.**

**Result:** Node auto-replace is enabled for the node pool.

### Disabling Node Auto-replace

You can disable node auto-replace from the Rancher UI with the following steps:

1. From the Global view, click the Clusters tab.
1. Go to the cluster where you want to enable node auto-replace, click the vertical ellipsis **(…)**, and click **Edit.**
1. In the **Node Pools** section, go to the node pool where you want to enable node auto-replace. In the **Recreate Unreachable After** field, enter 0.
1. Click **Save.**

**Result:** Node auto-replace is disabled for the node pool.

# Cloud Credentials

_Available as of v2.2.0_

Node templates can use cloud credentials to store credentials for launching nodes in your cloud provider, which has some benefits:

- Cloud credentials are stored as Kubernetes secrets for security. Credentials are no longer needed to be re-entered any time you want to edit a node template.

- After the cloud credential is created, it can be re-used to create additional node templates.

- When access and secret keys are expired or compromised, the cloud credential can be updated with the new information, which will automatically be updated for all the node templates referencing this cloud credential.

> **Note:** As of v2.2.0, the default `active` [node drivers]({{< baseurl >}}/rancher/v2.x/en/admin-settings/drivers/node-drivers/) and any node driver, that has fields marked as `password`, are required to use cloud credentials. If you have upgraded to v2.2.0, existing node templates will continue to work with the previous account access  information, but when you edit the node template, you will be required to create a cloud credential and the node template will start using it.

After cloud credentials are created, the user can start [managing the cloud credentials that they created]({{< baseurl >}}/rancher/v2.x/en/user-settings/cloud-credentials/).

# Node Drivers

If you don't find the node driver that you want to use, you can see if it is available in Rancher's built-in [node drivers and activate it]({{< baseurl >}}/rancher/v2.x/en/admin-settings/drivers/node-drivers/#activating-deactivating-node-drivers), or you can [add your own custom node driver]({{< baseurl >}}/rancher/v2.x/en/admin-settings/drivers/node-drivers/#adding-custom-node-drivers).
