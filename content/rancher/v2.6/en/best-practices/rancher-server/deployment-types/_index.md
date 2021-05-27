---
title: Tips for Running Rancher
weight: 100
aliases:
  - /rancher/v2.5/en/best-practices/deployment-types
  - /rancher/v2.5/en/best-practices/v2.5/rancher-server/deployment-types
---

This guide is geared toward use cases where Rancher is used to manage downstream Kubernetes clusters. The high-availability setup is intended to prevent losing access to downstream clusters if the Rancher server is not available.

A high-availability Kubernetes installation, defined as an installation of Rancher on a Kubernetes cluster with at least three nodes, should be used in any production installation of Rancher, as well as any installation deemed "important." Multiple Rancher instances running on multiple nodes ensure high availability that cannot be accomplished with a single node environment.

If you are installing Rancher in a vSphere environment, refer to the best practices documented [here.](../rancher-in-vsphere)

When you set up your high-availability Rancher installation, consider the following:

### Run Rancher on a Separate Cluster
Don't run other workloads or microservices in the Kubernetes cluster that Rancher is installed on.

### Make sure nodes are configured correctly for Kubernetes ###
It's important to follow K8s and etcd best practices when deploying your nodes, including disabling swap, double checking you have full network connectivity between all machines in the cluster, using unique hostnames, MAC addresses, and product_uuids for every node, checking that all correct ports are opened, and deploying with ssd backed etcd.  More details can be found in the [kubernetes docs](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#before-you-begin) and [etcd's performance op guide](https://github.com/etcd-io/etcd/blob/master/Documentation/op-guide/performance.md)

### When using RKE: Back up the Statefile
RKE keeps record of the cluster state in a file called `cluster.rkestate`. This file is important for the recovery of a cluster and/or the continued maintenance of the cluster through RKE. Because this file contains certificate material, we strongly recommend encrypting this file before backing up. After each run of `rke up` you should backup the state file. 

### Run All Nodes in the Cluster in the Same Datacenter
For best performance, run all three of your nodes in the same geographic datacenter. If you are running nodes in the cloud, such as AWS, run each node in a separate Availability Zone. For example, launch node 1 in us-west-2a, node 2 in us-west-2b, and node 3 in us-west-2c.

### Development and Production Environments Should be Similar
It's strongly recommended to have a "staging" or "pre-production" environment of the Kubernetes cluster that Rancher runs on. This environment should mirror your production environment as closely as possible in terms of software and hardware configuration.

### Monitor Your Clusters to Plan Capacity
The Rancher server's Kubernetes cluster should run within the [system and hardware requirements]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/) as closely as possible. The more you deviate from the system and hardware requirements, the more risk you take.

However, metrics-driven capacity planning analysis should be the ultimate guidance for scaling Rancher, because the published requirements take into account a variety of workload types.

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with Prometheus, a leading open-source monitoring solution, and Grafana, which lets you visualize the metrics from Prometheus. 

After you [enable monitoring]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) in the cluster, you can set up [a notification channel]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/notifiers/) and [cluster alerts]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/alerts/) to let you know if your cluster is approaching its capacity. You can also use the Prometheus and Grafana monitoring framework to establish a baseline for key metrics as you scale.

