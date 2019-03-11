---
title: Restoring Downstream Kubernetes Cluster
weight: 370
aliases:
  - /rancher/v2.x/en/installation/after-installation/restoring-downstream-cluster/
---

Before version 2.2.x Rancher doesn't support backup and restoration of etcd snapshots, to be able to restore etcd cluster on a downstream kubenretes cluster you can run the following procedure:

1- If etcd lose quorum then the Kubernetes cluster will report a failure in Rancher, the first thing to do is to remove all other etcd nodes and leave only one etcd node in the cluster.

2- On the remaining node, run the following:

```
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock assaflavie/runlike etcd
```

This command will get the running command for etcd, you should save this command for later.

3- Now we need to stop and rename the old etcd:

```
$ docker stop etcd
$ docker rename etcd etcd-old
```

4- Now we need to make two changes to the running command from step 2:

- If you originally had more than 1 etcd node, then you need to change `--initial-cluster` to contain only this node.
- Add `--force-new-cluster` to the end of the command.

5- Run the command after the changes in step 3.

6- Its recommended to add new nodes, if you are using a custom cluster and you will re-add the old node its essential to clean the nodes first before adding them back, See [Node Cleanup](https://rancher.com/docs/rancher/v2.x/en/faq/cleaning-cluster-nodes/) for the procedure.
