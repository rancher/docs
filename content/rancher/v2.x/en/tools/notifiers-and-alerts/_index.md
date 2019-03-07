---
title:  Alerts and Notifiers
weight: 5010
---

Notifiers and alerts are two features that work together to inform you of events in the Rancher system. Notifiers are objects that you configure to leverage popular IT services, which send you notification of Rancher events. Alerts are rule sets that trigger when those notifications are sent.

Notifiers and alerts are built on top of the [Prometheus Alertmanager](https://prometheus.io/docs/alerting/alertmanager/). Leveraging these tools, Rancher can notify [cluster owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) and [project owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) of events they need to address.

## Notifiers

Before you can receive [alerts](#alerts), you must configure one or more notifier in Rancher.

Notifiers are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action.

Notifiers are configured at the cluster level. This model ensures that only cluster owners need to configure notifiers, leaving project owners to simply configure alerts in the scope of their projects. You don't need to dispense privileges like SMTP server access or cloud account access.

Rancher integrates with a variety of popular IT services, including:

- **Slack**: Send alert notifications to your Slack channels.
- **Email**: Choose email recipients for alert notifications.
- **PagerDuty**: Route notifications to staff by phone, SMS, or personal email.
- **WebHooks**: Update a webpage with alert notifications.
- **Wechat**: Send alert notifications to your Wechat at Work contacts.
<br/>
<br/>

### Adding Notifiers

Set up a notifier so that you can begin configuring and sending alerts.

1. From the **Global View**, open the cluster that you want to add a notifier.

1. From the main menu, select **Tools > Notifiers**. Then click **Add Notifier**.

1. Select the service you want to use as your notifier, and then fill out the form.
{{% accordion id="slack" label="Slack" %}}
1. Enter a **Name** for the notifier.
1. From Slack, create a webhook. For instructions, see the [Slack Documentation](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack).
1. From Rancher, enter your Slack webhook **URL**.
1. Enter the name of the channel that you want to send alert notifications in the following format: `#<channelname>`.

    Both public and private channels are supported.
1. Click **Test**. If the test is successful, the Slack channel you're configuring for the notifier outputs `Slack setting validated`.
{{% /accordion %}}
{{% accordion id="email" label="Email" %}}
1. Enter a **Name** for the notifier.
1. In the **Sender** field, enter an email address available on your mail server that you want to send the notification.
1. In the **Host** field, enter the IP address or hostname for your SMTP server. Example: `smtp.email.com`
1. In the **Port** field, enter the port used for email. Typically, TLS uses `587` and SSL uses `465`. If you're using TLS, make sure **Use TLS** is selected.
1. Enter a **Username** and **Password** that authenticate with the SMTP server. 
1. In the **Default Recipient** field, enter the email address that you want to receive the notification. 
1. Click **Test**. If the test is successful, Rancher prints `settings validated` and you receive a test notification email.
{{% /accordion %}}
{{% accordion id="pagerduty" label="PagerDuty" %}}
1. Enter a **Name** for the notifier.
1. From PagerDuty, create a webhook. For instructions, see the [PagerDuty Documentation](https://support.pagerduty.com/docs/webhooks).
1. From PagerDuty, copy the webhook's **Integration Key**.
1. From Rancher, enter the key in the **Service Key** field.
1. Click **Test**. If the test is successful, your PagerDuty endpoint outputs `PageDuty setting validated`.
{{% /accordion %}}
{{% accordion id="webhook" label="WebHook" %}}
1. Enter a **Name** for the notifier.
1. Using the app of your choice, create a webhook URL.
1. Enter your webhook **URL**.
1. Click **Test**. If the test is successful, the URL you're configuring as a notifier outputs `Webhook setting validated`.
{{% /accordion %}}
{{% accordion id="Wechat" label="Wechat" %}}
1. Enter a **Name** for the notifier.
1. In the **Corporation ID** field, enter corporation id of your corporation, you could get it from [corporation info](https://work.weixin.qq.com/wework_admin/frame#profile).
1. From Wechat, create an application in the Wechat at Work [Application page](https://work.weixin.qq.com/wework_admin/frame#apps). Enter the **Application Agent ID** and **Application Secret** for this application. 
1. In the **Recipient Type** field, select one of the recipient types.
1. In the **Default Recipient** field, enter the party name, tag name or user account that you want to receive the notification. For contact information, see [Wechat Contacts](https://work.weixin.qq.com/wework_admin/frame#contacts)
{{% /accordion %}}

1. Click **Add** to complete adding the notifier.

**Result:** Your notifier is added to Rancher.

#### What's Next?

After creating a notifier, set up alerts to receive notifications of Rancher system events.

- [Cluster owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) can set up alerts at the [cluster level](#cluster-alerts).
- [Project owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) can set up alerts at the [project level](#project-alerts).
<br/>
<br/>

### Managing Notifiers

After you set up notifiers, you can manage them by selecting **Tools > Notifiers** from the **Global** view. You can:

- **Edit** their settings that you configured during their initial setup.
- **Clone** them, to quickly setup slightly different notifiers.
- **Delete** them when they're no longer necessary.

## Alerts

To keep your clusters and applications healthy and driving your organizational productivity forward, you need to stay informed of events occurring in your clusters and projects, both planned and unplanned. To help you stay informed of these events, you can configure alerts.

Alerts are sets of rules, chosen by you, to monitor for specific events. The scope for alerts can be set at either the cluster or project level.

### Cluster Alerts vs. Project Alerts

At the [cluster level](#adding-cluster-alerts), Rancher monitors components in your Kubernetes cluster, and sends you alerts related to:

- The state of your nodes.
- The system services that manage your Kubernetes cluster.
- The resource events from specific system services.
- The Prometheus expression cross the thresholds

At the [project level](#adding-project-alerts), Rancher monitors specific deployments and sends alerts for:

* Deployment availability
* Workloads status
* Pod status
* The Prometheus expression cross the thresholds
<br/>
<br/>

#### Adding Cluster Alerts

As a cluster owner, you can configure Rancher to send you alerts for cluster events.

>**Prerequisite:** Before you can receive cluster alerts, you must [add a notifier](#adding-notifiers).

1. From the **Global** view, open the cluster that you want to configure alerts for.

1. From the main menu, select **Tools > Alerts**. Then click **Add Alert Group**.

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

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

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

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially. The group wait time is configured to 1s to receive the alert when the event happened.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts. The group wait time is configured to 1s to receive the alert when the event happened.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

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

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

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

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

{{% /accordion %}}
{{% accordion id="cluster-expression" label="Metric Expression Alerts" %}}
This alert type monitors prometheus querying expressions crossed the threshold, it would available after you enable monitoring.

1. Input or select an **Expression**, the drop down shows the original expressions from prometheus, below monitoring information are exposed at the cluster level.
  - **Kube State Metric**: Add-on agent to generate and expose cluster-level metrics. For more information, see [Kube-State-Metric](https://github.com/kubernetes/kube-state-metrics)
  - **Kubelet Cadvisor**: Analyzes resource usage and performance characteristics of running containers. For more information, see [Cadvisor](https://github.com/google/cadvisor)
  - **Node Exporter**: Expose machine monitoring information. For more information, see [Node Exporter](https://github.com/prometheus/node_exporter)
  - **Kubernetes Metric**: Kubernetes related metrics. For more information, see [Kubernetes](https://github.com/kubernetes/metrics)
  - **ETCD Metric**: Expose ETCD monitoring information. For cluster use rke to deploy, could get etcd metrics. For more information, see [Kubernetes](https://github.com/etcd-io/etcd/blob/master/Documentation/op-guide/monitoring.md)
  - **Fluentd Metric**: Expose the Fluentd monitoring information. For more information, see [Fluentd](https://docs.fluentd.org/v1.0/articles/monitoring-prometheus)
  - **Prometheus Metric**: Prometheus itself metrics. 
  - **Grafana Metric**: Expose Grafana monitoring information. For more information, see [Grafana](http://docs.grafana.org/administration/metrics/)

  
1. Choose a **Comparison**.

  - **Equal**: Trigger alert when expression value equal to the threshold.
  - **Not Equal**: Trigger alert when expression value not equal to the threshold.
  - **Greater Than**: Trigger alert when expression value greater than to threshold.
  - **Less Than**: Trigger alert when expression value equal or less than the threshold.
  - **Greater or Equal**: Trigger alert when expression value greater to equal to the threshold.
  - **Less or Equal**: Trigger alert when expression value less or equal to the threshold.

1. Input a **Threshold**, will trigger alert when the value of expression cross the threshold.

1. Choose a **Comparison**.

1. Select a duration, will trigger alert when expression value crosses the threshold longer than the configured duration.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's load expression ```sum(node_load5)  / count(node_cpu_seconds_total{mode="system"})``` raises above 0.6 deems an urgency of **Info**, but 1 deems an urgency of **Critical**.

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

{{% /accordion %}}

1. Continue adding more **Alert Rule** to the group. 

1. Finally, choose the notifiers that send you alerts. 

    - You can set up multiple notifiers.
    - You can change notifier recipients on the fly.

**Result:** Your alert is configured. A notification is sent when the alert is triggered.

#### Managing Cluster Alerts

After you set up cluster alerts, you can manage each alert object. To manage alerts, browse to the cluster containing the alerts, and then select **Tools > Alerts** that you want to manage. You can:

- Deactivate/Reactive alerts
- Edit alert settings
- Delete unnecessary alerts
- Mute firing alerts
- Unmute muted alerts

#### Adding Project Alerts

>**Prerequisite:** Before you can receive project alerts, you must [add a notifier](#adding-notifiers).

1. From the **Global** view, open the project that you want to configure alerts for.

1. From the main menu, select **Tools > Alerts**. Then click **Add Alert Group**.

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

    Select the urgency level of the alert based on pod state and expandability. For example, a stateless pod that's not can be easily replaced, so select **Info**. However, if an important pod isn't scheduled, it may affect operations, so choose **Critical**.

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

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

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

{{% /accordion %}}
{{% accordion id="workload-selector" label="Workload Selector Alerts" %}}
This alert type monitors for the availability of all workloads marked with tags that you've specified.

1. Select the **Workload Selector** option, and then click **Add Selector** to enter the key value pair for a label. If one of the workloads drops below your specifications, an alert is triggered. This label should be applied to one or more of your workloads.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent

    Select the urgency level of the alert based on the percentage you choose and the importance of the workload.

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

{{% /accordion %}}
{{% accordion id="project-expression" label="Metric Expression" %}}
This alert type monitors prometheus querying expressions crossed the threshold, it would available after you enable monitoring.

1. Input or select an **Expression**, the drop down shows the original expressions from prometheus, below monitoring information are exposed at the project level.
  - **Kube State Metric**: Add-on agent to generate and expose cluster-level metrics. For more information, see [Kube-State-Metric](https://github.com/kubernetes/kube-state-metrics)
  - **Kubelet Cadvisor**: Analyzes resource usage and performance characteristics of running containers. For more information, see [Cadvisor](https://github.com/google/cadvisor)
  - **Prometheus Metric**: Project level Prometheus itself metrics. 
  - **Grafana Metric**: Expose project level Grafana monitoring information. For more information, see [Grafana](http://docs.grafana.org/administration/metrics/)

1. Choose a comparison.

  - **Equal**: Trigger alert when expression value equal to the threshold.
  - **Not Equal**: Trigger alert when expression value not equal to the threshold.
  - **Greater Than**: Trigger alert when expression value greater than to threshold.
  - **Less Than**: Trigger alert when expression value equal or less than the threshold.
  - **Greater or Equal**: Trigger alert when expression value greater to equal to the threshold.
  - **Less or Equal**: Trigger alert when expression value less or equal to the threshold.

1. Input a **Threshold**, will trigger alert when the value of expression cross the threshold.

1. Choose a **Comparison**.

1. Select a **Duration**, will trigger alert when expression value crosses the threshold longer than the configured duration.

1. Select the urgency level of the alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a expression for container memory close to the limit raises above 60% deems an urgency of **Info**, but raised about 95% deems an urgency of **Critical**.

1. Config advance options, it inheriting the advance option from group level by default, you configure alert rule use a customized advance option by disabling inherited.

    - **Group Wait Time**: How long to wait to buffer alerts of the same group before sending initially.
    - **Group Interval Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.
    - **Repeat Wait Time**: How long to wait before sending an alert that has been added to a group which contains already fired alerts.

{{% /accordion %}}

1. Continue adding more **Alert Rule** to the group. 

1. Finally, choose the notifiers that send you alerts.

    - You can set up multiple notifiers.
    - You can change notifier recipients on the fly.

**Result:** Your alert is configured. A notification is sent when the alert is triggered.

#### Managing Project Alerts

To manage project alerts, browse to the project that alerts you want to manage. Then select **Resources > Alerts**. You can:

- Deactivate/Reactive alerts
- Edit alert settings
- Delete unnecessary alerts
- Mute firing alerts
- Unmute muted alerts