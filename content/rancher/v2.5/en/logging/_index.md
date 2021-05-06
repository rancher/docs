---
title: Rancher Integration with Logging Services
shortTitle: Logging
description: Rancher integrates with popular logging services. Learn the requirements and benefits of integrating with logging services, and enable logging on your cluster.
metaDescription: "Rancher integrates with popular logging services. Learn the requirements and benefits of integrating with logging services, and enable logging on your cluster."
weight: 15
aliases:
  - /rancher/v2.5/en/dashboard/logging
  - /rancher/v2.5/en/logging/v2.5
  - /rancher/v2.5/en/cluster-admin/tools/logging 
---

- [Changes in Rancher v2.5](#changes-in-rancher-v2-5)
- [Enabling Logging for Rancher Managed Clusters](#enabling-logging-for-rancher-managed-clusters)
- [Uninstall Logging](#uninstall-logging)
- [Windows Support](#windows-support)
- [Role-based Access Control](#role-based-access-control)
- [Configuring the Logging Application](#configuring-the-logging-application)
- [Examples](#examples)
- [Working with a Custom Docker Root Directory](#working-with-a-custom-docker-root-directory)
- [Working with Taints and Tolerations](#working-with-taints-and-tolerations)
- [Logging v2 with SELinux](#logging-v2-with-selinux)
- [Additional Logging Sources](#additional-logging-sources)
- [Troubleshooting](#troubleshooting)

# Changes in Rancher v2.5

The following changes were introduced to logging in Rancher v2.5:

- The [Banzai Cloud Logging operator](https://banzaicloud.com/docs/one-eye/logging-operator/) now powers Rancher's logging solution in place of the former, in-house solution.
- [Fluent Bit](https://fluentbit.io/) is now used to aggregate the logs, and [Fluentd](https://www.fluentd.org/) is used for filtering the messages and routing them to the outputs. Previously, only Fluentd was used.
- Logging can be configured with a Kubernetes manifest, because logging now uses a Kubernetes operator with Custom Resource Definitions.
- We now support filtering logs.
- We now support writing logs to multiple outputs.
- We now always collect Control Plane and etcd logs.

The following figure from the [Banzai documentation](https://banzaicloud.com/docs/one-eye/logging-operator/#architecture) shows the new logging architecture:

<figcaption>How the Banzai Cloud Logging Operator Works with Fluentd and Fluent Bit</figcaption>

![How the Banzai Cloud Logging Operator Works with Fluentd]({{<baseurl>}}/img/rancher/banzai-cloud-logging-operator.png)

# Enabling Logging for Rancher Managed Clusters

You can enable the logging for a Rancher managed cluster by going to the Apps page and installing the logging app.

1. In the Rancher UI, go to the cluster where you want to install logging and click **Cluster Explorer**.
1. Click **Apps**.
1. Click the `rancher-logging` app.
1. Scroll to the bottom of the Helm chart README and click **Install**.

**Result:** The logging app is deployed in the `cattle-logging-system` namespace.

# Uninstall Logging

1. From the **Cluster Explorer**, click **Apps & Marketplace**.
1. Click **Installed Apps**.
1. Go to the `cattle-logging-system` namespace and check the boxes for `rancher-logging` and `rancher-logging-crd`.
1. Click **Delete**.
1. Confirm **Delete**.

**Result** `rancher-logging` is uninstalled.

# Windows Support

{{% tabs %}}
{{% tab "Rancher v2.5.8" %}}
As of Rancher v2.5.8, logging support for Windows clusters has been added and logs can be collected from Windows nodes.

### Enabling and Disabling Windows Node Logging

You can enable or disable Windows node logging by setting `global.cattle.windows.enabled` to either `true` or `false` in the `values.yaml`.
By default, Windows node logging will be enabled if the Cluster Explorer UI is used to install the logging application on a Windows cluster.
In this scenario, setting `global.cattle.windows.enabled` to `false` will disable Windows node logging on the cluster.
When disabled, logs will still be collected from Linux nodes within the Windows cluster.

> Note: Currently an [issue](https://github.com/rancher/rancher/issues/32325) exists where Windows nodeAgents are not deleted when performing a `helm upgrade` after disabling Windows logging in a Windows cluster. In this scenario, users may need to manually remove the Windows nodeAgents if they are already installed.

{{% /tab %}}
{{% tab "Rancher v2.5.0-2.5.7" %}}
Clusters with Windows workers support exporting logs from Linux nodes, but Windows node logs are currently unable to be exported.
Only Linux node logs are able to be exported.

To allow the logging pods to be scheduled on Linux nodes, tolerations must be added to the pods. Refer to the [Working with Taints and Tolerations](#working-with-taints-and-tolerations) section for details and an example.
{{% /tab %}}
{{% /tabs %}}

# Role-based Access Control

Rancher logging has two roles, `logging-admin` and `logging-view`.

- `logging-admin` gives users full access to namespaced flows and outputs
- `logging-view` allows users to *view* namespaced flows and outputs, and cluster flows and outputs

> **Why choose one role over the other?** Edit access to cluster flow and cluster output resources is powerful. Any user with it has edit access for all logs in the cluster.

In Rancher, the cluster administrator role is the only role with full access to all `rancher-logging` resources. Cluster members are not able to edit or read any logging resources. Project owners and members have the following privileges:

Project Owners | Project Members
--- | ---
able to create namespaced flows and outputs in their projects' namespaces | only able to view the flows and outputs in projects' namespaces
can collect logs from anything in their projects' namespaces | cannot collect any logs in their projects' namespaces

Both project owners and project members require at least *one* namespace in their project to use logging. If they do not, then they may not see the logging button in the top nav dropdown.

# Configuring the Logging Application

To configure the logging application, go to the **Cluster Explorer** in the Rancher UI. In the upper left corner, click **Cluster Explorer > Logging**.

### Overview of Logging Custom Resources

The following Custom Resource Definitions are used to configure logging:

- [Flow and ClusterFlow](https://banzaicloud.com/docs/one-eye/logging-operator/crds/#flows-clusterflows)
- [Output and ClusterOutput](https://banzaicloud.com/docs/one-eye/logging-operator/crds/#outputs-clusteroutputs)

According to the [Banzai Cloud documentation,](https://banzaicloud.com/docs/one-eye/logging-operator/#architecture)

> You can define `outputs` (destinations where you want to send your log messages, for example, Elasticsearch, or and Amazon S3 bucket), and `flows` that use filters and selectors to route log messages to the appropriate outputs. You can also define cluster-wide outputs and flows, for example, to use a centralized output that namespaced users cannot modify.

# Examples

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

### Unsupported Output

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

# Working with a Custom Docker Root Directory

_Applies to v2.5.6+_

If using a custom Docker root directory, you can set `global.dockerRootDirectory` in `values.yaml`.
This will ensure that the Logging CRs created will use your specified path rather than the default Docker `data-root` location.
Note that this only affects Linux nodes.
If there are any Windows nodes in the cluster, the change will not be applicable to those nodes.

# Working with Taints and Tolerations

"Tainting" a Kubernetes node causes pods to repel running on that node.
Unless the pods have a `toleration` for that node's taint, they will run on other nodes in the cluster.
[Taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) can work in conjunction with the `nodeSelector` [field](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) within the `PodSpec`, which enables the *opposite* effect of a taint.
Using `nodeSelector` gives pods an affinity towards certain nodes.
Both provide choice for the what node(s) the pod will run on.


### Default Implementation in Rancher's Logging Stack

{{% tabs %}}
{{% tab "Rancher v2.5.8" %}}
By default, Rancher taints all Linux nodes with `cattle.io/os=linux`, and does not taint Windows nodes.
The logging stack pods have `tolerations` for this taint, which enables them to run on Linux nodes.
Moreover, most logging stack pods run on Linux only and have a `nodeSelector` added to ensure they run on Linux nodes.

{{% /tab %}}
{{% tab "Rancher v2.5.0-2.5.7" %}}
By default, Rancher taints all Linux nodes with `cattle.io/os=linux`, and does not taint Windows nodes.
The logging stack pods have `tolerations` for this taint, which enables them to run on Linux nodes.
Moreover, we can populate the `nodeSelector` to ensure that our pods *only* run on Linux nodes.

{{% /tab %}}
{{% /tabs %}}
Let's look at an example pod YAML file with these settings...

```yaml
apiVersion: v1
kind: Pod
# metadata...
spec:
  # containers...
  tolerations:
    - key: cattle.io/os
      operator: "Equal"
      value: "linux"
      effect: NoSchedule
  nodeSelector:
    kubernetes.io/os: linux
```

In the above example, we ensure that our pod only runs on Linux nodes, and we add a `toleration` for the taint we have on all of our Linux nodes.
You can do the same with Rancher's existing taints, or with your own custom ones.

### Adding NodeSelector Settings and Tolerations for Custom Taints

If you would like to add your own `nodeSelector` settings, or if you would like to add `tolerations` for additional taints, you can pass the following to the chart's values.

```yaml
tolerations:
  # insert tolerations...
nodeSelector:
  # insert nodeSelector...
```

These values will add both settings to the `fluentd`, `fluentbit`, and `logging-operator` containers.
Essentially, these are global settings for all pods in the logging stack.

However, if you would like to add tolerations for *only* the `fluentbit` container, you can add the following to the chart's values.

```yaml
fluentbit_tolerations:
  # insert tolerations list for fluentbit containers only...
```


# Logging v2 with SELinux

_Available as of v2.5.8_

> **Requirements:** Logging v2 was tested with SELinux on RHEL/CentOS 7 and 8.

[Security-Enhanced Linux (SELinux)](https://en.wikipedia.org/wiki/Security-Enhanced_Linux) is a security enhancement to Linux. After being historically used by government agencies, SELinux is now industry standard and is enabled by default on CentOS 7 and 8.

To use Logging v2 with SELinux, we recommend installing the `rancher-selinux` RPM according to the instructions on [this page.]({{<baseurl>}}/rancher/v2.5/en/security/selinux/#installing-the-rancher-selinux-rpm)

Then you will need to configure the logging application to work with SELinux as shown in [this section.]({{<baseurl>}}/rancher/v2.5/en/security/selinux/#configuring-the-logging-application-to-work-with-selinux)

# Additional Logging Sources

By default, Rancher collects logs for [control plane components](https://kubernetes.io/docs/concepts/overview/components/#control-plane-components) and [node components](https://kubernetes.io/docs/concepts/overview/components/#node-components) for all cluster types.
In some cases, Rancher may be able to collect additional logs.

The following table summarizes the sources where additional logs may be collected for each node types:

| Logging Source | Linux Nodes (including in Windows cluster) | Windows Nodes |
| --- | --- | ---|
| RKE | ✓ | ✓ |
| RKE2 | ✓ | |
| K3s | ✓ | |
| AKS | ✓ | |
| EKS | ✓ | |
| GKE | ✓ | |

To enable hosted Kubernetes providers as additional logging sources, go to **Cluster Explorer > Logging > Chart Options** and select the **Enable enhanced cloud provider logging** option.
When enabled, Rancher collects all additional node and control plane logs the provider has made available, which may vary between providers.
If you're already using a cloud provider's own logging solution such as AWS CloudWatch or Google Cloud operations suite (formerly Stackdriver), it is not necessary to enable this option as the native solution will have unrestricted access to all logs.


# Troubleshooting

### The `cattle-logging` Namespace Being Recreated

If your cluster previously deployed logging from the Cluster Manager UI, you may encounter an issue where its `cattle-logging` namespace is continually being recreated.

The solution is to delete all `clusterloggings.management.cattle.io` and `projectloggings.management.cattle.io` custom resources from the cluster specific namespace in the management cluster.
The existence of these custom resources causes Rancher to create the `cattle-logging` namespace in the downstream cluster if it does not exist.

The cluster namespace matches the cluster ID, so we need to find the cluster ID for each cluster.

1. In your web browser, navigate to your cluster(s) in either the Cluster Manager UI or the Cluster Explorer UI.
2. Copy the `<cluster-id>` portion from one of the URLs below. The `<cluster-id>` portion is the cluster namespace name.

```bash
# Cluster Management UI
https://<your-url>/c/<cluster-id>/

# Cluster Explorer UI (Dashboard)
https://<your-url>/dashboard/c/<cluster-id>/
```

Now that we have the `<cluster-id>` namespace, we can delete the CRs that cause `cattle-logging` to be continually recreated.
*Warning:* ensure that logging, the version installed from the Cluster Manager UI, is not currently in use.

```bash
kubectl delete clusterloggings.management.cattle.io -n <cluster-id>
kubectl delete projectloggings.management.cattle.io -n <cluster-id>
```
