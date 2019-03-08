---
title: Custom
weight: 500
---

You can configure Rancher to send Kubernetes logs to Elasticsearch, Splunk, Kafka, Syslog, Fluentd

## Configuring Advance Mode

You can configure Rancher to send cluster or project logs to one of the logging target in advance mode by inputting raw fluentd configure.

>**Prerequisite:** You must have a one of the Elasticsearch, Splunk, Kafka, Syslog, Fluentd server configured.

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

1. Select one of the logging targets, giving example for **Elasticsearch**.

1. Click the  **Edit as File**.

    1. Input the Fluentd output configure, **Edit as File** could support more configure than the **Edit as a Form** mode.

    1. Giving an example for **Elasticsearch** configure.
    
        ```sh
        @type elasticsearch
        include_tag_key  true
        user elasticsearch
        password PleaseChaneMe
        hosts https://rancher.com:9200    
        logstash_format true
        logstash_prefix "elastic-index"
        logstash_dateformat  %Y-%m-%d
        type_name  "container_log"    
        <buffer>
            @type file
            path /fluentd/log/buffer/cluster.buffer
            flush_interval 60s
            flush_mode interval
            flush_thread_count 8
        </buffer> 

        ```

    1. Configure Elasticsearch, for more information, see the [Elasticsearch](https://github.com/uken/fluent-plugin-elasticsearch).

    1. Configure Splunk, for more information, see the [Splunk](https://github.com/fluent/fluent-plugin-splunk).

    1. Configure Kafka, for more information, see the [Kafka](https://github.com/fluent/fluent-plugin-kafka).

    1. Configure Syslog, for more information, see the [Syslog](https://github.com/dlackty/fluent-plugin-remote_syslog).

    1. Configure Fluentd, for more information, see the [Fluentd](https://docs.fluentd.org/v1.0/articles/out_forward).

1. If your logging server use TLS, complete the **SSL Configuration** form.

    1. Enter a private key and client certificate. Either copy and paste them or browse to them using **Read from a file**. This certificate will be installed on your logging server.

        You can use either a self-signed certificate or one provided by a certificate authority.

        You can generate a self-signed certificate using an openssl command. For example:
        
            openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"

    1. If you are using a certificate from a certificate authority (and not a self-signed certificate), select the **Enabled - Input trusted server certificate** option and then enter your **Trusted Server Certificate Chain**.

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.
    
    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes data to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. Include system project log and rke components log by default, uncheck it to exclude system log.

1. Click **Dry Run**, then rancher calls the fluentd dry run command to validate the configure.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to your configured server. View your server to view logs for your cluster and containers.