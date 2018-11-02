---
title: Custom Cluster
weight: 2210
---

If you don't want to host your Kubernetes cluster in a [hosted kubernetes provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters) or provision nodes through Rancher, you can use the _custom cluster_ option to create a Kubernetes cluster in on-premise bare-metal servers, on-premise virtual machines, or in _any_ node hosted by an infrastructure provider.

In this scenario, you'll bring the nodes yourself, and then configure them to meet Rancher's [requirements]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#requirements). Then, use the [Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/) install option to setup your cluster.
