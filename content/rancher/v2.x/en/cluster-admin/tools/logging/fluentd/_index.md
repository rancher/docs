---
title: Fluentd
weight: 600
aliases:
  - /rancher/v2.x/en/tools/logging/fluentd/
---

If your organization is using [Fluentd](https://www.fluentd.org/), you can configure Rancher to send logs to Fluentd server.

## Configuring Fluentd Logging

You can configure Rancher to send Kubernetes logs to your Fluentd.

>**Prerequisites:** Configure Fluentd input forward to receive the event stream.
>
>See [Fluentd Documentation](https://docs.fluentd.org/v1.0/articles/in_forward) for details.

1. Browse to the cluster or project that you want to log.
{{% accordion id="cluster" label="To Configure Cluster Logging:" %}}
If you're a [cluster owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) who works in operations or security, configure cluster logging.

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.
{{% /accordion %}}
{{% accordion id="project" label="To Configure Project Logging:" %}}
If you're a [project owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) who works on an application, configure project logging.

1. From the **Global** view, open the project that you want to configure logging for.

1. From the main menu, select **Tools > Logging**. In versions prior to v2.2.0, you can choose **Resources > Logging**.
{{% /accordion %}}

1. Select **Fluentd**.

1. Complete the **Fluentd Server Configuration** form.

    1. From the **Endpoint** field, enter the address of you Fluentd instance (i.e. `http://Fluentd-server:24224`).

    1. Enter the **Shared Key** if your Fluentd Server is using shared key for authentication.

    1. Enter the **Username** and **Password** if your Fluentd Server is using username and pasword for authentication.

    1. **Optional:** Enter the **Hostname** of the server.

    1. Enter the load balancing **Weight** of the server. If the weight of one server is 20 and the other server is 30, events will be sent in a 2:3 ratio. The default weight is 60 if you leave this field empty.

    1. Check **Use as Standby Only** if this server is standby. Standby servers will be used when all non-standby servers are down.

    1. You can add multiple Fluentd servers.

1. Select **Enable Gzip Compression**. The transferred payload size will be reduced.

1. If your Fluentd is using SSL, you need to complete the **SSL Configuration** form.

    1. If you are using a self-signed certificate, you need to provide the **CA Certificate PEM** as well.

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.

    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes event data to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. The logs from pods in system project and RKE components will be sent to the target. Uncheck it to exclude the system logs.

1. Click **Test**. Rancher sends a test log to Fluentd with rancher tag.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to Fluentd. Check you Fluentd output events for your cluster and containers.
