---
title: Syslog
weight: 500
---

You can configure Rancher to send Kubernetes logs to a [Syslog](https://tools.ietf.org/html/rfc5424) server.

## Configuring Syslog

You can configure Rancher to send cluster or project logs to Syslog.

>**Prerequisite:** You must have a Syslog server configured.

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

1. Select **Syslog**.

1. Complete the **Syslog Configuration** form.

    1. From the **Endpoint** field, enter the IP address and port for your Syslog server. Additionally, select the protocol that your Syslog server uses from the drop-down.

    1. From the **Program** field, enter the name of the application logging events to your Syslog server (i.e., Rancher).

    1. If you are using a cloud logging service (i.e., [Sumologic](https://www.sumologic.com/)), enter a **Token** that authenticates with your Syslog server. Use the cloud logging service to create this token.

    1. Select a **Log Severity** for events that are logged to the Syslog server. For more information on each severity level, see the [Syslog protocol documentation](https://tools.ietf.org/html/rfc5424#page-11).

1. If your Syslog server uses **TCP** protocol, complete the **SSL Configuration** form.

    1. Enter a private key and client certificate. Either copy and paste them or browse to them using **Read from a file**. This certificate will be installed on your logging server.

        You can use either a self-signed certificate or one provided by a certificate authority.

        You can generate a self-signed certificate using an openssl command. For example:
        
            
            openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"

    1. If you are using a certificate from a certificate authority (and not a self-signed certificate), select the **Enabled - Input trusted server certificate** option and then enter your **Trusted Server Certificate**.

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.
    
     1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes event data to the logging server. Intervals are measured in seconds.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to your Syslog server. View your Syslog stream to view logs for your cluster and containers.