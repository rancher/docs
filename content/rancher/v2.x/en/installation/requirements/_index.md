---
title: Installation Requirements
description: Learn the node requirements for each node running Rancher server when you’re configuring  Rancher to run either in a single-node or high-availability setup
weight: 1
aliases:
  - /rancher/v2.x/en/installation/references
---

This page describes the software, hardware, and networking requirements for the nodes where the Rancher server will be installed. The Rancher server can be installed on a single node or a high-availability Kubernetes cluster.

> It is important to note that if you install Rancher on a Kubernetes cluster, requirements are different from the [node requirements for downstream user clusters,]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/node-requirements/) which will run your apps and services.

Make sure the node(s) for the Rancher server fulfill the following requirements:

- [Operating Systems and Docker Requirements](#operating-systems-and-docker-requirements)
- [Hardware Requirements](#hardware-requirements)
  - [CPU and Memory](#cpu-and-memory)
  - [Disks](#disks)
- [Networking Requirements](#networking-requirements)
  - [Node IP Addresses](#node-ip-addresses)
  - [Port Requirements](#port-requirements)

For a list of best practices that we recommend for running the Rancher server in production, refer to the [best practices section.]({{<baseurl>}}/rancher/v2.x/en/best-practices/deployment-types/)

# Operating Systems and Docker Requirements

Rancher should work with any modern Linux distribution and any modern Docker version.

Rancher has been tested and is supported with Ubuntu, CentOS, Oracle Linux, RancherOS, and RedHat Enterprise Linux.

For details on which OS and Docker versions were tested with each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

All supported operating systems are 64-bit x86.

The `ntp` (Network Time Protocol) package should be installed. This prevents errors with certificate validation that can occur when the time is not synchronized between the client and server.

> **Note:** Some distributions of Linux derived from RHEL, including Oracle Linux, may have default firewall rules that block communication with Helm. This [how-to guide]({{<baseurl>}}/rancher/v2.x/en/installation/options/firewall) shows how to check the default firewall rules and how to open the ports with `firewalld` if necessary.

If you plan to run Rancher on ARM64, see [Running on ARM64 (Experimental).]({{<baseurl>}}/rancher/v2.x/en/installation/options/arm64-platform/)

### Installing Docker

Docker can be installed by following the steps in the official [Docker documentation.](https://docs.docker.com/) Rancher also provides [scripts]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/installing-docker) to install Docker with one command.

# Hardware Requirements

This section describes the CPU, memory, and disk requirements for the nodes where the Rancher server is installed.

### CPU and Memory

Hardware requirements scale based on the size of your Rancher deployment. Provision each individual node according to the requirements. The requirements are different depending on if you are installing Rancher on a single node or on a high-availability (HA) cluster.

For production environments, the Rancher server should be installed on an HA cluster.

Rancher can also be installed on a single node in a development or testing environment.

{{% tabs %}}
{{% tab "HA Node Requirements" %}}

These requirements apply to [HA installations]({{<baseurl>}}/rancher/v2.x/en/installation/ha/) of Rancher.

| Deployment Size | Clusters  | Nodes      | vCPUs                                           | RAM                                             |
| --------------- | --------- | ---------- | ----------------------------------------------- | ----------------------------------------------- |
| Small           | Up to 5   | Up to 50   | 2                                               | 8 GB                                            |
| Medium          | Up to 15  | Up to 200  | 4                                               | 16 GB                                           |
| Large           | Up to 50  | Up to 500  | 8                                               | 32 GB                                           |
| X-Large         | Up to 100 | Up to 1000 | 32                                              | 128 GB                                          |
| XX-Large        | 100+      | 1000+      | [Contact Rancher](https://rancher.com/contact/) | [Contact Rancher](https://rancher.com/contact/) |

{{% /tab %}}
{{% tab "Single Node Requirements" %}}

These requirements apply to [single node]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node) installations of Rancher.

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 1     | 4 GB |
| Medium          | Up to 15 | Up to 200 | 2     | 8 GB |

{{% /tab %}}
{{% /tabs %}}

### Disks

Rancher performance depends on etcd in the cluster performance. To ensure optimal speed, we recommend always using SSD disks to back your Rancher management Kubernetes cluster. On cloud providers, you will also want to use the minimum size that allows the maximum IOPS. In larger clusters, consider using dedicated storage devices for etcd data and wal directories.

# Networking Requirements

This section describes the networking requirements for the node(s) where the Rancher server is installed.

### Node IP Addresses

Each node used should have a static IP configured, regardless of whether you are installing Rancher on a single node or on an HA cluster. In case of DHCP, each node should have a DHCP reservation to make sure the node gets the same IP allocated.

### Port Requirements

This section describes the port requirements for nodes running the `rancher/rancher` container.

The port requirements are different depending on whether you are installing Rancher on a single node or on a high-availability Kubernetes cluster.

- **For a single-node installation,** you only need to open the ports required to enable Rancher to communicate with downstream user clusters.
- **For a high-availability installation,** the same ports need to be opened, as well as additional ports required to set up the Kubernetes cluster that Rancher is installed on.

{{% tabs %}}
{{% tab "HA Install Port Requirements" %}}
### Ports for Communication with Downstream Clusters

To communicate with downstream clusters, Rancher requires different ports to be open depending on the infrastructure you are using.

For example, if you are deploying Rancher on nodes hosted by an infrastructure provider, port `22` must be open for SSH.

The following diagram depicts the ports that are opened for each [cluster type]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning).

<figcaption>Port Requirements for the Rancher Management Plane</figcaption>

![Basic Port Requirements]({{<baseurl>}}/img/rancher/port-communications.svg)

The following tables break down the port requirements for inbound and outbound traffic:

<figcaption>Inbound Rules for Rancher Nodes</figcaption>

| Protocol | Port | Source                                                                                                                                                                                | Description                                          |
| -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| TCP      | 80   | Load balancer/proxy that does external SSL termination                                                                                                                                | Rancher UI/API when external SSL termination is used |
| TCP      | 443  | <ul><li>etcd nodes</li><li>controlplane nodes</li><li>worker nodes</li><li>hosted/imported Kubernetes</li><li>any source that needs to be able to use the Rancher UI or API</li></ul> | Rancher agent, Rancher UI/API, kubectl               |

<figcaption>Outbound Rules for Rancher Nodes</figcaption>

| Protocol | Port | Source                                                   | Description                                   |
| -------- | ---- | -------------------------------------------------------- | --------------------------------------------- |
| TCP      | 22   | Any node IP from a node created using Node Driver        | SSH provisioning of nodes using Node Driver   |
| TCP      | 443  | `35.160.43.145/32`, `35.167.242.46/32`, `52.33.59.17/32` | git.rancher.io (catalogs)                     |
| TCP      | 2376 | Any node IP from a node created using Node driver        | Docker daemon TLS port used by Docker Machine |
| TCP      | 6443 | Hosted/Imported Kubernetes API                           | Kubernetes API server                         |

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).

### Additional Port Requirements for Nodes in an HA/Kubernetes Cluster

You will need to open additional ports to launch the Kubernetes cluster that are required for a high-availability installation of Rancher.

If you follow the Rancher installation documentation for setting up a Kubernetes cluster using RKE, you will set up a cluster in which all three nodes have all three roles: etcd, controlplane, and worker. In that case, you can refer to this list of requirements for each node with all three roles:

<figcaption>Inbound Rules for Nodes with All Three Roles: etcd, Controlplane, and Worker</figcaption>

Protocol | Port | Source | Description
-----------|------|----------|--------------
TCP | 22 | Linux worker nodes only, and any network that you want to be able to remotely access this node from. | Remote access over SSH
TCP | 80 | Any source that consumes Ingress services | Ingress controller (HTTP)
TCP | 443 | Any source that consumes Ingress services | Ingress controller (HTTPS)
TCP | 2376 | Rancher nodes | Docker daemon TLS port used by Docker Machine (only needed when using Node Driver/Templates)
TCP | 2379 | etcd nodes and controlplane nodes | etcd client requests
TCP | 2380 | etcd nodes and controlplane nodes | etcd peer communication
TCP | 3389 | Windows worker nodes only, and any network that you want to be able to remotely access this node from. | Remote access over RDP
TCP | 6443 | etcd nodes, controlplane nodes, and worker nodes | Kubernetes apiserver
UDP | 8472 | etcd nodes, controlplane nodes, and worker nodes | Canal/Flannel VXLAN overlay networking
TCP | 9099 | the node itself (local traffic, not across nodes) | Canal/Flannel livenessProbe/readinessProbe
TCP | 10250 | controlplane nodes | kubelet
TCP | 10254 | the node itself (local traffic, not across nodes) | Ingress controller livenessProbe/readinessProbe
TCP/UDP | 30000-32767 | Any source that consumes NodePort services | NodePort port range

<figcaption>Outbound Rules for Nodes with All Three Roles: etcd, Controlplane, and Worker</figcaption>

Protocol | Port | Source | Destination | Description
-----------|------|----------|---------------|--------------
TCP | 22 | RKE node | Any node configured in Cluster Configuration File | SSH provisioning of node by RKE
TCP | 443 | Rancher nodes | Rancher agent |
TCP | 2379 | etcd nodes | etcd client requests |
TCP | 2380 | etcd nodes | etcd peer communication |
TCP | 6443 | RKE node | controlplane nodes | Kubernetes API server
TCP | 6443 | controlplane nodes | Kubernetes API server |
UDP | 8472 | etcd nodes, controlplane nodes, and worker nodes | Canal/Flannel VXLAN overlay networking |
TCP | 9099 | the node itself (local traffic, not across nodes) | Canal/Flannel livenessProbe/readinessProbe |
TCP | 10250 | etcd nodes, controlplane nodes, and worker nodes | kubelet |
TCP | 10254 | the node itself (local traffic, not across nodes) | Ingress controller livenessProbe/readinessProbe

The ports that need to be opened for each node depend on the node's Kubernetes role: etcd, controlplane, or worker. If you installed Rancher on a Kubernetes cluster that doesn't have all three roles on each node, refer to the [port requirements for the Rancher Kubernetes Engine (RKE).]({{<baseurl>}}/rke/latest/en/os/#ports) The RKE docs show a breakdown of the port requirements for each role.
{{% /tab %}}
{{% tab "Single Node Port Requirements" %}}
### Ports for Communication with Downstream Clusters

To communicate with downstream clusters, Rancher requires different ports to be open depending on the infrastructure you are using.

For example, if you are deploying Rancher on nodes hosted by an infrastructure provider, port `22` must be open for SSH.

The following diagram depicts the ports that are opened for each [cluster type]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning).

<figcaption>Port Requirements for the Rancher Management Plane</figcaption>

![Basic Port Requirements]({{<baseurl>}}/img/rancher/port-communications.svg)

The following tables break down the port requirements for inbound and outbound traffic:

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).


<figcaption>Inbound Rules for Rancher Nodes</figcaption>

| Protocol | Port | Source                                                                                                                                                                                | Description                                          |
| -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| TCP      | 80   | Load balancer/proxy that does external SSL termination                                                                                                                                | Rancher UI/API when external SSL termination is used |
| TCP      | 443  | <ul><li>etcd nodes</li><li>controlplane nodes</li><li>worker nodes</li><li>hosted/imported Kubernetes</li><li>any source that needs to be able to use the Rancher UI or API</li></ul> | Rancher agent, Rancher UI/API, kubectl               |


<figcaption>Outbound Rules for Rancher Nodes</figcaption>

| Protocol | Port | Source                                                   | Description                                   |
| -------- | ---- | -------------------------------------------------------- | --------------------------------------------- |
| TCP      | 22   | Any node IP from a node created using Node Driver        | SSH provisioning of nodes using Node Driver   |
| TCP      | 443  | `35.160.43.145/32`, `35.167.242.46/32`, `52.33.59.17/32` | git.rancher.io (catalogs)                     |
| TCP      | 2376 | Any node IP from a node created using Node driver        | Docker daemon TLS port used by Docker Machine |
| TCP      | 6443 | Hosted/Imported Kubernetes API                           | Kubernetes API server                         |

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).
{{% /tab %}}
{{% /tabs %}}
