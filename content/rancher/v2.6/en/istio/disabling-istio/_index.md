---
title: Disabling Istio
weight: 4
aliases:
  - /rancher/v2.5/en/istio/v2.5/disabling-istio
---

This section describes how to uninstall Istio in a cluster or disable a namespace, or workload.

# Uninstall Istio in a Cluster

To uninstall Istio,

1. From the **Cluster Explorer,** navigate to **Installed Apps** in **Apps & Marketplace** and locate the `rancher-istio` installation.
1. Select `rancher-istio` in the `istio-system namespace and click **Delete**
1. After `rancher-istio` is deleted, you can then select all the remaining apps in the `istio-system` namespace and click **Delete**

**Result:** The `rancher-istio` app in the cluster gets removed. The Istio sidecar cannot be deployed on any workloads in the cluster. 

**Note:** You can no longer disable and re-enable your Istio installation. If you would like to save your settings for a future install, view and save individual YAMLs to refer back to / reuse for future installations.

**Troubleshooting Uninstall:** If you didn't follow the uninstall steps, you may encounter a warning during uninstall:

`Error: uninstallation completed with 1 error(s): unable to build kubernetes objects for delete: unable to recognize "": no matches for kind "MonitoringDashboard" in version "monitoring.kiali.io/v1alpha1"`

This could mean a few things. You either selected all the apps in the `istio-system` namespace and deleted them at the same time, or you deleted `rancher-istio` chart dependencies prior to deleting the `rancher-istio` chart. Since the uninstall did not complete properly, you will have resources remaining in the `istio-system` namespace that you will need to manually clean up. Another option to avoid manual clean up is to install `rancher-istio` again, then uninstall it in the correct order.

# Disable Istio in a Namespace

1. From the **Cluster Explorer** view, use the side-nav to select **Namespaces** page 
1. On the **Namespace** page, you will see a list of namespaces. Go to the namespace where you want to disable and click the select **Edit as Form** or **Edit as Yaml**
1. Remove the `istio-injection=enabled` label from the namespace
1. Click **Save**

**Result:** When workloads are deployed in this namespace, they will not have the Istio sidecar.

# Remove the Istio Sidecar from a Workload

Disable Istio in the namespace, then redeploy the workloads with in it. They will be deployed without the Istio sidecar.
