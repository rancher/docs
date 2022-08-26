---
title: System Tools
weight: 22
---

:::note

System Tools has been deprecated since June 2022.

:::
# Logs

Please use [logs-collector](https://github.com/rancherlabs/support-tools/tree/master/collection/rancher/v2.x/logs-collector) to collect logs from your cluster.

# Stats

If you want to replicate the stats command, you can run the following command on your cluster nodes:

:::note

This command below requires the package `sysstat` on the cluster node.

:::

```
/usr/bin/sar -u -r -F 1 1
```

# Remove

Please use the [Rancher Cleanup](https://github.com/rancher/rancher-cleanup) tool.
