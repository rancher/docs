---
title: Debugging High Memory Usage
weight: 8
---

Every time series in Prometheus is uniquely identified by its [metric name](https://prometheus.io/docs/practices/naming/#metric-names) and optional key-value pairs called [labels.](https://prometheus.io/docs/practices/naming/#labels)

The labels allow the ability to filter and aggregate the time series data, but they also multiply the amount of data that Prometheus collects.

Each time series has a defined set of labels, and Prometheus generates a new time series for all unique combinations of labels. If a metric has two labels attached, two time series are generated for that metric. Changing any label value, including adding or removing a label, will create a new time series.

Prometheus is optimized to store data that is index-based on series. It is designed for a relatively consistent number of time series and a relatively large number of samples that need to be collected from the exporters over time.

Inversely, Prometheus is not optimized to accommodate a rapidly changing number of time series. For that reason, large bursts of memory usage can occur when monitoring is installed on clusters where many resources are being created and destroyed, especially on multi-tenant clusters.

### Reducing Memory Bursts

To reduce memory consumption, Prometheus can be configured to store fewer time series, by scraping fewer metrics or by attaching fewer labels to the time series. To see which series use the most memory, you can check the TSDB (time series database) status page in the Prometheus UI.

Distributed Prometheus solutions such as [Thanos](https://thanos.io/) and [Cortex](https://cortexmetrics.io/) use an alternate architecture in which multiple small Prometheus instances are deployed. In the case of Thanos, the metrics from each Prometheus are aggregated into the common Thanos deployment, and then those metrics are exported to a persistent store, such as S3. This more robust architecture avoids burdening any single Prometheus instance with too many time series, while also preserving the ability to query metrics on a global level.