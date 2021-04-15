---
title: GKE Cluster Configuration Reference
weight: 1
---

{{% tabs %}}
{{% tab "v2.5.8" %}}

# Cluster Location

| Value | Description |
|--------|--------------|
| Location Type | Zonal or Regional. With GKE, you can create a cluster tailored to the availability requirements of your workload and your budget. By default, a cluster's nodes run in a single compute zone. When multiple zones are selected, the cluster's nodes will span multiple compute zones, while the controlplane is located in a single zone. Regional clusters increase the availability of the controlplane as well. For help choosing the type of cluster availability, refer to [these docs.](https://cloud.google.com/kubernetes-engine/docs/best-practices/scalability#choosing_a_regional_or_zonal_control_plane) |
| Zone | Each region in Compute engine contains a number of zones. For more information about available regions and zones, refer to [these docs.](https://cloud.google.com/compute/docs/regions-zones#available) |
| Additional Zones | For zonal clusters, you can select additional zones to create a [multi-zone cluster.](https://cloud.google.com/kubernetes-engine/docs/concepts/types-of-clusters#multi-zonal_clusters) |
| Region | For [regional clusters,](https://cloud.google.com/kubernetes-engine/docs/concepts/types-of-clusters#regional_clusters) you can select a region. For more information about available regions and zones, refer to [this section](https://cloud.google.com/compute/docs/regions-zones#available). The first part of each zone name is the name of the region. |

# Cluster Options

### Kubernetes Version
- list of GKE Kubernetes versions

### Container Address Range

### Network

### Node Subnet

### Ip Aliases

### Network Policy

### Subnetwork Name (required)

### Cluster Pod Address Range

### Node Ipv4 CIDR Block

### Service Address Range




# Additional Options

### Cluster Addons

- Horizontal Pod Autoscaling
- HTTP (L7) Load Balancing
- Network Policy Config (master only

### Cluster Features
- Alpha Features

### Logging Service
- options

### Monitoring Service
- options

### Maintenance Window
- time of day



# Node Pools

In this section, enter details describing the configuration of each node in the node pool.
### Kubernetes Version

The Kubernetes version for each node in the node pool. For more information on GKE Kubernetes versions, refer to [these docs.](https://cloud.google.com/kubernetes-engine/versioning)

### Image Type

For more information for the node image options that GKE offers for each OS, refer to [this page.](https://cloud.google.com/kubernetes-engine/docs/concepts/node-images#available_node_images)

### Machine Type

For more information on Google Cloud machine types, refer to [this page.](https://cloud.google.com/compute/docs/machine-types#machine_types)

### Root Disk Type

Standard persistent disks are backed by standard hard disk drives (HDD), while SSD persistent disks are backed by solid state drives (SSD). For more information, refer to [this section.](https://cloud.google.com/compute/docs/disks)

### Local SSD Disks

Configure each node's local SSD disk storage in GB. Local SSDs are physically attached to the server that hosts your VM instance. Local SSDs have higher throughput and lower latency than standard persistent disks or SSD persistent disks. The data that you store on a local SSD persists only until the instance is stopped or deleted. For more information, see [this section.](https://cloud.google.com/compute/docs/disks#localssds)

### Preemptible nodes (beta)

Preemptible nodes, also called preemptible VMs, are Compute Engine VM instances that last a maximum of 24 hours in general, and provide no availability guarantees. For more information, see [this page.](https://cloud.google.com/kubernetes-engine/docs/how-to/preemptible-vms)

### Taints

When you apply a taint to a node, only Pods that tolerate the taint are allowed to run on the node. In a GKE cluster, you can apply a taint to a node pool, which applies the taint to all nodes in the pool.

### Node Labels

You can apply labels to the node pool, which applies the labels to all nodes in the pool.


# Group Details

In this section, enter details describing the node pool.

### Name
Enter a name for the node group.

### Initial Node Count
Integer for the starting number of nodes in the node pool.

### Max Pod Per Node

GKE has a hard limit of 110 Pods per node. For more information on the Kubernetes limits, see [this section.](https://cloud.google.com/kubernetes-engine/docs/best-practices/scalability#dimension_limits)

### Horizontal Pod Autoscaling

The Horizontal Pod Autoscaler changes the shape of your Kubernetes workload by automatically increasing or decreasing the number of Pods in response to the workload's CPU or memory consumption, or in response to custom metrics reported from within Kubernetes or external metrics from sources outside of your cluster. For more information, see [this page.](https://cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler)

### Auto Repair

GKE's node auto-repair feature helps you keep the nodes in your cluster in a healthy, running state. When enabled, GKE makes periodic checks on the health state of each node in your cluster. If a node fails consecutive health checks over an extended time period, GKE initiates a repair process for that node. For more information, see the section on [auto-repairing nodes.](https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-repair)

### Auto Upgrade

When enabled, the auto-upgrade feature keeps the nodes in your cluster up-to-date with the cluster control plane (master) version when your control plane is [updated on your behalf.(https://cloud.google.com/kubernetes-engine/upgrades#automatic_cp_upgrades) For more information about auto-upgrading nodes, see [this page.](https://cloud.google.com/kubernetes-engine/docs/how-to/node-auto-upgrades)

### Access Scopes

Access scopes are the legacy method of specifying permissions for your nodes.

- **Allow default access:** The default access for new clusters is the [Compute Engine default service account.](https://cloud.google.com/compute/docs/access/service-accounts?hl=en_US#default_service_account)
- **Allow full access to all Cloud APIs:** Generally, you can just set the cloud-platform access scope to allow full access to all Cloud APIs, then grant the service account only relevant IAM roles. The combination of access scopes granted to the virtual machine instance and the IAM roles granted to the service account determines the amount of access the service account has for that instance.
- **Set access for each API:** Alternatively, you can choose to set specific scopes that permit access to the particular API methods that the service will call.

For more information, see the [section about enabling service accounts for a VM.](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances)

{{% /tab %}}
{{% tab "Rancher before v2.5.8" %}}
{{% /tab %}}
{{% /tabs %}}
