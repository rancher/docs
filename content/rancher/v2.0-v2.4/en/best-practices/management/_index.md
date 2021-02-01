---
title: Tips for Scaling, Security and Reliability
weight: 101
aliases:
  - /rancher/v2.0-v2.4/en/best-practices/management
  - /rancher/v2.0-v2.4/en/best-practices/v2.0-v2.4/management
---

Rancher allows you to set up numerous combinations of configurations. Some configurations are more appropriate for development and testing, while there are other best practices for production environments for maximum availability and fault tolerance. The following best practices should be followed for production.

- [Tips for Preventing and Handling Problems](#tips-for-preventing-and-handling-problems)
- [Network Topology](#network-topology)
- [Tips for Scaling and Reliability](#tips-for-scaling-and-reliability)
- [Tips for Security](#tips-for-security)
- [Tips for Multi-Tenant Clusters](#tips-for-multi-tenant-clusters)
- [Class of Service and Kubernetes Clusters](#class-of-service-and-kubernetes-clusters)
- [Network Security](#network-security)

# Tips for Preventing and Handling Problems

These tips can help you solve problems before they happen.

### Run Rancher on a Supported OS and Supported Docker Version
Rancher is container-based and can potentially run on any Linux-based operating system. However, only operating systems listed in the [requirements documentation]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/requirements/) should be used for running Rancher, along with a supported version of Docker. These versions have been most thoroughly tested and can be properly supported by the Rancher Support team.

### Upgrade Your Kubernetes Version
Keep your Kubernetes cluster up to date with a recent and supported version. Typically the Kubernetes community will support the current version and previous three minor releases (for example, 1.14.x, 1.13.x, 1.12.x, and 1.11.x). After a new version is released, the third-oldest supported version reaches EOL (End of Life) status. Running on an EOL release can be a risk if a security issues are found and patches are not available. The community typically makes minor releases every quarter (every three months).

Rancher’s SLAs are not community dependent, but as Kubernetes is a community-driven software, the quality of experience will degrade as you get farther away from the community's supported target.

### Kill Pods Randomly During Testing
Run chaoskube or a similar mechanism to randomly kill pods in your test environment. This will test the resiliency of your infrastructure and the ability of Kubernetes to self-heal. It's not recommended to run this in your production environment.

### Deploy Complicated Clusters with Terraform
Rancher's "Add Cluster" UI is preferable for getting started with Kubernetes cluster orchestration or for simple use cases. However, for more complex or demanding use cases, it is recommended to use a CLI/API driven approach. [Terraform](https://www.terraform.io/) is recommended as the tooling to implement this. When you use Terraform with version control and a CI/CD environment, you can have high assurances of consistency and reliability when deploying Kubernetes clusters. This approach also gives you the most customization options.

Rancher [maintains a Terraform provider](https://rancher.com/blog/2019/rancher-2-terraform-provider/) for working with Rancher 2.0 Kubernetes. It is called the [Rancher2 Provider.](https://www.terraform.io/docs/providers/rancher2/index.html)

### Upgrade Rancher in a Staging Environment
All upgrades, both patch and feature upgrades, should be first tested on a staging environment before production is upgraded. The more closely the staging environment mirrors production, the higher chance your production upgrade will be successful.

### Renew Certificates Before they Expire
Multiple people in your organization should set up calendar reminders for certificate renewal. Consider renewing the certificate two weeks to one month in advance. If you have multiple certificates to track, consider using [monitoring and alerting mechanisms]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/) to track certificate expiration.

Rancher-provisioned Kubernetes clusters will use certificates that expire in one year. Clusters provisioned by other means may have a longer or shorter expiration.

Certificates can be renewed for Rancher-provisioned clusters [through the Rancher user interface]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/certificate-rotation/).

### Enable Recurring Snapshots for Backing up and Restoring the Cluster
Make sure etcd recurring snapshots are enabled. Extend the snapshot retention to a period of time that meets your business needs. In the event of a catastrophic failure or deletion of data, this may be your only recourse for recovery. For details about configuring snapshots, refer to the [RKE documentation]({{<baseurl>}}/rke/latest/en/etcd-snapshots/) or the [Rancher documentation on backups]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/).

### Provision Clusters with Rancher
When possible, use Rancher to provision your Kubernetes cluster rather than importing a cluster. This will ensure the best compatibility and supportability.

### Use Stable and Supported Rancher Versions for Production
Do not upgrade production environments to alpha, beta, release candidate (rc), or "latest" versions. These early releases are often not stable and may not have a future upgrade path.

When installing or upgrading a non-production environment to an early release, anticipate problems such as features not working, data loss, outages, and inability to upgrade without a reinstall.

Make sure the feature version you are upgrading to is considered "stable" as determined by Rancher. Use the beta, release candidate, and "latest" versions in a testing, development, or demo environment to try out new features. Feature version upgrades, for example 2.1.x to 2.2.x, should be considered as and when they are released. Some bug fixes and most features are not back ported into older versions.

Keep in mind that Rancher does End of Life support for old versions, so you will eventually want to upgrade if you want to continue to receive patches.

For more detail on what happens during the Rancher product lifecycle, refer to the [Support Maintenance Terms](https://rancher.com/support-maintenance-terms/).

# Network Topology
These tips can help Rancher work more smoothly with your network.

### Use Low-latency Networks for Communication Within Clusters
Kubernetes clusters are best served by low-latency networks. This is especially true for the control plane components and etcd, where lots of coordination and leader election traffic occurs. Networking between Rancher server and the Kubernetes clusters it manages are more tolerant of latency.

### Allow Rancher to Communicate Directly with Clusters
Limit the use of proxies or load balancers between Rancher server and Kubernetes clusters. As Rancher is maintaining a long-lived web sockets connection, these intermediaries can interfere with the connection lifecycle as they often weren't configured with this use case in mind.


# Tips for Scaling and Reliability
These tips can help you scale your cluster more easily.

### Use One Kubernetes Role Per Host
Separate the etcd, control plane, and worker roles onto different hosts. Don't assign multiple roles to the same host, such as a worker and control plane. This will give you maximum scalability.

### Run the Control Plane and etcd on Virtual Machines
Run your etcd and control plane nodes on virtual machines where you can scale vCPU and memory easily if needed in the future.

### Use at Least Three etcd Nodes
Provision 3 or 5 etcd nodes. Etcd requires a quorum to determine a leader by the majority of nodes, therefore it is not recommended to have clusters of even numbers. Three etcd nodes is generally sufficient for smaller clusters and five etcd nodes for large clusters.

### Use at Least Two Control Plane Nodes
Provision two or more control plane nodes. Some control plane components, such as the `kube-apiserver`, run in [active-active](https://www.jscape.com/blog/active-active-vs-active-passive-high-availability-cluster) mode and will give you more scalability. Other components such as kube-scheduler and kube-controller run in active-passive mode (leader elect) and give you more fault tolerance.

### Monitor Your Cluster
Closely monitor and scale your nodes as needed. You should [enable cluster monitoring]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) and use the Prometheus metrics and Grafana visualization options as a starting point.


# Tips for Security
Below are some basic tips for increasing security in Rancher. For more detailed information about securing your cluster, you can refer to these resources:

- Rancher's [security documentation and Kubernetes cluster hardening guide]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/)
- [101 More Security Best Practices for Kubernetes](https://rancher.com/blog/2019/2019-01-17-101-more-kubernetes-security-best-practices/)

### Update Rancher with Security Patches
Keep your Rancher installation up to date with the latest patches. Patch updates have important software fixes and sometimes have security fixes. When patches with security fixes are released, customers with Rancher licenses are notified by e-mail. These updates are also posted on Rancher's [forum](https://forums.rancher.com/).

### Report Security Issues Directly to Rancher
If you believe you have uncovered a security-related problem in Rancher, please communicate this immediately and discretely to the Rancher team (security@rancher.com). Posting security issues on public forums such as Twitter, Rancher Slack, GitHub, etc. can potentially compromise security for all Rancher customers. Reporting security issues discretely allows Rancher to assess and mitigate the problem. Security patches are typically given high priority and released as quickly as possible.

### Only Upgrade One Component at a Time
In addition to Rancher software updates, closely monitor security fixes for related software, such as Docker, Linux, and any libraries used by your workloads. For production environments, try to avoid upgrading too many entities during a single maintenance window. Upgrading multiple components can make it difficult to root cause an issue in the event of a failure. As business requirements allow, upgrade one component at a time.

# Tips for Multi-Tenant Clusters

### Namespaces
Each tenant should have their own unique namespaces within the cluster. This avoids naming conflicts and allows resources to be only visible to their owner through use of RBAC policy

### Project Isolation
Use Rancher's Project Isolation to automatically generate Network Policy between Projects (sets of Namespaces). This further protects workloads from interference

### Resource Limits
Enforce use of sane resource limit definitions for every deployment in your cluster. This not only protects the owners of the deployment, but the neighboring resources from other tenants as well. Remember, namespaces do not isolate at the node level, so over-consumption of resources on a node affects other namespace deployments. Admission controllers can be written to require resource limit definitions

### Resource Requirements
Enforce use of resource requirement definitions for each deployment in your cluster. This enables the scheduler to appropriately schedule workloads. Otherwise you will eventually end up with over-provisioned nodes.

# Class of Service and Kubernetes Clusters
A class of service describes the expectations around cluster uptime, durability, and duration of maintenance windows. Typically organizations group these characteristics into labels such as "dev" or "prod"

### Consider fault domains
Kubernetes clusters can span multiple classes of service, however it is important to consider the ability for one workload to affect another. Without proper deployment practices such as resource limits, requirements, etc, a deployment that is not behaving well has the potential to impact the health of the cluster. In a "dev" environment it is common for end-users to exercise less caution with deployments, thus increasing the chance of such behavior. Sharing this behavior with your production workload increases risk.

### Upgrade risks
Upgrades of Kubernetes are not without risk, the best way to predict the outcome of an upgrade is try it on a cluster of similar load and use case as your production cluster. This is where having non-prod class of service clusters can be advantageous.

### Resource Efficiency
Clusters can be built with varying degrees of redundancy. In a class of service with low expectations for uptime, resources and cost can be conserved by building clusters without redundant Kubernetes control components. This approach may also free up more budget/resources to increase the redundancy at the production level

# Network Security
In general, you can use network security best practices in your Rancher and Kubernetes clusters. Consider the following:

### Use a Firewall Between your Hosts and the Internet
Firewalls should be used between your hosts and the Internet (or corporate Intranet). This could be enterprise firewall appliances in a datacenter or SDN constructs in the cloud, such as VPCs, security groups, ingress, and egress rules. Try to limit inbound access only to ports and IP addresses that require it. Outbound access can be shut off (air gap) if environment sensitive information that requires this restriction. If available, use firewalls with intrusion detection and DDoS prevention.

### Run Periodic Security Scans
Run security and penetration scans on your environment periodically. Even with well design infrastructure, a poorly designed microservice could compromise the entire environment.
