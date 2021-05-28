---
title: Other Installation Methods
weight: 3
---

### Air Gapped Installations

Follow [these steps]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap) to install the Rancher server in an air gapped environment.

An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy.

### Docker Installations

The [single-node Docker installation]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker) is for Rancher users that are wanting to test out Rancher. Instead of running on a Kubernetes cluster using Helm, you install the Rancher server component on a single node using a `docker run` command.

The Docker installation is for development and testing environments only. 

Since there is only one node and a single Docker container, if the node goes down, there is no copy of the etcd data available on other nodes and you will lose all the data of your Rancher server.

For Rancher v2.5+, the Rancher backup operator can be used to migrate Rancher from the single Docker container install to an installation on a high-availability Kubernetes cluster. For details, refer to the documentation on [migrating Rancher to a new cluster.]({{<baseurl>}}/rancher/v2.5/en/backups/migrating-rancher)