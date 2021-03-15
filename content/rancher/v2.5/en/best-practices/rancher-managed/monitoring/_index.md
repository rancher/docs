---
title: Monitoring Best Practices
weight: 2
aliases:
  - /rancher/v2.5/en/best-practices/v2.5/rancher-managed/monitoring
---

Configuring sensible monitoring and alerting rules is vital for running any production workloads securely and reliably. This is not different when using Kubernetes and Rancher. Fortunately the integrated monitoring and alerting functionality makes this whole process a lot easier.

The [Rancher monitoring documentation]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/) describes how you can set up a complete Prometheus and Grafana stack. Out of the box this will scrape monitoring data from all system and Kubernetes components in your cluster and provide sensible dashboards and alerts for them to get started. But for a reliable setup, you also need to monitor your own workloads and adapt Prometheus and Grafana to your own specific use cases and cluster sizes. This document aims to give you best practices for this.

- [What to Monitor](#what-to-monitor)
- [Configuring Prometheus Resource Usage](#configuring-prometheus-resource-usage)
- [Scraping Custom Workloads](#scraping-custom-workloads)
- [Monitoring in a (Micro)Service Architecture](#monitoring-in-a-micro-service-architecture)
- [Real User Monitoring](#real-user-monitoring)
- [Security Monitoring](#security-monitoring)
- [Setting up Alerts](#setting-up-alerts)

# What to Monitor

Kubernetes itself, as well as applications running inside of it, form a distributed system where different components interact with each other. For the whole system and each individual component, you have to ensure performance, availability, reliability and scalability. A good resource with more details and information is Google's free [Site Reliability Engineering Book](https://landing.google.com/sre/sre-book/), especially the chapter about [Monitoring distributed systems](https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/).

# Configuring Prometheus Resource Usage

When installing the integrated monitoring stack, Rancher allows to configure several settings that are dependent on the size of your cluster and the workloads running in it. This chapter covers these in more detail.

### Storage and Data Retention

The amount of storage needed for Prometheus directly correlates to the amount of time series and labels that you store and the data retention you have configured. It is important to note that Prometheus is not meant to be used as a long-term metrics storage. Data retention time is usually only a couple of days and not weeks or months. The reason for this is that Prometheus does not perform any aggregation on its stored metrics. This is great because aggregation can dilute data, but it also means that the needed storage grows linearly over time without retention. 

One way to calculate the necessary storage is to look at the average size of a storage chunk in Prometheus with this query

```
rate(prometheus_tsdb_compaction_chunk_size_bytes_sum[1h]) / rate(prometheus_tsdb_compaction_chunk_samples_sum[1h])
```

Next, find out your data ingestion rate per second:

```
rate(prometheus_tsdb_head_samples_appended_total[1h])
```

and then multiply this with the retention time, adding a few percentage points as buffer:

```
average chunk size in bytes * ingestion rate per second * retention time in seconds * 1.1 = necessary storage in bytes
```

You can find more information about how to calculate the necessary storage in this [blog post](https://www.robustperception.io/how-much-disk-space-do-prometheus-blocks-use).

You can read more about the Prometheus storage concept in the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/storage).

### CPU and Memory Requests and Limits

In larger Kubernetes clusters Prometheus can consume quite a bit of memory. The amount of memory Prometheus needs directly correlates to the amount of time series and amount of labels it stores and the scrape interval in which these are filled.

You can find more information about how to calculate the necessary memory in this [blog post](https://www.robustperception.io/how-much-ram-does-prometheus-2-x-need-for-cardinality-and-ingestion).

The amount of necessary CPUs correlate with the amount of queries you are performing.

### Federation and Long-term Storage

Prometheus is not meant to store metrics for a long amount of time, but should only be used for short term storage.

In order to store some, or all metrics for a long time, you can leverage Prometheus' [remote read/write](https://prometheus.io/docs/prometheus/latest/storage/#remote-storage-integrations) capabilities to connect it to storage systems like [Thanos](https://thanos.io/), [InfluxDB](https://www.influxdata.com/), [M3DB](https://www.m3db.io/), or others. You can find an example setup in this [blog post](https://rancher.com/blog/2020/prometheus-metric-federation).

# Scraping Custom Workloads

While the integrated Rancher Monitoring already scrapes system metrics from a cluster's nodes and system components, the custom workloads that you deploy on Kubernetes should also be scraped for data. For that you can configure Prometheus to do an HTTP request to an endpoint of your applications in a certain interval. These endpoints should then return their metrics in a Prometheus format.

In general, you want to scrape data from all the workloads running in your cluster so that you can use them for alerts or debugging issues. Often, you recognize that you need some data only when you actually need the metrics during an incident. It is good, if it is already scraped and stored. Since Prometheus is only meant to be a short-term metrics storage, scraping and keeping lots of data is usually not that expensive. If you are using a long-term storage solution with Prometheus, you can then still decide which data you are actually persisting and keeping there.

### About Prometheus Exporters

A lot of 3rd party workloads like databases, queues or web-servers either already support exposing metrics in a Prometheus format, or there are so called exporters available that translate between the tool's metrics and the format that Prometheus understands. Usually you can add these exporters as additional sidecar containers to the workload's Pods. A lot of helm charts already include options to deploy the correct exporter. Additionally you can find a curated list of exports by SysDig on [promcat.io](https://promcat.io/) and on [ExporterHub](https://exporterhub.io/).

### Prometheus support in Programming Languages and Frameworks

To get your own custom application metrics into Prometheus, you have to collect and expose these metrics directly from your application's code. Fortunately, there are already libraries and integrations available to help with this for most popular programming languages and frameworks. One example for this is the Prometheus support in the [Spring Framework](https://docs.spring.io/spring-metrics/docs/current/public/prometheus).

### ServiceMonitors and PodMonitors

Once all your workloads expose metrics in a Prometheus format, you have to configure Prometheus to scrape it. Under the hood Rancher is using the [prometheus-operator](https://github.com/prometheus-operator/prometheus-operator). This makes it easy to add additional scraping targets with ServiceMonitors and PodMonitors. A lot of helm charts already include an option to create these monitors directly. You can also find more information in the Rancher documentation.

### Prometheus Push Gateway

There are some workloads that are traditionally hard to scrape by Prometheus. Examples for these are short lived workloads like Jobs and CronJobs, or applications that do not allow sharing data between individual handled incoming requests, like PHP applications.

To still get metrics for these use cases, you can set up [prometheus-pushgateways](https://github.com/prometheus/pushgateway). The CronJob or PHP application would push metric updates to the pushgateway. The pushgateway aggregates and exposes them through an HTTP endpoint, which then can be scraped by Prometheus.

### Prometheus Blackbox Monitor

Sometimes it is useful to monitor workloads from the outside. For this, you can use the [Prometheus blackbox-exporter](https://github.com/prometheus/blackbox_exporter) which allows probing any kind of endpoint over HTTP, HTTPS, DNS, TCP and ICMP.

# Monitoring in a (Micro)Service Architecture

If you have a (micro)service architecture where multiple individual workloads within your cluster are communicating with each other, it is really important to have detailed metrics and traces about this traffic to understand how all these workloads are communicating with each other and where a problem or bottleneck may be.

Of course you can monitor all this internal traffic in all your workloads and expose these metrics to Prometheus. But this can quickly become quite work intensive. Service Meshes like Istio, which can be installed with [a click](https://rancher.com/docs/rancher/v2.5/en/cluster-admin/tools/istio/) in Rancher, can do this automatically and provide rich telemetry about the traffic between all services.

# Real User Monitoring

Monitoring the availability and performance of all your internal workloads is vitally important to run stable, reliable and fast applications. But these metrics only show you parts of the picture. To get a complete view it is also necessary to know how your end users are actually perceiving it. For this you can look into various [Real user monitoring solutions](https://en.wikipedia.org/wiki/Real_user_monitoring).

# Security Monitoring

In addition to monitoring workloads to detect performance, availability or scalability problems, the cluster and the workloads running into it should also be monitored for potential security problems. A good starting point is to frequently run and alert on [CIS Scans]({{<baseurl>}}/rancher/v2.5/en/cis-scans/v2.5/) which check if the cluster is configured according to security best practices.

For the workloads, you can have a look at Kubernetes and Container security solutions like [Falko](https://falco.org/), [Aqua Kubernetes Security](https://www.aquasec.com/solutions/kubernetes-container-security/), [SysDig](https://sysdig.com/).

# Setting up Alerts

Getting all the metrics into a monitoring systems and visualizing them in dashboards is great, but you also want to be pro-actively alerted if something goes wrong.

The integrated Rancher monitoring already configures a sensible set of alerts that make sense in any Kubernetes cluster. You should extend these to cover your specific workloads and use cases.

When setting up alerts, configure them for all the workloads that are critical to the availability of your applications. But also make sure that they are not too noisy. Ideally every alert you are receiving should be because of a problem that needs your attention and needs to be fixed. If you have alerts that are firing all the time but are not that critical, there is a danger that you start ignoring your alerts all together and then miss the real important ones. Less may be more here. Start to focus on the real important metrics first, for example alert if your application is offline. Fix all the problems that start to pop up and then start to create more detailed alerts.

If an alert starts firing, but there is nothing you can do about it at the moment, it's also fine to silence the alert for a certain amount of time, so that you can look at it later.

You can find more information on how to set up alerts and notification channels in the [Rancher Documentation]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5).