---
title: Cluster Administration
weight: 8
---

After you provision a cluster in Rancher, you can begin using powerful Kubernetes features to deploy and scale your containerized applications in development, testing, or production environments.

This page covers the following topics:

- [Switching between clusters](#switching-between-clusters)
- [Managing clusters in Rancher](#managing-clusters-in-rancher)
- [Configuring tools](#configuring-tools)

:::note

This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts](../reference-guides/kubernetes-concepts.md) page.

:::

## Managing Clusters in Rancher

After clusters have been [provisioned into Rancher](kubernetes-clusters-in-rancher-setup.md), [cluster owners](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md#cluster-roles) will need to manage these clusters. There are many different options of how to manage your cluster.

import ClusterCapabilitiesTable from '../shared-files/_cluster-capabilities-table.md';

<ClusterCapabilitiesTable />

## Configuring Tools

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external services to help your clusters run more efficiently. Tools are divided into following categories:

- Alerts
- Notifiers
- Logging
- Monitoring
- Istio Service Mesh
- OPA Gatekeeper

Tools can be installed through **Apps & Marketplace.**
