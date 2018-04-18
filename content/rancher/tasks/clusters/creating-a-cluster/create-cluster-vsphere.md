---
tag: ["rancher", "cluster"]
category: "rancher"
layout: list-docs
title: vSphere
weight: 80
---

# Creating a vSphere Cluster

## Objectives

{{< prereq_cluster >}}

1.	[Create a Linux Virtual Machine](#create-a-linux-virtual-machine)

	Begin by logging into vSphere and provisioning a Linux virtual machine (VM).

2. [Create the Cluster](#create-the-vsphere-cluster)

	Use your new VM as a template for your new Kubernetes cluster.

## Create a Linux Virtual Machine

Create a Linux VM using vSphere.

Provision the droplet according to our [requirements](../setup/requirements.md).

[VMware Instructions](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.vm_admin.doc/GUID-39D19B2B-A11C-42AE-AC80-DDA8682AB42C.html)

## Create the vSphere Cluster

Use {{< product >}} to clone your Linux host and configure them as Kubernetes nodes.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **vSphere**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	1.	Click **Add Node Template**.

	2.	Use the **vSphere Options** to authenticate with vSphere and provision your cluster.

		- **Account Access** holds the host name for your vCenter host and your credentials for authentication.

		- **Instance Options** are used to provision your cluster's VMs.

		- **Scheduling** is used to choose the hypervisor your virtual machines will be scheduled to.

	3. {{< step_rancher-template >}}

	4. Click **Create**.

	5. **Optional:** Add additional node pools.

<br/>
7. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
