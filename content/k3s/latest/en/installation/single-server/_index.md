---
title: "Single Server Install"
weight: 20
---

>**Note:** This section contains information on flags and environment variables used for starting a single-server (non-HA) K3s cluster. A High-Availability (HA) K3s cluster is recommended for production environments that cannot tolerate down time.

Installation
------------

K3s is easy to install. To install the latest version, simply run:

```sh
curl -sfL https://get.k3s.io | sh -
```

The install script will attempt to download the latest release. To specify a version for download we can use the `INSTALL_K3S_VERSION` environment variable. For example:
```sh
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=vX.Y.Z-rc1 sh -
```

To install with a specific flag we can use the `INSTALL_K3S_EXEC`
environment variable. For example:
```sh
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--no-flannel" sh -
```

The installer can also be run without performing downloads by setting `INSTALL_K3S_SKIP_DOWNLOAD=true`. For example:
```sh
curl -sfL https://github.com/rancher/k3s/releases/download/vX.Y.Z/k3s -o /usr/local/bin/k3s
chmod 0755 /usr/local/bin/k3s

curl -sfL https://get.k3s.io -o install-k3s.sh
chmod 0755 install-k3s.sh

export INSTALL_K3S_SKIP_DOWNLOAD=true
./install-k3s.sh
```

The full help text for the install script environment variables are as follows:
   - `K3S_*`

     Environment variables which begin with `K3S_` will be preserved for the
     systemd service to use. Setting `K3S_URL` without explicitly setting
     a systemd exec command will default the command to "agent", and we
     enforce that `K3S_TOKEN` or `K3S_CLUSTER_SECRET` is also set.

   - `INSTALL_K3S_SKIP_DOWNLOAD`

     If set to true will not download K3s hash or binary.
     
   - `INSTALL_K3S_SYMLINK`

     If set to 'skip' will not create symlinks, 'force' will overwrite,
     default will symlink if command does not exist in path.

   - `INSTALL_K3S_VERSION`

     Version of K3s to download from github. Will attempt to download the
     latest version if not specified.

   - `INSTALL_K3S_BIN_DIR`

     Directory to install K3s binary, links, and uninstall script to, or use
     /usr/local/bin as the default

   - `INSTALL_K3S_SYSTEMD_DIR`

     Directory to install systemd service and environment files to, or use
     /etc/systemd/system as the default

   - `INSTALL_K3S_EXEC` or script arguments

     Command with flags to use for launching K3s in the systemd service, if
     the command is not specified will default to "agent" if `K3S_URL` is set
     or "server" if not. The final systemd command resolves to a combination
     of EXEC and script args ($@).

     The following commands result in the same behavior:
     ```sh
     curl ... | INSTALL_K3S_EXEC="--no-flannel" sh -s -
     curl ... | INSTALL_K3S_EXEC="server --no-flannel" sh -s -
     curl ... | INSTALL_K3S_EXEC="server" sh -s - --no-flannel
     curl ... | sh -s - server --no-flannel
     curl ... | sh -s - --no-flannel
     ```

   - `INSTALL_K3S_NAME`

     Name of systemd service to create, will default from the K3s exec command
     if not specified. If specified the name will be prefixed with 'k3s-'.

   - `INSTALL_K3S_TYPE`

     Type of systemd service to create, will default from the K3s exec command
     if not specified.

