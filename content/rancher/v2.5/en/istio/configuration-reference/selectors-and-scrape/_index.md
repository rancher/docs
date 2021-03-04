---
title: Selectors and Scrape Configs
weight: 2
aliases:
  - /rancher/v2.5/en/istio/v2.5/configuration-reference/selectors-and-scrape
  - /rancher/v2.5/en/cluster-admin/tools/istio/setup/node-selectors
---

The Monitoring app sets `prometheus.prometheusSpec.ignoreNamespaceSelectors=false`, which enables monitoring across all namespaces by default.

This ensures you can view traffic, metrics and graphs for resources deployed in a namespace with `istio-injection=enabled` label. 

If you would like to limit Prometheus to specific namespaces, set `prometheus.prometheusSpec.ignoreNamespaceSelectors=true`. Once you do this, you will need to add additional configuration to continue to monitor your resources.

- [Limiting Monitoring to Specific Namespaces by Setting ignoreNamespaceSelectors to True](#limiting-monitoring-to-specific-namespaces-by-setting-ignorenamespaceselectors-to-true)
- [Enabling Prometheus to Detect Resources in Other Namespaces](#enabling-prometheus-to-detect-resources-in-other-namespaces)
- [Monitoring Specific Namespaces: Create a Service Monitor or Pod Monitor](#monitoring-specific-namespaces-create-a-service-monitor-or-pod-monitor)
- [Monitoring Across Namespaces: Set ignoreNamespaceSelectors to False](#monitoring-across-namespaces-set-ignorenamespaceselectors-to-false)

### Limiting Monitoring to Specific Namespaces by Setting ignoreNamespaceSelectors to True

This limits monitoring to specific namespaces. 

1. From the **Cluster Explorer**, navigate to **Installed Apps** if Monitoring is already installed, or **Charts** in **Apps & Marketplace** 
1. If starting a new install, **Click** the **rancher-monitoring** chart, then in **Chart Options** click **Edit as Yaml**. 
1. If updating an existing installation, click on **Upgrade**, then in **Chart Options** click **Edit as Yaml**. 
1. Set`prometheus.prometheusSpec.ignoreNamespaceSelectors=true`
1. Complete install or upgrade

**Result:** Prometheus will be limited to specific namespaces  which means one of the following configurations will need to be set up to continue to view data in various dashboards

### Enabling Prometheus to Detect Resources in Other Namespaces

There are two different ways to enable Prometheus to detect resources in other namespaces when `prometheus.prometheusSpec.ignoreNamespaceSelectors=true`: 

- **Monitoring specific namespaces:** Add a Service Monitor or Pod Monitor in the namespace with the targets you want to scrape.
- **Monitoring across namespaces:** Add an `additionalScrapeConfig` to your rancher-monitoring instance to scrape all targets in all namespaces.

### Monitoring Specific Namespaces: Create a Service Monitor or Pod Monitor

This option allows you to define which specific services or pods you would like monitored in a specific namespace. 

The usability tradeoff is that you have to create the service monitor or pod monitor per namespace since you cannot monitor across namespaces.

> **Prerequisite:** Define a ServiceMonitor or PodMonitor for `<your namespace>`. An example ServiceMonitor is provided below. 

1. From the **Cluster Explorer**, open the kubectl shell
1. Run `kubectl create -f <name of service/pod monitor file>.yaml` if the file is stored locally in your cluster. 
1. Or run `cat<< EOF | kubectl apply -f -`, paste the file contents into the terminal, then run `EOF` to complete the command. 
1. If starting a new install, **Click** the **rancher-monitoring** chart and scroll down to **Preview Yaml**. 
1. Run `kubectl label namespace <your namespace> istio-injection=enabled` to enable the envoy sidecar injection

**Result:**  `<your namespace>` can be scraped by prometheus. 

<figcaption>Example Service Monitor for Istio Proxies</figcaption>

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: envoy-stats-monitor
  namespace: istio-system
  labels:
    monitoring: istio-proxies
spec:
  selector:
    matchExpressions:
    - {key: istio-prometheus-ignore, operator: DoesNotExist}
  namespaceSelector:
    any: true
  jobLabel: envoy-stats
  endpoints:
  - path: /stats/prometheus
    targetPort: 15090
    interval: 15s
    relabelings:
    - sourceLabels: [__meta_kubernetes_pod_container_port_name]
      action: keep
      regex: '.*-envoy-prom'
    - action: labeldrop
      regex: "__meta_kubernetes_pod_label_(.+)"
    - sourceLabels: [__meta_kubernetes_namespace]
      action: replace
      targetLabel: namespace
    - sourceLabels: [__meta_kubernetes_pod_name]
      action: replace
      targetLabel: pod_name
```

### Monitoring across namespaces: Set ignoreNamespaceSelectors to False

This enables monitoring across namespaces by giving Prometheus additional scrape configurations. 

The usability tradeoff is that  all of Prometheus' `additionalScrapeConfigs` are maintained in a single Secret. This could make upgrading difficult if monitoring is already deployed with additionalScrapeConfigs before installing Istio. 

1. If starting a new install, **Click** the **rancher-monitoring** chart, then in **Chart Options** click **Edit as Yaml**. 
1. If updating an existing installation, click on **Upgrade**, then in **Chart Options** click **Edit as Yaml**. 
1. If updating an existing installation, click on **Upgrade** and then **Preview Yaml**.
1. Set`prometheus.prometheusSpec.additionalScrapeConfigs` array to the **Additional Scrape Config** provided below. 
1. Complete install or upgrade

**Result:** All namespaces with the `istio-injection=enabled` label will be scraped by prometheus.

<figcaption>Additional Scrape Config</figcaption>

``` yaml
- job_name: 'istio/envoy-stats'
  scrape_interval: 15s
  metrics_path: /stats/prometheus
  kubernetes_sd_configs:
    - role: pod
  relabel_configs:
    - source_labels: [__meta_kubernetes_pod_container_port_name]
      action: keep
      regex: '.*-envoy-prom'
    - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
      action: replace
      regex: ([^:]+)(?::\d+)?;(\d+)
      replacement: $1:15090
      target_label: __address__
    - action: labelmap
      regex: __meta_kubernetes_pod_label_(.+)
    - source_labels: [__meta_kubernetes_namespace]
      action: replace
      target_label: namespace
    - source_labels: [__meta_kubernetes_pod_name]
      action: replace
      target_label: pod_name
``` 
