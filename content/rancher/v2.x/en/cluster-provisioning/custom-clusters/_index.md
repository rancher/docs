---
title: Custom Cluster
weight: 2210
---

If you don't want to host your Kubernetes cluster in a [hosted kubernetes provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters) or one of the major IaaS providers listed in [Node Pools]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools), you can use the _custom cluster_ option to host your cluster in on-premise bare-metal servers, on-premise virtual machines, or in _any_ IaaS provider.

In this scenario, you'll have to build the hosts yourself, and then configure them to meet Rancher's [requirements]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#requirements). Then, use the [Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/_index.md) install option to setup your cluster.