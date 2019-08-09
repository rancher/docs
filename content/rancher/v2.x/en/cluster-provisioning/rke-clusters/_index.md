---
title: Rancher Launched Kubernetes
weight: 2200
---

If you don't want to use a hosted Kubernetes provider, you can have Rancher launch a Kubernetes cluster using any nodes you want. When Rancher deploys Kubernetes onto these nodes, it uses [Rancher Kubernetes Engine]({{< baseurl >}}/rke/latest/en/) (RKE), which is Rancher's own lightweight Kubernetes installer. It can launch Kubernetes on any computers, including:

- Bare-metal servers
- On-premise virtual machines
- Virtual machines hosted by an infrastructure provider

RKE launched clusters are separated into two categories: [Nodes Hosted by an Infrastructure Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/), and [custom nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/).

# Launching Clusters on Nodes Hosted by an Infrastructure Provider

When you launch clusters with Rancher on an infrastructure provider, Rancher can use node pools, node templates, and cloud credentials to manage nodes.

### Node Pools and Templates
<<<<<<< HEAD
Using Rancher, you can create pools of nodes based on a [node template]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This node template defines the parameters you want to use to launch nodes in your cloud providers. The available cloud providers to create a node template are decided based on active [node drivers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-drivers). The benefit of using a node pool is that if you delete an unhealthy node from the cluster, a new node will be created to keep the cluster count active.

By default, if you have a pool of nodes, but one loses connectivity and goes inactive, rancher does not automatically spin up a new node until the inactive node is deleted from Rancher. As of Rancher v2.3, you can configure a node pool so that a node is deleted and replaced if it becomes inactive for a specified number of minutes.

### Cloud Credentials
As of Rancher v2.2.0, [cloud credentials]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#cloud-credentials) are created to store credentials for launching nodes in your infrastructure providers. There are two benefits of using a cloud credential:

- Credentials are stored as a Kubernetes secret, which is not only more secure, but it also allows you to edit a node template without having to enter your credentials every time.
- Multiple node templates can share the same cloud credential to create node pools. If your key is compromised or expired, the cloud credential can be updated in a single place, which allows all node templates that are using it to be updated at once. 

# Launching Clusters on Custom Nodes
=======
Using Rancher, you can create pools of nodes based on a [node template]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This node template defines the parameters you want to use to launch nodes in your cloud providers. The available cloud providers to create a node template are decided based on active [node drivers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-drivers). The benefit of using a node hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher will automatically create another node to join the cluster to ensure that the count of the node pool is as expected.

### Cloud Credentials
As of Rancher v2.2.0, [cloud credentials]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#cloud-credentials) are created to store credentials for launching nodes in your infrastructure providers. There are two benefits of using a cloud credential:

- Credentials are stored as a Kubernetes secret, which is not only more secure, but it also allows you to edit a node template without having to enter your credentials every time.
- Multiple node templates can share the same cloud credential to create node pools. If your key is compromised or expired, the cloud credential can be updated in a single place, which allows all node templates that are using it to be updated at once. 

# Launching Clusters on Custom Nodes

>>>>>>> Mention template clusters in cluster provisioning section
This option is for use cases where you want to provision bare-metal servers, on-premise virtual machines, or bring virtual machines that already exist in a cloud provider. With this option, you will run a Rancher agent Docker container on the machine.

>**Note:** If you want to reuse a node from a previous custom cluster, [clean the node]({{< baseurl >}}/rancher/v2.x/en/admin-settings/removing-rancher/rancher-cluster-nodes/) before using it in a cluster again. If you reuse a node that hasn't been cleaned, cluster provisioning may fail.

# Cluster Templates
<<<<<<< HEAD

_Available as of Rancher v2.3.0_

<<<<<<< HEAD
Cluster templates can be used to provision custom clusters or clusters that are launched by a infrastructure provider.

With cluster templates, admins could enforce users to *always* use cluster templates when creating cluster. This allows admins to guarantee that clusters in Rancher are created with specific settings. They would be able to control which specific options can be altered during cluster creation. Since cluster templates are specifically shared with users, admins can not only control which cluster options could be changed but they could also create different cluster templates for different sets of users.

When using a cluster template for cluster creation, the settings of the cluster are already defined. Most of these options will be locked by the cluster template creator, but there could be some cluster options that can be changed. These options will be made available in the UI to change if the cluster template creator had enabled them to be selected. 

When using a cluster template for cluster creation, you can no longer directly edit your cluster options. The only way to edit these options is to upgrade to a [new revision of the cluster template]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/#updating-a-cluster-created-with-a-cluster-template).
=======
You can use cluster templates to provision Rancher-launched clusters hosted by an infrastructure provider.

Figuring out the right settings to create a cluster can take a lot of effort and time, and applying the same settings to multiple clusters can also be painful and error-prone. For such cases, it is useful to create a cluster template to define all the cluster settings in one place and use that template to create clusters.

While creating a cluster, all settings defined in the cluster template are applied and locked in, unless the template settings are marked as Questions. After you create a cluster from a template, the template-defined settings cannot be modified unless you [update the cluster to a newer version]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/#updating-a-cluster-created-with-a-cluster-template) of the same template.

Global Admins can also use template enforcement to require new clusters to use a template.
>>>>>>> Edit cluster template docs

For details on how to managing templates and launching clusters from templates, refer to the [cluster template documentation]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates).
=======
As of Rancher v2.3.0, you can provision a cluster from a cluster template. If an admin enforces a cluster template, you may need to use a template that is available to you, and configure only the options that are `Questions` in the template. For details, refer to the [cluster template documentation]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates).
>>>>>>> Mention template clusters in cluster provisioning section

<br/>

# Requirements

If you use RKE to set up a cluster, your cluster nodes must meet our [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).
