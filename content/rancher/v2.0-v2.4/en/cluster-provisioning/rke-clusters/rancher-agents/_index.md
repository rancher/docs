---
title: Rancher Agents
weight: 2400
---

There are two different agent resources deployed on Rancher managed clusters:

- [cattle-cluster-agent](#cattle-cluster-agent)
- [cattle-node-agent](#cattle-node-agent)

For a conceptual overview of how the Rancher server provisions clusters and communicates with them, refer to the [architecture]({{<baseurl>}}/rancher/v2.0-v2.4/en/overview/architecture/)

### cattle-cluster-agent

The `cattle-cluster-agent` is used to connect to the Kubernetes API of [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) clusters. The `cattle-cluster-agent` is deployed using a Deployment resource.

### cattle-node-agent

The `cattle-node-agent` is used to interact with nodes in a [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) cluster when performing cluster operations. Examples of cluster operations are upgrading Kubernetes version and creating/restoring etcd snapshots. The `cattle-node-agent` is deployed using a DaemonSet resource to make sure it runs on every node. The `cattle-node-agent` is used as fallback option to connect to the Kubernetes API of [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) clusters when `cattle-cluster-agent` is unavailable.

> **Note:** In Rancher v2.2.4 and lower, the `cattle-node-agent` pods did not tolerate all taints, causing Kubernetes upgrades to fail on these nodes. The fix for this has been included in Rancher v2.2.5 and higher.

### Scheduling rules

_Applies to v2.3.0 up to v2.5.3_

| Component              | nodeAffinity nodeSelectorTerms             | nodeSelector | Tolerations                                                                    |
| ---------------------- | ------------------------------------------ | ------------ | ------------------------------------------------------------------------------ |
| `cattle-cluster-agent` | `beta.kubernetes.io/os:NotIn:windows`      | none         | `operator:Exists`                                                              |
| `cattle-node-agent`    | `beta.kubernetes.io/os:NotIn:windows`      | none         | `operator:Exists`                                                              |

The `cattle-cluster-agent` Deployment has preferred scheduling rules using `preferredDuringSchedulingIgnoredDuringExecution`, favoring to be scheduled on nodes with the `controlplane` node. See [Kubernetes: Assigning Pods to Nodes](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/) to find more information about scheduling rules.

The `preferredDuringSchedulingIgnoredDuringExecution` configuration is shown in the table below:

| Weight | Expression                                       |
| ------ | ------------------------------------------------ |
| 100    | `node-role.kubernetes.io/controlplane:In:"true"` |
| 1      | `node-role.kubernetes.io/etcd:In:"true"`         |
