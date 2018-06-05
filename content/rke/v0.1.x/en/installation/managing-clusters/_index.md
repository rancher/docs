---
title: Managing RKE Clusters
weight: 51
draft: true
---

## Adding/Removing Nodes

RKE supports adding/removing nodes for worker and controlplane hosts, in order to add additional nodes you will only need to update the `cluster.yml` file with additional nodes and run `rke up` with the same file.

To remove nodes just remove them from the hosts list in the cluster configuration file `cluster.yml`, and re run `rke up` command.

## Cluster Remove

RKE supports `rke remove` command, the command does the following:

- Connect to each host and remove the kubernetes services deployed on it.
- Clean each host from the directories left by the services:
  - /etc/kubernetes/ssl
  - /var/lib/etcd
  - /etc/cni
  - /opt/cni
  - /var/run/calico

Note that this command is irreversible and will destroy the kubernetes cluster entirely.
