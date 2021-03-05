---
title:  Project Alerts
weight: 2526
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/tools/alerts
  - /rancher/v2.0-v2.4/en/monitoring-alerting/legacy/alerts/project-alerts
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-alerts/project-alerts
---

To keep your clusters and applications healthy and driving your organizational productivity forward, you need to stay informed of events occurring in your clusters and projects, both planned and unplanned. When an event occurs, your alert is triggered, and you are sent a notification. You can then, if necessary, follow up with corrective actions.

Notifiers and alerts are built on top of the [Prometheus Alertmanager](https://prometheus.io/docs/alerting/alertmanager/). Leveraging these tools, Rancher can notify [cluster owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) and [project owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles) of events they need to address.

Before you can receive alerts, one or more [notifier]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers) must be configured at the cluster level.

Only [administrators]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/), [cluster owners or members]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), or [project owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles) can manage project alerts.

This section covers the following topics:

- [Alerts scope](#alerts-scope)
- [Default project-level alerts](#default-project-level-alerts)
- [Adding project alerts](#adding-project-alerts)
- [Managing project alerts](#managing-project-alerts)
- [Project Alert Rule Configuration](#project-alert-rule-configuration)
  - [Pod Alerts](#pod-alerts)
  - [Workload Alerts](#workload-alerts)
  - [Workload Selector Alerts](#workload-selector-alerts)
  - [Metric Expression Alerts](#metric-expression-alerts)


# Alerts Scope

The scope for alerts can be set at either the [cluster level]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/alerts/) or project level.

At the project level, Rancher monitors specific deployments and sends alerts for:

* Deployment availability
* Workloads status
* Pod status
* The Prometheus expression cross the thresholds

# Default Project-level Alerts

When you enable monitoring for the project, some project-level alerts are provided. You can receive these alerts if a [notifier]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers) for them is configured at the cluster level.

| Alert | Explanation |
|-------|-------------|
| Less than half workload available | A critical alert is triggered if less than half of a workload is available, based on workloads where the key is `app` and the value is `workload`. |
| Memory usage close to the quota | A warning alert is triggered if the workload's memory usage exceeds the memory resource quota that is set for the workload. You can see the memory limit in the Rancher UI if you go to the workload under the **Security & Host Config** tab. |

For information on other default alerts, refer to the section on [cluster-level alerts.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/alerts/default-alerts)

# Adding Project Alerts

>**Prerequisite:** Before you can receive project alerts, you must add a notifier.

1. From the **Global** view, navigate to the project that you want to configure project alerts for. Select **Tools > Alerts**. In versions before v2.2.0, you can choose **Resources > Alerts**.

1. Click **Add Alert Group**.

1. Enter a **Name** for the alert that describes its purpose, you could group alert rules for the different purpose.

1. Based on the type of alert you want to create, fill out the form. For help, refer to the [configuration](#project-alert-rule-configuration) section below.

1. Continue adding more alert rules to the group.

1. Finally, choose the [notifiers]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers/) that send you alerts.

    - You can set up multiple notifiers.
    - You can change notifier recipients on the fly.

1. Click **Create.**

**Result:** Your alert is configured. A notification is sent when the alert is triggered.


# Managing Project Alerts

To manage project alerts, browse to the project that alerts you want to manage. Then select **Tools > Alerts**. In versions before v2.2.0, you can choose **Resources > Alerts**. You can:

- Deactivate/Reactive alerts
- Edit alert settings
- Delete unnecessary alerts
- Mute firing alerts
- Unmute muted alerts


# Project Alert Rule Configuration

- [Pod Alerts](#pod-alerts)
- [Workload Alerts](#workload-alerts)
- [Workload Selector Alerts](#workload-selector-alerts)
- [Metric Expression Alerts](#metric-expression-alerts)

# Pod Alerts

This alert type monitors for the status of a specific pod.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Select the **Pod** option, and then select a pod from the drop-down.

### Is

Select a pod status that triggers an alert:

- **Not Running**
- **Not Scheduled**
- **Restarted <x> times within the last <x> Minutes**

### Send a

Select the urgency level of the alert. The options are:

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

Select the urgency level of the alert based on pod state. For example, select **Info** for Job pod which stop running after job finished. However, if an important pod isn't scheduled, it may affect operations, so choose **Critical**.

### Advanced Options

By default, the below options will apply to all alert rules within the group. 

You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 1 hour.

# Workload Alerts

This alert type monitors for the availability of a workload.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Choose the **Workload** option. Then choose a workload from the drop-down.

### Is

Choose an availability percentage using the slider. The alert is triggered when the workload's availability on your cluster nodes drops below the set percentage.

### Send a

Select the urgency level of the alert.

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

Select the urgency level of the alert based on the percentage you choose and the importance of the workload.

### Advanced Options

By default, the below options will apply to all alert rules within the group. 

You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 1 hour.

# Workload Selector Alerts

This alert type monitors for the availability of all workloads marked with tags that you've specified.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When a

Select the **Workload Selector** option, and then click **Add Selector** to enter the key value pair for a label. If one of the workloads drops below your specifications, an alert is triggered. This label should be applied to one or more of your workloads.

### Is

Choose an availability percentage using the slider. The alert is triggered when the workload's availability on your cluster nodes drops below the set percentage.

### Send a

Select the urgency level of the alert.

- **Critical**: Most urgent
- **Warning**: Normal urgency
- **Info**: Least urgent

Select the urgency level of the alert based on the percentage you choose and the importance of the workload.

### Advanced Options

By default, the below options will apply to all alert rules within the group.

You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 1 hour.

# Metric Expression Alerts
_Available as of v2.2.4_

If you enable [project monitoring]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/tools/#monitoring), this alert type monitors for the overload from Prometheus expression querying.

Each of the below sections corresponds to a part of the alert rule configuration section in the Rancher UI.

### When A

Input or select an **Expression**. The dropdown shows the original metrics from Prometheus, including:

- [**Container**](https://github.com/google/cadvisor)
- [**Kubernetes Resources**](https://github.com/kubernetes/kube-state-metrics)
- **Customize**
- [**Project Level Grafana**](http://docs.grafana.org/administration/metrics/)
- **Project Level Prometheus**

### Is

Choose a comparison.

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

Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a expression for container memory close to the limit raises above 60% deems an urgency of **Info**, but raised about 95% deems an urgency of **Critical**.

### Advanced Options

By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

- **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
- **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
- **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 1 hour.