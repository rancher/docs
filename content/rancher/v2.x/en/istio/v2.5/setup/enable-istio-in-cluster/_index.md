---
title: 1. Enable Istio in the Cluster
weight: 1
aliases:
  - /rancher/v2.x/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster
  - /rancher/v2.x/en/istio/setup/enable-istio-in-cluster
---

>**Prerequisites:**
>
>- Only a user with the `cluster-admin` [Kubernetes default role](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) assigned can configure and install Istio in a Kubernetes cluster.
>- If you have pod security policies, you will need to install Istio with the CNI enabled. For details, see [this section.](./enable-istio-with-psp)
>- To install Istio on an RKE2 cluster, additional steps are enabled. For details, see [this section.](./rke2)

1. From the **Cluster Explorer**, navigate to available **Charts** in **Apps & Marketplace** 
1. Select the Istio chart from the rancher provided charts
1. If you have not already installed your own monitoring app, you will be prompted to install the rancher-monitoring app. Optional: Set your Selector or Scrape config options on rancher-monitoring app install. 
1. Optional: Configure member access and [resource limits]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/resources/) for the Istio components. Ensure you have enough resources on your worker nodes to enable Istio.
1. Optional: Make additional configuration changes to values.yaml if needed
1. Optional: Add additional resources or configuration via the [overlay file](#overlay-file)
1. Click **Install**.

**Result:** Istio is installed at the cluster level.

Automatic sidecar injection is disabled by default. To enable this, set the `sidecarInjectorWebhook.enableNamespacesByDefault=true` in the values.yaml on install or upgrade. This automatically enables Istio sidecar injection into all new namespaces that are deployed. 

**Note:** In clusters where:

 - The [Canal network plug-in]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#canal) is in use.
 - The Project Network Isolation option is enabled.
 - You install the Istio Ingress module

The Istio Ingress Gateway pod won't be able to redirect ingress traffic to the workloads by default. This is because all the namespaces will be innacessible from the namespace where Istio is installed. You have two options.


The first option is to add a new Network Policy in each of the namespaces where you intend to have ingress controlled by Istio. Your policy should include the following lines:

```
- podSelector:
    matchLabels:
      app: istio-ingressgateway
``` 
The second option is to move the `istio-system` namespace to the `system` project, which by default is excluded from the network isolation

## Additonal Config Options

### Overlay File

An Overlay File is designed to support extensive configuration of your Istio installation. It allows you to make changes to any values available in the [IstioOperator API](https://istio.io/latest/docs/reference/config/istio.operator.v1alpha1/). This will ensure you can customize the default installation to fit any scenario. 

The Overlay File will add configuration on top of the default installation that is provided from the Istio chart installation. This means you do not need to redefine the components that already defined for installation. 

For more information on Overlay Files, refer to the [documentation](https://istio.io/latest/docs/setup/install/istioctl/#configure-component-settings)

## Selectors & Scrape Configs

The Monitoring app sets `prometheus.prometheusSpec.ignoreNamespaceSelectors=false` which enables monitoring across all namespaces by default. This ensures you can view traffic, metrics and graphs for resources deployed in a namespace with `istio-injection=enabled` label. 

If you would like to limit prometheus to specific namespaces, set `prometheus.prometheusSpec.ignoreNamespaceSelectors=true`. Once you do this, you will need to add additional configuration to continue to monitor your resources. 

**Set ingnoreNamspaceSelectors to True** 

This limits monitoring to specific namespaces. 


1. From the **Cluster Explorer**, navigate to **Installed Apps** if Monitoring is already installed, or **Charts** in **Apps & Marketplace** 
1. If starting a new install, **Click** the **rancher-monitoring** chart, then in **Chart Options** click **Edit as Yaml**. 
1. If updating an existing installation, click on **Upgrade**, then in **Chart Options** click **Edit as Yaml**. 
1. Set`prometheus.prometheusSpec.ignoreNamespaceSelectors=true`
1. Complete install or upgrade

**Result:** Prometheus will be limited to specific namespaces  which means one of the following configurations will need to be set up to continue to view data in various dashboards

There are two different ways to enable prometheus to detect resources in other namespaces when `prometheus.prometheusSpec.ignoreNamespaceSelectors=true`: 

1. Add a Service Monitor or Pod Monitor in the namespace with the targets you want to scrape.
1. Add an `additionalScrapeConfig` to your rancher-monitoring instance to scrape all targets in all namespaces.

**Option 1: Create a Service Monitor or Pod Monitor** 

This option allows you to define which specific services or pods you would like monitored in a specific namespace. 

 >Usability tradeoff is that you have to create the service monitor / pod monitor per namespace since you cannot monitor across namespaces. 

 **Pre Requisite:** define a ServiceMonitor or PodMonitor for `<your namespace>`. Example ServiceMonitor is provided below. 

1. From the **Cluster Explorer**, open the kubectl shell
1. Run `kubectl create -f <name of service/pod monitor file>.yaml` if the file is stored locally in your cluster. 
1. Or run `cat<< EOF | kubectl apply -f -`, paste the file contents into the terminal, then run `EOF` to complete the command. 
1. If starting a new install, **Click** the **rancher-monitoring** chart and scroll down to **Preview Yaml**. 
1. Run `kubectl label namespace <your namespace> istio-injection=enabled` to enable the envoy sidecar injection

**Result:**  `<your namspace>` can be scraped by prometheus. 

**Example Service Monitor for Istio Proxies**

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



**Option 3: Set ingnoreNamspaceSelectors to False** 

This enables monitoring accross namespaces by giving prometheus additional scrape configurations. 

 >Usability tradeoff is that  all of prometheus' `additionalScrapeConfigs` are maintained in a single Secret. This could make upgrading difficult if monitoring is already deployed with additionalScrapeConfigs prior to installing Istio. 

1. If starting a new install, **Click** the **rancher-monitoring** chart, then in **Chart Options** click **Edit as Yaml**. 
1. If updating an existing installation, click on **Upgrade**, then in **Chart Options** click **Edit as Yaml**. 
1. If updating an existing installation, click on **Upgrade** and then **Preview Yaml**.
1. Set`prometheus.prometheusSpec.additionalScrapeConfigs` array to the **Additional Scrape Config** provided below. 
1. Complete install or upgrade

**Result:** All namespaces with the `istio-injection=enabled` label will be scraped by prometheus.

**Additional Scrape Config:**
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
