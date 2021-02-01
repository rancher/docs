---
title: Configuring a Global Default Private Registry
weight: 400
aliases:
---

You might want to use a private Docker registry to share your custom base images within your organization. With a private registry, you can keep a private, consistent, and centralized source of truth for the Docker images that are used in your clusters.

There are two main ways to set up private registries in Rancher: by setting up the global default registry through the **Settings** tab in the global view, and by setting up a private registry in the advanced options in the cluster-level settings. The global default registry is intended to be used for air-gapped setups, for registries that do not require credentials. The cluster-level private registry is intended to be used in all setups in which the private registry requires credentials.

This section is about configuring the global default private registry, and focuses on how to configure the registry from the Rancher UI after Rancher is installed.

For instructions on setting up a private registry with command line options during the installation of Rancher, refer to the [air gapped Docker installation]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/air-gap-single-node) or [air gapped Kubernetes installation]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/air-gap-high-availability) instructions.

If your private registry requires credentials, it cannot be used as the default registry. There is no global way to set up a private registry with authorization for every Rancher-provisioned cluster. Therefore, if you want a Rancher-provisioned cluster to pull images from a private registry with credentials, you will have to [pass in the registry credentials through the advanced cluster options](#setting-a-private-registry-with-credentials-when-deploying-a-cluster) every time you create a new cluster.

# Setting a Private Registry with No Credentials as the Default Registry

1. Log into Rancher and configure the default administrator password.

1. Go into the **Settings** view.

    {{< img "/img/rancher/airgap/settings.png" "Settings" >}}

1. Look for the setting called `system-default-registry` and choose **Edit**.

    {{< img "/img/rancher/airgap/edit-system-default-registry.png" "Edit" >}}

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    {{< img "/img/rancher/airgap/enter-system-default-registry.png" "Save" >}}

**Result:** Rancher will use your private registry to pull system images.

# Setting a Private Registry with Credentials when Deploying a Cluster

You can follow these steps to configure a private registry when you provision a cluster with Rancher:

1. When you create a cluster through the Rancher UI, go to the **Cluster Options** section and click **Show Advanced Options.**
1. In the <b>Enable Private Registries</b> section, click **Enabled.**
1. Enter the registry URL and credentials.
1. Click **Save.**

**Result:** The new cluster will be able to pull images from the private registry.
