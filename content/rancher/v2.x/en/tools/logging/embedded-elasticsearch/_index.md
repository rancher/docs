---
title: Embedded Elasticsearch
weight: 100
---

If your organization doesn't have any logging solutions, you can use Rancher's Embedded Elasticsearch option to log record from your cluster. This option sets up an instance of [Elasticsearch](https://www.elastic.co/) within your cluster, and then uses cluster resources to run it.

>**Notes:**
>
>- Embedded Elasticsearch is experimental at this time. Therefore, persistent storage for Embedded Elasticsearch is unavailable. We plan to offer full support in a Rancher release that's yet to be determined.
>- Embedded Elasticsearch is only available for clusters and not projects.
>- Setting up Embedded Elasticsearch requires a well provisioned node within the cluster. See the prerequisites below for more details.

## Configuring Embedded Elasticsearch Logging

>**Prerequisites:** Your cluster must meet the following hardware requirements:
>
>- At least 1 dedicated CPU (2 or more in total).
>- At least 512 MB RAM.

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.

1. Select **Embedded Elasticsearch**.

1. Complete the **Embedded Elasticsearch Configuration** form.

    1. From **CPUs and Memory**, set the CPU and memory that elasticsearch can access within your cluster for logging.
    
    1. Enter an [Index Pattern](https://www.elastic.co/guide/en/kibana/current/index-patterns.html).

1. Complete the **Additional Logging Configuration** form.

    1. Use the **Add Field** button to add key value pairs that represent [custom log fields](http://docs.splunk.com/Documentation/AddOns/released/CiscoWSA/Configurew3clogfieldextractions) used to filter log events.

    1. Enter a **Flush Interval**. This value determines how often the buffered logs are flushed.

1. Click **Save**.

**Result:** Rancher is now configured to send cluster and container events to Embedded Elasticsearch for logging.

You can view your logs by clicking the **Elasticsearch Endpoint** and **Kibana Endpoint** links available on the **Cluster Logging** page.