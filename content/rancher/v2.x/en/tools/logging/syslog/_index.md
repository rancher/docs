---
title: Syslog
weight: 500
---

You can configure a [Syslog](https://tools.ietf.org/html/rfc5424) server to log events that occur in your Kubernetes cluster.

## Configuring Syslog

You can configure Syslog to log events at both the cluster level and the project level.

>**Prerequisite:** You must have a Syslog server configured.

1. Browse to the cluster or project that you want to log.
{{% accordion id="cluster" label="To Configure Cluster Logging:" %}}
1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.

{{% /accordion %}}
{{% accordion id="project" label="To Configure Project Logging:" %}}

1. From the **Global** view, open the project that you want to configure logging for.

1. From the main menu, select **Resources > Logging**. 

{{% /accordion %}}

1. Select **Syslog**.

1. Complete the **Syslog Configuration** form.

    1. From the **Endpoint** field, enter the IP address and port for your Syslog server. Additionally, select the protocol that your Syslog server uses from the drop-down.

    1. From the **Program** field, enter the name of the application logging events to your Syslog server (i.e., Rancher).

    1. If you are using a cloud logging service (i.e., [Sumologic](https://www.sumologic.com/)), enter a **Token** that authenticates with your Syslog server. Use the cloud logging service to create this token.

    1. Select a **Log Severity** for events that are logged to the Syslog server. For more information on each severity level, see the [Syslog protocol documentation](https://tools.ietf.org/html/rfc5424#page-11).

1. If your Syslog server uses **TCP** protocol, complete the **SSL Configuration** form.

    1. Enter a private key and client certificate. Either copy and paste them or browse to them using **Read from a file**.

        You can generate a key and client using an openssl command. For example:
        
            
            openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"

    1. If you want to verify connections to the Syslog service, select the **Enabled - Input trusted server certificate** option and then enter your truster server certificate.

1. Complete the **Additional Logging Configuration** form.

    1. Use the **Add Field** button to add key value pairs used to filter log events.

    1. Enter a **Flush Interval**. This value determines how often the buffered logs are flushed.

1. Click **Save**.

**Result:** Rancher is now configured to send events to Syslog for logging. View your Syslog stream to view events for your cluster and containers.