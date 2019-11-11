---
title: "Installation Options"
weight: 20
---

This section contains instructions for installing k3s in testing and production environments. Please ensure you have met the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) before you begin installing k3s.

### Installation Options

*   [Single Master Installation]({{< baseurl >}}/k3s/latest/en/installation/single-server/)

	Install k3s on a single Linux host. Single master installs are recommended for development and test environments, as setup is simple and the cluster doesn't have to be readily available for a user-base.

*   [High Availability (HA) Installation]({{< baseurl >}}/k3s/latest/en/installation/ha/)

	Install k3s on two or more Linux hosts. High Availability installs are recommended for production environments.

*   [Air-Gap Installation]({{< baseurl >}}/k3s/latest/en/installation/airgap/)

	Install k3s in an air-gapped environment. High Availability is recommended for production environments.

### Upgrading

>**Note:** When upgrading, upgrade server nodes first one at a time then any worker nodes.

To upgrade k3s from an older version you can re-run the installation script using the same flags, for example:

```sh
curl -sfL https://get.k3s.io | sh -
```

If you want to upgrade to specific version you can run the following command:

```sh
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=vX.Y.Z-rc1 sh -
```

Or to manually upgrade k3s:

1. Download the desired version of k3s from [releases](https://github.com/rancher/k3s/releases/latest)
2. Install to an appropriate location (normally `/usr/local/bin/k3s`)
3. Stop the old version
4. Start the new version

Restarting k3s is supported by the installation script for systemd and openrc.
To restart manually for systemd use:
```sh
sudo systemctl restart k3s
```

To restart manually for openrc use:
```sh
sudo service k3s restart
```

### Uninstalling

If you installed k3s with the help of the `install.sh` script an uninstall script is generated during installation, which will be created on your node at `/usr/local/bin/k3s-uninstall.sh` (or as `k3s-agent-uninstall.sh`).