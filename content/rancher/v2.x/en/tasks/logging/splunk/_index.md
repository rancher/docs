---
title: Splunk
weight: 3725
---

The following guide will demonstrate how to monitor your container
infrastructure using Splunk.

## Configure HTTP Event Collector

The first step is to identify what port Splunk is using for the HTTP Event
collector. Usually the port is either **8088** or **8089**. HEC is used to
send log data from Rancher to Splunk using HTTP or HTTPS.

Login to Splunk and go to:

Settings > Data inputs > HTTP Event Collector > **Global Settings**

![Configure Splunk]({{< baseurl >}}/img/rancher/splunk/splunk1.jpg)

Make sure to click on **Enabled** for all tokens. By default it is set to
disabled. This will allow Splunk to collect HTTP Event data sent from Rancher.

Click on **Save** to update the HEC settings.

## Generate Token

This step might not be applicable, if you already have a token. Now we will
generate the token that will be used by Rancher to send HTTP Event data.

- Click Settings > Data inputs > HTTP Event Collector > **New Token**
- Click monitor
- Select HTTP Event Collector
- In the Name field, enter a name for the token (ex. **rancher**)
- Click Next
- Select the indexe(s) desired  (history, main, and summary)
- You can also create a new index and add it to the step above
- Click Review
- Confirm that all settings for the token are what you want
- Click Submit to generate the token

&nbsp;

Congratulations you now are ready to feed Splunk with HTTP Event data. You
should see a page like the one below with your generated token. This is the
token that will be used in Rancher to communicate with Splunk.

![Token Created]({{< baseurl >}}/img/rancher/splunk/splunk2.jpg)

## Configure Cluster Logging

In this section we will configure and enable Splunk cluster logging in Rancher.

- Head on over to local > Tools > **Logging**
- Select Splunk
- Enter the Splunk endpoint using the port specified for **HEC** (ex. http://splunk-server:8088)
- Enter the token generated above (ex. 8da70994-b1b0-4a79-b154-bfaae8f93432)
- Enter the Source, name of the token created earlier (ex. **rancher**)
- You can also enter an index, this is optional (ex. **main**)

&nbsp;

![Configure Rancher Cluster Logging]({{< baseurl >}}/img/rancher/splunk/splunk3.jpg)

Repeat the same step for Project Logging, if desired. This is not required and is optional.

## View Logs

You should now be receiving logging data from your cluster. Head on over to
Splunk to view your logs.

Click on **Search & Reporting**, you should see **Indexed Events** increasing.
Click on Data Summary and select the Sources tab.

![View Logs]({{< baseurl >}}/img/rancher/splunk/splunk4.jpg)

To view the actual logs click on the source that you declared earlier
(ex. rancher -> http:**rancher**)

![View Logs]({{< baseurl >}}/img/rancher/splunk/splunk5.jpg)

## Troubleshooting

You can use curl to see if **HEC** is listening for HTTP event data.

```
$ curl http://splunk-server:8088/services/collector/event \
    -H 'Authorization: Splunk 8da70994-b1b0-4a79-b154-bfaae8f93432' \
    -d '{"event": "hello world"}'
```

You should see **json** data returning Success code 0. You should be able
to send logging data to HEC. If you received an error, check your configuration
in Splunk & Rancher Cluster Logging.

## Reference

For more information on Splunk, you can check out the following reference:

[Splunk -> HTTP Event Collector](http://docs.splunk.com/Documentation/Splunk/7.0.0/Data/UsetheHTTPEventCollector)
