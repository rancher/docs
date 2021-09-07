---
shortTitle: AKS Cluster Configuration
title: AKS Cluster Configuration Reference
weight: 4
---

# Changes in Rancher v2.6

- Support for adding more than one node pool
- Support for private clusters
- Enabled autoscaling node pools
- The AKS permissions are now configured in cloud credentials

# Role-based Access Control

When provisioning an AKS cluster in the Rancher UI, RBAC cannot be disabled. If role-based access control is disabled for the cluster in AKS, the cluster cannot be registered or imported into Rancher.

Rancher can configure member roles for AKS clusters in the same way as any other cluster. For more information, see the section on [role-based access control.]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac)

# Cloud Credentials

> The configuration information in this section assumes you have already set up a service principal for Rancher. For step-by-step instructions for how to set up the service principal, see [this section.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/hosted-kubernetes-clusters/aks/#prerequisites-in-microsoft-azure)

### Tenant ID

To get the tenant ID, go to the Azure Portal, then click **Azure Active Directory**, then click **App registrations**, then click the name of the service principal. The tenant ID is listed on the app registration detail page as **Directory (tenant) ID**.

### Subscription ID

To get the subscription ID, click **All Services** in the left navigation bar. Then click **Subscriptions**. Go to the name of the subscription that you want to associate with your Kubernetes cluster and copy the **Subscription ID**.

### Client ID

To get the client ID, go to the Azure Portal, then click **Azure Active Directory**, then click **App registrations,** then click the name of the service principal. The client ID is listed on the app registration detail page as **Application (client) ID**.

### Client Secret

You can't retrieve the client secret value after it is created, so if you don't already have a client secret value, you will need to create a new client secret.

To get a new client secret, go to the Azure Portal, then click **Azure Active Directory**, then click **App registrations,** then click the name of the service principal.

Then click **Certificates & secrets** and click **New client secret**. Click **Add**. Then copy the **Value** of the new client secret.

### Environment

Microsoft provides multiple [clouds](https://docs.microsoft.com/en-us/cli/azure/cloud?view=azure-cli-latest) for compliance with regional laws, which are available for your use:

- AzurePublicCloud
- AzureGermanCloud
- AzureChinaCloud
- AzureUSGovernmentCloud

# Account Access

In this section you will need to select an existing Azure cloud credential or create a new one.

For help configuring your Azure cloud credential, see [this section.](#cloud-credentials)

# Cluster Location

Configure the cluster and node location. For more information on availability zones for AKS, see the [AKS documentation.](https://docs.microsoft.com/en-us/azure/aks/availability-zones)

The high availability locations include multiple availability zones.

# Cluster Options

### Kubernetes Version

The available Kubernetes versions are dynamically fetched from the Azure API.

### Cluster Resource Group

A resource group is a container that holds related resources for an Azure solution. The resource group can include all the resources for the solution, or only those resources that you want to manage as a group. You decide how you want to allocate resources to resource groups based on what makes the most sense for your organization. Generally, add resources that share the same lifecycle to the same resource group so you can easily deploy, update, and delete them as a group.

Use an existing resource group or enter a resource group name and one will be created for you.

Using a resource group containing an existing AKS cluster will create a new resource group. Azure AKS only allows one AKS cluster per resource group.

For information on managing resource groups, see the [Azure documentation.](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)

### Linux Admin Username

The username used to create an SSH connection to the Linux nodes.

The default username for AKS nodes is `azureuser`.

### SSH Public Key

The key used to create an SSH connection to the Linux nodes.

### Tags

Cluster tags can be useful if your organization uses tags as a way to organize resources across multiple Azure services. These tags don't apply to resources within the cluster.

# Networking Options

### LoadBalancer SKU

Azure load balancers support both standard and basic SKUs (stock keeping units).

For a comparison of standard and basic load balancers, see the official [Azure documentation.](https://docs.microsoft.com/en-us/azure/load-balancer/skus#skus) Microsoft recommends the Standard load balancer.

The Standard load balancer is required if you have selected one or more availability zones, or if you have more than one node pool.

### Network Policy

All pods in an AKS cluster can send and receive traffic without limitations, by default. To improve security, you can define rules that control the flow of traffic. The Network Policy feature in Kubernetes lets you define rules for ingress and egress traffic between pods in a cluster.

Azure provides two ways to implement network policy. You choose a network policy option when you create an AKS cluster. The policy option can't be changed after the cluster is created:

- Azure's own implementation, called Azure Network Policies. The Azure network policy requires the Azure CNI.
- Calico Network Policies, an open-source network and network security solution founded by [Tigera](https://www.tigera.io/).

You can also choose to have no network policy.

For more information about the differences between Azure and Calico network policies and their capabilities, see the [AKS documentation.](https://docs.microsoft.com/en-us/azure/aks/use-network-policies#differences-between-azure-and-calico-policies-and-their-capabilities)

### DNS Prefix
Enter a unique DNS prefix for your cluster's Kubernetes API server FQDN.

### Network Plugin
There are two network plugins: kubenet and Azure CNI.

The [kubenet](https://kubernetes.io/docs/concepts/cluster-administration/network-plugins/#kubenet) Kubernetes plugin is the default configuration for AKS cluster creation. When kubenet is used, each node in the cluster receives a routable IP address. The pods use NAT to communicate with other resources outside the AKS cluster. This approach reduces the number of IP addresses you need to reserve in your network space for pods to use.

With the Azure CNI (advanced) networking plugin, pods get full virtual network connectivity and can be directly reached via their private IP address from connected networks. This plugin requires more IP address space.

For more information on the differences between kubenet and Azure CNI, see the [AKS documentation.](https://docs.microsoft.com/en-us/azure/aks/concepts-network#compare-network-models)

### HTTP Application Routing

When enabled, the HTTP application routing add-on makes it easier to access applications deployed to the AKS cluster. It deploys two components: a [Kubernetes Ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/) and an [External-DNS](https://github.com/kubernetes-incubator/external-dns) controller.

For more information, see the [AKS documentation.](https://docs.microsoft.com/en-us/azure/aks/http-application-routing)

### Set Authorized IP Ranges

You can secure access to the Kubernetes API server using [authorized IP address ranges.](https://docs.microsoft.com/en-us/azure/aks/api-server-authorized-ip-ranges#overview-of-api-server-authorized-ip-ranges)

The Kubernetes API server exposes the Kubernetes API. This component provides the interaction for management tools, such as kubectl. AKS provides a single-tenant cluster control plane with a dedicated API server. By default, the API server is assigned a public IP address, and you should control access to it using Kubernetes-based or Azure-based RBAC.

To secure access to the otherwise publicly accessible AKS control plane and API server, you can enable and use authorized IP ranges. These authorized IP ranges only allow defined IP address ranges to communicate with the API server.

However, even if you use authorized IP address ranges, you should still use Kubernetes RBAC or Azure RBAC to authorize users and the actions they request.

### Container Monitoring

Container monitoring gives you performance visibility by collecting memory and processor metrics from controllers, nodes, and containers that are available in Kubernetes through the Metrics API. Container logs are also collected. After you enable monitoring, metrics and logs are automatically collected for you through a containerized version of the Log Analytics agent for Linux. Metrics are written to the metrics store and log data is written to the logs store associated with your [Log Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview) workspace.

### Log Analytics Workspace Resource Group

The [resource group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups) containing the Log Analytics Workspace. You must create at least one workspace to use Azure Monitor Logs. 

### Log Analytics Workspace Name

Data collected by Azure Monitor Logs is stored in one or more [Log Analytics workspaces.](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/design-logs-deployment) The workspace defines the geographic location of the data, access rights defining which users can access data, and configuration settings such as the pricing tier and data retention.

You must create at least one workspace to use Azure Monitor Logs. A single workspace may be suffxicient for all of your monitoring data, or may choose to create multiple workspaces depending on your requirements. For example, you might have one workspace for your production data and another for testing.

For more information about Azure Monitor Logs, see the [Azure documentation.](https://docs.microsoft.com/en-us/azure/azure-monitor/logs/data-platform-logs)

### Support Private Kubernetes Service

Typically, AKS worker nodes do not get public IPs, regardless of whether the cluster is private. In a private cluster, the control plane does not have a public endpoint.

Rancher can connect to a private AKS cluster in one of two ways.

The first way to ensure that Rancher is running on the same [NAT](https://docs.microsoft.com/en-us/azure/virtual-network/nat-overview) as the AKS nodes.

The second way is to run a command to register the cluster with Rancher. Once the cluster is provisioned, you can run the displayed command anywhere you can connect to the cluster’s Kubernetes API. This command is displayed in a pop-up when you provision an AKS cluster with a private API endpoint enabled.

> **Note:** Please be aware that when registering an existing AKS cluster, the cluster might take some time, possibly hours, to appear in the `Cluster To register` dropdown list. This outcome will be based on region.

For more information about connecting to an AKS private cluster, see the [AKS documentation.](https://docs.microsoft.com/en-us/azure/aks/private-clusters#options-for-connecting-to-the-private-cluster)

# Node Pools

### Mode

The Azure interface allows users to specify whether a Primary Node Pool relies on either `system` (normally used for control planes) or `user` (what is most typically needed for Rancher).

For Primary Node Pools, you can specify Mode, OS, Count and Size.

System node pools always require running nodes, so they cannot be scaled below one node. At least one system node pool is required.

For subsequent node pools, the Rancher UI forces the default of User. User node pools allow you to scale to zero nodes. User node pools don't run any part of the Kubernetes controlplane.

AKS doesn't expose the nodes that run the Kubernetes controlplane components.

### Availability Zones

[Availability zones](https://docs.microsoft.com/en-us/azure/availability-zones/az-overview) are unique physical locations within a region. Each zone is made up of one or more data centers equipped with independent power, cooling, and networking.

Not all regions have support for availability zones. For a list of Azure regions with availability zones, see the [Azure documentation.](https://docs.microsoft.com/en-us/azure/availability-zones/az-region#azure-regions-with-availability-zones)

### VM Size

Choose a size for each VM in the node pool. For details about each VM size, see [this page.](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)

### OS Disk Type

The nodes in the node pool can have either managed or ephemeral disks.

[Ephemeral OS disks](https://docs.microsoft.com/en-us/azure/virtual-machines/ephemeral-os-disks) are created on the local virtual machine storage and not saved to the remote Azure Storage. Ephemeral OS disks work well for stateless workloads, where applications are tolerant of individual VM failures, but are more affected by VM deployment time or reimaging the individual VM instances. With Ephemeral OS disk, you get lower read/write latency to the OS disk and faster VM reimage.

[Azure managed disks](https://docs.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview) are block-level storage volumes that are managed by Azure and used with Azure Virtual Machines. Managed disks are designed for 99.999% availability. Managed disks achieve this by providing you with three replicas of your data, allowing for high durability.

### OS Disk Size

The size in GB for the disk for each node.

### Node Count
The number of nodes in the node pool. The maximum number of nodes may be limited by your [Azure subscription.](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits)

### Max Pods Per Node
The maximum number of pods per node defaults to 110 with a maximum of 250.

### Enable Auto Scaling

When auto scaling is enabled, you will need to enter a minimum and maximum node count.

When Auto Scaling is enabled, you can't manually scale the node pool. The scale is controlled by the AKS autoscaler.
