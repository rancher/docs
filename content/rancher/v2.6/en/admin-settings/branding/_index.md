---
title: Custom Branding
weight: 90
---

Rancher v2.6 introduced the ability to customize Rancher’s branding and navigation links.

- [Changing Brand Settings](#changing-brand-settings)
- [Custom Navigation Links in Cluster Explorer](#custom-navigation-links-in-cluster-explorer)

# Changing Brand Settings

To configure the brand settings, 

1. Click **≡ > Global settings**.
2. Click **Branding**.

# Brand Configuration

### Private Label Company Name

This option replaces “Rancher” with the value you provide in most places. Files that need to have Rancher in the name, such as “rancher-compose.yml”, will not be changed.

### Support Links

Use a url address to send new "File an Issue" reports instead of sending users to the Github issues page. Optionally show Rancher community support links.

### Logo

Upload light and dark logos to replace the Rancher logo in the top-level navigation header.

### Primary Color

You can override the primary color used throughout the UI with a custom color of your choice.

### Fixed Banners

Display a custom fixed banner in the header, footer, or both.

# Custom Navigation Links in Cluster Explorer

The links in the left navigation menu in Cluster Explorer can be customized.

It can be useful to add a link for quick access to services installed on a cluster. For example, you could add a link to the Kiali UI for clusters with Istio installed, or you could add a link to the Grafana UI for clusters with Rancher monitoring installed.

The custom links don't affect who has access to each service.

Links can be created at the top level and multiple links can be grouped together.

### Adding a Custom Navigation Link

1. In Rancher, go to the Cluster Explorer view where you would like to add custom navigation links.
2. In the top navigation menu, click **🔍 (Resource Search)**.
3. Type **Nav** and click **Nav Links**.
4. Click **Create from YAML.**
5. Create a new navigation link with these fields:

        Name: linkname
        group: GroupName
        toURL: https://example.com
6. Click **Create.**

### Example

This example NavLink YAML shows an example of configuring a NavLink to a Grafana dashboard:

```yaml
apiVersion: ui.cattle.io/v1
kind: NavLink
metadata:
  name: grafana
spec:
  group: "Monitoring Dashboards"
  toURL: https://<RANCHER_SERVER_URL>/api/v1/namespaces/cattle-monitoring-system/services/http:rancher-monitoring-grafana:80/proxy/?orgId=1
```

Adding the above YAML results in a link to Grafana being created, as shown in the following screenshot:

![Screenshot of Grafana Link]({{< baseurl >}}/img/rancher/example-grafana-link.png)
