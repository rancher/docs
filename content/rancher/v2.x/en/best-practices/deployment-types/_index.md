---
title: Tips for Running Rancher
weight: 100
---

A high-availability (HA) installation, defined as an installation of at least three nodes, should be used in any production installation of Rancher, as well as any installation deemed "important." Multiple Rancher instances running on multiple nodes ensure high availability that cannot be accomplished with a single node environment.

When you set up your high-availability Rancher installation, consider the following:

### Run Rancher on a Separate Cluster
Don't run other workloads or microservices in your Rancher HA cluster.

### Don't Run Rancher on a Hosted Kubernetes Environment
Don't run Rancher HA in a hosted Kubernetes environment such as Google's GKE, Amazon's EKS, or Microsoft's AKS. These hosted Kubernetes solutions do not expose etcd to a degree that is manageable for Rancher, and their customizations can interfere with Rancher operations.

It is strongly recommended to use hosted infrastructure such as Amazon's EC2 or Google's GCE instead. When you create a cluster using RKE on an infrastructure provider, you can configure the cluster to create etcd snapshots as a backup. You can then [use RKE]({{<baseurl>}}/rke/latest/en/etcd-snapshots/) or [Rancher]({{<baseurl>}}/rancher/v2.x/en/backups/restorations/) to restore your cluster from one of these snapshots. In a hosted Kubernetes environment, this backup and restore functionality is not supported.

### Run All Nodes in the Cluster in the Same Datacenter
For best performance, run all three of your nodes in the same geographic datacenter. If you are running nodes in the cloud, such as AWS, run each node in a separate Availability Zone. For example, launch node 1 in us-west-2a, node 2 in us-west-2b, and node 3 in us-west-2c.

### Development and Production Environments Should be Similar
It's strongly recommended to have a "staging" or "pre-production" environment of your Rancher HA cluster mirrors your production environment as closely as possible in terms of software and hardware configuration.

### Monitor Your Clusters to Plan Capacity
You should run Rancher HA within the [system and hardware requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/) as closely as possible. The more you deviate from the system and hardware requirements, the more risk you take.

However, metrics-driven capacity planning analysis should be the ultimate guidance for scaling Rancher, because the published requirements take into account a variety of workload types.

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with Prometheus, a leading open-source monitoring solution, and Grafana, which lets you visualize the metrics from Prometheus. 

After you [enable monitoring]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/) in the cluster, you can set up [a notification channel]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/notifiers/) and [cluster alerts]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/alerts/) to let you know if your cluster is approaching its capacity. You can also use the Prometheus and Grafana monitoring framework to establish a baseline for key metrics as you scale.

