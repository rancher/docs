---
title: Migrating to Rancher v2.5 Logging
weight: 5
aliases:
  - /rancher/v2.5/en/logging/v2.5/migrating
---
Starting in v2.5, the logging feature available within Rancher has been completely overhauled. The [logging operator](https://github.com/banzaicloud/logging-operator) from Banzai Cloud has been adopted; Rancher configures this tooling for use when deploying logging.

Among the many features and changes in the new logging functionality is the removal of project-specific logging configurations. Instead, one now configures logging at the namespace level. Cluster-level logging remains available, but configuration options differ. 

> Note: The pre-v2.5 user interface is now referred to as the _Cluster Manager_. The v2.5+ dashboard is referred to as the _Cluster Explorer_. 

## Installation

To install logging in Rancher v2.5+, refer to [installation instructions]({{<baseurl>}}/rancher/v2.5/en/logging/v2.5/#enabling-logging-for-rancher-managed-clusters).

## Terminology & Familiarity

In v2.5, logging configuration is centralized under a _Logging_ menu option available in the _Cluster Explorer_. It is from this menu option that logging for both cluster and namespace is configured. 

> Note: Logging is installed on a per-cluster basis. You will need to navigate between clusters to configure logging for each cluster. 

There are four key concepts to understand for v2.5+ logging:

1. Outputs
   
    _Outputs_ are a configuration resource that determine a destination for collected logs. This is where settings for aggregators such as ElasticSearch, Kafka, etc. are stored. _Outputs_ are namespaced resources.

2. Flows

    _Flows_ are a configuration resource that determine collection, filtering, and destination rules for logs. It is within a flow that one will configure what logs to collect, how to mutate or filter them, and which outputs to send the logs to. _Flows_ are namespaced resources, and can connect either to an _Output_ in the same namespace, or a _ClusterOutput_. 

3. ClusterOutputs

    _ClusterOutputs_ serve the same functionality as _Outputs_, except they are a cluster-scoped resource. _ClusterOutputs_ are necessary when collecting logs cluster-wide, or if you wish to provide an output to all namespaces in your cluster. 

4. ClusterFlows

    _ClusterFlows_ serve the same function as _Flows_, but at the cluster level. They are used to configure log collection for an entire cluster, instead of on a per-namespace level. _ClusterFlows_ are also where mutations and filters are defined, same as _Flows_ (in functionality).

# Cluster Logging

To configure cluster-wide logging for v2.5+ logging, one needs to setup a _ClusterFlow_. This object defines the source of logs, any transformations or filters to be applied, and finally the output(s) for the logs. 

> Important: _ClusterFlows_ must be defined within the `cattle-logging-system` namespace. _ClusterFlows_ will not work if defined in any other namespace. 

In legacy logging, in order to collect logs from across the entire cluster, one only needed to enable cluster-level logging and define the desired output. This basic approach remains in v2.5+ logging. To replicate legacy cluster-level logging, follow these steps:

1. Define a _ClusterOutput_ according to the instructions found under [Output Configuration](#output-configuration)
2. Create a _ClusterFlow_, ensuring that it is set to be created in the `cattle-logging-system` namespace
   1. Remove all _Include_ and _Exclude_ rules from the flow definition. This ensures that all logs are gathered.
   2. You do not need to configure any filters if you do not wish - default behavior does not require their creation
   3. Define your cluster output(s)

This will result in logs from all sources in the cluster (all pods, and all system components) being collected and sent to the output(s) you defined in the _ClusterFlow_. 

# Project Logging

Logging in v2.5+ is not project-aware. This means that in order to collect logs from pods running in project namespaces, you will need to define _Flows_ for those namespaces. 

To collect logs from a specific namespace, follow these steps:

1. Define an _Output_ or _ClusterOutput_ according to the instructions found under [Output Configuration](#output-configuration)
2. Create a _Flow_, ensuring that it is set to be created in the namespace in which you want to gather logs.
   1. If you wish to define _Include_ or _Exclude_ rules, you may do so. Otherwise, removal of all rules will result in all pods in the target namespace having their logs collected. 
   2. You do not need to configure any filters if you do not wish - default behavior does not require their creation
   3. Define your output(s) - these can be either _ClusterOutput_ or _Output_ objects.

This will result in logs from all sources in the namespace (pods) being collected and sent to the output(s) you defined in your _Flow_.

> To collect logs from a project, repeat the above steps for every namespace within the project. Alternatively, you can label your project workloads with a common label (e.g. `project=my-project`) and use a _ClusterFlow_ to collect logs from all pods matching this label. 

# Output Configuration
In legacy logging, there are five logging destinations to choose from: Elasticsearch, Splunk, Kafka, Fluentd, and Syslog. With the exception of Syslog, all of these destinations are available in logging v2.5+. 


## Elasticsearch

| Legacy Logging                                | v2.5+ Logging                     | Notes                                                     |
|-----------------------------------------------|-----------------------------------|-----------------------------------------------------------|
| Endpoint                                      | Target -> Host                    | Make sure to specify Scheme (https/http), as well as Port |
| X-Pack Security -> Username                   | Access -> User                    |                                                           |
| X-Pack Security -> Password                   | Access -> Password                | Password must now be stored in a secret                   |
| SSL Configuration -> Client Private Key       | SSL -> Client Key                 | Key must now be stored in a secret                        |
| SSL Configuration -> Client Certificate       | SSL -> Client Cert                | Certificate must now be stored in a secret                |
| SSL Configuration -> Client Key Password      | SSL -> Client Key Pass            | Password must now be stored in a secret                   |
| SSL Configuration -> Enabled SSL Verification | SSL -> Certificate Authority File | Certificate must now be stored in a secret                |


In legacy logging, indices were automatically created according to the format in the "Index Patterns" section. In v2.5 logging, default behavior has been changed to logging to a single index. You can still configure index pattern functionality on the output object by editing as YAML and inputting the following values:

```
...
spec:
  elasticsearch:
    ...
    logstash_format: true
    logstash_prefix: <desired prefix>
    logstash_dateformat: "%Y-%m-%d"
```

Replace `<desired prefix>` with the prefix for the indices that will be created. In legacy logging, this defaulted to the name of the cluster.

## Splunk

| Legacy Logging                           | v2.5+ Logging                          | Notes                                                                                  |
|------------------------------------------|----------------------------------------|----------------------------------------------------------------------------------------|
| HEC Configuration -> Endpoint            | Target -> Host                         | Protocol (https/http) and port must be defined separately from the host                |
| HEC Configuration -> Token               | Access -> Token                        | Token must now be stored as a secret                                                   |
| HEC Configuration -> Index               | Edit as YAML -> `index`                | `index` field must be added as YAML key under `spec.splunkHec`                         |
| HEC Configuration -> Source              | Edit as YAML -> `source`               | `source` field must be added as YAML key under `spec.splunkHec`                        |
| SSL Configuration -> Client Private Key  | Edit as YAML -> `client_key`           | `client_key` field must be added as YAML key under `spec.splunkHec`. See (1)           |
| SSL Configuration -> Client Certificate  | Edit as YAML -> `client_cert`          | `client_cert` field must be added as YAML key under `spec.splunkHec`. See (1)          |
| SSL Configuration -> Client Key Password | _Not Supported_                        | Specifying a password for the client private key is not currently supported.           |
| SSL Configuration -> SSL Verify          | Edit as YAML -> `ca_file` or `ca_path` | `ca_file` or `ca_path` field must be added as YAML key under `spec.splunkHec`. See (2) |

_(1) `client_key` and `client_cert` values must be paths to the key and cert files, respectively. These files must be mounted into the `rancher-logging-fluentd` pod in order to be used._

_(2) Users can configure either `ca_file` (a path to a PEM-encoded CA certificate) or `ca_path` (a path to a directory containing CA certificates in PEM format). These files must be mounted into the `rancher-logging-fluentd` pod in order to be used._

## Kafka

| Legacy Logging                          | v2.5+ Logging              | Notes                                                |
|-----------------------------------------|----------------------------|------------------------------------------------------|
| Kafka Configuration -> Endpoint Type    | -                          | Zookeeper is no longer supported as an endpoint type |
| Kafka Configuration -> Endpoint         | Target -> Brokers          | Comma-separated list of brokers (host:port)          |
| Kafka Configuration -> Topic            | Target -> Default Topic    |                                                      |
| SSL Configuration -> Client Private Key | SSL -> SSL Client Cert     | Certificate must be stored as a secret               |
| SSL Configuration -> Client Certificate | SSL -> SSL Client Cert Key | Key must be stored as a secret                       |
| SSL Configuration -> CA Certificate PEM | SSL -> SSL CA Cert         | Certificate must be stored as a secret               |
| SASL Configuration -> Username          | Access -> Username         | Username must be stored in a secret                  |
| SASL Configuration -> Password          | Access -> Password         | Password must be stored in a secret                  |
| SASL Configuration -> Scram Mechanism   | Access -> Scram Mechanism  | Input mechanism as string, e.g. "sha256" or "sha512" |

## Fluentd

As of v2.5.2, it is only possible to add a single Fluentd server using the "Edit as Form" option. To add multiple servers, edit the output as YAML and input multiple servers.

| Legacy Logging                           | v2.5+ Logging                                       | Notes                                                                |
|------------------------------------------|-----------------------------------------------------|----------------------------------------------------------------------|
| Fluentd Configuration -> Endpoint        | Target -> Host, Port                                | Input the host and port separately                                   |
| Fluentd Configuration -> Shared Key      | Access -> Shared Key                                | Shared key must be stored as a secret                                |
| Fluentd Configuration -> Username        | Access -> Username                                  | Username must be stored as a secret                                  |
| Fluentd Configuration -> Password        | Access -> Password                                  | Password must be stored as a secret                                  |
| Fluentd Configuration -> Hostname        | Edit as YAML -> `host`                              | `host` field set as YAML key under `spec.forward.servers[n]`         |
| Fluentd Configuration -> Weight          | Edit as YAML -> `weight`                            | `weight` field set as YAML key under `spec.forward.servers[n]`       |
| SSL Configuration -> Use TLS             | -                                                   | Do not need to explicitly enable. Define client cert fields instead. |
| SSL Configuration -> Client Private Key  | Edit as YAML -> `tls_private_key_path`              | Field set as YAML key under `spec.forward`. See (1)                  |
| SSL Configuration -> Client Certificate  | Edit as YAML -> `tls_client_cert_path`              | Field set as YAML key under `spec.forward`. See (1)                  |
| SSL Configuration -> Client Key Password | Edit as YAML -> `tls_client_private_key_passphrase` | Field set as YAML key under `spec.forward`. See (1)                  |
| SSL Configuration -> SSL Verify          | Edit as YAML -> `tls_insecure_mode`                 | Field set as YAML key under `spec.forward`. Default: `false`         |
| SSL Configuration -> CA Certificate PEM  | Edit as YAML -> `tls_cert_path`                     | Field set as YAML key under `spec.forward`. See (1)                  |
| Enable Gzip Compression                  | -                                                   | No longer supported in v2.5+ logging                                 |

_(1) These values are to be specified as paths to files. Those files must be mounted into the `rancher-logging-fluentd` pod in order to be used._

## Syslog

As of v2.5.2, syslog is not currently supported as an output using v2.5+ logging. 

## Custom Log Fields

In order to add custom log fields, you will need to add the following YAML to your flow configuration:

```
...
spec:
  filters:
    - record_modifier:
        records:
        - foo: "bar"
```

(replace `foo: "bar"` with custom log fields you wish to add)

# System Logging

In legacy logging, collecting logs from system components was accomplished by checking a box labeled "Include System Log" when setting up cluster logging. In v2.5+ logging, system logs are gathered in one of two ways:

1. Gather all cluster logs, not specifying any match or exclusion rules. This results in all container logs from the cluster being collected, which includes system logs. 
2. Specifically target system logs by adding match rules for system components. Specific match rules depend on the component being collected. 