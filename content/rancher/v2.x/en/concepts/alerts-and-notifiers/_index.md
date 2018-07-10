---
title: Alerts and Notifiers
weight: 2300
draft: true
---

Alerts and notifications are built on top of the [Prometheus Alertmanager](https://prometheus.io/docs/alerting/alertmanager/). Leveraging these tools, Rancher is able to provide the first step in notifications for events operators and application owners need to know about. 

## Notifiers

In Rancher 2.x, a user can configure `Notifiers` for each cluster that can receive alerts for various events. By configuring the notifiers at the cluster level, project owners do not need to know SMTP settings or have access to cloud accounts. At a project level, users can configure alerts and add recipients scoped to the relevant alerts.

Available Notifiers:

* Email
* Slack
* PagerDuty
* Webhooks

## Alerts

Rancher supports alerting on a cluster level or project level.

On a cluster level, Rancher can monitor and alert on components that manage your Kubernetes cluster including:

* System Services
* Resource Events
* Node conditions

Operators of Kubernetes clusters can get alerts on the health of nodes and other system level components.

On a project level, Rancher can monitor and alert on status on specific deployments including:

* Deployment availability
* Workloads 
* Pods
