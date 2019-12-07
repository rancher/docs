---
title: "Upgrades"
weight: 25
---

>**Note:** When upgrading, upgrade server nodes first one at a time then any worker nodes.

To upgrade K3s from an older version you can re-run the installation script using the same flags, for example:

```sh
curl -sfL https://get.k3s.io | sh -
```

If you want to upgrade to specific version you can run the following command:

```sh
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=vX.Y.Z-rc1 sh -
```

Or to manually upgrade K3s:

1. Download the desired version of K3s from [releases](https://github.com/rancher/k3s/releases/latest)
2. Install to an appropriate location (normally `/usr/local/bin/k3s`)
3. Stop the old version
4. Start the new version

Restarting K3s is supported by the installation script for systemd and openrc.
To restart manually for systemd use:
```sh
sudo systemctl restart k3s
```

To restart manually for openrc use:
```sh
sudo service k3s restart
```