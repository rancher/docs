---
title: "High Availability with Embedded DB"
weight: 40
---

>**Notice:**
K3s has added full support for embedded etcd as of release v1.19.5+k3s1. Versions v1.19.1 thru v1.19.4 provide only experimental support for embedded etcd.
Embedded etcd replaced experimental Dqlite in the K3s v1.19.1 release. This is a breaking change. Please note that upgrades from experimental Dqlite to embedded etcd are not supported. If you attempt an upgrade it will not succeed and data will be lost.

>**Warning:**
Embedded etcd (HA) may have performance issues on slower disks such as Raspberry Pis running with SD cards.

To run K3s in this mode, you must have an odd number of server nodes. We recommend starting with three nodes.

To get started, first launch a server node with the `cluster-init` flag to enable clustering and a token that will be used as a shared secret to join additional servers to the cluster.
```
curl -sfL https://get.k3s.io | K3S_TOKEN=SECRET sh -s - server --cluster-init
```

After launching the first server, join the second and third servers to the cluster using the shared secret:
```
K3S_TOKEN=SECRET k3s server --server https://<ip or hostname of server1>:6443
```

Now you have a highly available control plane. Joining additional worker nodes to the cluster follows the same procedure as a single server cluster.

There are a few config flags that must be the same in all server nodes:         

* Network related flags: `--cluster-dns`, `--cluster-domain`, `--cluster-cidr`, `--service-cidr`
* Flags controlling the deployment of certain components: `--disable-helm-controller`, `--disable-kube-proxy`, `--disable-network-policy` and any component passed to `--disable`
* Feature related flags: `--secrets-encryption`

## Existing clusters
If you have an existing cluster using the default embedded SQLite database, you can convert it to etcd by simply restarting your K3s server with the `--cluster-init` flag. Once you've done that, you'll be able to add additional instances as described above.

>**Important:** K3s v1.22.2 and newer support migration from SQLite to etcd. Older versions will create a new empty datastore if you add `--cluster-init` to an existing server.
