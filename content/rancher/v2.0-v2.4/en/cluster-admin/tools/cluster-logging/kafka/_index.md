---
title: Kafka
weight: 400
aliases:
  - /rancher/v2.0-v2.4/en/tools/logging/kafka/
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/logging/kafka
  - /rancher/v2.0-v2.4/en/logging/legacy/cluster-logging/kafka
  - /rancher/v2.0-v2.4/en/logging/v2.0.x-v2.4.x/cluster-logging/kafka
---

If your organization uses [Kafka](https://kafka.apache.org/), you can configure Rancher to send it Kubernetes logs.  Afterwards, you can log into your Kafka server to view logs.

>**Prerequisite:** You must have a Kafka server configured.

## Kafka Server Configuration

1. Select the type of **Endpoint** your Kafka server is using:

  * **Zookeeper**: Enter the IP address and port. By default, Zookeeper uses port `2181`. Please note that a Zookeeper endpoint cannot enable TLS.
  * **Broker**: Click on **Add Endpoint**. For each Kafka broker, enter the IP address and port. By default, Kafka brokers use port `9092`.

1. In the **Topic** field, enter the name of a Kafka [topic](https://kafka.apache.org/documentation/#basic_ops_add_topic) that your Kubernetes cluster submits logs to.

## **Broker** Endpoint Type

### SSL Configuration

If your Kafka cluster is using SSL for the **Broker**, you need to complete the **SSL Configuration** form.

1. Provide the **Client Private Key** and **Client Certificate**. You can either copy and paste them or upload them by using the **Read from a file** button.

1. Provide the **CA Certificate PEM**. You can either copy and paste the certificate or upload it using the **Read from a file** button.

>**Note:** Kafka does not support self-signed certificates when client authentication is enabled. 

### SASL configuration

If your Kafka cluster is using [SASL authentication](https://kafka.apache.org/documentation/#security_sasl) for the Broker, you need to complete the **SASL Configuration** form.

1. Enter the SASL **Username** and **Password**.

1. Select the **SASL Type** that your Kafka cluster is using.

    * If your Kafka is using **Plain**, please ensure your Kafka cluster is using SSL.

    * If your Kafka is using **Scram**, you need to select which **Scram Mechanism** Kafka is using.
