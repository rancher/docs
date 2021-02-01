---
title: Cluster Alerts
shortTitle: Alerts
weight: 2
aliases:
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/alerts
  - /rancher/v2.0-v2.4/en/monitoring-alerting/legacy/alerts/cluster-alerts
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-alerts
---

To keep your clusters and applications healthy and driving your organizational productivity forward, you need to stay informed of events occurring in your clusters and projects, both planned and unplanned. When an event occurs, your alert is triggered, and you are sent a notification. You can then, if necessary, follow up with corrective actions.

This section covers the following topics:

- [About Alerts](#about-alerts)
  - [Alert Event Examples](#alert-event-examples)
  - [Alerts Triggered by Prometheus Queries](#alerts-triggered-by-prometheus-queries)
  - [Urgency Levels](#urgency-levels)
  - [Scope of Alerts](#scope-of-alerts)
  - [Managing Cluster Alerts](#managing-cluster-alerts)
- [Adding Cluster Alerts](#adding-cluster-alerts)
- [Cluster Alert Configuration](#cluster-alert-configuration)
  - [System Service Alerts](#system-service-alerts)
  - [Resource Event Alerts](#resource-event-alerts)
  - [Node Alerts](#node-alerts)
  - [Node Selector Alerts](#node-selector-alerts)
  - [CIS Scan Alerts](#cis-scan-alerts)
  - [Metric Expression Alerts](#metric-expression-alerts)

# About Alerts

Notifiers and alerts are built on top of the [Prometheus Alertmanager](https://prometheus.io/docs/alerting/alertmanager/). Leveraging these tools, Rancher can notify [cluster owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) and [project owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles) of events they need to address.

Before you can receive alerts, you must configure one or more notifier in Rancher.

When you create a cluster, some alert rules are predefined. You can receive these alerts if you configure a [notifier]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers) for them.

For details about what triggers the predefined alerts, refer to the [documentation on default alerts.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/alerts/default-alerts)

### Alert Event Examples

Some examples of alert events are:

- A Kubernetes master component entering an unhealthy state.
- A node or workload error occurring.
- A scheduled deployment taking place as planned.
- A node's hardware resources becoming overstressed.

### Alerts Triggered by Prometheus Queries

When you edit an alert rule, you will have the opportunity to configure the alert to be triggered based on a Prometheus expression. For examples of expressions, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/expression/)

Monitoring must be [enabled]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/) before you can trigger alerts with custom Prometheus queries or expressions.

### Urgency Levels

You can set an urgency level for each alert. This urgency appears in the notification you receive, helping you to prioritize your response actions. For example, if you have an alert configured to inform you of a routine deployment, no action is required. These alerts can be assigned a low priority level. However, if a deployment fails, it can critically impact your organization, and you need to react quickly. Assign these alerts a high priority level.

### Scope of Alerts

The scope for alerts can be set at either the cluster level or [project level]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/tools/alerts/).

At the cluster level, Rancher monitors components in your Kubernetes cluster, and sends you alerts related to:

- The state of your nodes.
- The system services that manage your Kubernetes cluster.
- The resource events from specific system services.
- The Prometheus expression cross the thresholds

### Managing Cluster Alerts

After you set up cluster alerts, you can manage each alert object. To manage alerts, browse to the cluster containing the alerts, and then select **Tools > Alerts** that you want to manage. You can:

- Deactivate/Reactive alerts
- Edit alert settings
- Delete unnecessary alerts
- Mute firing alerts
- Unmute muted alerts

# Adding Cluster Alerts

As a [cluster owner]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to send you alerts for cluster events.

>**Prerequisite:** Before you can receive cluster alerts, you must [add a notifier]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/notifiers/).

1. From the **Global** view, navigate to the cluster that you want to configure cluster alerts for. Select **Tools > Alerts**. Then click **Add Alert Group**.
1. Enter a **Name** for the alert that describes its purpose, you could group alert rules for the different purpose.
1. Based on the type of alert you want to create, refer to the [cluster alert configuration section.](#cluster-alert-configuration)
1. Continue adding more **Alert Rule** to the group.
1. Finally, choose the [notifiers]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers/) to send the alerts to.

    - You can set up multiple notifiers.
    - You can change notifier recipients on the fly.
1. Click **Create.**

**Result:** Your alert is configured. A notification is sent when the alert is triggered.


# Cluster Alert Configuration

  - [System Service Alerts](#system-service-alerts)
  - [Resource Event Alerts](#resource-event-alerts)
  - [Node Alerts](#node-alerts)
  - [Node Selector Alerts](#node-selector-alerts)
  - [CIS Scan Alerts](#cis-scan-alerts)
  - [Metric Expression Alerts](#metric-expression-alerts)

# System Service Alerts

This alert type monitor for events that affect one of the Kubernetes master components, regardless of the node it occurs on.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Select the **System Services** option, and then select an option from the dropdown:

- [controller-manager](https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager)
- [etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd)
- [scheduler](https://kubernetes.io/docs/concepts/overview/components/#kube-scheduler)

### Is

The alert will be triggered when the selected Kubernetes master component is unhealthy.

### Send a

Select the urgency level of the alert. The options are:

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

  Select the urgency level based on the importance of the service and how many nodes fill the role within your cluster. For example, if you're making an alert for the `etcd` service, select **Critical**. If you're making an alert for redundant schedulers, **Warning** is more appropriate.

### Advanced Options

By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

# Resource Event Alerts

This alert type monitors for specific events that are thrown from a resource type.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Choose the type of resource event that triggers an alert. The options are:

- **Normal**: triggers an alert when any standard resource event occurs.
- **Warning**: triggers an alert when unexpected resource events occur.

Select a resource type from the **Choose a Resource** drop-down that you want to trigger an alert.

- [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
- [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Node](https://kubernetes.io/docs/concepts/architecture/nodes/)
- [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/)
- [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

### Send a

Select the urgency level of the alert.

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

Select the urgency level of the alert by considering factors such as how often the event occurs or its importance. For example:

- If you set a normal alert for pods, you're likely to receive alerts often, and individual pods usually self-heal, so select an urgency of **Info**.
- If you set a warning alert for StatefulSets, it's very likely to impact operations, so select an urgency of **Critical**.

### Advanced Options

By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

# Node Alerts

This alert type monitors for events that occur on a specific node.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Select the **Node** option, and then make a selection from the **Choose a Node** drop-down.

### Is

Choose an event to trigger the alert.

- **Not Ready**: Sends you an alert when the node is unresponsive.
- **CPU usage over**: Sends you an alert when the node raises above an entered percentage of its processing allocation.
- **Mem usage over**: Sends you an alert when the node raises above an entered percentage of its memory allocation.

### Send a

Select the urgency level of the alert.

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's CPU raises above 60% deems an urgency of **Info**, but a node that is **Not Ready** deems an urgency of **Critical**.

### Advanced Options

By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

# Node Selector Alerts

This alert type monitors for events that occur on any node on marked with a label. For more information, see the Kubernetes documentation for [Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Select the **Node Selector** option, and then click **Add Selector** to enter a key value pair for a label. This label should be applied to one or more of your nodes. Add as many selectors as you'd like.

### Is

Choose an event to trigger the alert.

- **Not Ready**: Sends you an alert when selected nodes are unresponsive.
- **CPU usage over**: Sends you an alert when selected nodes raise above an entered percentage of processing allocation.
- **Mem usage over**: Sends you an alert when selected nodes raise above an entered percentage of memory allocation.

### Send a

Select the urgency level of the alert.

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's CPU raises above 60% deems an urgency of **Info**, but a node that is **Not Ready** deems an urgency of **Critical**.

### Advanced Options

By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

# CIS Scan Alerts
_Available as of v2.4.0_

This alert type is triggered based on the results of a CIS scan.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Select **CIS Scan.**

### Is

Choose an event to trigger the alert:

- Completed Scan
- Has Failure

### Send a

Select the urgency level of the alert.

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's CPU raises above 60% deems an urgency of **Info**, but a node that is **Not Ready** deems an urgency of **Critical**.

### Advanced Options

By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

# Metric Expression Alerts

This alert type monitors for the overload from Prometheus expression querying, it would be available after you enable monitoring.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Input or select an **Expression**, the dropdown shows the original metrics from Prometheus, including:

- [**Node**](https://github.com/prometheus/node_exporter)
- [**Container**](https://github.com/google/cadvisor)
- [**ETCD**](https://etcd.io/docs/v3.4.0/op-guide/monitoring/)
- [**Kubernetes Components**](https://github.com/kubernetes/metrics)
- [**Kubernetes Resources**](https://github.com/kubernetes/kube-state-metrics)
- [**Fluentd**](https://docs.fluentd.org/v1.0/articles/monitoring-prometheus) (supported by [Logging]({{<baseurl>}}/rancher/v2.0-v2.4//en/cluster-admin/tools/logging))
- [**Cluster Level Grafana**](http://docs.grafana.org/administration/metrics/)
- **Cluster Level Prometheus**

### Is

Choose a comparison:

- **Equal**: Trigger alert when expression value equal to the threshold.
- **Not Equal**: Trigger alert when expression value not equal to the threshold.
- **Greater Than**: Trigger alert when expression value greater than to threshold.
- **Less Than**: Trigger alert when expression value equal or less than the threshold.
- **Greater or Equal**: Trigger alert when expression value greater to equal to the threshold.
- **Less or Equal**: Trigger alert when expression value less or equal to the threshold.

If applicable, choose a comparison value or a threshold for the alert to be triggered.

### For

Select a duration for a trigger alert when the expression value crosses the threshold longer than the configured duration.

### Send a

Select the urgency level of the alert.

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's load expression ```sum(node_load5)  / count(node_cpu_seconds_total{mode="system"})``` raises above 0.6 deems an urgency of **Info**, but 1 deems an urgency of **Critical**.

### Advanced Options

By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.