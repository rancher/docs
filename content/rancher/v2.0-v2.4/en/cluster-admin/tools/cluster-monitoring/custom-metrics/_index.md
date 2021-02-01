---
title: Prometheus Custom Metrics Adapter
weight: 5
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/tools/monitoring/custom-metrics
  - /rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/custom-metrics
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/monitoring/custom-metrics/
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/custom-metrics
---

After you've enabled [cluster level monitoring]({{< baseurl >}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/), You can view the metrics data from Rancher. You can also deploy the Prometheus custom metrics adapter then you can use the HPA with metrics stored in cluster monitoring.

## Deploy Prometheus Custom Metrics Adapter

We are going to use the [Prometheus custom metrics adapter](https://github.com/DirectXMan12/k8s-prometheus-adapter/releases/tag/v0.5.0), version v0.5.0. This is a great example for the [custom metrics server](https://github.com/kubernetes-incubator/custom-metrics-apiserver). And you must be the *cluster owner* to execute following steps.

- Get the service account of the cluster monitoring is using. It should be configured in the workload ID: `statefulset:cattle-prometheus:prometheus-cluster-monitoring`. And if you didn't customize anything, the service account name should be `cluster-monitoring`.

- Grant permission to that service account. You will need two kinds of permission. 
One role is `extension-apiserver-authentication-reader` in `kube-system`, so you will need to create a `Rolebinding` to in `kube-system`. This permission is to get api aggregation configuration from config map in `kube-system`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: custom-metrics-auth-reader
  namespace: kube-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: extension-apiserver-authentication-reader
subjects:
- kind: ServiceAccount
  name: cluster-monitoring
  namespace: cattle-prometheus
```

The other one is cluster role `system:auth-delegator`, so you will need to create a `ClusterRoleBinding`. This permission is to have subject access review permission.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: custom-metrics:system:auth-delegator
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
- kind: ServiceAccount
  name: cluster-monitoring
  namespace: cattle-prometheus
```

- Create configuration for custom metrics adapter. Following is an example configuration. There will be a configuration details in next session.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: adapter-config
  namespace: cattle-prometheus
data:
  config.yaml: |
    rules:
    - seriesQuery: '{__name__=~"^container_.*",container_name!="POD",namespace!="",pod_name!=""}'
      seriesFilters: []
      resources:
        overrides:
          namespace:
            resource: namespace
          pod_name:
            resource: pod
      name:
        matches: ^container_(.*)_seconds_total$
        as: ""
      metricsQuery: sum(rate(<<.Series>>{<<.LabelMatchers>>,container_name!="POD"}[1m])) by (<<.GroupBy>>)
    - seriesQuery: '{__name__=~"^container_.*",container_name!="POD",namespace!="",pod_name!=""}'
      seriesFilters:
      - isNot: ^container_.*_seconds_total$
      resources:
        overrides:
          namespace:
            resource: namespace
          pod_name:
            resource: pod
      name:
        matches: ^container_(.*)_total$
        as: ""
      metricsQuery: sum(rate(<<.Series>>{<<.LabelMatchers>>,container_name!="POD"}[1m])) by (<<.GroupBy>>)
    - seriesQuery: '{__name__=~"^container_.*",container_name!="POD",namespace!="",pod_name!=""}'
      seriesFilters:
      - isNot: ^container_.*_total$
      resources:
        overrides:
          namespace:
            resource: namespace
          pod_name:
            resource: pod
      name:
        matches: ^container_(.*)$
        as: ""
      metricsQuery: sum(<<.Series>>{<<.LabelMatchers>>,container_name!="POD"}) by (<<.GroupBy>>)
    - seriesQuery: '{namespace!="",__name__!~"^container_.*"}'
      seriesFilters:
      - isNot: .*_total$
      resources:
        template: <<.Resource>>
      name:
        matches: ""
        as: ""
      metricsQuery: sum(<<.Series>>{<<.LabelMatchers>>}) by (<<.GroupBy>>)
    - seriesQuery: '{namespace!="",__name__!~"^container_.*"}'
      seriesFilters:
      - isNot: .*_seconds_total
      resources:
        template: <<.Resource>>
      name:
        matches: ^(.*)_total$
        as: ""
      metricsQuery: sum(rate(<<.Series>>{<<.LabelMatchers>>}[1m])) by (<<.GroupBy>>)
    - seriesQuery: '{namespace!="",__name__!~"^container_.*"}'
      seriesFilters: []
      resources:
        template: <<.Resource>>
      name:
        matches: ^(.*)_seconds_total$
        as: ""
      metricsQuery: sum(rate(<<.Series>>{<<.LabelMatchers>>}[1m])) by (<<.GroupBy>>)
    resourceRules:
      cpu:
        containerQuery: sum(rate(container_cpu_usage_seconds_total{<<.LabelMatchers>>}[1m])) by (<<.GroupBy>>)
        nodeQuery: sum(rate(container_cpu_usage_seconds_total{<<.LabelMatchers>>, id='/'}[1m])) by (<<.GroupBy>>)
        resources:
          overrides:
            instance:
              resource: node
            namespace:
              resource: namespace
            pod_name:
              resource: pod
        containerLabel: container_name
      memory:
        containerQuery: sum(container_memory_working_set_bytes{<<.LabelMatchers>>}) by (<<.GroupBy>>)
        nodeQuery: sum(container_memory_working_set_bytes{<<.LabelMatchers>>,id='/'}) by (<<.GroupBy>>)
        resources:
          overrides:
            instance:
              resource: node
            namespace:
              resource: namespace
            pod_name:
              resource: pod
        containerLabel: container_name
      window: 1m
```

- Create HTTPS TLS certs for your api server. You can use following command to create a self-signed cert.

```bash
openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out serving.crt -keyout serving.key -subj "/C=CN/CN=custom-metrics-apiserver.cattle-prometheus.svc.cluster.local"
# And you will find serving.crt and serving.key in your path. And then you are going to create a secret in cattle-prometheus namespace.
kubectl create secret generic -n cattle-prometheus cm-adapter-serving-certs --from-file=serving.key=./serving.key --from-file=serving.crt=./serving.crt 
```

- Then you can create the prometheus custom metrics adapter. And you will need a service for this deployment too. Creating it via Import YAML or Rancher would do. Please create those resources in `cattle-prometheus` namespaces.

Here is the prometheus custom metrics adapter deployment.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: custom-metrics-apiserver
  name: custom-metrics-apiserver
  namespace: cattle-prometheus
spec:
  replicas: 1
  selector:
    matchLabels:
      app: custom-metrics-apiserver
  template:
    metadata:
      labels:
        app: custom-metrics-apiserver
      name: custom-metrics-apiserver
    spec:
      serviceAccountName: cluster-monitoring
      containers:
      - name: custom-metrics-apiserver
        image: directxman12/k8s-prometheus-adapter-amd64:v0.5.0
        args:
        - --secure-port=6443
        - --tls-cert-file=/var/run/serving-cert/serving.crt
        - --tls-private-key-file=/var/run/serving-cert/serving.key
        - --logtostderr=true
        - --prometheus-url=http://prometheus-operated/
        - --metrics-relist-interval=1m
        - --v=10
        - --config=/etc/adapter/config.yaml
        ports:
        - containerPort: 6443
        volumeMounts:
        - mountPath: /var/run/serving-cert
          name: volume-serving-cert
          readOnly: true
        - mountPath: /etc/adapter/
          name: config
          readOnly: true
        - mountPath: /tmp
          name: tmp-vol
      volumes:
      - name: volume-serving-cert
        secret:
          secretName: cm-adapter-serving-certs
      - name: config
        configMap:
          name: adapter-config
      - name: tmp-vol
        emptyDir: {}

```

Here is the service of the deployment.
```yaml
apiVersion: v1
kind: Service
metadata:
  name: custom-metrics-apiserver
  namespace: cattle-prometheus
spec:
  ports:
  - port: 443
    targetPort: 6443
  selector:
    app: custom-metrics-apiserver
```

- Create API service for your custom metric server.

```yaml
apiVersion: apiregistration.k8s.io/v1beta1
kind: APIService
metadata:
  name: v1beta1.custom.metrics.k8s.io
spec:
  service:
    name: custom-metrics-apiserver
    namespace: cattle-prometheus
  group: custom.metrics.k8s.io
  version: v1beta1
  insecureSkipTLSVerify: true
  groupPriorityMinimum: 100
  versionPriority: 100

```

- Then you can verify your custom metrics server by `kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1`. If you see the return datas from the api, it means that the metrics server has been successfully set up.

- You create HPA with custom metrics now. Here is an example of HPA. You will need to create a nginx deployment in your namespace first.

```yaml
kind: HorizontalPodAutoscaler
apiVersion: autoscaling/v2beta1
metadata:
  name: nginx
spec:
  scaleTargetRef:
    # point the HPA at the nginx deployment you just created
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  # autoscale between 1 and 10 replicas
  minReplicas: 1
  maxReplicas: 10
  metrics:
  # use a "Pods" metric, which takes the average of the
  # given metric across all pods controlled by the autoscaling target
  - type: Pods
    pods:
      metricName: memory_usage_bytes
      targetAverageValue: 5000000
```

And then, you should see your nginx is scaling up. HPA with custom metrics works.

## Configuration of prometheus custom metrics adapter

> Refer to https://github.com/DirectXMan12/k8s-prometheus-adapter/blob/master/docs/config.md

The adapter determines which metrics to expose, and how to expose them,
through a set of "discovery" rules.  Each rule is executed independently
(so make sure that your rules are mutually exclusive), and specifies each
of the steps the adapter needs to take to expose a metric in the API.

Each rule can be broken down into roughly four parts:

- *Discovery*, which specifies how the adapter should find all Prometheus
  metrics for this rule.

- *Association*, which specifies how the adapter should determine which
  Kubernetes resources a particular metric is associated with.

- *Naming*, which specifies how the adapter should expose the metric in
  the custom metrics API.

- *Querying*, which specifies how a request for a particular metric on one
  or more Kubernetes objects should be turned into a query to Prometheus.

A basic config with one rule might look like:

```yaml
rules:
# this rule matches cumulative cAdvisor metrics measured in seconds
- seriesQuery: '{__name__=~"^container_.*",container_name!="POD",namespace!="",pod_name!=""}'
  resources:
    # skip specifying generic resource<->label mappings, and just
    # attach only pod and namespace resources by mapping label names to group-resources
    overrides:
      namespace: {resource: "namespace"},
      pod_name: {resource: "pod"},
  # specify that the `container_` and `_seconds_total` suffixes should be removed.
  # this also introduces an implicit filter on metric family names
  name:
    # we use the value of the capture group implicitly as the API name
    # we could also explicitly write `as: "$1"`
    matches: "^container_(.*)_seconds_total$"
  # specify how to construct a query to fetch samples for a given series
  # This is a Go template where the `.Series` and `.LabelMatchers` string values
  # are available, and the delimiters are `<<` and `>>` to avoid conflicts with
  # the prometheus query language
  metricsQuery: "sum(rate(<<.Series>>{<<.LabelMatchers>>,container_name!="POD"}[2m])) by (<<.GroupBy>>)"
```

### Discovery

Discovery governs the process of finding the metrics that you want to
expose in the custom metrics API.  There are two fields that factor into
discovery: `seriesQuery` and `seriesFilters`.

`seriesQuery` specifies Prometheus series query (as passed to the
`/api/v1/series` endpoint in Prometheus) to use to find some set of
Prometheus series.  The adapter will strip the label values from this
series, and then use the resulting metric-name-label-names combinations
later on.

In many cases, `seriesQuery` will be sufficient to narrow down the list of
Prometheus series.  However, sometimes (especially if two rules might
otherwise overlap), it's useful to do additional filtering on metric
names.  In this case, `seriesFilters` can be used.  After the list of
series is returned from `seriesQuery`, each series has its metric name
filtered through any specified filters.

Filters may be either:

- `is: <regex>`, which matches any series whose name matches the specified
  regex.

- `isNot: <regex>`, which matches any series whose name does not match the
  specified regex.

For example:

```yaml
# match all cAdvisor metrics that aren't measured in seconds
seriesQuery: '{__name__=~"^container_.*_total",container_name!="POD",namespace!="",pod_name!=""}'
seriesFilters:
  isNot: "^container_.*_seconds_total"
```

### Association

Association governs the process of figuring out which Kubernetes resources
a particular metric could be attached to.  The `resources` field controls
this process.

There are two ways to associate resources with a particular metric.  In
both cases, the value of the label becomes the name of the particular
object.

One way is to specify that any label name that matches some particular
pattern refers to some group-resource based on the label name.  This can
be done using the `template` field.   The pattern is specified as a Go
template, with the `Group` and `Resource` fields representing group and
resource. You don't necessarily have to use the `Group` field (in which
case the group is guessed by the system). For instance:

```yaml
# any label `kube_<group>_<resource>` becomes <group>.<resource> in Kubernetes
resources:
  template: "kube_<<.Group>>_<<.Resource>>"
```

The other way is to specify that some particular label represents some
particular Kubernetes resource.  This can be done using the `overrides`
field.  Each override maps a Prometheus label to a Kubernetes
group-resource. For instance:

```yaml
# the microservice label corresponds to the apps.deployment resource
resource:
  overrides:
    microservice: {group: "apps", resource: "deployment"}
```

These two can be combined, so you can specify both a template and some
individual overrides.

The resources mentioned can be any resource available in your kubernetes
cluster, as long as you've got a corresponding label.

### Naming

Naming governs the process of converting a Prometheus metric name into
a metric in the custom metrics API, and vice versa.  It's controlled by
the `name` field.

Naming is controlled by specifying a pattern to extract an API name from
a Prometheus name, and potentially a transformation on that extracted
value.

The pattern is specified in the `matches` field, and is just a regular
expression.  If not specified, it defaults to `.*`.

The transformation is specified by the `as` field.  You can use any
capture groups defined in the `matches` field.  If the `matches` field
doesn't contain capture groups, the `as` field defaults to `$0`.  If it
contains a single capture group, the `as` field defautls to `$1`.
Otherwise, it's an error not to specify the as field.

For example:

```yaml
# match turn any name <name>_total to <name>_per_second
# e.g. http_requests_total becomes http_requests_per_second
name:
  matches: "^(.*)_total$"
  as: "${1}_per_second"
```

### Querying

Querying governs the process of actually fetching values for a particular
metric.  It's controlled by the `metricsQuery` field.

The `metricsQuery` field is a Go template that gets turned into
a Prometheus query, using input from a particular call to the custom
metrics API. A given call to the custom metrics API is distilled down to
a metric name, a group-resource, and one or more objects of that
group-resource.  These get turned into the following fields in the
template:

- `Series`: the metric name
- `LabelMatchers`: a comma-separated list of label matchers matching the
  given objects.  Currently, this is the label for the particular
  group-resource, plus the label for namespace, if the group-resource is
  namespaced.
- `GroupBy`: a comma-separated list of labels to group by.  Currently,
  this contains the group-resource label used in `LabelMatchers`.

For instance, suppose we had a series `http_requests_total` (exposed as
`http_requests_per_second` in the API) with labels `service`, `pod`,
`ingress`, `namespace`, and `verb`. The first four correspond to
Kubernetes resources.  Then, if someone requested the metric
`pods/http_request_per_second` for the pods `pod1` and `pod2` in the
`somens` namespace, we'd have:

- `Series: "http_requests_total"`
- `LabelMatchers: "pod=~\"pod1|pod2",namespace="somens"`
- `GroupBy`: `pod`

Additionally, there are two advanced fields that are "raw" forms of other
fields:

- `LabelValuesByName`: a map mapping the labels and values from the
  `LabelMatchers` field.  The values are pre-joined by `|`
  (for used with the `=~` matcher in Prometheus).
- `GroupBySlice`: the slice form of `GroupBy`.

In general, you'll probably want to use the `Series`, `LabelMatchers`, and
`GroupBy` fields.  The other two are for advanced usage.

The query is expected to return one value for each object requested.  The
adapter will use the labels on the returned series to associate a given
series back to its corresponding object.

For example:

```yaml
# convert cumulative cAdvisor metrics into rates calculated over 2 minutes
metricsQuery: "sum(rate(<<.Series>>{<<.LabelMatchers>>,container_name!="POD"}[2m])) by (<<.GroupBy>>)"
```
