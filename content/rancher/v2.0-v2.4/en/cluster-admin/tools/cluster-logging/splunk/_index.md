---
title: Splunk
weight: 300
aliases:
  - /rancher/v2.0-v2.4/en/tasks/logging/splunk/
  - /rancher/v2.0-v2.4/en/tools/logging/splunk/
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/logging/splunk
  - /rancher/v2.0-v2.4/en/logging/legacy/cluster-logging/splunk
  - /rancher/v2.0-v2.4/en/logging/v2.0.x-v2.4.x/cluster-logging/splunk
---

If your organization uses [Splunk](https://www.splunk.com/), you can configure Rancher to send it Kubernetes logs. Afterwards, you can log into your Splunk server to view logs.

>**Prerequisites:**
>
>- Configure HTTP event collection for your Splunk Server (Splunk Enterprise or Splunk Cloud).
>- Either create a new token or copy an existing token.
>
>For more information, see [Splunk Documentation](http://docs.splunk.com/Documentation/Splunk/7.1.2/Data/UsetheHTTPEventCollector#About_Event_Collector_tokens).

## Splunk Configuration

1. In the **Endpoint** field, enter the IP address and port for you Splunk instance (i.e. `http://splunk-server:8088`)

    * Splunk usually uses port `8088`. If you're using Splunk Cloud, you'll need to work with [Splunk support](https://www.splunk.com/en_us/support-and-services.html) to get an endpoint URL.

1. Enter the **Token** you obtained while completing the prerequisites (i.e., when you created a token in Splunk).

1. In the **Source** field, enter the name of the token as entered in Splunk.

1. **Optional:** Provide one or more [index](http://docs.splunk.com/Documentation/Splunk/7.1.2/Indexer/Aboutindexesandindexers) that's allowed for your token.

## SSL Configuration

If your instance of Splunk uses SSL, your **Endpoint** will need to begin with `https://`. With the correct endpoint, the **SSL Configuration** form is enabled and ready to be completed.

1. Provide the **Client Private Key** and **Client Certificate**. You can either copy and paste them or upload them by using the **Read from a file** button.

    - You can use either a self-signed certificate or one provided by a certificate authority.

    - You can generate a self-signed certificate using an openssl command. For example:

         ```
         openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
         ```

1. Enter your **Client Key Password**.

1. Select whether or not you want to verify your SSL.

    * If you are using a self-signed certificate, select **Enabled - Input trusted server certificate**, provide the **CA Certificate PEM**. You can copy and paste the certificate or upload it using the **Read from a file** button.  
    * If you are using a certificate from a certificate authority, select **Enabled - Input trusted server certificate**. You do not need to provide a **CA Certificate PEM**.

## Viewing Logs

1. Log into your Splunk server.

1. Click on **Search & Reporting**. The number of **Indexed Events** listed should be increasing.

1. Click on Data Summary and select the Sources tab.
  ![View Logs]({{<baseurl>}}/img/rancher/splunk/splunk4.jpg)

1. To view the actual logs, click on the source that you declared earlier.
  ![View Logs]({{<baseurl>}}/img/rancher/splunk/splunk5.jpg)

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
