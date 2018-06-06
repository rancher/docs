---
title: Projects
weight: 3650
draft: true
---
Coming Soon

## Creating a Project

Coming Soon

## Switching Projects

Coming Soon

## Adding / Managing Project Members

Coming Soon

## Adding SSL Certificates

Coming Soon

## Adding Configuration Maps

Coming Soon

## Enabling Project Logging

Coming Soon

## Adding Project Alerts

You can create alerts that monitor the status of specific pods or workloads and provide notifications when there are any issues with these resources. If you want to monitor the state of your nodes, your Kubernetes cluster or specific events from Kubernetes services, we recommend [setting up a cluster level alert]({{< baseurl >}}/rancher/v2.x/cluster/adding-alerts/).

> **Note:** Before setting up any alerts, you would need to [add a cluster level notifier]({{< baseurl >}}/rancher/v2.x/tasks/clusters/adding-notifiers/). The notifier is how you will receive these alerts.

1. Navigate to the project that you want to add alerts to, by finding the project name in the dropdown menu.
2. In the project, under **Resources**, select **Alerts**.
3. Click on **Add Alert**.
4. Provide a _name_ for your alert. This should be descriptive to indicate what alert you are creating.
5. There are a number of options of your project that you can monitor, e.g. pod, workload or workload selector.
  * **Pod:** An alert can be fired when a specific pod has hit a specific condition, i.e. not running, not scheduled, restarted `X` times within `X` minutes.  
  * **Workload:** An alert is fired when a specific workload only has a certain percentage of available pods.
  * **Workload Selector:** An alert is fired for specific workloads, which are selected based on the labels on the workload. These labels are key value pairs. If there are multiple labels used, only nodes that match **all** the labels will be monitored and alerted when any of the workloads has a certain percentage of available pods.
6. Select the type of alert, i.e. `Critical`, `Warning` or `Info`.
7. Finally, select the recipient(s) that the alerts should be sent. The options for recipients are the [cluster level notifier(s)]({{< baseurl >}}/rancher/v2.x/concepts/adding-notifiers/).

## Managing Project Alerts

After an alert is created, the alert might need to change. Each alert can be modified for what it is alerting, deactivated/activated to turn off/on the alert, or deleted from Rancher.

1. Navigate to the project that you want to add alerts to, by finding the project name in the main dropdown menu.
2. In the cluster, under **Resources**, select **Alerts**.
3. Find the alert that you want to modify and click on the **vertical ellipsis**.
4. Select the option that you want to use:
  * **Edit:** Modify the alert. Any of the parameters of the alert can be modified.
  * **Deactivate:** Mute the alert. The alert parameters are saved but you will no longer be notified until the alert is activated again.
  * **Delete:** Delete the alert. If the alert is no longer necessary, remove it.

If there are many alerts that need to be modified, there are bulk actions available to manage the alerts.

## Using Private Registries

Coming Soon

## Adding a Secret

Coming Soon

## Launching a Catalog App

Coming Soon

## Creating a Pod Security Policy

Coming Soon
