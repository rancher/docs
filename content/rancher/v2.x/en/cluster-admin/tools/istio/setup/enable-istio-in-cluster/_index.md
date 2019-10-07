---
title: 1. Enable Istio in the Cluster
weight: 1
---

This cluster uses the default Nginx controller to allow traffic into the cluster.

A Rancher [administrator]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) can configure Rancher to deploy Istio in a Kubernetes cluster.

1. From the **Global** view, navigate to the cluster where you want to enable Istio.
1. Click **Tools > Istio.**
1. Optional: Configure member access and resource limits for the Istio components. Select **Enable** to show the [configuration options]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/config/). Ensure you have enough resources on your worker nodes to enable Istio.
1. Click **Save**.

**Result:** Istio is enabled at the cluster level.

The Istio application, `cluster-istio`, is added as an [application]({{<baseurl>}}/rancher/v2.x/en/catalog/apps/) to the cluster's `system` project.

When Istio is enabled in the cluster, the label for Istio sidecar auto injection,`istio-injection=enabled`, will be automatically added to each new namespace in this cluster. This automatically enables Istio sidecar injection in all new workloads that are deployed in those namespaces. You will need to manually enable Istio in preexisting namespaces and workloads.

### [Next: Enable Istio in a Namespace]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/enable-istio-in-namespace)