---
title: 1. Enable Istio in the Cluster
weight: 1
aliases:
  - /rancher/v2.x/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster
---

This cluster uses the default Nginx controller to allow traffic into the cluster.

Only a user with the following [Kubernetes default roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#user-facing-roles) assigned can configure and install Istio in a Kubernetes cluster. 

 - Admin
 - Edit

> If the cluster has a Pod Security Policy enabled there are [prerequisites steps.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster/enable-istio-with-psp/)

1. From the Rancher Dashboard's **Cluster Explorer** view, navigate to available Charts in **Apps & Marketplace** 
1. Select the Istio chart from the rancher provided charts
1. Optional: Configure member access and [resource limits]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/resources/) for the Istio components. Ensure you have enough resources on your worker nodes to enable Istio.
1. Optional: Make additional configuration changes to values.yaml if needed
1. Optional: Add additional resources or configuration via the [overlay file](#overlay-file)
1. Click **Install**.

**Result:** Istio is installed at the cluster level.

The Istio application, `rancher-istio`, is added as an application to the cluster's `system` project.

When Istio is installed in the cluster, the label for Istio sidecar auto injection,`istio-injection=enabled`, will be automatically added to each new namespace in this cluster. This automatically enables Istio sidecar injection in all new workloads that are deployed in those namespaces. You will need to manually enable Istio in preexisting namespaces and workloads.

### [Next: Enable Istio in a Namespace]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/enable-istio-in-namespace)


### Advanced Config Options

## Overlay File

An Overlay File is designed to support extensive configuration of your Istio installation. It allows you to make changes to any values available in the [IstioOperator API](https://istio.io/latest/docs/reference/config/istio.operator.v1alpha1/). This will ensure you can customize the default installation to fit any scenario. 

The Overlay File will add configuration on top of the default installation that is provided from the Istio chart installation. This means you do not need to redefine the components that already defined for installation. 

For more information on Overlay Files, refer to the (documentation)[https://istio.io/latest/docs/setup/install/istioctl/#configure-component-settings]

