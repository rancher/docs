---
title: Recovering etcd
weight: 300
---

> **Note:** The ability to recovering etcd is only applicable to [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) clusters.

If the group of etcd nodes loses quorum, the Kubernetes cluster will report a failure because no operations, e.g. deploying workloads, can be executed in the Kubernetes cluster. Please review the best practices for the what the [number of etcd nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/production/#count-of-etcd-nodes) should be in a Kubernetes cluster. If you want to recover your set of etcd nodes, follow these instructions:

1. Keep only one etcd node in the cluster by removing all other etcd nodes.

2. On the single remaining etcd node, run the following command:

    ```
    $ docker run --rm -v /var/run/docker.sock:/var/run/docker.sock assaflavie/runlike etcd
    ```

    This command outputs the running command for etcd, save this command to use later.

3. Stop the etcd container that you launched in the previous step and rename it to `etcd-old`.

    ```
    $ docker stop etcd
    $ docker rename etcd etcd-old
    ```

4. Take the saved command from Step 2 and revise it:

    - If you originally had more than 1 etcd node, then you need to change `--initial-cluster` to only contain the node that remains.
    - Add `--force-new-cluster` to the end of the command.

5. Run the revised command.

6. After the single nodes is up and running, Rancher recommends adding additional etcd nodes to your cluster. If you have a [custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/) and you want to reuse an old node, you are required to [clean up the nodes]({{< baseurl >}}/rancher/v2.x/en/faq/cleaning-cluster-nodes/) before attempting to add them back into a cluster.  
