---
title:  Alerts
weight: 2526
---

To keep your clusters and applications healthy and driving your organizational productivity forward, you need to stay informed of events occurring in your clusters and projects, both planned and unplanned. To help you stay informed of these events, you can configure alerts.

Alerts are sets of rules, chosen by you, to monitor for specific events.

Only [administrators]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/), [cluster owners or members]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), or [project owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) can manage project alerts.

## Alerts Scope

 The scope for alerts can be set at either the [cluster level]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/alerts/) or project level.

At the project level, Rancher monitors specific deployments and sends alerts for:

* Deployment availability
* Workloads status
* Pod status
* The Prometheus expression cross the thresholds

## Adding Project Alerts

>**Prerequisite:** Before you can receive project alerts, you must [add a notifier]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/notifiers/#adding-notifiers).

1. From the **Global** view, navigate to the project that you want to configure project alerts for. Select **Tools > Alerts**. In versions prior to v2.2.0, you can choose **Resources > Alerts**.

1. Click **Add Alert Group**.

1. Enter a **Name** for the alert that describes its purpose, you could group alert rules for the different purpose.

1. Based on the type of alert you want to create, complete one of the instruction subsets below.
{{% accordion id="pod" label="Pod Alerts" %}}
This alert type monitors for the status of a specific pod.

1. Select the **Pod** option, and then select a pod from the drop-down.
1. Select a pod status that triggers an alert:

    - **Not Running**
    - **Not Scheduled**
    - **Restarted `<x>` times with the last `<x>` Minutes**

1. Select the urgency level of the alert. The options are:

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent

    Select the urgency level of the alert based on pod state. For example, select **Info** for Job pod which stop running after job finished. However, if an important pod isn't scheduled, it may affect operations, so choose **Critical**.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 1 hour.

{{% /accordion %}}
{{% accordion id="workload" label="Workload Alerts" %}}
This alert type monitors for the availability of a workload.

1. Choose the **Workload** option. Then choose a workload from the drop-down.

1. Choose an availability percentage using the slider. The alert is triggered when the workload's availability on your cluster nodes drops below the set percentage.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent

    Select the urgency level of the alert based on the percentage you choose and the importance of the workload.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 1 hour.

{{% /accordion %}}
{{% accordion id="workload-selector" label="Workload Selector Alerts" %}}
This alert type monitors for the availability of all workloads marked with tags that you've specified.

1. Select the **Workload Selector** option, and then click **Add Selector** to enter the key value pair for a label. If one of the workloads drops below your specifications, an alert is triggered. This label should be applied to one or more of your workloads.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent

    Select the urgency level of the alert based on the percentage you choose and the importance of the workload.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 1 hour.

{{% /accordion %}}
{{% accordion id="project-expression" label="Metric Expression Alerts" %}}
<br>
_Available as of v2.2.4_

If you enable [project monitoring]({{< baseurl >}}/rancher/v2.x/en/project-admin/tools/#monitoring), this alert type monitors for the overload from Prometheus expression querying.

1. Input or select an **Expression**, the drop down shows the original metrics from Prometheus, including:

  - [**Container**](https://github.com/google/cadvisor)
  - [**Kubernetes Resources**](https://github.com/kubernetes/kube-state-metrics)
  - [**Customize**]({{< baseurl >}}/rancher/v2.x/en/project-admin/tools/monitoring/#project-metrics)
  - [**Project Level Grafana**](http://docs.grafana.org/administration/metrics/)
  - **Project Level Prometheus**

1. Choose a comparison.

  - **Equal**: Trigger alert when expression value equal to the threshold.
  - **Not Equal**: Trigger alert when expression value not equal to the threshold.
  - **Greater Than**: Trigger alert when expression value greater than to threshold.
  - **Less Than**: Trigger alert when expression value equal or less than the threshold.
  - **Greater or Equal**: Trigger alert when expression value greater to equal to the threshold.
  - **Less or Equal**: Trigger alert when expression value less or equal to the threshold.

1. Input a **Threshold**, for trigger alert when the value of expression cross the threshold.

1. Choose a **Comparison**.

1. Select a **Duration**, for trigger alert when expression value crosses the threshold longer than the configured duration.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a expression for container memory close to the limit raises above 60% deems an urgency of **Info**, but raised about 95% deems an urgency of **Critical**.

1. Configure advanced options. By default, the below options will apply to all alert rules within the group. You can disable these advanced options when configuring a specific rule.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially, default to 30 seconds.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 30 seconds.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts, default to 1 hour.
<br>
{{% /accordion %}}

1. Continue adding more **Alert Rule** to the group.

1. Finally, choose the [notifiers]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/notifiers/) that send you alerts.

    - You can set up multiple notifiers.
    - You can change notifier recipients on the fly.

**Result:** Your alert is configured. A notification is sent when the alert is triggered.

#### Managing Project Alerts

To manage project alerts, browse to the project that alerts you want to manage. Then select **Tools > Alerts**. In versions prior to v2.2.0, you can choose **Resources > Alerts**. You can:

- Deactivate/Reactive alerts
- Edit alert settings
- Delete unnecessary alerts
- Mute firing alerts
- Unmute muted alerts
