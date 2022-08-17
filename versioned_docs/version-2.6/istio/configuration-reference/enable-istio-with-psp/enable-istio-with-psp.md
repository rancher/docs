---
title: Enable Istio with Pod Security Policies
weight: 1
---

If you have restrictive Pod Security Policies enabled, then Istio may not be able to function correctly, because it needs certain permissions in order to install itself and manage pod infrastructure. In this section, we will configure a cluster with PSPs enabled for an Istio install, and also set up the Istio CNI plugin. 

The Istio CNI plugin removes the need for each application pod to have a privileged `NET_ADMIN` container. For further information, see the [Istio CNI Plugin docs](https://istio.io/docs/setup/additional-setup/cni). Please note that the [Istio CNI Plugin is in alpha](https://istio.io/about/feature-stages/).

> **Prerequisites:**
>
> - The cluster must be an RKE Kubernetes cluster.
> - The cluster must have been created with a default PodSecurityPolicy. 
>
> To enable pod security policy support when creating a Kubernetes cluster in the Rancher UI, go to <b>Advanced Options.</b> In the <b>Pod Security Policy Support</b> section, click <b>Enabled.</b> Then select a default pod security policy.

1. [Set the PodSecurityPolicy to unrestricted](#1-set-the-podsecuritypolicy-to-unrestricted)
2. [Enable the CNI](#2-enable-the-cni)
3. [Verify that the CNI is working.](#3-verify-that-the-cni-is-working)

### 1. Set the PodSecurityPolicy to unrestricted

An unrestricted PSP allows Istio to be installed.

Set the PSP to `unrestricted` in the project where is Istio is installed, or the project where you plan to install Istio.

1.  Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. Click **Cluster > Projects/Namespaces**.
1. Find the **Project: System** and select the **⋮ > Edit Config**.
1. Change the Pod Security Policy option to be unrestricted, then click **Save**.

### 2. Enable the CNI

When installing or upgrading Istio through **Apps & Marketplace,**

1. Click **Components**.
2. Check the box next to **Enabled CNI**.
3. Finish installing or upgrading Istio.

The CNI can also be enabled by editing the `values.yaml`:

```
istio_cni.enabled: true
```

Istio should install successfully with the CNI enabled in the cluster.

### 3. Verify that the CNI is working

Verify that the CNI is working by deploying a [sample application](https://istio.io/latest/docs/examples/bookinfo/) or deploying one of your own applications.

