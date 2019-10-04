---
title: 3. Set up Taints and Tolerations
weight: 3
---

In larger deployments, it is strongly advised that the infrastructure be placed on dedicated nodes in the cluster by adding a node selector for each Istio component.

Use taints and tolerations to control which nodes the Istio components are deployed to.

### [Next: Set up the Istio Gateway]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/gateway)