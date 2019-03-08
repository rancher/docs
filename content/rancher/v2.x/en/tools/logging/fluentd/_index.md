---
title: Fluentd
weight: 300
---

If your organization uses [Fluentd](https://www.fluentd.org/), you can configure Rancher to send it cluster or project logs to Fluentd server.

## Configuring Fluentd Logging

You can configure Rancher to send Kubernetes logs to your instance of Fluentd.

>**Prerequisites:** Configure Fluentd input forward to receive the event stream.
>
>For more information, see [Fluentd Documentation](https://docs.fluentd.org/v1.0/articles/in_forward).

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

1. Select **Fluentd**.

1. Complete the **Fluentd Server Configuration** form.

    1. From the **Endpoint** field, enter the address for you Fluentd instance (i.e. `http://Fluentd-server:24224`)Fluentd usually uses port `24224`. 

    1. Enter the **Shared Key** if you configure shared key in the Fluentd Server for authentication.

    1. Enter the **Username** and **Password** if you configure them in the Fluentd Server for authentication.

    1. Enter the **Hostname** of server, optional.

    1. Enter the load balancing **Weight** of the server, If the weight of one server is 20 and the weight of the other server is 30, events are sent in a 2:3 ratio. The default weight is 60.

    1. Check **Use as Standby Only** if this server is standby, standby servers will be selected when all non-standby servers went down.

    1. You could add multiple Fluentd servers.

    1. **Enable Gzip Compression** to enable by default to reduce the transferred payload size.

1. If your instance of Fluentd uses SSL, complete the **SSL Configuration** form. 

    1. If you are using a certificate from a certificate authority (and not a self-signed certificate), select the **Enabled - Input trusted server certificate** option and then enter your **Trusted Server Certificate Chain**.

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.

    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes event data to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. Include system project log and rke components log by default, uncheck it to exclude system log.

1. Click **Test** will send a test log to Fluentd.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to Fluentd. Check you Fluentd output events for your cluster and containers.

## Use Catalog to Deploy Fluentd Server 

Rancher will send the log to fluentd server, you can add filter, parser plugins configure to customize your log. Rancher support deploy fluentd server by using catalog **Fluentd Aggregator**

1. Browse to the project catalog that you want to deploy fluentd aggregator.

1. Click the **Launch**, select **fluentd-aggregator**, view details.

1. Configure deploy **Namespace**.

1. Configure deploy **Service Type**, the default is ClusterIP, you can use DNS or ClusterIP to access the service inside the cluster.

1. Configure output, select one or customize yours, check catalog description **Output Plugins**, make sure your output is supported. For more information, see [Fluentd Output](https://docs.fluentd.org/v1.0/articles/output-plugin-overview).

1. Configure filter, giving an example for using the filter to only include log from namespace kube-system. For more information, see [Fluentd Filter](https://docs.fluentd.org/v1.0/articles/filter-plugin-overview).

    ```
    <filter cluster.**>
    @type grep
    <exclude>
        key $.kubernetes.namespace_name
        pattern ^test$
    </exclude>
    </filter>
    ```

1. Configure parser if need, for more information, see [Fluentd Parser](https://docs.fluentd.org/v1.0/articles/parser-plugin-overview).

1. Configure formatter if need, for more information, see [Fluentd Formatter](https://docs.fluentd.org/v1.0/articles/formatter-plugin-overview).

1. After deployed the Fluentd Aggregator, go to **Tools > Logging**, configure Fluentd output log to your Fluentd Aggregator.

1. Complete the **Fluentd Server Configuration** form.

    1. From the **Endpoint** field, enter the cluster dns you deployed just now (i.e. `fluentd-aggregator.fluentd-aggregator.svc.cluster.local:24224`)

    1. Continue to configure other fields.

1. Click **Test** will send a test log to Fluentd.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to Fluentd Aggregator. Check you Fluentd Aggregator output events for your cluster and containers.
