---
title: Splunk
weight: 3725
aliases:
  - /rancher/v2.x/en/tasks/logging/splunk/
---

If your organization uses Splunk, you can configure it to log events from your cluster. Afterwards, you can use Splunk to view data from cluster and containers.

## Configuring Cluster Logging

>**Prerequisites:** Configure HTTP event collection for your type of Splunk server (Splunk Enterprise, Splunk Cloud, etc.). Enable all tokens, and then create a new token. For more information, see [Splunk Documentation](http://docs.splunk.com/Documentation/Splunk/7.1.2/Data/UsetheHTTPEventCollector#About_Event_Collector_tokens).

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.

1. Select **Splunk**.

1. Complete the **Splunk HTTP Event Collector Configuration** form.

    1. From the **Endpoint** field, enter the IP address and port for you syslog server (i.e. `http://splunk-server:8088`)
    
      If you're using Splunk Cloud, you'll need to work with [Splunk support](https://www.splunk.com/en_us/support-and-services.html) to get an endpoint URL.

    1. Enter the **Token** you obtained while completing the prerequisites.

    1. From the **Source** field, enter the name of the token as entered in Splunk.

    1. **Optional:** Enter an index that's within the scope of your token.

1. Complete the **Additional Logging Configuration** form.

    1. Use the **Add Field** button to add key value pairs used to filter log events.

    1. Enter a **Flush Interval**. This value determines how often the buffered logs are flushed.

1. Click **Save**.

**Result:** Rancher is now configured to send cluster and container events to Splunk for logging.

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

If Splunk is configured corretcly, you should **json** data returning `success code 0`. You should be able
to send logging data to HEC.

If you received an error, check your configuration in Splunk & Rancher Cluster Logging.