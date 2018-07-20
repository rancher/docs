---
title: Rancher Tools
weight: 5000
---

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external service to help your clusters run more efficiently. Tools are divided into four categories:

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

## Logging

Rancher can integrate with popular external services used for event streams, telemetry, or search. Rancher can integrate with the following services:

- Embedded Elasticsearch (experimental)
    
    >**Note:** This option is available only at the cluster level.

- Elasticsearch
- splunk
- kafka
- syslog

These services collect container log events, which are saved to the `/var/log/containers` directory on each of your nodes. The service collects both standard and error events. You can then log into your services to review the events collected, leveraging each service's unique features.

When configuring Rancher to integrate with these services, you'll have to point Rancher toward the service's endpoint and provide authentication information. Additionally, you'll have the opportunity to enter key value pairs to filter the log events collected. The service will only collect events for containers marked with your configured key value pairs.

You can configure these services to collect logs at either the cluster or project level.

## Pipelines

Using Rancher, you can integrate with a GitHub repository to setup a continuous integration (CI) pipeline.

To set up a pipeline, you'll first need to authorize Rancher using your GitHub settings. Directions are provided in the Rancher UI. After authorizing Rancher in GitHub, provide Rancher with a client ID and secret to authenticate.

After configuring Rancher and GitHub, you can deploy containers running Jenkins to automate a pipeline execution:

- Build your application from code to image.
- Validate your builds.
- Deploy your build images to your cluster.
- Run unit tests.  
- Run regression tests.
