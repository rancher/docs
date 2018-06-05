---
title: Cloud Providers
weight: 3000
draft: true
---

Starting from v0.1.3 rke supports cloud providers.

### AWS Cloud Provider

To enable AWS cloud provider, you can set the following in the cluster configuration file:
```
cloud_provider:
  name: aws
```

AWS cloud provider has to be enabled on ec2 instances with the right IAM role.

### Azure Cloud provider

Azure cloud provider can be enabled by passing `azure` as the cloud provider name and set of options to the configuration file:
```
cloud_provider:
  name: azure
  cloud_config:
    aadClientId: xxxxxxxxxxxx
    aadClientSecret: xxxxxxxxxxx
    location: westus
    resourceGroup: rke-rg
    subnetName: rke-subnet
    subscriptionId: xxxxxxxxxxx
    vnetName: rke-vnet
    tenantId: xxxxxxxxxx
    securityGroupName: rke-nsg
```

You also have to make sure that the Azure node name must match the kubernetes node name, you can do that by changing the value of hostname_override in the config file:
```
nodes:
  - address: x.x.x.x
    hostname_override: azure-rke1
    user: ubuntu
    role:
    - controlplane
    - etcd
    - worker
```
