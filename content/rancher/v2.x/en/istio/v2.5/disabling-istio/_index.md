---
title: Disabling Istio
weight: 4
aliases:
  - /rancher/v2.x/en/istio/disabling-istio
---

This section describes how to uninstall Istio in a cluster or disable a namespace, or workload.

# Uninstall Istio in a Cluster

To uninstall Istio,

1. From the **Cluster Explorer,** navigate to **Installed Apps** in **Apps & Marketplace** and locate the `rancher-istio` installation.
1. Select all the apps in the `istio-system` namespace and click  **Delete**. 

**Result:** The `rancher-istio` app in the cluster gets removed. The Istio sidecar cannot be deployed on any workloads in the cluster. 

**Note:** You can no longer disable and reenable your Istio installation. If you would like to save your settings for a future install, view and save individual YAMLs to refer back to / reuse for future installations. 

# Disable Istio in a Namespace

1. From the **Cluster Explorer** view, use the side-nav to select **Namespaces** page 
1. On the **Namespace** page, you will see a list of namespaces. Go to the namespace where you want to disable and click the select **Edit as Form** or **Edit as Yaml**
1. Remove the `istio-injection=enabled` label from the namespace
1. Click **Save**

**Result:** When workloads are deployed in this namespace, they will not have the Istio sidecar.

# Remove the Istio Sidecar from a Workload

Disable Istio in the namespace, then redeploy the workloads with in it. They will be deployed without the Istio sidecar.
