---
title: Rancher Agents
weight: 2400
---

There are two different agent resources deployed on Rancher managed clusters:

- [cattle-cluster-agent](#cattle-cluster-agent)
- [cattle-node-agent](#cattle-node-agent)

For a conceptual overview of how the Rancher server provisions clusters and communicates with them, refer to the [architecture]({{<baseurl>}}/rancher/v2.5/en/overview/architecture/)

### cattle-cluster-agent

The `cattle-cluster-agent` is used to connect to the Kubernetes API of [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) clusters. The `cattle-cluster-agent` is deployed using a Deployment resource.

### cattle-node-agent

The `cattle-node-agent` is used to interact with nodes in a [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) cluster when performing cluster operations. Examples of cluster operations are upgrading Kubernetes version and creating/restoring etcd snapshots. The `cattle-node-agent` is deployed using a DaemonSet resource to make sure it runs on every node. The `cattle-node-agent` is used as fallback option to connect to the Kubernetes API of [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) clusters when `cattle-cluster-agent` is unavailable.

### Scheduling rules

_Applies to v2.5.4 and higher_

Starting with Rancher v2.5.4, the tolerations for the `cattle-cluster-agent` changed from `operator:Exists` (allowing all taints) to a fixed set of tolerations (listed below, if no controlplane nodes are visible in the cluster) or dynamically added tolerations based on taints applied to the controlplane nodes. This change was made to allow [Taint based Evictions](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/#taint-based-evictions) to work properly for `cattle-cluster-agent`. The default tolerations are described below. If controlplane nodes are present the cluster, the tolerations will be replaced with tolerations matching the taints on the controlplane nodes.

| Component              | nodeAffinity nodeSelectorTerms             | nodeSelector | Tolerations                                                                    |
| ---------------------- | ------------------------------------------ | ------------ | ------------------------------------------------------------------------------ |
| `cattle-cluster-agent` | `beta.kubernetes.io/os:NotIn:windows`      | none         | **Note:** These are the default tolerations, and will be replaced by tolerations matching taints applied to controlplane nodes.<br/><br/>`effect:NoSchedule`<br/>`key:node-role.kubernetes.io/controlplane`<br/>`value:true`<br/><br/>`effect:NoSchedule`<br/>`key:node-role.kubernetes.io/control-plane`<br/>`operator:Exists`<br/><br/>`effect:NoSchedule`<br/>`key:node-role.kubernetes.io/master`<br/>`operator:Exists` |
| `cattle-node-agent`    | `beta.kubernetes.io/os:NotIn:windows`      | none         | `operator:Exists`                                                              |

The `cattle-cluster-agent` Deployment has preferred scheduling rules using `preferredDuringSchedulingIgnoredDuringExecution`, favoring to be scheduled on nodes with the `controlplane` node. When there are no controlplane nodes visible in the cluster (this is usually the case when using [Clusters from Hosted Kubernetes Providers]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/)), you can add the label `cattle.io/cluster-agent=true` on a node to prefer scheduling the `cattle-cluster-agent` pod to that node.

See [Kubernetes: Assigning Pods to Nodes](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/) to find more information about scheduling rules.

The `preferredDuringSchedulingIgnoredDuringExecution` configuration is shown in the table below:

| Weight | Expression                                       |
| ------ | ------------------------------------------------ |
| 100    | `node-role.kubernetes.io/controlplane:In:"true"` |
| 100    | `node-role.kubernetes.io/control-plane:In:"true"` |
| 100    | `node-role.kubernetes.io/master:In:"true"` |
| 1      | `cattle.io/cluster-agent:In:"true"`         |

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
