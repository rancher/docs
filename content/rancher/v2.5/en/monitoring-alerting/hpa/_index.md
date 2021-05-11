# Setting up Metrics for HPA

- kube-state-metrics: monitors internal K8s components
- 
For HPA it’s important to talk about kubernetes metrics APIs. For every rke cluster, metrics server is added on. HPA can hit that, can scale up or down based on pod or node usage. 

We package Prometheus Adapter. It implements a k8s metrics api, says I want to expose these metrics in the k8s api so it can be used for HPA.


- kubernetes metrics APIs are implemented as adapters.
- the default adapter that has been implemented for a long time is the resource metrics API. This is why when you deploy RKE, the default API that is added on is metrics server.
- Metrics server is a kubernetes project that is an adapter that implements the resource metrics API. It collects different node metrics and stores it in a way that is accessible by HPA.
- If you want prometheus metrics to be stored on the Kubernetes API for you to be able to do HPA on, then the relevant way to configure that is by using Prometheus Adapter. It is packaged by default in monitoring v2, but not v1.
	- if you want to do the custom metrics API, there is a secret for Prometheus Adapter that you can modify that will start exposing selected metrics from Prometheus onto those APIs, which can then be consumed by HPA.
- resource metrics: implemented by metrics-server, deployed as an RKE add-on
- custom metrics Api: implemented by Prometheus Adapter, exposed for use within the cluster (e.g. HPA)
- External Metrics API: implemented by Prometheus Adapter, exposed for use outside the cluster.


Kubernetes metrics API
- for HPA, how do I query prometheus to use that?
- prometheus stores data within its own time series database
- there are times when you also want to expose that within kubernetes itself, so that things like HPA can use it.
- k8s has metrics apis that are implemented as adapters
- big one is metrics API
