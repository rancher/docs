---
title: Clusters
weight: 2100
---
# Clusters

## What's a Cluster?

A cluster is a group of computing resources that work as a team to accomplish a goal. Each individual computer in a cluster is called a _node_.

## Cluster Creation

Rancher simplifies creation of Kubernetes clusters by allowing you to create them with the Rancher UI rather than a config file.

### Node Components

A Kubernetes cluster contains 3 types of nodes: etcd nodes, control plane nodes, and worker nodes.

#### etcd Nodes

The etcd nodes are used to run the etcd database. etcd is a key value store used as Kubernetes’ backing store for all cluster data. Even though you can run etcd on a single node, you need 3, 5, or 7 nodes for redundancy.

#### Control Plane Nodes

The control plane nodes are used to run the Kubernetes API server, scheduler, and controller manager. Control plane nodes are stateless since all cluster data are stored on etcd nodes. You can run control plane on 1 node, although 2 or more nodes are required for redundancy. You can also run control plane on etcd nodes.

#### Worker Nodes

Worker nodes are used to run the kubelet and the workload. It also runs the storage and networking drivers and ingress controllers when required. You create as many worker nodes as needed for your workload needs.

### Cluster Providers

#### Rancher Kubernetes Engine (RKE)

RKE is Rancher’s own lightweight Kubernetes installer. It works with any cloud providers, virtualization platforms, or bare metal servers. It integrates with node drivers to automatically provision nodes on AWS, Azure, DigitalOcean, vSphere, OpenStack, etc. Users can add custom nodes to the cluster by running the Rancher agent on these nodes.

#### Cloud-Managed Kubernetes Clusters

Rancher integrates with cloud APIs so users can provision GKE, EKS, and AKS clusters directly from Rancher. New cloud managed Kubernetes clusters will be added as they become available.

#### Imported Clusters

Users can existing Kubernetes cluster into Rancher. Rancher does not automate the provisioning, scaling, and upgrade of imported Kubernetes clusters. All other cluster management, policy management, and workload management capabilities of Rancher apply to imported clustered.

##### RKE and Amazon AWS EC2: Adding Hosts

When setting up a custom cluster configured to run with an AWS cloud provider, any hosts you add to the cluster:

- Must be an AWS EC2 instance.
- Must have the following IAM policy at minimum:

```
{
  "Effect": "Allow",
  "Action": "ec2:Describe*",
  "Resource": "*"
}
```
In order to use Amazon Elastic Load Balancers (ELBs) and EBS with Kubernetes, the host requires the IAM role with appropriate access.

**Example Policy for IAM Role**

```
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
<!--
### Kubeconfig File

Coming Soon!-->
