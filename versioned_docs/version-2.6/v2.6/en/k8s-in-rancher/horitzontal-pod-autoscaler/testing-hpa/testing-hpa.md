---
title: Testing HPAs with kubectl
weight: 3031
---

This document describes how to check the status of your HPAs after scaling them up or down with your load testing tool. For information on how to check the status from the Rancher UI (at least version 2.3.x), refer to [Managing HPAs with the Rancher UI]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl/).

For HPA to work correctly, service deployments should have resources request definitions for containers. Follow this hello-world example to test if HPA is working correctly.

1. Configure `kubectl` to connect to your Kubernetes cluster.

1. Copy the `hello-world` deployment manifest below.

   <details id="hello-world">
     <summary>Hello World Manifest</summary>

     ```
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
     ```

   </details>

1. Deploy it to your cluster.

    ```
    # kubectl create -f <HELLO_WORLD_MANIFEST>
    ```

1. Copy one of the HPAs below based on the metric type you're using:

   <details id="service-deployment-resource-metrics">
     <summary>Hello World HPA: Resource Metrics</summary>

     ```
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
     ```

   </details>
   <details id="service-deployment-custom-metrics">
     <summary>Hello World HPA: Custom Metrics</summary>

     ```
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
     ```

   </details>

1. View the HPA info and description. Confirm that metric data is shown.

   <details id="hpa-info-resource-metrics">
     <summary>Resource Metrics</summary>

     1. Enter the following commands.
         ```
         # kubectl get hpa
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

   </details>
   <details id="hpa-info-custom-metrics">
     <summary>Custom Metrics</summary>

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

   </details>

1. Generate a load for the service to test that your pods autoscale as intended. You can use any load-testing tool (Hey, Gatling, etc.), but we're using [Hey](https://github.com/rakyll/hey).

1. Test that pod autoscaling works as intended.<br/></br>
  **To Test Autoscaling Using Resource Metrics:**

   <details id="observe-upscale-2-pods-cpu">
     <summary>Upscale to 2 Pods: CPU Usage Up to Target</summary>

     Use your load testing tool to scale up to two pods based on CPU Usage.

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

   </details>
   <details id="observe-upscale-3-pods-cpu-cooldown">
     <summary>Upscale to 3 pods: CPU Usage Up to Target</summary>

     Use your load testing tool to upscale to 3 pods based on CPU usage with `horizontal-pod-autoscaler-upscale-delay` set to 3 minutes.

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

   </details>
   <details id="observe-downscale-1-pod">
     <summary>Downscale to 1 Pod: All Metrics Below Target</summary>

     Use your load testing to scale down to 1 pod when all metrics are below target for `horizontal-pod-autoscaler-downscale-delay` (5 minutes by default).

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

   </details>

   **To Test Autoscaling Using Custom Metrics:**

   <details id="custom-observe-upscale-2-pods-cpu">
     <summary>Upscale to 2 Pods: CPU Usage Up to Target</summary>

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

   </details>
   <details id="observe-upscale-3-pods-cpu-cooldown-2">
    <summary>Upscale to 3 Pods: CPU Usage Up to Target</summary>

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

   </details>
   <details id="observe-upscale-4-pods">
     <summary>Upscale to 4 Pods: CPU Usage Up to Target</summary>

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

   </details>
   <details id="custom-metrics-observe-downscale-1-pod">
     <summary>Downscale to 1 Pod: All Metrics Below Target</summary>

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

   </details>
