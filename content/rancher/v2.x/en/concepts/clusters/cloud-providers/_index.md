---
title: Cloud Providers
weight: 2110
---

# Cloud Providers

A Cloud Provider in Kubernetes is a module which provides an interface for managing load balancers, nodes (i.e. hosts) and networking routes. You can configure a cloud provider to automatically provision load balancers or persistent storage devices when launching Kubernetes definitions if the cloud provider that you configure supports that.

By default, the Cloud Provider option is set to `None`. Supported cloud providers are:

* `Amazon`
* `Azure`

The `Custom` cloud provider is available if you want to configure your own cloud provider name and configuration in your cluster.

> **Warning:** Configuring a Cloud Provider in your cluster without configuring the prerequisites will cause your cluster to not provision correctly. Prerequisites needed for supported cloud providers are listed below.

## Amazon

When using the `Amazon` cloud provider, you can leverage the following capabilities:

  * **Load Balancers:** Launches an AWS Elastic Load Balancer (ELB) when choosing `Layer-4 Load Balancer` in **Port Mapping** or when launching a `Service` with `type: LoadBalancer`.
  * **Persistent Volumes**: Ability to use AWS Elastic Block Stores (EBS) for persistent volumes.

### Prerequisites

* Create/configure an IAM role
* Configuring the ClusterID

> **Note:** When you are creating an [Amazon EC2 Cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-amazon-ec2/#create-the-amazon-ec2-cluster), the `ClusterID` is automatically configured.

#### Create/configure an IAM role

All nodes added to the cluster need to be able to interact with EC2 to create and remove resources. This is done using an IAM role attached to the instance. Please refer to [EC2 documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#create-iam-role) on how to create an IAM role.

When you are creating an [Amazon EC2 cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-amazon-ec2/#create-the-amazon-ec2-cluster), you have to insert the name of the IAM role when creating the **Node Template**. When you are creating a [Custom cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-custom/), you have to manually attach the IAM role to the instance(s).

The following IAM role can be created:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:Describe*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ec2:AttachVolume",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ec2:DetachVolume",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["ec2:*"],
      "Resource": ["*"]
    },
    {
      "Effect": "Allow",
      "Action": ["elasticloadbalancing:*"],
      "Resource": ["*"]
    }
  ]
}
```

#### Configuring the ClusterID

The following resources need to tagged with a `ClusterID`:

* **Nodes**: All hosts added in Rancher.
* **Subnet**: The subnet used for your cluster
* **Security Group**: The security group used for your cluster.

>**Note:** Do not tag multiple security groups, as this will generate an error when creating Elastic Load Balancer (ELB).

The tag that should be used is:

**Key** = `kubernetes.io/cluster/CLUSTERID` **Value** = `owned`

where `CLUSTERID` can be chosen as you like, as long as it is equal across all tags set.

Setting the value of the tag to owned, tells the cluster that all resources with this tag are owned and managed by this cluster. If you share resources between clusters, you can change the tag to:

**Key** = `kubernetes.io/cluster/CLUSTERID` **Value** = `shared`.

## Azure

When using the `Azure` cloud provider, you can leverage the following capabilities:

* **Load Balancers:** Launches an Azure Load Balancer within a specific Network Security Group.
* **Persistent Volumes:** Supports using Azure Blob disks and Azure Managed Disks with standard and premium storage accounts.
* **Network Storage:** Support Azure Files via CIFS mounts.

### Known Limitations Regarding Azure Subscriptions

* Single tenant accounts (e.g. accounts with no subscriptions) are not supported
* Multi-subscription accounts are not supported

### Prerequisites

* Configure the credentials

#### Configure the credentials

The following credentials need to be configured:

* **Azure Tenant ID (tenantID)**

Visit [Azure portal](https://portal.azure.com), login and go to **Azure Active Directory** and select **Properties**. Your **Directory ID** is your **Tenant ID**.

If you want to use the Azure CLI, you can run the command `az account show` to get the information.

* **Azure Client ID (aadClientId) and Azure Client Secret (aadClientSecret)**

Visit [Azure portal](https://portal.azure.com), login and follow the steps below to create an **App Registration** and the corresponding **Azure Client ID** and **Azure Client Secret**.

1. Select **Azure Active Directory**.
1. Select **App registrations**.
1. Select **New application registration**.
1. Choose a **Name**, select `Web app / API` as **Application Type** and a **Sign-on URL** which can be anything in this case.
1. Select **Create**.

In the **App registrations** view, you should see your created App registration. The value shown in the column **APPLICATION ID** is what you need to use as **Azure Client ID**.

The next step is to generate the **Azure Client Secret**:

1. Open your created App registration.
1. In the **Settings** view, open **Keys**.
1. Enter a **Key description**, select an expiration time and select **Save**.
1. The generated value shown in the column **Value** is what you need to use as **Azure Client Secret**. This value will only be shown once.

Last thing you will need to do, is assign the appropriate permissions to your App registration.

1. Go to **More services**, search for **Subscriptions** and open it.
1. Open **Access control (IAM)**.
1. Select **Add**.
1. For **Role**, select `Contributor`.
1. For **Select**, select your created App registration name.
1. Select **Save**.

* **Azure Network Security Group Name (securityGroupName)**

Custom Azure Network Security Group needed to allow Azure Load Balancers to work. If you provision hosts using Rancher Machine Azure driver, you will need to edit them manually to assign them to this Network Security Group. You should already assign custom hosts to this Network Security Group during provisioning.

Only hosts expected to be Load Balancer backends need to be in this group.
