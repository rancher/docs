---
title: High Availability (HA) Upgrade
weight: 1020
---

The following instructions will help guide you through upgrading Rancher server [HA installed with the Helm package manager]({{< baseurl >}}/rancher/v2.x/en/installation/ha/).

If you installed Rancher using the RKE Add-On yaml, see these docs to migrate or upgrade.

* [Migrating from RKE Add-On Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/migrating-from-rke-add-on)
* [High Availability (HA) Upgrade - RKE Add-On Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/ha-server-upgrade)

## Prerequisites

### kubectl

Follow the `kubectl` configuration instructions and confirm that you can connect to the Kubernetes cluster running Rancher server.

* [kubectl Installation and Config]({{< baseurl >}}/rancher/v2.x/en/faq/kubectl)

### helm

Install or update `helm` to the latest version.

* [Installing helm](https://docs.helm.sh/using_helm/#installing-helm)

### tiller

Update the helm agent, `tiller` on your cluster.

```
helm init --upgrade --service-account tiller
```

## Backup Your Rancher Cluster

Follow the instructions to take a one-time snapshot of your Rancher server cluster.

* [HA Backups: Take a One-Time Snapshot]({{< baseurl >}}/rancher/v2.x/en/backups/backups/ha-backups/#option-b-one-time-snapshots)

## Upgrade Rancher

Update your local helm repo cache.

```
helm repo update
```

Get the set values from current Rancher release.

```
helm get values rancher

hostname: rancher.my.org
```

Take the values above and use `helm` with `--set` options to upgrade Rancher to the latest version.

```
helm upgrade rancher rancher-stable/rancher --set hostname=rancher.my.org
```
