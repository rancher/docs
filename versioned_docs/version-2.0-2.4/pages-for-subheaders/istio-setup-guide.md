---
title: Setup Guide
weight: 2
aliases:
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/istio/setup
  - /rancher/v2.0-v2.4/en/istio/legacy/setup
  - /rancher/v2.0-v2.4/en/istio/v2.3.x-v2.4.x/setup
  - /rancher/v2.x/en/istio/v2.3.x-v2.4.x/setup/
---

This section describes how to enable Istio and start using it in your projects.

This section assumes that you have Rancher installed, and you have a Rancher-provisioned Kubernetes cluster where you would like to set up Istio.

If you use Istio for traffic management, you will need to allow external traffic to the cluster. In that case, you will need to follow all of the steps below.

> **Quick Setup** If you don't need external traffic to reach Istio, and you just want to set up Istio for monitoring and tracing traffic within the cluster, skip the steps for [setting up the Istio gateway](../how-to-guides/advanced-user-guides/istio-setup-guide/set-up-istio-gateway.md) and [setting up Istio's components for traffic management.](../how-to-guides/advanced-user-guides/istio-setup-guide/set-up-traffic-management.md)

1. [Enable Istio in the cluster.](../how-to-guides/advanced-user-guides/istio-setup-guide/enable-istio-in-cluster.md)
1. [Enable Istio in all the namespaces where you want to use it.](../how-to-guides/advanced-user-guides/istio-setup-guide/enable-istio-in-namespace.md)
1. [Select the nodes where the main Istio components will be deployed.](../how-to-guides/advanced-user-guides/istio-setup-guide/node-selectors.md)
1. [Add deployments and services that have the Istio sidecar injected.](../how-to-guides/advanced-user-guides/istio-setup-guide/use-istio-sidecar.md)
1. [Set up the Istio gateway. ](../how-to-guides/advanced-user-guides/istio-setup-guide/set-up-istio-gateway.md)
1. [Set up Istio's components for traffic management.](../how-to-guides/advanced-user-guides/istio-setup-guide/set-up-traffic-management.md)
1. [Generate traffic and see Istio in action.](istio-setup-guide.md#view-traffic)

