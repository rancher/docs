---
title: Upgrades
weight: 2
aliases:
  - /rancher/v2.5/en/installation/install-rancher-on-linux/upgrades
---

> RancherD is an experimental feature.

When RancherD is upgraded, the Rancher Helm controller and the Fleet pods are upgraded.

During a RancherD upgrade, there is very little downtime, but it is possible that RKE2 may be down for a minute, during which you could lose access to Rancher.

When Rancher is installed with RancherD, the underlying Kubernetes cluster can't be upgraded from the Rancher UI. It needs to be upgraded using the RancherD CLI.

### Upgrading the Rancher Helm Chart without Upgrading the Underlying Cluster

To upgrade Rancher without upgrading the underlying Kubernetes cluster, follow these steps.

> Before upgrading, we recommend that you should:
> 
> - Create a backup of the Rancher server using the [backup application.]({{<baseurl>}}/rancher/v2.5/en/backups/v2.5/back-up-rancher/)
> - Review the known issues for the Rancher version you are upgrading to. The known issues are listed in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)

1. Uninstall the chart with Helm:

    ```
    helm uninstall rancher
    ```

2. Reinstall the Rancher chart with Helm. To install a specific Rancher version, use the `--version` flag. For example: 

    ```
    helm install rancher rancher-latest/rancher \
    --namespace cattle-system \
    --set hostname=rancher.my.org \
    --version 2.5.1
    ```

**Result:** Rancher is upgraded to the new version.

If necessary, restore Rancher from backup by following [these steps.]({{<baseurl>}}/rancher/v2.5/en/backups/restoring-rancher/)

### Upgrading Both Rancher and the Underlying Cluster

Upgrade both RancherD and the underlying Kubernetes cluster by re-running the RancherD installation script.

> Before upgrading, we recommend that you should:
> 
> - Create a backup of the Rancher server using the [backup application.]({{<baseurl>}}/rancher/v2.5/en/backups/v2.5/back-up-rancher/)
> - Review the known issues for the Rancher version you are upgrading to. The known issues are listed in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)

```
sudo curl -sfL https://get.rancher.io | sudo sh -
```

To specify a specific version to upgrade to, use `INSTALL_RANCHERD_VERSION` environment variable:

```
curl -sfL https://get.rancher.io | INSTALL_RANCHERD_VERSION=v2.5.1 sh -
```

Then launch the server:

```
systemctl enable rancherd-server
systemctl start rancherd-server
```

The upgrade can also be performed by manually installing the binary of the desired version.


