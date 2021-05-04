---
title: 1. Enable Istio in the Cluster
weight: 1
aliases:
  - /rancher/v2.5/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster
  - /rancher/v2.5/en/istio/v2.5/setup/enable-istio-in-cluster
---

>**Prerequisites:**
>
>- Only a user with the `cluster-admin` [Kubernetes default role](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) assigned can configure and install Istio in a Kubernetes cluster.
>- If you have pod security policies, you will need to install Istio with the CNI enabled. For details, see [this section.]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/configuration-reference/enable-istio-with-psp)
>- To install Istio on an RKE2 cluster, additional steps are required. For details, see [this section.]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/configuration-reference/rke2/)
>- To install Istio in a cluster where project network isolation is enabled, additional steps are required. For details, see [this section.]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/configuration-reference/canal-and-project-network)

1. From the **Cluster Explorer**, navigate to available **Charts** in **Apps & Marketplace** 
1. Select the Istio chart from the rancher provided charts
1. If you have not already installed your own monitoring app, you will be prompted to install the rancher-monitoring app. Optional: Set your Selector or Scrape config options on rancher-monitoring app install. 
1. Optional: Configure member access and [resource limits]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/resources/) for the Istio components. Ensure you have enough resources on your worker nodes to enable Istio.
1. Optional: Make additional configuration changes to values.yaml if needed.
1. Optional: Add additional resources or configuration via the [overlay file.]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/configuration-reference/#overlay-file)
1. Click **Install**.

**Result:** Istio is installed at the cluster level.

# Additional Config Options

For more information on configuring Istio, refer to the [configuration reference.]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/configuration-reference)
