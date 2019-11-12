---
title: "High Availability (HA) Install (Experimental)"
weight: 30
---

>**Important:** High-Availability (HA) was introduced in the v0.10.0 release of k3s and is _experimental_. Our v1.0 release plans to support HA in production environments. HA should currently only be used for testing purposes in non-production environments.
>**Note:** k3s does not utilize etcd by default so only a 2-node cluster is needed for HA at a minimum. The following will guide you through setting up a 2-node cluster with PostgreSQL. You could optionally add one or more nodes for additional redundancy. In the future we plan to add support for additional database providers.

For production environments that cannot tolerate down time, we recommend installing k3s in a high-availability configuration so that you can always access your cluster. This procedure walks you through setting up a 2-node cluster with k3s with an external PostgreSQL database. As of v0.10.0 release (Experimental HA) we are supporting PostgreSQL 10.7 and 11.5

# Recommended Architecture
![k3s HA]({{< baseurl >}}/img/k3s/k3s-production-setup-v4.svg)
This image depicts a k3s HA install with two load balancers:

* A load balancer to expose workloads to external traffic
* A load balancer to expose the Kubernetes API for clients such as kubectl and to expose a stable k3s worker registration endpoint

The external database shown should be a single endpoint k3s can access. The worker registration / kubernetes API load balancer is needed if the master nodepool will be auto scaling and thus master nodes are ephemeral. Port 6443 is used for worker (agent) node registration and the Kubernetes API.

Installation Outline
--------------------
1. Create backend database (PostgreSQL)
2. Create master nodes
3. Join worker nodes

### Create Database for Cluster Datastore
The first step for setting up High Availability (HA) is to create the database for the backend (cluster datastore). As of v0.10.0 release (Experimental HA) we are currently supporting PostgreSQL 10.7-R1 thru 11.5-R1.

### Create Master Nodes
Following the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) page, provision at least two machines.

On the first machine, run the following command to install k3s and connect it to the database.

>**Note:** You may wish to taint the master nodes. They will run the kubelet by default and be scheduleable. You can only add node labels and taints during the install process. If you wish to do this, use the `--node-taint` flag. For example `--node-taint key1=value1:NoExecute` the following examples do not include this flag.

>If your master node pool will be auto-scaling, we recommend using the `--cluster-secret` flag instead of the default node-token. For example, this will make it easier to write user-data. The following examples include this optional flag.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='postgres://username:password@hostname:5432/dbname' --cluster-secret='mysecret' --bootstrap-save
```
Note: You may want to provide the database password and cluster-secret temporarily via a file or environment variable then destroy it or clear your bash history so the password is no longer exposed in plain text on the machine. The cluster-secret can contain any Unicode, although you should avoid single and double quotes and make sure the contents are terminal-friendly.

On the second machine, run the following command. Since we ran the first node with the `--bootstrap-save` flag the second and any additional machines will now automatically bootstrap HA.

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='postgres://username:password@hostname:5432/dbname'
```

Ensure that both of the nodes are in a Ready state such as with `k3s kubectl get nodes`

### Join Worker Nodes
Following the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) page, provision one or more machines to fill the role of the worker node(s).

Run the following command to join a worker node to the master nodes. We are leveraging the cluster-secret here. Since our master nodes were set up to use this, so too must any agent nodes.

```
curl -sfL https://get.k3s.io | K3S_URL=https:/<master_node>:6443 K3S_CLUSTER_SECRET='mysecret' sh -
```

Provide the IP or DNS in place of `<master_node>` this can be any one master node. k3s automatically handles load balancing the master nodes.

Note: You may want to provide the cluster-secret temporarily via a file or environment variable then destroy it or clear your bash history so the password is no longer exposed in plain text on the machine.

# Cluster Datastore Options

>**Note:** As of v0.10.0 release (Experimental HA) we are currently supporting PostgreSQL 10.7-R1 thru 11.5-R1.

k3s can support various storage backends including: SQLite (default), MySQL, Postgres, and etcd, this enhancement depends on the following arguments that can be passed to k3s server:

* `--storage-endpoint` _value_

    Specify etcd, Mysql, Postgres, or Sqlite (default) data source name [$`K3S_STORAGE_ENDPOINT`]

* `--storage-cafile` _value_

    SSL Certificate Authority file used to secure storage backend communication [$`K3S_STORAGE_CAFILE`]

* `--storage-certfile` _value_

    SSL certification file used to secure storage backend communication [$`K3S_STORAGE_CERTFILE`]

* `--storage-keyfile` _value_

    SSL key file used to secure storage backend communication [$`K3S_STORAGE_KEYFILE`]

### MySQL

To use k3s with MySQL storage backend, you can specify the following for insecure connection:

```
     --storage-endpoint="mysql://"
```
By default the server will attempt to connect to mysql using the mysql socket at `/var/run/mysqld/mysqld.sock` using the root user and with no password, k3s will also create a database with the name `kubernetes` if the database is not specified in the DSN.

To override the method of connection, user/pass, and database name, you can provide a custom DSN, for example:

```
     --storage-endpoint="mysql://k3suser:k3spass@tcp(192.168.1.100:3306)/k3stest"
```

This command will attempt to connect to MySQL on host `192.168.1.100` on port `3306` with username `k3suser` and password `k3spass` and k3s will automatically create a new database with the name `k3stest` if it doesn't exist, for more information about the MySQL driver data source name, please refer to https://github.com/go-sql-driver/mysql#dsn-data-source-name

To connect to MySQL securely, you can use the following example:
```
     --storage-endpoint="mysql://k3suser:k3spass@tcp(192.168.1.100:3306)/k3stest" \
     --storage-cafile ca.crt \
     --storage-certfile mysql.crt \
     --storage-keyfile mysql.key
```
The above command will use these certificates to generate the tls config to communicate with mysql securely.


### Postgres

Connection to postgres can be established using the following command:

```
     --storage-endpoint="postgres://"
```

By default the server will attempt to connect to postgres on localhost with using the `postgres` user and with `postgres` password, k3s will also create a database with the name `kubernetes` if the database is not specified in the DSN.

To override the method of connection, user/pass, and database name, you can provide a custom DSN, for example:

```
     --storage-endpoint="postgres://k3suser:k3spass@192.168.1.100:5432/k3stest"
```

This command will attempt to connect to Postgres on host `192.168.1.100` on port `5432` with username `k3suser` and password `k3spass` and k3s will automatically create a new database with the name `k3stest` if it doesn't exist, for more information about the Postgres driver data source name, please refer to https://godoc.org/github.com/lib/pq

To connect to Postgres securely, you can use the following example:

```
     --storage-endpoint="postgres://k3suser:k3spass@192.168.1.100:5432/k3stest" \
     --storage-certfile postgres.crt \
     --storage-keyfile postgres.key \
     --storage-cafile ca.crt
```

The above command will use these certificates to generate the tls config to communicate with postgres securely.

### etcd

Connection to etcd3 can be established using the following command:

```
     --storage-endpoint="https://127.0.0.1:2379"
```
The above command will attempt to connect insecurely to etcd on localhost with port `2379`, you can connect securely to etcd using the following command:

```
     --storage-endpoint="https://127.0.0.1:2379" \
     --storage-cafile ca.crt \
     --storage-certfile etcd.crt \
     --storage-keyfile etcd.key
```

The above command will use these certificates to generate the tls config to communicate with etcd securely.

