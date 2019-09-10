---
title: "4. Configure Rancher for the Private Registry"
weight: 400
aliases:
---

After your private registry is populated with all the required system images, you need to configure Rancher to use the private registry. There are two places you need to use a private registry:

- When Rancher is installed, to provide the Rancher system images
- After Rancher is installed, to use when deploying clusters

There are multiple ways to configure private registries in Rancher, depending on whether your private registry requires credentials:

- If your private registry requires credentials, you need to pass the credentials to Rancher by editing the cluster options for each cluster that needs to pull images from the registry.
- If the private registry doesn't require credentials, you can configure it as a default registry through the **Settings** tab in the global view.

If your private registry requires credentials, it cannot be used as the default registry. There is no global way to set up a private registry with authorization for every Rancher-provisioned cluster. Therefore, if you want a Rancher-provisioned cluster to pull images from a private registry with credentials, you will have to [pass in the registry credentials through the advanced cluster options](#provisioning-clusters-with-private-registries-that-require-credentials) every time you create a new cluster. 

# Setting a Private Registry with No Credentials as the Default Registry

>**Note:** If you want to set the default private registry when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.

1. Log into Rancher and configure the default admin password.

1. Go into the **Settings** view.

    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

1. Look for the setting called `system-default-registry` and choose **Edit**.

    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)

**Result:** Rancher will use your private registry to pull system images.

# Setting a Private Registry with Credentials for Deploying Clusters

You can follow these steps to configure a private registry when you provision a cluster with Rancher:

1. When you create a cluster through the Rancher UI, go to the **Cluster Options** section and click **Show Advanced Options.**
1. In the <b>Enable Private Registries</b> section, click **Enabled.**
1. Enter the registry URL and credentials.
1. Click **Save.**

**Result:** The new cluster will be able to pull images from the private registry.

If you are installing Rancher v2.3.0, the installation is complete.

If you are installing Rancher prior to v2.3.0, the final step is to [configure the Rancher system charts.]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0)
