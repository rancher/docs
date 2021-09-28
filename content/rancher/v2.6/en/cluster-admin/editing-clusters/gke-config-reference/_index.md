---
title: GKE Cluster Configuration Reference
shortTitle: GKE Cluster Configuration
weight: 3
---

# Changes in Rancher v2.6

- Support for additional configuration options:
  - Project network isolation
  - Network tags

# Cluster Location

| Value | Description |
|--------|--------------|
| Location Type | Zonal or Regional. With GKE, you can create a cluster tailored to the availability requirements of your workload and your budget. By default, a cluster's nodes run in a single compute zone. When multiple zones are selected, the cluster's nodes will span multiple compute zones, while the controlplane is located in a single zone. Regional clusters increase the availability of the controlplane as well. For help choosing the type of cluster availability, refer to [these docs.](https://cloud.google.com/kubernetes-engine/docs/best-practices/scalability#choosing_a_regional_or_zonal_control_plane) |
| Zone | Each region in Compute engine contains a number of zones. For more information about available regions and zones, refer to [these docs.](https://cloud.google.com/compute/docs/regions-zones#available) |
| Additional Zones | For zonal clusters, you can select additional zones to create a [multi-zone cluster.](https://cloud.google.com/kubernetes-engine/docs/concepts/types-of-clusters#multi-zonal_clusters) |
| Region | For [regional clusters,](https://cloud.google.com/kubernetes-engine/docs/concepts/types-of-clusters#regional_clusters) you can select a region. For more information about available regions and zones, refer to [this section](https://cloud.google.com/compute/docs/regions-zones#available). The first part of each zone name is the name of the region. |

# Cluster Options

### Kubernetes Version

_Mutable: yes_

For more information on GKE Kubernetes versions, refer to [these docs.](https://cloud.google.com/kubernetes-engine/versioning)

### Container Address Range

_Mutable: no_

The IP address range for pods in the cluster. Must be a valid CIDR range, e.g. 10.42.0.0/16. If not specified, a random range is automatically chosen from 10.0.0.0/8 and will exclude ranges already allocated to VMs, other clusters, or routes. Automatically chosen ranges may conflict with reserved IP addresses, dynamic routes, or routes within VPCs peering with the cluster.

### Network

_Mutable: no_

The Compute Engine Network that the cluster connects to. Routes and firewalls will be created using this network. If using [Shared VPCs](https://cloud.google.com/vpc/docs/shared-vpc), the VPC networks that are shared to your project will appear here. will be available to select in this field. For more information, refer to [this page](https://cloud.google.com/vpc/docs/vpc#vpc_networks_and_subnets).

### Node Subnet / Subnet

_Mutable: no_

The Compute Engine subnetwork that the cluster connects to. This subnetwork must belong to the network specified in the **Network** field. Select an existing subnetwork, or select "Auto Create Subnetwork" to have one automatically created. If not using an existing network, **Subnetwork Name** is required to generate one. If using [Shared VPCs](https://cloud.google.com/vpc/docs/shared-vpc), the VPC subnets that are shared to your project will appear here. If using a Shared VPC network, you cannot select "Auto Create Subnetwork". For more information, refer to [this page.](https://cloud.google.com/vpc/docs/vpc#vpc_networks_and_subnets)

### Subnetwork Name

_Mutable: no_

Automatically create a subnetwork with the provided name. Required if "Auto Create Subnetwork" is selected for **Node Subnet** or **Subnet**. For more information on subnetworks, refer to [this page.](https://cloud.google.com/vpc/docs/vpc#vpc_networks_and_subnets)

### Ip Aliases

_Mutable: no_

Enable [alias IPs](https://cloud.google.com/vpc/docs/alias-ip). This enables VPC-native traffic routing. Required if using [Shared VPCs](https://cloud.google.com/vpc/docs/shared-vpc).

### Network Policy

_Mutable: yes_

Enable network policy enforcement on the cluster. A network policy defines the level of communication that can occur between pods and services in the cluster. For more information, refer to [this page.](https://cloud.google.com/kubernetes-engine/docs/how-to/network-policy)

### Project Network Isolation

_Mutable: yes_

choose whether to enable or disable inter-project communication. Note that enabling Project Network Isolation will automatically enable Network Policy and Network Policy Config, but not vice versa.

### Node Ipv4 CIDR Block

_Mutable: no_

The IP address range of the instance IPs in this cluster. Can be set if "Auto Create Subnetwork" is selected for **Node Subnet** or **Subnet**. Must be a valid CIDR range, e.g. 10.96.0.0/14. For more information on how to determine the IP address range, refer to [this page.](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips#cluster_sizing)

### Cluster Secondary Range Name

_Mutable: no_

The name of an existing secondary range for Pod IP addresses. If selected, **Cluster Pod Address Range** will automatically be populated. Required if using a Shared VPC network.

### Cluster Pod Address Range

_Mutable: no_

The IP address range assigned to pods in the cluster. Must be a valid CIDR range, e.g. 10.96.0.0/11. If not provided, will be created automatically. Must be provided if using a Shared VPC network. For more information on how to determine the IP address range for your pods, refer to [this section.](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips#cluster_sizing_secondary_range_pods)

### Services Secondary Range Name

_Mutable: no_

The name of an existing secondary range for service IP addresses. If selected, **Service Address Range** will be automatically populated. Required if using a Shared VPC network.

### Service Address Range

_Mutable: no_

The address range assigned to the services in the cluster. Must be a valid CIDR range, e.g. 10.94.0.0/18. If not provided, will be created automatically. Must be provided if using a Shared VPC network. For more information on how to determine the IP address range for your services, refer to [this section.](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips#cluster_sizing_secondary_range_svcs)

### Private Cluster

_Mutable: no_

> Warning: private clusters require additional planning and configuration outside of Rancher. Refer to the [private cluster guide]({{< baseurl >}}/rancher/v2.6/en/cluster-provisioning/hosted-kubernetes-clusters/gke/private-clusters/).

Assign nodes only internal IP addresses. Private cluster nodes cannot access the public internet unless additional networking steps are taken in GCP.

### Enable Private Endpoint

> Warning: private clusters require additional planning and configuration outside of Rancher. Refer to the [private cluster guide]({{< baseurl >}}/rancher/v2.6/en/cluster-provisioning/hosted-kubernetes-clusters/gke/#private-clusters).

_Mutable: no_

Locks down external access to the control plane endpoint. Only available if **Private Cluster** is also selected. If selected, and if Rancher does not have direct access to the Virtual Private Cloud network the cluster is running in, Rancher will provide a registration command to run on the cluster to enable Rancher to connect to it.

### Master IPV4 CIDR Block

_Mutable: no_

The IP range for the control plane VPC.

### Master Authorized Network

_Mutable: yes_

Enable control plane authorized networks to block untrusted non-GCP source IPs from accessing the Kubernetes master through HTTPS. If selected, additional authorized networks may be added. If the cluster is created with a public endpoint, this option is useful for locking down access to the public endpoint to only certain networks, such as the network where your Rancher service is running. If the cluster only has a private endpoint, this setting is required.

# Additional Options

### Cluster Addons

Additional Kubernetes cluster components. For more information, refer to [this page.](https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters#Cluster.AddonsConfig)

#### Horizontal Pod Autoscaling

_Mutable: yes_

The Horizontal Pod Autoscaler changes the shape of your Kubernetes workload by automatically increasing or decreasing the number of Pods in response to the workload's CPU or memory consumption, or in response to custom metrics reported from within Kubernetes or external metrics from sources outside of your cluster. For more information, see [this page.](https://cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler)

#### HTTP (L7) Load Balancing

_Mutable: yes_

HTTP (L7) Load Balancing distributes HTTP and HTTPS traffic to backends hosted on GKE. For more information, refer to [this page.](https://cloud.google.com/kubernetes-engine/docs/tutorials/http-balancer)

#### Network Policy Config (master only)

_Mutable: yes_

Configuration for NetworkPolicy. This only tracks whether the addon is enabled or not on the master, it does not track whether network policy is enabled for the nodes.

### Cluster Features (Alpha Features)

_Mutable: no_

Turns on all Kubernetes alpha API groups and features for the cluster. When enabled, the cluster cannot be upgraded and will be deleted automatically after 30 days. Alpha clusters are not recommended for production use as they are not covered by the GKE SLA. For more information, refer to [this page.](https://cloud.google.com/kubernetes-engine/docs/concepts/alpha-clusters)

### Logging Service

_Mutable: yes_

The logging service the cluster uses to write logs. Use either [Cloud Logging](https://cloud.google.com/logging) or no logging service in which case no logs are exported from the cluster.

### Monitoring Service

_Mutable: yes_

The monitoring service the cluster uses to write metrics. Use either [Cloud Monitoring](https://cloud.google.com/monitoring) or monitoring service in which case no metrics are exported from the cluster.


### Maintenance Window

_Mutable: yes_

Set the start time for a 4 hour maintenance window. The time is specified in the UTC time zone using the HH:MM format. For more information, refer to [this page.](https://cloud.google.com/kubernetes-engine/docs/concepts/maintenance-windows-and-exclusions)

# Node Pools

In this section, enter details describing the configuration of each node in the node pool.

### Kubernetes Version

_Mutable: yes_

The Kubernetes version for each node in the node pool. For more information on GKE Kubernetes versions, refer to [these docs.](https://cloud.google.com/kubernetes-engine/versioning)

### Image Type

_Mutable: yes_

The node operating system image. For more information for the node image options that GKE offers for each OS, refer to [this page.](https://cloud.google.com/kubernetes-engine/docs/concepts/node-images#available_node_images)

> Note: the default option is "Container-Optimized OS with Docker". The read-only filesystem on GCP's Container-Optimized OS is not compatible with the [legacy logging]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging) implementation in Rancher. If you need to use the legacy logging feature, select "Ubuntu with Docker" or "Ubuntu with Containerd". The [current logging feature]({{<baseurl>}}/rancher/v2.6/en/logging) is compatible with the Container-Optimized OS image.

> Note: if selecting "Windows Long Term Service Channel" or "Windows Semi-Annual Channel" for the node pool image type, you must also add at least one Container-Optimized OS or Ubuntu node pool.

### Machine Type

_Mutable: no_

The virtualized hardware resources available to node instances. For more information on Google Cloud machine types, refer to [this page.](https://cloud.google.com/compute/docs/machine-types#machine_types)

### Root Disk Type

_Mutable: no_

Standard persistent disks are backed by standard hard disk drives (HDD), while SSD persistent disks are backed by solid state drives (SSD). For more information, refer to [this section.](https://cloud.google.com/compute/docs/disks)

### Local SSD Disks

_Mutable: no_

Configure each node's local SSD disk storage in GB. Local SSDs are physically attached to the server that hosts your VM instance. Local SSDs have higher throughput and lower latency than standard persistent disks or SSD persistent disks. The data that you store on a local SSD persists only until the instance is stopped or deleted. For more information, see [this section.](https://cloud.google.com/compute/docs/disks#localssds)

### Preemptible nodes (beta)

_Mutable: no_

Preemptible nodes, also called preemptible VMs, are Compute Engine VM instances that last a maximum of 24 hours in general, and provide no availability guarantees. For more information, see [this page.](https://cloud.google.com/kubernetes-engine/docs/how-to/preemptible-vms)

### Taints

_Mutable: no_

When you apply a taint to a node, only Pods that tolerate the taint are allowed to run on the node. In a GKE cluster, you can apply a taint to a node pool, which applies the taint to all nodes in the pool.

### Node Labels

_Mutable: no_

You can apply labels to the node pool, which applies the labels to all nodes in the pool.

Invalid labels can prevent upgrades or can prevent Rancher from starting. For details on label syntax requirements, see the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set)

### Network Tags

_Mutable: no_

You can add network tags to the node pool to make firewall rules and routes between subnets. Tags will apply to all nodes in the pool.

For details on tag syntax and requirements, see the [Kubernetes documentation](https://cloud.google.com/vpc/docs/add-remove-network-tags).

# Group Details

In this section, enter details describing the node pool.

### Name

_Mutable: no_

Enter a name for the node pool.

### Initial Node Count

_Mutable: yes_

Integer for the starting number of nodes in the node pool.

### Max Pod Per Node

_Mutable: no_

GKE has a hard limit of 110 Pods per node. For more information on the Kubernetes limits, see [this section.](https://cloud.google.com/kubernetes-engine/docs/best-practices/scalability#dimension_limits)

### Autoscaling

_Mutable: yes_

Node pool autoscaling dynamically creates or deletes nodes based on the demands of your workload. For more information, see [this page.](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler)

### Auto Repair

_Mutable: yes_

GKE's node auto-repair feature helps you keep the nodes in your cluster in a healthy, running state. When enabled, GKE makes periodic checks on the health state of each node in your cluster. If a node fails consecutive health checks over an extended time period, GKE initiates a repair process for that node. For more information, see the section on [auto-repairing nodes.](https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair)

### Auto Upgrade

_Mutable: yes_

When enabled, the auto-upgrade feature keeps the nodes in your cluster up-to-date with the cluster control plane (master) version when your control plane is [updated on your behalf.](https://cloud.google.com/kubernetes-engine/upgrades#automatic_cp_upgrades) For more information about auto-upgrading nodes, see [this page.](https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-upgrades)

### Access Scopes

_Mutable: no_

Access scopes are the legacy method of specifying permissions for your nodes.

- **Allow default access:** The default access for new clusters is the [Compute Engine default service account.](https://cloud.google.com/compute/docs/access/service-accounts?hl=en_US#default_service_account)
- **Allow full access to all Cloud APIs:** Generally, you can just set the cloud-platform access scope to allow full access to all Cloud APIs, then grant the service account only relevant IAM roles. The combination of access scopes granted to the virtual machine instance and the IAM roles granted to the service account determines the amount of access the service account has for that instance.
- **Set access for each API:** Alternatively, you can choose to set specific scopes that permit access to the particular API methods that the service will call.

For more information, see the [section about enabling service accounts for a VM.](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances)


### Configuring the Refresh Interval

The refresh interval can be configured through the setting "gke-refresh", which is an integer representing seconds.

The default value is 300 seconds.

The syncing interval can be changed by running `kubectl edit setting gke-refresh`.

The shorter the refresh window, the less likely any race conditions will occur, but it does increase the likelihood of encountering request limits that may be in place for GCP APIs.

