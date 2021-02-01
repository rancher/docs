---
title: Cluster Logging
shortTitle: Logging
description: Rancher integrates with popular logging services. Learn the requirements and benefits of integrating with logging services, and enable logging on your cluster.
metaDescription: "Rancher integrates with popular logging services. Learn the requirements and benefits of integrating with logging services, and enable logging on your cluster."
weight: 3
aliases:
  - /rancher/v2.0-v2.4/en/tasks/logging/
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/logging
  - /rancher/v2.0-v2.4/en/logging/legacy/cluster-logging
  - /rancher/v2.0-v2.4/en/logging/v2.0.x-v2.4.x/cluster-logging/
---

Logging is helpful because it allows you to:

- Capture and analyze the state of your cluster
- Look for trends in your environment
- Save your logs to a safe location outside of your cluster
- Stay informed of events like a container crashing, a pod eviction, or a node dying
- More easily debug and troubleshoot problems

Rancher supports integration with the following services:

- Elasticsearch
- Splunk
- Kafka
- Syslog
- Fluentd

This section covers the following topics:

- [How logging integrations work](#how-logging-integrations-work)
- [Requirements](#requirements)
- [Logging scope](#logging-scope)
- [Enabling cluster logging](#enabling-cluster-logging)

# How Logging Integrations Work

Rancher can integrate with popular external services used for event streams, telemetry, or search. These services can log errors and warnings in your Kubernetes infrastructure to a stream.

These services collect container log events, which are saved to the `/var/log/containers` directory on each of your nodes. The service collects both standard and error events. You can then log into your services to review the events collected, leveraging each service's unique features.

When configuring Rancher to integrate with these services, you'll have to point Rancher toward the service's endpoint and provide authentication information.

Additionally, you'll have the opportunity to enter key-value pairs to filter the log events collected. The service will only collect events for containers marked with your configured key-value pairs.

>**Note:** You can only configure one logging service per cluster or per project.

# Requirements

The Docker daemon on each node in the cluster should be [configured](https://docs.docker.com/config/containers/logging/configure/) with the (default) log-driver: `json-file`. You can check the log-driver by running the following command:

```
$ docker info | grep 'Logging Driver'
Logging Driver: json-file
```

# Logging Scope

You can configure logging at either cluster level or project level.

- Cluster logging writes logs for every pod in the cluster, i.e. in all the projects. For [RKE clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters), it also writes logs for all the Kubernetes system components.
- [Project logging]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/tools/logging/) writes logs for every pod in that particular project.

Logs that are sent to your logging service are from the following locations:

  - Pod logs stored at `/var/log/containers`.
  - Kubernetes system components logs stored at `/var/lib/rancher/rke/log/`.

# Enabling Cluster Logging

As an [administrator]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to send Kubernetes logs to a logging service.

1. From the **Global** view, navigate to the cluster that you want to configure cluster logging.

1. Select **Tools > Logging** in the navigation bar.

1. Select a logging service and enter the configuration. Refer to the specific service for detailed configuration. Rancher supports integration with the following services:

   - [Elasticsearch]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/elasticsearch/)
   - [Splunk]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/splunk/)
   - [Kafka]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/kafka/)
   - [Syslog]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/syslog/)
   - [Fluentd]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/fluentd/)

1. (Optional) Instead of using the UI to configure the logging services, you can enter custom advanced configurations by clicking on **Edit as File**, which is located above the logging targets. This link is only visible after you select a logging service.

    - With the file editor, enter raw fluentd configuration for any logging service. Refer to the documentation for each logging service on how to setup the output configuration.

       - [Elasticsearch Documentation](https://github.com/uken/fluent-plugin-elasticsearch)
       - [Splunk Documentation](https://github.com/fluent/fluent-plugin-splunk)
       - [Kafka Documentation](https://github.com/fluent/fluent-plugin-kafka)
       - [Syslog Documentation](https://github.com/dlackty/fluent-plugin-remote_syslog)
       - [Fluentd Documentation](https://docs.fluentd.org/v1.0/articles/out_forward)

   - If the logging service is using TLS, you also need to complete the **SSL Configuration** form.
       1. Provide the **Client Private Key** and **Client Certificate**. You can either copy and paste them or upload them by using the **Read from a file** button.

           - You can use either a self-signed certificate or one provided by a certificate authority.

           - You can generate a self-signed certificate using an openssl command. For example:

                ```
                openssl req -x509 -newkey rsa:2048 -keyout myservice.key -out myservice.cert -days 365 -nodes -subj "/CN=myservice.example.com"
                ```
       2. If you are using a self-signed certificate, provide the **CA Certificate PEM**.

1. (Optional) Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.

    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes data to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. The logs from pods in system project and RKE components will be sent to the target. Uncheck it to exclude the system logs.

1. Click **Test**. Rancher sends a test log to the service.

    > **Note:** This button is replaced with _Dry Run_ if you are using the custom configuration editor. In this case, Rancher calls the fluentd dry run command to validate the configuration.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to the selected service. Log into the logging service so that you can start viewing the logs.

## Related Links

[Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
