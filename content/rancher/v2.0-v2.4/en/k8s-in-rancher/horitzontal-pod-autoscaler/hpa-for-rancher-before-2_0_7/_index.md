---
title: Manual HPA Installation for Clusters Created Before Rancher v2.0.7
weight: 3050
aliases:
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/horizontal-pod-autoscaler/hpa-for-rancher-before-2_0_7
---

This section describes how to manually install HPAs for clusters created with Rancher before v2.0.7. This section also describes how to configure your HPA to scale up or down, and how to assign roles to your HPA.

Before you can use HPA in your Kubernetes cluster, you must fulfill some requirements.

### Requirements

Be sure that your Kubernetes cluster services are running with these flags at minimum:

- kube-api: `requestheader-client-ca-file`
- kubelet: `read-only-port` at 10255
- kube-controller: Optional, just needed if distinct values than default are required.

  - `horizontal-pod-autoscaler-downscale-delay: "5m0s"`
  - `horizontal-pod-autoscaler-upscale-delay: "3m0s"`
  - `horizontal-pod-autoscaler-sync-period: "30s"`

For an RKE Kubernetes cluster definition, add this snippet in the `services` section. To add this snippet using the Rancher v2.0 UI, open the **Clusters** view and select **&#8942; > Edit** for the cluster in which you want to use HPA. Then, from **Cluster Options**, click **Edit as YAML**. Add the following snippet to the `services` section:

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

>**Note:** `kubectl` command samples in the sections that follow were tested in a cluster running Rancher v2.0.6 and Kubernetes v1.10.1.

### Configuring HPA to Scale Using Resource Metrics

To create HPA resources based on resource metrics such as CPU and memory use, you need to deploy the `metrics-server` package in the `kube-system` namespace of your Kubernetes cluster. This deployment allows HPA to consume the `metrics.k8s.io` API.

>**Prerequisite:** You must be running `kubectl` 1.8 or later.

1. Connect to your Kubernetes cluster using `kubectl`.

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
    Then review the log to confirm that the `metrics-server` package is running.
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


1. Check that the metrics api is accessible from `kubectl`.


  - If you are accessing the cluster through Rancher, enter your Server URL in the `kubectl` config in the following format: `https://<RANCHER_URL>/k8s/clusters/<CLUSTER_ID>`. Add the suffix `/k8s/clusters/<CLUSTER_ID>` to API path.
    ```
    # kubectl get --raw /k8s/clusters/<CLUSTER_ID>/apis/metrics.k8s.io/v1beta1
    ```
    If the API is working correctly, you should receive output similar to the output below.
    ```
    {"kind":"APIResourceList","apiVersion":"v1","groupVersion":"metrics.k8s.io/v1beta1","resources":[{"name":"nodes","singularName":"","namespaced":false,"kind":"NodeMetrics","verbs":["get","list"]},{"name":"pods","singularName":"","namespaced":true,"kind":"PodMetrics","verbs":["get","list"]}]}
    ```

  - If you are accessing the cluster directly, enter your Server URL in the kubectl config in the following format: `https://<K8s_URL>:6443`.
    ```
    # kubectl get --raw /apis/metrics.k8s.io/v1beta1
    ```
    If the API is working correctly, you should receive output similar to the output below.
    ```
    {"kind":"APIResourceList","apiVersion":"v1","groupVersion":"metrics.k8s.io/v1beta1","resources":[{"name":"nodes","singularName":"","namespaced":false,"kind":"NodeMetrics","verbs":["get","list"]},{"name":"pods","singularName":"","namespaced":true,"kind":"PodMetrics","verbs":["get","list"]}]}
    ```

### Assigning Additional Required Roles to Your HPA

By default, HPA reads resource and custom metrics with the user `system:anonymous`. Assign `system:anonymous` to `view-resource-metrics` and `view-custom-metrics` in the ClusterRole and ClusterRoleBindings manifests. These roles are used to access metrics.

To do it, follow these steps:

1. Configure `kubectl` to connect to your cluster.

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
