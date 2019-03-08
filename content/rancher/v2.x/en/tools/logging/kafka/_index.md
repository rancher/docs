---
title: Kafka
weight: 400
---

You can configure Rancher to send cluster or project logs to a [Kafka](https://kafka.apache.org/) server.

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

    1. From the **Endpoint** field, enter the IP address and port for your Zookeeper or Broker. For Broker type could add multiple endpoints.

        By default, Zookeeper uses port `2181`, Kafka broker uses port `9092`.

    1. From the **Topic** field, enter the name of a Kafka [topic](https://kafka.apache.org/documentation/#basic_ops_add_topic) that your Kubernetes cluster submits logs to.

1. If your kafka cluster enable SSL, complete the **SSL Configuration** form. 

    1. Enter a private key and client certificate. Either copy and paste them or browse to them using **Read from a file**. This certificate will be installed on your logging server.

        You can use either a self-signed certificate or one provided by a certificate authority.

        You can generate a self-signed certificate using an openssl command. For example:
            
            openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
       
    
    1. If you are using a certificate from a certificate authority (and not a self-signed certificate), select the **Enabled - Input trusted server certificate** option and then enter your **Trusted Server Certificate Chain**.

1. If your kafka cluster enable SASL authentication, complete the **SASL Configuration** form. For more information, see [Kafka SASL](https://kafka.apache.org/documentation/#security_sasl).

    1. Enter SASL **Username** and **Passwork**

    1. Select **SASL Type**, if you use **Plain**, you must enable SSL configure.

    1. For **Scram Type**, select **Scram Mechanism**

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.
    
    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes logs to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. Include system project log and rke components log by default, uncheck it to exclude system log.    

1. Click **Test** will send a test log to Kafka, Zookeeper type and Broker configure with SASL not support send test log to it yet, will only check endpoint reachable.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to Kafka. View your Kafka stream to view logs for your cluster and containers.
