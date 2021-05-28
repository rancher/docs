---
title: Alertmanager
weight: 1
aliases:
  - /rancher/v2.5/en/monitoring-alerting/v2.5/configuration/alertmanager
  - rancher/v2.5/en/monitoring-alerting/legacy/notifiers/
  - /rancher/v2.5/en/cluster-admin/tools/notifiers
  - /rancher/v2.5/en/cluster-admin/tools/alerts
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
  - [Teams](#teams)
  - [SMS](#sms)
- [Route Configuration](#route-configuration)
  - [Receiver](#receiver)
  - [Grouping](#grouping)
  - [Matching](#matching)
- [Example Alertmanager Configs](#example-alertmanager-configs)
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

### Native vs. Non-native Receivers

By default, AlertManager provides native integration with some receivers, which are listed in [this section.](https://prometheus.io/docs/alerting/latest/configuration/#receiver) All natively supported receivers are configurable through the Rancher UI.

For notification mechanisms not natively supported by AlertManager, integration is achieved using the [webhook receiver.](https://prometheus.io/docs/alerting/latest/configuration/#webhook_config) A list of third-party drivers providing such integrations can be found [here.](https://prometheus.io/docs/operating/integrations/#alertmanager-webhook-receiver) Access to these drivers, and their associated integrations, is provided through the Alerting Drivers app. Once enabled, configuring non-native receivers can also be done through the Rancher UI.

Currently the Rancher Alerting Drivers app provides access to the following integrations:
- Microsoft Teams, based on the [prom2teams](https://github.com/idealista/prom2teams) driver
- SMS, based on the [Sachet](https://github.com/messagebird/sachet) driver

### Changes in Rancher v2.5.8

Rancher v2.5.8 added Microsoft Teams and SMS as configurable receivers in the Rancher UI.

### Changes in Rancher v2.5.4

Rancher v2.5.4 introduced the capability to configure receivers by filling out forms in the Rancher UI.

{{% tabs %}}
{{% tab "Rancher v2.5.8" %}}

The following types of receivers can be configured in the Rancher UI:

- <a href="#slack">Slack</a>
- <a href="#email">Email</a>
- <a href="#pagerduty">PagerDuty</a>
- <a href="#opsgenie">Opsgenie</a>
- <a href="#webhook">Webhook</a>
- <a href="#custom">Custom</a>
- <a href="#teams">Teams</a>
- <a href="#sms">SMS</a>

The custom receiver option can be used to configure any receiver in YAML that cannot be configured by filling out the other forms in the Rancher UI.

# Slack

| Field | Type | Description |
|------|--------------|------|
| URL | String   |  Enter your Slack webhook URL. For instructions to create a Slack webhook, see the [Slack documentation.](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack)  |
| Default Channel |  String   |  Enter the name of the channel that you want to send alert notifications in the following format: `#<channelname>`. | 
| Proxy URL   |    String    |  Proxy for the webhook notifications.  |
| Enable Send Resolved Alerts |   Bool    |  Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage). |

# Email

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

# PagerDuty

| Field | Type | Description |
|------|------|-------|
| Integration Type | String | `Events API v2` or `Prometheus`. |
| Default Integration Key | String |  For instructions to get an integration key, see the [PagerDuty documentation.](https://www.pagerduty.com/docs/guides/prometheus-integration-guide/)  |
| Proxy URL | String |  Proxy for the PagerDuty notifications.  |
| Enable Send Resolved Alerts |  Bool    |   Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage). | 

# Opsgenie

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

# Webhook

| Field |    Description |
|-------|--------------|
| URL | Webhook URL for the app of your choice. |
| Proxy URL | Proxy for the webhook notification. |
| Enable Send Resolved Alerts | Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage).    |

<!-- TODO add info on webhook for teams and sms and link to them -->

# Custom

The YAML provided here will be directly appended to your receiver within the Alertmanager Config Secret.

# Teams

### Enabling the Teams Receiver for Rancher Managed Clusters

The Teams receiver is not a native receiver and must be enabled before it can be used. You can enable the Teams receiver for a Rancher managed cluster by going to the Apps page and installing the rancher-alerting-drivers app with the Teams option selected.

1. In the Rancher UI, go to the cluster where you want to install rancher-alerting-drivers and click **Cluster Explorer**.
1. Click **Apps**.
1. Click the **Alerting Drivers** app.
1. Click the **Helm Deploy Options** tab
1. Select the **Teams** option and click **Install**.
1. Take note of the namespace used as it will be required in a later step.

### Configure the Teams Receiver

The Teams receiver can be configured by updating its ConfigMap. For example, the following is a minimal Teams receiver configuration.

```yaml
[Microsoft Teams]
teams-instance-1: https://your-teams-webhook-url
```

When configuration is complete, add the receiver using the steps in [this section](#creating-receivers-in-the-rancher-ui).

Use the example below as the URL where:

- `ns-1` is replaced with the namespace where the `rancher-alerting-drivers` app is installed

```yaml
url: http://rancher-alerting-drivers-prom2teams.ns-1.svc:8089/v2/teams-instance-1
```

<!-- https://github.com/idealista/prom2teams -->

# SMS

### Enabling the SMS Receiver for Rancher Managed Clusters

The SMS receiver is not a native receiver and must be enabled before it can be used. You can enable the SMS receiver for a Rancher managed cluster by going to the Apps page and installing the rancher-alerting-drivers app with the SMS option selected.

1. In the Rancher UI, go to the cluster where you want to install rancher-alerting-drivers and click **Cluster Explorer**.
1. Click **Apps**.
1. Click the **Alerting Drivers** app.
1. Click the **Helm Deploy Options** tab
1. Select the **SMS** option and click **Install**.
1. Take note of the namespace used as it will be required in a later step.

### Configure the SMS Receiver

The SMS receiver can be configured by updating its ConfigMap. For example, the following is a minimal SMS receiver configuration.

```yaml
providers:
  telegram:
    token: 'your-token-from-telegram'

receivers:
- name: 'telegram-receiver-1'
  provider: 'telegram'
  to:
    - '123456789'
```

When configuration is complete, add the receiver using the steps in [this section](#creating-receivers-in-the-rancher-ui).

Use the example below as the name and URL, where:

- the name assigned to the receiver, e.g. `telegram-receiver-1`, must match the name in the `receivers.name` field in the ConfigMap, e.g. `telegram-receiver-1`
- `ns-1` in the URL is replaced with the namespace where the `rancher-alerting-drivers` app is installed

```yaml
name: telegram-receiver-1
url http://rancher-alerting-drivers-sachet.ns-1.svc:9876/alert
```

<!-- https://github.com/messagebird/sachet -->

{{% /tab %}}

{{% tab "Rancher v2.5.4-2.5.7" %}}

The following types of receivers can be configured in the Rancher UI:

- <a href="#slack-254-257">Slack</a>
- <a href="#email-254-257">Email</a>
- <a href="#pagerduty-254-257">PagerDuty</a>
- <a href="#opsgenie-254-257">Opsgenie</a>
- <a href="#webhook-254-257">Webhook</a>
- <a href="#custom-254-257">Custom</a>

The custom receiver option can be used to configure any receiver in YAML that cannot be configured by filling out the other forms in the Rancher UI.

### Slack {#slack-254-257}

| Field | Type | Description |
|------|--------------|------|
| URL | String   |  Enter your Slack webhook URL. For instructions to create a Slack webhook, see the [Slack documentation.](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack)  |
| Default Channel |  String   |  Enter the name of the channel that you want to send alert notifications in the following format: `#<channelname>`. | 
| Proxy URL   |    String    |  Proxy for the webhook notifications.  |
| Enable Send Resolved Alerts |   Bool    |  Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage). |

### Email {#email-254-257}

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

### PagerDuty {#pagerduty-254-257}

| Field | Type | Description |
|------|------|-------|
| Integration Type | String | `Events API v2` or `Prometheus`. |
| Default Integration Key | String |  For instructions to get an integration key, see the [PagerDuty documentation.](https://www.pagerduty.com/docs/guides/prometheus-integration-guide/)  |
| Proxy URL | String |  Proxy for the PagerDuty notifications.  |
| Enable Send Resolved Alerts |  Bool    |   Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage). | 

### Opsgenie {#opsgenie-254-257}

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

### Webhook {#webhook-1}

| Field |    Description |
|-------|--------------|
| URL | Webhook URL for the app of your choice. |
| Proxy URL | Proxy for the webhook notification. |
| Enable Send Resolved Alerts | Whether to send a follow-up notification if an alert has been resolved (e.g. [Resolved] High CPU Usage).    |

### Custom {#custom-254-257}

The YAML provided here will be directly appended to your receiver within the Alertmanager Config Secret.

{{% /tab %}}
{{% tab "Rancher v2.5.0-2.5.3" %}}
The Alertmanager must be configured in YAML, as shown in these [examples.](#example-alertmanager-configs)
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
The Alertmanager must be configured in YAML, as shown in these [examples.](#example-alertmanager-configs)
{{% /tab %}}
{{% /tabs %}}

# Example Alertmanager Configs

### Slack
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

### PagerDuty
To set up notifications via PagerDuty, use the example below from the [PagerDuty documentation](https://www.pagerduty.com/docs/guides/prometheus-integration-guide/) as a guideline. This example sets up a route that captures alerts for a database service and sends them to a receiver linked to a service that will directly notify the DBAs in PagerDuty, while all other alerts will be directed to a default receiver with a different PagerDuty integration key.

The following Alertmanager Config YAML can be placed into the `alertmanager.yaml` key of the Alertmanager Config Secret. The `service_key` should be updated to use your PagerDuty integration key and can be found as per the "Integrating with Global Event Routing" section of the PagerDuty documentation. For the full list of configuration options, refer to the [Prometheus documentation](https://prometheus.io/docs/alerting/latest/configuration/#pagerduty_config).

```yaml
route:
 group_by: [cluster]
 receiver: 'pagerduty-notifications'
 group_interval: 5m
 routes:
  - match:
      service: database
    receiver: 'database-notifcations'

receivers:
- name: 'pagerduty-notifications'
  pagerduty_configs:
  - service_key: 'primary-integration-key'

- name: 'database-notifcations'
  pagerduty_configs:
  - service_key: 'database-integration-key'
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

For more information on enabling alerting for `rancher-cis-benchmark`, see [this section.]({{<baseurl>}}/rancher/v2.5/en/cis-scans/v2.5/#enabling-alerting-for-rancher-cis-benchmark)
