---
title: Configuring PrometheusRules
weight: 3
---

A PrometheusRule defines a group of Prometheus alerting and/or recording rules.

> This section assumes familiarity with how monitoring components work together. For more information, see [this section.]({{<baseurl>}}/rancher/v2.6/en/monitoring-alerting/how-monitoring-works)


### Creating PrometheusRules in the Rancher UI

> **Prerequisite:** The monitoring application needs to be installed.

To create rule groups in the Rancher UI,

1. Go to the cluster where you want to create rule groups. Click **Monitoring** and click **Prometheus Rules**. 
1. Click **Create**.
1. Enter a **Group Name**.
1. Configure the rules. In Rancher's UI, we expect a rule group to contain either alert rules or recording rules, but not both. For help filling out the forms, refer to the configuration options below.
1. Click **Create**.

**Result:** Alerts can be configured to send notifications to the receiver(s).

### About the PrometheusRule Custom Resource

When you define a Rule (which is declared within a RuleGroup in a PrometheusRule resource), the [spec of the Rule itself](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#rule) contains labels that are used by Alertmanager to figure out which Route should receive this Alert. For example, an Alert with the label `team: front-end` will be sent to all Routes that match on that label.

Prometheus rule files are held in PrometheusRule custom resources. A PrometheusRule allows you to define one or more RuleGroups. Each RuleGroup consists of a set of Rule objects that can each represent either an alerting or a recording rule with the following fields:

- The name of the new alert or record
- A PromQL expression for the new alert or record
- Labels that should be attached to the alert or record that identify it (e.g. cluster name or severity)
- Annotations that encode any additional important pieces of information that need to be displayed on the notification for an alert (e.g. summary, description, message, runbook URL, etc.). This field is not required for recording rules.

For more information on what fields can be specified, please look at the [Prometheus Operator spec.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#prometheusrulespec)

Use the label selector field `ruleSelector` in the Prometheus object to define the rule files that you want to be mounted into Prometheus.

For examples, refer to the Prometheus documentation on [recording rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/) and [alerting rules.](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/)

# Configuration

### Rule Group

| Field | Description |
|-------|----------------|
| Group Name |  The name of the group. Must be unique within a rules file.   |
| Override Group Interval |  Duration in seconds for how often rules in the group are evaluated.    |


### Alerting Rules

[Alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/) allow you to define alert conditions based on PromQL (Prometheus Query Language) expressions and to send notifications about firing alerts to an external service.

| Field | Description |
|-------|----------------|
| Alert Name |  The name of the alert. Must be a valid label value.   |
| Wait To Fire For |   Duration in seconds. Alerts are considered firing once they have been returned for this long. Alerts which have not yet fired for long enough are considered pending. |
| PromQL Expression |   The PromQL expression to evaluate. Prometheus will evaluate the current value of this PromQL expression on every evaluation cycle and all resultant time series will become pending/firing alerts. For more information, refer to the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/) or our [example PromQL expressions.](../../../expression) |
| Labels |  Labels to add or overwrite for each alert.      |
| Severity |   When enabled, labels are attached to the alert or record that identify it by the severity level.  |
| Severity Label Value | Critical, warning, or none |
| Annotations |  Annotations are a set of informational labels that can be used to store longer additional information, such as alert descriptions or runbook links. A [runbook](https://en.wikipedia.org/wiki/Runbook) is a set of documentation about how to handle alerts. The annotation values can be [templated.](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/#templating)  |

### Recording Rules

[Recording rules](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/#recording-rules) allow you to precompute frequently needed or computationally expensive PromQL (Prometheus Query Language) expressions and save their result as a new set of time series. 

| Field | Description |
|-------|----------------|
| Time Series Name |   The name of the time series to output to. Must be a valid metric name.  |
| PromQL Expression |  The PromQL expression to evaluate. Prometheus will evaluate the current value of this PromQL expression on every evaluation cycle and the result will be recorded as a new set of time series with the metric name as given by 'record'.  For more information about expressions, refer to the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/) or our [example PromQL expressions.](../expression)  |
| Labels |   Labels to add or overwrite before storing the result.     |
