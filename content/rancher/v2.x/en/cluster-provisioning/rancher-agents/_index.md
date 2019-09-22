---
title: Rancher agents
weight: 2400
---

There are two types of agent resources deployed on Rancher managed clusters:

- Deployment `cattle-cluster-agent`: Used to interact with the cluster, it is the agent that Rancher uses to talk to the Kubernetes API server in the cluster.
- DaemonSet `cattle-node-agent`: Used to be able to interact with the nodes in a cluster, this only applies to [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) as these are the clusters where Rancher needs to connect to the node to make changes. This agent is also used when using `Execute Shell` in the Rancher UI.

The last resource deployed to Rancher managed clusters is the DaemonSet `kube-api-auth`. This DaemonSet is only deployed to nodes with the `controlplane` role and is needed for the [Authorized Cluster Endpoint]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/kubeconfig/_index.md) feature.

### Placement

_Applies to v2.3.0 and higher_

| Component            | nodeAffinity nodeSelectorTerms             | nodeSelector | Tolerations                                                                    |
| -------------------- | ------------------------------------------ | ------------ | ------------------------------------------------------------------------------ |
| cattle-cluster-agent | `beta.kubernetes.io/os:NotIn:windows`      | none         | `operator:Exists`                                                              |
| cattle-node-agent    | `beta.kubernetes.io/os:NotIn:windows`      | none         | `operator:Exists`                                                              |
| kube-api-auth        | - `beta.kubernetes.io/os:NotIn:windows`<br/>- `node-role.kubernetes.io/controlplane:In:"true"` | none         | `operator:Exists`          |

> **Note:** In Rancher v2.2.4 and lower, the `cattle-node-agent` pods did not tolerate all taints, causing Kubernetes upgrades to fail on these nodes. The fix for this has been included in Rancher v2.2.5 and higher.

The `cattle-cluster-agent` has preferred scheduling rules using `requiredDuringSchedulingIgnoredDuringExecution` and is configured as follows:

| Weight | Expression                                       |
| ------ | ------------------------------------------------ |
| 100    | `node-role.kubernetes.io/controlplane:In:"true"` |
| 1      | `node-role.kubernetes.io/etcd:In:"true"`         |
