---
title: Disabling Istio
weight: 4
---

This section describes how to disable Istio in a cluster, namespace, or workload.

# Disable Istio in a Cluster

To disable Istio,

1. From the **Global** view, navigate to the cluster that you want to disable Istio for.
1. Click **Tools > Istio.**
1. Click **Disable,** then click the red button again to confirm the disable action.

**Result:** The `cluster-istio` application in the cluster's `system` project gets removed. The Istio sidecar cannot be deployed on any workloads in the cluster.

# Disable Istio in a Namespace

1. In the Rancher UI, go to the project that has the namespace where you want to disable Istio.
1. On the **Workloads** tab, you will see a list of namespaces and the workloads deployed in them. Go to the namespace where you want to disable and click the **Ellipsis (...) > Disable Istio Auto Injection.**

**Result:** When workloads are deployed in this namespace, they will not have the Istio sidecar.

# Remove the Istio Sidecar from a Workload

Disable Istio in the namespace, then redeploy the workloads with in it. They will be deployed without the Istio sidecar.