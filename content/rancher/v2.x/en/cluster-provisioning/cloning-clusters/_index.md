---
title: Duplicating Clusters
weight: 2400
---

If you have a cluster in Rancher that you want to use as a template for creating similar clusters, you can use Rancher CLI to duplicate the cluster's Compose file, edit it, and then use it to quickly launch the duplicate cluster.

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
    ./rancher inspect --format yaml <RESOURCE_ID>
    ```

    **Step Result:** The Docker Compose YAML for your cluster prints to Terminal.

1. Copy the YAML to your clipboard and paste it in a new file. Save the file as `cluster-template.yaml` (or any other name, as long as it has a `.yaml` extension).

## B. Modify Cluster Config

Use your favorite text editor to modify the configuration in `cluster-template.yaml` for your duplicate cluster. Save the configuration changes when you're done.

For information on how to make these edits, see the [Docker Compose](https://docs.docker.com/compose/) documentation.

## C. Launch Duplicate Cluster

Move `cluster-template.yaml` into the same directory as the Rancher CLI binary. Then run this command:


```
./rancher up --file rancher-cluster.yaml
```