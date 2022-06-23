---
title: Setting up Monitoring for a Workload
weight: 4
---

- [Display CPU and Memory Metrics for a Workload](#display-cpu-and-memory-metrics-for-a-workload)
- [Setting up Metrics Beyond CPU and Memory](#setting-up-metrics-beyond-cpu-and-memory)

If you only need CPU and memory time series for the workload, you don't need to deploy a ServiceMonitor or PodMonitor because the monitoring application already collects metrics data on resource usage by default.

The steps for setting up monitoring for workloads depend on whether you want basic metrics such as CPU and memory for the workload, or whether you want to scrape custom metrics from the workload.

If you only need CPU and memory time series for the workload, you don't need to deploy a ServiceMonitor or PodMonitor because the monitoring application already collects metrics data on resource usage by default. The resource usage time series data is in Prometheus's local time series database.

Grafana shows the data in aggregate, but you can see the data for the individual workload by using a PromQL query that extracts the data for that workload. Once you have the PromQL query, you can execute the query individually in the Prometheus UI and see the time series visualized there, or you can use the query to customize a Grafana dashboard to display the workload metrics. For examples of PromQL queries for workload metrics, see [this section.](https://rancher.com/docs/rancher/v2.6/en/monitoring-alerting/expression/#workload-metrics)

To set up custom metrics for your workload, you will need to set up an exporter and create a new ServiceMonitor custom resource to configure Prometheus to scrape metrics from your exporter.

### Display CPU and Memory Metrics for a Workload

By default, the monitoring application already scrapes CPU and memory.

To get some fine-grained detail for a particular workload, you can customize a Grafana dashboard to display the metrics for a particular workload.

### Setting up Metrics Beyond CPU and Memory

For custom metrics, you will need to expose the metrics on your application in a format supported by Prometheus.

Then we recommend that you should create a new ServiceMonitor custom resource. When this resource is created, the Prometheus custom resource will be automatically updated so that its scrape configuration includes the new custom metrics endpoint. Then Prometheus will begin scraping metrics from the endpoint.

You can also create a PodMonitor to expose the custom metrics endpoint, but ServiceMonitors are more appropriate for the majority of use cases.
