---
title: Kafka
weight: 400
aliases:
  - /rancher/v2.x/en/tools/logging/kafka/
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

    - You can use either a self-signed certificate or one provided by a certificate authority.

    - You can generate a self-signed certificate using an openssl command. For example:

        ```
        openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
        ```

1. If you are using a self-signed certificate, provide the **CA Certificate PEM**. You can either copy and paste the certificate or upload it using the **Read from a file** button.

### SASL configuration

If your Kafka cluster is using [SASL authentication](https://kafka.apache.org/documentation/#security_sasl) for the Broker, you need to complete the **SASL Configuration** form.

1. Enter the SASL **Username** and **Password**.

1. Select the **SASL Type** that your Kafka cluster is using.

    * If your Kafka is using **Plain**, please ensure your Kafka cluster is using SSL.

    * If your Kafka is using **Scram**, you need to select which **Scram Mechanism** Kafka is using.
