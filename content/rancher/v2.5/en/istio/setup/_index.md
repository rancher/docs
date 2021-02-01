---
title: Setup Guide
weight: 2
aliases:
  - /rancher/v2.5/en/cluster-admin/tools/istio/setup
  - /rancher/v2.5/en/istio/v2.5/setup/
---

This section describes how to enable Istio and start using it in your projects.

If you use Istio for traffic management, you will need to allow external traffic to the cluster. In that case, you will need to follow all of the steps below.

# Prerequisites

This guide assumes you have already [installed Rancher,]({{<baseurl>}}/rancher/v2.5/en/installation) and you have already [provisioned a separate Kubernetes cluster]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning) on which you will install Istio.

The nodes in your cluster must meet the [CPU and memory requirements.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/resources/)

The workloads and services that you want to be controlled by Istio must meet [Istio's requirements.](https://istio.io/docs/setup/additional-setup/requirements/)


# Install

> **Quick Setup** If you don't need external traffic to reach Istio, and you just want to set up Istio for monitoring and tracing traffic within the cluster, skip the steps for [setting up the Istio gateway]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/gateway) and [setting up Istio's components for traffic management.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/set-up-traffic-management)

1. [Enable Istio in the cluster.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster)
1. [Enable Istio in all the namespaces where you want to use it.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/enable-istio-in-namespace)
1. [Add deployments and services that have the Istio sidecar injected.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/deploy-workloads)
1. [Set up the Istio gateway. ]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/gateway)
1. [Set up Istio's components for traffic management.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/set-up-traffic-management)
1. [Generate traffic and see Istio in action.]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/setup/view-traffic/ )
