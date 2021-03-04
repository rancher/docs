---
title: 2. Enable Istio in a Namespace
weight: 2
aliases:
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/istio/setup/enable-istio-in-namespace
  - /rancher/v2.0-v2.4/en/istio/legacy/setup/enable-istio-in-namespace
  - /rancher/v2.0-v2.4/en/istio/v2.3.x-v2.4.x/setup/enable-istio-in-namespace
---

You will need to manually enable Istio in each namespace that you want to be tracked or controlled by Istio. When Istio is enabled in a namespace, the Envoy sidecar proxy will be automatically injected into all new workloads that are deployed in the namespace.

This namespace setting will only affect new workloads in the namespace. Any preexisting workloads will need to be re-deployed to leverage the sidecar auto injection.

> **Prerequisite:** To enable Istio in a namespace, the cluster must have Istio enabled.  

1. In the Rancher UI, go to the cluster view. Click the **Projects/Namespaces** tab.
1. Go to the namespace where you want to enable the Istio sidecar auto injection and click the **&#8942;.**
1. Click **Edit.**
1. In the **Istio sidecar auto injection** section, click **Enable.**
1. Click **Save.**

**Result:** The namespace now has the label `istio-injection=enabled`. All new workloads deployed in this namespace will have the Istio sidecar injected by default.

### Verifying that Automatic Istio Sidecar Injection is Enabled

To verify that Istio is enabled, deploy a hello-world workload in the namespace. Go to the workload and click the pod name. In the **Containers** section, you should see the `istio-proxy` container.

### Excluding Workloads from Being Injected with the Istio Sidecar

If you need to exclude a workload from getting injected with the Istio sidecar, use the following annotation on the workload:

```
sidecar.istio.io/inject: “false”
```

To add the annotation to a workload,

1. From the **Global** view, open the project that has the workload that should not have the sidecar.
1. Click **Resources > Workloads.**
1. Go to the workload that should not have the sidecar and click **&#8942; > Edit.**
1. Click **Show Advanced Options.** Then expand the **Labels & Annotations** section.
1. Click **Add Annotation.**
1. In the **Key** field, enter `sidecar.istio.io/inject`.
1. In the **Value** field, enter `false`.
1. Click **Save.**

**Result:** The Istio sidecar will not be injected into the workload.

> **NOTE:** If you are having issues with a Job you deployed not completing, you will need to add this annotation to your pod using the provided steps. Since Istio Sidecars run indefinitely, a Job cannot be considered complete even after its task has completed. 


### [Next: Select the Nodes ]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/setup/node-selectors)