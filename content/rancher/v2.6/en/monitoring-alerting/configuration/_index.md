---
title: Configuration
weight: 5
aliases:
  - /rancher/v2.5/en/monitoring-alerting/v2.5/configuration
---

This page captures some of the most important options for configuring Monitoring V2 in the Rancher UI.

For information on configuring custom scrape targets and rules for Prometheus, please refer to the upstream documentation for the [Prometheus Operator.](https://github.com/prometheus-operator/prometheus-operator) Some of the most important custom resources are explained in the Prometheus Operator [design documentation.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md) The Prometheus Operator documentation can help also you set up RBAC, Thanos, or custom configuration. 

This section assumes that you understand how the Prometheus Operator’s custom resources work together. For more information, see [this section.]

# Setting Resource Limits and Requests

The resource requests and limits for the monitoring application can be configured when installing `rancher-monitoring`. For more information about the default limits, see [this page.](./resource-limits)

# Prometheus Configuration

It is usually not necessary to directly edit the Prometheus custom resource.

Instead, to configure Prometheus to scrape custom metrics, you will only need to create a new ServiceMonitor or PodMonitor to configure Prometheus to scrape additional metrics.


### ServiceMonitor and PodMonitor Configuration

For details, see [this page.](./)

### Advanced Prometheus Configuration

Link to ‘how monitoring works’ for the section about the Prometheus CR. 

For more information about directly editing the Prometheus custom resource, which may be helpful in advanced use cases, see [this page.](./advanced/prometheus)

# Alertmanager Configuration

The Alertmanager custom resource usually doesn't need to be edited directly. For most common use cases, you can manage alerts by updating Routes and Receivers.

Routes and receivers are part of the configuration of the alertmanager custom resource. In the Rancher UI, Routes and Receivers are not true custom resources, but pseudo-custom resources that are mapped to sections within the Alertmanager custom resource.

When routes and receivers are updated, the monitoring application will automatically update Alertmanager to reflect those changes.

For some advanced use cases, you may want to configure alertmanager directly. For more information, refer to [this page.](./advanced/alertmanager)



### Receivers

[link to section of how monitoring works that explains receivers]

For details on how to configure receivers, see [this page.](./receiver)
### Routes
[link to section of how monitoring works that explains routes]

The route needs to refer to a receiver that has already been configured.

### Advanced

Link to ‘how monitoring works’ for the section about the alertmanager CR.

For more information about directly editing the Alertmanager custom resource, which may be helpful in advanced use cases, see [this page.](./advanced/alertmanager)