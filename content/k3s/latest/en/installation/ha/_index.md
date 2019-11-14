---
title: "High Availability (HA) Install"
weight: 30
---

>**Note:** Official support for High-Availability (HA) was introduced in our v1.0.0 release.

>k3s servers do not utilize a quorum for leader election and so only a 2-node cluster is needed for HA at a minimum. You could optionally add one or more server nodes for additional redundancy.

For production environments that cannot tolerate down time, we recommend installing k3s in a high-availability configuration so that you can always access your cluster. This procedure walks you through setting up a 2-server cluster with k3s with an external database for the cluster datastore.

# Recommended Architecture
![k3s HA]({{< baseurl >}}/img/k3s/k3s-production-setup-v5.svg)
This image depicts a k3s HA install with two load balancers:

* A load balancer to expose workloads to external traffic
* A load balancer to expose the Kubernetes API for clients such as kubectl and to expose a stable k3s worker registration endpoint

The external database shown should be a single endpoint k3s can access. The worker registration / kubernetes API load balancer is needed if the server nodepool will be auto scaling and thus server nodes are ephemeral. Port 6443 is used for worker (agent) node registration and the Kubernetes API.

Installation Outline
--------------------
1. Create Database for Cluster Datastore (PostgreSQL, MySQL, or etcd)
2. Create Server Nodes
3. Join Worker Nodes

### Create Database for Cluster Datastore
You will first need to create the database for the backend (cluster datastore). k3s must have a single endpoint it can reach to talk to the database.

Here is a list of supported backend databases as of our v1.0.0 release:

*  PostgreSQL 10.7 and 11.5
*  MySQL 5.7
*  etcd 3.3.15

### Create Server Nodes
Following the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) page, provision at least two machines.
The sections below will indicate what you need to run (depending on the type of database) to bring the server nodes up.

>**Note:** You may wish to taint the server nodes. They will run the kubelet and be scheduleable. If you wish to do this, you can use the `--node-taint` flag. For example `--node-taint key=value:NoExecute`.

>If your server node pool will be auto-scaling, we recommend using the `--cluster-secret` flag instead of the default node-token. For example, this will make it easier to write user-data. The examples we provide use this flag.


{{% tabs %}}
{{% tab "PostgreSQL" %}}

>**Note:** If you do not specify a DSN (data source name), for example if you only supply `--storage-endpoint='postgres://'` then the server will attempt to connect with the following:

> * Connect to `localhost` using the `postgres` user.
> * Use `postgres` as the password.
> * Create a database with the name `kubernetes`.

> If you specify a database name and it does not exist, then the server will attempt to create it.
> For more information about the Postgres driver DSN, please refer to https://godoc.org/github.com/lib/pq

### Secure Method
Run the following command on each server to install k3s and connect it to the database securely.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='postgres://username:password@hostname:5432/dbname' \
 --cluster-secret='mysecret' \
 --storage-cafile ca.crt \
 --storage-certfile postgres.crt \
 --storage-keyfile postgres.key

```

The above command will use these certificates to generate the TLS config to communicate with PostgreSQL securely.

### Insecure Method
Run the following command on each server to install k3s and connect it to the database insecurely.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='postgres://username:password@hostname:5432/dbname' --cluster-secret='mysecret'
```

{{% /tab %}}
{{% tab "MySQL" %}}

>**Note:** If you do not specify a DSN (data source name), for example if you only supply `--storage-endpoint='mysql://'` then the server will attempt to connect with the following:

> * Connect to the MySQL socket at `/var/run/mysqld/mysqld.sock` using the `root` user.
> * Use no password.
> * Create a database with the name `kubernetes`.

> If you specify a database name and it does not exist, then the server will attempt to create it.
> For more information about the MySQL driver DSN, please refer to https://github.com/go-sql-driver/mysql#dsn-data-source-name

### Secure Method
Run the following command on each server to install k3s and connect it to the database securely.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='mysql://username:password@tcp(hostname:3306)/dbname' \
 --cluster-secret='mysecret' \
 --storage-cafile ca.crt \
 --storage-certfile mysql.crt \
 --storage-keyfile mysql.key


```
The above command will use these certificates to generate the TLS config to communicate with MySQL securely.

### Insecure Method
Run the following command on each server to install k3s and connect it to the database insecurely.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='mysql://username:password@tcp(hostname:3306)/dbname' --cluster-secret='mysecret'
```

{{% /tab %}}
{{% tab "etcd" %}}

### Secure Method
Run the following command on each server to install k3s and connect it to the database securely.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint="https://hostname:2379" \
 --cluster-secret='mysecret' \
 --storage-cafile ca.crt \
 --storage-certfile etcd.crt \
 --storage-keyfile etcd.key
```
The above command will use these certificates to generate the TLS config to communicate with etcd securely.

### Insecure Method
Run the following command on each server to install k3s and connect it to the database insecurely.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='http://hostname:2379' --cluster-secret='mysecret'
```

{{% /tab %}}
{{% /tabs %}}

Ensure that both of the nodes are in a Ready state such as with `k3s kubectl get nodes`

### Join Worker Nodes
Following the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) page, provision one or more machines to fill the role of the worker node(s).

Run the following command to join a worker node to the server nodes. We are leveraging the cluster-secret here. Since our server nodes were set up to use this, so too must any agent nodes.

```
curl -sfL https://get.k3s.io | K3S_URL=https://<server_node>:6443 K3S_CLUSTER_SECRET='mysecret' sh -
```

Provide the IP or DNS in place of `<server_node>`. This can be any one server node. k3s automatically handles load balancing the server nodes.

Note: You may want to provide the cluster-secret temporarily via a file or environment variable then destroy it or clear your bash history so the password is no longer exposed in plain text on the machine.

