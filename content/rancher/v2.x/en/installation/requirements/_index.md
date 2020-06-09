---
title: Installation Requirements
description: Learn the node requirements for each node running Rancher server when you’re configuring  Rancher to run either in a Docker or Kubernetes setup
weight: 1
---

This page describes the software, hardware, and networking requirements for the nodes where the Rancher server will be installed. The Rancher server can be installed on a single node or a high-availability Kubernetes cluster.

> It is important to note that if you install Rancher on a Kubernetes cluster, requirements are different from the [node requirements for downstream user clusters,]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/node-requirements/) which will run your apps and services.

Make sure the node(s) for the Rancher server fulfill the following requirements:

- [Operating Systems and Docker Requirements](#operating-systems-and-docker-requirements)
- [Hardware Requirements](#hardware-requirements)
  - [CPU and Memory](#cpu-and-memory)
  - [CPU and Memory for Rancher prior to v2.4.0](#cpu-and-memory-for-rancher-prior-to-v2-4-0)
  - [Disks](#disks)
- [Networking Requirements](#networking-requirements)
  - [Node IP Addresses](#node-ip-addresses)
  - [Port Requirements](#port-requirements)

For a list of best practices that we recommend for running the Rancher server in production, refer to the [best practices section.]({{<baseurl>}}/rancher/v2.x/en/best-practices/deployment-types/)

The Rancher UI works best in Firefox or Chrome.

# Operating Systems and Container Runtime Requirements

Rancher should work with any modern Linux distribution.

For the container runtime, RKE should work with any modern Docker version, while K3s should work with any modern version of Docker or containerd.

Rancher and RKE have been tested and are supported on Ubuntu, CentOS, Oracle Linux, RancherOS, and RedHat Enterprise Linux.

K3s should run on just about any flavor of Linux. However, K3s is tested on the following operating systems and their subsequent non-major releases:

- Ubuntu 16.04 (amd64)
- Ubuntu 18.04 (amd64)
- Raspbian Buster (armhf)

If you are installing Rancher on a K3s cluster with **Raspbian Buster**, follow [these steps]({{<baseurl>}}/k3s/latest/en/advanced/#enabling-legacy-iptables-on-raspbian-buster) to switch to legacy iptables.

If you are installing Rancher on a K3s cluster with Alpine Linux, follow [these steps]({{<baseurl>}}/k3s/latest/en/advanced/#additional-preparation-for-alpine-linux-setup) for additional setup.

For details on which OS and Docker versions were tested with each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

All supported operating systems are 64-bit x86.

The `ntp` (Network Time Protocol) package should be installed. This prevents errors with certificate validation that can occur when the time is not synchronized between the client and server.

Some distributions of Linux may have default firewall rules that block communication with Helm. This [how-to guide]({{<baseurl>}}/rancher/v2.x/en/installation/options/firewall) shows how to check the default firewall rules for Oracle Linux and how to open the ports with `firewalld` if necessary.

If you plan to run Rancher on ARM64, see [Running on ARM64 (Experimental).]({{<baseurl>}}/rancher/v2.x/en/installation/options/arm64-platform/)

### Installing Docker

Docker can be installed by following the steps in the official [Docker documentation.](https://docs.docker.com/) Rancher also provides [scripts]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/installing-docker) to install Docker with one command.

# Hardware Requirements

This section describes the CPU, memory, and disk requirements for the nodes where the Rancher server is installed.

### CPU and Memory

Hardware requirements scale based on the size of your Rancher deployment. Provision each individual node according to the requirements. The requirements are different depending on if you are installing Rancher in a single container with Docker, or if you are installing Rancher on a Kubernetes cluster.

{{% tabs %}}
{{% tab "RKE Install Requirements" %}}

These requirements apply to each host in an [RKE Kubernetes cluster where the Rancher server is installed.]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/)

Performance increased in Rancher v2.4.0. For the requirements of Rancher prior to v2.4.0, refer to [this section.](#cpu-and-memory-for-rancher-prior-to-v2-4-0)

| Deployment Size | Clusters   | Nodes        | vCPUs  | RAM     |
| --------------- | ---------- | ------------ | -------| ------- |
| Small           | Up to 150  | Up to 1500   | 2      | 8 GB    |
| Medium          | Up to 300  | Up to 3000   | 4      | 16 GB   |
| Large           | Up to 500  | Up to 5000   | 8      | 32 GB   |
| X-Large         | Up to 1000 | Up to 10,000 | 16     | 64 GB   |
| XX-Large        | Up to 2000 | Up to 20,000 | 32     | 128 GB  |

[Contact Rancher](https://rancher.com/contact/) for more than 2000 clusters and/or 20,000 nodes. 
{{% /tab %}}

{{% tab "K3s Install Requirements" %}}

These requirements apply to each host in a [K3s Kubernetes cluster where the Rancher server is installed.]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/)

| Deployment Size | Clusters   | Nodes        | vCPUs  | RAM      | Database Size             |
| --------------- | ---------- | ------------ | -------| ---------| ------------------------- |
| Small           | Up to 150  | Up to 1500   | 2      | 8 GB     | 2 cores, 4 GB + 1000 IOPS |
| Medium          | Up to 300  | Up to 3000   | 4      | 16 GB    | 2 cores, 4 GB + 1000 IOPS |
| Large           | Up to 500  | Up to 5000   | 8      | 32 GB    | 2 cores, 4 GB + 1000 IOPS |
| X-Large         | Up to 1000 | Up to 10,000 | 16     | 64 GB    | 2 cores, 4 GB + 1000 IOPS |
| XX-Large        | Up to 2000 | Up to 20,000 | 32     | 128 GB   | 2 cores, 4 GB + 1000 IOPS |

[Contact Rancher](https://rancher.com/contact/) for more than 2000 clusters and/or 20,000 nodes. 

{{% /tab %}}

{{% tab "Docker Install Requirements" %}}

These requirements apply to a host with a [single-node]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker) installation of Rancher.

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 1     | 4 GB |
| Medium          | Up to 15 | Up to 200 | 2     | 8 GB |

{{% /tab %}}
{{% /tabs %}}

### CPU and Memory for Rancher prior to v2.4.0

{{% accordion label="Click to expand" %}}
These requirements apply to installing Rancher on an RKE Kubernetes cluster prior to Rancher v2.4.0:

| Deployment Size | Clusters  | Nodes      | vCPUs                                           | RAM                                             |
| --------------- | --------- | ---------- | ----------------------------------------------- | ----------------------------------------------- |
| Small           | Up to 5   | Up to 50   | 2                                               | 8 GB                                            |
| Medium          | Up to 15  | Up to 200  | 4                                               | 16 GB                                           |
| Large           | Up to 50  | Up to 500  | 8                                               | 32 GB                                           |
| X-Large         | Up to 100 | Up to 1000 | 32                                              | 128 GB                                          |
| XX-Large        | 100+      | 1000+      | [Contact Rancher](https://rancher.com/contact/) | [Contact Rancher](https://rancher.com/contact/) |
{{% /accordion %}}

### Disks

Rancher performance depends on etcd in the cluster performance. To ensure optimal speed, we recommend always using SSD disks to back your Rancher management Kubernetes cluster. On cloud providers, you will also want to use the minimum size that allows the maximum IOPS. In larger clusters, consider using dedicated storage devices for etcd data and wal directories.

# Networking Requirements

This section describes the networking requirements for the node(s) where the Rancher server is installed.

### Node IP Addresses

Each node used should have a static IP configured, regardless of whether you are installing Rancher on a single node or on an HA cluster. In case of DHCP, each node should have a DHCP reservation to make sure the node gets the same IP allocated.

### Port Requirements

This section describes the port requirements for nodes running the `rancher/rancher` container.

The port requirements are different depending on whether you are installing Rancher on a K3s cluster, on an RKE cluster, or in a single Docker container.

{{% tabs %}}
{{% tab "K3s" %}}
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
| TCP      | 443  | <ul><li>server nodes</li><li>agent nodes</li><li>hosted/imported Kubernetes</li><li>any source that needs to be able to use the Rancher UI or API</li></ul> | Rancher agent, Rancher UI/API, kubectl               |

<figcaption>Outbound Rules for Rancher Nodes</figcaption>

| Protocol | Port | Destination                                              | Description                                   |
| -------- | ---- | -------------------------------------------------------- | --------------------------------------------- |
| TCP      | 22   | Any node IP from a node created using Node Driver        | SSH provisioning of nodes using Node Driver   |
| TCP      | 443  | `35.160.43.145/32`, `35.167.242.46/32`, `52.33.59.17/32` | git.rancher.io (catalogs)                     |
| TCP      | 2376 | Any node IP from a node created using Node driver        | Docker daemon TLS port used by Docker Machine |
| TCP      | 6443 | Hosted/Imported Kubernetes API                           | Kubernetes API server                         |

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{<baseurl>}}/rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).

### Additional Port Requirements for Nodes in a K3s Kubernetes Cluster

You will need to open additional ports to launch the Kubernetes cluster that is required for a high-availability installation of Rancher.

The K3s server needs port 6443 to be accessible by the nodes.

The nodes need to be able to reach other nodes over UDP port 8472 when Flannel VXLAN is used. The node should not listen on any other port. K3s uses reverse tunneling such that the nodes make outbound connections to the server and all kubelet traffic runs through that tunnel. However, if you do not use Flannel and provide your own custom CNI, then port 8472 is not needed by K3s.

If you wish to utilize the metrics server, you will need to open port 10250 on each node.

> **Important:** The VXLAN port on nodes should not be exposed to the world as it opens up your cluster network to be accessed by anyone. Run your nodes behind a firewall/security group that disables access to port 8472.

<figcaption>Inbound Rules for Rancher Server Nodes</figcaption>

| Protocol | Port | Source | Description
|-----|-----|----------------|---|
| TCP | 6443 | K3s server nodes | Kubernetes API
| UDP | 8472 | K3s server and agent nodes | Required only for Flannel VXLAN
| TCP | 10250 | K3s server and agent nodes | kubelet

Typically all outbound traffic is allowed.
{{% /tab %}}
{{% tab "RKE" %}}
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

| Protocol | Port | Destination                                              | Description                                   |
| -------- | ---- | -------------------------------------------------------- | --------------------------------------------- |
| TCP      | 22   | Any node IP from a node created using Node Driver        | SSH provisioning of nodes using Node Driver   |
| TCP      | 443  | `35.160.43.145/32`, `35.167.242.46/32`, `52.33.59.17/32` | git.rancher.io (catalogs)                     |
| TCP      | 2376 | Any node IP from a node created using Node driver        | Docker daemon TLS port used by Docker Machine |
| TCP      | 6443 | Hosted/Imported Kubernetes API                           | Kubernetes API server                         |

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{<baseurl>}}/rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).

### Additional Port Requirements for Nodes in an RKE Kubernetes Cluster

You will need to open additional ports to launch the Kubernetes cluster that is required for a high-availability installation of Rancher.

If you follow the Rancher installation documentation for setting up a Kubernetes cluster using RKE, you will set up a cluster in which all three nodes have all three roles: etcd, controlplane, and worker. In that case, you can refer to this list of requirements for each node with all three roles.

If you installed Rancher on a Kubernetes cluster that doesn't have all three roles on each node, refer to the [port requirements for the Rancher Kubernetes Engine (RKE).]({{<baseurl>}}/rke/latest/en/os/#ports) The RKE docs show a breakdown of the port requirements for each role.

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

{{% /tab %}}
{{% tab "Docker" %}}
### Ports for Communication with Downstream Clusters

For a Docker installation, you only need to open the ports required to enable Rancher to communicate with downstream user clusters.

The port requirements depend on the infrastructure you are using. For example, if you are deploying Rancher on nodes hosted by an infrastructure provider, port `22` must be open for SSH.

The following diagram depicts the ports that are opened for each [cluster type]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning).

<figcaption>Port Requirements for the Rancher Management Plane</figcaption>

![Basic Port Requirements]({{<baseurl>}}/img/rancher/port-communications.svg)

The following tables break down the port requirements for Rancher nodes, for inbound and outbound traffic:

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{<baseurl>}}/rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).


<figcaption>Inbound Rules</figcaption>

| Protocol | Port | Source                                                                                                                                                                                | Description                                          |
| -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| TCP      | 80   | Load balancer/proxy that does external SSL termination                                                                                                                                | Rancher UI/API when external SSL termination is used |
| TCP      | 443  | <ul><li>etcd nodes</li><li>controlplane nodes</li><li>worker nodes</li><li>hosted/imported Kubernetes</li><li>any source that needs to be able to use the Rancher UI or API</li></ul> | Rancher agent, Rancher UI/API, kubectl               |


<figcaption>Outbound Rules</figcaption>

| Protocol | Port | Source                                                   | Description                                   |
| -------- | ---- | -------------------------------------------------------- | --------------------------------------------- |
| TCP      | 22   | Any node IP from a node created using Node Driver        | SSH provisioning of nodes using Node Driver   |
| TCP      | 443  | `35.160.43.145/32`, `35.167.242.46/32`, `52.33.59.17/32` | git.rancher.io (catalogs)                     |
| TCP      | 2376 | Any node IP from a node created using Node driver        | Docker daemon TLS port used by Docker Machine |
| TCP      | 6443 | Hosted/Imported Kubernetes API                           | Kubernetes API server                         |

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{<baseurl>}}/rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).
{{% /tab %}}
{{% /tabs %}}
