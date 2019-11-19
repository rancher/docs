---
title: Provisioning Kubernetes Clusters in vSphere
weight: 1
---

This section explains how to configure Rancher with vSphere credentials, provision nodes in vSphere, and set up Kubernetes clusters on those nodes.

# Prerequisites

This section describes the requirements for setting up vSphere so that Rancher can provision VMs and clusters.

The v2.3.3 node templates were tested with the vSphere Web Services API version 6.5.

- [Create credentials in vSphere](#create-credentials-in-vsphere)
- [Network permissions](#network-permissions)
- [Valid ESXi License for vSphere API Access](#valid-esxi-license-for-vsphere-api-access)

### Create Credentials in vSphere

Before proceeding to create a cluster, you must ensure that you have a vSphere user with sufficient permissions. When you set up a node template, the template will need to use these vSphere credentials.

Refer to this [how-to guide]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/creating-credentials) for instructions on how to create a user in vSphere with the required permissions. These steps result in a username and password that you will need to provide to Rancher, which allows Rancher to provision resources in vSphere.

### Network Permissions

There needs to be two-way communication between Rancher and the vSphere API.

You must ensure that the hosts running Rancher servers are able to establish network connections to the following network endpoints:

- vCenter server (usually port 443/TCP)
- Every ESXi host that is part of the datacenter to be used to provision virtual machines for your clusters (port 443/TCP).

By default, Rancher uses port 443 to communicate with vSphere.

The vSphere API websocket port will be 84453 by default.

### Valid ESXi License for vSphere API Access

The free ESXi license does not support API access. The vSphere servers must have a valid or evaluation ESXi license.

# Creating Clusters in vSphere with Rancher

This section describes how to set up vSphere credentials, node templates, and vSphere clusters using the Rancher UI.

You will need to do the following:

1. [Create a node template using vSphere credentials](#1-create-a-node-template-using-vsphere-credentials)
2. [Create a Kubernetes cluster using the node template](#2-create-a-kubernetes-cluster-using-the-node-template)
  - [Important: Enable the vSphere cloud provider for the cluster](#enable-the-vsphere-cloud-provider-for-the-cluster)
3. [Optional: Provision storage](#3-optional-provision-storage)

### Configuration References

For details on configuring the node template, refer to the [node template configuration reference.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/node-template-reference/)

Rancher uses the RKE library to provision Kubernetes clusters. For details on configuring clusters in vSphere, refer to the [cluster configuration reference in the RKE documentation.]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/vsphere/config-reference/)

# 1. Create a Node Template Using vSphere Credentials

To create a cluster, you need to create at least one vSphere [node template]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) that specifies how VMs are created in vSphere.

After you create a node template, it is saved, and you can re-use it whenever you create additional vSphere clusters.

To create a node template,

1. Log in with an admin account to the Rancher UI.

1. From the user settings menu, select **Node Templates.**

1. Click **Add Template** and then click on the **vSphere** icon.

Then, configure your template:

- [A. Configure the vSphere credential](#a-configure-the-vsphere-credential)
- [B. Configure node scheduling](#b-configure-node-scheduling)
- [C. Configure instances and operating systems](#c-configure-instances-and-operating-systems)
- [D. Add networks](#d-add-networks)
- [E. If not already enabled, enable disk UUIDs](#e-if-not-already-enabled-enable-disk-uuids)
- [F. Optional: Configure node tags and custom attributes](#f-optional-configure-node-tags-and-custom-attributes)
- [G. Optional: Configure cloud-init](#g-optional-configure-cloud-init)
- [H. Saving the node template](#h-saving-the-node-template)

### A. Configure the vSphere Credential

The steps for configuring your vSphere credentials for the cluster are different depending on your version of Rancher.

{{% tabs %}}
{{% tab "Rancher v2.2.0+" %}}

Your account access information is in a [cloud credential.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cloud-credentials/) Cloud credentials are stored as Kubernetes secrets. 

You can use an existing cloud credential or create a new one. To create a new cloud credential, 

1. Click **Add New.**
1. In the **Name** field, enter a name for your vSphere credentials.
1. In the **vCenter or ESXi Server** field, enter the vCenter or ESXi hostname/IP. ESXi is the virtualization platform where you create and run virtual machines and virtual appliances. vCenter Server is the service through which you manage multiple hosts connected in a network and pool host resources.
1. Optional: In the **Port** field, configure the port of the vCenter or ESXi server.
1. In the **Username** and **Password** fields, enter your vSphere login username and password.
1. Click **Create.**

**Result:** The node template has the credentials required to provision nodes in vSphere.

{{% /tab %}}
{{% tab "Rancher prior to v2.2.0" %}}
In the **Account Access** section, enter the vCenter FQDN or IP address and the credentials for the vSphere user account.
{{% /tab %}}
{{% /tabs %}}

### B. Configure Node Scheduling

Choose what hypervisor the virtual machine will be scheduled to. The configuration options depend on your version of Rancher.

{{% tabs %}}
{{% tab "Rancher v2.3.3+" %}}

The fields in the **Scheduling** section should auto-populate with the data center and other scheduling options that are available to you in vSphere.

1. In the **Data Center** field, choose the data center where the VM will be scheduled.
1. Optional: Select a **Resource Pool.** Resource pools can be used to partition available CPU and memory resources of a standalone host or cluster, and they can also be nested.
1. If you have a data store cluster, you can toggle the **Data Store** field. This lets you select a data store cluster where your VM will be scheduled to. If the field is not toggled, you can select an individual disk.
1. Optional: Select a folder where the VM will be placed. The VM folders in this dropdown menu directly correspond to your VM folders in vSphere. Note: The folder name should be prefaced with `vm/` in your vSphere config file.
1. Optional: Choose a specific host to create the VM on. Leave this field blank for a standalone ESXi or for a cluster with DRS (Distributed Resource Scheduler). If specified, the host system's pool will be used and the **Resource Pool** parameter will be ignored.
{{% /tab %}}
{{% tab "Rancher prior to v2.3.3" %}}

In the **Scheduling** section, enter: 

- The name/path of the **Data Center** to create the VMs in
- The name of the **VM Network** to attach to
- The name/path of the **Datastore** to store the disks in

    ![image]({{< baseurl >}}/img/rancher/vsphere-node-template-2.png)

{{% /tab %}}
{{% /tabs %}}

### C. Configure Instances and Operating Systems

The instances are configured differently depending on your Rancher version.

{{% tabs %}}
{{% tab "Rancher v2.3.3+" %}}

In this section, configure the number of vCPUs, memory, and disk size for the VMs created by this template.

In the **Creation method** field, you will configure the method for setting up an operating system on the node. The operating system can be installed from an ISO or from a VM template.

[VM templates](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.vm_admin.doc/GUID-F7BF0E6B-7C4F-4E46-8BBF-76229AEA7220.html) are useful for setting up the operating system and other software, because they allow you to save time. For example, you could use a VM template to automatically install Kubernetes and Docker on each node. You can choose ISOs defined from templates in a vSphere data center or content library.

The node can be created with any operating system that supports `cloud-init`.

Choose the way that the VM will be created:

- **Deploy from template: Data Center:** Choose a template that exists in the data center that you selected.
- **Deploy from template: Content Library:** In the two fields that appear when you select this option, choose the [content library](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.vm_admin.doc/GUID-254B2CE8-20A8-43F0-90E8-3F6776C2C896.html). Then select the [VM template](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.vm_admin.doc/GUID-F7BF0E6B-7C4F-4E46-8BBF-76229AEA7220.html) from the list of templates within the content library. This template will be used to create the new VM.
- **Clone an existing virtual machine:** In the **Virtual machine** field, choose an existing VM that the new VM will be cloned from.
- **Install from boot2docker ISO:** Ensure that the OS ISO URL contains the URL of a VMware ISO release for RancherOS (rancheros-vmware.iso).

{{% /tab %}}
{{% tab "Rancher prior to v2.3.3" %}}

In the **Instance Options** section, configure the number of vCPUs, memory, and disk size for the VMs created by this template.

Only RancherOS VMs are supported.

Ensure that the [OS ISO URL](#instance-options) contains the URL of the VMware ISO release for RancherOS: `rancheros-vmware.iso`.

    ![image]({{< baseurl >}}/img/rancher/vsphere-node-template-1.png)

{{% /tab %}}
{{% /tabs %}}

### D. Add Networks

_Available as of v2.3.3_

The node template now allows a VM to be provisioned with multiple networks. In the **Networks** field, you can now click **Add Network** to add any networks available to you in vSphere.

### E. If Not Already Enabled, Enable Disk UUIDs

In order to provision nodes with RKE, all nodes must be configured with disk UUIDs.

As of Rancher v2.0.4, disk UUIDs are enabled in vSphere node templates by default.

If you are using Rancher prior to v2.0.4, refer to these [instructions]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/#enabling-disk-uuids-with-a-node-template) for details on how to enable a UUID with a Rancher node template.

### F. Optional: Configure Node Tags and Custom Attributes

The way to attach metadata to the VM is different depending on your Rancher version.

{{% tabs %}}
{{% tab "Rancher v2.3.3+" %}}

**Optional:** Add vSphere tags and custom attributes. Tags allow you to attach metadata to objects in the vSphere inventory to make it easier to sort and search for these objects.

For tags, all your vSphere tags will show up as options to select from in your node template.

In the custom attributes, Rancher will let you select all the custom attributes you have already set up in vSphere. The custom attributes are keys and you can enter values for each one.

 > **Note:** Custom attributes are a legacy feature that will eventually be removed from vSphere. These attributes allow you to attach metadata to objects in the vSphere inventory to make it easier to sort and search for these objects.

{{% /tab %}}
{{% tab "Rancher prior to v2.3.3" %}}

**Optional:**

  - Provide a set of configuration parameters (instance-options) for the VMs.
  - Assign labels to the VMs that can be used as a base for scheduling rules in the cluster.
  - Customize the configuration of the Docker daemon on the VMs that will be created.

> **Note:** Custom attributes are a legacy feature that will eventually be removed from vSphere. These attributes allow you to attach metadata to objects in the vSphere inventory to make it easier to sort and search for these objects.

{{% /tab %}}
{{% /tabs %}}

### G. Optional: Configure Cloud Init

[Cloud-init](https://cloud-init.io/) is a tool that applies user data to your nodes when they boot for the first time.

The configuration file for `cloud-init` is named `cloud-config.yml.` In the **Cloud Init** field, it is optional to enter a file name or URL pointing to a `cloud-config.yml` file.

You can use `cloud-init` to automate tasks that should happen when the instance boots, such as creating users, running shell commands, adding a load balancer, or preinstalling Kubernetes on the VM.

 For examples of how to write a `cloud-config` file, refer to the [cloud-init documentation.](https://cloudinit.readthedocs.io/en/latest/topics/examples.html)

### H. Saving the Node Template

Assign a descriptive **Name** for this template and click **Create.**

### Node Template Configuration Reference

Refer to [this section]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/node-template-reference/) for a reference on the configuration options available for vSphere node templates.

# 2. Create a Kubernetes Cluster Using the Node Template

After you've created a template, you can use it to stand up the vSphere cluster itself.

To install Kubernetes on vSphere nodes, you will need to enable the vSphere cloud provider by modifying the cluster YAML file. This requirement applies to both pre-created [custom nodes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/) and for nodes created in Rancher using the vSphere node driver.

To create the cluster and enable the vSphere provider for cluster, follow these steps:

- [A. Set up the cluster name and member roles](#a-set-up-the-cluster-name-and-member-roles)
- [B. Enable the vSphere cloud provider for the cluster](#b-enable-the-vsphere-cloud-provider-for-the-cluster)
- [C. Configure Kubernetes options](#c-configure-kubernetes-options)
- [D. Add node pools to the cluster](#d-add-node-pools-to-the-cluster)
- [E. Optional: Add a self-healing node pool](#e-optional-add-a-self-healing-node-pool)
- [F. Create the cluster](#f-create-the-cluster)

### A. Set up the Cluster Name and Member Roles

1. Log in to the Rancher UI as an admin user.
2. Navigate to **Clusters** in the **Global** view.
3. Click **Add Cluster** and select the **vSphere** infrastructure provider.
4. Assign a **Cluster Name.**
5. Assign **Member Roles** as required. {{< step_create-cluster_member-roles >}}

> **Note:**
> 
> If you have a cluster with DRS enabled, setting up [VM-VM Affinity Rules](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.resmgmt.doc/GUID-7297C302-378F-4AF2-9BD6-6EDB1E0A850A.html) is recommended. These rules allow VMs assigned the etcd and control-plane roles to operate on separate ESXi hosts when they are assigned to different node pools. This practice ensures that the failure of a single physical machine does not affect the availability of those planes.

### B. Enable the vSphere Cloud Provider for the Cluster

7. Set **Cloud Provider** option to `Custom`.

    ![vsphere-node-driver-cloudprovider]({{< baseurl >}}/img/rancher/vsphere-node-driver-cloudprovider.png)

8. Click on **Edit as YAML**
9. Insert the following structure to the pre-populated cluster YAML. As of Rancher v2.3+, this structure must be placed under `rancher_kubernetes_engine_config`. In versions prior to v2.3, it has to be defined as a top-level field. Note that the `name` *must* be set to `vsphere`. 

    ```yaml
    rancher_kubernetes_engine_config: # Required as of Rancher v2.3+
      cloud_provider:
          name: vsphere
          vsphereCloudProvider:
              [Insert provider configuration]
    ```

    Rancher uses RKE (the Rancher Kubernetes Engine) to provision Kubernetes clusters. Refer to the [vSphere configuration reference in the RKE documentation]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/vsphere/config-reference/) for details about the properties of the `vsphereCloudProvider` directive.

### C. Configure Kubernetes Options
{{<step_create-cluster_cluster-options>}}

### D. Add Node Pools to the Cluster
{{<step_create-cluster_node-pools>}}

### E. Optional: Add a Self-Healing Node Pool

To make a node pool self-healing, enter a number greater than zero in the **Auto Replace** column. Rancher will use the node template for the given node pool to recreate the node if it becomes inactive for that number of minutes.

> **Note:** Self-healing node pools are designed to help you replace worker nodes for stateless applications. It is not recommended to enable node auto-replace on a node pool of master nodes or nodes with persistent volumes attached, because VMs are treated ephemerally. When a node in a node pool loses connectivity with the cluster, its persistent volumes are destroyed, resulting in data loss for stateful applications.

### F. Create the Cluster

Click **Create** to start provisioning the VMs and Kubernetes services.

{{< result_create-cluster >}}

# 3. Optional: Provision Storage

For an example of how to provision storage in vSphere using Rancher, refer to the 
 [cluster administration section.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/examples/vsphere)

 In order to provision storage in vSphere, the vSphere provider must be enabled.