---
title: Prometheus Configuration
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/tools/monitoring/prometheus
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/monitoring/prometheus/
  - /rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/prometheus
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/prometheus
---

_Available as of v2.2.0_

While configuring monitoring at either the [cluster level]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) or [project level]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/tools/monitoring/), there are multiple options that can be configured.

- [Basic Configuration](#basic-configuration)
- [Advanced Options](#advanced-options)
- [Node Exporter](#node-exporter)
- [Persistent Storage](#persistent-storage)
- [Remote Storage](#remote-storage)

# Basic Configuration

Option | Description
-------|-------------
Data Retention | How long your Prometheus instance retains monitoring data scraped from Rancher objects before it's purged.
[Enable Node Exporter](#node-exporter) | Whether or not to deploy the node exporter.
Node Exporter Host Port | The host port on which data is exposed, i.e. data that Prometheus collects from your node hardware. Required if you have enabled the node exporter.
[Enable Persistent Storage](#persistent-storage) for Prometheus | Whether or not to configure storage for Prometheus so that metrics can be retained even if the Prometheus pod fails.
[Enable Persistent Storage](#persistent-storage) for Grafana | Whether or not to configure storage for Grafana so that the Grafana dashboards and configuration  can be retained even if the Grafana pod fails.
Prometheus [CPU Limit](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu) |  CPU resource limit for the Prometheus pod.
Prometheus [CPU Reservation](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu) | CPU reservation for the Prometheus pod.
Prometheus [Memory Limit](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) | Memory resource limit for the Prometheus pod.
Prometheus [Memory Reservation](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) | Memory resource requests for the Prometheus pod.
Selector | Ability to select the nodes in which Prometheus and Grafana pods are deployed to. To use this option, the nodes must have labels.

# Advanced Options

Since monitoring is an [application](https://github.com/rancher/system-charts/tree/dev/charts/rancher-monitoring) from the [Rancher catalog]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/), it can be configured like any other catalog application, by passing in values to Helm.

> **Warning:** Any modification to the application without understanding the entire application can lead to catastrophic errors.

### Prometheus RemoteRead and RemoteWrite

_Available as of v2.4.0_

Prometheus RemoteRead and RemoteWrite can be configured as custom answers in the **Advanced Options** section.

For more information on remote endpoints and storage, refer to the [Prometheus documentation.](https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage)

The Prometheus operator documentation contains the full [RemoteReadSpec](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#remotereadspec) and [RemoteWriteSpec.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#remotewritespec)

An example configuration would be:

| Variable | Value |
|--------------|------------|
|  `prometheus.remoteWrite[0].url` | `http://mytarget.com` |

### LivenessProbe and ReadinessProbe

_Available as of v2.4.0_

Prometheus LivenessProbe and ReadinessProbe can be configured as custom answers in the **Advanced Options** section.

The Kubernetes probe spec is [here.](https://v1-17.docs.kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#probe-v1-core)

Some example key-value pairs are:

| Variable | Value |
|--------------|------------|
| `prometheus.livenessProbe.timeoutSeconds` | 60 |
| `prometheus.readinessProbe.timeoutSeconds` | 60 |

# Node Exporter

The [node exporter](https://github.com/prometheus/node_exporter/blob/master/README.md) is a popular open source exporter, which exposes the metrics for hardware and \*NIX kernels OS. It is designed to monitor the host system. However, there are still issues with namespaces when running it in a container, mostly around filesystem mount spaces. In order to monitor actual network metrics for the container network, the node exporter must be deployed with the `hostNetwork` mode.

When configuring Prometheus and enabling the node exporter, enter a host port in the **Node Exporter Host Port** that will not produce port conflicts with existing applications. The host port chosen must be open to allow internal traffic between Prometheus and the Node Exporter.

>**Warning:** In order for Prometheus to collect the metrics of the node exporter, after enabling cluster monitoring, you must open the <b>Node Exporter Host Port</b> in the host firewall rules to allow intranet access. By default, `9796` is used as that host port.

# Persistent Storage

>**Prerequisite:** Configure one or more StorageClasses to use as [persistent storage]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/volumes-and-storage/) for your Prometheus or Grafana pod.

By default, when you enable Prometheus for either a cluster or project, all monitoring data that Prometheus collects is stored on its own pod. With local storage, if the Prometheus or Grafana pods fail, all the data is lost. Rancher recommends configuring an external persistent storage to the cluster. With the external persistent storage, if the Prometheus or Grafana pods fail, the new pods can recover using data from the persistent storage.

When enabling persistent storage for Prometheus or Grafana, specify the size of the persistent volume and select the StorageClass.

# Remote Storage

>**Prerequisite:** Need a remote storage endpoint to be available. The possible list of integrations is available [here](https://prometheus.io/docs/operating/integrations/)

Using advanced options, remote storage integration for the Prometheus installation can be configured as follows:

```
prometheus.remoteWrite[0].url = http://remote1/push
prometheus.remoteWrite[0].remoteTimeout = 33s

prometheus.remoteWrite[1].url = http://remote2/push


prometheus.remoteRead[0].url = http://remote1/read
prometheus.remoteRead[0].proxyUrl = http://proxy.url
prometheus.remoteRead[0].bearerToken = token-value

prometheus.remoteRead[1].url = http://remote2/read
prometheus.remoteRead[1].remoteTimeout = 33s
prometheus.remoteRead[1].readRecent = true
```

Additional fields can be set up based on the [ReadSpec](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#remotereadspec) and [RemoteWriteSpec](https://github.com/coreos/prometheus-operator/blob/master/Documentation/api.md#remotewritespec)
