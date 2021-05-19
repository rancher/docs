---
title: Outputs and ClusterOutputs
weight: 2
---

For the full details on configuring Outputs and ClusterOutputs, see the [Banzai Cloud Logging operator documentation.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/output/)

- [Outputs](#outputs)
- [ClusterOutputs](#clusteroutputs)
- [YAML Examples](#yaml-examples)
  - [Cluster Output to ElasticSearch](#cluster-output-to-elasticsearch)
  - [Output to Splunk](#output-to-splunk)
  - [Output to Syslog](#output-to-syslog)
  - [Unsupported Outputs](#unsupported-outputs)

# Outputs

The Output resource defines an output where your Flows can send the log messages. Outputs are the final stage for a logging flow.

The output is a namespaced resource, which means only a Flow within the same namespace can access it. 

You can use secrets in these definitions, but they must also be in the same namespace. 

For the details of the supported output plugins, see [Outputs.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/plugins/outputs/)

For the details of Output custom resource, see [OutputSpec.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/crds/v1beta1/output_types/)

# ClusterOutputs

ClusterOutput defines an Output without namespace restrictions.

It is only evaluated in the controlNamespace by default unless allowClusterResourcesFromAllNamespaces is set to true.

For the details of ClusterOutput custom resource, see [ClusterOutput.](https://banzaicloud.com/docs/one-eye/logging-operator/configuration/crds/v1beta1/clusteroutput_types/)

# YAML Examples

Once logging is installed, you can use these examples to help craft your own logging pipeline.

### Cluster Output to ElasticSearch

Let's say you wanted to send all logs in your cluster to an `elasticsearch` cluster. First, we create a cluster output.

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

We have created this cluster output, without elasticsearch configuration, in the same namespace as our operator: `cattle-logging-system.`. Any time we create a cluster flow or cluster output, we have to put it in the `cattle-logging-system` namespace.

Now that we have configured where we want the logs to go, let's configure all logs to go to that output.

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

What if we have an application team who only wants logs from a specific namespaces sent to a `splunk` server? For this case, we can use namespaced outputs and flows.

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

With `coolapp` running, we will follow a similar path as when we created a cluster output. However, unlike cluster outputs, we create our output in our application's namespace.

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

Once again, let's feed our output some logs.

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

Let's say you wanted to send all logs in your cluster to an `syslog` server. First, we create a cluster output.

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

Now that we have configured where we want the logs to go, let's configure all logs to go to that output.

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

For the final example, we create an output to write logs to a destination that is not supported out of the box:

> **Note on syslog** As of Rancher v2.5.4, `syslog` is a supported output. However, this example still provides an overview on using unsupported plugins.

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

Let's break down what is happening here. First, we create a deployment of a container that has the additional `syslog` plugin and accepts logs forwarded from another `fluentd`. Next we create an output configured as a forwarder to our deployment. The deployment `fluentd` will then forward all logs to the configured `syslog` destination.