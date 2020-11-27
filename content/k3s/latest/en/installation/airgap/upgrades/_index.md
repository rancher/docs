---
title: Upgrading K3s in an Air Gapped Environment
weight: 1
---

Air gapped K3s Kubernetes clusters can be upgraded using an installation script, or by using an automated upgrade process.

### Install Script Method

Upgrading an air-gap environment can be accomplished in the following manner:

1. Download the new air-gap images (tar file) from the [releases](https://github.com/rancher/k3s/releases) page for the version of K3s you will be upgrading to.
1. Place the tar in the `/var/lib/rancher/k3s/agent/images/` directory on each node. Delete the old tar file.
1. Copy and replace the old K3s binary in `/usr/local/bin` on each node.
1. Copy over the install script at https://get.k3s.io (as it is possible it has changed since the last release).
1. Run the script again just as you had done in the past,
using the same environment variables.
1. Restart the K3s service (if not restarted automatically by installer).

### Automated Upgrades Method

As of v1.17.4+k3s1 K3s supports [automated upgrades]({{< baseurl >}}/k3s/latest/en/upgrades/automated/). To enable this in air-gapped environments, you must ensure the required images are available in your private registry.

You will need the version of rancher/k3s-upgrade that corresponds to the version of K3s you intend to upgrade to. Note, the image tag replaces the `+` in the K3s release with a `-` because Docker images do not support `+`.

You will also need the versions of system-upgrade-controller and kubectl that are specified in the system-upgrade-controller manifest YAML that you will deploy. Check for the latest release of the system-upgrade-controller [here](https://github.com/rancher/system-upgrade-controller/releases/latest) and download the system-upgrade-controller.yaml to determine the versions you need to push to your private registry. For example, in release v0.4.0 of the system-upgrade-controller, these images are specified in the manifest YAML:

```
rancher/system-upgrade-controller:v0.4.0
rancher/kubectl:v0.17.0
```

Once you have added the necessary rancher/k3s-upgrade, rancher/system-upgrade-controller, and rancher/kubectl images to your private registry, follow the [automated upgrades]({{< baseurl >}}/k3s/latest/en/upgrades/automated/) guide.
