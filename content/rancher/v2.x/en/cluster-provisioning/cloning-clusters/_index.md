---
title: Duplicating Clusters
weight: 2400
---

If you have a cluster in Rancher that you want to use as a template for creating similar clusters, you can use Rancher CLI to duplicate the cluster's configuration, edit it, and then use it to quickly launch the duplicate cluster.

## Caveats

- Only [cluster types]({{< baseurl >}}/content/rancher/v2.x/en/cluster-provisioning) that interact with cloud hosts over API can be duplicated. Duplication of imported clusters and custom clusters provisioned using Docker machine is not supported.

    
    | Cluster Type                     | Cloneable?    |
    | -------------------------------- | ------------- |
    | [Hosted Kubernetes Providers][1] | ✓             |
    | [Nodes Hosted by IaaS][2]        | ✓             |
    | [Custom Cluster][3]              |               |
    | [Imported Cluster][4]            |               |
    
- During the process of duplicating a cluster, you will edit a config file full of cluster settings. However, we recommend editing only values explicitly listed in this document, as cluster duplication is designed for simple cluster copying, _not_ wide scale configuration changes. Editing other values may invalidate the config file, which will lead to cluster deployment failure.

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

    >**Warning:** Only edit the cluster config values explicitly called out below. Many of the values listed in this file are used to provision your duplicate cluster, and editing their values may break the provisioning process. 


1. As depicted in one of the examples below, at the `<CLUSTER_NAME>` placeholder, replace your original cluster's name with a unique name (`<CLUSTER_NAME>`). If your cloned cluster has a duplicate name, the cluster will not provision successfully.
{{% accordion id="gke" label="GKE" %}}
```
Version: v3
clusters:
    <CLUSTER_NAME>: # ENTER UNIQUE NAME
    dockerRootDir: /var/lib/docker
    enableNetworkPolicy: false
    googleKubernetesEngineConfig:
      credential: |-
        {
          "type": "service_account",
          "project_id": "gke-cluster-221300",
          "private_key_id": "1d210afae352bc298bde1b3e680ec0c8b22cdd61"
```
{{% /accordion %}}
{{% accordion id="eks" label="EKS" %}}
```yml
Version: v3
clusters:
    <CLUSTER_NAME>: # ENTER UNIQUE NAME
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
{{% /accordion %}}
{{% accordion id="aks" label="AKS" %}}
```yml
Version: v3
clusters:
    <CLUSTER_NAME>: # ENTER UNIQUE NAME
    azureKubernetesServiceConfig:
      adminUsername: azureuser
      agentPoolName: rancher
      agentVmSize: Standard_D5_v2
      clientId: 00000000-0000-0000-0000-000000000000
      clientSecret: 00000000000000000000000000000000000000000000
      count: 3
      kubernetesVersion: 1.11.2
      location: westus
      osDiskSizeGb: 100
      resourceGroup: docker-machine
      sshPublicKeyContents: ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDJc2kDExgRaDLD
```
{{% /accordion %}}
{{% accordion id="ec2" label="IaaS Clusters (EC2, Azure, or DigitalOcean )" %}}
```yml
Version: v3
clusters:
    <CLUSTER_NAME>: # ENTER UNIQUE NAME
    dockerRootDir: /var/lib/docker
    enableNetworkPolicy: false
    rancherKubernetesEngineConfig:
      addonJobTimeout: 30
      authentication:
        strategy: x509
      authorization: {}
      bastionHost: {}
      cloudProvider: {}
      ignoreDockerVersion: true
```
{{% /accordion %}}

1. **IaaS Clusters Only:** For each `nodePools` section, replace the original nodepool name with a unique name at the `<NODEPOOL_NAME>` placeholder.  If your cloned cluster has a duplicate nodepool name, the cluster will not provision successfully.

    ```yml
    nodePools:
        <NODEPOOL_NAME>:
        clusterId: do
        controlPlane: true
        etcd: true
        hostnamePrefix: mark-do
        nodeTemplateId: do
        quantity: 1
        worker: true
    ```

1. When you're done, save and close the configuration.

## 3. Launch Duplicate Cluster

Move `cluster-template.yml` into the same directory as the Rancher CLI binary. Then run this command:

    ./rancher up --file cluster-template.yml

**Result:** Your duplicate cluster begins provisioning. Enter `./rancher cluster ls` to confirm. You can also log into the Rancher UI and open the **Global** view to watch your provisioning cluster's progress.