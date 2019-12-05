---
title: "Air-Gap Install"
weight: 60
---

In this guide, we are assuming you have created your nodes in your air-gap environment and have a secure Docker private registry on your bastion server.

Installation Outline
--------------------
1. Prepare Images Directory
2. Create Registry YAML
3. Install K3s

### Prepare Images Directory
Obtain the images tar file for your architecture from the [releases](https://github.com/rancher/k3s/releases) page for the version of K3s you will be running.

Place the tar file in the `images` directory before starting K3s on each node, for example:

```sh
sudo mkdir -p /var/lib/rancher/k3s/agent/images/
sudo cp ./k3s-airgap-images-$ARCH.tar /var/lib/rancher/k3s/agent/images/
```

### Create Registry YAML
Create the registries.yaml file at `/etc/rancher/k3s/registries.yaml`. This will tell K3s the necessary details to connect to your private registry.
The registries.yaml file should look like this before plugging in the necessary information:

```
---
mirrors:
  customreg:
    endpoint:
      - "https://ip-to-server:5000"
configs:
  customreg:
    auth:
      username: xxxxxx # this is the registry username
      password: xxxxxx # this is the registry password
    tls:
      cert_file: <path to the cert file used in the registry>
      key_file:  <path to the key file used in the registry>
      ca_file: <path to the ca file used in the registry>
```

Note, at this time only secure registries are supported with K3s (SSL with custom CA)

### Install K3s

Obtain the K3s binary from the [releases](https://github.com/rancher/k3s/releases) page, matching the same version used to get the airgap images tar.
Also obtain the K3s install script at https://get.k3s.io

Place the binary in `/usr/local/bin` on each node.
Place the install script anywhere on each node, name it `install.sh`.

Install K3s on each server:

```
INSTALL_K3S_SKIP_DOWNLOAD=true ./install.sh
```

Install K3s on each agent:

```
INSTALL_K3S_SKIP_DOWNLOAD=true K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken ./install.sh
```

Note, take care to ensure you replace `myserver` with the IP or valid DNS of the server and replace `mynodetoken` with the node-token from the server.
The node-token is on the server at `/var/lib/rancher/k3s/server/node-token`


>**Note:** K3s additionally provides a `--resolv-conf` flag for kubelets, which may help with configuring DNS in air-gap networks.

# Upgrading

Upgrading an air-gap environment can be accomplished in the following manner:

1. Download the new air-gap images (tar file) from the [releases](https://github.com/rancher/k3s/releases) page for the version of K3s you will be upgrading to. Place the tar in the `/var/lib/rancher/k3s/agent/images/` directory on each node. Delete the old tar file.
2. Copy and replace the old K3s binary in `/usr/local/bin` on each node. Copy over the install script at https://get.k3s.io (as it is possible it has changed since the last release). Run the script again just as you had done in the past with the same environment variables.
3. Restart the K3s service (if not restarted automatically by installer).
