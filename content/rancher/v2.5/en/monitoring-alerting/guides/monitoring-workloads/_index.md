---
title: Setting up Monitoring for a Workload
weight: 4
---

- [Display CPU and Memory Metrics for a Workload](#display-cpu-and-memory-metrics-for-a-workload)
- [Setting up Metrics Beyond CPU and Memory](#setting-up-metrics-beyond-cpu-and-memory)

If you only need CPU and memory time series for the workload, you don't need to deploy a ServiceMonitor or PodMonitor because the monitoring application already collects metrics data on resource usage by default.




The steps for setting up monitoring for workloads depends on whether you want basic metrics such as CPU and memory for the workload, or whether you want to scrape custom metrics from the workload.

If you only need CPU and memory time series for the workload, you don't need to deploy a ServiceMonitor or PodMonitor because the monitoring application already collects metrics data on resource usage by default. The resource usage time series data is in Prometheus's local time series database. Grafana shows the data in aggregate, but you can see the data for the individual workload by using a PromQL query that extracts the data for that workload. Once you have the PromQL query, you can execute the query individually in the Prometheus UI and see the time series visualized there, or you can use the query to customize a Grafana dashboard to display the workload metrics. For examples of PromQL queries for workload metrics, see [this section.](https://rancher.com/docs/rancher/v2.5/en/monitoring-alerting/configuration/expression/#workload-metrics)

To set up custom metrics for your workload, you will need to set up an exporter and create a new ServiceMonitor custom resource to configure Prometheus to scrape metrics from your exporter.

For more information, see [this section.](./monitoring-workloads)





explain how some applications come with a servicemonitor packaged within them

for example, some rancher applications come with servicemonitors (link to section)

### Display CPU and Memory Metrics for a Workload

By default, the monitoring application already scrapes CPU and memory.

To get some fine-grained detail for a particular workload, you can customize a Grafana dashboard to display the metrics for a particular workload.

- there’s already a wealth of information provided by kube-state-metrics. Cpu utilization, memory utilization for different things across namespaces. If you just want resource metrics for prod, you don’t need to create a new ServiceMonitor for it. All you need to do is go to the prometheus UI and do a PromQL query to get the information.

For more information on customizing Grafana to show the workload metrics, see this section. (Link)


### Setting up Metrics Beyond CPU and Memory

For custom metrics, you will need to expose the metrics on your application in a format supported by Prometheus.

Then we recommend that you should create a new ServiceMonitor custom resource. When this resource is created, the Prometheus custom resource will be automatically updated so that its scrape configuration includes the new custom metrics endpoint. Then Prometheus will begin scraping metrics from the endpoint.

You can also create a PodMonitor to expose the custom metrics endpoint, but ServiceMonitors are more appropriate for the majority of use cases.

- let’s say we expose metrics at a particular endpoint. Let’s take rancher-monitoring-kube-state-metrics. For example they have a container port where they expose metrics from. 
	- the approach I would take - although we don’t have a clean UI from it - is to create it from YAML.
	- for something like for grafana we’d create it like this - like for rancher-monitoring-grafana - where the basic details we need to provide are:
		- what is the actual endpoint that you want to hit (spec.endpoints, path and port) - what’s the HTTP path that you want to hit and what’s the port.
		- namespaceSelector: what namespaces does that particular deployment exist in within Kubernetes, and use matchNames to select them.
		- you can also use selector.matchLabels.
		- That’s what it takes to add monitoring if a serviceMonitor is not already defined.
		- example: use the rancher-monitoring-grafana YAML