---
title: 2. Enable Istio in a Namespace
weight: 2
aliases:
  - /rancher/v2.5/en/cluster-admin/tools/istio/setup/enable-istio-in-namespace
  - /rancher/v2.5/en/istio/v2.5/setup/enable-istio-in-namespace
---

You will need to manually enable Istio in each namespace that you want to be tracked or controlled by Istio. When Istio is enabled in a namespace, the Envoy sidecar proxy will be automatically injected into all new workloads that are deployed in the namespace.

This namespace setting will only affect new workloads in the namespace. Any preexisting workloads will need to be re-deployed to leverage the sidecar auto injection.

> **Prerequisite:** To enable Istio in a namespace, the cluster must have Istio installed.  

1. In the Rancher **Cluster Explorer,** open the kubectl shell.
1. Then run `kubectl label namespace <namespace> istio-injection=enabled`

**Result:** The namespace now has the label `istio-injection=enabled`. All new workloads deployed in this namespace will have the Istio sidecar injected by default.

### Verifying that Automatic Istio Sidecar Injection is Enabled

To verify that Istio is enabled, deploy a hello-world workload in the namespace. Go to the workload and click the pod name. In the **Containers** section, you should see the `istio-proxy` container.

### Excluding Workloads from Being Injected with the Istio Sidecar

If you need to exclude a workload from getting injected with the Istio sidecar, use the following annotation on the workload:

```
sidecar.istio.io/inject: “false”
```

To add the annotation to a workload,

1. From the **Cluster Explorer** view, use the side-nav to select the **Overview** page for workloads.
1. Go to the workload that should not have the sidecar and edit as yaml
1. Add the following key, value `sidecar.istio.io/inject: false` as an annotation on the workload
1. Click **Save.**

**Result:** The Istio sidecar will not be injected into the workload.

> **NOTE:** If you are having issues with a Job you deployed not completing, you will need to add this annotation to your pod using the provided steps. Since Istio Sidecars run indefinitely, a Job cannot be considered complete even after its task has completed. 


### [Next: Select the Nodes ]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/node-selectors)