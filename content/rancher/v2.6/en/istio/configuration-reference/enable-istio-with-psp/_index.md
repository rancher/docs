---
title: Enable Istio with Pod Security Policies
weight: 1
aliases:
  - /rancher/v2.5/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster/enable-istio-with-psp
  - /rancher/v2.5/en/istio/legacy/setup/enable-istio-in-cluster/enable-istio-with-psp
  - /rancher/v2.5/en/istio/v2.5/setup/enable-istio-in-cluster/enable-istio-with-psp
  - /rancher/v2.5/en/istio/v2.5/configuration-reference/enable-istio-with-psp
---

If you have restrictive Pod Security Policies enabled, then Istio may not be able to function correctly, because it needs certain permissions in order to install itself and manage pod infrastructure. In this section, we will configure a cluster with PSPs enabled for an Istio install, and also set up the Istio CNI plugin. 

The Istio CNI plugin removes the need for each application pod to have a privileged `NET_ADMIN` container. For further information, see the [Istio CNI Plugin docs](https://istio.io/docs/setup/additional-setup/cni). Please note that the [Istio CNI Plugin is in alpha](https://istio.io/about/feature-stages/).

The steps differ based on the Rancher version.

{{% tabs %}}
{{% tab "v2.5.4+" %}}

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

1. From the cluster view of the **Cluster Manager,** select **Projects/Namespaces.**
1. Find the **Project: System** and select the **&#8942; > Edit**.
1. Change the Pod Security Policy option to be unrestricted, then click **Save.**

### 2. Enable the CNI

When installing or upgrading Istio through **Apps & Marketplace,**

1. Click **Components.**
2. Check the box next to **Enabled CNI.**
3. Finish installing or upgrading Istio.

The CNI can also be enabled by editing the `values.yaml`:

```
istio_cni.enabled: true
```

Istio should install successfully with the CNI enabled in the cluster.

### 3. Verify that the CNI is working

Verify that the CNI is working by deploying a [sample application](https://istio.io/latest/docs/examples/bookinfo/) or deploying one of your own applications.

{{% /tab %}}
{{% tab "v2.5.0-v2.5.3" %}}

> **Prerequisites:**
>
> - The cluster must be an RKE Kubernetes cluster.
> - The cluster must have been created with a default PodSecurityPolicy. 
>
> To enable pod security policy support when creating a Kubernetes cluster in the Rancher UI, go to <b>Advanced Options.</b> In the <b>Pod Security Policy Support</b> section, click <b>Enabled.</b> Then select a default pod security policy.

1. [Configure the System Project Policy to allow Istio install.](#1-configure-the-system-project-policy-to-allow-istio-install)
2. [Install the CNI plugin in the System project.](#2-install-the-cni-plugin-in-the-system-project)
3. [Install Istio.](#3-install-istio)

### 1. Configure the System Project Policy to allow Istio install

1. From the cluster view of the **Cluster Manager,** select **Projects/Namespaces.**
1. Find the **Project: System** and select the **&#8942; > Edit**.
1. Change the Pod Security Policy option to be unrestricted, then click Save.

### 2. Install the CNI Plugin in the System Project

1. From the main menu of the **Dashboard**, select **Projects/Namespaces**.
1. Select the **Project: System** project.
1. Choose **Tools > Catalogs** in the navigation bar.
1. Add a catalog with the following:
	1. Name: istio-cni
	1. Catalog URL: https://github.com/istio/cni
	1. Branch: The branch that matches your current release, for example: `release-1.4`.
1. From the main menu select **Apps**
1. Click Launch and select istio-cni
1. Update the namespace to be "kube-system"
1. In the answers section, click "Edit as YAML" and paste in the following, then click launch:

```
---
  logLevel: "info"
  excludeNamespaces:
    - "istio-system"
    - "kube-system"
```

### 3. Install Istio

Follow the [primary instructions]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster/), adding a custom answer: `istio_cni.enabled: true`.

After Istio has finished installing, the Apps page in System Projects should show both istio and `istio-cni` applications deployed successfully. Sidecar injection will now be functional.

{{% /tab %}}
{{% /tabs %}}