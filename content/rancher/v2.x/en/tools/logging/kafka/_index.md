---
title: Kafka
weight: 400
---

You can configure a Kafka server to log events that occur in your Kubernetes cluster.

>**Prerequisite:** You must have a Kafka server configured.

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.

1. Select **Kafka**.

1. Complete the **Kafka Configuration** form.

    1. From **Endpoint Type**, select the type of Kafka server you are using: **Zookeeper** or **Broker**.

    1. From the **Endpoint** field, enter the IP address and port for your Kafka server.

        By default, Kafka uses port `9092`.

    1. From the Topic field, enter the name of a Kafka topic that your Kubernetes cluster submits logs to.

1. Complete the **Additional Logging Configuration** form.

    1. Use the **Add Field** button to add key value pairs used to filter log events.

    1. Enter a **Flush Interval**. This value determines how often the buffered logs are flushed.

1. Click **Save**.