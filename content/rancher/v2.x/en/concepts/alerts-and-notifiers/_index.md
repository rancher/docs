---
title: Alerts and Notifiers
weight: 2300
draft: true
---

Alerts and notifications are built on top of the Prometheus Alertmanager. Leveraging these tools, Rancher is able to provide the first step in notifications for events operators and application owners need to know about. As the roadmap unfolds, Rancher 2.0 will also 

## Notifiers

In Rancher 2.0, a user can configure `Notifiers` for each cluster that can receive alerts for various events. By configuring these at the cluster level project owners do not need to know SMTP settings or have access to cloud accounts. At a project level, users can configure alerts and add recipients scoped to the relevant alerts.

Notifiers available in 2.0:

* Email
* Slack
* PagerDuty
* Webhooks

## Alerts

Rancher 2.0 out of the box supports alerting on:

* Node conditions
* Deployment availability
* Pod crash loops
* And more...

Operators of Kubernetes clusters can get alerts on the health of nodes and other system level components.

Application owners can configure alerts at the project level to get notified if there are issues with deployments or pods.