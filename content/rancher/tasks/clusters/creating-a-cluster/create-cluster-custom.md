---
layout: single-docs
title: Custom Cluster
weight: 3225
---

# Creating a Custom Cluster

## Objectives

{{< prereq_cluster >}}

1.	[Create a Linux Host](#create-a-linux-host)

	Begin by provisioning a Linux host.

2. [Create the Cluster](#create-the-custom-cluster)

	Use your new Linux host as a template for your new Kubernetes cluster.

## Provision a Linux Host

Begin creation of a custom cluster by provisioning a Linux host. Your host can be:

- A cloud-host virtual machine (VM)
- An on-premise VM
- A bare-metal server

Provision the host according to our [requirements](../setup/requirements.md).

>**Bare-Metal Server Note:**
>
While creating your cluster, you must assign Kubernetes roles to your cluster nodes. If you plan on dedicating bare-metal servers to each role, you must provision a bare-metal server for each role (i.e. provision multiple bare-metal servers).

## Create the Custom Cluster

Use {{< product >}} to clone your Linux host and configure them as Kubernetes nodes.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Custom**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6.	Click **Next**.

7.	From **Node Role**, choose the roles that you want filled by a cluster node.

	>**Bare-Metal Server Reminder:**
	>
	If you plan on dedicating bare-metal servers to each role, you must provision a bare-metal server for each role (i.e. provision multiple bare-metal servers).

8.	**Optional**: Add **Labels** to your cluster nodes to help schedule workloads later.

	[Kubernetes Documentation: Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)

9. Copy the command displayed on screen to your clipboard.

10. Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection. Run the command copied to your clipboard.

	>**Note:** Repeat steps 7-10 if you want to dedicate specific hosts to specific node roles. Repeat the steps as many times as needed.

11. When you finish running the command(s) on your Linux host(s), click **Done**.

{{< result_create-cluster >}}
