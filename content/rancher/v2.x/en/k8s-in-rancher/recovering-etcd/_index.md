---
title: Recovering etcd
weight: 300
---

> **Note:** Recovering etcd is only applicable to [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/)

If the etcd cluster loses quorum (see [Count of etcd Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/production/#count-of-etcd-nodes)), the Kubernetes cluster will report a failure in Rancher because no operations can be executed in the Kubernetes cluster (operations like deploying workloads or scaling workloads). If you want to recover your etcd cluster, you can follow the steps below.

1- Remove all other etcd nodes and leave only one etcd node in the cluster.

2- On the single remaining etcd node, run the following command:

```
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock assaflavie/runlike etcd
```

This command will get the running command for etcd, you should save this command for later.

3- Now we need to stop the etcd container and rename it to `etcd-old`:

```
$ docker stop etcd
$ docker rename etcd etcd-old
```

4- Use the command retrieved in step 2 and make the following changes in the command:

- If you originally had more than 1 etcd node, then you need to change `--initial-cluster` to contain only this node.
- Add `--force-new-cluster` to the end of the command.

5- Run the command after the changes in step 4.

6- It is recommended to add new nodes with the etcd role. If you are using a custom cluster and you want to reuse the old node, it is essential to clean the nodes first before adding them back. See [Node Cleanup]({{< baseurl >}}/rancher/v2.x/en/faq/cleaning-cluster-nodes/) for the procedure.
