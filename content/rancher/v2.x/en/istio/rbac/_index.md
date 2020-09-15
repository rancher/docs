---
title: Role-based Access Control
weight: 3
aliases:
  - /rancher/v2.x/en/cluster-admin/tools/istio/rbac
---

This section describes the permissions required to access Istio features.

## Admin and Edit access

By default, only Admin and Edit roles can:

- Install Istio for the cluster
- Configure resource allocations for Istio
- Enable and disable Istio sidecar auto-injection for namespaces
- Add the Istio sidecar to workloads
- View the traffic metrics and traffic graph for the cluster
- Configure Istio's resources (such as the gateway, destination rules, or virtual services)

# Summary of Default Permissions for Kubernetes Default roles

| Permission                         | Admin | Edit | View |
|------------------------------------------|----------------|----------------|-----------------|
| Enable and disable Istio for the cluster | ✓              | ✓              |                 |
| Configure Istio resource limits          | ✓              | ✓              |                 |
| Enable and disable Istio for a namespace | ✓              | ✓              |                 |
| Enable and disable Istio on workloads    | ✓              | ✓              |                 |
| Configure Istio with `kubectl`           | ✓              | ✓              |                 |
| View Istio project dashboard, including traffic metrics* | ✓          | ✓              | ✓            |