---
title: etcd Advanced Configurations
weight: 1
aliases:
---

## Tuning etcd for large installations ##

When running larger Rancher installations with 15 or more clusters it is recommended to increase the default keyspace for etcd from the default 2GB. The maximum setting is 8GB and the host should have enough RAM to keep the entire dataset in memory. When increasing this value you should also increase the size of the host. This value can also be adjusted in smaller installations if you have a large number of deployments across clusters every 5 minutes.

The etcd data set is automatically cleaned up on a five minute interval by Kubernetes. There are situations, e.g. deployment thrasing, where enough events could be written to etcd and deleted before garbage collection occurs and cleans things up causing the keyspace to fill up. If you see `mvcc: database space exceeded` errors, in the etcd logs or Kubernetes API server logs, you should consider increasing the keyspace size. This can be accomplished by setting the [quota-backend-bytes](https://etcd.io/docs/v3.3.12/op-guide/maintenance/#space-quota) setting on the etcd servers.

### Example: This snippet of the RKE cluster.yml file increases the keyspace size to 5GB ###

```yaml
# RKE cluster.yml
...
services:
  etcd:
    extra_args:
      quota-backend-bytes: 5368709120
...
```

## Scaling etcd disk performance ##

You can follow the recommendations from [the etcd docs](https://etcd.io/docs/v3.3.12/tuning/#disk) on how to tune the disk priority on the host.

Additionally, to reduce IO contention on the disks for etcd, you can use a dedicated device for the data and wal directory. Based on etcd best practices, mirroring RAID configurations are unnecessary because etcd replicates data between the nodes in the cluster. You can use stripping RAID configurations to increase available IOPS.

To implement this solution in an RKE cluster,  the `/var/lib/etcd/data` and `/var/lib/etc/wal` directories will need to have disks mounted and formated on the underlying host. Notice the additional `wal_dir` directory added to the extra_arg, without this the etcd process will try to manipulate the underlying `wal` mount without sufficient permissions.

```yaml
# RKE cluster.yml
...
services:
  etcd:
    extra_args:
      data-dir: "/var/lib/rancher/etcd/data/"
      wal-dir: "/var/lib/rancher/etcd/wal/wall_dir"
    extra_binds:
    - "/var/lib/etcd/data:/var/lib/rancher/etcd/data"
    - "/var/lib/etcd/wal:/var/lib/rancher/etcd/wal"
...
```