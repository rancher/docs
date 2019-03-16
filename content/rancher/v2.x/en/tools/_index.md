---
title: Rancher Tools
weight: 5000
---

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external services to help your clusters run more efficiently. Tools are divided into following categories:

<!-- TOC -->
- [Drivers](#drivers)
- [Alerts](#alerts)
- [Notifiers](#notifiers)
- [Logging](#logging)
- [Pipelines](#pipelines)
- [Monitoring](#monitoring)
- [Global DNS](#global-dns)

<!-- /TOC -->

## Drivers

Drivers in Rancher allow you to manage which providers can be used to deploy [hosted Kubernetes clusters]({{< baseurl >}}rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) or [nodes in an infrastructure provider]({{< baseurl >}}rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/) to allow Rancher to deploy and manage Kubernetes.

For more information, see [Drivers]({{< baseurl >}}/rancher/v2.x/en/tools/drivers/).

## Alerts

To keep your clusters and applications healthy and driving your organizational productivity forward, you need stay informed of events occurring in your clusters, both planned and unplanned. To help you stay informed of these events, Rancher allows you to configure alerts.

_Alerts_ are sets of rules, chosen by you, to monitor for specific events. The scope for alerts can be set at either the cluster or project level.

Some examples of alert events are:

- A Kubernetes [master component]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#kubernetes-cluster-node-components) entering an unhealthy state.
- A node or [workload]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/) error occurring.
- A scheduled deployment taking place as planned.
- A node's hardware resources becoming overstressed.

When an event occurs, your alert is triggered, and you are sent a notification. You can then, if necessary, follow up with corrective actions.

Additionally, you can set an urgency level for each alert. This urgency appears in the notification you receive, helping you to prioritize your response actions. For example, if you have an alert configured to inform you of a routine deployment, no action is required. These alerts can be assigned a low priority level. However, if a deployment fails, it can critically impact your organization, and you need to react quickly. Assign these alerts a high priority level.

For more information, see [Alerts]({{< baseurl >}}/rancher/v2.x/en/tools/notifiers-and-alerts/#alerts).

## Notifiers

Before you can receive alerts, you must configure one or more notifier in Rancher.

_Notifiers_ are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action. Rancher integrates with a variety of popular IT services, including:

- Slack: Send alert notifications to your Slack channels.
- Email: Choose email recipients for alert notifications.
- PagerDuty: Route notifications to staff by phone, SMS, or personal email.
- Webhooks: Update a webpage with alert notifications.
- WeChat: Send alert notifications to your Enterprise WeChat contacts.

For more information, see [Notifiers]({{< baseurl >}}/rancher/v2.x/en/tools/notifiers-and-alerts/#notifiers).

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

## Monitoring

_Available as of v2.2.0_

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution. Prometheus provides a _time series_ of your data, which is a stream of timestamped values belonging to the same metric and the same set of labeled dimensions, along with comprehensive statistics and metrics of the monitored cluster.

In other words, Prometheus let's you view metrics from your different Rancher and Kubernetes objects. Using timestamps, you can query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or [Grafana](https://grafana.com/), which is an analytics viewing platform deployed along with Prometheus. By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, restore crashed servers, etc.  Multi-tenancy support in terms of cluster and project-only Prometheus instances are also supported.

For more information, see the [Monitoring Documentation]({{< baseurl >}}/rancher/v2.x/en/tools/monitoring).

## Global DNS

_Available as v2.2.0_

When creating applications that span multiple Kubernetes clusters, a Global DNS entry can be created to route traffic to the endpoints in all of the different clusters. An external DNS server will need be programmed to assign a fully qualified domain name (a.k.a FQDN) to your application. Rancher will use the FQDN you provide and the IP addresses where your application is running to program the DNS. Rancher will gather endpoints from all the Kubernetes clusters running your application and program the DNS.

For more information on how to use this feature, see [Global DNS]({{< baseurl >}}/rancher/v2.x/en/tools/globaldns/).
