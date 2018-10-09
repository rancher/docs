---
title: Creating a Cluster with Custom Nodes
shortTitle: Custom Nodes
weight: 2225
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-custom/
---

## Custom Nodes

Use Rancher to create a Kubernetes cluster on your on-premise bare metal servers. This option creates a cluster using a combination of [Docker Machine](https://docs.docker.com/machine/) and RKE, which is Rancher's own lightweight Kubernetes installer. In addition to bare metal servers, RKE can also create clusters on _any_ IaaS providers by integrating with node drivers.

To use this option you'll need access to servers you intend to use as your Kubernetes cluster. Provision each server according to Rancher [requirements](#requirements), which includes some hardware specifications and Docker. After you install Docker on each server, run the command provided in the Rancher UI to turn each server into a Kubernetes node.

## Objectives for Creating Cluster with Custom Nodes

>**Want to use Windows hosts as Kubernetes workers?**
>
>See [Configuring Custom Clusters for Windows]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/) before you start.

<!-- TOC -->

- [1. Provision a Linux Host](#1-provision-a-linux-host)
- [2. Create the Custom Cluster](#2-create-the-custom-cluster)
- [3. Amazon Only: Tag Resources](#3-amazon-only-tag-resources)

<!-- /TOC -->

## 1. Provision a Linux Host

Begin creation of a custom cluster by provisioning a Linux host. Your host can be:

- A cloud-host virtual machine (VM)
- An on-premise VM
- A bare-metal server

>**Bare-Metal Server Note:**
>
While creating your cluster, you must assign Kubernetes roles to your cluster nodes. If you plan on dedicating bare-metal servers to each role, you must provision a bare-metal server for each role (i.e. provision multiple bare-metal servers).

Provision the host according to the requirements below.

### Requirements

Each node in your cluster must meet our [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

## 2. Create the Custom Cluster

Use {{< product >}} to clone your Linux host and configure them as Kubernetes nodes.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Custom**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

    >**Using Windows nodes as Kubernetes workers?** 
    >
    >- See [Enable the Windows Support Option]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/#enable-the-windows-support-option).
    >- The only Network Provider available for clusters with Windows support is Flannel. See [Networking Option]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/#networking-option).
6.	<a id="step-6"></a>Click **Next**.

7.	From **Node Role**, choose the roles that you want filled by a cluster node.

	>**Notes:**
	>
    >- Using Windows nodes as Kubernetes workers? See [Node Configuration]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/#node-configuration).
	>- Bare-Metal Server Reminder: If you plan on dedicating bare-metal servers to each role, you must provision a bare-metal server for each role (i.e. provision multiple bare-metal servers).

8.	<a id="step-8"></a>**Optional**: Add **Labels** to your cluster nodes to help schedule workloads later.

	[Kubernetes Documentation: Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)

9. Copy the command displayed on screen to your clipboard.

10. Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection. Run the command copied to your clipboard.

	>**Note:** Repeat steps 7-10 if you want to dedicate specific hosts to specific node roles. Repeat the steps as many times as needed.

11. When you finish running the command(s) on your Linux host(s), click **Done**.

{{< result_create-cluster >}}

## 3. Amazon Only: Tag Resources

If you have configured your cluster to use Amazon as **Cloud Provider**, tag your AWS resources with a cluster ID.

[Amazon Documentation: Tagging Your Amazon EC2 Resources](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html)

>**Note:** You can use Amazon EC2 instances without configuring a cloud provider in Kubernetes. You only have to configure the cloud provider if you want to use specific Kubernetes cloud provider functionality. For more information, see [Kubernetes Cloud Providers](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/)


The following resources need to tagged with a `ClusterID`:

- **Nodes**: All hosts added in Rancher.
- **Subnet**: The subnet used for your cluster
- **Security Group**: The security group used for your cluster.

	>**Note:** Do not tag multiple security groups. Tagging multiple groups generates an error when creating Elastic Load Balancer.

The tag that should be used is:

```
Key=kubernetes.io/cluster/<CLUSTERID>, Value=owned
```

`<CLUSTERID>` can be any string you choose. However, the same string must be used on every resource you tag. Setting the tag value to `owned` informs the cluster that all resources tagged with the `<CLUSTERID>` are owned and managed by this cluster.

If you share resources between clusters, you can change the tag to:

```
Key=kubernetes.io/cluster/CLUSTERID, Value=shared
```
