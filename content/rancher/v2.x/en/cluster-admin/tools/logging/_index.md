---
title: Logging
weight: 3
aliases:
  - /rancher/v2.x/en/tasks/logging/
  - /rancher/v2.x/en/tools/logging/
---

Rancher can integrate with a variety of popular logging services and tools that exist outside of your Kubernetes clusters.

Rancher supports the following services:

- Elasticsearch
- Splunk
- Kafka
- Syslog
- Fluentd

Additional, Rancher supports the ability to send [custom logs]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/logging/custom/) to any of these services.

>**Note:** You can only configure one logging service per cluster or per project.

## Requirements

The Docker daemon on each node in the cluster should be [configured](https://docs.docker.com/config/containers/logging/configure/) with the (default) log-driver: `json-file`. You can check the log-driver by running the following command:

```
$ docker info | grep 'Logging Driver'
Logging Driver: json-file
```

## Advantages

Setting up a logging service to collect logs from your cluster/project has several advantages:

- Logs errors and warnings in your Kubernetes infrastructure to a stream. The stream informs you of events like a container crashing, a pod eviction, or a node dying.
- Allows you to capture and analyze the state of your cluster and look for trends in your environment using the log stream.
- Helps you when troubleshooting or debugging.
- Saves your logs to a safe location outside of your cluster, so that you can still access them even if your cluster encounters issues.

## Logging Scope

You can configure logging at either [cluster level]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/logging/) or project level.

- Cluster logging writes logs for every pod in the cluster, i.e. in all the projects. For [RKE clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters), it also writes logts for all the Kubernetes system components.

- Project logging writes logs for every pod in that particular project.

Logs that are sent to your logging service are from the following locations:

  - Pod logs stored at `/var/log/containers`.

  - Kubernetes system components logs stored at `/var/lib/rancher/rke/logs/`.

## Enabling Cluster Logging

As an [administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to send Kubernetes logs to a logging service.

1. From the **Global** view, navigate to the cluster that you want to configure cluster logging for.

1. Select **Tools > Logging** in the navigation bar.

1. Select a logging service and enter the configuration. Refer to the specific service for detailed configuration. Rancher supports the following services:

   - [Elasticsearch]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/logging/elasticsearch)
   - [Splunk]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/logging/splunk)
   - [Kafka]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/logging/kafka)
   - [Syslog]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/logging/syslog)
   - [Fluentd]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/logging/fluentd)

1. Complete the **Additional Logging Configuration** form.

    1. **Optional:** Use the **Add Field** button to add custom log fields to your logging configuration. These fields are key value pairs (such as `foo=bar`) that you can use to filter the logs from another system.

    1. Enter a **Flush Interval**. This value determines how often [Fluentd](https://www.fluentd.org/) flushes data to the logging server. Intervals are measured in seconds.

    1. **Include System Log**. The logs from pods in system project and RKE components will be sent to the target. Uncheck it to exclude the system logs.

1. Click **Test**. Rancher sends a test log to the service.

1. Click **Save**.

**Result:** Rancher is now configured to send logs to the selected service. Log into the logging service so that you can start viewing the logs.

## Related Links

[Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
