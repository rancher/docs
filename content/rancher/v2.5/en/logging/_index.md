---
title: Rancher Integration with Logging Services
shortTitle: Logging
description: Rancher integrates with popular logging services. Learn the requirements and benefits of integrating with logging services, and enable logging on your cluster.
metaDescription: "Rancher integrates with popular logging services. Learn the requirements and benefits of integrating with logging services, and enable logging on your cluster."
weight: 9
---

- [Changes in Rancher v2.5](#changes-in-rancher-v2-5)
- [Configuring the Logging Output for the Rancher Kubernetes Cluster](#configuring-the-logging-output-for-the-rancher-kubernetes-cluster)
- [Enabling Logging for Rancher Managed Clusters with ECM](#enabling-logging-for-rancher-managed-clusters-with-ecm)
- [Configuring the Logging Application](#configuring-the-logging-application)


### Changes in Rancher v2.5

The following changes were introduced to logging in Rancher v2.5:

- Rancher's logging feature is now powered the [Banzai Cloud Logging operator](https://banzaicloud.com/docs/one-eye/logging-operator/) instead of Rancher's in-house logging solution.
- [Fluent Bit](https://fluentbit.io/) is now used to aggregate the logs. [Fluentd](https://www.fluentd.org/) is used for filtering the messages and routing them to the outputs. Previously, only Fluentd  was used.
- Logging can be configured with a Kubernetes manifest, because now the logging uses a Kubernetes operator with Custom Resource Definitions.
- We now support filtering logs.
- We now support writing logs to multiple outputs.

<figcaption>How the Banzai Cloud Logging Operator Works with Fluentd</figcaption>

![How the Banzai Cloud Logging Operator Works with Fluentd]({{<baseurl>}}/img/rancher/banzai-cloud-logging-operator.png)

### Configuring the Logging Output for the Rancher Kubernetes Cluster

If you install Rancher as a Helm chart, you'll configure the Helm chart options to select a logging output for all the logs in the local Kubernetes cluster.

If you install Rancher using the Rancher CLI on an Linux OS,  the Rancher Helm chart will be installed on a Kubernetes cluster with default options. Then when the Rancher UI is available, you'll enable the logging app from the Apps section of the UI. Then during the process of installing the logging application, you will configure the logging output.

### Enabling Logging for Rancher Managed Clusters with ECM

If you have Enterprise Cluster Manager enabled, you can enable the logging for a Rancher managed cluster by going to the Apps page and installing the logging app.

### Configuring the Logging Application

The following Custom Resource Definitions are used to configure logging:

- [Flow and ClusterFlow](https://banzaicloud.com/docs/one-eye/logging-operator/crds/#flows-clusterflows)
- [Output and ClusterOutput](https://banzaicloud.com/docs/one-eye/logging-operator/crds/#outputs-clusteroutputs)

According to the [Banzai Cloud documentation,](https://banzaicloud.com/docs/one-eye/logging-operator/#architecture)

> You can define `outputs` (destinations where you want to send your log messages, for example, Elasticsearch, or and Amazon S3 bucket), and `flows` that use filters and selectors to route log messages to the appropriate outputs. You can also define cluster-wide outputs and flows, for example, to use a centralized output that namespaced users cannot modify.