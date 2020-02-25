---
title: Troubleshooting vSphere Clusters
weight: 4
---

If you are experiencing issues while provisioning a cluster with enabled vSphere Cloud Provider or while creating vSphere volumes for your workloads, you should inspect the logs of the following K8s services:

- controller-manager (Manages volumes in vCenter)
- kubelet: (Mounts vSphere volumes to pods)

If your cluster is not configured with external [Cluster Logging]({{<baseurl>}}/rancher/v2.x//en/cluster-admin/tools//logging/), you will need to SSH into nodes to get the logs of the `kube-controller-manager` (running on one of the control plane nodes) and the `kubelet` (pertaining to the node where the stateful pod has been scheduled).

The easiest way to create a SSH session with a node is the Rancher CLI tool.

1. [Configure the Rancher CLI]({{<baseurl>}}/rancher/v2.x/en/cli/) for your cluster.
2. Run the following command to get a shell to the corresponding nodes:

    ```sh
$ rancher ssh <nodeName>
    ```

3. Inspect the logs of the controller-manager and kubelet containers looking for errors related to the vSphere cloud provider:

    ```sh
    $ docker logs --since 15m kube-controller-manager
    $ docker logs --since 15m kubelet
    ```
