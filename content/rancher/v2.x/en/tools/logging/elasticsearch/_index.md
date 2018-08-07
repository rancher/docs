---
title: Elasticsearch
weight: 200
---

If your organization uses Elasticsearch, you can configure it to log events from your cluster. Afterwards, you can use Elasticsearch to view data from cluster and containers.

## Configuring Cluster Logging

>**Prerequisites:** Configure an [Elasticsearch deployment](https://www.elastic.co/guide/en/cloud/saas-release/ec-create-deployment.html).

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.

1. Select **Elasticsearch**.

1. Complete the **Elasticsearch Configuration** form.

    1. From the **Endpoint** field, enter the IP address and port for your Elasticsearch. You can copy this information from your the dashboard of your Elasticseach deployment.
    
    1. If you are using [X-Pack Security](https://www.elastic.co/guide/en/x-pack/current/xpack-introduction.html), enter your Elasticsearch **Username** and **Password** for authentication.

    1. Enter an [Index Pattern](https://www.elastic.co/guide/en/kibana/current/index-patterns.html).

1. Complete the **SSL Configuration** form.

    1. Enter a private key and client certificate.

    1. Enter your private key password.

    1. If you want to verify connections to the Elasticsearch, select the **Enabled - Input trusted server certificate** option and then enter your truster server certificate.

1. Complete the **Additional Logging Configuration** form.

    1. Use the **Add Field** button to add key value pairs used to filter log events.

    1. Enter a **Flush Interval**. This value determines how often the buffered logs are flushed.

1. Click **Save**.

**Result:** Rancher is now configured to send cluster and container events to Elasticsearch for logging.