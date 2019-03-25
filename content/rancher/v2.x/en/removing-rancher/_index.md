---
title: Removing Rancher Server
weight: 7501
aliases:
  - /rancher/v2.x/en/installation/removing-rancher/cleaning-cluster-nodes/
  - /rancher/v2.x/en/installation/removing-rancher/
  - /rancher/v2.x/en/admin-settings/removing-rancher/
  - /rancher/v2.x/en/admin-settings/removing-rancher/rancher-cluster-nodes/
---

When you deploy Rancher and use it to provision clusters, Rancher installs its components on the nodes you use. There are two contexts in which you'd remove Rancher from a Kubernetes cluster node.

- **[Removing Rancher from Your Rancher Server Nodes]({{< baseurl >}}/rancher/v2.x/en/system-tools/#remove)**: In this context, you are removing Rancher from the Kubernetes cluster that you configured for your [Rancher installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha/). This can be done using [System Tools]({{< baseurl >}}/rancher/v2.x/en/system-tools/).
- **[Removing Rancher Components from Rancher Launched Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/admin-settings/removing-rancher/user-cluster-nodes/)**: In this context, you are removing Rancher components from Kubernetes clusters that you [launched using Rancher]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/).
