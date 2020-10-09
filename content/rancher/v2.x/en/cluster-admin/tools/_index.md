---
title: Tools for Logging, Monitoring, and Visibility
weight: 2033
aliases:
  - /rancher/v2.x/en/tools/notifiers-and-alerts/
---

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external services to help your clusters run more efficiently. Tools are divided into following categories:

<!-- TOC -->

- [Notifiers and Alerts](#notifiers-and-alerts)
- [Logging](#logging)
- [Monitoring](#monitoring)
- [Istio](#istio)
- [OPA Gatekeeper](#opa-gatekeeper)

<!-- /TOC -->


# Logging

Logging is helpful because it allows you to:

- Capture and analyze the state of your cluster
- Look for trends in your environment
- Save your logs to a safe location outside of your cluster
- Stay informed of events like a container crashing, a pod eviction, or a node dying
- More easily debugg and troubleshoot problems

Rancher can integrate with Elasticsearch, splunk, kafka, syslog, and fluentd.

For details, refer to the [logging section.]({{<baseurl>}}/rancher/v2.x/en/logging)

# Monitoring

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution. For details, refer to the [monitoring section.]({{<baseurl>}}/rancher/v2.x/en/monitoring)

### Notifiers and Alerts

After monitoring is enabled, you can set up alerts and notifiers that provide the mechanism to receive them.

Notifiers are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action. Notifications can be sent with Slack, email, PagerDuty, WeChat, and webhooks.

Alerts are rules that trigger those notifications. Before you can receive alerts, you must configure one or more notifier in Rancher. The scope for alerts can be set at either the cluster or project level.

# Istio

[Istio](https://istio.io/) is an open-source tool that makes it easier for DevOps teams to observe, control, troubleshoot, and secure the traffic within a complex network of microservices. For details on how to enable Istio in Rancher, refer to the [Istio section.]({{<baseurl>}}/rancher/v2.x/en/istio)

## OPA Gatekeeper

 [OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper) is an open-source project that provides integration between OPA and Kubernetes to provide policy control via admission controller webhooks. For details on how to enable Gatekeeper in Rancher, refer to the [OPA Gatekeeper section.]({{<baseurl>}}/rancher/v2.x/en/opa-gatekeper)
