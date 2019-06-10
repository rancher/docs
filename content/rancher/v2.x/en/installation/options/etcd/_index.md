---
title: etcd Advanced Configurations
weight: 1
aliases:
---

## Tuning etcd for large installations ##

When running larger Rancher installations with 15 or more clusters it is recommended to increase the default key space from the default 2GB. The maximum setting is 8GB and the host should have enough RAM to keep the entire dataset in memory. When increasing this value you should also increase the size of the host. This value can also be adjusted in smaller installations if you have a large number of deployments across clusters every 5 minutes. If you run into 

The etcd data set is automatically cleaned up on a five minute interval by Kubernetes. In situations where a lot of events, like deployment thrashing, enough events could be written to etcd and deleted before garbage collection occurs and cleans things up. The risk of this happening can be minimized by increasing the quota-backend-bytes.

If you ever run into `mvcc: database space exceeded` errors, once you compact, defrag and disarm to recover you should consider increasing the keyspace to mitigate this issue.

**Example: This snippet of the RKE cluster.yml file increases the key space size to 5GB**
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

To reduce IO contention on the disks for etcd, you can split the data and WAL directories onto separate devices. To do so, you need to provision nodes with devices and format them before running etcd on them. Based on etcd best practices, mirroring array configurations are unnecessary because etcd replicates the data between the nodes. However, you can use stripping RAID configurations to increase the IOPS available to etcd. To configure dedicated arrays, you can configure this in the RKE cluster.yml file with the following snippet.

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

For the solution above to work, this requires `/var/lib/etcd/data` and `/var/lib/etcd/wal` to be mounted and formated on the underlying host. Note the addition of the 'wall_dir' directory in the extra_args section. Without this directory being defined, etcd tries to modify the root directory and without sufficient permissions.