---
title: Upgrades
weight: 1005
---
This section contains information about how to upgrade your Rancher server to a newer version.

> **Note:** If you are upgrading from from Rancher v2.0.13 or earlier, or v2.1.8 or earlier, and your cluster's certificates have expired, you will need to perform [additional steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/certificate-rotation/#rotating-expired-certificates-after-upgrading-older-rancher-versions) to rotate the certificates.

### Single Node Install

- [Upgrading a Single Node Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-upgrade/)
- [Upgrading an Air Gapped Single Node Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-air-gap-upgrade/)

### Upgrading to an HA Helm Chart

- [Upgrade an HA Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/ha-server-upgrade-helm/)
- [Upgrade a Air Gap HA Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/ha-server-upgrade-helm-airgap/)
- [Migrating from an RKE Add-on Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/)

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#installation-outline).
>
>If you are currently using the RKE add-on install method, see [Migrating from a RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.
