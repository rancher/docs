---
title: "High Availability with Embedded DB (Experimental)"
weight: 40
---

As of v1.0.0, K3s is previewing support for running a highly available control plane without the need for an external database. This means there is no need to manage an external etcd or SQL datastore in order to run a reliable production-grade setup. While this feature is currently experimental, we expect it to be the primary architecture for running HA K3s clusters in the future.

This architecture is achieved by embedding a dqlite database within the K3s server process. DQLite is short for "distributed SQLite." According to https://dqlite.io, it is "*a fast, embedded, persistent SQL database with Raft consensus that is perfect for fault-tolerant IoT and Edge devices.*" This makes it a natural fit for K3s.

To run K3s in this mode, you must have an odd number of server nodes. We recommend starting with three nodes.

To get started, first launch a server node with the `cluster-init` flag to enable clustering and a token that will be used as a shared secret to join additional servers to the cluster.
```
K3S_TOKEN=SECRET k3s server --cluster-init
```

After launching the first server, join the second and third servers to the cluster using the shared secret:
```
K3S_TOKEN=SECRET k3s server --server https://<ip or hostname of server1>:6443
```

Now you have a highly available control plane. Joining additional worker nodes to the cluster follows the same procedure as a single server cluster.
