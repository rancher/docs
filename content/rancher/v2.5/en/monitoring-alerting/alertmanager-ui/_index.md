---
title: Alertmanager UI
weight: 8
---

When `rancher-monitoring` is installed, the Prometheus Alertmanager UI is deployed, allowing you to view your alerts and the current Alertmanager configuration.

> This section assumes familiarity with how monitoring components work together. For more information about Alertmanager, see [this section.](../how-monitoring-works/#how-alertmanager-works)

# Accessing the Alertmanager UI

> **Prerequisite:** The `rancher-monitoring` application must be installed.

To see the Alertmanager UI, go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Alertmanager.**

**Result:** The Alertmanager UI opens in a new tab. For help with configuration, refer to the [official Alertmanager documentation.](https://prometheus.io/docs/alerting/latest/alertmanager/)

For more information on configuring Alertmanager in Rancher, see [this page.](./configuration/alertmanager)

<figcaption>The Alertmanager UI</figcaption>
![Alertmanager UI]({{<baseurl>}}/img/rancher/alertmanager-ui.png)