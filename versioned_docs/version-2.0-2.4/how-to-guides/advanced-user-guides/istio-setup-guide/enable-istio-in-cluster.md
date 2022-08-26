---
title: 1. Enable Istio in the Cluster
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster
  - /rancher/v2.0-v2.4/en/istio/legacy/setup/enable-istio-in-cluster
  - /rancher/v2.0-v2.4/en/istio/v2.3.x-v2.4.x/setup/enable-istio-in-cluster
  - /rancher/v2.x/en/istio/v2.3.x-v2.4.x/setup/enable-istio-in-cluster/
---

This cluster uses the default Nginx controller to allow traffic into the cluster.

A Rancher [administrator](../authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/global-permissions.md) or [cluster owner](../authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md#cluster-roles) can configure Rancher to deploy Istio in a Kubernetes cluster.

# Prerequisites

This guide assumes you have already [installed Rancher,](../../../pages-for-subheaders/installation-and-upgrade.md) and you have already [provisioned a separate Kubernetes cluster](../../../pages-for-subheaders/kubernetes-clusters-in-rancher-setup.md) on which you will install Istio.

The nodes in your cluster must meet the [CPU and memory requirements.](../../../explanations/integrations-in-rancher/istio/cpu-and-memory-allocations.md)

The workloads and services that you want to be controlled by Istio must meet [Istio's requirements.](https://istio.io/docs/setup/additional-setup/requirements/)

> If the cluster has a Pod Security Policy enabled there are [additional prerequisites steps](enable-istio-in-cluster-with-psp.md)

# Enable Istio in the Cluster

1. From the **Global** view, navigate to the **cluster** where you want to enable Istio.
1. Click **Tools > Istio.**
1. Optional: Configure member access and [resource limits](../../../explanations/integrations-in-rancher/istio/cpu-and-memory-allocations.md) for the Istio components. Ensure you have enough resources on your worker nodes to enable Istio.
1. Click **Enable**.
1. Click **Save**.

**Result:** Istio is enabled at the cluster level.

The Istio application, `cluster-istio`, is added as an application to the cluster's `system` project.

When Istio is enabled in the cluster, the label for Istio sidecar auto injection,`istio-injection=enabled`, will be automatically added to each new namespace in this cluster. This automatically enables Istio sidecar injection in all new workloads that are deployed in those namespaces. You will need to manually enable Istio in preexisting namespaces and workloads.

### [Next: Enable Istio in a Namespace](enable-istio-in-namespace.md)
