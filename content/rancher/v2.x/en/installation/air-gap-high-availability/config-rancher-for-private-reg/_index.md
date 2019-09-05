---
title: "5. Configure Rancher for the Private Registry"
weight: 500
aliases:

---

Rancher needs to be configured to use the private registry in order to provision any [Rancher launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) or [Rancher tools]({{< baseurl >}}/rancher/v2.x/en/tools/).

>**Note:** If you want to configure Rancher to use your private registry when starting the rancher/rancher container, you can use the chart variable `systemDefaultRegistry`.

1. Log into Rancher and configure the default admin password.

1. Go into the **Settings** view.

    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

1. Look for the setting called `system-default-registry` and choose **Edit**.

    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)

### [Next: Configure Rancher System Charts]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-system-charts/)
