---
title: Dual-stack
weight: 255
---

As of RKE `v1.3.0`, [dual-stack](https://kubernetes.io/docs/concepts/services-networking/dual-stack/) networking support has been added, which allows allocating both IPv4 and IPv6 addresses to pods and services.

### Requirements

In order to use the dual-stack feature, RKE and the infrastructure it's deploy to must be configured as follows:

- Kubernetes 1.21 or newer is used.
- RKE is configured to use Calico as the Container Network Interface (CNI) provider. Other providers are not supported.
- RKE is deployed on Amazon EC2 instances with the following prerequisites:
 - Enable IPv6 support: set the network range at VPC and its subnetworks.
 - Add a IPv6 default gateway to VPC routes.
 - Add inbound/outbound rules for IPv6 traffic to your cluster's security group(s).
 - Ensure instances have `Auto-assign IPv6 IP` enabled. See the [AWS documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html) for instructions.
 - Disable source/destination checks on all instances in the cluster. See the [AWS documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html#EIP_Disable_SrcDestCheck) for instructions.

For more information on configuring your AWS enivronment for IPv6, refer to the AWS [Getting started with IPv6](https://docs.aws.amazon.com/vpc/latest/userguide/get-started-IPv6.html) documentation.

### Example RKE Configuration

The following is an example RKE configuration that can be used to deploy RKE with dual-stack support configured:


```
kubernetes_version: "v1.21.1-rancher2-1"
services:
  kube-api:
    service_cluster_ip_range: 10.43.0.0/16,fd98::/108
  kube-controller:
    service_cluster_ip_range: 10.43.0.0/16,fd98::/108
    cluster_cidr: 10.42.0.0/16,fd01::/64

network:
  plugin: calico
```
