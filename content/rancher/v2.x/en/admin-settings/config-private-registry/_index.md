---
title: Configuring a Private Registry
weight: 400
aliases:
---

You might want to use a private Docker registry to share your custom base images within your organization. With a private registry, you can keep a private, consistent, and centralized source of truth for the Docker images that are used in your clusters.

A private registry is also used for air gap installations of Rancher, in which the registry is located somewhere accessible by Rancher. Then Rancher can provision clusters using images from the registry without direct access to the Internet.

This section describes how to configure a private Docker registry from the Rancher UI after Rancher is installed. For instructions on setting up a private registry with command line options during the installation of Rancher, refer to the [single node]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap-single-node) or [high-availability]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap-high-availability) Rancher air gap installation instructions.

There are multiple ways to configure private registries in Rancher, depending on whether your private registry requires credentials:

- If your private registry requires credentials, you need to pass the credentials to Rancher by editing the cluster options for each cluster that needs to pull images from the registry.
- If the private registry doesn't require credentials, you can configure it as a default registry through the **Settings** tab in the global view.

If your private registry requires credentials, it cannot be used as the default registry. There is no global way to set up a private registry with authorization for every Rancher-provisioned cluster. Therefore, if you want a Rancher-provisioned cluster to pull images from a private registry with credentials, you will have to [pass in the registry credentials through the advanced cluster options](#provisioning-clusters-with-private-registries-that-require-credentials) every time you create a new cluster. 

# Setting a Private Registry with No Credentials as the Default Registry

1. Log into Rancher and configure the default admin password.

1. Go into the **Settings** view.

    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

1. Look for the setting called `system-default-registry` and choose **Edit**.

    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)

**Result:** Rancher will use your private registry to pull system images.

# Setting a Private Registry with Credentials when Deploying a Cluster

You can follow these steps to configure a private registry when you provision a cluster with Rancher:

1. When you create a cluster through the Rancher UI, go to the **Cluster Options** section and click **Show Advanced Options.**
1. In the <b>Enable Private Registries</b> section, click **Enabled.**
1. Enter the registry URL and credentials.
1. Click **Save.**

**Result:** The new cluster will be able to pull images from the private registry.
