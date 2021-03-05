---
title: Project Logging
shortTitle: Project Logging
weight: 2527
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/tools/logging
  - /rancher/v2.0-v2.4/en/logging/legacy/project-logging
  - /rancher/v2.0-v2.4/en/logging/v2.0.x-v2.4.x/project-logging
---

Rancher can integrate with a variety of popular logging services and tools that exist outside of your Kubernetes clusters.

For background information about how logging integrations work, refer to the [cluster administration section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/logging/v2.0.x-v2.4.x/cluster-logging/#how-logging-integrations-work)

Rancher supports the following services:

- Elasticsearch
- Splunk
- Kafka
- Syslog
- Fluentd

>**Note:** You can only configure one logging service per cluster or per project.

Only [administrators]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/), [cluster owners or members]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), or [project owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles) can configure Rancher to send Kubernetes logs to a logging service.

# Requirements

The Docker daemon on each node in the cluster should be [configured](https://docs.docker.com/config/containers/logging/configure/) with the (default) log-driver: `json-file`. You can check the log-driver by running the following command:

```
$ docker info | grep 'Logging Driver'
Logging Driver: json-file
```

# Advantages

Setting up a logging service to collect logs from your cluster/project has several advantages:

- Logs errors and warnings in your Kubernetes infrastructure to a stream. The stream informs you of events like a container crashing, a pod eviction, or a node dying.
- Allows you to capture and analyze the state of your cluster and look for trends in your environment using the log stream.
- Helps you when troubleshooting or debugging.
- Saves your logs to a safe location outside of your cluster, so that you can still access them even if your cluster encounters issues.

# Logging Scope

You can configure logging at either cluster level or project level.

- [Cluster logging]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/) writes logs for every pod in the cluster, i.e. in all the projects. For [RKE clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters), it also writes logs for all the Kubernetes system components.

- Project logging writes logs for every pod in that particular project.

Logs that are sent to your logging service are from the following locations:

  - Pod logs stored at `/var/log/containers`.

  - Kubernetes system components logs stored at `/var/lib/rancher/rke/logs/`.

# Enabling Project Logging

1. From the **Global** view, navigate to the project that you want to configure project logging.

1. Select **Tools > Logging** in the navigation bar. In versions before v2.2.0, you can choose **Resources > Logging**.

1. Select a logging service and enter the configuration. Refer to the specific service for detailed configuration. Rancher supports the following services:

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

# Related Links

[Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
