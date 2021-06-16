---
title: Architecture
weight: 1
---

This section summarizes the architecture of the Rancher logging application.

For more details about how the Banzai Cloud Logging operator works, see the [official documentation.](https://banzaicloud.com/docs/one-eye/logging-operator/#architecture)

### How the Banzai Cloud Logging Operator Works

The Logging operator automates the deployment and configuration of a Kubernetes logging pipeline. It deploys and configures a Fluent Bit DaemonSet on every node to collect container and application logs from the node file system. 

Fluent Bit queries the Kubernetes API and enriches the logs with metadata about the pods, and transfers both the logs and the metadata to Fluentd. Fluentd receives, filters, and transfers logs to multiple `Outputs`.

The following custom resources are used to define how logs are filtered and sent to their `Outputs`: 

- A `Flow` is a namespaced custom resource that uses filters and selectors to route log messages to the appropriate `Outputs`. 
- A `ClusterFlow` is used to route cluster-level log messages.
- An `Output` is a namespaced resource that defines where the log messages are sent. 
- A `ClusterOutput` defines an `Output` that is available from all `Flows` and `ClusterFlows`.

Each `Flow` must reference an `Output`, and each `ClusterFlow` must reference a `ClusterOutput`.

The following figure from the [Banzai documentation](https://banzaicloud.com/docs/one-eye/logging-operator/#architecture) shows the new logging architecture:

<figcaption>How the Banzai Cloud Logging Operator Works with Fluentd and Fluent Bit</figcaption>

![How the Banzai Cloud Logging Operator Works with Fluentd]({{<baseurl>}}/img/rancher/banzai-cloud-logging-operator.png)
