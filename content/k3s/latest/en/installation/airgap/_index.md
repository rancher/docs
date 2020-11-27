---
title: "Air-Gap Install"
weight: 60
---

You can install K3s in an air-gapped environment using two different methods. You can either deploy a private registry and mirror docker.io or you can manually deploy images such as for small clusters.

1. Provide the required images for K3s
  - [Option A: Use a private Docker registry](#option-a-use-a-private-docker-registry)
  - [Option B: Manually deploy images](#option-b-manually-deploy-images)
2. Set environment variables and install K3s
  - [Air gap installation for a single server node]
  - [Air gap installation for agent nodes]
  - [Air gap configuration for a high availability cluster]

This document assumes you have already created your nodes in your air-gap environment and have a Docker private registry on your bastion host.

If you have not yet set up a private Docker registry, refer to the official documentation [here](https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry).

  > For information on upgrading K3s in an air gapped environment, refer to [this section.](../upgrades)

# 1. Provide the Required Images for K3s

### Option A: Use a Private Docker Registry

> **Prerequisites:** This document assumes you have already created your nodes in your air-gap environment and have a Docker private registry on your bastion host. To set up a private Docker registry, refer to the official documentation [here](https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry).

Create and configure the `registry.yaml` file by following [this guide.]({{< baseurl >}}/k3s/latest/en/installation/private-registry)

Once you have completed this, go to the [Install K3s](#install-k3s) section.

### Option B: Manually Deploy Images

> **Prerequisites:** This section assumes the K3s cluster nodes have already been created in your air-gap environment.

This method requires you to manually deploy the necessary images to each node and is appropriate for edge deployments where running a private registry is not practical.

1. Obtain the images tar file for your architecture from the [releases](https://github.com/rancher/k3s/releases) page for the version of K3s you will be running.
1. Place the tar file in the `images` directory, for example:

    ```sh
    sudo mkdir -p /var/lib/rancher/k3s/agent/images/
    sudo cp ./k3s-airgap-images-$ARCH.tar /var/lib/rancher/k3s/agent/images/
    ```

1. Place the k3s binary at /usr/local/bin/k3s and ensure it is executable.

Follow the steps in the next section to install K3s.

# 2. Set Environment Variables and Install K3s

> **Prerequisites:** This section assumes that you have already [set up the private registry](#option-a-use-a-private-docker-registry) or [manually deployed the K3s air-gap images.](#option-b-manually-deploy-images)

1. Obtain the K3s binary from the [releases](https://github.com/rancher/k3s/releases) page, matching the same version used to get the air-gap images.
1. Obtain the K3s install script at https://get.k3s.io.
1. Place the binary in `/usr/local/bin` on each node and ensure it is executable.
1. Place the install script anywhere on each node, and name it `install.sh`.
1. Install K3s on one or more servers.
  - To install K3s on a single node, use [this environment variable and installation command.](#air-gap-installation-for-a-single-server-node)

>**Note:** K3s additionally provides a `--resolv-conf` flag for kubelets, which may help with configuring DNS in air-gap networks.

### Air Gap Installation for a Single Server Node

To install K3s on a single server, run the following on the server node:

    ```
    INSTALL_K3S_SKIP_DOWNLOAD=true ./install.sh
    ```

### Air Gap Installation for Agent Nodes

> Before setting up agents, the setup for [air gapped server nodes](#air-gap-installation-for-server-nodes) must be completed.

To add additional agents, you will run the installation script after setting up the following environment variables on each agent node:

- INSTALL_K3S_SKIP_DOWNLOAD
- K3S_URL
- K3S_TOKEN

An example installation command is as follows:

```
INSTALL_K3S_SKIP_DOWNLOAD=true K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken ./install.sh
```

In the above command,

- Replace `myserver` with the IP or valid DNS of the server.
- Replace `mynodetoken` with the node token from the server, which is typically located at `/var/lib/rancher/k3s/server/node-token`.

### Air Gap Configuration for a High Availability Cluster

In this section, you'll learn how to install K3s using a private registry and an external database.

To skip downloading images and use your manually installed manifests or private registry, you will set the `INSTALL_K3S_SKIP_DOWNLOAD` environment variable to `true` and run your install script locally instead of via curl.

1. On each air gapped node where K3s will be installed, do the following:
  - Copy the k3s binary to /usr/local/bin directory
  - Copy install.sh to the home directory
  - Make the `install.sh` executable
1. On each K3s server node, run the installation script with the environment variable for skipping image downloads set to true.

    The INSTALL_K3S_EXEC environment variable is used to supply additional arguments to the `install.sh` script. It is used like this:

    INSTALL_K3S_EXEC='<insert arguments here'

    For example, to configure K3s to use an external datastore, the datastore endpoint option should be included in the INSTALL_K3s_EXEC variable. Then the installation script will use the external database:

    ```
    INSTALL_K3S_SKIP_DOWNLOAD=true INSTALL_K3S_EXEC='server --datastore-endpoint="mysql://username:password@tcp(hostname:3306)/database-name"' ./install.sh
    ```

    **Note:** The format of the datastore endpoint differs based on the type of database that is used. For more information on configuring the server datastore, refer to the [High Availability with an External DB]({{< baseurl >}}/k3s/latest/en/installation/ha) or [High Availability with Embedded DB (Experimental).]({{< baseurl >}}/k3s/latest/en/installation/ha-embedded)
1. On each K3s agent node, repeat the process above, and use two additional environment variables, as shown in [Air Gap Installation for Agent Nodes:](#air-gap-installation-for-agent-nodes)

    - K3S_URL
    - K3S_TOKEN

# Upgrades

For information on upgrading K3s in an air gapped environment, refer to [this page.](../upgrades)