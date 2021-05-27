---
title: Install/Upgrade Rancher with RancherD
weight: 3
aliases:
  - /rancher/v2.5/en/installation/install-rancher-on-linux
---

_Available as of Rancher v2.5.4_

> This is an experimental feature.

We are excited to introduce a new, simpler way to install Rancher called RancherD.

RancherD is a single binary that first launches an RKE2 Kubernetes cluster, then installs the Rancher server Helm chart on the cluster.

- [About RancherD Installs](#about-rancherd-installs)
- [Prerequisites](#prerequisites)
- [Part I: Installing Rancher](#part-i-installing-rancher)
- [Part II: High Availability](#part-ii-high-availability)
- [Upgrades](#upgrades)
- [Configuration](#configuration)
- [Uninstall](#uninstall)
- [RKE2 Documentation](#rke2-documentation)

# About RancherD Installs

When RancherD is launched on a host, it first installs an RKE2 Kubernetes cluster, then deploys Rancher on the cluster as a Kubernetes daemonset.

In both the RancherD install and the Helm CLI install, Rancher is installed as a Helm chart on a Kubernetes cluster.

Configuration and upgrading are also simplified with RancherD. When you upgrade the RancherD binary, both the Kubernetes cluster and the Rancher Helm chart are upgraded.

In Part I of these instructions, you'll learn how to launch RancherD on a single node. The result of following the steps in Part I is a single-node [RKE2](https://docs.rke2.io/) Kubernetes cluster with the Rancher server installed. This cluster can easily become high availability later. If Rancher only needs to manage the local Kubernetes cluster, the installation is complete.

Part II explains how to convert the single-node Rancher installation into a high-availability installation. If the Rancher server will manage downstream Kubernetes clusters, it is important to follow these steps. A discussion of recommended architecture for highly available Rancher deployments can be found in our [Best Practices Guide.]({{<baseurl>}}/rancher/v2.5/en/best-practices/v2.5/rancher-server)

# Prerequisites

### Node Requirements

RancherD must be launched on a Linux OS. At this time, only OSes that leverage systemd are supported.

The Linux node needs to fulfill the [installation requirements]({{<baseurl>}}/rancher/v2.5/en/installation/requirements) for hardware and networking. Docker is not required for RancherD installs.

To install RancherD on SELinux Enforcing CentOS 8 nodes or RHEL 8 nodes, some [additional steps]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/#rancherd-on-selinux-enforcing-centos-8-or-rhel-8-nodes) are required.
### Root Access

Before running the installation commands, you will need to log in as root:

```
sudo -s
```

### Fixed Registration Address

A fixed registration address is recommended for single-node installs and required for high-availability installs with RancherD.

The fixed registration address is an endpoint that is used for two purposes:

- To access the Kubernetes API. So you can, for example, modify your [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) file to point to it instead of a specific node.
- To add new nodes to the Kubernetes cluster. To add nodes to the cluster later, you will run a command on the node that will specify the fixed registration address of the cluster.

If you are installing Rancher on a single node, the fixed registration address makes it possible to add more nodes to the cluster so that you can convert the single-node install to a high-availability install without causing downtime to the cluster. If you don't set up this address when installing the single-node Kubernetes cluster, you would need to re-run the installation script with a fixed registration address in order to add new nodes to the cluster.

The fixed registration can be the IP or hostname of any of the server nodes, but in many cases those may change over time as nodes are created and destroyed. Therefore, you should have a stable endpoint in front of the server nodes.

This endpoint can be set up using any number of approaches, such as:

* A layer 4 (TCP) load balancer
* Round-robin DNS
* Virtual or elastic IP addresses

The following should be taken into consideration when configuring the load balancer or other endpoint:

- The RancherD server process listens on port 9345 for new nodes to register.
- The Kubernetes API is served on port 6443, as normal.
- In RancherD installs, the Rancher UI is served on port 8443 by default. (This is different from Helm chart installs, where port 443 is used by default.)

# Part I: Installing Rancher

### 1. Set up Configurations

To avoid certificate errors with the fixed registration address, you should launch the server with the `tls-san` parameter set. This parameter should refer to your fixed registration address.

This option adds an additional hostname or IP as a Subject Alternative Name in the server's TLS cert, and it can be specified as a list if you would like to access the Kubernetes cluster via both the IP and the hostname.

Create the RancherD config file at `/etc/rancher/rke2/config.yaml`:

```yaml
token: my-shared-secret
tls-san:
  - my-fixed-registration-address.com
  - another-kubernetes-domain.com
```

The first server node establishes the secret token that other nodes would register with if they are added to the cluster.

If you do not specify a pre-shared secret, RancherD will generate one and place it at `/var/lib/rancher/rke2/server/node-token`.

To specify your own pre-shared secret as the token, set the `token` argument on startup.

Installing Rancher this way will use Rancher-generated certificates. To use your own self-signed or trusted certificates, refer to the [configuration guide.]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-linux/rancherd-configuration/#certificates-for-the-rancher-server)

For information on customizing the RancherD Helm chart values.yaml, refer to [this section.]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-linux/rancherd-configuration/#customizing-the-rancherd-helm-chart)

### 2. Launch the first server node

Run the RancherD installer:

```
curl -sfL https://get.rancher.io | sh -
```

The RancherD version can be specified using the `INSTALL_RANCHERD_VERSION` environment variable:

```
curl -sfL https://get.rancher.io | INSTALL_RANCHERD_VERSION=v2.5.4-rc6 sh -
```

Once installed, the `rancherd` binary will be on your PATH. You can check out its help text like this:

```
rancherd --help
NAME:
   rancherd - Rancher Kubernetes Engine 2
...
```

Next, launch RancherD:

```
systemctl enable rancherd-server.service
systemctl start rancherd-server.service
```

When RancherD launches, it installs an RKE2 Kubernetes cluster. Use the following command to see the logs of the Kubernetes cluster as it comes up:

```
journalctl -eu rancherd-server -f
```

### 3. Set up the kubeconfig file with kubectl

Once the Kubernetes cluster is up, set up RancherD’s kubeconfig file and `kubectl`:

```
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml PATH=$PATH:/var/lib/rancher/rke2/bin
```

### 4. Verify that Rancher is installed on the Kubernetes cluster

Now, you can start issuing `kubectl` commands. Use the following commands to verify that Rancher is deployed as a daemonset on the cluster:

```
kubectl get daemonset rancher -n cattle-system
kubectl get pod -n cattle-system
```

If you watch the pods, you will see the following pods installed:

- `helm-operation` pods in the `cattle-system` namespace
- a `rancher` pod and `rancher-webhook` pod in the `cattle-system` namespace
- a `fleet-agent`, `fleet-controller`, and `gitjob` pod in the `fleet-system` namespace
- a `rancher-operator` pod in the `rancher-operator-system` namespace

### 5. Set the initial Rancher password

Once the `rancher` pod is up and running, run the following:

```
rancherd reset-admin
```

This will give you the URL, username and password needed to log into Rancher. Follow that URL, plug in the credentials, and you’re up and running with Rancher!

If Rancher will only manage the local Kubernetes cluster, the installation is complete.

# Part II: High Availability

If you plan to use the Rancher server to manage downstream Kubernetes clusters, Rancher needs to be highly available. In these steps, you will add more nodes to achieve a high-availability cluster. Since Rancher is running as a daemonset, it will automatically launch on the nodes you add.

An odd number of nodes is required because the etcd cluster, which contains the cluster data, needs a majority of live nodes to avoid losing quorum. A loss of quorum could require the cluster to be restored from backup. Therefore, we recommend using three nodes.

When following these steps, you should still be logged in as root.

### 1. Configure the fixed registration address on a new node

Additional server nodes are launched much like the first, except that you must specify the `server` and `token` parameters so that they can successfully connect to the initial server node.

Here is an example of what the RancherD config file would look like for additional server nodes. By default, this config file is expected to be located at `/etc/rancher/rke2/config.yaml`.

```yaml
server: https://my-fixed-registration-address.com:9345
token: my-shared-secret
tls-san:
  - my-fixed-registration-address.com
  - another-kubernetes-domain.com
```

### 2. Launch an additional server node 

Run the installer on the new node:

```
curl -sfL https://get.rancher.io | sh -
```

This will download RancherD and install it as a systemd unit on your host.


Next, launch RancherD:

```
systemctl enable rancherd-server.service
systemctl start rancherd-server.service
```

### 3. Repeat

Repeat steps one and two for another Linux node, bringing the number of nodes in the cluster to three.

**Result:** Rancher is highly available and the installation is complete.

# Upgrades

For information on upgrades and rollbacks, refer to [this page.](./upgrades)

# Configuration

For information on how to configure certificates, node taints, Rancher Helm chart options, or RancherD CLI options, refer to the [configuration reference.](./rancherd-configuration)

# Uninstall

To uninstall RancherD from your system, run the command below. This will shut down the process, remove the RancherD binary, and clean up files used by RancherD.

```
rancherd-uninstall.sh
```

# RKE2 Documentation

For more information on RKE2, the Kubernetes distribution used to provision the underlying cluster, refer to the documentation [here.](https://docs.rke2.io/)