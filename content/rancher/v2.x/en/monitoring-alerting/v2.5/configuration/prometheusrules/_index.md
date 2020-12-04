---
title: PrometheusRules
weight: 2
---

The PrometheusRules CRD defines a group of Prometheus alerting and/or recording rules.

- [About PrometheusRule Custom Resources](#about-prometheusrule-custom-resources)
- [Creating PrometheusRules in the Rancher UI](#creating-prometheusrules-in-the-rancher-ui)
- [Configuration](#configuration)
  - [Rule Group](#rule-group)
  - [Alerting Rules](#alerting-rules)
  - [Recording Rules](#recording-rules)

# About PrometheusRule Custom Resources

Prometheus rule files are held in PrometheusRule custom resources.

The PrometheusRule custom resource defines a RuleGroup with your desired rules. Each specifies the following:

- The name of the new alert or record
- A PromQL (Prometheus query language) expression for the new alert or record
- Labels that should be attached to the alert or record that identify it (e.g. cluster name or severity)
- Annotations that encode any additional important pieces of information that need to be displayed on the notification for an alert (e.g. summary, description, message, runbook URL, etc.). This field is not required for recording rules.

Alerting rules define alert conditions based on PromQL queries, and recording rules precompute frequently needed or computationally expensive queries at defined intervals.

For more information on what fields can be specified, please look at the [Prometheus Operator spec.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#prometheusrulespec)

Use the label selector field `ruleSelector` in the Prometheus object to define the rule files that you want to be mounted into Prometheus.

For examples, refer to the Prometheus documentation on [recording rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/) and [alerting rules.](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)


# Creating PrometheusRules in the Rancher UI

_Available as of v2.5.4_

> **Prerequisite:** The monitoring application needs to be installed.

To create rule groups in the Rancher UI,

1. Click **Cluster Explorer > Monitoring** and click **Prometheus Rules.** 
1. Click **Create.**
1. Enter a **Group Name.**
1. Configure the rules. A rule group may contain either alert rules or recording rules, but not both. For help filling out the forms, refer to the configuration options below.
1. Click **Create.**

**Result:** Alerts can be configured to send notifications to the receiver(s).

# Configuration

{{% tabs %}}
{{% tab "Rancher v2.5.4" %}}
Rancher v2.5.4 introduced the capability to configure reducers by filling out forms in the Rancher UI.


### Rule Group

| Field | Description |
|-------|----------------|
| Group Name |  The name of the group. Must be unique within a rules file.   |
| Override Group Interval |  Duration in seconds for how often rules in the group are evaluated.    |


### Alerting Rules

[Alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/) allow you to define alert conditions based on PromQL (Prometheus expression language) expressions and to send notifications about firing alerts to an external service.

| Field | Description |
|-------|----------------|
| Alert Name |  The name of the alert. Must be a valid label value.   |
| Wait to fire for |   Duration in seconds. Alerts are considered firing once they have been returned for this long. Alerts which have not yet fired for long enough are considered pending. |
| PromQL Expression |   The PromQL expression to evaluate. Every evaluation cycle this is evaluated at the current time, and all resultant time series become pending/firing alerts.  For more information, refer to the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/) or our [example PromQL expressions.](../expression) |
| Labels |  Labels to add or overwrite for each alert.      |
| Severity |   When enabled, labels are attached to the alert or record that identify it by the severity level.  |
| Severity Label Value | Critical, warning, or none |

### Recording Rules

[Recording rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/#recording-rules) allow you to precompute frequently needed or computationally expensive PromQL (Prometheus expression language) expressions and save their result as a new set of time series. 

| Field | Description |
|-------|----------------|
| Time Series Name |   The name of the time series to output to. Must be a valid metric name.  |
| PromQL Expression |  The PromQL expression to evaluate. Every evaluation cycle this is evaluated at the current time, and the result recorded as a new set of time series with the metric name as given by 'record'.  For more information about expressions, refer to the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/) or our [example PromQL expressions.](../expression)  |
| Labels |   Labels to add or overwrite before storing the result.     |

{{% /tab %}}
{{% tab "Rancher v2.5.0-v2.5.3" %}}
For Rancher v2.5.0-v2.5.3, PrometheusRules must be configured in YAML. For examples, refer to the Prometheus documentation on [recording rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/) and [alerting rules.](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)
{{% /tab %}}
{{% /tabs %}}