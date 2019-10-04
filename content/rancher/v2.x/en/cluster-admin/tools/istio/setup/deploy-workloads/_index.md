---
title: 5. Add Deployments and Services with the Istio Sidecar
weight: 5
---

> **Prerequisite:** To enable Istio for a workload, the cluster and namespace must have Istio enabled.  

Enabling Istio in a namespace only enables automatic sidecar injection for new workloads. To enable the Envoy sidecar for existing workloads, you need to enable it manually for each workload.

To inject the Istio sidecar on an existing workload in the namespace, go to the workload, click the **Ellipsis (...),** and click **Redeploy.** When the workload is redeployed, it will have the Envoy sidecar automatically injected.

Wait a few minutes for the workload to upgrade to have the istio sidecar. Click it and go to the Containers section. You should be able to see istio-init and istio-proxy alongside your original workload. This means the Istio sidecar is enabled for the workload. Istio is doing all the wiring for the sidecar envoy. Now Istio can do all the features automatically if you enable them in the yaml.

### 3. Add Deployments and Services

Next we add the Kubernetes resources for the sample deployments and services for the BookInfo app in Istio's documentation.


### [Next: Set up Istio's Components for Traffic Management]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/set-up-traffic-management)