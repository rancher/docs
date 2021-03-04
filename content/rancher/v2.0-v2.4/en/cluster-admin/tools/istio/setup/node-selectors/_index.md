---
title: 3. Select the Nodes Where Istio Components Will be Deployed
weight: 3
aliases:
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/istio/setup/node-selectors
  - /rancher/v2.0-v2.4/en/istio/legacy/setup/node-selectors
  - /rancher/v2.0-v2.4/en/istio/v2.3.x-v2.4.x/setup/node-selectors
---

> **Prerequisite:** Your cluster needs a worker node that can designated for Istio. The worker node should meet the [resource requirements.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/resources)

This section describes how use node selectors to configure Istio components to be deployed on a designated node.

In larger deployments, it is strongly advised that Istio's infrastructure be placed on dedicated nodes in the cluster by adding a node selector for each Istio component.

# Adding a Label to the Istio Node

First, add a label to the node where Istio components should be deployed. This label can have any key-value pair. For this example, we will use the key `istio` and the value `enabled`.

1. From the cluster view, go to the **Nodes** tab.
1. Go to a worker node that will host the Istio components and click **&#8942; > Edit.**
1. Expand the **Labels & Annotations** section.
1. Click **Add Label.**
1. In the fields that appear, enter `istio` for the key and `enabled` for the value.
1. Click **Save.**

**Result:** A worker node has the label that will allow you to designate it for Istio components.

# Configuring Istio Components to Use the Labeled Node

Configure each Istio component to be deployed to the node with the Istio label. Each Istio component can be configured individually, but in this tutorial, we will configure all of the components to be scheduled on the same node for the sake of simplicity.

For larger deployments, it is recommended to schedule each component of Istio onto separate nodes.

1. From the cluster view, click **Tools > Istio.**
1. Expand the **Pilot** section and click **Add Selector** in the form that appears. Enter the node selector label that you added to the Istio node. In our case, we are using the key `istio` and the value `enabled.`
1. Repeat the previous step for the **Mixer** and **Tracing** sections.
1. Click **Save.**

**Result:** The Istio components will be deployed on the Istio node.

### [Next: Add Deployments and Services]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/setup/deploy-workloads)