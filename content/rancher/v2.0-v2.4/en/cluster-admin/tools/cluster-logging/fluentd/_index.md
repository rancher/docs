---
title: Fluentd
weight: 600
aliases:
    - /rancher/v2.0-v2.4/en/cluster-admin/tools/logging/fluentd
    - /rancher/v2.0-v2.4/en/logging/legacy/cluster-logging/fluentd
    - /rancher/v2.0-v2.4/en/logging/v2.0.x-v2.4.x/cluster-logging/fluentd
---

If your organization uses [Fluentd](https://www.fluentd.org/), you can configure Rancher to send it Kubernetes logs.  Afterwards, you can log into your Fluentd server to view logs.

>**Prerequisites:** Configure Fluentd input forward to receive the event stream.
>
>See [Fluentd Documentation](https://docs.fluentd.org/v1.0/articles/in_forward) for details.

## Fluentd Configuration

You can add multiple Fluentd Servers. If you want to add additional Fluentd servers, click **Add Fluentd Server**. For each Fluentd server, complete the configuration information:

1. In the **Endpoint** field, enter the address and port of your Fluentd instance, e.g. `http://Fluentd-server:24224`.

1. Enter the **Shared Key** if your Fluentd Server is using a shared key for authentication.

1. Enter the **Username** and **Password** if your Fluentd Server is using username and password for authentication.

1. **Optional:** Enter the **Hostname** of the Fluentd server.

1. Enter the load balancing **Weight** of the Fluentd server. If the weight of one server is 20 and the other server is 30, events will be sent in a 2:3 ratio. If you do not enter a weight, the default weight is 60.

1. If this server is a standby server, check **Use as Standby Only**. Standby servers are used when all other servers are not available.

After adding all the Fluentd servers, you have the option to select **Enable Gzip Compression**. By default, this is enabled because the transferred payload size will be reduced.

## SSL Configuration

If your Fluentd servers are using TLS, you need to select **Use TLS**. If you are using a self-signed certificate, provide the **CA Certificate PEM**. You can copy and paste the certificate or upload it using the **Read from a file** button.

>**Note:** Fluentd does not support self-signed certificates when client authentication is enabled. 
