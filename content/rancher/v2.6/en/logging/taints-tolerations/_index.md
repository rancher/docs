---
title: Working with Taints and Tolerations
weight: 6
---

"Tainting" a Kubernetes node causes pods to repel running on that node.

Unless the pods have a `toleration` for that node's taint, they will run on other nodes in the cluster.

[Taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) can work in conjunction with the `nodeSelector` [field](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) within the `PodSpec`, which enables the *opposite* effect of a taint. 

Using `nodeSelector` gives pods an affinity towards certain nodes.

Both provide choice for the what node(s) the pod will run on.

- [Default Implementation in Rancher's Logging Stack](#default-implementation-in-rancher-s-logging-stack)
- [Adding NodeSelector Settings and Tolerations for Custom Taints](#adding-nodeselector-settings-and-tolerations-for-custom-taints)


### Default Implementation in Rancher's Logging Stack

By default, Rancher taints all Linux nodes with `cattle.io/os=linux`, and does not taint Windows nodes.
The logging stack pods have `tolerations` for this taint, which enables them to run on Linux nodes.
Moreover, most logging stack pods run on Linux only and have a `nodeSelector` added to ensure they run on Linux nodes.

This example Pod YAML file shows a nodeSelector being used with a toleration:

```yaml
apiVersion: v1
kind: Pod
# metadata...
spec:
  # containers...
  tolerations:
    - key: cattle.io/os
      operator: "Equal"
      value: "linux"
      effect: NoSchedule
  nodeSelector:
    kubernetes.io/os: linux
```

In the above example, we ensure that our pod only runs on Linux nodes, and we add a `toleration` for the taint we have on all of our Linux nodes.

You can do the same with Rancher's existing taints, or with your own custom ones.

### Adding NodeSelector Settings and Tolerations for Custom Taints

If you would like to add your own `nodeSelector` settings, or if you would like to add `tolerations` for additional taints, you can pass the following to the chart's values.

```yaml
tolerations:
  # insert tolerations...
nodeSelector:
  # insert nodeSelector...
```

These values will add both settings to the `fluentd`, `fluentbit`, and `logging-operator` containers.
Essentially, these are global settings for all pods in the logging stack.

However, if you would like to add tolerations for *only* the `fluentbit` container, you can add the following to the chart's values.

```yaml
fluentbit_tolerations:
  # insert tolerations list for fluentbit containers only...
```
