---
title: Tools for Logging, Monitoring, and Visibility
weight: 2033
aliases:
  - /rancher/v2.5/en/tools/notifiers-and-alerts/
---

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external services to help your clusters run more efficiently. Tools are divided into following categories:

<!-- TOC -->

- [Logging](#logging)
- [Monitoring and Alerts](#monitoring-and-alerts)
- [Istio](#istio)
- [OPA Gatekeeper](#opa-gatekeeper)
- [CIS Scans](#cis-scans)

<!-- /TOC -->


# Logging

Logging is helpful because it allows you to:

- Capture and analyze the state of your cluster
- Look for trends in your environment
- Save your logs to a safe location outside of your cluster
- Stay informed of events like a container crashing, a pod eviction, or a node dying
- More easily debugg and troubleshoot problems

Rancher can integrate with Elasticsearch, splunk, kafka, syslog, and fluentd.

For more information, refer to the logging documentation [here.]({{<baseurl>}}/rancher/v2.5/en/logging/)
# Monitoring and Alerts

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution.

After monitoring is enabled, you can set up alerts and notifiers that provide the mechanism to receive them.

Notifiers are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action. Notifications can be sent with Slack, email, PagerDuty, WeChat, and webhooks.

Alerts are rules that trigger those notifications. Before you can receive alerts, you must configure one or more notifier in Rancher. The scope for alerts can be set at either the cluster or project level.

For more information, refer to the monitoring documentation [here.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/)

# Istio

[Istio](https://istio.io/) is an open-source tool that makes it easier for DevOps teams to observe, control, troubleshoot, and secure the traffic within a complex network of microservices.

Rancher's integration with Istio was improved in Rancher v2.5.

For more information, refer to the Istio documentation [here.]({{<baseurl>}}/rancher/v2.5/en/istio)
# OPA Gatekeeper

[OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper) is an open-source project that provides integration between OPA and Kubernetes to provide policy control via admission controller webhooks. For details on how to enable Gatekeeper in Rancher, refer to the [OPA Gatekeeper section.]({{<baseurl>}}/rancher/v2.5/en/opa-gatekeper)

# CIS Scans

Rancher can run a security scan to check whether Kubernetes is deployed according to security best practices as defined in the CIS Kubernetes Benchmark.

For more information, refer to the CIS scan documentation [here.]({{<baseurl>}}/rancher/v2.5/en/cis-scans)