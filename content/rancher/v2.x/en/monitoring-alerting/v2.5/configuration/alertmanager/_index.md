---
title: Alertmanager
weight: 1
---

The [Alertmanager Config](https://prometheus.io/docs/alerting/latest/configuration/#configuration-file) Secret contains the configuration of an Alertmanager instance that sends out notifications based on alerts it receives from Prometheus.

- [Overview](#overview)
  - [Connecting Routes and PrometheusRules](#connecting-routes-and-prometheusrules)
- [Creating Receivers in the Rancher UI](#creating-receivers-in-the-rancher-ui)
- [Receiver Configuration](#receiver-configuration)
  - [Slack](#slack)
  - [Email](#email)
  - [PagerDuty](#pagerduty)
  - [Opsgenie](#opsgenie)
  - [Webhook](#webhook)
  - [Custom](#custom)
- [Route Configuration](#route-configuration)
  - [Receiver](#receiver)
  - [Grouping](#grouping)
  - [Matching](#matching)
- [Example Alertmanager Config](#example-alertmanager-config)
- [Example Route Config for CIS Scan Alerts](#example-route-config-for-cis-scan-alerts)

# Overview

By default, Rancher Monitoring deploys a single Alertmanager onto a cluster that uses a default Alertmanager Config Secret. As part of the chart deployment options, you can opt to increase the number of replicas of the Alertmanager deployed onto your cluster that can all be managed using the same underlying Alertmanager Config Secret.
 
This Secret should be updated or modified any time you want to:
 
- Add in new notifiers or receivers
- Change the alerts that should be sent to specific notifiers or receivers
- Change the group of alerts that are sent out

> By default, you can either choose to supply an existing Alertmanager Config Secret (i.e. any Secret in the `cattle-monitoring-system` namespace) or allow Rancher Monitoring to deploy a default Alertmanager Config Secret onto your cluster. By default, the Alertmanager Config Secret created by Rancher will never be modified / deleted on an upgrade / uninstall of the `rancher-monitoring` chart to prevent users from losing or overwriting their alerting configuration when executing operations on the chart.
 
For more information on what fields can be specified in this secret, please look at the [Prometheus Alertmanager docs.](https://prometheus.io/docs/alerting/latest/alertmanager/)

The full spec for the Alertmanager configuration file and what it takes in can be found [here.](https://prometheus.io/docs/alerting/latest/configuration/#configuration-file)

For more information, refer to the [official Prometheus documentation about configuring routes.](https://www.prometheus.io/docs/alerting/latest/configuration/#route)

### Connecting Routes and PrometheusRules

When you define a Rule (which is declared within a RuleGroup in a PrometheusRule resource), the [spec of the Rule itself](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#rule) contains labels that are used by Prometheus to figure out which Route should receive this Alert. For example, an Alert with the label `team: front-end` will be sent to all Routes that match on that label.

# Creating Receivers in the Rancher UI
_Available as of v2.5.4_

> **Prerequisites:**
>
>- The monitoring application needs to be installed.
>- If you configured monitoring with an existing Alertmanager Secret, it must have a format that is supported by Rancher's UI. Otherwise you will only be able to make changes based on modifying the Alertmanager Secret directly. Note: We are continuing to make enhancements to what kinds of Alertmanager Configurations we can support using the Routes and Receivers UI, so please [file an issue](https://github.com/rancher/rancher/issues/new) if you have a request for a feature enhancement.

To create notification receivers in the Rancher UI,

1. Click **Cluster Explorer > Monitoring** and click **Receiver.** 
2. Enter a name for the receiver.
3. Configure one or more providers for the receiver. For help filling out the forms, refer to the configuration options below.
4. Click **Create.**

**Result:** Alerts can be configured to send notifications to the receiver(s).

# Receiver Configuration

The notification integrations are configured with the `receiver`, which is explained in the [Prometheus documentation.](https://prometheus.io/docs/alerting/latest/configuration/#receiver)

Rancher v2.5.4 introduced the capability to configure receivers by filling out forms in the Rancher UI.

{{% tabs %}}
{{% tab "Rancher v2.5.4+" %}}

The following types of receivers can be configured in the Rancher UI:

- <a href="#slack">Slack</Slack>
- <a href="#email">Email</Slack>
- <a href="#pagerduty">PagerDuty</Slack>
- <a href="#opsgenie">Opsgenie</Slack>
- <a href="#webhook">Webhook</Slack>
- <a href="#custom">Custom</Slack>

The custom receiver option can be used to configure any receiver in YAML that cannot be configured by filling out the other forms in the Rancher UI.

### Slack

| Field | Type | Description |
|------|--------------|------|
| URL | String   |  Enter your Slack webhook URL. For instructions to create a Slack webhook, see the [Slack documentation.](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack)  |
| Default Channel |  String   |  Enter the name of the channel that you want to send alert notifications in the following format: `#<channelname>`. | 
| Proxy URL   |    String    |  Proxy for the webhook notifications.  |
| Enable Send Resolved Alerts |   Bool    |  Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage). |

### Email

| Field | Type | Description |
|------|--------------|------|
| Default Recipient Address |   String    |   The email address that will receive notifications.    |
| Enable Send Resolved Alerts |  Bool    |   Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage). | 

SMTP options:

| Field | Type | Description |
|------|--------------|------|
| Sender |   String       |  Enter an email address available on your SMTP mail server that you want to send the notification from.   |
| Host |   String         | Enter the IP address or hostname for your SMTP server. Example: `smtp.email.com`. |
| Use TLS |   Bool     | Use TLS for encryption. |
| Username |   String   | Enter a username to authenticate with the SMTP server. |
| Password |   String    | Enter a password to authenticate with the SMTP server. |

### PagerDuty

| Field | Type | Description |
|------|------|-------|
| Integration Type | String | `Events API v2` or `Prometheus`. |
| Default Integration Key | String |  For instructions to get an integration key, see the [PagerDuty documentation.](https://www.pagerduty.com/docs/guides/prometheus-integration-guide/)  |
| Proxy URL | String |  Proxy for the PagerDuty notifications.  |
| Enable Send Resolved Alerts |  Bool    |   Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage). | 

### Opsgenie

| Field | Description |
|------|-------------|
| API Key |   For instructions to get an API key, refer to the [Opsgenie documentation.](https://docs.opsgenie.com/docs/api-key-management)             |
| Proxy URL |   Proxy for the Opsgenie notifications.        |
| Enable Send Resolved Alerts | Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage).  |

Opsgenie Responders:

| Field |    Type | Description |
|-------|------|--------|
| Type | String | Schedule, Team, User, or Escalation. For more information on alert responders, refer to the [Opsgenie documentation.](https://docs.opsgenie.com/docs/alert-recipients-and-teams) |
| Send To | String | Id, Name, or Username of the Opsgenie recipient. |

### Webhook

| Field |    Description |
|-------|--------------|
| URL | Webhook URL for the app of your choice. |
| Proxy URL | Proxy for the webhook notification. |
| Enable Send Resolved Alerts | Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage).    |

### Custom

The YAML provided here will be directly appended to your receiver within the Alertmanager Config Secret.

{{% /tab %}}
{{% tab "Rancher v2.5.0-2.5.3" %}}
The Alertmanager must be configured in YAML, as shown in this [example.](#example-alertmanager-config)
{{% /tab %}}
{{% /tabs %}}


# Route Configuration

{{% tabs %}}
{{% tab "Rancher v2.5.4+" %}}

### Receiver
The route needs to refer to a [receiver](#receiver-configuration) that has already been configured.

### Grouping

| Field |    Default | Description |
|-------|--------------|---------|
| Group By |  N/a | The labels by which incoming alerts are grouped together. For example, `[ group_by: '[' <labelname>, ... ']' ]` Multiple alerts coming in for labels such as `cluster=A` and `alertname=LatencyHigh` can be batched into a single group. To aggregate by all possible labels, use the special value `'...'` as the sole label name, for example: `group_by: ['...']`  Grouping by `...` effectively disables aggregation entirely, passing through all alerts as-is. This is unlikely to be what you want, unless you have a very low alert volume or your upstream notification system performs its own grouping. |
| Group Wait | 30s | How long to wait to buffer alerts of the same group before sending initially. |
| Group Interval | 5m | How long to wait before sending an alert that has been added to a group of alerts for which an initial notification has already been sent. |
| Repeat Interval |  4h | How long to wait before re-sending a given alert that has already been sent. |

### Matching

The **Match** field refers to a set of equality matchers used to identify which alerts to send to a given Route based on labels defined on that alert. When you add key-value pairs to the Rancher UI, they correspond to the YAML in this format:

```yaml
match:
  [ <labelname>: <labelvalue>, ... ]
```

The **Match Regex** field refers to a set of regex-matchers used to identify which alerts to send to a given Route based on labels defined on that alert. When you add key-value pairs in the Rancher UI, they correspond to the YAML in this format:

```yaml
match_re:
  [ <labelname>: <regex>, ... ]
```

{{% /tab %}}
{{% tab "Rancher v2.5.0-2.5.3" %}}
The Alertmanager must be configured in YAML, as shown in this [example.](#example-alertmanager-config)
{{% /tab %}}
{{% /tabs %}}

# Example Alertmanager Config

To set up notifications via Slack, the following Alertmanager Config YAML can be placed into the `alertmanager.yaml` key of the Alertmanager Config Secret, where the `api_url` should be updated to use your Webhook URL from Slack:

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

# Example Route Config for CIS Scan Alerts

While configuring the routes for `rancher-cis-benchmark` alerts, you can specify the matching using the key-value pair `job: rancher-cis-scan`.

For example, the following example route configuration could be used with a Slack receiver named `test-cis`:

```yaml
spec:
  receiver: test-cis
  group_by:
#    - string
  group_wait: 30s
  group_interval: 30s
  repeat_interval: 30s
  match:
    job: rancher-cis-scan
#    key: string
  match_re:
    {}
#    key: string
```

For more information on enabling alerting for `rancher-cis-benchmark`, see [this section.]({{<baseurl>}}/rancher/v2.x/en/cis-scans/v2.5/#enabling-alerting-for-rancher-cis-benchmark)
