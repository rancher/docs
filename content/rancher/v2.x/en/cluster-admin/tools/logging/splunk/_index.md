---
title: Splunk
weight: 300
aliases:
  - /rancher/v2.x/en/tasks/logging/splunk/
  - /rancher/v2.x/en/tools/logging/splunk/
---

If your organization uses [Splunk](https://www.splunk.com/), you can configure Rancher to send it cluster or project logs. Afterwards logs are sent, you can use Splunk to view them.

## Configuring Splunk Logging

You can configure Rancher to send Kubernetes logs to your instance of Splunk.

>**Prerequisites:**
>
>- Configure HTTP event collection for your Splunk Server (Splunk Enterprise or Splunk Cloud).
>- Enable all tokens, and then create a new token.
>
>For more information, see [Splunk Documentation](http://docs.splunk.com/Documentation/Splunk/7.1.2/Data/UsetheHTTPEventCollector#About_Event_Collector_tokens).

1. Browse to the cluster or project that you want to log.
{{% accordion id="cluster" label="To Configure Cluster Logging:" %}}
If you're a [cluster owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) who works in operations or security, configure cluster logging.

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.
{{% /accordion %}}
{{% accordion id="project" label="To Configure Project Logging:" %}}
If you're a [project owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) who works on an application, configure project logging.

1. From the **Global** view, open the project that you want to configure logging for.

1. From the main menu, select **Tools > Logging**. In versions prior to v2.2.0, you can choose **Resources > Logging**.
{{% /accordion %}}

1. Select **Splunk**.

1. Complete the **Splunk HTTP Event Collector Configuration** form.

    1. From the **Endpoint** field, enter the IP address and port for you Splunk instance (i.e. `http://splunk-server:8088`)

        Splunk usually uses port `8088`. If you're using Splunk Cloud, you'll need to work with [Splunk support](https://www.splunk.com/en_us/support-and-services.html) to get an endpoint URL.

    1. Enter the **Token** you obtained while completing the prerequisites (i.e., when you created a token in Splunk).

    1. From the **Source** field, enter the name of the token as entered in Splunk.

    1. **Optional:** Enter one or more [index](http://docs.splunk.com/Documentation/Splunk/7.1.2/Indexer/Aboutindexesandindexers) that's allowed for your token.

1. If your Splunk is using SSL, you need to complete the **SSL Configuration** form.

    1. Enter the private key and client certificate. You can either copy and paste them or upload them by **Read from a file**.

        You can use either a self-signed certificate or one provided by a certificate authority.

        You can generate a self-signed certificate using an openssl command. For example:

            openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"

    1. Enter your private key password.

    1. If you are using a self-signed certificate, you need to select the **Enabled - Input trusted server certificate** option and enter your **CA Certificate PEM**.

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.

    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes event data to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. The logs from pods in system project and RKE components will be sent to the target. Uncheck it to exclude the system logs.

1. Click **Test**. Rancher sends a test log to Splunk.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to Splunk. Log into your Splunk instance to view events for your cluster and containers.

## Viewing Logs

1. Log into your Splunk server.

1. Click on **Search & Reporting**. The number of **Indexed Events** listed should be increasing.

1. Click on Data Summary and select the Sources tab.
  ![View Logs]({{< baseurl >}}/img/rancher/splunk/splunk4.jpg)

1. To view the actual logs, click on the source that you declared earlier.
  ![View Logs]({{< baseurl >}}/img/rancher/splunk/splunk5.jpg)

## Troubleshooting

You can use curl to see if **HEC** is listening for HTTP event data.

```
$ curl http://splunk-server:8088/services/collector/event \
    -H 'Authorization: Splunk 8da70994-b1b0-4a79-b154-bfaae8f93432' \
    -d '{"event": "hello world"}'
```

If Splunk is configured correctly, you should receive **json** data returning `success code 0`. You should be able
to send logging data to HEC.

If you received an error, check your configuration in Splunk and Rancher.
