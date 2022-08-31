---
title: Creating a DigitalOcean Cluster
shortTitle: DigitalOcean
weight: 2215
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this section, you'll learn how to use Rancher to install an [RKE](https://rancher.com/docs/rke/latest/en/) Kubernetes cluster in DigitalOcean.

First, you will set up your DigitalOcean cloud credentials in Rancher. Then you will use your cloud credentials to create a node template, which Rancher will use to provision new nodes in DigitalOcean.

Then you will create a DigitalOcean cluster in Rancher, and when configuring the new cluster, you will define node pools for it. Each node pool will have a Kubernetes role of etcd, controlplane, or worker. Rancher will install RKE Kubernetes on the new nodes, and it will set up each node with the Kubernetes role defined by the node pool.

<Tabs>
<TabItem value="RKE">

1. [Create your cloud credentials](#1-create-your-cloud-credentials)
2. [Create a node template with your cloud credentials](#2-create-a-node-template-with-your-cloud-credentials)
3. [Create a cluster with node pools using the node template](#3-create-a-cluster-with-node-pools-using-the-node-template)

### 1. Create your cloud credentials

1. Click **☰ > Cluster Management**.
1. Click **Cloud Credentials**.
1. Click **Create**.
1. Click **DigitalOcean**.
1. Enter your Digital Ocean credentials.
1. Click **Create**.

**Result:** You have created the cloud credentials that will be used to provision nodes in your cluster. You can reuse these credentials for other node templates, or in other clusters.

### 2. Create a node template with your cloud credentials

Creating a [node template](../../../../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-templates) for DigitalOcean will allow Rancher to provision new nodes in DigitalOcean. Node templates can be reused for other clusters.

1. Click **☰ > Cluster Management**.
1. Click **RKE1 Configuration > Node Templates**.
1. Click **Add Template**.
1. Click **DigitalOcean**.
1. Fill out a node template for DigitalOcean. For help filling out the form, refer to [DigitalOcean Node Template Configuration.](../../../../../reference-guides/cluster-configuration/downstream-cluster-configuration/node-template-configuration/digitalocean.md)

### 3. Create a cluster with node pools using the node template

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create**.
1. Click **DigitalOcean**.
1. Enter a **Cluster Name**.
1. Add one or more node pools to your cluster. Add one or more node pools to your cluster. Each node pool uses a node template to provision new nodes. For more information about node pools, including best practices for assigning Kubernetes roles to them, see [this section.](../../../../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md)
1. **In the Cluster Configuration** section, choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation. To see more cluster options, click on **Show advanced options**. For help configuring the cluster, refer to the [RKE cluster configuration reference.](../../../../../reference-guides/cluster-configuration/rancher-server-configuration/rke1-cluster-configuration.md)
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Click **Create**.

</TabItem>
<TabItem value="RKE2">

### 1. Create your cloud credentials

If you already have a set of cloud credentials to use, skip this section.

1. Click **☰ > Cluster Management**.
1. Click **Cloud Credentials**.
1. Click **Create**.
1. Click **DigitalOcean**.
1. Enter your Digital Ocean credentials.
1. Click **Create**.

### 2. Create your cluster

Use Rancher to create a Kubernetes cluster in DigitalOcean.

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create**.
1. Toggle the switch to **RKE2/K3s**.
1. Click **DigitalOcean**.
1. Select a **Cloud Credential**, if more than one exists. Otherwise, it's preselected.
1. Enter a **Cluster Name**.
1. Create a machine pool for each Kubernetes role. Refer to the [best practices](../../../../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-roles-in-rke2) for recommendations on role assignments and counts.
    1. For each machine pool, define the machine configuration. Refer to the [DigitalOcean machine configuration reference](../../../../../reference-guides/cluster-configuration/downstream-cluster-configuration/machine-configuration/digitalocean.md) for information on configuration options.
1. Use the **Cluster Configuration** to choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation. For help configuring the cluster, refer to the [RKE2 cluster configuration reference.](../../../../../reference-guides/cluster-configuration/rancher-server-configuration/rke2-cluster-configuration.md)
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Click **Create**.

</TabItem>
</Tabs>

**Result:**

Your cluster is created and assigned a state of **Provisioning**. Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active**.

**Active** clusters are assigned two Projects:

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces
# Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps](../../../../advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.
- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps](../../../../advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through Rancher. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.
