---
title: 7. Generate and View Traffic
weight: 7
aliases:
  - /rancher/v2.x/en/cluster-admin/tools/istio/setup/view-traffic
---

This section describes how to view the traffic that is being managed by Istio.

# The Kiali Traffic Graph

The Istio overpage provides a link to the Kiali dashboard. From the Kiali dashboard, you are able to view graphs for each namespace. The Kiali graph provides a powerful way to visualize the topology of your Istio service mesh. It shows you which services communicate with each other.

>**Prerequisite:** To enable traffic to show up in the graph, ensure you have enabled one of the [Selectors & Scrape Configs]({{<baseurl>}}/rancher/v2.x/en/istio/setup/enable-istio-in-cluster/#selectors-scrape-configs)options. If you do not have this configured, you will not see information on the graph. 

To see the traffic graph,

1. From the **Cluster Explorer**, select **Istio** from the nav dropdown.
1. Click the **Kiali** link on the Istio **Overview** page.
1. Click on **Graph** in the side nav.
1. Change the namespace in the **Namesace** dropdown to view the traffic for each namespace. 

If you refresh the URL to the BookInfo app several times, you should be able to see green arrows on the Kiali graph showing traffic to `v1` and `v3` of the `reviews` service. The control panel on the right side of the graph lets you configure details including how many minutes of the most recent traffic should be shown on the graph.

For additional tools and visualizations, you can go to Grafana, and Prometheus dashboards from the **Monitoring** **Overview** page
