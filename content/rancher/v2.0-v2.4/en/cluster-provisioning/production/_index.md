---
title: Checklist for Production-Ready Clusters
weight: 2
---

In this section, we recommend best practices for creating the production-ready Kubernetes clusters that will run your apps and services.

For a list of requirements for your cluster, including the requirements for OS/Docker, hardware, and networking, refer to the section on [node requirements.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/node-requirements)

This is a shortlist of best practices that we strongly recommend for all production clusters.

For a full list of all the best practices that we recommend, refer to the [best practices section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/best-practices)

### Node Requirements

* Make sure your nodes fulfill all of the [node requirements,]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/node-requirements/) including the port requirements.

### Back up etcd

* Enable etcd snapshots. Verify that snapshots are being created, and run a disaster recovery scenario to verify the snapshots are valid. etcd is the location where the state of your cluster is stored, and losing etcd data means losing your cluster. Make sure you configure [etcd Recurring Snapshots]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/v2.0.x-v2.4.x/backup/rke-backups/#option-a-recurring-snapshots) for your cluster(s), and make sure the snapshots are stored externally (off the node) as well.

### Cluster Architecture

* Nodes should have one of the following role configurations:
  * `etcd`
  * `controlplane`
  * `etcd` and `controlplane`
  * `worker` (the `worker` role should not be used or added on nodes with the `etcd` or `controlplane` role)
* Have at least three nodes with the role `etcd` to survive losing one node. Increase this count for higher node fault toleration, and spread them across (availability) zones to provide even better fault tolerance.
* Assign two or more nodes the `controlplane` role for master component high availability.
* Assign two or more nodes the `worker` role for workload rescheduling upon node failure.

For more information on what each role is used for, refer to the [section on roles for nodes in Kubernetes.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/production/nodes-and-roles)

For more information about the 
number of nodes for each Kubernetes role, refer to the section on [recommended architecture.]({{<baseurl>}}/rancher/v2.0-v2.4/en/overview/architecture-recommendations/)

### Logging and Monitoring

* Configure alerts/notifiers for Kubernetes components (System Service).
* Configure logging for cluster analysis and post-mortems.

### Reliability

* Perform load tests on your cluster to verify that its hardware can support your workloads.

### Networking

* Minimize network latency. Rancher recommends minimizing latency between the etcd nodes. The default setting for `heartbeat-interval` is `500`, and the default setting for `election-timeout` is `5000`. These [settings for etcd tuning](https://coreos.com/etcd/docs/latest/tuning.html) allow etcd to run in most networks (except really high latency networks).
* Cluster nodes should be located within a single region. Most cloud providers provide multiple availability zones within a region, which can be used to create higher availability for your cluster. Using multiple availability zones is fine for nodes with any role. If you are using [Kubernetes Cloud Provider]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options/cloud-providers/) resources, consult the documentation for any restrictions (i.e. zone storage restrictions).
