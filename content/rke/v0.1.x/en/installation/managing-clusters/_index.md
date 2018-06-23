---
title: Managing RKE Clusters
weight: 60
draft: true
---

### Adding/Removing Nodes

RKE supports adding/removing [nodes]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes/) for worker and controlplane hosts.

In order to add additional nodes, you update the original `cluster.yml` file with any additional nodes and specify their role in the Kubernetes cluster.

In order to remove nodes, remove the node information from the nodes list in the original `cluster.yml`.
### Adding/Removing Worker Node
When you add/remove worker nodes only, it's possible to use the command `rke up --update-only`.

## Cluster Remove

After you've made changes to add/remove nodes, run `rke up` with the updated `cluster.yml`.

### Adding/Removing Worker Nodes

You can add/remove only worker nodes, by running `rke up --update-only`. This will ignore everything else in the `cluster.yml` except for any worker nodes.

### Removing Kubernetes Clusters from Nodes

In order to remove the Kubernetes components from nodes, you use the `rke remove` command.

> **Note:** This command is irreversible and will destroy the Kubernetes cluster.

This command does the following to each node in the `cluster.yml`:


- Remove the Kubernetes services deployed on it
- Clean each host from the directories left by the services:
  ```
  - /etc/kubernetes/ssl
  - /var/lib/etcd
  - /etc/cni
  - /opt/cni
  - /var/run/calico
  ```
