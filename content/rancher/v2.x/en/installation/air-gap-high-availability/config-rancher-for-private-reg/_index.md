---
title: "5. Configure Rancher for the Private Registry"
weight: 500
aliases:
---

After your private registry is populated with all the required system images, you need to configure Rancher to use the private registry. The steps to configure the private registry are different depending on whether your private registry requires credentials.

If your private registry doesn't require credentials, you can follow the steps below to configure the private registry by changing the settings in the Rancher UI. 

On the other hand, if you are using a private registry that requires credentials, you need to configure RKE to use these credentials when provisioning your cluster. As of RKE v0.1.10, RKE supports specifying a default registry from the list of private registries to be used with all system images. This allows RKE to assume that you want to pull all of the system images from your private registry, and it will use the [ default private registry credentials]({{<baseurl>}}/rke/latest/en/config-options/private-registries/#default-registry) that you specify in your `cluster.yml`. For more information, you can refer to the documentation about [configuring RKE to use private registries]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#private-registries).

# Changing the Default Private Registry from the Rancher UI

For more information on using a private registry with Rancher, you can refer to the [documentation about registries]({{<baseurl>}}/rancher/v2.x/en/k8s-in-rancher/registries/#using-a-private-registry).

>**Note:** If you want to configure Rancher to use your private registry when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.

1. Log into Rancher and configure the default admin password.

1. Go into the **Settings** view.

    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

1. Look for the setting called `system-default-registry` and choose **Edit**.

    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)

### [Next: Configure Rancher System Charts]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-system-charts/)
