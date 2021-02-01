---
title: Tools for Logging, Monitoring, and More
weight: 2525
---

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external services to help your clusters run more efficiently. Tools are divided into following categories:
<!-- TOC -->

- [Notifiers](#notifiers)
- [Alerts](#alerts)
- [Logging](#logging)
- [Monitoring](#monitoring)

<!-- /TOC -->

# Notifiers

[Notifiers]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers) are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action. Notifications can be sent with Slack, email, PagerDuty, WeChat, and webhooks.

# Alerts

[Alerts]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/alerts) are rules that trigger notifications. Before you can receive alerts, you must configure one or more notifier in Rancher. The scope for alerts can be set at either the cluster or project level.

For details on project-level alerts, see [this page.](./project-alerts)

# Logging

Logging is helpful because it allows you to:

- Capture and analyze the state of your cluster
- Look for trends in your environment
- Save your logs to a safe location outside of your cluster
- Stay informed of events like a container crashing, a pod eviction, or a node dying
- More easily debug and troubleshoot problems

Rancher can integrate with Elasticsearch, splunk, kafka, syslog, and fluentd.

For details on setting up logging at the cluster level, refer to the [logging section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging)

For details on project-level logging, see [this section.](./project-logging)

# Monitoring

_Available as of v2.2.0_

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution. For details, refer to the [monitoring section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/monitoring)
