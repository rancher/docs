---
title: "Air-Gap Install"
weight: 40
---

k3s supports pre-loading of containerd images by placing them in the `images` directory for the agent before starting, for example:
```sh
sudo mkdir -p /var/lib/rancher/k3s/agent/images/
sudo cp ./k3s-airgap-images-$ARCH.tar /var/lib/rancher/k3s/agent/images/
```
Images needed for a base install are provided through the releases page, additional images can be created with the `docker save` command.

Offline Helm charts are served from the `/var/lib/rancher/k3s/server/static` directory, and Helm chart manifests may reference the static files with a `%{KUBERNETES_API}%` templated variable. For example, the default traefik manifest chart installs from `https://%{KUBERNETES_API}%/static/charts/traefik-X.Y.Z.tgz`.

If networking is completely disabled k3s may not be able to start (ie ethernet unplugged or wifi disconnected), in which case it may be necessary to add a default route. For example:
```sh
sudo ip -c address add 192.168.123.123/24 dev eno1
sudo ip route add default via 192.168.123.1
```

k3s additionally provides a `--resolv-conf` flag for kubelets, which may help with configuring DNS in air-gap networks.

Upgrades
--------

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

Upgrading an air-gap environment can be accomplished in the following manner:

1. Download air-gap images and install if changed
2. Install new k3s binary (from installer or manual download)
3. Restart k3s (if not restarted automatically by installer)

