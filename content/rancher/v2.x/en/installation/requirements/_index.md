---
title: Node Requirements
weight: 1
aliases:
---

Whether you're configuring Rancher to run in a single-node or high-availability setup, each node running Rancher Server must meet the following requirements.

{{% tabs %}}
{{% tab "Operating Systems and Docker" %}}
Rancher is supported on the following operating systems and their subsequent non-major releases with a supported version of [Docker](https://www.docker.com/).


*   Ubuntu 16.04 (64-bit)
  * Docker 17.03.2, 18.06.2, 18.09.2
*   Red Hat Enterprise Linux (RHEL)/CentOS 7.5 (64-bit)
  * RHEL Docker 1.13
  * Docker 17.03.2, 18.06.2, 18.09.2
*   RancherOS 1.5.1 (64-bit)
  * Docker 17.03.2, 18.06.2, 18.09.2
*   Windows Server version 1803 (64-bit)
  * Docker 17.06

If you are using RancherOS, make sure you switch the Docker engine to a supported version using:<br>
```
# Look up available versions
sudo ros engine list

# Switch to a supported version
sudo ros engine switch docker-18.09.2
```

[Docker Documentation: Installation Instructions](https://docs.docker.com/)

{{% /tab %}}
{{% tab "Hardware" %}}
Hardware requirements scale based on the size of your Rancher deployment. Provision each individual node according to the requirements.

**[HA Node]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/) Requirements**
<table>
    <tr>
    <th>Deployment Size</th>
    <th>Clusters</th>
    <th>Nodes</th>
    <th>vCPUs</th>
    <th>RAM</th>
    </tr>
    <tr>
    <td>Small</td>
    <td>Up to 5</td>
    <td>Up to 50</td>
    <td>2</td>
    <td>8GB</td>
    </tr>
    <tr>
    <td>Medium</td>
    <td>Up to 15</td>
    <td>Up to 200</td>
    <td>4</td>
    <td>16GB</td>
    </tr>
    <tr>
    <td>Large</td>
    <td>Up to 50</td>
    <td>Up to 500</td>
    <td>8</td>
    <td>32GB</td>
    </tr>
    <tr>
    <td>X-Large</td>
    <td>Up to 100</td>
    <td>Up to 1000</td>
    <td>32</td>
    <td>128GB</td>
    </tr>
    <tr>
    <td>XX-Large</td>
    <td>100+</td>
    <td>1000+</td>
    <td colspan="2"><a href="https://rancher.com/contact/"> Contact Rancher</a></td>
    </tr>
</table>

**[Single Node]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/) Requirements**
<table>
 <tr>
 <th>Deployment Size</th>
 <th>Clusters</th>
 <th>Nodes</th>
 <th>vCPUs</th>
 <th>RAM</th>
 </tr>
    <tr>
    <td>Small</td>
    <td>Up to 5</td>
    <td>Up to 50</td>
    <td>1</td>
    <td>4GB</td>
    </tr>
    <tr>
    <td>Medium</td>
    <td>Up to 15</td>
    <td>Up to 200</td>
    <td>2</td>
    <td>8GB</td>
    </tr>
</table>

<br/>

{{% /tab %}}
{{% tab  "Networking" %}}

<h2>Node IP address</h2>

Each node used (either for the Single Node Install, High Availability (HA) Install or nodes that are used in clusters) should have a static IP configured. In case of DHCP, the nodes should have a DHCP reservation to make sure the node gets the same IP allocated.

<h2>Port requirements</h2>

When deploying Rancher in an HA cluster, certain ports on your nodes must be open to allow communication with Rancher. The ports that must be open change according to the type of machines hosting your cluster nodes. For example, if your are deploying Rancher on nodes hosted by an infrastructure, port `22` must be open for SSH. The following diagram depicts the ports that are opened for each [cluster type]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning).

<figcaption>Cluster Type Port Requirements</figcaption>

![Basic Port Requirements]({{< baseurl >}}/img/rancher/port-communications.svg)


{{< requirements_ports_rancher >}}
{{< requirements_ports_rke >}}
{{< ports_aws_securitygroup_nodedriver >}}
{{% /tab %}}
{{% /tabs %}}
