---
title: Node Requirements
weight: 1
aliases:
---

Whether you're configuring Rancher to run in a single-node or high-availability setup, each node running Rancher Server must meet the following requirements.

{{% tabs %}}
{{% tab "Operating Systems" %}}
Rancher is supported on the following operating systems and their subsequent releases.

*   Ubuntu 16.04 (64-bit)
*   Red Hat Enterprise Linux 7.5 (64-bit)
*   RancherOS 1.4 (64-bit)

If you are using RancherOS, make sure you switch the Docker engine to a supported version using:<br>
`sudo ros engine switch docker-17.03.2-ce`

{{% /tab %}}
{{% tab "Hardware" %}}
Hardware requirements scale based on the size of your Rancher deployment. Provision each individual node according to the requirements.

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
    <td>Up to 10</td>
    <td>Up to 50</td>
    <td>2</td>
    <td>4GB</td>
    </tr>
    <tr>
    <td>Medium</td>
    <td>Up to 100</td>
    <td>Up to 500</td>
    <td>8</td>
    <td>32GB</td>
    </tr>
    <tr>
    <td>Large</td>
    <td>Over 100</td>
    <td>Over 500</td>
    <td colspan="2"><a href="https://rancher.com/contact/">Contact Rancher</a></td>
    </tr>
</table>
<br/>

{{% /tab %}}
{{% tab "Software" %}}
A supported version of [Docker](https://www.docker.com/) is required.

Supported Versions:

*   `1.12.6`
*   `1.13.1`
*   `17.03.2`

If you are using RancherOS, make sure you switch the Docker engine to a supported version using:<br>
`sudo ros engine switch docker-17.03.2-ce`

[Docker Documentation: Installation Instructions](https://docs.docker.com/)

{{% /tab %}}
{{% tab  "Ports" %}}

When deploying Rancher in an HA cluster, certain ports on your nodes must be open to allow communication with Rancher. The ports that must be open change according to the type of machines hosting your cluster nodes. For example, if your are deploying Rancher on nodes hosted by an IaaS, port `22` must be open for SSH. The following diagram depicts the ports that are opened for each [cluster type]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning).

<sup>Cluster Type Port Requirements</sup>
![Basic Port Requirements]({{< baseurl >}}/img/rancher/port-communications.svg)


{{< requirements_ports_rancher >}}
{{< requirements_ports_rke >}}
{{< ports_aws_securitygroup_nodedriver >}}
{{% /tab %}}
{{% /tabs %}}
