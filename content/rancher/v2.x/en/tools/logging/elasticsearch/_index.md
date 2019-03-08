---
title: Elasticsearch
weight: 200
---

If your organization uses [Elasticsearch](https://www.elastic.co/), either on premise or in the cloud, you can configure Rancher to send it Kubernetes logs. Afterwards, you can log into your Elasticsearch deployment to view logs for your cluster or container.

## Configuring Elasticsearch Logging

You can configure Rancher to send logs from your cluster or project to your instance of Elasticsearch.

>**Prerequisites:** Configure an [Elasticsearch deployment](https://www.elastic.co/guide/en/cloud/saas-release/ec-create-deployment.html).

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

1. Select **Elasticsearch**.

1. Complete the **Elasticsearch Configuration** form.

    1. From the **Endpoint** field, enter the IP address and port for your Elasticsearch instance. You can copy this information from the dashboard of your Elasticsearch deployment. Elasticsearch usually uses port `9200` for HTTP and `9243` for HTTPS.

    1. If you are using [X-Pack Security](https://www.elastic.co/guide/en/x-pack/current/xpack-introduction.html), enter your Elasticsearch **Username** and **Password** for authentication.

    1. Enter an [Index Pattern](https://www.elastic.co/guide/en/kibana/current/index-patterns.html).

1. If your instance of Elasticsearch uses SSL, complete the **SSL Configuration** form. 

    1. Enter a private key and client certificate. Either copy and paste them or browse to them using **Read from a file**. This certificate will be installed on your logging server.

        You can use either a self-signed certificate or one provided by a certificate authority.

        You can generate a self-signed certificate using an openssl command. For example:
            
            openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
       

    1. Enter your private key password.

    1. Enter your ssl version, the default is tlsv1_2.

    1. If you are using a certificate from a certificate authority (and not a self-signed certificate), select the **Enabled - Input trusted server certificate** option and then enter your **Trusted Server Certificate Chain**.

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.

    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes data to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. Include system project log and rke components log by default, uncheck it to exclude system log.

1. Click **Test** will send a test log to Elasticsearch.

1. Click **Save**.

**Result:** Rancher is now configured to send cluster and container logs to Elasticsearch. Log into Elasticsearch or Kibana to view your cluster/project logs.
