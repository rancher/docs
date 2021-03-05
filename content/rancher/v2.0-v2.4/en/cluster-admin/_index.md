---
title: Cluster Administration
weight: 8
---

After you provision a cluster in Rancher, you can begin using powerful Kubernetes features to deploy and scale your containerized applications in development, testing, or production environments.

This page covers the following topics:

- [Switching between clusters](#switching-between-clusters)
- [Managing clusters in Rancher](#managing-clusters-in-rancher)
- [Configuring tools](#configuring-tools)

> This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts]({{<baseurl>}}/rancher/v2.0-v2.4/en/overview/concepts) page.

## Switching between Clusters

To switch between clusters, use the drop-down available in the navigation bar.

Alternatively, you can switch between projects and clusters directly in the navigation bar. Open the **Global** view and select **Clusters** from the main menu. Then select the name of the cluster you want to open.

## Managing Clusters in Rancher

After clusters have been [provisioned into Rancher]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/), [cluster owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) will need to manage these clusters. There are many different options of how to manage your cluster. 

{{% include file="/rancher/v2.0-v2.4/en/cluster-provisioning/cluster-capabilities-table" %}}

## Configuring Tools

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external services to help your clusters run more efficiently. Tools are divided into following categories:

- Alerts
- Notifiers
- Logging
- Monitoring
- Istio Service Mesh
- OPA Gatekeeper

For more information, see [Tools]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/)
