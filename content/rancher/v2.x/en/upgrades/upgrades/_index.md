---
title: Upgrades
weight: 1005
---
This section contains information about how to upgrade your Rancher server to a newer version. Regardless if you installed in an air gap environment or not, the upgrade steps mainly depend on whether you have a single node or high-availability installation of Rancher. Select from the following options:

- [Upgrading a Single Node Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node/)
- [Upgrading an HA Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/ha/)

### Known Upgrade Issues

Upgrade Scenario | Issue
---|---
Upgrading to v2.3.0+ | Any user provisioned cluster will be automatically updated upon any edit as tolerations were added to the images used for Kubernetes provisioning.
Upgrading to v2.2.0-v2.2.x | Rancher introduced the [system charts](https://github.com/rancher/system-charts) repository which contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. To be able to use these features in an air gap install, you will need to mirror the `system-charts` repository locally and configure Rancher to use that repository. Please follow the instructions to [configure Rancher system charts]({{< baseurl >}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0).
Upgrading from v2.0.13 or earlier  | If your cluster's certificates have expired, you will need to perform [additional steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/certificate-rotation/#rotating-expired-certificates-after-upgrading-older-rancher-versions) to rotate the certificates.
Upgrading from v2.0.7 or earlier | Rancher introduced the `system` project, which is a project that's automatically created to store important namespaces that Kubernetes needs to operate. During upgrade to v2.0.7+, Rancher expects these namespaces to be unassigned from all projects. Before beginning upgrade, check your system namespaces to make sure that they're unassigned to [prevent cluster networking issues]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#preventing-cluster-networking-issues).

### Caveats
Upgrades _to_ or _from_ any chart in the [rancher-alpha repository]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories/) aren't supported.

### RKE Add-on Installs

**Important: RKE add-on install is only supported up to Rancher v2.0.8**

Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#installation-outline).

If you are currently using the RKE add-on install method, see [Migrating from a RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.
