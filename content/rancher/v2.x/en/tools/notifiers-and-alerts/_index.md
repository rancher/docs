---
title:  Alerts and Notifiers
weight: 5010
---

Notifiers and Alerts are two features that work together to inform you of events in the Rancher system. Notifiers are objects that you configure to leverage popular IT services, which send you notification of Rancher Events. Alerts are rule sets that trigger when those notifications are sent.

Notifiers and Alerts are built on top of the [Prometheus Alertmanager](https://prometheus.io/docs/alerting/alertmanager/). Leveraging these tools, Rancher can notify [cluster owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) and [project owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) of events they need to address.

## Notifiers

Before you can receive [alerts](#alerts), you must configure one or more notifier in Rancher.

_Notifiers_ are services that inform you of alert events. You can configure notifiers to send alert notifications to staff best suited to take corrective action.

Notifiers are configured at the cluster level. This model ensures that only cluster owners need to configure notifiers, leaving project owners to simply configure alerts in the scope of their projects. You don't need to dispense privileges like SMTP server access or cloud account access.

Rancher integrates with a variety of popular IT services, including:

- **Slack**: Send alert notifications to your Slack channels.
- **Email**: Choose email recipients for alert notifications.
- **PagerDuty**: Route notifications to staff by phone, SMS, or personal email.
- **Webhooks**: Update a webpage with alert notifications.
<br/>
<br/>

### Adding Notifiers

Set up a notifier so that you can begin configuring and sending alerts.

1. From the **Global View**, open the cluster that you want to add a notifier to.

1. From the main menu, select **Tools > Notifiers**. Then click **Add Notifier**.

1. Select the service you want to use as your notifier, and then fill out the form.
{{% accordion id="slack" label="Slack" %}}
1. Enter a **Name** for the notifier.
1. Create a Slack Webhook. For instructions, see the [Slack Documentation](https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack).
1. Enter your Slack Webhook **URL**.
1. Enter the name of the channel that you want to send alert notifications in the following format: `#<channelname>`.
1. Click **Test**. If the test is successful, the target Slack channel prints `Slack setting validated`.
{{% /accordion %}}
{{% accordion id="email" label="Email" %}}
1. Enter a **Name** for the notifier.
1. In the **Sender** field, enter an email address available on your mail server that you want to send the notification.
1. In the **Host** field, enter the IP address or host name for your SMTP server. Example: `smtp.email.com`
1. In the **Port** field, enter the port used for email. TLS typically uses `587` and SSL typically uses `465`. If you're using TLS, make sure **Use TLS** is selected.
1. Enter a **Username** and **Password** that authenticate with the SMTP server. 
1. In the **Default Recipent** field, enter the email address that you want to receive the notification. 
1. Click **Test**. If the test is successful, Rancher prints `settings validated` and you receive a test notification email.
{{% /accordion %}}
{{% accordion id="pagerduty" label="PagerDuty" %}}
1. Enter a **Name** for the notifier.
1. Create a PagerDuty WebHook. For instructions, see the [PagerDuty Documentation](https://support.pagerduty.com/docs/webhooks).
1. Copy the WebHook's **Integration Key**.
1. Enter the key in the **Service Key** field.
1. Click **Test**. If the test is successful, your PagerDuty endpoint prints `PageDuty setting validated`.
{{% /accordion %}}
{{% accordion id="webhook" label="Webhook" %}}
1. Enter a **Name** for the notifier.
1. Using the app of your choice, create a webhook URL.
1. Enter your webhook **URL**.
1. Click **Test**. If the test is successfull, the URL prints `Webhook setting validated`.
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

To keep your clusters and applications healthy and driving your organizational productivity forward, you need stay informed of events occurring in your clusters and projects, both planned and unplanned. To help you stay informed of these events, you can configure alerts.

_Alerts_ are sets of rules, chosen by you, to monitor for specific events. The scope for alerts can be set at either the cluster or project level.

### Cluster Alerts vs. Project Alerts

At the [cluster level](#adding-cluster-alerts), Rancher monitors components in your Kubernetes cluster, and sends you alerts related to:

- The state of your nodes.
- The system services that manage your Kubernetes cluster.
- The resource events from specific system services.

At the [project level](#adding-project-alerts), Rancher monitors specific deployments and sends alerts for:

* Deployment availability
* Workloads status
* Pod status
<br/>
<br/>

#### Adding Cluster Alerts

As a cluster owner, you can configure Rancher to send you alerts for cluster events.

>**Prerequisite:** Before you can receive cluster alerts, you must [add a notifier](#adding-notifiers).

1. From the **Global** view, open the cluster that you want to configure alerts for.

1. From the main menu, select **Tools > Alerts**. Then click **Add Alert**.

1. Enter a **Name** for the alert that describes its purpose.

1. Based on the type of alert you want to create, complete one of the instruction subsets below.
{{% accordion id="system-service" label="System Service Alerts" %}}
This alert type monitors for events that affect one of the Kubernetes master components, regardless of the node it occurs on.

1. Select the **System Services** option, and then select an option from the drop-down.

  - [controller-manager](https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager)
  - [etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd)
  - [scheduler](https://kubernetes.io/docs/concepts/overview/components/#kube-scheduler)

1. Select the urgency level of the of alert. The options are:

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert based on how many nodes fill the role within your cluster. For example, if you have a 5-node cluster, and all 5 nodes run `etcd`, select **Info**. However, if only 1 node in your cluster runs `etcd`, select **Critical**.
{{% /accordion %}}
{{% accordion id="resource-event" label="Resource Event Alerts" %}}
This alert type monitors for any event that involves a selected resource type, rather than a unique event.

1. Choose the type of resource event that triggers an alert. The options are:

  - **Normal**: triggers an alert when resource events occur, either expected or unexpected.
  - **Warning**: triggers an alert when unexpected resource events occur.

1. Select a resource type from the **Choose a Resource** drop-down that you want to trigger an alert.

  - [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
  - [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
  - [Node](https://kubernetes.io/docs/concepts/architecture/nodes/)
  - [Pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/)
  - [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

1. Select the urgency level of the of alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert by considering factors such as how often the event occurs or its importance. For example:

    - If you set a normal alert for pods, you're likely to receive alerts often, and individual pods usually self-heal, so select an urgency of **Low**.
    - If you set a warning alert for StatefulSets, its very likely to impact operations, so select an urgency of **Critical**.


{{% /accordion %}}
{{% accordion id="node" label="Node Alerts" %}}
This alert type monitors for events that occur on a specific node.

1. Select the **Node** option, and then make a selection from the **Choose a Node** drop-down.

1. Choose an event to trigger the alert.

  - **Not Ready**: Sends you an alert when the node is unresponsive.
  - **CPU usage over**: Sends you an alert when the node raises above an entered percentage of its processing allocation.
  - **Mem usuage over**: Sends you an alert when the node raises above an entered percentage of its memory allocation.

1. Select the urgency level of the of alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
    Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's CPU raises above 60% deems a urgency of **Info**, but a node that is **Not Ready** deems an urgency of **Critical**.
{{% /accordion %}}
{{% accordion id="node-selector" label="Node Selector Alerts" %}}
This alert type monitors for events that occur on any node on marked with a key value pair. For more information, see the Kubernetes documentation for [NodeSelectors](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector).

1. Select the **Node Selector** option, and then click **Add Selector** to enter a nodeSelector key value pair. This nodeSelector should be applied to one or more of your nodes. Add as many selectors as you'd like.

1. Choose an event to trigger the alert.

  - **Not Ready**: Sends you an alert when selected nodes are unresponsive.
  - **CPU usage over**: Sends you an alert when selected nodes raise above an entered percentage of processing allocation.
  - **Mem usuage over**: Sends you an alert when selected nodes raise above an entered percentage of memory allocation.

1. Select the urgency level of the of alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent
    <br/>
    <br/>
      Select the urgency level of the alert based on its impact on operations. For example, an alert triggered when a node's CPU raises above 60% deems a urgency of **Info**, but a node that is **Not Ready** deems an urgency of **Critical**.
{{% /accordion %}}
1. Finally, choose the notifiers that send you alerts. 

    - You can set up multiple notifiers.
    - You can change notifier recipients on the fly.

**Result:** Your alert is configured. A notification is sent when the alert is triggered.

#### Managing Cluster Alerts

After you set up cluster alerts, you can manage each alert object. To manage alerts, browse to the cluster containing the alerts, and then select **Tools > Alerts** that you want to manage. You can:

- Deactivate/Reactive alerts
- Edit alert settings
- Delete unnecessary alerts

#### Adding Project Alerts

>**Prerequisite:** Before you can receive project alerts, you must [add a notifier](#adding-notifiers).

1. From the **Global** view, open the project that you want to configure alerts for.

1. From the main menu, select **Resources > Alerts**. Then click **Add Alert**.

1. Enter a **Name** for the alert that describes its purpose.

1. Based on the type of alert you want to create, complete one of the instruction subsets below.
{{% accordion id="pod" label="Pod Alerts" %}}
This alert type monitors for the status of a specific pod.

1. Select the **Pod** option, and then select a pod from the drop-down.
1. Select a pod status that triggers and alert:

    - **Not Running**
    - **Not Scheduled**
    - **Restarted `<x>` times with the last `<x>` Minutes**

1. Select the urgency level of the of alert. The options are:

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent

    Select the urgency level of the alert based on how many nodes fill the role within your cluster. For example, an stateless pod that's not can be easily replaced, so select **Info**. However, if an important pod isn't scheduled, it may affect operations, so choose **Critical**.
{{% /accordion %}}
{{% accordion id="workload" label="Workload Alerts" %}}
This alert type monitors for the availability of a workload.

1. Choose the **Workload** option. Then choose a workload from the drop-down.

1. Choose an availability percentage using the slider. The alert is triggered when the workload's availability on your cluster nodes drops below the set percentage.

1. Select the urgency level of the of alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent

    Select the urgency level of the alert based on the percentage. For example, if you set the alert to 100%, choose **Info**, as the workload is still readily available. If you choose 20%, choose **Critical**, as your app is at risk of going offline.

{{% /accordion %}}
{{% accordion id="workload-selector" label="Workload Selector Alerts" %}}
This alert type monitors for the availability of all workloads marked with tags that you've specified.

1. Select the **Workload Selector** option, and then click **Add Selector** to enter a key value pair. If one of the workloads drops below your specifications, an alert is triggered. This pair should be applied to one or more of your workloads.

1. Select the urgency level of the of alert.

    - **Critical**: Most urgent
    - **Warning**: Normal urgency
    - **Info**: Least urgent

    Select the urgency level of the alert based on the percentage. For example, if you set the alert to 100%, choose **Info**, as the workloads marked with the selector are still readily available. If you choose 20%, choose **Critical**, as a workload marked with the selector at risk of going offline.
{{% /accordion %}}

1. Finally, choose the notifiers that send you alerts.

    - You can set up multiple notifiers.
    - You can change notifier recipients on the fly.

**Result:** Your alert is configured. A notification is sent when the alert is triggered.

#### Managing Project Alerts

To manage project alerts, browse to the project that alerts you want to manage. Then select **Resources > Alerts**. You can:

- Deactivate/Reactive alerts
- Edit alert settings
- Delete unnecessary alerts
