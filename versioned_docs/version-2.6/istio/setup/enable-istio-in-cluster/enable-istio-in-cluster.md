---
title: 1. Enable Istio in the Cluster
weight: 1
---

>**Prerequisites:**
>
>- Only a user with the `cluster-admin` [Kubernetes default role](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) assigned can configure and install Istio in a Kubernetes cluster.
>- If you have pod security policies, you will need to install Istio with the CNI enabled. For details, see [this section.]({{<baseurl>}}/rancher/v2.6/en/istio/configuration-reference/enable-istio-with-psp)
>- To install Istio on an RKE2 cluster, additional steps are required. For details, see [this section.]({{<baseurl>}}/rancher/v2.6/en/istio/configuration-reference/rke2/)
>- To install Istio in a cluster where project network isolation is enabled, additional steps are required. For details, see [this section.]({{<baseurl>}}/rancher/v2.6/en/istio/configuration-reference/canal-and-project-network)

1.  Click **☰ > Cluster Management**.
1. Go to the where you want to enable Istio and click **Explore**.
1. Click **Apps & Marketplace**.
1. Click **Charts**.
1. Click **Istio**.
1. If you have not already installed your own monitoring app, you will be prompted to install the rancher-monitoring app. Optional: Set your Selector or Scrape config options on rancher-monitoring app install. 
1. Optional: Configure member access and [resource limits]({{<baseurl>}}/rancher/v2.6/en/istio/resources/) for the Istio components. Ensure you have enough resources on your worker nodes to enable Istio.
1. Optional: Make additional configuration changes to values.yaml if needed.
1. Optional: Add additional resources or configuration via the [overlay file.]({{<baseurl>}}/rancher/v2.6/en/istio/configuration-reference/#overlay-file)
1. Click **Install**.

**Result:** Istio is installed at the cluster level.

# Additional Config Options

For more information on configuring Istio, refer to the [configuration reference.]({{<baseurl>}}/rancher/v2.6/en/istio/configuration-reference)
