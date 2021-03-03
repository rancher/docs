---
title: Provisioning Kubernetes Clusters in vSphere
weight: 1
---

In this section, you'll learn how to use Rancher to install an [RKE]({{<baseurl>}}/rke/latest/en/)  Kubernetes cluster in vSphere.

First, you will set up your vSphere cloud credentials in Rancher. Then you will use your cloud credentials to create a node template, which Rancher will use to provision nodes in vSphere. 

Then you will create a vSphere cluster in Rancher, and when configuring the new cluster, you will define node pools for it. Each node pool will have a Kubernetes role of etcd, controlplane, or worker. Rancher will install RKE Kubernetes on the new nodes, and it will set up each node with the Kubernetes role defined by the node pool.

For details on configuring the vSphere node template, refer to the [vSphere node template configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/node-template-reference/)

For details on configuring RKE Kubernetes clusters in Rancher, refer to the [cluster configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options)

- [Preparation in vSphere](#preparation-in-vsphere)
- [Creating a vSphere Cluster](#creating-a-vsphere-cluster)

# Preparation in vSphere

This section describes the requirements for setting up vSphere so that Rancher can provision VMs and clusters.

The node templates are documented and tested with the vSphere Web Services API version 6.5.

### Create Credentials in vSphere

Before proceeding to create a cluster, you must ensure that you have a vSphere user with sufficient permissions. When you set up a node template, the template will need to use these vSphere credentials.

Refer to this [how-to guide]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/creating-credentials) for instructions on how to create a user in vSphere with the required permissions. These steps result in a username and password that you will need to provide to Rancher, which allows Rancher to provision resources in vSphere.

### Network Permissions

It must be ensured that the hosts running the Rancher server are able to establish the following network connections:

- To the vSphere API on the vCenter server (usually port 443/TCP).
- To the Host API (port 443/TCP) on all ESXi hosts used to instantiate virtual machines for the clusters (*only required with Rancher before v2.3.3 or when using the ISO creation method in later versions*).
- To port 22/TCP and 2376/TCP on the created VMs

See [Node Networking Requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/node-requirements/#networking-requirements) for a detailed list of port requirements applicable for creating nodes on an infrastructure provider.

### Valid ESXi License for vSphere API Access

The free ESXi license does not support API access. The vSphere servers must have a valid or evaluation ESXi license.

### VM-VM Affinity Rules for Clusters with DRS

If you have a cluster with DRS enabled, setting up [VM-VM Affinity Rules](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.resmgmt.doc/GUID-7297C302-378F-4AF2-9BD6-6EDB1E0A850A.html) is recommended. These rules allow VMs assigned the etcd and control-plane roles to operate on separate ESXi hosts when they are assigned to different node pools. This practice ensures that the failure of a single physical machine does not affect the availability of those planes.

# Creating a vSphere Cluster

The a vSphere cluster is created in Rancher depends on the Rancher version.

{{% tabs %}}
{{% tab "Rancher v2.2.0+" %}}
1. [Create your cloud credentials](#1-create-your-cloud-credentials)
2. [Create a node template with your cloud credentials](#2-create-a-node-template-with-your-cloud-credentials)
3. [Create a cluster with node pools using the node template](#3-create-a-cluster-with-node-pools-using-the-node-template)

### 1. Create your cloud credentials

1. In the Rancher UI, click the user profile button in the upper right corner, and click **Cloud Credentials.**
1. Click **Add Cloud Credential.**
1. Enter a name for the cloud credential.
1. In the **Cloud Credential Type** field, select **vSphere**.
1. Enter your vSphere credentials. For help, refer to **Account Access** in the [configuration reference for your Rancher version.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/)
1. Click **Create.**

**Result:** You have created the cloud credentials that will be used to provision nodes in your cluster. You can reuse these credentials for other node templates, or in other clusters. 

### 2. Create a node template with your cloud credentials

Creating a [node template]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) for vSphere will allow Rancher to provision new nodes in vSphere. Node templates can be reused for other clusters.

1. In the Rancher UI, click the user profile button in the upper right corner, and click **Node Templates.**
1. Click **Add Template.**
1. Fill out a node template for vSphere. For help filling out the form, refer to the vSphere node template configuration reference. Refer to the newest version of the configuration reference that is less than or equal to your Rancher version:
    - [v2.3.3]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.3.3)
    - [v2.3.0]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.3.0)
    - [v2.2.0]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.2.0)

### 3. Create a cluster with node pools using the node template

Use Rancher to create a Kubernetes cluster in vSphere.

1. Navigate to **Clusters** in the **Global** view.
1. Click **Add Cluster** and select the **vSphere** infrastructure provider.
1. Enter a **Cluster Name.**
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Use **Cluster Options** to choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation. To see more cluster options, click on **Show advanced options.** For help configuring the cluster, refer to the [RKE cluster configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options)
1. If you want to dynamically provision persistent storage or other infrastructure later, you will need to enable the vSphere cloud provider by modifying the cluster YAML file. For details, refer to [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere)
1. Add one or more node pools to your cluster. Each node pool uses a node template to provision new nodes. For more information about node pools, including best practices for assigning Kubernetes roles to the nodes, see [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-pools)
1. Review your options to confirm they're correct. Then click **Create**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces
{{% /tab %}}
{{% tab "Rancher before v2.2.0" %}}

Use Rancher to create a Kubernetes cluster in vSphere.

For Rancher versions before v2.0.4, when you create the cluster, you will also need to follow the steps in [this section](http://localhost:9001/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vpshere-node-template-config/prior-to-2.0.4/#disk-uuids) to enable disk UUIDs.

1. From the **Clusters** page, click **Add Cluster**.
1. Choose **vSphere**.
1. Enter a **Cluster Name**.
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Use **Cluster Options** to choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation. To see more cluster options, click on **Show advanced options.** For help configuring the cluster, refer to the [RKE cluster configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options)
1. If you want to dynamically provision persistent storage or other infrastructure later, you will need to enable the vSphere cloud provider by modifying the cluster YAML file. For details, refer to [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere)
1. Add one or more [node pools]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) to your cluster. Each node pool uses a node template to provision new nodes. To create a node template, click **Add Node Template** and complete the **vSphere Options** form. For help filling out the form, refer to the vSphere node template configuration reference. Refer to the newest version of the configuration reference that is less than or equal to your Rancher version:
    - [v2.0.4]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/v2.0.4)
    - [before v2.0.4]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-node-template-config/prior-to-2.0.4) 
1. Review your options to confirm they're correct. Then click **Create** to start provisioning the VMs and Kubernetes services.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces

{{% /tab %}}
{{% /tabs %}}




# Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/cluster-access/kubectl/#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.
- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/cluster-access/kubectl/#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through Rancher. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.
- **Provision Storage:** For an example of how to provision storage in vSphere using Rancher, refer to [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples/vsphere) In order to dynamically provision storage in vSphere, the vSphere provider must be [enabled.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere)