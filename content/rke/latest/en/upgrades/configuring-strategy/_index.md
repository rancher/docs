---
title: Configuring the Upgrade Strategy
weight: 2
---

In this section, you'll learn how to configure the maximum number of unavailable controlplane and worker nodes, how to drain nodes before upgrading them, and how to configure the replicas for addons such as Ingress.

- [Maximum Unavailable Nodes](#maximum-unavailable-nodes)
- [Draining Nodes](#draining-nodes)
- [Replicas for Ingress and Networking Addons](#replicas-for-ingress-and-networking-addons)
- [Replicas for DNS and Monitoring Addons](#replicas-for-dns-and-monitoring-addons)
- [Example cluster.yml](#example-cluster-yml)

### Maximum Unavailable Nodes

The maximum number of unavailable controlplane and worker nodes can be configured in the `cluster.yml` before upgrading the cluster:

- **max_unavailable_controlplane:** The maximum number of controlplane nodes that can fail without causing the cluster upgrade to fail. By default, `max_unavailable_controlplane` is defined as one node.
- **max_unavailable_worker:** The maximum number of worker nodes that can fail without causing the cluster upgrade to fail. By default, `max_unavailable_worker` is defined as 10 percent of all worker nodes.*

/*  This number can be configured as a percentage or as an integer. When defined as a percentage, the batch size is rounded down to the nearest node, with a minimum of one node per batch.

An example configuration of the cluster upgrade strategy is shown below:

```yaml
upgrade_strategy:
  max_unavailable_worker: 10%
  max_unavailable_controlplane: 1
```

### Draining Nodes

By default, nodes are cordoned first before upgrading. Each node should always be cordoned before starting its upgrade so that new pods will not be scheduled to it, and traffic will not reach the node. In addition to cordoning each node, RKE can also be configured to drain each node before starting its upgrade. Draining a node will evict all the pods running on the computing resource.

For information on draining and how to safely drain a node, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/)

If the `drain` directive is set to `true` in the `cluster.yml`, worker nodes will be drained before they are upgraded. The default value is false:

```yaml
upgrade_strategy:
  max_unavailable_worker: 10%
  max_unavailable_controlplane: 1
  drain: false
  node_drain_input:
    force: false
    ignore_daemonsets: true
    delete_local_data: false
    grace_period: -1 // grace period specified for each pod spec will be used
    timeout: 60
```

### Replicas for Ingress and Networking Addons

The Ingress and network addons are launched as Kubernetes [daemonsets.](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) If no value is given for the [update strategy,](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy) Kubernetes sets the update strategy to `rollingUpdate` by default, with `maxUnavailable` set to 1.

An example configuration of the Ingress and network addons is shown below:

```yaml
ingress:
  provider: nginx
  update_strategy: 
    strategy: RollingUpdate
    rollingUpdate:
      maxUnavailable: 5
network:
  plugin: canal
  update_strategy: 
    strategy: RollingUpdate
    rollingUpdate:
      maxUnavailable: 6
```

### Replicas for DNS and Monitoring Addons

The DNS and monitoring addons are launched as Kubernetes [deployments.](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) These addons include `coredns`, `kubedns`, and `metrics-server`, the monitoring deployment.

If no value is configured for their [update strategy](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy) in the `cluster.yml`, Kubernetes sets the update strategy to `rollingUpdate` by default, with `maxUnavailable` set to 25% and `maxSurge` set to 25%.

The DNS addons use `cluster-proportional-autoscaler`, which is an [open-source container image](https://github.com/kubernetes-incubator/cluster-proportional-autoscaler) that watches over the number of schedulable nodes and cores of the cluster and resizes the number of replicas for the required resource. This functionality is useful for applications that need to be autoscaled with the number of nodes in the cluster. For the DNS addon, the fields needed for the `cluster-proportional-autoscaler` are made configurable.

The following table shows the default values for these fields:

Field Name | Default Value
-----------|--------------
coresPerReplica | 128
nodesPerReplica | 4
min | 1
preventSinglePointFailure | true

The `cluster-proportional-autoscaler` uses this formula to calculate the number of replicas:

```plain
replicas = max( ceil( cores * 1/coresPerReplica ) , ceil( nodes * 1/nodesPerReplica ) )
replicas = min(replicas, max)
replicas = max(replicas, min)
```

An example configuration of the DNS and monitoring addons is shown below:

```yaml
dns:
  provider: coredns
  update_strategy: 
    strategy: RollingUpdate
    rollingUpdate:
      maxUnavailable: 20%
      maxSurge: 15%
  linear_autoscaler_params:
    cores_per_replica: 0.34
    nodes_per_replica: 4
    prevent_single_point_failure: true
    min: 2 
    max: 3
monitoring:
  provider: metrics-server
  update_strategy: 
    strategy: RollingUpdate
    rollingUpdate:
      maxUnavailable: 8
```

### Example cluster.yml

```yaml
# If you intened to deploy Kubernetes in an air-gapped environment,
# please consult the documentation on how to configure custom RKE images.
nodes:
# At least three etcd nodes, two controlplane nodes, and two worker nodes,
# nodes skipped for brevity
upgrade_strategy:
  max_unavailable_worker: 10%
  max_unavailable_controlplane: 1
  drain: false
  node_drain_input:
    force: false
    ignore_daemonsets: true
    delete_local_data: false
    grace_period: -1 // grace period specified for each pod spec will be used
    timeout: 60
ingress:
  provider: nginx
  update_strategy: # Available in v2.4
    strategy: RollingUpdate
    rollingUpdate:
      maxUnavailable: 5
network:
  plugin: canal
  update_strategy: # Available in v2.4
    strategy: RollingUpdate
    rollingUpdate:
      maxUnavailable: 6
dns:
  provider: coredns
  update_strategy: # Available in v2.4
    strategy: RollingUpdate
    rollingUpdate:
      maxUnavailable: 20%
      maxSurge: 15%
  linear_autoscaler_params:
    cores_per_replica: 0.34
    nodes_per_replica: 4
    prevent_single_point_failure: true
    min: 2 
    max: 3
monitoring:
  provider: metrics-server
  update_strategy: # Available in v2.4
    strategy: RollingUpdate
    rollingUpdate:
      maxUnavailable: 8
```
