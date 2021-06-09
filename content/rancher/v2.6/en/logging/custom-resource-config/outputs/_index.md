---
title: Outputs and ClusterOutputs
weight: 2
---

For the full details on configuring `Outputs` and `ClusterOutputs`, see the [Banzai Cloud Logging operator documentation.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/output/)

- [Configuration](#configuration)
- [YAML Examples](#yaml-examples)
  - [Cluster Output to ElasticSearch](#cluster-output-to-elasticsearch)
  - [Output to Splunk](#output-to-splunk)
  - [Output to Syslog](#output-to-syslog)
  - [Unsupported Outputs](#unsupported-outputs)

# Configuration

- [Outputs](#outputs)
- [ClusterOutputs](#clusteroutputs)

# Outputs

The `Output` resource defines where your `Flows` can send the log messages. `Outputs` are the final stage for a logging `Flow`.

The `Output` is a namespaced resource, which means only a `Flow` within the same namespace can access it.

You can use secrets in these definitions, but they must also be in the same namespace. 

`Outputs` can be configured by filling out forms in the Rancher UI.

For the details of `Output` custom resource, see [OutputSpec.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/crds/v1beta1/output_types/)

The Rancher UI provides forms for configuring the following `Output` types:

- Amazon ElasticSearch
- Azure Storage
- Cloudwatch
- Datadog
- Elasticsearch
- File
- Fluentd
- GCS
- Kafka
- Kinesis Stream
- LogDNA
- LogZ
- Loki
- New Relic
- Splunk
- SumoLogic
- Syslog

The Rancher UI provides forms for configuring the `Output` type, target, and access credentials if applicable.

For example configuration for each logging plugin supported by the logging operator, see the [logging operator documentation.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/plugins/outputs/)

# ClusterOutputs

`ClusterOutput` defines an `Output` without namespace restrictions. It is only effective when deployed in the same namespace as the logging operator.

`ClusterOutputs` can be configured by filling out forms in the Rancher UI.

For the details of the `ClusterOutput` custom resource, see [ClusterOutput.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/crds/v1beta1/clusteroutput_types/)

# YAML Examples

Once logging is installed, you can use these examples to help craft your own logging pipeline.

- [Cluster Output to ElasticSearch](#cluster-output-to-elasticsearch)
- [Output to Splunk](#output-to-splunk)
- [Output to Syslog](#output-to-syslog)
- [Unsupported Outputs](#unsupported-outputs)

### Cluster Output to ElasticSearch

Let's say you wanted to send all logs in your cluster to an `elasticsearch` cluster. First, we create a cluster `Output`.

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
kind: ClusterOutput
metadata:
    name: "example-es"
    namespace: "cattle-logging-system"
spec:
    elasticsearch:
      host: elasticsearch.example.com
      port: 9200
      scheme: http
```

We have created this `ClusterOutput`, without elasticsearch configuration, in the same namespace as our operator: `cattle-logging-system.`. Any time we create a `ClusterFlow` or `ClusterOutput`, we have to put it in the `cattle-logging-system` namespace.

Now that we have configured where we want the logs to go, let's configure all logs to go to that `ClusterOutput`.

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
kind: ClusterFlow
metadata:
    name: "all-logs"
    namespace: "cattle-logging-system"
spec:
  globalOutputRefs:
    - "example-es"
```

We should now see our configured index with logs in it.


### Output to Splunk

What if we have an application team who only wants logs from a specific namespaces sent to a `splunk` server? For this case, we can use namespaced `Outputs` and `Flows`.

Before we start, let's set up that team's application: `coolapp`.

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: devteam
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: coolapp
  namespace: devteam
  labels:
    app: coolapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: coolapp
  template:
    metadata:
      labels:
        app: coolapp
    spec:
      containers:
        - name: generator
          image: paynejacob/loggenerator:latest
```

With `coolapp` running, we will follow a similar path as when we created a `ClusterOutput`. However, unlike `ClusterOutputs`, we create our `Output` in our application's namespace.

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
kind: Output
metadata:
    name: "devteam-splunk"
    namespace: "devteam"
spec:
    SplunkHec:
        host: splunk.example.com
        port: 8088
        protocol: http
```

Once again, let's feed our `Output` some logs:

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
kind: Flow
metadata:
    name: "devteam-logs"
    namespace: "devteam"
spec:
  localOutputRefs:
    - "devteam-splunk"
```


### Output to Syslog

Let's say you wanted to send all logs in your cluster to an `syslog` server. First, we create a `ClusterOutput`:

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
    kind: ClusterOutput
    metadata:
      name: "example-syslog"
      namespace: "cattle-logging-system"
    spec:
      syslog:
        buffer:
          timekey: 30s
          timekey_use_utc: true
          timekey_wait: 10s
          flush_interval: 5s
        format:
          type: json
          app_name_field: test
        host: syslog.example.com
        insecure: true
        port: 514
        transport: tcp
```

Now that we have configured where we want the logs to go, let's configure all logs to go to that `Output`.

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
    kind: ClusterFlow
    metadata:
      name: "all-logs"
      namespace: cattle-logging-system
    spec:
      globalOutputRefs:
        - "example-syslog"
```

### Unsupported Outputs

For the final example, we create an `Output` to write logs to a destination that is not supported out of the box:

> **Note on syslog** `syslog` is a supported `Output`. However, this example still provides an overview on using unsupported plugins.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: syslog-config
  namespace: cattle-logging-system
type: Opaque
stringData:
  fluent-bit.conf: |
    [INPUT]
        Name              forward
        Port              24224

    [OUTPUT]
        Name              syslog
        InstanceName      syslog-output
        Match             *
        Addr              syslog.example.com
        Port              514
        Cluster           ranchers

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fluentbit-syslog-forwarder
  namespace: cattle-logging-system
  labels:
    output: syslog
spec:
  selector:
    matchLabels:
      output: syslog
  template:
    metadata:
      labels:
        output: syslog
    spec:
      containers:
      - name: fluentbit
        image: paynejacob/fluent-bit-out-syslog:latest
        ports:
          - containerPort: 24224
        volumeMounts:
          - mountPath: "/fluent-bit/etc/"
            name: configuration
      volumes:
      - name: configuration
        secret:
          secretName: syslog-config
---
apiVersion: v1
kind: Service
metadata:
  name: syslog-forwarder
  namespace: cattle-logging-system
spec:
  selector:
    output: syslog
  ports:
    - protocol: TCP
      port: 24224
      targetPort: 24224
---
apiVersion: logging.banzaicloud.io/v1beta1
kind: ClusterFlow
metadata:
  name: all-logs
  namespace: cattle-logging-system
spec:
  globalOutputRefs:
    - syslog
---
apiVersion: logging.banzaicloud.io/v1beta1
kind: ClusterOutput
metadata:
  name: syslog
  namespace: cattle-logging-system
spec:
  forward:
    servers:
      - host: "syslog-forwarder.cattle-logging-system"
    require_ack_response: false
    ignore_network_errors_at_startup: false
```

Let's break down what is happening here. First, we create a deployment of a container that has the additional `syslog` plugin and accepts logs forwarded from another `fluentd`. Next we create an `Output` configured as a forwarder to our deployment. The deployment `fluentd` will then forward all logs to the configured `syslog` destination.
