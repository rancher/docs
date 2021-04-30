---
title: Setting up Nodes in Amazon EC2
weight: 3
aliases:
  - /rancher/v2.5/en/installation/options/ec2-node
---

In this tutorial, you will learn one way to set up Linux nodes for the Rancher management server. These nodes will fulfill the node requirements for [OS, Docker, hardware, and networking.]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/)

If the Rancher server will be installed on an RKE Kubernetes cluster, you should provision three instances.

If the Rancher server will be installed on a K3s Kubernetes cluster, you only need to provision two instances.

If the Rancher server is installed in a single Docker container, you only need one instance.

### 1. Optional Preparation

- **Create IAM role:** To allow Rancher to manipulate AWS resources, such as provisioning new storage or new nodes, you will need to configure Amazon as a cloud provider. There are several things you'll need to do to set up the cloud provider on EC2, but part of this process is setting up an IAM role for the Rancher server nodes. For the full details on setting up the cloud provider, refer to this [page.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options/cloud-providers/)
- **Create security group:** We also recommend setting up a security group for the Rancher nodes that complies with the [port requirements for Rancher nodes.]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/#port-requirements)

### 2. Provision Instances

1. Log into the [Amazon AWS EC2 Console](https://console.aws.amazon.com/ec2/) to get started. Make sure to take note of the **Region** where your EC2 instances (Linux nodes) are created, because all of the infrastructure for the Rancher management server should be in the same region.
1. In the left panel, click **Instances.**
1. Click **Launch Instance.**
1. In the section called **Step 1: Choose an Amazon Machine Image (AMI),** we will use Ubuntu 18.04 as the Linux OS, using `ami-0d1cd67c26f5fca19 (64-bit x86)`. Go to the Ubuntu AMI and click **Select.**
1. In the **Step 2: Choose an Instance Type** section, select the `t2.medium` type.
1. Click **Next: Configure Instance Details.**
1. In the **Number of instances** field, enter the number of instances. A high-availability K3s cluster requires only two instances, while a high-availability RKE cluster requires three instances.
1. Optional: If you created an IAM role for Rancher to manipulate AWS resources, select the new IAM role in the **IAM role** field.
1. Click **Next: Add Storage,** **Next: Add Tags,** and **Next: Configure Security Group.**
1. In **Step 6: Configure Security Group,** select a security group that complies with the [port requirements]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/#port-requirements) for Rancher nodes.
1. Click **Review and Launch.**
1. Click **Launch.**
1. Choose a new or existing key pair that you will use to connect to your instance later. If you are using an existing key pair, make sure you already have access to the private key.
1. Click **Launch Instances.**


**Result:** You have created Rancher nodes that satisfy the requirements for OS, hardware, and networking.

**Note:** If the nodes are being used for an RKE Kubernetes cluster, install Docker on each node in the next step. For a K3s Kubernetes cluster, the nodes are now ready to install K3s.

### 3. Install Docker and Create User for RKE Kubernetes Cluster Nodes

1. From the [AWS EC2 console,](https://console.aws.amazon.com/ec2/) click **Instances** in the left panel.
1. Go to the instance that you want to install Docker on. Select the instance and click **Actions > Connect.**
1. Connect to the instance by following the instructions on the screen that appears. Copy the Public DNS of the instance. An example command to SSH into the instance is as follows:
```
sudo ssh -i [path-to-private-key] ubuntu@[public-DNS-of-instance]
```
1. Run the following command on the instance to install Docker with one of Rancher's installation scripts:
```
curl https://releases.rancher.com/install-docker/18.09.sh | sh
```
1. When you are connected to the instance, run the following command on the instance to create a user:
```
sudo usermod -aG docker ubuntu
```
1. Repeat these steps so that Docker is installed on each node that will eventually run the Rancher management server.

> To find out whether a script is available for installing a certain Docker version, refer to this [GitHub repository,](https://github.com/rancher/install-docker) which contains all of Rancher’s Docker installation scripts.

**Result:** You have set up Rancher server nodes that fulfill all the node requirements for OS, Docker, hardware and networking.

### Next Steps for RKE Kubernetes Cluster Nodes

If you are going to install an RKE cluster on the new nodes, take note of the **IPv4 Public IP** and **Private IP** of each node. This information can be found on the **Description** tab for each node after it is created. The public and private IP will be used to populate the `address` and `internal_address` of each node in the RKE cluster configuration file, `rancher-cluster.yml`.

RKE will also need access to the private key to connect to each node. Therefore, you might want to take note of the path to your private keys to connect to the nodes, which can also be included in the `rancher-cluster.yml` under the `ssh_key_path` directive for each node.
