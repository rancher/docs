---
title: Metrics Server
weight: 263
---

By default, RKE deploys [Metrics Server](https://github.com/kubernetes-incubator/metrics-server) to provide metrics on resources in your cluster.

RKE will deploy Metrics Server as a Deployment.

The image used for Metrics Server is under the [`system_images` directive]({{<baseurl>}}/rke/latest/en/config-options/system-images/). For each Kubernetes version, there is a default image associated with the Metrics Server, but these can be overridden by changing the image tag in `system_images`.

- [Tolerations](#tolerations)
- [Priority Class Name](#metrics-server-priority-class-name)
- [Disabling the Metrics Server](#disabling-the-metrics-server)

### Tolerations

_Available as of v1.2.4_

The configured tolerations apply to the `metrics-server` Deployment.

```yaml
monitoring:
  tolerations:
  - key: "node.kubernetes.io/unreachable"
    operator: "Exists"
    effect: "NoExecute"
    tolerationseconds: 300
  - key: "node.kubernetes.io/not-ready"
    operator: "Exists"
    effect: "NoExecute"
    tolerationseconds: 300
```

To check for applied tolerations on the `metrics-server` Deployment, use the following commands:

```
kubectl -n kube-system get deploy metrics-server -o jsonpath='{.spec.template.spec.tolerations}'
```

### Metrics Server Priority Class Name

_Available as of RKE v1.2.6+_

The [pod priority](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#pod-priority) is set by configuring a priority class name:

```yaml
monitoring:
  provider: metrics-server
  metrics_server_priority_class_name: system-cluster-critical
```

### Disabling the Metrics Server

_Available as of v0.2.0_

You can disable the default controller by specifying `none` to the monitoring `provider` directive in the cluster configuration.

```yaml
monitoring:
  provider: none
```
