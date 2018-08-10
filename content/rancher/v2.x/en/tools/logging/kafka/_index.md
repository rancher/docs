---
title: Kafka
weight: 400
---

You can configure a [Kafka](https://kafka.apache.org/) to log events that occur in your Kubernetes cluster at both the cluster and project level.

## Configuring Kafka Logging

>**Prerequisite:** You must have a Kafka server configured.

1. Browse to the cluster or project that you want to log.
{{% accordion id="cluster" label="To Configure Cluster Logging:" %}}
If you're a [cluster owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) who works in operations or security, configure cluster logging.

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.
{{% /accordion %}}
{{% accordion id="project" label="To Configure Project Logging:" %}}
If you're a [project owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) who works on an application, configure project logging.

1. From the **Global** view, open the project that you want to configure logging for.

1. From the main menu, select **Resources > Logging**. 
{{% /accordion %}}

1. Select **Kafka**.

1. Complete the **Kafka Configuration** form.

    1. From **Endpoint Type**, select the type of Kafka server you are using: **Zookeeper** or **Broker**.

    1. From the **Endpoint** field, enter the IP address and port for your Kafka server.

        By default, Kafka uses port `9092`.

    1. From the **Topic** field, enter the name of a Kafka [topic](https://kafka.apache.org/documentation/#basic_ops_add_topic) that your Kubernetes cluster submits logs to.

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.
    
    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes event data to the logging server. Intervals are measured in seconds.

1. Click **Save**.

**Result:** Rancher is now configured to send events to Kafka for logging. View your Kafka stream to view events for your cluster and containers.
