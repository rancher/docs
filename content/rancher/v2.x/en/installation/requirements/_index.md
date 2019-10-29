---
title: Node Requirements
weight: 1
aliases:
---

Whether you're configuring Rancher to run in a single-node or high-availability setup, each node running Rancher Server must meet the following requirements.

{{% tabs %}}
{{% tab "Operating Systems and Docker" %}}
<br>
Rancher is tested on the following operating systems and their subsequent non-major releases with a supported version of [Docker](https://www.docker.com/).

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

See [Running on ARM64 (Experimental)]({{< baseurl >}}/rancher/v2.x/en/installation/arm64-platform/) if you plan to run Rancher on ARM64.
<br>
<br>
[Docker Documentation: Installation Instructions](https://docs.docker.com/)
<br>
<br>
{{% /tab %}}
{{% tab "Hardware" %}}
<br>
Hardware requirements scale based on the size of your Rancher deployment. Provision each individual node according to the requirements.

**[HA Node]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/) Requirements**

| Deployment Size | Clusters  | Nodes      | vCPUs                                           | RAM                                             |
| --------------- | --------- | ---------- | ----------------------------------------------- | ----------------------------------------------- |
| Small           | Up to 5   | Up to 50   | 2                                               | 8 GB                                            |
| Medium          | Up to 15  | Up to 200  | 4                                               | 16 GB                                           |
| Large           | Up to 50  | Up to 500  | 8                                               | 32 GB                                           |
| X-Large         | Up to 100 | Up to 1000 | 32                                              | 128 GB                                          |
| XX-Large        | 100+      | 1000+      | [Contact Rancher](https://rancher.com/contact/) | [Contact Rancher](https://rancher.com/contact/) |

<br>

**[Single Node]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/) Requirements**

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 1     | 4 GB |
| Medium          | Up to 15 | Up to 200 | 2     | 8 GB |

<br/>

**Disks**

Rancher performance depends on etcd in the cluster performance. To ensure optimal speed, we recommend always using SSD disks to back your Rancher management Kubernetes cluster. On cloud providers, you will also want to use the minimum size that allows the maximum IOPs. In larger clusters consider using dedicated storage devices for etcd data and wal directories.

<br/>

{{% /tab %}}
{{% tab  "Networking" %}}
<br>

### Node IP Address

Each node used (either for the Single Node Install, High Availability (HA) Install or nodes that are used in clusters) should have a static IP configured. In case of DHCP, the nodes should have a DHCP reservation to make sure the node gets the same IP allocated.

### Port Requirements

When deploying Rancher in an HA cluster, certain ports on your nodes must be open to allow communication with Rancher. The ports that must be open change according to the type of machines hosting your cluster nodes. For example, if your are deploying Rancher on nodes hosted by an infrastructure, port `22` must be open for SSH. The following diagram depicts the ports that are opened for each [cluster type]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning).

<figcaption>Cluster Type Port Requirements</figcaption>

![Basic Port Requirements]({{< baseurl >}}/img/rancher/port-communications.svg)

{{< requirements_ports_rancher >}}
{{< requirements_ports_rke >}}
{{< ports_aws_securitygroup_nodedriver >}}
{{% /tab %}}
{{% /tabs %}}
