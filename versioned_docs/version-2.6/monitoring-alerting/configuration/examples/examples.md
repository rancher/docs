---
title: Examples
weight: 400
---


### ServiceMonitor

An example ServiceMonitor custom resource can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml) 

### PodMonitor

An example PodMonitor can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/user-guides/getting-started/example-app-pod-monitor.yaml) An example Prometheus resource that refers to it can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/user-guides/getting-started/prometheus-pod-monitor.yaml)

### PrometheusRule

For users who are familiar with Prometheus, a PrometheusRule contains the alerting and recording rules that you would normally place in a [Prometheus rule file](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/).

For a more fine-grained application of PrometheusRules within your cluster, the ruleSelector field on a Prometheus resource allows you to select which PrometheusRules should be loaded onto Prometheus based on the labels attached to the PrometheusRules resources.

An example PrometheusRule is on [this page.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/alerting.md)

### Alertmanager Config

For an example configuration, refer to [this section.](../advanced/alertmanager/#example-alertmanager-config)