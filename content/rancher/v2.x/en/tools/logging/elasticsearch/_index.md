---
title: Elasticsearch
weight: 200
---

If your organization uses [Elasticsearch](https://www.elastic.co/), either on premise or in the cloud, you can configure it to log events from your cluster. Afterwards, you can log into your Elasticsearch deployment to view logs for cluster or container events.

## Configuring Elasticsearch Logging

You can configure Elasticsearch to log events at both the cluster and project level.

>**Prerequisites:** Configure an [Elasticsearch deployment](https://www.elastic.co/guide/en/cloud/saas-release/ec-create-deployment.html).

1. Browse to the cluster or project that you want to log.
{{% accordion id="cluster" label="To Configure Cluster Logging:" %}}
1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.
{{% /accordion %}}
{{% accordion id="project" label="To Configure Project Logging:" %}}
1. From the **Global** view, open the project that you want to configure logging for.

1. From the main menu, select **Resources > Logging**. 
{{% /accordion %}}

1. Select **Elasticsearch**.

1. Complete the **Elasticsearch Configuration** form.

    1. From the **Endpoint** field, enter the IP address and port for your Elasticsearch instance. You can copy this information from the dashboard of your Elasticsearch deployment. Elasticsearch usually uses port `9243`.

    1. If you are using [X-Pack Security](https://www.elastic.co/guide/en/x-pack/current/xpack-introduction.html), enter your Elasticsearch **Username** and **Password** for authentication.

    1. Enter an [Index Pattern](https://www.elastic.co/guide/en/kibana/current/index-patterns.html).

1. If your instance of Elasticsearch uses SSL, complete the **SSL Configuration** form.

    1. Enter a private key and client certificate. Either copy and paste them or browse to them using **Read from a file**.

        You can generate a key and certificate one using an openssl command. For example:
        
            
            openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
       

    1. Enter your private key password.

    1. If you want to verify connections to Elasticsearch, select the **Enabled - Input trusted server certificate** option and then enter your **Trusted Server Certificate**.

1. Complete the **Additional Logging Configuration** form.

    1. Use the **Add Field** button to add key value pairs that represent custom log fields to filter log events.

    1. Enter a **Flush Interval**. This value determines how often the buffered logs are flushed.

1. Click **Save**.

**Result:** Rancher is now configured to send cluster and container events to Elasticsearch for logging. Log into Elasticsearch or Kibana to view your cluster/project events.