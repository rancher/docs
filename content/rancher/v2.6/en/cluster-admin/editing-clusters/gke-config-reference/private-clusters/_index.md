---
title: Private Clusters
weight: 2
aliases:
  - /rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/gke/private-clusters
---

_Available as of v2.5.8_

In GKE, [private clusters](https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept) are clusters whose nodes are isolated from inbound and outbound traffic by assigning them internal IP addresses only. Private clusters in GKE have the option of exposing the control plane endpoint as a publicly accessible address or as a private address. This is different from other Kubernetes providers, which may refer to clusters with private control plane endpoints as "private clusters" but still allow traffic to and from nodes. You may want to create a cluster with private nodes, with or without a public control plane endpoint, depending on your organization's networking and security requirements. A GKE cluster provisioned from Rancher can use isolated nodes by selecting "Private Cluster" in the Cluster Options (under "Show advanced options"). The control plane endpoint can optionally be made private by selecting "Enable Private Endpoint".

### Private Nodes

Because the nodes in a private cluster only have internal IP addresses, they will not be able to install the cluster agent and Rancher will not be able to fully manage the cluster. This can be overcome in a few ways.

#### Cloud NAT

>**Note**
>Cloud NAT will [incur charges](https://cloud.google.com/nat/pricing).

If restricting outgoing internet access is not a concern for your organization, use Google's [Cloud NAT](https://cloud.google.com/nat/docs/using-nat) service to allow nodes in the private network to access the internet, enabling them to download the required images from Dockerhub and contact the Rancher management server. This is the simplest solution.

#### Private registry

>**Note**
>This scenario is not officially supported, but is described for cases in which using the Cloud NAT service is not sufficient.

If restricting both incoming and outgoing traffic to nodes is a requirement, follow the air-gapped installation instructions to set up a private container image [registry](https://rancher.com/docs/rancher/v2.x/en/installation/other-installation-methods/air-gap/) on the VPC where the cluster is going to be, allowing the cluster nodes to access and download the images they need to run the cluster agent. If the control plane endpoint is also private, Rancher will need [direct access](#direct-access) to it.

### Private Control Plane Endpoint

If the cluster has a public endpoint exposed, Rancher will be able to reach the cluster, and no additional steps need to be taken. However, if the cluster has no public endpoint, then considerations must be made to ensure Rancher can access the cluster.

#### Cloud NAT

>**Note**
>Cloud NAT will [incur charges](https://cloud.google.com/nat/pricing).

As above, if restricting outgoing internet access to the nodes is not a concern, then Google's [Cloud NAT](https://cloud.google.com/nat/docs/using-nat) service can be used to allow the nodes to access the internet. While the cluster is provisioning, Rancher will provide a registration command to run on the cluster. Download the [kubeconfig](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl) for the new cluster and run the provided kubectl command on the cluster. Gaining access
to the cluster in order to run this command can be done by creating a temporary node or using an existing node in the VPC, or by logging on to or creating an SSH tunnel through one of the cluster nodes.

#### Direct access

If the Rancher server is run on the same VPC as the cluster's control plane, it will have direct access to the control plane's private endpoint. The cluster nodes will need to have access to a [private registry](#private-registry) to download images as described above.

You can also use services from Google such as [Cloud VPN](https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview) or [Cloud Interconnect VLAN](https://cloud.google.com/network-connectivity/docs/interconnect) to facilitate connectivity between your organization's network and your Google VPC.
