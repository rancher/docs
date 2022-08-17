---
title: Setup Guide
weight: 2
---

This section describes how to enable Istio and start using it in your projects.

If you use Istio for traffic management, you will need to allow external traffic to the cluster. In that case, you will need to follow all of the steps below.

# Prerequisites

This guide assumes you have already [installed Rancher,](installation-and-upgrade.md) and you have already [provisioned a separate Kubernetes cluster](kubernetes-clusters-in-rancher-setup.md) on which you will install Istio.

The nodes in your cluster must meet the [CPU and memory requirements.](../explanations/integrations-in-rancher/istio/cpu-and-memory-allocations.md)

The workloads and services that you want to be controlled by Istio must meet [Istio's requirements.](https://istio.io/docs/setup/additional-setup/requirements/)


# Install

:::tip Quick Setup Tip: If you don't need external traffic to reach Istio, and you just want to set up Istio for monitoring and tracing traffic within the cluster, skip the steps for [setting up the Istio gateway](../how-to-guides/advanced-user-guides/istio-setup-guide/set-up-istio-gateway.md) and [setting up Istio's components for traffic management.](../how-to-guides/advanced-user-guides/istio-setup-guide/set-up-traffic-management.md)

:::

1. [Enable Istio in the cluster.](../how-to-guides/advanced-user-guides/istio-setup-guide/enable-istio-in-cluster.md)
1. [Enable Istio in all the namespaces where you want to use it.](../how-to-guides/advanced-user-guides/istio-setup-guide/enable-istio-in-namespace.md)
1. [Add deployments and services that have the Istio sidecar injected.](../how-to-guides/advanced-user-guides/istio-setup-guide/use-istio-sidecar.md)
1. [Set up the Istio gateway. ](../how-to-guides/advanced-user-guides/istio-setup-guide/set-up-istio-gateway.md)
1. [Set up Istio's components for traffic management.](../how-to-guides/advanced-user-guides/istio-setup-guide/set-up-traffic-management.md)
1. [Generate traffic and see Istio in action.](istio/setup/view-traffic/ )
