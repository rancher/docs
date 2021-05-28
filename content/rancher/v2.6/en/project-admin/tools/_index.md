---
title: Tools for Logging, Monitoring, and Visibility
weight: 2525
---

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external services to help your clusters run more efficiently. Tools are divided into following categories:
<!-- TOC -->

- [Notifiers and Alerts](#notifiers-and-alerts)
- [Logging](#logging)
- [Monitoring](#monitoring)

<!-- /TOC -->

## Notifiers and Alerts

Notifiers and alerts are two features that work together to inform you of events in the Rancher system.

[Notifiers]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/notifiers) are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action. Notifications can be sent with Slack, email, PagerDuty, WeChat, and webhooks.

[Alerts]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/alerts) are rules that trigger those notifications. Before you can receive alerts, you must configure one or more notifier in Rancher. The scope for alerts can be set at either the cluster or project level.

## Logging

Logging is helpful because it allows you to:

- Capture and analyze the state of your cluster
- Look for trends in your environment
- Save your logs to a safe location outside of your cluster
- Stay informed of events like a container crashing, a pod eviction, or a node dying
- More easily debugg and troubleshoot problems

Rancher can integrate with Elasticsearch, splunk, kafka, syslog, and fluentd.

For details, refer to the [logging section.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/logging)

## Monitoring

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution. For details, refer to the [monitoring section.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/monitoring)
