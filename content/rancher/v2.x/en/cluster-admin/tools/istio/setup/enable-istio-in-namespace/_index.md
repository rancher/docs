---
title: 2. Enable Istio in a Namespace
weight: 2
---

Enabling Istio in a cluster enables Istio in all new namespaces that are created in a cluster.

When Istio is enabled in the cluster, the label for Istio sidecar auto injection,`istio-injection=enabled`, will be automatically added to each new namespace in this cluster. This turns on automatic Istio sidecar injection in all new workloads that are deployed in those namespaces.

You will need to manually enable Istio in preexisting namespaces so that the Envoy sidecar proxy will be automatically injected into all new workloads that are deployed in the namespace.

This namespace setting will only affect new workloads in the namespace. Any preexisting workloads will need to be re-deployed to leverage the sidecar auto injection.

> **Prerequisite:** To enable Istio in a namespace, the cluster must have Istio enabled.  

1. In the Rancher UI, go to the cluster view. Click the **Projects/Namespaces** tab.
1. Go to the namespace where you want to enable the Istio sidecar auto injection and click the **Ellipsis (...).**
1. Click **Edit.**
1. In the **Istio sidecar auto injection** section, click **Enable.**
1. Click **Save.**

**Result:** The namespace now has the label `istio-injection=enabled`. All new workloads deployed in this namespace will have the Istio sidecar injected by default.

### Verifying that Automatic Istio Sidecar Injection is Enabled

To verify that Istio is enabled, deploy a hello-world workload in the namespace. Go to the workload and click the pod name. In the **Containers** section, you should see the `istio-proxy` container.

### [Next: Set up Taints and Tolerations]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/taints-and-tolerations)