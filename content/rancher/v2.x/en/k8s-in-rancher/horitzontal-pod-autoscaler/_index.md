---
title: Horizontal Pod Autoscaler
weight: 2300
---

Using the Kubernetes [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) feature (HPA), you can configure your cluster to automatically scale the services it's running up or down.

### Why Use Horizontal Pod Autoscaler?

Using HPA, you can automatically scale the number of pods within a replication controller, deployment, or replica set up or down. HPA automatically scales the number of pods that are running for maximum efficiency. Factors that affect the number of pods include:

- A minimum and maximum number of pods allowed to run, as defined by the user.
- Observed CPU/memory use, as reported in resource metrics.
- Custom metrics provided by third-party metrics application like Prometheus, Datadog, etc.

HPA improves your services by:

- Releasing hardware resources that would otherwise be wasted by an excessive number of pods.
- Increase/decrease performance as needed to accomplish service level agreements.

### How HPA Works

![HPA Schema]({{< baseurl >}}/img/rancher/horizontal-pod-autoscaler.svg)

HPA is implemented as a control loop, with a period controlled by the `kube-controller-manager` flags below:


Flag | Default | Description |
---------|----------|----------|
 `--horizontal-pod-autoscaler-sync-period` | `30s` | How often HPA audits resource/custom metrics in a deployment.
 `--horizontal-pod-autoscaler-downscale-delay` | `5m0s` | Following completion of a downscale operation, how long HPA must wait before launching another downscale operations.
 `--horizontal-pod-autoscaler-upscale-delay` | `3m0s` | Following completion of an upscale operation, how long HPA must wait before launching another upscale operation.


For full documentation on HPA, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).

### Horizontal Pod Autoscaler API Objects

HPA is an API resource in the Kubernetes `autoscaling` API group. The current stable version is `autoscaling/v1`, which only includes support for CPU autoscaling. To get additional support for scaling based on memory and custom metrics, use the beta version instead: `autoscaling/v2beta1`. 

For more information about the HPA API object, see the [HPA GitHub Readme](https://git.k8s.io/community/contributors/design-proposals/autoscaling/horizontal-pod-autoscaler.md#horizontalpodautoscaler-object).

### kubectl Commands

You can create, manage, and delete HPAs using kubectl: 

- Creating HPA

  - With manifest: `kubectl create -f <HPA_MANIFEST>`

  - Without manifest (Just support CPU): `kubectl autoscale deployment hello-world --min=2 --max=5 --cpu-percent=50`

- Getting HPA info

  - Basic: `kubectl get hpa hello-world`

  - Detailed description: `kubectl describe hpa hello-world`

- Deleting HPA

  - `kubectl delete hpa hello-world`

### HPA Manifest Definition Example

The following snippet demonstrates use of different directives in an HPA manifest. See the list below the sample to understand the purpose of each directive.

```yml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: hello-world
spec:
  scaleTargetRef:
    apiVersion: extensions/v1beta1
    kind: Deployment
    name: hello-world
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 50
  - type: Resource
    resource:
      name: memory
      targetAverageValue: 100Mi
```


Directive | Description  
---------|----------|
 `apiVersion: autoscaling/v2beta1` | The version of the Kubernetes `autoscaling` API group in use. This example manifest uses the beta version, so scaling by CPU and memory is enabled. | 
 `name: hello-world` | Indicates that HPA is performing autoscaling for the `hello-word` deployment. |
 `minReplicas: 1` | Indicates that the minimum number of replicas running can't go below 1. |
 `maxReplicas: 10`  | Indicates the maximum number of replicas in the deployment can't go above 10.
 `targetAverageUtilization: 50` |  Indicates the deployment will scale pods up when the average running pod uses more than 50% of its requested CPU.
 `targetAverageValue: 100Mi`  |  Indicates the deployment will scale pods up when the average running pod uses more that 100Mi of memory.
<br/>

### Installation

Before you can use HPA in your Kubernetes cluster, you must fulfill some requirements.

#### Requirements 

Be sure that your Kubernetes cluster services are running with these flags at minimum:

- kube-api: `requestheader-client-ca-file` 
- kubelet: `read-only-port` at 10255
- kube-controller: Optional, just needed if distinct values than default are required.

  - `horizontal-pod-autoscaler-downscale-delay: "5m0s"`
  - `horizontal-pod-autoscaler-upscale-delay: "3m0s"`
  - `horizontal-pod-autoscaler-sync-period: "30s"`

For an RKE Kubernetes cluster definition, add this snippet in the `services` section. To add this snippet using the Rancher v2.0 UI, open the **Clusters** view and select **Ellipsis (...) > Edit** for the cluster in which you want to use HPA. Then, from **Cluster Options**, click **Edit as YAML**. Add the following snippet to the `services` section:

```
services:
...
  kube-api: 
    extra_args: 
      requestheader-client-ca-file: "/etc/kubernetes/ssl/kube-ca.pem"
  kube-controller:
    extra_args: 
      horizontal-pod-autoscaler-downscale-delay: "5m0s"
      horizontal-pod-autoscaler-upscale-delay: "1m0s"
      horizontal-pod-autoscaler-sync-period: "30s"
  kubelet:
    extra_args:
      read-only-port: 10255
```

Once the Kubernetes cluster is configured and deployed, you can deploy metrics services.

>**Note:** kubectl command samples in the sections that follow were tested in a cluster running Rancher v2.0.6 and Kubernetes v1.10.1.

#### Configuring HPA to Scale Using Resource Metrics

To create HPA resources based on resource metrics such as CPU and memory use, you need to deploy the `metrics-server` package in the `kube-system` namespace of your Kubernetes cluster. This deployment allows HPA to consume the `metrics.k8s.io` API. 

>**Prerequisite:** You must be running kubectl 1.8 or later.

1. Connect to your Kubernetes cluster using kubectl.

1. Clone the GitHub `metrics-server` repo:
  ```
  # git clone https://github.com/kubernetes-incubator/metrics-server
  ```

1. Install the `metrics-server` package.
  ```
  # kubectl create -f metrics-server/deploy/1.8+/
  ```

1. Check that `metrics-server` is running properly. Check the service pod and logs in the `kube-system` namespace.

  1. Check the service pod for a status of `running`. Enter the following command:
    ```
    # kubectl get pods -n kube-system
    ```
    Then check for the status of `running`.
    ``` 
    NAME                                  READY     STATUS    RESTARTS   AGE
    ...
    metrics-server-6fbfb84cdd-t2fk9       1/1       Running   0          8h
    ...
    ```
  1. Check the service logs for service availability. Enter the following command:
    ```
    # kubectl -n kube-system logs metrics-server-6fbfb84cdd-t2fk9
    ```
    Then review the log to confirm that that the `metrics-server` package is running.
    {{% accordion id="metrics-server-run-check" label="Metrics Server Log Output" %}}  
    I0723 08:09:56.193136       1 heapster.go:71] /metrics-server --source=kubernetes.summary_api:''
    I0723 08:09:56.193574       1 heapster.go:72] Metrics Server version v0.2.1
    I0723 08:09:56.194480       1 configs.go:61] Using Kubernetes client with master "https://10.43.0.1:443" and version
    I0723 08:09:56.194501       1 configs.go:62] Using kubelet port 10255
    I0723 08:09:56.198612       1 heapster.go:128] Starting with Metric Sink
    I0723 08:09:56.780114       1 serving.go:308] Generated self-signed cert (apiserver.local.config/certificates/apiserver.crt, apiserver.local.config/certificates/apiserver.key)
    I0723 08:09:57.391518       1 heapster.go:101] Starting Heapster API server...
    [restful] 2018/07/23 08:09:57 log.go:33: [restful/swagger] listing is available at https:///swaggerapi
    [restful] 2018/07/23 08:09:57 log.go:33: [restful/swagger] https:///swaggerui/ is mapped to folder /swagger-ui/
    I0723 08:09:57.394080       1 serve.go:85] Serving securely on 0.0.0.0:443
    {{% /accordion %}}
   

1. Check that the metrics api is accessible from kubectl.

  - If you are accessing the cluster directly, enter your Server URL in the kubectl config in the following format: `https://<K8s_URL>:6443`. 
    ```
    # kubectl get --raw /apis/metrics.k8s.io/v1beta1
    ```
    If the the API is working correctly, you should receive output similar to the output below.
    ```
    {"kind":"APIResourceList","apiVersion":"v1","groupVersion":"metrics.k8s.io/v1beta1","resources":[{"name":"nodes","singularName":"","namespaced":false,"kind":"NodeMetrics","verbs":["get","list"]},{"name":"pods","singularName":"","namespaced":true,"kind":"PodMetrics","verbs":["get","list"]}]}
    ```

  - If you are accessing the cluster through Rancher, enter your Server URL in the kubectl config in the following format: `https://<RANCHER_URL>/k8s/clusters/<CLUSTER_ID>`. Add the suffix `/k8s/clusters/<CLUSTER_ID>` to API path.
    ```
    # kubectl get --raw /k8s/clusters/<CLUSTER_ID>/apis/metrics.k8s.io/v1beta1
    ```
    If the the API is working correctly, you should receive output similar to the output below.
    ```
    {"kind":"APIResourceList","apiVersion":"v1","groupVersion":"metrics.k8s.io/v1beta1","resources":[{"name":"nodes","singularName":"","namespaced":false,"kind":"NodeMetrics","verbs":["get","list"]},{"name":"pods","singularName":"","namespaced":true,"kind":"PodMetrics","verbs":["get","list"]}]}
    ```

#### Configuring HPA to Scale Using Custom Metrics (Prometheus)

You can also configure HPA to autoscale based on custom metrics provided by third-party software. The most common use case for autoscaling using third-party software is based on application-level metrics (i.e., HTTP requests per second). HPA uses the `custom.metrics.k8s.io` API to consume these metrics. This API is enabled by deploying a custom metrics adapter for the metrics collection solution.

For this example, we are going to use [Prometheus](https://prometheus.io/). We are beginning with the following assumptions:

- Prometheus is deployed in the cluster.
- Prometheus is configured correctly and collecting proper metrics from pods, nodes, namespaces, etc.
- Prometheus is exposed at the following URL and port: `http://prometheus.mycompany.io:80`

Prometheus is available for deployment in the Rancher v2.0 catalog. Deploy it from Rancher catalog if it isn't already running in your cluster.

For HPA to use custom metrics from Prometheus, package [k8s-prometheus-adapter](https://github.com/DirectXMan12/k8s-prometheus-adapter) is required in the `kube-system` namespace of your cluster. To install `k8s-prometheus-adapter`, we are using the Helm chart available at [banzai-charts](https://github.com/banzaicloud/banzai-charts).

1. Initialize Helm in your cluster.
  ```
  # kubectl -n kube-system create serviceaccount tiller
  kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
  helm init --service-account tiller
  ```

1. Clone the `banzai-charts` repo from GitHub:
  ```
  # git clone https://github.com/banzaicloud/banzai-charts
  ```

1. Install the `prometheus-adapter` chart, specifying the Prometheus URL and port number.
  ```
  # helm install --name prometheus-adapter banzai-charts/prometheus-adapter --set prometheus.url="http://prometheus.mycompany.io",prometheus.port="80" --namespace kube-system
  ```

1. Check that `prometheus-adapter` is running properly. Check the service pod and logs in the `kube-system` namespace.
  
  1. Check that the service pod is `Running`. Enter the following command.
    ```
    # kubectl get pods -n kube-system
    ```
    From the resulting output, look for a status of `Running`.
    ```
    NAME                                  READY     STATUS    RESTARTS   AGE
    ...
    prometheus-adapter-prometheus-adapter-568674d97f-hbzfx   1/1       Running   0          7h
    ...
    ```
  1. Check the service logs to make sure the service is running correctly by entering the command that follows.
    ```
    # kubectl logs prometheus-adapter-prometheus-adapter-568674d97f-hbzfx -n kube-system
    ```
    Then review the log output to confirm the service is running.
    {{% accordion id="prometheus-logs" label="Prometheus Adaptor Logs" %}}
    ...
    I0724 10:18:45.696679       1 round_trippers.go:436] GET https://10.43.0.1:443/api/v1/namespaces/default/pods?labelSelector=app%3Dhello-world 200 OK in 2 milliseconds
    I0724 10:18:45.696695       1 round_trippers.go:442] Response Headers:
    I0724 10:18:45.696699       1 round_trippers.go:445]     Date: Tue, 24 Jul 2018 10:18:45 GMT
    I0724 10:18:45.696703       1 round_trippers.go:445]     Content-Type: application/json
    I0724 10:18:45.696706       1 round_trippers.go:445]     Content-Length: 2581
    I0724 10:18:45.696766       1 request.go:836] Response Body: {"kind":"PodList","apiVersion":"v1","metadata":{"selfLink":"/api/v1/namespaces/default/pods","resourceVersion":"6237"},"items":[{"metadata":{"name":"hello-world-54764dfbf8-q6l82","generateName":"hello-world-54764dfbf8-","namespace":"default","selfLink":"/api/v1/namespaces/default/pods/hello-world-54764dfbf8-q6l82","uid":"484cb929-8f29-11e8-99d2-067cac34e79c","resourceVersion":"4066","creationTimestamp":"2018-07-24T10:06:50Z","labels":{"app":"hello-world","pod-template-hash":"1032089694"},"annotations":{"cni.projectcalico.org/podIP":"10.42.0.7/32"},"ownerReferences":[{"apiVersion":"extensions/v1beta1","kind":"ReplicaSet","name":"hello-world-54764dfbf8","uid":"4849b9b1-8f29-11e8-99d2-067cac34e79c","controller":true,"blockOwnerDeletion":true}]},"spec":{"volumes":[{"name":"default-token-ncvts","secret":{"secretName":"default-token-ncvts","defaultMode":420}}],"containers":[{"name":"hello-world","image":"rancher/hello-world","ports":[{"containerPort":80,"protocol":"TCP"}],"resources":{"requests":{"cpu":"500m","memory":"64Mi"}},"volumeMounts":[{"name":"default-token-ncvts","readOnly":true,"mountPath":"/var/run/secrets/kubernetes.io/serviceaccount"}],"terminationMessagePath":"/dev/termination-log","terminationMessagePolicy":"File","imagePullPolicy":"Always"}],"restartPolicy":"Always","terminationGracePeriodSeconds":30,"dnsPolicy":"ClusterFirst","serviceAccountName":"default","serviceAccount":"default","nodeName":"34.220.18.140","securityContext":{},"schedulerName":"default-scheduler","tolerations":[{"key":"node.kubernetes.io/not-ready","operator":"Exists","effect":"NoExecute","tolerationSeconds":300},{"key":"node.kubernetes.io/unreachable","operator":"Exists","effect":"NoExecute","tolerationSeconds":300}]},"status":{"phase":"Running","conditions":[{"type":"Initialized","status":"True","lastProbeTime":null,"lastTransitionTime":"2018-07-24T10:06:50Z"},{"type":"Ready","status":"True","lastProbeTime":null,"lastTransitionTime":"2018-07-24T10:06:54Z"},{"type":"PodScheduled","status":"True","lastProbeTime":null,"lastTransitionTime":"2018-07-24T10:06:50Z"}],"hostIP":"34.220.18.140","podIP":"10.42.0.7","startTime":"2018-07-24T10:06:50Z","containerStatuses":[{"name":"hello-world","state":{"running":{"startedAt":"2018-07-24T10:06:54Z"}},"lastState":{},"ready":true,"restartCount":0,"image":"rancher/hello-world:latest","imageID":"docker-pullable://rancher/hello-world@sha256:4b1559cb4b57ca36fa2b313a3c7dde774801aa3a2047930d94e11a45168bc053","containerID":"docker://cce4df5fc0408f03d4adf82c90de222f64c302bf7a04be1c82d584ec31530773"}],"qosClass":"Burstable"}}]}
    I0724 10:18:45.699525       1 api.go:74] GET http://prometheus-server.prometheus.34.220.18.140.xip.io/api/v1/query?query=sum%28rate%28container_fs_read_seconds_total%7Bpod_name%3D%22hello-world-54764dfbf8-q6l82%22%2Ccontainer_name%21%3D%22POD%22%2Cnamespace%3D%22default%22%7D%5B5m%5D%29%29+by+%28pod_name%29&time=1532427525.697 200 OK
    I0724 10:18:45.699620       1 api.go:93] Response Body: {"status":"success","data":{"resultType":"vector","result":[{"metric":{"pod_name":"hello-world-54764dfbf8-q6l82"},"value":[1532427525.697,"0"]}]}}
    I0724 10:18:45.699939       1 wrap.go:42] GET /apis/custom.metrics.k8s.io/v1beta1/namespaces/default/pods/%2A/fs_read?labelSelector=app%3Dhello-world: (12.431262ms) 200 [[kube-controller-manager/v1.10.1 (linux/amd64) kubernetes/d4ab475/system:serviceaccount:kube-system:horizontal-pod-autoscaler] 10.42.0.0:24268]
    I0724 10:18:51.727845       1 request.go:836] Request Body: {"kind":"SubjectAccessReview","apiVersion":"authorization.k8s.io/v1beta1","metadata":{"creationTimestamp":null},"spec":{"nonResourceAttributes":{"path":"/","verb":"get"},"user":"system:anonymous","group":["system:unauthenticated"]},"status":{"allowed":false}}
    ...
    {{% /accordion %}}
    
    

1. Check that the metrics API is accessible from kubectl.

  - If you are accessing the cluster directly, enter your Server URL in the kubectl config in the following format: `https://<Kubernetes_URL>:6443`.
    ```
    # kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1
    ```
    If the API is accessible, you should receive output that's similar to what follows.
    {{% accordion id="custom-metrics-api-response" label="API Response" %}}
    {"kind":"APIResourceList","apiVersion":"v1","groupVersion":"custom.metrics.k8s.io/v1beta1","resources":[{"name":"pods/fs_usage_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_rss","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_cpu_period","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_cfs_throttled","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_io_time","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_read","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_sector_writes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_user","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/last_seen","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/tasks_state","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_cpu_quota","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/start_time_seconds","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_limit_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_write","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_cache","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_usage_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_cfs_periods","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_cfs_throttled_periods","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_reads_merged","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_working_set_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/network_udp_usage","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_inodes_free","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_inodes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_io_time_weighted","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_failures","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_swap","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_cpu_shares","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_memory_swap_limit_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_usage","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_io_current","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_writes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_failcnt","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_reads","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_writes_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_writes_merged","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/network_tcp_usage","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_max_usage_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_memory_limit_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_memory_reservation_limit_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_load_average_10s","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_system","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_reads_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_sector_reads","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]}]}
    {{% /accordion %}}
    
  - If you are accessing the cluster through Rancher, enter your Server URL in the kubectl config in the following format: `https://<RANCHER_URL>/k8s/clusters/<CLUSTER_ID>`. Add the suffix `/k8s/clusters/<CLUSTER_ID>` to API path.
    ```
    # kubectl get --raw /k8s/clusters/<CLUSTER_ID>/apis/custom.metrics.k8s.io/v1beta1
    ```
    If the API is accessible, you should receive output that's similar to what follows.
    {{% accordion id="custom-metrics-api-response-rancher" label="API Response" %}}
    {"kind":"APIResourceList","apiVersion":"v1","groupVersion":"custom.metrics.k8s.io/v1beta1","resources":[{"name":"pods/fs_usage_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_rss","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_cpu_period","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_cfs_throttled","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_io_time","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_read","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_sector_writes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_user","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/last_seen","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/tasks_state","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_cpu_quota","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/start_time_seconds","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_limit_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_write","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_cache","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_usage_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_cfs_periods","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_cfs_throttled_periods","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_reads_merged","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_working_set_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/network_udp_usage","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_inodes_free","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_inodes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_io_time_weighted","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_failures","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_swap","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_cpu_shares","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_memory_swap_limit_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_usage","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_io_current","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_writes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_failcnt","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_reads","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_writes_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_writes_merged","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/network_tcp_usage","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/memory_max_usage_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_memory_limit_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/spec_memory_reservation_limit_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_load_average_10s","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/cpu_system","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_reads_bytes","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]},{"name":"pods/fs_sector_reads","singularName":"","namespaced":true,"kind":"MetricValueList","verbs":["get"]}]} 
    {{% /accordion %}}
   

#### Assigning Additional Required Roles to Your HPA

By default, HPA reads resource and custom metrics with the user `system:anonymous`. Assign `system:anonymous` the the `view-resource-metrics` and `view-custom-metrics` in the ClusterRole and ClusterRoleBindings manifests. These roles are used to access metrics. 

To do it, follow these steps:

1. Configure kubectl to connect to your cluster.

1. Copy the ClusterRole and ClusterRoleBinding manifest for the type of metrics you're using for your HPA.
  {{% accordion id="cluster-role-resource-metrics" label="Resource Metrics: ApiGroups resource.metrics.k8s.io" %}}
        apiVersion: rbac.authorization.k8s.io/v1
        kind: ClusterRole
        metadata:
          name: view-resource-metrics
        rules:
        - apiGroups:
            - metrics.k8s.io
          resources:
            - pods
            - nodes
          verbs:
            - get
            - list
            - watch
        ---
        apiVersion: rbac.authorization.k8s.io/v1
        kind: ClusterRoleBinding
        metadata:
          name: view-resource-metrics
        roleRef:
          apiGroup: rbac.authorization.k8s.io
          kind: ClusterRole
          name: view-resource-metrics
        subjects:
          - apiGroup: rbac.authorization.k8s.io
            kind: User
            name: system:anonymous
    {{% /accordion %}}
{{% accordion id="cluster-role-custom-resources" label="Custom Metrics: ApiGroups custom.metrics.k8s.io" %}}
 
  ```
  apiVersion: rbac.authorization.k8s.io/v1
  kind: ClusterRole
  metadata:
    name: view-custom-metrics
  rules:
  - apiGroups:
      - custom.metrics.k8s.io
    resources:
      - "*"
    verbs:
      - get
      - list
      - watch
  ---
  apiVersion: rbac.authorization.k8s.io/v1
  kind: ClusterRoleBinding
  metadata:
    name: view-custom-metrics
  roleRef:
    apiGroup: rbac.authorization.k8s.io
    kind: ClusterRole
    name: view-custom-metrics
  subjects:
    - apiGroup: rbac.authorization.k8s.io
      kind: User
      name: system:anonymous
  ```
{{% /accordion %}}
1. Create them in your cluster using one of the follow commands, depending on the metrics you're using.
 ```
  # kubectl create -f <RESOURCE_METRICS_MANIFEST>
  # kubectl create -f <CUSTOM_METRICS_MANIFEST>
  ```


### Testing HPAs with a Service Deployment

For HPA to work correctly, service deployments should have resources request definitions for containers. Follow this hello-world example to test if HPA is working correctly. 

1. Configure kubectl to connect to your Kubernetes cluster.

2. Copy the `hello-world` deployment manifest below.
{{% accordion id="hello-world" label="Hello World Manifest" %}}
      apiVersion: apps/v1beta2
              kind: Deployment
              metadata:
                labels:
                  app: hello-world
                name: hello-world
                namespace: default
              spec:
                replicas: 1
                selector:
                  matchLabels:
                    app: hello-world
                strategy:
                  rollingUpdate:
                    maxSurge: 1
                    maxUnavailable: 0
                  type: RollingUpdate
                template:
                  metadata:
                    labels:
                      app: hello-world
                  spec:
                    containers:
                    - image: rancher/hello-world
                      imagePullPolicy: Always
                      name: hello-world
                      resources:
                        requests:
                          cpu: 500m
                          memory: 64Mi
                      ports:
                      - containerPort: 80
                        protocol: TCP
                    restartPolicy: Always
              ---
              apiVersion: v1
              kind: Service
              metadata:
                name: hello-world
                namespace: default
              spec:
                ports:
                - port: 80
                  protocol: TCP
                  targetPort: 80
                selector:
                  app: hello-world
{{% /accordion %}}  
        
  

1. Deploy it to your cluster.

    ```
    # kubectl create -f <HELLO_WORLD_MANIFEST>
    ```

1. Copy one of the HPAs below based on the metric type you're using: 
    {{% accordion id="service-deployment-resource-metrics" label="Hello World HPA: Resource Metrics" %}}
     apiVersion: autoscaling/v2beta1
            kind: HorizontalPodAutoscaler
            metadata:
              name: hello-world
              namespace: default
            spec:
              scaleTargetRef:
                apiVersion: extensions/v1beta1
                kind: Deployment
                name: hello-world
              minReplicas: 1
              maxReplicas: 10
              metrics:
              - type: Resource
                resource:
                  name: cpu
                  targetAverageUtilization: 50
              - type: Resource
                resource:
                  name: memory
                  targetAverageValue: 1000Mi
    {{% /accordion %}}
    {{% accordion id="service-deployment-custom-metrics" label="Hello World HPA: Custom Metrics" %}}
    apiVersion: autoscaling/v2beta1
      kind: HorizontalPodAutoscaler
      metadata:
        name: hello-world
        namespace: default
      spec:
        scaleTargetRef:
          apiVersion: extensions/v1beta1
          kind: Deployment
          name: hello-world
        minReplicas: 1
        maxReplicas: 10
        metrics:
        - type: Resource
          resource:
            name: cpu
            targetAverageUtilization: 50
        - type: Resource
          resource:
            name: memory
            targetAverageValue: 100Mi
        - type: Pods
          pods:
            metricName: cpu_system
            targetAverageValue: 20m
    {{% /accordion %}}
  
1. View the HPA info and description. Confirm that metric data is shown.
    {{% accordion id="hpa-info-resource-metrics" label="Resource Metrics" %}}
1. Enter the following command.
    ```
    # kubectl get hpa
    ```
    You should receive the output that follows:
    ```
    NAME          REFERENCE                TARGETS                     MINPODS   MAXPODS   REPLICAS   AGE
    hello-world   Deployment/hello-world   1253376 / 100Mi, 0% / 50%   1         10        1          6m
        # kubectl describe hpa
    Name:                                                  hello-world
    Namespace:                                             default
    Labels:                                                <none>
    Annotations:                                           <none>
    CreationTimestamp:                                     Mon, 23 Jul 2018 20:21:16 +0200
    Reference:                                             Deployment/hello-world
    Metrics:                                               ( current / target )
      resource memory on pods:                             1253376 / 100Mi
      resource cpu on pods  (as a percentage of request):  0% (0) / 50%
    Min replicas:                                          1
    Max replicas:                                          10
    Conditions:
      Type            Status  Reason              Message
      ----            ------  ------              -------
      AbleToScale     True    ReadyForNewScale    the last scale time was sufficiently old as to warrant a new scale
      ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from memory resource
      ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
    Events:           <none>
    ```
    {{% /accordion %}}
    {{% accordion id="hpa-info-custom-metrics" label="Custom Metrics" %}}
1. Enter the following command.
    ```
    # kubectl describe hpa
    ```
    You should receive the output that follows.
    ```
    Name:                                                  hello-world
    Namespace:                                             default
    Labels:                                                <none>
    Annotations:                                           <none>
    CreationTimestamp:                                     Tue, 24 Jul 2018 18:36:28 +0200
    Reference:                                             Deployment/hello-world
    Metrics:                                               ( current / target )
      resource memory on pods:                             3514368 / 100Mi
      "cpu_system" on pods:                                0 / 20m
      resource cpu on pods  (as a percentage of request):  0% (0) / 50%
    Min replicas:                                          1
    Max replicas:                                          10
    Conditions:
      Type            Status  Reason              Message
      ----            ------  ------              -------
      AbleToScale     True    ReadyForNewScale    the last scale time was sufficiently old as to warrant a new scale
      ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from memory resource
      ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
    Events:           <none>
    ```
    {{% /accordion %}}

  
1. Generate a load for the service to test that your pods autoscale as intended. You can use any load-testing tool (Hey, Gatling, etc.), but we're using [Hey](https://github.com/rakyll/hey).

1. Test that pod autoscaling works as intended.<br/></br>
  **To Test Autoscaling Using Resource Metrics:**
  {{% accordion id="observe-upscale-2-pods-cpu" label="Upscale to 2 Pods: CPU Usage Up to Target" %}}
Use your load testing tool to to scale up to two pods based on CPU Usage.  
  
1. View your HPA.
    ```
    # kubectl describe hpa
    ```
    You should receive output similar to what follows.
    ```
    Name:                                                  hello-world
    Namespace:                                             default
    Labels:                                                <none>
    Annotations:                                           <none>
    CreationTimestamp:                                     Mon, 23 Jul 2018 22:22:04 +0200
    Reference:                                             Deployment/hello-world
    Metrics:                                               ( current / target )
      resource memory on pods:                             10928128 / 100Mi
      resource cpu on pods  (as a percentage of request):  56% (280m) / 50%
    Min replicas:                                          1
    Max replicas:                                          10
    Conditions:
      Type            Status  Reason              Message
      ----            ------  ------              -------
      AbleToScale     True    SucceededRescale    the HPA controller was able to update the target scale to 2
      ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from cpu resource utilization (percentage of request)
      ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
    Events:
      Type    Reason             Age   From                       Message
      ----    ------             ----  ----                       -------
      Normal  SuccessfulRescale  13s   horizontal-pod-autoscaler  New size: 2; reason: cpu resource utilization (percentage of request) above target
      ```
1. Enter the following command to confirm you've scaled to two pods.
   ```
      # kubectl get pods
   ```
   You should receive output similar to what follows:
   ```  
      NAME                                                     READY     STATUS    RESTARTS   AGE
      hello-world-54764dfbf8-k8ph2                             1/1       Running   0          1m
      hello-world-54764dfbf8-q6l4v                             1/1       Running   0          3h
   ```
  {{% /accordion %}}
  {{% accordion id="observe-upscale-3-pods-cpu-cooldown" label="Upscale to 3 pods: CPU Usage Up to Target" %}}
Use your load testing tool to upspace to 3 pods based on CPU usage with `horizontal-pod-autoscaler-upscale-delay` set to 3 minutes.

1. Enter the following command.
   ```
   # kubectl describe hpa
   ```
   You should receive output similar to what follows
   ```
      Name:                                                  hello-world
      Namespace:                                             default
      Labels:                                                <none>
      Annotations:                                           <none>
      CreationTimestamp:                                     Mon, 23 Jul 2018 22:22:04 +0200
      Reference:                                             Deployment/hello-world
      Metrics:                                               ( current / target )
        resource memory on pods:                             9424896 / 100Mi
        resource cpu on pods  (as a percentage of request):  66% (333m) / 50%
      Min replicas:                                          1
      Max replicas:                                          10
      Conditions:
        Type            Status  Reason              Message
        ----            ------  ------              -------
        AbleToScale     True    SucceededRescale    the HPA controller was able to update the target scale to 3
        ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from cpu resource utilization (percentage of request)
        ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
      Events:
        Type    Reason             Age   From                       Message
        ----    ------             ----  ----                       -------
        Normal  SuccessfulRescale  4m    horizontal-pod-autoscaler  New size: 2; reason: cpu resource utilization (percentage of request) above target
        Normal  SuccessfulRescale  16s   horizontal-pod-autoscaler  New size: 3; reason: cpu resource utilization (percentage of request) above target
    ```
2. Enter the following command to confirm three pods are running.
   ```
   # kubectl get pods
   ```
    You should receive output similar to what follows.
     ```
      NAME                                                     READY     STATUS    RESTARTS   AGE
      hello-world-54764dfbf8-f46kh                             0/1       Running   0          1m
      hello-world-54764dfbf8-k8ph2                             1/1       Running   0          5m
      hello-world-54764dfbf8-q6l4v                             1/1       Running   0          3h
      ```
  {{% /accordion %}}
  {{% accordion id="observe-downscale-1-pod" label="Downscale to 1 Pod: All Metrics Below Target" %}}
Use your load testing to to scale down to 1 pod when all metrics are below target for `horizontal-pod-autoscaler-downscale-delay` (5 minutes by default).

1. Enter the following command.
  ```
  # kubectl describe hpa
  ```
  You should receive output similar to what follows.
  ```
      Name:                                                  hello-world
      Namespace:                                             default
      Labels:                                                <none>
      Annotations:                                           <none>
      CreationTimestamp:                                     Mon, 23 Jul 2018 22:22:04 +0200
      Reference:                                             Deployment/hello-world
      Metrics:                                               ( current / target )
        resource memory on pods:                             10070016 / 100Mi
        resource cpu on pods  (as a percentage of request):  0% (0) / 50%
      Min replicas:                                          1
      Max replicas:                                          10
      Conditions:
        Type            Status  Reason              Message
        ----            ------  ------              -------
        AbleToScale     True    SucceededRescale    the HPA controller was able to update the target scale to 1
        ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from memory resource
        ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
      Events:
        Type    Reason             Age   From                       Message
        ----    ------             ----  ----                       -------
        Normal  SuccessfulRescale  10m   horizontal-pod-autoscaler  New size: 2; reason: cpu resource utilization (percentage of request) above target
        Normal  SuccessfulRescale  6m    horizontal-pod-autoscaler  New size: 3; reason: cpu resource utilization (percentage of request) above target
        Normal  SuccessfulRescale  1s    horizontal-pod-autoscaler  New size: 1; reason: All metrics below target
  ```
  {{% /accordion %}}
<br/>  
**To Test Autoscaling Using Custom Metrics:**
  {{% accordion id="custom-observe-upscale-2-pods-cpu" label="Upscale to 2 Pods: CPU Usage Up to Target" %}}
Use your load testing tool to upscale two pods based on CPU usage.

1. Enter the following command.
  ```  
    # kubectl describe hpa
  ```
  You should receive output similar to what follows.
  ```
    Name:                                                  hello-world
    Namespace:                                             default
    Labels:                                                <none>
    Annotations:                                           <none>
    CreationTimestamp:                                     Tue, 24 Jul 2018 18:01:11 +0200
    Reference:                                             Deployment/hello-world
    Metrics:                                               ( current / target )
      resource memory on pods:                             8159232 / 100Mi
      "cpu_system" on pods:                                7m / 20m
      resource cpu on pods  (as a percentage of request):  64% (321m) / 50%
    Min replicas:                                          1
    Max replicas:                                          10
    Conditions:
      Type            Status  Reason              Message
      ----            ------  ------              -------
      AbleToScale     True    SucceededRescale    the HPA controller was able to update the target scale to 2
      ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from cpu resource utilization (percentage of request)
      ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
    Events:
      Type    Reason             Age   From                       Message
      ----    ------             ----  ----                       -------
      Normal  SuccessfulRescale  16s   horizontal-pod-autoscaler  New size: 2; reason: cpu resource utilization (percentage of request) above target
  ```
1. Enter the following command to confirm two pods are running.
  ```
    # kubectl get pods
  ```
  You should receive output similar to what follows.
  ```  
        NAME                           READY     STATUS    RESTARTS   AGE
        hello-world-54764dfbf8-5pfdr   1/1       Running   0          3s
        hello-world-54764dfbf8-q6l82   1/1       Running   0          6h
  ```
  {{% /accordion %}}
{{% accordion id="observe-upscale-3-pods-cpu-cooldown-2" label="Upscale to 3 Pods: CPU Usage Up to Target" %}}
Use your load testing tool to scale up to three pods when the cpu_system usage limit is up to target.

1. Enter the following command.
   ```
   # kubectl describe hpa
   ```
   You should receive output similar to what follows:
   ```
      Name:                                                  hello-world
      Namespace:                                             default
      Labels:                                                <none>
      Annotations:                                           <none>
      CreationTimestamp:                                     Tue, 24 Jul 2018 18:01:11 +0200
      Reference:                                             Deployment/hello-world
      Metrics:                                               ( current / target )
        resource memory on pods:                             8374272 / 100Mi
        "cpu_system" on pods:                                27m / 20m
        resource cpu on pods  (as a percentage of request):  71% (357m) / 50%
      Min replicas:                                          1
      Max replicas:                                          10
      Conditions:
        Type            Status  Reason              Message
        ----            ------  ------              -------
        AbleToScale     True    SucceededRescale    the HPA controller was able to update the target scale to 3
        ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from cpu resource utilization (percentage of request)
        ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
      Events:
        Type    Reason             Age   From                       Message
        ----    ------             ----  ----                       -------
        Normal  SuccessfulRescale  3m    horizontal-pod-autoscaler  New size: 2; reason: cpu resource utilization (percentage of request) above target
        Normal  SuccessfulRescale  3s    horizontal-pod-autoscaler  New size: 3; reason: pods metric cpu_system above target
    ```
1. Enter the following command to confirm three pods are running.
   ```
   # kubectl get pods
   ```    
   You should receive output similar to what follows:
   ```
      # kubectl get pods
      NAME                           READY     STATUS    RESTARTS   AGE
      hello-world-54764dfbf8-5pfdr   1/1       Running   0          3m
      hello-world-54764dfbf8-m2hrl   1/1       Running   0          1s
      hello-world-54764dfbf8-q6l82   1/1       Running   0          6h
   ``` 
{{% /accordion %}}
{{% accordion id="observe-upscale-4-pods" label="Upscale to 4 Pods: CPU Usage Up to Target" %}}
Use your load testing tool to upscale to four pods based on CPU usage. `horizontal-pod-autoscaler-upscale-delay` is set to three minutes by default.

1. Enter the following command.
  ```
  # kubectl describe hpa
  ```
  You should receive output similar to what follows.
  ```
      Name:                                                  hello-world
      Namespace:                                             default
      Labels:                                                <none>
      Annotations:                                           <none>
      CreationTimestamp:                                     Tue, 24 Jul 2018 18:01:11 +0200
      Reference:                                             Deployment/hello-world
      Metrics:                                               ( current / target )
        resource memory on pods:                             8374272 / 100Mi
        "cpu_system" on pods:                                27m / 20m
        resource cpu on pods  (as a percentage of request):  71% (357m) / 50%
      Min replicas:                                          1
      Max replicas:                                          10
      Conditions:
        Type            Status  Reason              Message
        ----            ------  ------              -------
        AbleToScale     True    SucceededRescale    the HPA controller was able to update the target scale to 3
        ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from cpu resource utilization (percentage of request)
        ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
      Events:
        Type    Reason             Age   From                       Message
        ----    ------             ----  ----                       -------
        Normal  SuccessfulRescale  5m    horizontal-pod-autoscaler  New size: 2; reason: cpu resource utilization (percentage of request) above target
        Normal  SuccessfulRescale  3m    horizontal-pod-autoscaler  New size: 3; reason: pods metric cpu_system above target
        Normal  SuccessfulRescale  4s    horizontal-pod-autoscaler  New size: 4; reason: cpu resource utilization (percentage of request) above target
    ```
1.  Enter the following command to confirm four pods are running.
    ```
    # kubectl get pods
    ```
    You should receive output similar to what follows.
    ```
      NAME                           READY     STATUS    RESTARTS   AGE
      hello-world-54764dfbf8-2p9xb   1/1       Running   0          5m
      hello-world-54764dfbf8-5pfdr   1/1       Running   0          2m
      hello-world-54764dfbf8-m2hrl   1/1       Running   0          1s
      hello-world-54764dfbf8-q6l82   1/1       Running   0          6h
    ```
{{% /accordion %}}  
{{% accordion id="custom-metrics-observe-downscale-1-pod" label="Downscale to 1 Pod: All Metrics Below Target" %}}
Use your load testing tool to scale down to one pod when all metrics below target for `horizontal-pod-autoscaler-downscale-delay`.

1. Enter the following command.
    ```
    # kubectl describe hpa
    ```
    You should receive similar output to what follows.
    ```
        Name:                                                  hello-world
        Namespace:                                             default
        Labels:                                                <none>
        Annotations:                                           <none>
        CreationTimestamp:                                     Tue, 24 Jul 2018 18:01:11 +0200
        Reference:                                             Deployment/hello-world
        Metrics:                                               ( current / target )
          resource memory on pods:                             8101888 / 100Mi
          "cpu_system" on pods:                                8m / 20m
          resource cpu on pods  (as a percentage of request):  0% (0) / 50%
        Min replicas:                                          1
        Max replicas:                                          10
        Conditions:
          Type            Status  Reason              Message
          ----            ------  ------              -------
          AbleToScale     True    SucceededRescale    the HPA controller was able to update the target scale to 1
          ScalingActive   True    ValidMetricFound    the HPA was able to successfully calculate a replica count from memory resource
          ScalingLimited  False   DesiredWithinRange  the desired count is within the acceptable range
        Events:
          Type    Reason             Age   From                       Message
          ----    ------             ----  ----                       -------
          Normal  SuccessfulRescale  10m    horizontal-pod-autoscaler  New size: 2; reason: cpu resource utilization (percentage of request) above target
          Normal  SuccessfulRescale  8m    horizontal-pod-autoscaler  New size: 3; reason: pods metric cpu_system above target
          Normal  SuccessfulRescale  5m    horizontal-pod-autoscaler  New size: 4; reason: cpu resource utilization (percentage of request) above target
          Normal   SuccessfulRescale             13s               horizontal-pod-autoscaler  New size: 1; reason: All metrics below target
    ```
1. Enter the following command to confirm a single pods is running.
    ```
        # kubectl get pods
    ```
    You should receive output similar to what follows.
    ```        
        NAME                           READY     STATUS    RESTARTS   AGE
        hello-world-54764dfbf8-q6l82   1/1       Running   0          6h
    ```    
{{% /accordion %}}

### Conclusion

Horizontal Pod Autoscaling is a great way to automate the number of pod you have deployed for maximum efficiency. You can use it to accommodate deployment scale to real service load and to meet service level agreements.

By adjusting the `horizontal-pod-autoscaler-downscale-delay` and `horizontal-pod-autoscaler-upscale-delay` flag values, you can adjust the time needed before kube-controller scales your pods up or down.

We've demonstrated how to setup an HPA based on custom metrics provided by Prometheus. We used the `cpu_system` metric as an example, but you can use other metrics that monitor service performance, like `http_request_number`, `http_response_time`, etc.

>**Note:**To facilitate HPA use, we are working to integrate metric-server as an addon on RKE cluster deployments. This feature is included in RKE v0.1.9-rc2 for testing, but is not officially supported as of yet. It would be supported at rke v0.1.9. 