---
title: Logging in Rancher v2.5
shortTitle: Rancher v2.5
weight: 1
---

- [Changes in Rancher v2.5](#changes-in-rancher-v2-5)
- [Configuring the Logging Output for the Rancher Kubernetes Cluster](#configuring-the-logging-output-for-the-rancher-kubernetes-cluster)
- [Enabling Logging for Rancher Managed Clusters](#enabling-logging-for-rancher-managed-clusters)
- [Configuring the Logging Application](#configuring-the-logging-application)
- [Working with Taints and Tolerations](#working-with-taints-and-tolerations)


### Changes in Rancher v2.5

The following changes were introduced to logging in Rancher v2.5:

- The [Banzai Cloud Logging operator](https://banzaicloud.com/docs/one-eye/logging-operator/) now powers Rancher's logging in place of the former, in-house logging solution.
- [Fluent Bit](https://fluentbit.io/) is now used to aggregate the logs. [Fluentd](https://www.fluentd.org/) is used for filtering the messages and routing them to the outputs. Previously, only Fluentd was used.
- Logging can be configured with a Kubernetes manifest, because now the logging uses a Kubernetes operator with Custom Resource Definitions.
- We now support filtering logs.
- We now support writing logs to multiple outputs.
- We now always collect Control Plane and etcd logs.


The following figure from the [Banzai documentation](https://banzaicloud.com/docs/one-eye/logging-operator/#architecture) shows the new logging architecture:

<figcaption>How the Banzai Cloud Logging Operator Works with Fluentd and Fluent Bit</figcaption>

![How the Banzai Cloud Logging Operator Works with Fluentd]({{<baseurl>}}/img/rancher/banzai-cloud-logging-operator.png)

### Configuring the Logging Output for the Rancher Kubernetes Cluster

If you install Rancher as a Helm chart, you'll configure the Helm chart options to select a logging output for all the logs in the local Kubernetes cluster.

If you install Rancher using the Rancher CLI on an Linux OS,  the Rancher Helm chart will be installed on a Kubernetes cluster with default options. Then when the Rancher UI is available, you'll enable the logging app from the Apps section of the UI. Then during the process of installing the logging application, you will configure the logging output.

### Enabling Logging for Rancher Managed Clusters

If you have Enterprise Cluster Manager enabled, you can enable the logging for a Rancher managed cluster by going to the Apps page and installing the logging app.

### Configuring the Logging Application

The following Custom Resource Definitions are used to configure logging:

- [Flow and ClusterFlow](https://banzaicloud.com/docs/one-eye/logging-operator/crds/#flows-clusterflows)
- [Output and ClusterOutput](https://banzaicloud.com/docs/one-eye/logging-operator/crds/#outputs-clusteroutputs)

According to the [Banzai Cloud documentation,](https://banzaicloud.com/docs/one-eye/logging-operator/#architecture)

> You can define `outputs` (destinations where you want to send your log messages, for example, Elasticsearch, or and Amazon S3 bucket), and `flows` that use filters and selectors to route log messages to the appropriate outputs. You can also define cluster-wide outputs and flows, for example, to use a centralized output that namespaced users cannot modify.

**RBAC**

Rancher logging has two roles, `logging-admin` and `logging-view`. `logging-admin` allows users full access to namespaced flows and outputs.  The `logging-view` role allows users to view namespaced flows and outputs, and cluster flows and outputs.  Edit access to the cluster flow and cluster output resources is powerful as it allows any user with edit access control of all logs in the cluster.  Cluster admin is the only role with full access to all rancher-logging resources.  Cluster members are not able to edit or read any logging resources.  Project owners are able to create namespaced flows and outputs in the namespaces under their projects.  This means that project owners can collect logs from anything in their project namespaces.  Project members are able to view the flows and outputs in the namespaces under their projects. Project owners and project members require at least 1 namespace in their project to use logging.  If they do not have at least one namespace in their project they may not see the logging button in the top nav dropdown. 

**Examples**

Let's say you wanted to send all logs in your cluster to an elasticsearch cluster.

First lets create our cluster output: 
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

We have created a cluster output, without elasticsearch configuration, in the same namespace as our operator `cattle-logging-system.`. Any time we create a cluster flow or cluster output we have to put it in the `cattle-logging-system` namespace.

Now we have configured where we want the logs to go, lets configure all logs to go to that output.

```yaml
apiVersion: logging.banzaicloud.io/v1beta1
kind: ClusterFlow
metadata:
    name: "all-logs"
    namespace: "cattle-logging-system"
spec:
  globalOutputRefs:
    - "example-es
``` 

We should now see our configured index with logs in it.

What if we have an application team who only wants logs from a specific namespaces sent to a splunk server? For this case can use namespaced outputs and flows. 

Before we start lets set up a scenario.

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

like before we start with an output, unlike cluster outputs we create our output in our application's namespace:

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

Once again, lets give our output some logs:

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

For the final example we create an output to write logs to a destination that is not supported out of the box (e.g. syslog):

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

if we break down what is happening, first we create a deployment of a container that has the additional syslog plugin and accepts logs forwarded from another fluentd.  Next we create an output configured as a forwarder to our deployment. The deployment fluentd will then forward all logs to the configured syslog destination.  

### Working with Taints and Tolerations

"Tainting" a Kubernetes node causes pods to repel running on that node.
Unless the pods have a ```toleration``` for that node's taint, they will run on other nodes in the cluster.
[Taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) can work in conjunction with the ```nodeSelector``` [field](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) within the ```PodSpec```, which enables the *opposite* effect of a taint.
Using ```nodeSelector``` gives pods an affinity towards certain nodes.
Both provide choice for the what node(s) the pod will run on.

**Default Implementation in Rancher's Logging Stack**

By default, Rancher taints all Linux nodes with ```cattle.io/os=linux```, and does not taint Windows nodes.
The logging stack pods have ```tolerations``` for this taint, which enables them to run on Linux nodes.
Moreover, we can populate the ```nodeSelector``` to ensure that our pods *only* run on Linux nodes.
Let's look at an example pod YAML file with these settings...

```yaml
apiVersion: v1
kind: Pod
# metadata:
spec:
  # containers:
  tolerations:
    - key: cattle.io/os
      operator: "Equal"
      value: "linux"
      effect: NoSchedule 
  nodeSelector:
    kubernetes.io/os: linux
```

In the above example, we ensure that our pod only runs on Linux nodes, and we add a ```toleration``` for the taint we have on all of our Linux nodes.
You can do the same with Rancher's existing taints, or with your own custom ones.

**Why do we not schedule logging-related pods on Windows nodes?**

No parts of the logging stack are compatible with Windows Kubernetes nodes.
For instance, if a logging pod is attempting to pull its image from a container registry, there may only be Linux-compatible images available.
In this scenario, the pod would be stuck in an ```ImagePullBackOff``` status; and would eventually change to a ```ErrImagePull``` status.

**Adding NodeSelector Settings and Tolerations for Custom Taints**

If you would like to add your own ```nodeSelector``` settings, or if you would like to add ```tolerations``` for additional taints, you can pass the following to the chart's values.

```yaml
tolerations:
  # insert tolerations list
nodeSelector:
  # insert nodeSelector settings
```

These values will add both settings to the ```fluentd```, ```fluentbit```, and ```logging-operator``` containers.
Essentially, these are global settings for all pods in the logging stack.

However, if you would like to add tolerations for *only* the ```fluentbit``` container, you can add the following to the chart's values.

```yaml
fluentbit_tolerations:
  # insert tolerations list for fluentbit containers only
```
