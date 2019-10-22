---
title: Installation Requirements
weight: 1
aliases:
  - /rancher/v2.x/en/hosts/amazon/#required-ports-for-rancher-to-work/
  - /rancher/v2.x/en/installation/references
---

This page describes the requirements for the nodes where the Rancher server will be installed.

> This section is about the requirements for a Rancher cluster, not the clusters that run your apps and services. The OS and Docker requirements are the same for the Rancher cluster and user clusters, but the requirements for networking and hardware are different. For user cluster requirements, refer to the [node requirements for a user cluster.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/node-requirements/)Your workloads should not run in the same cluster as Rancher. 

Make sure the nodes for the Rancher server fulfill the following requirements:

- [Operating Systems and Docker Requirements](#operating-systems-and-docker)
- [Hardware Requirements](#hardware-requirements)
  - [CPU and Memory](#cpu-and-memory)
  - [Disks](#disks)
- [Networking Requirements](#networking-requirements)
  - [Node IP Addresses](#node-ip-addresses)
  - [Port Requirements](#port-requirements)

For a list of best practices that we recommend for running the Rancher server in production, refer to the [best practices section.]({{<baseurl>}}/rancher/v2.x/en/best-practices/deployment-types/)

# Operating Systems and Docker Requirements

Rancher is tested on the following operating systems and their subsequent non-major releases with a supported version of [Docker](https://www.docker.com/).

For details on which OS and Docker versions were tested with each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/all-supported-versions/rancher-v2.3.0/)

- Ubuntu 16.04 (64-bit x86)
- Docker 17.03.x, 18.06.x, 18.09.x
- Ubuntu 18.04 (64-bit x86)
- Docker 18.06.x, 18.09.x
- Red Hat Enterprise Linux (RHEL)/CentOS 7.6 (64-bit x86)
- RHEL Docker 1.13
- Oracle Linux 7 update 6* (64-bit x86)
- Docker 17.03.x, 18.06.x, 18.09.x
- RancherOS 1.5.1 (64-bit x86)
- Docker 17.03.x, 18.06.x, 18.09.x
- Windows Server 2019 (64-bit x86)
  - Requires Docker Engine - Enterprise Edition (EE)
  - Nodes with Windows Server core version 1809 should use Docker EE-basic 18.09
  - Nodes with Windows Server core version 1903 should use Docker EE-basic 19.03
  - Supported for worker nodes only. See [Configuring Custom Clusters for Windows]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/)

\* Some distributions of Linux derived from RHEL, including Oracle Linux, may have default firewall rules that block communication with Helm. This [how-to guide]({{<baseurl>}}/rancher/v2.x/en/installation/options/firewall) shows how to check the default firewall rules and how to open the ports with `firewalld` if necessary.

If you are using RancherOS, make sure you switch the Docker engine to a supported version using:

```
# Look up available versions
sudo ros engine list

# Switch to a supported version
sudo ros engine switch docker-18.09.2
```

If you plan to run Rancher on ARM64, see [Running on ARM64 (Experimental)]({{<baseurl>}}/rancher/v2.x/en/installation/arm64-platform/) 

For information on how to install Docker, refer to the offical [Docker documentation.](https://docs.docker.com/)

# Hardware Requirements

This section describes the CPU, memory, and disk requirements for the nodes where the Rancher server is installed.

### CPU and Memory

Hardware requirements scale based on the size of your Rancher deployment. Provision each individual node according to the requirements. The requirements are different depending on if you are installing Rancher on a single node or on a high-availability (HA) cluster.

For production environments, the Rancher server should be installed on an HA cluster.

Rancher can also be installed on a single node in a development or testing environment.

{{% tabs %}}
{{% tab "HA Node Requirements" %}} 

These requirements apply to [HA installations]({{<baseurl>}}/rancher/v2.x/en/installation/ha/)  of Rancher.

| Deployment Size | Clusters  | Nodes      | vCPUs                                           | RAM                                             |
| --------------- | --------- | ---------- | ----------------------------------------------- | ----------------------------------------------- |
| Small           | Up to 5   | Up to 50   | 2                                               | 8 GB                                            |
| Medium          | Up to 15  | Up to 200  | 4                                               | 16 GB                                           |
| Large           | Up to 50  | Up to 500  | 8                                               | 32 GB                                           |
| X-Large         | Up to 100 | Up to 1000 | 32                                              | 128 GB                                          |
| XX-Large        | 100+      | 1000+      | [Contact Rancher](https://rancher.com/contact/) | [Contact Rancher](https://rancher.com/contact/) |

{{% /tab %}}
{{% tab "Single Node Requirements" %}}

These requirements apply to [single node]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/) installations of Rancher.

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 1     | 4 GB |
| Medium          | Up to 15 | Up to 200 | 2     | 8 GB |

{{% /tab %}}
{{% /tabs %}}

### Disks

Rancher performance depends on etcd in the cluster performance. To ensure optimal speed, we recommend always using SSD disks to back your Rancher management Kubernetes cluster. On cloud providers, you will also want to use the minimum size that allows the maximum IOPS. In larger clusters, consider using dedicated storage devices for etcd data and wal directories.

# Networking Requirements

This section describes the networking requirements for the nodes where the Rancher server is installed.

### Node IP Address

Each node used should have a static IP configured, regardless of whether you are installing Rancher on a single node or on an HA cluster. In case of DHCP, the nodes should have a DHCP reservation to make sure the node gets the same IP allocated.

### Port Requirements

This section describes the port requirements for nodes running the `rancher/rancher` container.

The ports that must be open change according to the type of machines hosting your cluster nodes. For example, if you are deploying Rancher on nodes hosted by an infrastructure provider, port `22` must be open for SSH. The following diagram depicts the ports that are opened for each [cluster type]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning).

In the [HA installation instructions,]({{<baseurl>}}/rancher/v2.x/en/installation/ha) a Rancher server is installed on three nodes, where each node is assigned all three Kubernetes roles: etcd, controlplane, and worker. In that case, the rules below apply to all three of the nodes in the Rancher server cluster.

For a breakdown of the port requirements for etcd nodes, controlplane nodes, and worker nodes in a Kubernetes cluster, refer to the [port requirements for the Rancher Kubernetes Engine.]({{<baseurl>}}/rke/latest/en/os/#ports)

<figcaption>Port Requirements for the Rancher Management Plane</figcaption>

![Basic Port Requirements]({{<baseurl>}}/img/rancher/port-communications.svg)

### Inbound Rules for Rancher Nodes

| Protocol | Port | Source | Description |
|------------|-------|---------|----------------|
| TCP | 80 | Load balancer/proxy that does external SSL termination | Rancher UI/API when external SSL termination is used |
| TCP | 443 | <ul><li>etcd nodes</li><li>controlplane nodes</li><li>worker nodes</li><li>hosted/imported Kubernetes</li><li>any source that needs to be able to use the Rancher UI or API</li></ul> | Rancher agent, Rancher UI/API, kubectl |

### Outbound Rules for Rancher Nodes

| Protocol | Port | Source | Description |
|------------|-------|---------|----------------|
| TCP | 22 | Any node IP from a node created using Node Driver | SSH provisioning of nodes using Node Driver |
| TCP | 443 |  `35.160.43.145/32`, `35.167.242.46/32`, `52.33.59.17/32` | git.rancher.io (catalogs) |
| TCP | 2376 | Any node IP from a node created using Node driver | Docker daemon TLS port used by Docker Machine |
| TCP | 6443 | Hosted/Imported Kubernetes API | Kubernetes API server |

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{< baseurl >}}rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).