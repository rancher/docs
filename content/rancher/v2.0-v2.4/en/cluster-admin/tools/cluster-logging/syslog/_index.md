---
title: Syslog
weight: 500
aliases:
  - /rancher/v2.0-v2.4/en/tools/logging/syslog/
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/logging/syslog
  - /rancher/v2.0-v2.4/en/logging/legacy/cluster-logging/syslog
  - /rancher/v2.0-v2.4/en/logging/v2.0.x-v2.4.x/cluster-logging/syslog
---

If your organization uses [Syslog](https://tools.ietf.org/html/rfc5424), you can configure Rancher to send it Kubernetes logs. Afterwards, you can log into your Syslog server to view logs.

>**Prerequisite:** You must have a Syslog server configured.

If you are using rsyslog, please make sure your rsyslog authentication mode is `x509/name`.

## Syslog Server Configuration

1. In the **Endpoint** field, enter the IP address and port for your Syslog server. Additionally, in the dropdown, select the protocol that your Syslog server uses.

1. In the **Program** field, enter the name of the application sending logs to your Syslog server, e.g. `Rancher`.

1. If you are using a cloud logging service, e.g. [Sumologic](https://www.sumologic.com/), enter a **Token** that authenticates with your Syslog server. You will need to create this token in the cloud logging service.

1. Select a **Log Severity** for events that are logged to the Syslog server. For more information on each severity level, see the [Syslog protocol documentation](https://tools.ietf.org/html/rfc5424#page-11).

    - By specifying a **Log Severity** does not mean that will act as a filtering mechanism for logs. To do that you should use a parser on the Syslog server.

## Encryption Configuration

If your Syslog server is using **TCP** protocol and uses TLS, you need to select **Use TLS** and complete the **Encryption Configuration** form.

1. Provide the **Client Private Key** and **Client Certificate**. You can either copy and paste them or upload them by using the **Read from a file** button.

    - You can use either a self-signed certificate or one provided by a certificate authority.

    - You can generate a self-signed certificate using an openssl command. For example:

         ```
         openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
         ```

1. Select whether or not you want to verify your SSL.

    * If you are using a self-signed certificate, select **Enabled - Input trusted server certificate**, provide the **CA Certificate PEM**. You can copy and paste the certificate or upload it using the **Read from a file** button.  
    * If you are using a certificate from a certificate authority, select **Enabled - Input trusted server certificate**. You do not need to provide a **CA Certificate PEM**.
