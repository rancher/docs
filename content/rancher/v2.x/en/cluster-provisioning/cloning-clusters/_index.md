---
title: Duplicating Clusters
weight: 2400
---

If you have a cluster in Rancher that you want to use as a template for creating similar clusters, you can use Rancher CLI to duplicate the cluster's configuration, edit it, and then use it to quickly launch the duplicate cluster.

## Caveats

Only [cluster types]({{< baseurl >}}/content/rancher/v2.x/en/cluster-provisioning) that interact with cloud hosts over API can be duplicated. Duplication of imported clusters and custom clusters provisioned using Docker machine is not supported.

<figcaption>Compatible Cluster Types</figcaption>

| Cluster Type                     | Cloneable?    |
| -------------------------------- | ------------- |
| [Hosted Kubernetes Providers][1] | ✓             |
| [Nodes Hosted by IaaS][2]        | ✓             |
| [Custom Cluster][3]              |               |
| [Imported Cluster][4]            |               |


[1]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/
[2]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/
[3]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/
[4]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/

## Prerequisites

Download and install [Rancher CLI]({{< baseurl >}}/rancher/v2.x/en/cli). Remember to [create an API bearer token]({{< baseurl >}}/rancher/v2.x/en/user-settings/api-keys) if necessary.


## 1. Export Cluster Config

1. Open Terminal and change your directory to the location of the Rancher CLI binary, `rancher`.

1. Enter the following command to list the clusters managed by Rancher.


        ./rancher cluster ls


1. Find the cluster that you want to clone, and copy either its resource `ID` or `NAME` to your clipboard. From this point on, we'll refer to the resource `ID` or `NAME` as `<RESOURCE_ID>`, which is used as a placeholder in the next step.

1. Enter the following command to export the configuration for your cluster.


        ./rancher clusters export <RESOURCE_ID>


    **Step Result:** The YAML for a duplicate cluster prints to Terminal.

1. Copy the YAML to your clipboard and paste it in a new file. Save the file as `cluster-template.yml` (or any other name, as long as it has a `.yml` extension).

## 2. Modify Cluster Config

Use your favorite text editor to modify the cluster configuration in `cluster-template.yml` for your duplicate cluster.

1. Open `cluster-template.yml` (or whatever you named your config) in your favorite test editor.

1. Change the name of your cluster (`<CLUSTER_NAME>`). If your cloned configuration has the same cluster name as its source, the cluster will not provision.

    ```yml    
    Version: v3
    clusters:
        <CLUSTER_NAME>: # CHANGE THIS NAME
        amazonElasticContainerServiceConfig:
            accessKey: 00000000000000000000
            associateWorkerNodePublicIp: true
            instanceType: t2.medium
            maximumNodes: 3
            minimumNodes: 1
            region: us-west-2
            secretKey: 0000000000000000000000000000000000000000
        dockerRootDir: /var/lib/docker
        enableNetworkPolicy: false
    ```

1. Edit any other configuration values to customize the cloned cluster. Save the configuration when you're done.

    For information on how to make these edits, see the official [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/).

## 3. Launch Duplicate Cluster

Move `cluster-template.yml` into the same directory as the Rancher CLI binary. Then run this command:

    ./rancher up --file cluster-template.yml

**Result:** Your duplicate cluster begins provisioning. Enter `./rancher cluster ls` to confirm. You can also log into the Rancher UI and open the **Global** view to watch your provisioning cluster's progress.