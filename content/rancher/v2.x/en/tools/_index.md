---
title: Rancher Tools
weight: 5000
---

At the cluster level, Rancher can integrate with a variety of external tools that help your clusters run more efficiently. Rancher tools are divided into four categories:

<!-- TOC -->

- [Alerts](#alerts)
- [Notifiers](#notifiers)
- [Logging](#logging)
- [Pipelines](#pipelines)

<!-- /TOC -->

## Alerts

To keep your clusters and applications healthy and driving your organizational productivity forward, you need stay informed of events occurring in your clusters, both planned and unplanned. To help you stay informed of these events, Rancher allows you configure alerts.

_Alerts_ are sets of rules, chosen by you, to monitor for specific events. The scope for alerts can be set at either the cluster or project level.

Some examples of alert events are:

- A Kubernetes master component entering an unhealthy state.
- A node or workload error occurring.
- A scheduled deployment taking place as planned.
- A node's hardware resources becoming overstressed.

When an event occurs, your alert is triggered, and you are sent a notification. You can then, if necessary, follow up with corrective actions.

Additionally, you can set an urgency level for each alert. This urgency appears in the notification you receive, helping you to prioritize your response actions. For example, if you have an alert configured to inform you of a routine deployment, no action is required. These alerts can be assigned a low priority level. However, if a deployment fails, it can critically impact your organization, and you need to react quickly. Assign these alerts a high priority level.

## Notifiers

Before you can receive alerts, you must configure one or more Notifier in Rancher.

_Notifiers_ are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action. Rancher integrates with a variety of popular IT services, including:

- Slack: send alert notifications to your Slack channels.
- Email: Choose email recipients for alert notifications.
- PagerDuty: Route notifications to staff by phone, SMS, or personal email.
- Webhooks: Update a webpage with alert notifications.

Alerts and notifiers are powered by [Prometheus Alertmanager](https://prometheus.io/docs/alerting/alertmanager/).

