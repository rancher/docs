---
title: "Installations Prior to v1.0.0"
weight: 50
---

>**Note:** Running k3s v1.0.0 or newer is recommended as it has official support for PostgreSQL, MySQL, and etcd. v0.10.0 introduced support for PostgreSQL 10.7 and 11.5 only. Older versions did not have any official support for any external databases. 

>In v1.0.0 the method for adding server nodes is easier. If you are running a version of k3s older than v1.0.0 use these instructions for adding additional servers. Otherwise, the process is unchanged such as for joining workers (agents) to the cluster.

First, create your initial server, for example:

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='value_here' --cluster-secret='mysecret' --bootstrap-save
```

Then, add additional servers:

```
curl -fL https://get.k3s.io | sh -s - server --storage-endpoint='value_here'
```

Substitute the value for `--storage-endpoint` with different strings for PostgreSQL, MySQL, or etcd accordingly. Below are examples of the `--storage-endpoint` flag for each type of database:

### PostgreSQL

```
--storage-endpoint='postgres://username:password@hostname:5432/dbname'
```

### MySQL

```
--storage-endpoint='mysql://username:password@tcp(hostname:3306)/dbname''
```

### etcd

```
--storage-endpoint='https://etcd_hostname:2379'
```
