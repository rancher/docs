---
title: Syslog
weight: 500
---

You can configure a syslog server to log events that occur in your Kubernetes cluster.

>**Prerequisite:** You must have a syslog server configured.

1. From the **Global** view, open the cluster that you want to configure logging for.

1. From the main menu, select **Tools > Logging**.

1. Select **syslog**.

1. Complete the **Syslog Configuration** form.

    1. From the **Endpoint** field, enter the IP address and port for you syslog server. Additionally, select the protocol that your syslog server uses from the drop-down.

    1. From the **Program** field, enter the name of the application logging events to your syslog server.

    1. Enter a **Token** that authenticates with your syslog server.

    1. Select a **Log Severity** for events that are logged to the syslog server. For more information on each severity level, see the [syslog protocol documentation](https://tools.ietf.org/html/rfc5424#page-11).

1. If your syslog server uses **TCP** protocol, complete the **SSL Configuration** form.

    1. Enter a private key and client certificate.

    1. If you want to verify connections to the syslog service, select the **Enabled - Input trusted server certificate** option and then enter your truster server certificate.

1. Complete the **Additional Logging Configuration** form.

    1. Use the **Add Field** button to add key value pairs used to filter log events.

    1. Enter a **Flush Interval**. This value determines how often the buffered logs are flushed.

1. Click **Save**.