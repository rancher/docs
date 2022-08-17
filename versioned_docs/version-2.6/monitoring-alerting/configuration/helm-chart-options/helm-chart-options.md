---
title: Helm Chart Options
weight: 8
---

- [Configuring Resource Limits and Requests](#configuring-resource-limits-and-requests)
- [Trusted CA for Notifiers](#trusted-ca-for-notifiers)
- [Additional Scrape Configurations](#additional-scrape-configurations)
- [Configuring Applications Packaged within Monitoring V2](#configuring-applications-packaged-within-monitoring-v2)
- [Increase the Replicas of Alertmanager](#increase-the-replicas-of-alertmanager)
- [Configuring the Namespace for a Persistent Grafana Dashboard](#configuring-the-namespace-for-a-persistent-grafana-dashboard)


# Configuring Resource Limits and Requests

The resource requests and limits can be configured when installing `rancher-monitoring`.

The default values are in the [values.yaml](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring/values.yaml) in the `rancher-monitoring` Helm chart.

The default values in the table below are the minimum required resource limits and requests.

| Resource Name | Memory Limit | CPU Limit | Memory Request | CPU Request |
| ------------- | ------------ | ----------- | ---------------- | ------------------ |
| alertmanager | 500Mi | 1000m | 100Mi |  100m |
| grafana | 200Mi | 200m | 100Mi | 100m |
| kube-state-metrics subchart | 200Mi  | 100m | 130Mi | 100m |
| prometheus-node-exporter subchart | 50Mi | 200m | 30Mi | 100m |
| prometheusOperator | 500Mi | 200m | 100Mi | 100m |
| prometheus | 2500Mi | 1000m | 1750Mi | 750m |
| **Total**                 | **3950Mi** | **2700m** | **2210Mi** | **1250m** |

At least 50Gi storage is recommended.


# Trusted CA for Notifiers

If you need to add a trusted CA to your notifier, follow these steps:

1. Create the `cattle-monitoring-system` namespace.
1. Add your trusted CA secret to the `cattle-monitoring-system` namespace.
1. Deploy or upgrade the `rancher-monitoring` Helm chart. In the chart options, reference the secret in **Alerting > Additional Secrets**.

**Result:** The default Alertmanager custom resource will have access to your trusted CA.


# Additional Scrape Configurations

If the scrape configuration you want cannot be specified via a ServiceMonitor or PodMonitor at the moment, you can provide an `additionalScrapeConfigSecret` on deploying or upgrading `rancher-monitoring`.

A [scrape_config section](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config) specifies a set of targets and parameters describing how to scrape them. In the general case, one scrape configuration specifies a single job.

An example of where this might be used is with Istio. For more information, see [this section.]({{<baseurl>}}/rancher/v2.6/en/istio/configuration-reference/selectors-and-scrape)


# Configuring Applications Packaged within Monitoring v2

We deploy kube-state-metrics and node-exporter with monitoring v2. Node exporter are deployed as DaemonSets. In the monitoring v2 helm chart, in the values.yaml, each of the things are deployed as sub charts.

We also deploy grafana which is not managed by prometheus.

If you look at what the helm chart is doing like in kube-state-metrics, there are plenty more values that you can set that aren’t exposed in the top level chart. 

But in the top level chart you can add values that override values that exist in the sub chart.

### Increase the Replicas of Alertmanager

As part of the chart deployment options, you can opt to increase the number of replicas of the Alertmanager deployed onto your cluster. The replicas can all be managed using the same underlying Alertmanager Config Secret. For more information on the Alertmanager Config Secret, refer to [this section.](../advanced/alertmanager/#multiple-alertmanager-replicas)

### Configuring the Namespace for a Persistent Grafana Dashboard

To specify that you would like Grafana to watch for ConfigMaps across all namespaces, set this value in the `rancher-monitoring` Helm chart:

```
grafana.sidecar.dashboards.searchNamespace=ALL
```

Note that the RBAC roles exposed by the Monitoring chart to add Grafana Dashboards are still restricted to giving permissions for users to add dashboards in the namespace defined in `grafana.dashboards.namespace`, which defaults to `cattle-dashboards`.