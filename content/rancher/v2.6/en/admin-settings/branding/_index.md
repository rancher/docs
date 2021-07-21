---
title: Custom Branding
weight: 90
---

Rancher v2.6 introduced the ability to customize Rancher’s branding and navigation links.

- [Changing Brand Settings](#changing-brand-settings)
- [Brand Configuration](#brand-configuration)
- [Custom Navigation Links in Cluster Explorer](#custom-navigation-links-in-cluster-explorer)
- [Link Configuration](#link-configuration)
- [Link Example](#example)

# Changing Brand Settings

> **Prerequisite:** You will need to have at least cluster member permissions.

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

> **Prerequisite:** You will need to have at least cluster member or project member permissions.

1. In Rancher, go to the Cluster Explorer view where you would like to add custom navigation links.
2. In the top navigation menu, click **🔍 (Resource Search)**.
3. Type **Nav** and click **Nav Links**.
4. Click **Create from YAML.**
5. Create a new navigation link with these fields:

        name: linkname
        group: GroupName
        toURL: https://example.com
6. Click **Create.**

# Link Configuration

### `name` 

Display name for the link. Required.

### `group`

Name of a group of links that expands when clicked.

### `iconSrc`

URL pointing to the icon representing the link.

### `label` 

A Kubernetes label for the NavLink custom resource

### `sideLabel`

Label that appears in the left navigation bar

### `target`

Sets the target property of the link, which (depending on browsers) determines if it opens in a new window or in an existing tab.

### `toService`

Has five fields that are constructed to create a URL like the following: `https://<RANCHER_SERVER_URL>/k8s/clusters/<CLUSTER>/k8s/namespace/<NAMESPACE>/service/<SCHEME>:<NAME>:<PORT>/proxy/<PATH>

For example, a link to a monitoring service can be set up as follows:

- name: `rancher-monitoring-grafana`
- namespace: `cattle-monitoring-system`
- path: `proxy/?orgId=1`
- port: `"80"`
- scheme: `http`

It is required to provide either the `toService` directive or the `toURL` directive.

### `toUrl`

Can be any link, even to links outside of the cluster.

It is required to provide either the `toService` directive or the `toURL` directive.

# Link Example

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
