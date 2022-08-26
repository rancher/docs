---
title: Windows Support
weight: 2
---


Prior to Rancher v2.5.6, the `agent` did not have native Windows manifests on downstream clusters with Windows nodes. This would result in a failing `agent` pod for the cluster.

If you are upgrading from an older version of Rancher to v2.5.6+, you can deploy a working `agent` with the following workflow *in the downstream cluster*:

1. Cordon all Windows nodes.
1. Apply the below toleration to the `agent` workload.
1. Uncordon all Windows nodes.
1. Delete all `agent` pods. New pods should be created with the new toleration.
1. Once the `agent` pods are running, and auto-update is enabled for Fleet, they should be updated to a Windows-compatible `agent` version.

```yaml
tolerations:
- effect: NoSchedule
  key: cattle.io/os
  operator: Equal
  value: linux
```