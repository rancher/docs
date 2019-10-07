---
title: Setup Guide
weight: 2
---

This section describes how to enable Istio and start using it in your projects.

This section assumes that you have Rancher installed, and you have a Rancher-provisioned Kubernetes cluster where you would like to set up Istio.

If you use Istio for traffic management, you will need to allow external traffic to the cluster. In that case, you will need to follow all of the steps below.

> **Quick Setup** If you don't need external traffic to reach Istio, and you just want to set up Istio for monitoring and tracing traffic within the cluster, skip the steps for [setting up the Istio gateway]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/gateway) and [setting up Istio's components for traffic management.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/set-up-traffic-management)

1. [Enable Istio in the cluster.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster)
1. [Enable Istio in all the namespaces where you want to use it.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/enable-istio-in-namespace)
1. [Designate which nodes the main Istio components will be deployed to.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/taints-and-tolerations)
1. [Set up the Istio gateway. ]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/gateway)
1. [Add deployments and services that have the Istio sidecar injected.](#deploy-workloads-in-the-cluster)
1. [Set up Istio's components for traffic management.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/set-up-traffic-management)
1. [Generate traffic and see Istio in action.](#generate-traffic-and-see-istio-in-action)

# Prerequisites

This guide assumes you have already [installed Rancher,]({{<baseurl>}}/rancher/v2.x/en/installation) and you have already [provisioned a separate Kubernetes cluster]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning) on which you will install Istio.

The nodes in your cluster must meet the [CPU and memory requirements.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/istio/#cpu-and-memory-requirements)

The workloads and services that you want to be controlled by Istio must meet [Istio's requirements.](https://istio.io/docs/setup/additional-setup/requirements/)