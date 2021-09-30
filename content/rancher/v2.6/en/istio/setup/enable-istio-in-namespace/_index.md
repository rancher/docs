---
title: 2. Enable Istio in a Namespace
weight: 2
---

You will need to manually enable Istio in each namespace that you want to be tracked or controlled by Istio. When Istio is enabled in a namespace, the Envoy sidecar proxy will be automatically injected into all new workloads that are deployed in the namespace.

This namespace setting will only affect new workloads in the namespace. Any preexisting workloads will need to be re-deployed to leverage the sidecar auto injection.

> **Prerequisite:** To enable Istio in a namespace, the cluster must have Istio installed.  

1. Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. Click **Cluster > Projects/Namespaces**.
1. Go to the namespace where you want to enable Istio and click **⋮  > Enable Istio Auto Injection**. Alternately, click the namespace, and then on the namespace detail page, click **⋮  > Enable Istio Auto Injection**.

**Result:** The namespace now has the label `istio-injection=enabled`. All new workloads deployed in this namespace will have the Istio sidecar injected by default.

### Verifying that Automatic Istio Sidecar Injection is Enabled

To verify that Istio is enabled, deploy a hello-world workload in the namespace. Go to the workload and click the pod name. In the **Containers** section, you should see the `istio-proxy` container.

### Excluding Workloads from Being Injected with the Istio Sidecar

If you need to exclude a workload from getting injected with the Istio sidecar, use the following annotation on the workload:

```
sidecar.istio.io/inject: “false”
```

To add the annotation to a workload,

1.  Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. Click **Workload**.
1. Go to the workload that should not have the sidecar and edit as yaml
1. Add the following key, value `sidecar.istio.io/inject: false` as an annotation on the workload
1. Click **Save**.

**Result:** The Istio sidecar will not be injected into the workload.

> **NOTE:** If you are having issues with a Job you deployed not completing, you will need to add this annotation to your pod using the provided steps. Since Istio Sidecars run indefinitely, a Job cannot be considered complete even after its task has completed. 


### [Next: Add Deployments with the Istio Sidecar ]({{<baseurl>}}/rancher/v2.6/en/istio/setup/deploy-workloads)