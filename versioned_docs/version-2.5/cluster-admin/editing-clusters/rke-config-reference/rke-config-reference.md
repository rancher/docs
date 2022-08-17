---
title: RKE Cluster Configuration
weight: 1
---

In [clusters launched by RKE]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/), you can edit any of the remaining options that follow.

- [Configuration Options in the Rancher UI](#configuration-options-in-the-rancher-ui)
- [Editing Clusters with YAML](#editing-clusters-with-yaml)
- [Updating ingress-nginx](#updating-ingress-nginx)

# Configuration Options in the Rancher UI

To edit your cluster, open the **Global** view, make sure the **Clusters** tab is selected, and then select **&#8942; > Edit** for the cluster that you want to edit.

Some advanced configuration options are not exposed in the Rancher UI forms, but they can be enabled by editing the RKE cluster configuration file in YAML. For the complete reference of configurable options for RKE Kubernetes clusters in YAML, see the [RKE documentation.]({{<baseurl>}}/rke/latest/en/config-options/)

### Kubernetes Version 

The version of Kubernetes installed on each cluster node. For more detail, see [Upgrading Kubernetes]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/upgrading-kubernetes).

### Network Provider

The \container networking interface (CNI) that powers networking for your cluster.<br/><br/>**Note:** You can only choose this option while provisioning your cluster. It cannot be edited later.

### Project Network Isolation

If your network provider allows project network isolation, you can choose whether to enable or disable inter-project communication. 

Before Rancher v2.5.8, project network isolation is only available if you are using the Canal network plugin for RKE. 

In v2.5.8+, project network isolation is available if you are using any RKE network plugin that supports the enforcement of Kubernetes network policies, such as Canal or the Cisco ACI plugin.

### Nginx Ingress

If you want to publish your applications in a high-availability configuration, and you're hosting your nodes with a cloud-provider that doesn't have a native load-balancing feature, enable this option to use Nginx ingress within the cluster.

### Metrics Server Monitoring 

Each cloud provider capable of launching a cluster using RKE can collect metrics and monitor for your cluster nodes. Enable this option to view your node metrics from your cloud provider's portal.

### Pod Security Policy Support

Enables [pod security policies]({{<baseurl>}}/rancher/v2.5/en/admin-settings/pod-security-policies/) for the cluster. After enabling this option, choose a policy using the **Default Pod Security Policy** drop-down.

### Docker version on nodes

Configures whether nodes are allowed to run versions of Docker that Rancher doesn't officially support. If you choose to require a supported Docker version, Rancher will stop pods from running on nodes that don't have a supported Docker version installed.

### Docker Root Directory

The directory on your cluster nodes where you've installed Docker. If you install Docker on your nodes to a non-default directory, update this path.

### Default Pod Security Policy

If you enable **Pod Security Policy Support**, use this drop-down to choose the pod security policy that's applied to the cluster.

### Cloud Provider

If you're using a cloud provider to host cluster nodes launched by RKE, enable [this option]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options/cloud-providers/) so that you can use the cloud provider's native features. If you want to store persistent data for your cloud-hosted cluster, this option is required.

# Editing Clusters with YAML

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the options available in an RKE installation, except for system_images configuration, by specifying them in YAML.

- To edit an RKE config file directly from the Rancher UI, click **Edit as YAML**.
- To read from an existing RKE file, click **Read from File**.

![image]({{<baseurl>}}/img/rancher/cluster-options-yaml.png)

For an example of RKE config file syntax, see the [RKE documentation]({{<baseurl>}}/rke/latest/en/example-yamls/).

For the complete reference of configurable options for RKE Kubernetes clusters in YAML, see the [RKE documentation.]({{<baseurl>}}/rke/latest/en/config-options/)

# Updating ingress-nginx

Clusters that were created before Kubernetes 1.16 will have an `ingress-nginx` `updateStrategy` of `OnDelete`. Clusters that were created with Kubernetes 1.16 or newer will have `RollingUpdate`.

If the `updateStrategy` of `ingress-nginx` is `OnDelete`, you will need to delete these pods to get the correct version for your deployment.