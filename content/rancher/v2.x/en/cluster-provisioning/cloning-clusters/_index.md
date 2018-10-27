---
title: Duplicating Clusters
weight: 2400
---

If you have a cluster in Rancher that you want to use as a template for creating similar clusters, you can use Rancher CLI and RKE to export the cluster configuration, modify it to your liking, and then quickly launch the duplicate clusters using RKE.

## Caveats

Only [cluster types]({{< baseurl >}}/content/rancher/v2.x/en/cluster-provisioning) that interact with cloud hosts over API can be duplicated. Duplication of imported clusters and custom clusters provisioned using Docker machine is not supported.

<figcaption>Compatible Cluster Types</figcaption>

Cluster Type | Cloneable?
-------------|-------------
[Hosted Kubernetes Providers][1] | ✓
[Nodes Hosted by IaaS][2] | ✓
[Custom Cluster][3] |
[Imported Cluster][4] |


[1]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/
[2]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/
[3]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/
[4]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/

## Prerequisites

- Download and install [Rancher CLI]({{< baseurl >}}/rancher/v2.x/en/cli).
- Download and install [RKE]({{< baseurl >}}/rke/v0.1.x/en/installation/).


## A. Export Cluster Config

1. Open Terminal and change your directory to the location of the Rancher CLI binary, `rancher`.

1. Enter the following command to list the clusters managed by Rancher.

    ```
    ./rancher cluster ls
    ```

1. Find the cluster that you want to clone, and copy either its resource `ID` or `NAME` to your clipboard. From this point on, we'll refer to the resource `ID` or `NAME` as `<RESOURCE_ID>`, which is used as a placeholder in the next step.

1. Enter the following command to export the configuration for your cluster.

    ```
    ./rancher inspect --format yaml existing <RESOURCE_ID>
    ```


## B. Modify Cluster Config

## C. Launch Duplicate Cluster