---
title: "Installation"
weight: 20
---

This section contains instructions for installing K3s in various environments. Please ensure you have met the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) before you begin installing K3s.

### Installation Options

*   [Single Server Installation]({{< baseurl >}}/k3s/latest/en/installation/single-server/)

	Install K3s on a single Linux host. Single server installs are recommended for development, test, or production environments where the cluster doesn't have to be readily available for a user-base and some downtime is acceptible.

*   [High Availability (HA) Installation]({{< baseurl >}}/k3s/latest/en/installation/ha/)

	Install K3s on two or more Linux hosts. High Availability installs are recommended for production environments that cannot tolerate any downtime.

*   [Air-Gap Installation]({{< baseurl >}}/k3s/latest/en/installation/airgap/)

	Install K3s in an air-gapped environment. High Availability is recommended for production environments that cannot tolerate any downtime.

### Uninstalling

If you installed K3s with the help of the `install.sh` script an uninstall script is generated during installation, which will be created on your node at `/usr/local/bin/k3s-uninstall.sh` (or as `k3s-agent-uninstall.sh`).
