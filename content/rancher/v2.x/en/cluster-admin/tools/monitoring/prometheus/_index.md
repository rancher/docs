---
title: Prometheus Configuration
weight: 1
---

_Available as of v2.2.0_


While configuring monitoring at either the [cluster level]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/#enabling-cluster-monitoring) or [project level]({{< baseurl >}}/rancher/v2.x/en/project-admin/tools/monitoring/#enabling-project-monitoring), there are multiple options that can be configured.

Option | Description
-------|-------------
Data Retention | How long your Prometheus instance retains monitoring data scraped from Rancher objects before it's purged.
[Enable Node Exporter](#node-exporter) | Whether or not to deploy the node exporter.
Node Exporter Host Port | The host port on which data is exposed, i.e. data that Prometheus collects from your node hardware. Required if you have enabled the node exporter.
[Enable Persistent Storage](#persistent-storage) for Prometheus | Whether or not to configure storage for Prometheus so that metrics can be retained even if the Prometheus pod fails.
[Enable Persistent Storage](#persistent-storage) for Grafana | Whether or not to configure storage for Grafana so that the Grafana dashboards and configuration  can be retained even if the Grafana pod fails.
Prometheus [CPU Limit](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu) |  CPU resource limit for the Prometheus pod.
Prometheus [CPU Reservation](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu) | CPU reservation for the Promehtues pod.
Prometheus [Memory Limit](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) | Memory resource limit for the Prometheus pod.
Prometheus [Memory Reservation](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) | Memory resource requests for the Prometheus pod.
Selector | Ability to select the nodes in which Prometheus and Grafana pods are deployed to. To use this option, the nodes must have labels.
Advanced Options | Since monitoring is an [application](https://github.com/rancher/system-charts/tree/dev/charts/rancher-monitoring) from the [Rancher catalog]({{< baseurl >}}/rancher/v2.x/en/catalog/), it can be [configured like other catalog application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/#configuration-options). _Warning: Any modification to the application without understanding the entire application can lead to catastrophic errors._

## Node Exporter

The [node exporter](https://github.com/prometheus/node_exporter/blob/master/README.md) is a popular open source exporter, which exposes the metrics for hardware and \*NIX kernels OS. It is designed to monitor the host system. However, there are still issues with namespaces when running it in a container, mostly around filesystem mount spaces. In order to monitor actual network metrics for the container network, the node exporter must be deployed with the `hostNetwork` mode.

When configuring Prometheus and enabling the node exporter, enter a host port in the **Node Exporter Host Port** that will not produce port conflicts with existing applications. The host port chosen must be open to allow internal traffic between Prometheus and the Node Exporter.

## Persistent Storage

>**Prerequisite:** Configure one or more [storage class]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/#adding-storage-classes) to use as [persistent storage]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/) for your Prometheus or Grafana pod.

By default, when you enable Prometheus for either a cluster or project, all monitoring data that Prometheus collects is stored on its own pod. With local storage, if the Prometheus or Grafana pods fail, all the data is lost. Rancher recommends configuring an external persistent storage to the cluster. With the external persistent storage, if the Prometheus or Grafana pods fail, the new pods can recover using data from the persistent storage.

When enabling persistent storage for Prometheus or Grafana, specify the size of the persistent volume and select the [storage class]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/#storage-classes).
