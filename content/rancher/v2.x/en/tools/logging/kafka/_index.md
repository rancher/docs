---
title: Kafka
weight: 400
---

You can configure a [Kafka](https://kafka.apache.org/) to log events that occur in your Kubernetes cluster.

## Configuring Kafka Logging

You can configure Kafka to log events at both the cluster and project level.

>**Prerequisite:** You must have a Kafka server configured.

1. Browse to the cluster or project that you want to log.
{{% accordion id="cluster" label="To Configure Cluster Logging:" %}}
1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.
{{% /accordion %}}
{{% accordion id="project" label="To Configure Project Logging:" %}}
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

    1. **Optional**: Use the **Add Field** button to add key value pairs that represent custom log fields used to filter log events.

    1. Enter a **Flush Interval**. This value determines how often the buffered logs are flushed.

1. Click **Save**.

**Result:** Rancher is now configured to send events to Kafka for logging. View your Kafka stream to view events for your cluster and containers.
