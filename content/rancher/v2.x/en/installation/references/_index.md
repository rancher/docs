---
title: Port Requirements
weight: 280
aliases:
  - /rancher/v2.x/en/hosts/amazon/#required-ports-for-rancher-to-work/
---

To operate properly, Rancher requires certain ports to be open on your nodes. During creation of clusters using a cloud service (like Amazon EC2 or DigitalOcean), Rancher opens these ports for you.

The ports that Rancher opens change according to the type of machines hosting your cluster nodes. The following diagram depicts the ports that are opened for each [cluster type]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning).

<sup>Cluster Type Port Requirements</sup>
![Basic Port Requirements]({{< baseurl >}}/img/rancher/port-communications.svg)

{{< requirements_ports_rancher >}}
{{< requirements_ports_rke >}}
{{< ports_aws_securitygroup_nodedriver >}}
