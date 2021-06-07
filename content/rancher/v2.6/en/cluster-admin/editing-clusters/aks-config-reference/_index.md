---
title: AKS Cluster Configuration Reference
weight: 4
---


### Changes in v2.6

- Support for node pools
- Support for private clusters
- Enabled autoscaling node pools
- The AKS permissions are now configured in cloud credentials
- For networking, a new field was added in the UI: Support Private Kubernetes Service
- Windows support was removed



### Account Access

Complete each drop-down and field using the information obtained for your IAM policy.

| Setting    | Description       |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Region     | From the drop-down choose the geographical region in which to build your cluster.                                    |
| Cloud Credentials | Select the cloud credentials that you created for your IAM policy. For more information on creating cloud credentials in Rancher, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cloud-credentials/) |

[Microsoft Documentation: How to create and use an SSH public and private key pair](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys)

# OLD

1. Use your subscription ID, tenant ID, app ID, and client secret to give your cluster access to AKS. If you don't have all of that information, you can retrieve it using these instructions:

  - **Client secret:** If you didn't copy the client secret when creating the service principal, you can get a new one if you go to the app registration detail page, then click **Certificates & secrets**, then click **New client secret.** 
  - **Subscription ID:** You can get the subscription ID is available in the portal from **All services > Subscriptions.**



### HTTP Application

This feature allows you to set up an ingress controller in Azure.


# NEW

# Cloud Credentials

### Application ID and Tenant ID

To get the app ID and tenant ID, you can go to the Azure Portal, then click **Azure Active Directory**, then click **App registrations,** then click the name of the service principal. The app ID and tenant ID are both on the app registration detail page. 

### Subscription

# Kubernetes Options

### DNS Prefix

### Monitoring
enabled or disabled

### HTTP Application Routing
enabled or disabled

### Tags

# Node Pools


The Azure interface allows users to specify whether a Primary Node Pool relies on either `system` (normally used for control planes) and `user` (what is most typically needed for Rancher).

For Primary Node Pools, you can specify Mode, OS, Count and Size.

For subsequent node pools, the Rancher UI forces the default of user.

Node Options need to have these two options added: VM Sizes and Node Count, which then tie into Availability Zones (AZ).

Not all regions have support for AZs. 

### Linux Admin Username
azureuser

### Cluster Resource Group
info in UI
### LoadBalancer SKU
Basic or standard

### VM Size

### Node Count
There are maximums tied to subscriptions we need to warn about.
### OS Disk Size

### Networking
Default or advanced

### SSH Public Key

### Node Autoscaler
new


### agentpools


### OS

Linux and Windows pools aren't interchangeable (or cross-accessible)

### OS Disk Size

OS Disk Size: not exposed in the API?

### Maximum Pods per Node

Maximum pods per node defaults to 110 with a maximum of 250.

# Networking

Can adopt HTTP App Routing.

### Network Plugin

### Kubernetes service address range

A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges. For example: 10.0.0.0/16.

### Kubernetes DNS service IP address

An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range. For example: 10.0.0.10

### Docker bridge access
An IP address and netmask assigned to Docker Bridge. It must not be in any Subnet IP ranges, or the Kubernetes service address range. For example: 172:17.0.1/16.

### Support Private Kubernetes Service

### Load Balancing

There are two choices: Standard and Basic. Some are specific to regions and AZs. We default to Standard because Basic has fewer options and may be deprecated soon.

# Private and Public Clusters

There are questions about whether private nodes are in fact public.
