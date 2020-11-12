---
title: Cluster Alerts
weight: 2
aliases:
  - /rancher/v2.x/en/cluster-admin/tools/alerts
  - /rancher/v2.x/en/monitoring-alerting/legacy/alerts/cluster-alerts
---

> In Rancher 2.5, the monitoring application was improved. There are now two ways to enable monitoring and alerting. The older way is documented in this section, and the new application for monitoring and alerting is documented [here.]({{<baseurl>}}/rancher/v2.x/en/monitoring-alerting)

To keep your clusters and applications healthy and driving your organizational productivity forward, you need to stay informed of events occurring in your clusters and projects, both planned and unplanned. When an event occurs, your alert is triggered, and you are sent a notification. You can then, if necessary, follow up with corrective actions.

Notifiers and alerts are built on top of the [Prometheus Alertmanager](https://prometheus.io/docs/alerting/alertmanager/). Leveraging these tools, Rancher can notify [cluster owners]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) and [project owners]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) of events they need to address.

Before you can receive alerts, you must configure one or more notifier in Rancher.

When you create a cluster, some alert rules are predefined. You can receive these alerts if you configure a [notifier]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/notifiers) for them.

For details about what triggers the predefined alerts, refer to the [documentation on default alerts.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/alerts/default-alerts)

This section covers the following topics:

- [Alert event examples](#alert-event-examples)
  - [Prometheus queries](#prometheus-queries)
- [Urgency levels](#urgency-levels)
- [Scope of alerts](#scope-of-alerts)
- [Adding cluster alerts](#adding-cluster-alerts)
- [Managing cluster alerts](#managing-cluster-alerts)

# Alert Event Examples

Some examples of alert events are:

- A Kubernetes [master component]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#kubernetes-cluster-node-components) entering an unhealthy state.
- A node or [workload]({{<baseurl>}}/rancher/v2.x/en/k8s-in-rancher/workloads/) error occurring.
- A scheduled deployment taking place as planned.
- A node's hardware resources becoming overstressed.

### Prometheus Queries

> **Prerequisite:** Monitoring must be [enabled]({{<baseurl>}}/rancher/v2.x/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/#enabling-cluster-monitoring) before you can trigger alerts with custom Prometheus queries or expressions.

When you edit an alert rule, you will have the opportunity to configure the alert to be triggered based on a Prometheus expression. For examples of expressions, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/expression)

# Urgency Levels

You can set an urgency level for each alert. This urgency appears in the notification you receive, helping you to prioritize your response actions. For example, if you have an alert configured to inform you of a routine deployment, no action is required. These alerts can be assigned a low priority level. However, if a deployment fails, it can critically impact your organization, and you need to react quickly. Assign these alerts a high priority level.

# Scope of Alerts

The scope for alerts can be set at either the cluster level or [project level]({{<baseurl>}}/rancher/v2.x/en/project-admin/tools/alerts/).

At the cluster level, Rancher monitors components in your Kubernetes cluster, and sends you alerts related to:

- The state of your nodes.
- The system services that manage your Kubernetes cluster.
- The resource events from specific system services.
- The Prometheus expression cross the thresholds

# Adding Cluster Alerts

As a [cluster owner]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to send you alerts for cluster events.

>**Prerequisite:** Before you can receive cluster alerts, you must [add a notifier]({{<baseurl>}}/rancher/v2.x/en/monitoring-alerting/legacy/notifiers/#adding-notifiers).

1. From the **Global** view, navigate to the cluster that you want to configure cluster alerts for. Select **Tools > Alerts**. Then click **Add Alert Group**.

1. Enter a **Name** for the alert that describes its purpose, you could group alert rules for the different purpose.

1. Based on the type of alert you want to create, complete one of the instruction subsets below.
{{% accordion id="system-service" label="System Service Alerts" %}}
This alert type monitor for events that affect one of the Kubernetes master components, regardless of the node it occurs on.

1. Select the **System Services** option, and then select an option from the drop-down.

  - [controller-manager](https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager)
  - [etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd)
  - [scheduler](https://kubernetes.io/docs/concepts/overview/components/#kube-scheduler)

1. Select the urgency level of the alert. The options are:

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level based on the importance of the service and how many nodes fill the role within your cluster. For example, if you're making an alert for the `etcd` service, select **Critical**. If you're making an alert for redundant schedulers, **Warning** is more appropriate.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

{{% /accordion %}}
{{% accordion id="resource-event" label="Resource Event Alerts" %}}
This alert type monitors for specific events that are thrown from a resource type.

1. Choose the type of resource event that triggers an alert. The options are:

  - **Normal**: triggers an alert when any standard resource event occurs.
  - **Warning**: triggers an alert when unexpected resource events occur.

1. Select a resource type from the **Choose a Resource** drop-down that you want to trigger an alert.

  - [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
  - [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
  - [Node](https://kubernetes.io/docs/concepts/architecture/nodes/)
  - [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/)
  - [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert by considering factors such as how often the event occurs or its importance. For example:

    - If you set a normal alert for pods, you're likely to receive alerts often, and individual pods usually self-heal, so select an urgency of **Info**.
    - If you set a warning alert for StatefulSets, it's very likely to impact operations, so select an urgency of **Critical**.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

{{% /accordion %}}
{{% accordion id="node" label="Node Alerts" %}}
This alert type monitors for events that occur on a specific node.

1. Select the **Node** option, and then make a selection from the **Choose a Node** drop-down.

1. Choose an event to trigger the alert.

  - **Not Ready**: Sends you an alert when the node is unresponsive.
  - **CPU usage over**: Sends you an alert when the node raises above an entered percentage of its processing allocation.
  - **Mem usage over**: Sends you an alert when the node raises above an entered percentage of its memory allocation.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's CPU raises above 60% deems an urgency of **Info**, but a node that is **Not Ready** deems an urgency of **Critical**.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

{{% /accordion %}}
{{% accordion id="node-selector" label="Node Selector Alerts" %}}
This alert type monitors for events that occur on any node on marked with a label. For more information, see the Kubernetes documentation for [Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

1. Select the **Node Selector** option, and then click **Add Selector** to enter a key value pair for a label. This label should be applied to one or more of your nodes. Add as many selectors as you'd like.

1. Choose an event to trigger the alert.

  - **Not Ready**: Sends you an alert when selected nodes are unresponsive.
  - **CPU usage over**: Sends you an alert when selected nodes raise above an entered percentage of processing allocation.
  - **Mem usage over**: Sends you an alert when selected nodes raise above an entered percentage of memory allocation.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
      Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's CPU raises above 60% deems an urgency of **Info**, but a node that is **Not Ready** deems an urgency of **Critical**.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

{{% /accordion %}}
{{% accordion id="cluster-expression" label="Metric Expression Alerts" %}}
This alert type monitors for the overload from Prometheus expression querying, it would be available after you enable monitoring.

1. Input or select an **Expression**, the drop down shows the original metrics from Prometheus, including:

  - [**Node**](https://github.com/prometheus/node_exporter)
  - [**Container**](https://github.com/google/cadvisor)
  - [**ETCD**](https://etcd.io/docs/v3.4.0/op-guide/monitoring/)
  - [**Kubernetes Components**](https://github.com/kubernetes/metrics)
  - [**Kubernetes Resources**](https://github.com/kubernetes/kube-state-metrics)
  - [**Fluentd**](https://docs.fluentd.org/v1.0/articles/monitoring-prometheus) (supported by [Logging]({{<baseurl>}}/rancher/v2.x//en/cluster-admin/tools/logging))
  - [**Cluster Level Grafana**](http://docs.grafana.org/administration/metrics/)
  - **Cluster Level Prometheus**

1. Choose a **Comparison**.

  - **Equal**: Trigger alert when expression value equal to the threshold.
  - **Not Equal**: Trigger alert when expression value not equal to the threshold.
  - **Greater Than**: Trigger alert when expression value greater than to threshold.
  - **Less Than**: Trigger alert when expression value equal or less than the threshold.
  - **Greater or Equal**: Trigger alert when expression value greater to equal to the threshold.
  - **Less or Equal**: Trigger alert when expression value less or equal to the threshold.

1. Input a **Threshold**, for trigger alert when the value of expression cross the threshold.

1. Choose a **Comparison**.

1. Select a duration, for trigger alert when expression value crosses the threshold longer than the configured duration.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's load expression ```sum(node_load5)  / count(node_cpu_seconds_total{mode="system"})``` raises above 0.6 deems an urgency of **Info**, but 1 deems an urgency of **Critical**.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before re-sending a given alert that has already been sent, default to 1 hour.

{{% /accordion %}}

1. Continue adding more **Alert Rule** to the group.

1. Finally, choose the [notifiers]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/notifiers/) to send the alerts to.

    - You can set up multiple notifiers.
    - You can change notifier recipients on the fly.

**Result:** Your alert is configured. A notification is sent when the alert is triggered.

# Managing Cluster Alerts

After you set up cluster alerts, you can manage each alert object. To manage alerts, browse to the cluster containing the alerts, and then select **Tools > Alerts** that you want to manage. You can:

- Deactivate/Reactive alerts
- Edit alert settings
- Delete unnecessary alerts
- Mute firing alerts
- Unmute muted alerts
