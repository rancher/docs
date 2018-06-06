---
title: Adding and Managing Alerts
weight: 3575
draft: true
---

You can create alerts that monitor your resources in your Kubernetes cluster and provide notifications when there are any issues with these resources. On the cluster level, you can set alerts to help monitor the state of your nodes, the system services that manage your Kubernetes cluster and resource events from specific resource types. If you want to set alerts for specific pods or workloads in a project, you would need [set up a project level alert]({{< baseurl >}}/rancher/v2.x/tasks/projects/#adding-project-alerts).

> **Note:** Before setting up any alerts, you would need to [add a cluster level notifier]({{< baseurl >}}/rancher/v2.x/tasks/clusters/adding-notifiers/). The notifier is how you will receive these alerts.

## Adding Cluster Level Alerts

1. Navigate to the cluster that you want to add alerts to, by finding the cluster name in the main dropdown menu.
2. In the cluster, under **Tools**, select **Alerts**.
3. Click on **Add Alert**.
4. Provide a **name** for your alert. The name should describe what kind of alert that you are creating.
5. There are a number of resources of your cluster that you can monitor, e.g. system services, resource events, a specific node, or a group of nodes.
  * **System Services:** An alert is fired when a specific system service, i.e. the services that manage the Kubernetes cluster, is unhealthy.
  * **Resource Events:** An alert is fired when there are normal or warning events based on a specific type of resource in your Kubernetes cluster. The resource options are DaemonSet, Deployment, Node, Pod, StatefulSet. Please note that this would be monitoring all the resources in the cluster.
  * **Node:** An alert is fired for a specific node depending on a specific monitoring condition, i.e. `Not Ready`, CPU usage, MEM usage).
  * **Node Selector:** An alert is fired for specific nodes, which are selected based on the labels on a node. These labels are key value pairs. If there are multiple labels used, only nodes that match **all** the labels will be monitored based on the parameters selected, i.e. `Not Ready`, CPU usage, MEM usage).
6. Select the type of alert, i.e. `Critical`, `Warning` or `Info`.
7. Finally, select the recipient(s) that the alerts should be sent. The options for recipients are the  [cluster level notifier(s)]({{< baseurl >}}/rancher/v2.x/concepts/adding-notifiers/).

## Managing Cluster Level Alerts

After an alert is created, the alert might need to change. Each alert can be modified for what it is alerting, deactivated/activated to turn off/on the alert, or deleted from Rancher.

1. Navigate to the cluster that you want to add alerts to, by finding the cluster name in the main dropdown menu.
2. In the cluster, under **Tools**, select **Alerts**.
3. Find the alert that you want to modify and click on the **vertical ellipsis**.
4. Select the option that you want to use:
  * **Edit:** Modify the alert. Any of the parameters of the alert can be modified.
  * **Deactivate:** Mute the alert. The alert parameters are saved but you will no longer be notified until the alert is activated again.
  * **Delete:** Delete the alert. If the alert is no longer necessary, remove it.

If there are many alerts that need to be modified, there are bulk actions available to manage the alerts.
