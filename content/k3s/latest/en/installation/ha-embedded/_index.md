---
title: "High Availability with Embedded DB (Experimental)"
weight: 40
---

K3s is previewing support for running a highly available control plane without the need for an external database. This means there is no need to manage an external etcd or SQL datastore.

In K3s 1.0.0, Dqlite was used as the experimental embedded database. In K3s v1.19.1+, embedded etcd is used.

Please note that upgrades from experimental Dqlite to experimental embedded etcd are not supported. If you attempt an upgrade it will not succeed and data will be lost.

### Embedded etcd (Experimental)

_Available as of K3s v1.19.1_

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

### 3 Node Cluster Exercise (with 2 k3Os instances)

This Exercise consists Node1 (having k3s installed) and Node2 and Node3 will have k3Os ( we will use CloudInit file while bringing up these)

so as mentioned above first we will have to run below command in Node1

```
K3S_TOKEN=SECRET k3s server --cluster-init
```

after that bring up Node2 and Node3 with below CloudInit files

# Node2 CloudInit

```
ssh_authorized_keys:
- ssh-ed25519 hdjkldhkd... (either rsa or ssh-ed will be fine)
- "github:YourGithubUserName" (this will be used to fetch public key stored in your github account and it will be placed under ssh/authorised_keys in Node2/3)

k3os:
  data_sources:
  - aws
  - cdrom
  modules:
  - kvm
  - nvme
  sysctl:
    kernel.printk: "4 4 1 7"
    kernel.kptr_restrict: "1"
  dns_nameservers:
  - 192.168.1.1 (if you have your own DNS configured)
  - 8.8.8.8
  ntp_servers:
  - 0.in.pool.ntp.org
  - 1.in.pool.ntp.org

  server_url: https://192.168.1.X:6443  (IP of Node1)
  token: secrets
 
  k3s_args:
  - server
  - "--node-name=node2"
 
```

# Node3 CloudInit

```
ssh_authorized_keys:
- ssh-ed25519 hdjkldhkd... (either rsa or ssh-ed will be fine)
- "github:YourGithubUserName" (this will be used to fetch public key stored in your github account and it will be placed under ssh/authorised_keys in Node2/3)

k3os:
  data_sources:
  - aws
  - cdrom
  modules:
  - kvm
  - nvme
  sysctl:
    kernel.printk: "4 4 1 7"
    kernel.kptr_restrict: "1"
  dns_nameservers:
  - 192.168.1.1 (if you have your own DNS configured)
  - 8.8.8.8
  ntp_servers:
  - 0.in.pool.ntp.org
  - 1.in.pool.ntp.org

  server_url: https://192.168.1.X:6443  (IP of Node1)
  token: secrets
 
  k3s_args:
  - server
  - "--node-name=node3"
 
```


After these two nodes (2 & 3) comes up, you can hit kubectl get node and all 3 should be visible.

PS: you can use pastebin for parsing cloudinit files, however make sure you give https://pastebin.com/raw/randomString otherwise k3Os won't fetch these files.

also github account is used because it has this api(https://github.com/${USERNAME}.keys.) to fetch the public key stored in it and it should be stored under ssh/authorised_keys in both k3Os node to be able to ssh it.



# Extra

For Node1 also you can use K3Os and below is its cloudInit file (make sure node which is initiating the cluster comes up before other two nodes)

```
ssh_authorized_keys:
- ssh-ed25519 AAAAC..hcg9Xddg1 
- "github:YourGithubUserName"

k3os:
  data_sources:
  - aws
  - cdrom
  modules:
  - kvm
  - nvme
  sysctl:
    kernel.printk: "4 4 1 7"
    kernel.kptr_restrict: "1"
  dns_nameservers:
  - 192.168.1.1
  - 8.8.8.8
  ntp_servers:
  - 0.in.pool.ntp.org
  - 1.in.pool.ntp.org

  token: secrets
 
  k3s_args:
  - server
  - "--cluster-init"
  - "--node-name=node1-init"
 
  ```




### Embedded Dqlite (Deprecated)

> **Warning:** Experimental etcd replaced experimental Dqlite in the K3s v1.19.1 release. This is a breaking change. Please note that upgrades from experimental Dqlite to experimental embedded etcd are not supported. If you attempt an upgrade it will not succeed and data will be lost.

As of v1.0.0, K3s previewed support for running a highly available control plane without the need for an external database.

This architecture is achieved by embedding a Dqlite database within the K3s server process. DQLite is short for "distributed SQLite." According to https://dqlite.io, it is "*a fast, embedded, persistent SQL database with Raft consensus that is perfect for fault-tolerant IoT and Edge devices.*"

To run K3s with the embedded Dqlite database, follow the same steps as the [embedded etcd database](#embedded-etcd-experimental) using a K3s release between v1.0.0 and v1.19.1.
