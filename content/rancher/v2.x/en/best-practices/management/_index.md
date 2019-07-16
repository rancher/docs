---
title: Rancher & Kubernetes Management
weight: 100
---

## Rancher Operating System and Docker

Rancher is container based and can potentially run on any Linux-based operating system. However, only operating systems listed in the [requirements documentation]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/) should be used along with a supported version of Docker. These versions have been most thoroughly tested and can be properly supported by the Rancher Support team.

## Kubernetes Clusters
Rancher allows you to set up numerous combinations of configurations. Some configurations are more appropriate for development and testing, while there are other best practices for production environments for maximum availability and fault tolerance. The following best practices should be followed for production:

- Separate the etcd, control plane, and workers onto different hosts. Don't assign multiple roles to the same host, such as a worker and control plane. This will give you maximum scalability.
- Provision 3 or 5 etcd nodes. Etcd requires a quorum and is not recommended to have clusters of even numbers. Three etcd nodes is generally sufficient for smaller clusters and five etcd nodes for large clusters.
- Provision 2 or more control plane nodes. Some control plane components, such as the kube-apiserver run in active-active mode and will give you more scalability. Other components such as kube-scheduler and kube-controller run in active-passive (leader elect) and give you more fault tolerance.
- Run your etcd and control plane nodes on virtual machines where you can scale vCPU and memory easily if needed in the future.
- Make sure etcd recurring snapshots are enabled. Extend the snapshot retention to a period of time that meets your business needs. In the event of a catastrophic failure or deletion of data, this may be your only recourse for recovery.
- When possible, use Rancher to provision your Kubernetes cluster rather than importing a cluster. This will ensure the best compatibility and supportability.
- Have multiple people in your organization set up calendar reminders for certificate renewal. Rancher provisioned Kubernetes clusters will use certificates that expire in one year. Clusters provisioned by other means may have a longer or shorter expiration. Certificates can be renewed for Rancher provisioned clusters through the user interface. Consider renewing the certificate two weeks to one month in advance. If you have multiple certificates to track, consider using monitoring and alerting mechanisms to tracking certificate expiration.
- Closely monitor and scale your nodes as needed. Use the included Prometheus and Grafana options (see “Monitoring” sections of documentation) as a starting point to achieve this.  
- Keep your Kubernetes cluster up to date with a recent and supported version. Typically the Kubernetes community will support the current version and previous 3 minor releases (for example, 1.14.x, 1.13.x, 1.12.x, and 1.11.x). Once a new version is released, older version will be EOL'd. Running on an EOL release can be a risk if a security issues are found and patches are not available. The community typically makes minor releases every quarter (3 months). Rancher’s SLA’s are not community dependent but as Kubernetes is a community driven software, the quality of experience will degrade as you get farther away from their supported target.
- Run chaoskube or a similar mechanism to randomly kill pods in your test environment. This will test the resiliency of your infrastructure and the ability of Kubernetes to self-heal. It's not recommended to run this in your production environment.
Kubernetes Orchestration
- Rancher's "Add Cluster" UI is preferable for getting started with Kubernetes cluster orchestration or for simple use cases, however for more complex or demanding use cases using a CLI/API driven approach is preferred. Terraform is recommended as the tooling to implement this. Using terraform with version control and a CI/CD environment you can have high assurances of consistency and reliability when deploying Kubernetes clusters. This approach also gives you the most customization options.
- Rancher maintains a terraform provider for working with Rancher 2.0 Kubernetes called the rancher2 provider.
Network Topology
- Kubernetes clusters are best served by low-latency networks. This is especially true for the control plane components and etcd where lots of coordination / leader election traffic occurs. Networking between Rancher server and the Kubernetes clusters it manages are more tolerant of latency.
- Limit the use of proxies or load balancers between Rancher server and Kubernetes clusters. As Rancher is maintaining a long-lived web sockets connection, these intermediaries can interfere with the connection lifecycle as they often weren't configured with this use case in mind.


### Rancher Software Updates
Keep your Rancher installation up to date with the latest patches. Patch updates have important software fixes and sometimes have security fixes. When patches with security fixes are released, customers with Rancher licenses are notified by e-mail. These updates are also posted on Rancher's forum.

If you believe you have uncovered a security related problem in Rancher, please communicate this immediately and discretely to the Rancher support team (rancher@support.com). Posting security issues on public forums such as Twitter, Rancher Slack, GitHub, etc. can potentially compromise security for all Rancher customers. Reporting security issues discretely allows Rancher to assess and mitigate the problem. Security patches are typically given high priority and released as quickly as possible.

Feature version upgrades, for example 2.1.x to 2.2.x, should also be considered as and when they are released. Not all bug fixes and most features are not back ported into older versions. Do not upgrade production environments to beta, release candidate, or "latest" versions. Make sure the feature version you are upgrading to is considered "stable" as determined by Rancher. Use the beta, release candidate, and "latest" versions in a testing, development, or demo environment to try out new features. Keep in mind that Rancher does End of Life support for old versions, so you will eventually want to upgrade if you want to continue to receive patches.

All upgrades, both patch and feature upgrades, should be first tested on a staging environment before production is upgraded. The more closely the staging environment mirrors production, the higher chance your production upgrade will be successful. Notify Rancher support of your upgrade plans so they can be on full alert during your maintenance window in the event you need their assistance.

Do not upgrade production environments to a release candidate (rc), alpha, or beta release. These early releases are often not stable and may not have a future upgrade path. When installing or upgrading a non-production environment to an early release, anticipate problems such as features not working, data loss, outages, and inability to upgrade without a reinstall.

In addition to Rancher software updates, closely monitor security fixes for related software, such as Docker, Linux, and any libraries used by your workloads. For production environments, try to avoid upgrading too many entities during a single maintenance window. Upgrading multiple components can make it difficult to root cause an issue in the event of a failure. As business requirements allow, upgrade one component at a time.

## Network Security

In general, you can use network security best practices in your Rancher and Kubernetes clusters. Consider the following:

- Firewalls should be used between your hosts and the Internet (or corporate Intranet). This could be enterprise firewall appliances in a datacenter or SDN constructs in the cloud, such as VPCs, security groups, ingress, and egress rules. Try to limit inbound access only to ports and IP addresses that require it. Outbound access can be shut off (air gap) if environment sensitive information that requires this restriction. If available, use firewalls with intrusion detection and DDoS prevention.
- Run security and penetration scans on your environment periodically. Even with well design infrastructure, a poorly designed microservice could compromise the entire environment.
