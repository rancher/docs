---
title: Editing Clusters
weight: 2025
aliases:
  - /rancher/v2.x/en/k8s-in-rancher/editing-clusters/
---

After you provision a Kubernetes cluster using Rancher, you can still edit options and settings for the cluster. To edit your cluster, open the **Global** view, make sure the **Clusters** tab is selected, and then select **Ellipsis (...) > Edit** for the cluster that you want to edit.

<sup>To Edit an Existing Cluster</sup>
![Edit Cluster]({{<baseurl>}}/img/rancher/edit-cluster.png)

The options and settings available for an existing cluster change based on the method that you used to provision it. For example, only clusters [provisioned by RKE]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) have **Cluster Options** available for editing.

The following table lists the options and settings available for each cluster type:

 Cluster Type | Member Roles | Cluster Options | Node Pools
---------|----------|---------|---------|
 [RKE-Launched]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#rancher-launched-kubernetes) | ✓ | ✓ | ✓ |
 [Hosted Kubernetes Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#hosted-kubernetes-cluster) | ✓ |  |  |
 [Imported]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#import-existing-cluster) | ✓ |  |  |

## Editing Cluster Membership

Cluster administrators can edit the membership for a cluster, controlling which Rancher users can access the cluster and what features they can use.

1. From the **Global** view, open the cluster that you want to add members to.

2. From the main menu, select **Members**. Then click **Add Member**.

3. Search for the user or group that you want to add to the cluster.

 	If external authentication is configured:

	-  Rancher returns users from your [external authentication]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/) source as you type.

		>**Using AD but can't find your users?**
		>There may be an issue with your search attribute configuration. See [Configuring Active Directory Authentication: Step 5]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/ad/).

	- A drop-down allows you to add groups instead of individual users. The drop-down only lists groups that you, the logged in user, are part of.

		>**Note:** If you are logged in as a local user, external users do not display in your search results. For more information, see [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

4. Assign the user or group **Cluster** roles.  

	[What are Cluster Roles?]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/)

	>**Tip:** For Custom Roles, you can modify the list of individual roles available for assignment.
	>
	> - To add roles to the list, [Add a Custom Role]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/default-custom-roles/).
	> - To remove roles from the list, [Lock/Unlock Roles]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/locked-roles).

**Result:** The chosen users are added to the cluster.

- To revoke cluster membership, select the user and click **Delete**. This action deletes membership, not the user.
- To modify a user's roles in the cluster, delete them from the cluster, and then re-add them with modified roles.

## Cluster Options

When editing clusters, clusters that are [launched using RKE]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) feature more options than clusters that are imported or hosted by a Kubernetes provider. The headings that follow document options available only for RKE clusters.

### Upgrading Kubernetes

Following an upgrade to the latest version of Rancher, you can update your existing clusters to use the latest supported version of Kubernetes. Before a new version of Rancher is released, it's tested with the latest versions of Kubernetes to ensure compatibility.

As of Rancher v2.3.0, the Kubernetes metadata feature was added, which allows you to use newer Kubernetes versions as soon as they are released, without upgrading Rancher. For details, refer to the [section on Kubernetes metadata.]({{<baseurl>}}/rancher/v2.x/en/admin-settings/k8s-metadata)

>**Recommended:** Before upgrading Kubernetes, [backup your cluster]({{< baseurl >}}/rancher/v2.x/en/backups).

1. From the **Global** view, find the cluster for which you want to upgrade Kubernetes. Select **Vertical Ellipsis (...) > Edit**.

1. Expand **Cluster Options**.

1. From the **Kubernetes Version** drop-down, choose the version of Kubernetes that you want to use for the cluster.

1. Click **Save**.

**Result:** Kubernetes begins upgrading for the cluster. During the upgrade, your cluster is unavailable.

> **Note:** The `ingress-nginx` pods are set to only upgrade on delete. After upgrading your cluster, you need to delete these pods to get the correct version for your deployment. 

### Adding a Pod Security Policy

When your cluster is running pods with security-sensitive configurations, assign it a [pod security policy]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/), which is a set of rules that monitors the conditions and settings in your pods. If a pod doesn't meet the rules specified in your policy, the policy stops it from running.

You can assign a pod security policy when you provision a cluster. However, if you need to relax or restrict security for your pods later, you can update the policy while editing your cluster.

1. From the **Global** view, find the cluster to which you want to apply a pod security policy. Select **Vertical Ellipsis (...) > Edit**.

2. Expand **Cluster Options**.

3. From **Pod Security Policy Support**, select **Enabled**.

    >**Note:** This option is only available for clusters [provisioned by RKE]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/).

4. From the **Default Pod Security Policy** drop-down, select the policy you want to apply to the cluster.

	Rancher ships with [policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/#default-pod-security-policies) of `restricted` and `unrestricted`, although you can [create custom policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/#default-pod-security-policies) as well.

5. Click **Save**.

**Result:** The pod security policy is applied to the cluster and any projects within the cluster.

>**Note:** Workloads already running before assignment of a pod security policy are grandfathered in. Even if they don't meet your pod security policy, workloads running before assignment of the policy continue to run.
>
>To check if a running workload passes your pod security policy, clone or upgrade it.

### Editing Other Cluster Options

In [clusters launched by RKE]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/), you can edit any of the remaining options that follow.

>**Note:** These options are not available for imported clusters or hosted Kubernetes clusters.

<sup>Options for RKE Clusters</sup>
![Cluster Options]({{< baseurl >}}/img/rancher/cluster-options.png)


Option | Description |
---------|----------|
 Kubernetes Version | The version of Kubernetes installed on each cluster node. For more detail, see [Upgrading Kubernetes](#upgrading-kubernetes). |
 Network Provider | The [container networking interface]({{< baseurl >}}/rancher/v2.x/en/faq/networking/#cni-providers) that powers networking for your cluster.<br/><br/>**Note:** You can only choose this option while provisioning your cluster. It cannot be edited later. |
 Project Network Isolation | As of Rancher v2.0.7, if you're using the Canal network provider, you can choose whether to enable or disable inter-project communication. |
 Nginx Ingress | If you want to publish your applications in a high-availability configuration, and you're hosting your nodes with a cloud-provider that doesn't have a native load-balancing feature, enable this option to use Nginx ingress within the cluster. |
 Metrics Server Monitoring | Each cloud provider capable of launching a cluster using RKE can collect metrics and monitor for your cluster nodes. Enable this option to view your node metrics from your cloud provider's portal. |
 Pod Security Policy Support | Enables [pod security policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/) for the cluster. After enabling this option, choose a policy using the **Default Pod Security Policy** drop-down. |
 Docker version on nodes | Configures whether nodes are allowed to run versions of Docker that Rancher doesn't officially support. If you choose to require a [supported Docker version]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install-external-lb/#software), Rancher will stop pods from running on nodes that don't have a supported Docker version installed. |
 Docker Root Directory | The directory on your cluster nodes where you've installed Docker. If you install Docker on your nodes to a non-default directory, update this path. |
 Default Pod Security Policy | If you enable **Pod Security Policy Support**, use this drop-down to choose the pod security policy that's applied to the cluster. |
 Cloud Provider | If you're using a cloud provider to host cluster nodes launched by RKE, enable [this option]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) so that you can use the cloud provider's native features. If you want to store persistent data for your cloud-hosted cluster, this option is required.  |
<br/>
#### Editing Cluster as YAML

>**Note:** In Rancher v2.0.5 and v2.0.6, the names of services in the Config File (YAML) should contain underscores only: `kube_api` and `kube_controller`.

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the [options available]({{< baseurl >}}/rke/latest/en/config-options/) in an RKE installation.

- To edit an RKE config file directly from the Rancher UI, click **Edit as YAML**.
- To read from an existing RKE file, click **Read from File**.

![image]({{< baseurl >}}/img/rancher/cluster-options-yaml.png)

For an example of RKE config file syntax, see the [RKE documentation]({{< baseurl >}}/rke/latest/en/example-yamls/).  

## Managing Node Pools

In clusters [launched by RKE]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/), you can:

- Add new [pools of nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/) to your cluster. The nodes added to the pool are provisioned according to the [node template]({{< baseurl >}}/rancher/v2.x/en/user-settings/node-templates/) that you use.

	- Click **+** and follow the directions on screen to create a new template.

	- You can also reuse existing templates by selecting one from the **Template** drop-down.

- Redistribute Kubernetes roles amongst your node pools by making different checkbox selections  

- Scale the number of nodes in a pool up or down (although, if you simply want to maintain your node scale, we recommend using the cluster's [Nodes tab]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/nodes/#nodes-provisioned-by-node-pool) instead.)

>**Note:** The Node Pools section is not available for imported clusters or clusters hosted by a Kubernetes provider.
