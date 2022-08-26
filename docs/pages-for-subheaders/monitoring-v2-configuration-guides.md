---
title: Configuration
weight: 5
---

This page captures some of the most important options for configuring Monitoring V2 in the Rancher UI.

For information on configuring custom scrape targets and rules for Prometheus, please refer to the upstream documentation for the [Prometheus Operator.](https://github.com/prometheus-operator/prometheus-operator) Some of the most important custom resources are explained in the Prometheus Operator [design documentation.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md) The Prometheus Operator documentation can help also you set up RBAC, Thanos, or custom configuration. 

# Setting Resource Limits and Requests

The resource requests and limits for the monitoring application can be configured when installing `rancher-monitoring`. For more information about the default limits, see [this page.](../reference-guides/monitoring-v2-configuration/helm-chart-options.md#configuring-resource-limits-and-requests)

:::note

On an idle cluster, Monitoring V2 has significantly higher CPU usage (up to 70%) as compared to Monitoring V1. To improve performance and achieve similar results as in Monitoring V1, turn off the Prometheus adapter. 

:::

# Prometheus Configuration

It is usually not necessary to directly edit the Prometheus custom resource.

Instead, to configure Prometheus to scrape custom metrics, you will only need to create a new ServiceMonitor or PodMonitor to configure Prometheus to scrape additional metrics.


### ServiceMonitor and PodMonitor Configuration

For details, see [this page.](../reference-guides/monitoring-v2-configuration/servicemonitors-and-podmonitors.md)

### Advanced Prometheus Configuration

For more information about directly editing the Prometheus custom resource, which may be helpful in advanced use cases, see [this page.](../how-to-guides/advanced-user-guides/monitoring-v2-configuration-guides/advanced-configuration/prometheus.md)

# Alertmanager Configuration

The Alertmanager custom resource usually doesn't need to be edited directly. For most common use cases, you can manage alerts by updating Routes and Receivers.

Routes and receivers are part of the configuration of the alertmanager custom resource. In the Rancher UI, Routes and Receivers are not true custom resources, but pseudo-custom resources that the Prometheus Operator uses to synchronize your configuration with the Alertmanager custom resource. When routes and receivers are updated, the monitoring application will automatically update Alertmanager to reflect those changes.

For some advanced use cases, you may want to configure alertmanager directly. For more information, refer to [this page.](../how-to-guides/advanced-user-guides/monitoring-v2-configuration-guides/advanced-configuration/alertmanager.md)

### Receivers

Receivers are used to set up notifications. For details on how to configure receivers, see [this page.](../reference-guides/monitoring-v2-configuration/receivers.md)
### Routes

Routes filter notifications before they reach receivers. Each route needs to refer to a receiver that has already been configured. For details on how to configure routes, see [this page.](../reference-guides/monitoring-v2-configuration/routes.md)

### Advanced

For more information about directly editing the Alertmanager custom resource, which may be helpful in advanced use cases, see [this page.](../how-to-guides/advanced-user-guides/monitoring-v2-configuration-guides/advanced-configuration/alertmanager.md)