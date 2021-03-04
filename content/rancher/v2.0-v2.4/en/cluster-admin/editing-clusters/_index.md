---
title: Cluster Configuration
weight: 2025
---

After you provision a Kubernetes cluster using Rancher, you can still edit options and settings for the cluster.

For information on editing cluster membership, go to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/cluster-access/cluster-members)

- [Cluster Management Capabilities by Cluster Type](#cluster-management-capabilities-by-cluster-type)
- [Editing Clusters in the Rancher UI](#editing-clusters-in-the-rancher-ui)
- [Editing Clusters with YAML](#editing-clusters-with-yaml)
- [Updating ingress-nginx](#updating-ingress-nginx)

### Cluster Management Capabilities by Cluster Type

The options and settings available for an existing cluster change based on the method that you used to provision it. For example, only clusters [provisioned by RKE]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) have **Cluster Options** available for editing.

The following table summarizes the options and settings available for each cluster type:

{{% include file="/rancher/v2.0-v2.4/en/cluster-provisioning/cluster-capabilities-table" %}}

### Editing Clusters in the Rancher UI

To edit your cluster, open the **Global** view, make sure the **Clusters** tab is selected, and then select **&#8942; > Edit** for the cluster that you want to edit.

In [clusters launched by RKE]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/), you can edit any of the remaining options that follow.

Note that these options are not available for imported clusters or hosted Kubernetes clusters.

Option | Description |
---------|----------|
 Kubernetes Version | The version of Kubernetes installed on each cluster node. For more detail, see [Upgrading Kubernetes]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/upgrading-kubernetes). |
 Network Provider | The \container networking interface (CNI) that powers networking for your cluster.<br/><br/>**Note:** You can only choose this option while provisioning your cluster. It cannot be edited later. |
 Project Network Isolation | As of Rancher v2.0.7, if you're using the Canal network provider, you can choose whether to enable or disable inter-project communication. |
 Nginx Ingress | If you want to publish your applications in a high-availability configuration, and you're hosting your nodes with a cloud-provider that doesn't have a native load-balancing feature, enable this option to use Nginx ingress within the cluster. |
 Metrics Server Monitoring | Each cloud provider capable of launching a cluster using RKE can collect metrics and monitor for your cluster nodes. Enable this option to view your node metrics from your cloud provider's portal. |
 Pod Security Policy Support | Enables [pod security policies]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/pod-security-policies/) for the cluster. After enabling this option, choose a policy using the **Default Pod Security Policy** drop-down. |
 Docker version on nodes | Configures whether nodes are allowed to run versions of Docker that Rancher doesn't officially support. If you choose to require a [supported Docker version]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/rke-add-on/layer-7-lb/), Rancher will stop pods from running on nodes that don't have a supported Docker version installed. |
 Docker Root Directory | The directory on your cluster nodes where you've installed Docker. If you install Docker on your nodes to a non-default directory, update this path. |
 Default Pod Security Policy | If you enable **Pod Security Policy Support**, use this drop-down to choose the pod security policy that's applied to the cluster. |
 Cloud Provider | If you're using a cloud provider to host cluster nodes launched by RKE, enable [this option]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options/cloud-providers/) so that you can use the cloud provider's native features. If you want to store persistent data for your cloud-hosted cluster, this option is required.  |

### Editing Clusters with YAML

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the options available in an RKE installation, except for system_images configuration, by specifying them in YAML.

- To edit an RKE config file directly from the Rancher UI, click **Edit as YAML**.
- To read from an existing RKE file, click **Read from File**.

![image]({{<baseurl>}}/img/rancher/cluster-options-yaml.png)

For an example of RKE config file syntax, see the [RKE documentation]({{<baseurl>}}/rke/latest/en/example-yamls/).

For the complete reference of configurable options for RKE Kubernetes clusters in YAML, see the [RKE documentation.]({{<baseurl>}}/rke/latest/en/config-options/)

In Rancher v2.0.0-v2.2.x, the config file is identical to the  [cluster config file for the Rancher Kubernetes Engine]({{<baseurl>}}/rke/latest/en/config-options/), which is the tool Rancher uses to provision clusters. In Rancher v2.3.0, the RKE information is still included in the config file, but it is separated from other options, so that the RKE cluster config options are nested under the `rancher_kubernetes_engine_config` directive. For more information, see the [cluster configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options)

>**Note:** In Rancher v2.0.5 and v2.0.6, the names of services in the Config File (YAML) should contain underscores only: `kube_api` and `kube_controller`.




### Updating ingress-nginx

Clusters that were created before Kubernetes 1.16 will have an `ingress-nginx` `updateStrategy` of `OnDelete`. Clusters that were created with Kubernetes 1.16 or newer will have `RollingUpdate`.

If the `updateStrategy` of `ingress-nginx` is `OnDelete`, you will need to delete these pods to get the correct version for your deployment.