---
title: Global Configuration
weight: 1100
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/
  - /rancher/v2.x/en/tasks/global-configuration/
---

After installation, the system administrator should configure Rancher to configure security, default settings, and user access.

## Drivers

Drivers in Rancher allow you to manage which providers can be used to deploy [hosted Kubernetes clusters]({{< baseurl >}}rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) or [nodes in an infrastructure provider]({{< baseurl >}}rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/) to allow Rancher to deploy and manage Kubernetes.

For more information, see [Drivers]({{< baseurl >}}/rancher/v2.x/en/admin-settings/drivers/).

## Global DNS

_Available as v2.2.0_

When creating applications that span multiple Kubernetes clusters, a Global DNS entry can be created to route traffic to the endpoints in all of the different clusters. An external DNS server will need be programmed to assign a fully qualified domain name (a.k.a FQDN) to your application. Rancher will use the FQDN you provide and the IP addresses where your application is running to program the DNS. Rancher will gather endpoints from all the Kubernetes clusters running your application and program the DNS.

For more information on how to use this feature, see [Global DNS]({{< baseurl >}}/rancher/v2.x/en/admin-settings/globaldns/).
