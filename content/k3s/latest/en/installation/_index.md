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

### Uninstalling

If you installed k3s with the help of the `install.sh` script an uninstall script is generated during installation, which will be created on your node at `/usr/local/bin/k3s-uninstall.sh` (or as `k3s-agent-uninstall.sh`).