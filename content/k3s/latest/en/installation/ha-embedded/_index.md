---
title: "High Availability with Embedded DB"
weight: 40
---

K3s has added support for embedded etcd as of release v1.19.5+k3s1. Versions v1.19.1 thru v1.19.4 provide only experimental support for embedded etcd.
In K3s 1.0.0, Dqlite was used as the experimental embedded database. In K3s v1.19.1+, embedded etcd is used.

Please note that upgrades from experimental Dqlite to experimental embedded etcd are not supported. If you attempt an upgrade it will not succeed and data will be lost.

### Embedded etcd

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

### Embedded Dqlite (Deprecated)

> **Warning:** Embedded etcd replaced experimental Dqlite in the K3s v1.19.1 release. Embedded etcd was experimental in the v1.19.1 release and is now considered stable in the 1.19.5 release and newer. This is a breaking change. Please note that upgrades from experimental Dqlite to embedded etcd are not supported. If you attempt an upgrade it will not succeed and data will be lost.

As of v1.0.0, K3s previewed support for running a highly available control plane without the need for an external database.

This architecture is achieved by embedding a Dqlite database within the K3s server process. DQLite is short for "distributed SQLite." According to https://dqlite.io, it is "*a fast, embedded, persistent SQL database with Raft consensus that is perfect for fault-tolerant IoT and Edge devices.*"

To run K3s with the embedded Dqlite database, follow the same steps as the [embedded etcd database](#embedded-etcd-experimental) using a K3s release between v1.0.0 and v1.19.1.
