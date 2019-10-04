---
title: 7. Generate and View Traffic
weight: 7
---

This section describes how to view the traffic that is being managed by Istio.

To test and see if the BookInfo app deployed correctly, try to view it in a web browser using the Istio controller IP and port, combined with the request name specified in your Kubernetes gateway resource:

`<IP of Istio controller>:<Port of istio controller>/<URL specified in gateway>`

# The Kiali Traffic Graph

Rancher integrates a Kiali graph into the Rancher UI. The Kiali graph provides a powerful way to visualize the topology of your Istio service mesh. It shows you which services communicate with each other.

To see the traffic graph,

1. From the project view in Rancher, click **Resources > Istio.**
1. Go to the **Traffic Graph** tab. This tab has the Kiali network visualization integrated into the UI.

For additional tools and visualizations, you can go to each UI for Kiali, Jaeger, Grafana, and Prometheus by clicking their icons in the top right corner of the page.

# Viewing Traffic Metrics

Istio’s monitoring features provide visibility into the performance of all your services.

1. From the project view in Rancher, click **Resources > Istio.**
1. Go to the **Traffic Metrics** tab. After traffic is generated in your cluster, you should be able to see metrics for **Success Rate, Request Volume, 4xx Response Count, Project 5xx Response Count** and **Request Duration.**