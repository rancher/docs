---
title: Custom
weight: 700
aliases:
  - /rancher/v2.x/en/tools/logging/custom/
---

_Available as of v2.2.0_

You can configure Rancher to send Kubernetes logs to Elasticsearch, Splunk, Kafka, Syslog or Fluentd.

## Configuring Advance Mode

You can configure Rancher to send cluster or project logs to one of the logging targets in advance mode by inputting raw fluentd configuration.

>**Prerequisite:** You must have a one of the logging targets of Elasticsearch, Splunk, Kafka, Syslog and Fluentd server configured.

1. Browse to the cluster or project.
{{% accordion id="cluster" label="To Configure Cluster Logging:" %}}
If you're a [cluster owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) who works in operations or security, configure cluster logging.

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.

{{% /accordion %}}
{{% accordion id="project" label="To Configure Project Logging:" %}}
If you're a [project owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) who works on an application, configure project logging.

1. From the **Global** view, open the project that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.

{{% /accordion %}}

1. Select one of the logging targets, giving example for **Elasticsearch**.

1. Click the  **Edit as File**.

    1. Input the Fluentd output configuration.

    1. Giving an example for **Elasticsearch** target.

        ```sh
        @type elasticsearch
        include_tag_key  true
        user elasticsearch
        password PleaseChaneMe
        hosts https://rancher.com:9200    
        logstash_format true
        logstash_prefix elastic-index
        logstash_dateformat  %Y-%m-%d
        type_name  container_log    

        ```

    1. For Elasticsearch configuration, see [Elasticsearch Documentation](https://github.com/uken/fluent-plugin-elasticsearch) for details.

    1. For Splunk configuration, see [Splunk Documentation](https://github.com/fluent/fluent-plugin-splunk) for details.

    1. For Kafka configuration, see [Kafka Documentation](https://github.com/fluent/fluent-plugin-kafka) for details.

    1. For Syslog configuration, see [Syslog Documentation](https://github.com/dlackty/fluent-plugin-remote_syslog) for details.

    1. For Fluentd configuration, see [Fluentd Documentation](https://docs.fluentd.org/v1.0/articles/out_forward) for details.

1. If your logging server is using TLS, you need to complete the **SSL Configuration** form.

    1. Enter the private key and client certificate. You can either copy and paste them or upload them by **Read from a file**.

        You can use either a self-signed certificate or one provided by a certificate authority.

        You can generate a self-signed certificate using an openssl command. For example:

            openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"


    1. If you are using a self-signed certificate, you need to provide the **CA Certificate PEM** as well.

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.

    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes data to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. The logs from pods in system project and RKE components will be sent to the target. Uncheck it to exclude the system logs.

1. Click **Dry Run**. Rancher calls the fluentd dry run command to validate the configuration.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to your configured server. View your server to see logs for your cluster and containers.
