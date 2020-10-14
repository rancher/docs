---
title: Configuration
weight: 3
aliases:
  - /rancher/v2.x/en/monitoring-alerting/configuration
---

This page captures some of the most important options for configuring the custom resources for monitoring.

For information on configuring custom scrape targets and rules for Prometheus, please refer to the upstream documentation for the [Prometheus Operator.](https://github.com/prometheus-operator/prometheus-operator) Some of the most important custom resources are explained in the Prometheus Operator [design documentation.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md) The Prometheus Operator documentation can help also you set up RBAC, Thanos, or custom configuration. 

- [Configuring Prometheus](#configuring-prometheus)
- [Configuring Targets with ServiceMonitors and PodMonitors](#configuring-targets-with-servicemonitors-and-podmonitors)
  - [ServiceMonitors](#servicemonitors)
  - [PodMonitors](#podmonitors)
  - [PrometheusRules](#prometheusrules)
  - [Alertmanager Config](#alertmanager-config)
- [Trusted CA for Notifiers](#trusted-ca-for-notifiers)
- [Additional Scrape Configurations](#additional-scrape-configurations)
- [Examples](#examples)

# Configuring Prometheus

The primary way that users will be able to customize this feature for specific Monitoring and Alerting use cases is by creating and/or modifying ConfigMaps, Secrets, and Custom Resources pertaining to this deployment.

Prometheus Operator introduces a set of [Custom Resource Definitions](https://github.com/prometheus-operator/prometheus-operator#customresourcedefinitions) that allow users to deploy and manage Prometheus and Alertmanager instances by creating and modifying those custom resources on a cluster.

Prometheus Operator will automatically update your Prometheus configuration based on the live state of these custom resources.

There are also certain special types of ConfigMaps/Secrets such as those corresponding to Grafana Dashboards, Grafana Datasources, and Alertmanager Configs that will automatically update your Prometheus configuration via sidecar proxies that observe the live state of those resources within your cluster.

By default, a set of these resources (curated by the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) project) are deployed onto your cluster as part of installing the Rancher Monitoring Application to set up a basic Monitoring / Alerting stack. For more information how to configure custom targets, alerts, notifiers, and dashboards after deploying the chart, see below.

# Configuring Targets with ServiceMonitors and PodMonitors

Customizing the scrape configuration used by Prometheus to determine which resources to scrape metrics from will primarily involve creating / modifying the following resources within your cluster:

### ServiceMonitors

This CRD declaratively specifies how groups of Kubernetes services should be monitored. Any Services in your cluster that match the labels located within the ServiceMonitor `selector` field will be monitored based on the `endpoints` specified on the ServiceMonitor. For more information on what fields can be specified, please look at the [spec](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#servicemonitor) provided by Prometheus Operator.

For more information about how ServiceMonitors work, refer to the [Prometheus Operator documentation.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/running-exporters.md)

### PodMonitors

This CRD declaratively specifies how group of pods should be monitored. Any Pods in your cluster that match the labels located within the PodMonitor `selector` field will be monitored based on the `podMetricsEndpoints` specified on the PodMonitor. For more information on what fields can be specified, please look at the [spec](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#podmonitorspec) provided by Prometheus Operator.

### PrometheusRules

This CRD defines a group of Prometheus alerting and/or recording rules.

To add a group of alerting / recording rules, you should create a PrometheusRule CR the defines a RuleGroup with your desired rules, each specifying:

- The name of the new alert / record
- A PromQL expression for the new alert / record
- Labels that should be attached to the alert / record that identify it (e.g. cluster name or severity)
- Annotations that encode any additional important pieces of information that need to be displayed on the notification for an alert (e.g. summary, description, message, runbook URL, etc.). This field is not required for recording rules.

For more information on what fields can be specified, please look at the [Prometheus Operator spec.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#prometheusrulespec)

### Alertmanager Config

The [Alertmanager Config](https://prometheus.io/docs/alerting/latest/configuration/#configuration-file) Secret contains the configuration of an Alertmanager instance that sends out notifications based on alerts it receives from Prometheus.

By default, Rancher Monitoring deploys a single Alertmanager onto a cluster that uses a default Alertmanager Config Secret. As part of the chart deployment options, you can opt to increase the number of replicas of the Alertmanager deployed onto your cluster that can all be managed using the same underlying Alertmanager Config Secret.
 
This Secret should be updated or modified any time you want to:
 
- Add in new notifiers or receivers
- Change the alerts that should be sent to specific notifiers or receivers
- Change the group of alerts that are sent out

> By default, you can either choose to supply an existing Alertmanager Config Secret (i.e. any Secret in the `cattle-monitoring-system` namespace) or allow Rancher Monitoring to deploy a default Alertmanager Config Secret onto your cluster. By default, the Alertmanager Config Secret created by Rancher will never be modified / deleted on an upgrade / uninstall of the `rancher-monitoring` chart to prevent users from losing or overwriting their alerting configuration when executing operations on the chart.
 
For more information on what fields can be specified in this secret, please look at the [Prometheus Alertmanager docs](https://prometheus.io/docs/alerting/latest/alertmanager/)

The full spec for the Alertmanager configuration file and what it takes in can be found [here.](https://prometheus.io/docs/alerting/latest/configuration/#configuration-file)

The notification integrations are configured with the `receiver`, which is documented [here.](https://prometheus.io/docs/alerting/latest/configuration/#receiver)

For more information, refer to the [official Prometheus documentation about configuring routes.](https://www.prometheus.io/docs/alerting/latest/configuration/#route)

# Trusted CA for Notifiers

If you need to add a trusted CA to your notifier, follow these steps:

1. Create the `cattle-monitoring-system` namespace.
1. Add your trusted CA secret to the `cattle-monitoring-system` namespace.
1. Deploy or upgrade the `rancher-monitoring` Helm chart. In the chart options, reference the secret in **Alerting > Additional Secrets.**

**Result:** The default Alertmanager custom resource will have access to your trusted CA.

# Additional Scrape Configurations

If the scrape configuration you want cannot be specified via a ServiceMonitor or PodMonitor at the moment, you can provide an `additionalScrapeConfigSecret` on deploying or upgrading `rancher-monitoring`.

A [scrape_config section](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config) specifies a set of targets and parameters describing how to scrape them. In the general case, one scrape configuration specifies a single job.

An example of where this might be used is with Istio. For more information, see [this section.](https://rancher.com/docs/rancher/v2.x/en/istio/setup/enable-istio-in-cluster/#selectors-scrape-configs)

# Examples

### ServiceMonitor

An example ServiceMonitor custom resource can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml) 

### PodMonitor

An example PodMonitor can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/user-guides/getting-started/example-app-pod-monitor.yaml) An example Prometheus resource that refers to it can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/user-guides/getting-started/prometheus-pod-monitor.yaml)

### PrometheusRule

Prometheus rule files are held in PrometheusRule custom resources. Use the label selector field ruleSelector in the Prometheus object to define the rule files that you want to be mounted into Prometheus. An example PrometheusRule is on [this page.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/alerting.md)

### Alertmanager Config

To set up notifications via Slack, the following Alertmanager Config YAML should be placed into the `alertmanager.yaml` key of the Alertmanager Config Secret, where the `api_url` should be updated to use your Webhook URL from Slack:

```yaml
route:  
  group_by: ['job']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 3h 
  receiver: 'slack-notifications'
receivers:
- name: 'slack-notifications'
  slack_configs:
  - send_resolved: true
    text: '{{ template "slack.rancher.text" . }}'
    api_url: <user-provided slack webhook url here>
templates:
- /etc/alertmanager/config/*.tmpl
```