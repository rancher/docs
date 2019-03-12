---
title: Drivers
weight: 3500
---

Drivers in Rancher allow you to manage clusters and nodes across a variety of infrastructure types within the Rancher UI.

### Rancher drivers enable
*  The flexibility to create your own driver for your infrastructure needs
*  Easily adopt new infrastructure into your existing Rancher workflow

\
There are two types of drivers within Rancher
## [Cluster Drivers]({{< baseurl >}}rancher/v2.x/en/drivers/cluster-drivers/)

_Available as of v2.2_ \
Cluster drivers allow the provisioning of [hosted kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) with cloud providers, such as GKE, or [Rancher launched kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with RKE. \
Rancher supports several hosted kubernetes cloud providers out-of-the-box including:

*  Amazon EKS
*  Google GKE
*  Azure AKS

## [Node Drivers]({{< baseurl >}}rancher/v2.x/en/drivers/node-drivers/)  

Node drivers are used for the remote provisioning of hosts. Rancher supports several major cloud providers out-of-the-box including: \


*   Amazon EC2
*   Azure
*   Digital Ocean
*   vSphere

