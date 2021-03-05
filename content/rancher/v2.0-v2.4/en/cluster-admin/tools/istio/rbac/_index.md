---
title: Role-based Access Control
weight: 3
aliases:
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/istio/rbac
  - /rancher/v2.0-v2.4/en/istio/legacy/rbac
  - /rancher/v2.0-v2.4/en/istio/v2.3.x-v2.4.x/rbac
---

This section describes the permissions required to access Istio features and how to configure access to the Kiali and Jaeger visualizations.

# Cluster-level Access

By default, only cluster administrators can:

- Enable Istio for the cluster
- Configure resource allocations for Istio
- View each UI for Prometheus, Grafana, Kiali, and Jaeger

# Project-level Access

After Istio is enabled in a cluster, project owners and members have permission to:

- Enable and disable Istio sidecar auto-injection for namespaces
- Add the Istio sidecar to workloads
- View the traffic metrics and traffic graph for the cluster
- View the Kiali and Jaeger visualizations if cluster administrators give access to project members
- Configure Istio's resources (such as the gateway, destination rules, or virtual services) with `kubectl` (This does not apply to read-only project members)

# Access to Visualizations

By default,  the Kiali and Jaeger visualizations are restricted to the cluster owner because the information in them could be sensitive.

**Jaeger** provides a UI for a distributed tracing system, which is useful for root cause analysis and for determining what causes poor performance.

**Kiali** provides a diagram that shows the services within a service mesh and how they are connected.

Rancher supports giving groups permission to access Kiali and Jaeger, but not individuals.

To configure who has permission to access the Kiali and Jaeger UI,

1. Go to the cluster view and click **Tools > Istio.**
1. Then go to the **Member Access** section. If you want to restrict access to certain groups, choose **Allow cluster owner and specified members to access Kiali and Jaeger UI.** Search for the groups that you want to have access to Kiali and Jaeger. If you want all members to have access to the tools, click **Allow all members to access Kiali and Jaeger UI.**
1. Click **Save.**

**Result:** The access levels for Kiali and Jaeger have been updated.

# Summary of Default Permissions for Istio Users

| Permission                         | Cluster Administrators | Project Owners | Project Members | Read-only Project Members |
|------------------------------------------|----------------|----------------|-----------------|---------------------------|
| Enable and disable Istio for the cluster | ✓              |                |                 |                           |
| Configure Istio resource limits          | ✓              |                |                 |                           |
| Control who has access to Kiali and the Jaeger UI | ✓     |                |                 |                           |
| Enable and disable Istio for a namespace | ✓              | ✓              | ✓              |                           |
| Enable and disable Istio on workloads    | ✓              | ✓              | ✓              |                           |
| Configure Istio with `kubectl`           | ✓              | ✓              | ✓              |                          |
| View Prometheus UI and Grafana UI           | ✓              |               |               |                          |
| View Kiali UI and Jaeger UI ([Configurable](#access-to-visualizations)) | ✓              |                |                |                           |
| View Istio project dashboard, including traffic metrics* | ✓          | ✓              | ✓            | ✓        |

* By default, only the cluster owner will see the traffic graph. Project members will see only a subset of traffic metrics. Project members cannot see the traffic graph because it comes from Kiali, and access to Kiali is restricted to cluster owners by default.