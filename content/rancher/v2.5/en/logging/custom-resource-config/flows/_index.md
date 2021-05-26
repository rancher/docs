---
title: Flows and ClusterFlows
weight: 1
---

For the full details on configuring `Flows` and `ClusterFlows`, see the [Banzai Cloud Logging operator documentation.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/output/)

- [Configuration](#configuration)
- [YAML Example](#yaml-example)

# Configuration

{{% tabs %}}
{{% tab "Rancher v2.5.8+" %}}

- [Flows](#flows-2-5-8)
  - [Matches](#matches-2-5-8)
  - [Filters](#filters-2-5-8)
  - [Outputs](#outputs-2-5-8)
- [ClusterFlows](#clusterflows-2-5-8)

# Changes in v2.5.8

The `Flows` and `ClusterFlows` can now be configured by filling out forms in the Rancher UI.


<a id="flows-2-5-8"></a>

# Flows

A `Flow` defines which logs to collect and filter and which output to send the logs to.

The `Flow` is a namespaced resource, which means logs will only be collected from the namespace that the `Flow` is deployed in.

For more details about the `Flow` custom resource, see [FlowSpec.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/crds/v1beta1/flow_types/)


<a id="matches-2-5-8"></a>

### Matches

Match statements are used to select which containers to pull logs from.

You can specify match statements to select or exclude logs according to Kubernetes labels, container and host names. Match statements are evaluated in the order they are defined and processed only until the first matching select or exclude rule applies.

Matches can be configured by filling out the `Flow` or `ClusterFlow` forms in the Rancher UI.

For detailed examples on using the match statement, see the [official documentation on log routing.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/log-routing/)

<a id="filters-2-5-8"></a>

### Filters

You can define one or more filters within a `Flow`. Filters can perform various actions on the logs, for example, add additional data, transform the logs, or parse values from the records. The filters in the `Flow` are applied in the order in the definition.

For a list of filters supported by the Banzai Cloud Logging operator, see [this page.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/plugins/filters/)

Filters need to be configured in YAML.

<a id="outputs-2-5-8"></a>

### Outputs

This `Output` will receive logs from the `Flow`. Because the `Flow` is a namespaced resource, the `Output` must reside in same namespace as the `Flow`.

`Outputs` can be referenced when filling out the `Flow` or `ClusterFlow` forms in the Rancher UI.

<a id="clusterflows-2-5-8"></a>

# ClusterFlows

Matches, filters and `Outputs` are configured for `ClusterFlows` in the same way that they are configured for `Flows`. The key difference is that the `ClusterFlow` is scoped at the cluster level and can configure log collection across all namespaces.

After `ClusterFlow` selects logs from all namespaces in the cluster, logs from the cluster will be collected and logged to the selected `ClusterOutput`.

{{% /tab %}}
{{% tab "Rancher v2.5.0-v2.5.7" %}}

- [Flows](#flows-2-5-0)
  - [Matches](#matches-2-5-0)
  - [Filters](#filters-2-5-0)
  - [Outputs](#outputs-2-5-0)
- [ClusterFlows](#clusterflows-2-5-0)


<a id="flows-2-5-0"></a>

# Flows

A `Flow` defines which logs to collect and filter and which `Output` to send the logs to. The `Flow` is a namespaced resource, which means logs will only be collected from the namespace that the `Flow` is deployed in.

`Flows` need to be defined in YAML.

For more details about the `Flow` custom resource, see [FlowSpec.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/crds/v1beta1/flow_types/)


<a id="matches-2-5-0"></a>

### Matches

Match statements are used to select which containers to pull logs from.

You can specify match statements to select or exclude logs according to Kubernetes labels, container and host names. Match statements are evaluated in the order they are defined and processed only until the first matching select or exclude rule applies.

For detailed examples on using the match statement, see the [official documentation on log routing.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/log-routing/)

<a id="filters-2-5-0"></a>

### Filters

You can define one or more filters within a `Flow`. Filters can perform various actions on the logs, for example, add additional data, transform the logs, or parse values from the records. The filters in the `Flow` are applied in the order in the definition.

For a list of filters supported by the Banzai Cloud Logging operator, see [this page.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/plugins/filters/)

<a id="outputs-2-5-0"></a>

### Outputs

This `Output` will receive logs from the `Flow`.

Because the `Flow` is a namespaced resource, the `Output` must reside in same namespace as the `Flow`.

<a id="clusterflows-2-5-0"></a>

# ClusterFlows

Matches, filters and `Outputs` are also configured for `ClusterFlows`. The only difference is that the `ClusterFlow` is scoped at the cluster level and can configure log collection across all namespaces.

`ClusterFlow` selects logs from all namespaces in the cluster. Logs from the cluster will be collected and logged to the selected `ClusterOutput`.

`ClusterFlows` need to be defined in YAML.

{{% /tab %}}
{{% /tabs %}}


# YAML Example

The following example `Flow` transforms the log messages from the default namespace and sends them to an S3 `Output`:

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
kind: Flow
metadata:
  name: flow-sample
  namespace: default
spec:
  filters:
    - parser:
        remove_key_name_field: true
        parse:
          type: nginx
    - tag_normaliser:
        format: ${namespace_name}.${pod_name}.${container_name}
  localOutputRefs:
    - s3-output
  match:
    - select:
        labels:
          app: nginx
```
