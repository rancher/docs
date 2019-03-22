---
title: Logging
weight: 3
aliases:
  - /rancher/v2.x/en/tasks/logging/
  - /rancher/v2.x/en/tools/logging/
---

Rancher can integrate with a variety of popular logging services and tools that exist outside of your Kubernetes clusters.

Rancher supports the following services:

- [Elasticsearch]({{< baseurl >}}/rancher/v2.x/en/tools/logging/elasticsearch)
- [Splunk]({{< baseurl >}}/rancher/v2.x/en/tools/logging/splunk)
- [Kafka]({{< baseurl >}}/rancher/v2.x/en/tools/logging/kafka)
- [Syslog]({{< baseurl >}}/rancher/v2.x/en/tools/logging/syslog)
- [Fluentd]({{< baseurl >}}/rancher/v2.x/en/tools/logging/fluentd)

## Requirements

Docker daemon should be [configured](https://docs.docker.com/config/containers/logging/configure/) with the (default) log-driver: `json-file`. You can check the log-driver by running the following command:

```
$ docker info | grep 'Logging Driver'
Logging Driver: json-file
```

## Advantages

Setting up a logging service to collect logs from your cluster/project is helpful several ways:

- Logs errors and warnings in your Kubernetes infrastructure to a stream. The stream informs you of events like a container crashing, a pod eviction, or a node dying.
- Allows you to capture and analyze the state of your cluster and look for trends in your environment using the log stream.
- Helps you when troubleshooting or debugging.
- Saves your logs to a safe location outside of your cluster, so that you can still access them even if your cluster encounters issues.

## Logging Scope

You can configure logging at either cluster or project level.

>**Note:** You can only configure one logging service per cluster or project.

- If you're a [cluster owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) who works in operations or security, configure cluster logging.

    Cluster logging writes logs for every pod in the cluster and, in [RKE clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters), Kubernetes system components. Logs from the following locations are sent to your logging service:


  - The `/var/log/containers` path for pod logging.

  - The `/var/lib/rancher/rke/logs/` path for Kubernetes system components.

- If you're a [project owner or member]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) who works on an application, configure project logging.

    Project logging writes logs for every pod in the project.

After collection, all logs are stored by your logging service. Log into your service to view them.

## Related Links

[Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
