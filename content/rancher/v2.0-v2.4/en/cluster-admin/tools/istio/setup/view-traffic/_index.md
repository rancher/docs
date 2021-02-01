---
title: 7. Generate and View Traffic
weight: 7
aliases:
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/istio/setup/view-traffic
  - /rancher/v2.0-v2.4/en/istio/legacy/setup/view-traffic
  - /rancher/v2.0-v2.4/en/istio/v2.3.x-v2.4.x/setup/view-traffic
---

This section describes how to view the traffic that is being managed by Istio.

# The Kiali Traffic Graph

Rancher integrates a Kiali graph into the Rancher UI. The Kiali graph provides a powerful way to visualize the topology of your Istio service mesh. It shows you which services communicate with each other.

To see the traffic graph,

1. From the project view in Rancher, click **Resources > Istio.**
1. Go to the **Traffic Graph** tab. This tab has the Kiali network visualization integrated into the UI.

If you refresh the URL to the BookInfo app several times, you should be able to see green arrows on the Kiali graph showing traffic to `v1` and `v3` of the `reviews` service. The control panel on the right side of the graph lets you configure details including how many minutes of the most recent traffic should be shown on the graph.

For additional tools and visualizations, you can go to each UI for Kiali, Jaeger, Grafana, and Prometheus by clicking their icons in the top right corner of the page.

# Viewing Traffic Metrics

Istio’s monitoring features provide visibility into the performance of all your services.

1. From the project view in Rancher, click **Resources > Istio.**
1. Go to the **Traffic Metrics** tab. After traffic is generated in your cluster, you should be able to see metrics for **Success Rate, Request Volume, 4xx Response Count, Project 5xx Response Count** and **Request Duration.**