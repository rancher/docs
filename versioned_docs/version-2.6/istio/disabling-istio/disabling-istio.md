---
title: Disabling Istio
weight: 4
---

This section describes how to uninstall Istio in a cluster or disable a namespace, or workload.

# Uninstall Istio in a Cluster

To uninstall Istio,

1.  Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. In the left navigation bar, click **Apps & Marketplace > Installed Apps**.
1. In the `istio-system` namespace, go to `rancher-istio` and click **⋮ > Delete**.
1. After `rancher-istio` is deleted, you can then select all the remaining apps in the `istio-system` namespace and click **Delete**.

**Result:** The `rancher-istio` app in the cluster gets removed. The Istio sidecar cannot be deployed on any workloads in the cluster. 

**Note:** You can no longer disable and re-enable your Istio installation. If you would like to save your settings for a future install, view and save individual YAMLs to refer back to / reuse for future installations.

**Troubleshooting Uninstall:** If you didn't follow the uninstall steps, you may encounter a warning during uninstall:

`Error: uninstallation completed with 1 error(s): unable to build kubernetes objects for delete: unable to recognize "": no matches for kind "MonitoringDashboard" in version "monitoring.kiali.io/v1alpha1"`

This could mean a few things. You either selected all the apps in the `istio-system` namespace and deleted them at the same time, or you deleted `rancher-istio` chart dependencies prior to deleting the `rancher-istio` chart. Since the uninstall did not complete properly, you will have resources remaining in the `istio-system` namespace that you will need to manually clean up. Another option to avoid manual clean up is to install `rancher-istio` again, then uninstall it in the correct order.

# Disable Istio in a Namespace

1. Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. Click **Cluster > Projects/Namespaces**.
1. Go to the namespace where you want to enable Istio and click **⋮  > Enable Istio Auto Injection**. Alternately, click the namespace, and then on the namespace detail page, click **⋮  > Enable Istio Auto Injection**.

**Result:** When workloads are deployed in this namespace, they will not have the Istio sidecar.

# Remove the Istio Sidecar from a Workload

Disable Istio in the namespace, then redeploy the workloads with in it. They will be deployed without the Istio sidecar.
