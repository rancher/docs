---
title: "4. Configure Rancher for the Private Registry"
weight: 400
aliases:
---

After your private registry is populated with all the required system images, you need to configure Rancher to use the private registry. The steps to configure the private registry are different depending on whether your private registry requires credentials.

If your private registry requires credentials, you need to pass the credentials to Rancher through the UI.

# Configuring the Private Registry from the Rancher UI

>**Note:** If you want to configure the setting when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.

1. Log into Rancher and configure the default admin password.

1. Go into the **Settings** view.

    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

1. Look for the setting called `system-default-registry` and choose **Edit**.

    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)


### [Next: Configure Rancher System Charts]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/config-rancher-system-charts/)
