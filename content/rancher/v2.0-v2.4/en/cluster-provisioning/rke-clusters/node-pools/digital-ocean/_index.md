---
title: Creating a DigitalOcean Cluster
shortTitle: DigitalOcean
weight: 2215
aliases:
  - /rancher/v2.0-v2.4/en/tasks/clusters/creating-a-cluster/create-cluster-digital-ocean/
---
In this section, you'll learn how to use Rancher to install an [RKE](https://rancher.com/docs/rke/latest/en/) Kubernetes cluster in DigitalOcean.

First, you will set up your DigitalOcean cloud credentials in Rancher. Then you will use your cloud credentials to create a node template, which Rancher will use to provision new nodes in DigitalOcean. 

Then you will create a DigitalOcean cluster in Rancher, and when configuring the new cluster, you will define node pools for it. Each node pool will have a Kubernetes role of etcd, controlplane, or worker. Rancher will install RKE Kubernetes on the new nodes, and it will set up each node with the Kubernetes role defined by the node pool.

{{% tabs %}}
{{% tab "Rancher v2.2.0+" %}}
1. [Create your cloud credentials](#1-create-your-cloud-credentials)
2. [Create a node template with your cloud credentials](#2-create-a-node-template-with-your-cloud-credentials)
3. [Create a cluster with node pools using the node template](#3-create-a-cluster-with-node-pools-using-the-node-template)

### 1. Create your cloud credentials

1. In the Rancher UI, click the user profile button in the upper right corner, and click **Cloud Credentials.**
1. Click **Add Cloud Credential.**
1. Enter a name for the cloud credential.
1. In the **Cloud Credential Type** field, select **DigitalOcean**.
1. Enter your Digital Ocean credentials.
1. Click **Create.**

**Result:** You have created the cloud credentials that will be used to provision nodes in your cluster. You can reuse these credentials for other node templates, or in other clusters. 

### 2. Create a node template with your cloud credentials

Creating a [node template]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) for DigitalOcean will allow Rancher to provision new nodes in DigitalOcean. Node templates can be reused for other clusters.

1. In the Rancher UI, click the user profile button in the upper right corner, and click **Node Templates.**
1. Click **Add Template.**
1. Fill out a node template for DigitalOcean. For help filling out the form, refer to [DigitalOcean Node Template Configuration.](./do-node-template-config)

### 3. Create a cluster with node pools using the node template

1. From the **Clusters** page, click **Add Cluster**.
1. Choose **DigitalOcean**.
1. Enter a **Cluster Name**.
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Use **Cluster Options** to choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation. To see more cluster options, click on **Show advanced options.** For help configuring the cluster, refer to the [RKE cluster configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options)
1. Add one or more node pools to your cluster. Add one or more node pools to your cluster. Each node pool uses a node template to provision new nodes. For more information about node pools, including best practices for assigning Kubernetes roles to them, see [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools) 
1. Review your options to confirm they're correct. Then click **Create**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces

{{% /tab %}}
{{% tab "Rancher before v2.2.0" %}}

1. From the **Clusters** page, click **Add Cluster**.
1. Choose **DigitalOcean**.
1. Enter a **Cluster Name**.
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Use **Cluster Options** to choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation. To see more cluster options, click on **Show advanced options.** For help configuring the cluster, refer to the [RKE cluster configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options)
1.  Add one or more node pools to your cluster. Each node pool uses a node template to provision new nodes. To create a node template, click **Add Node Template** and complete the **Digital Ocean Options** form. For help filling out the form, refer to the [Digital Ocean node template configuration reference.](./do-node-template-config) For more information about node pools, including best practices for assigning Kubernetes roles to them, see [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools) 
1. Review your options to confirm they're correct. Then click **Create**.

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