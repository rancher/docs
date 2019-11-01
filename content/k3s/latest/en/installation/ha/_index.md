---
title: "High Availability (HA) Install (Experimental)"
weight: 30
---

>**Important:** High-Availability (HA) was introduced in the v0.10.0 release of k3s and is _experimental_. Our v1.0 release plans to support HA in production environments. HA should currently only be used for testing purposes in non-production environments.
>**Note:** k3s does not utilize etcd by default so only a 2-node cluster is needed for HA at a minimum. The following will guide you through setting up a 2-node cluster with PostgreSQL. You could optionally add one or more nodes for additional redundancy. In the future we plan to add support for additional database providers.

For production environments, we recommend installing k3s in a high-availability configuration so that you can always access your cluster. This procedure walks you through setting up a 2-node cluster with k3s with an external PostgreSQL database. As of v0.10.0 release (Experimental HA) we are supporting PostgreSQL 10.7-R1 thru 11.5-R1

Installation Outline
--------------------
1. Create backend database (PostgreSQL)
2. Create master nodes
3. Join worker nodes

### Create Database
The first step for setting up High Availability (HA) is to create the database for the backend. As of v0.10.0 release (Experimental HA) we are currently supporting PostgreSQL 10.7-R1 thru 11.5-R1

### Create Master Nodes
Following the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) page, provision at least two machines.

On the first machine, run the following command to install k3s and connect it to the database.

>**Note:** You may wish to taint the master nodes. They will run the kubelet by default and be scheduleable. You can only add node labels and taints during the install process. If you wish to do this, use the `--node-taint` flag. For example `--node-taint key1=value1:NoExecute` the following examples do not include this flag.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='postgres://username:password@hostname:5432/dbname' --bootstrap-save
```
Note: You may want to provide the password temporarily via a file or environment variable then destroy it or clear your bash history so the password is no longer exposed in plain text on the machine.

On the second machine, run the following command. Since we ran the first node with the `--bootstrap-save` flag the second and any additional machines will now automatically bootstrap HA.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='postgres://username:password@hostname:5432/dbname'
```

Ensure that both of the nodes are in a Ready state such as with `k3s kubectl get nodes`

### Join Worker Nodes
Following the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) page, provision one or more machines to fill the role of the worker node(s).

Run the following command to join a worker node to the master nodes. You can get the node-token from any of the servers at `/var/lib/rancher/k3s/server/node-token`

```
curl -sfL https://get.k3s.io | K3S_URL=https:/<master_node>:6443 K3S_TOKEN=XXX sh -
```

Provide the IP or DNS in place of `<master_node>` this can be any one master node. k3s automatically handles load balancing the master nodes.

