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
Using Rancher, you can create pools of nodes based on a [node template]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This node template defines the parameters you want to use to launch nodes in your cloud providers. The available cloud providers to create a node template are decided based on active [node drivers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-drivers). The benefit of using a node hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher will automatically create another node to join the cluster to ensure that the count of the node pool is as expected.

### Cloud Credentials
As of Rancher v2.2.0, [cloud credentials]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#cloud-credentials) are created to store credentials for launching nodes in your infrastructure providers. There are two benefits of using a cloud credential:

- Credentials are stored as a Kubernetes secret, which is not only more secure, but it also allows you to edit a node template without having to enter your credentials every time.
- Multiple node templates can share the same cloud credential to create node pools. If your key is compromised or expired, the cloud credential can be updated in a single place, which allows all node templates that are using it to be updated at once. 

# Launching Clusters on Custom Nodes
This option is for use cases where you want to provision bare-metal servers, on-premise virtual machines, or bring virtual machines that already exist in a cloud provider. With this option, you will run a Rancher agent Docker container on the machine.

>**Note:** If you want to reuse a node from a previous custom cluster, [clean the node]({{< baseurl >}}/rancher/v2.x/en/admin-settings/removing-rancher/rancher-cluster-nodes/) before using it in a cluster again. If you reuse a node that hasn't been cleaned, cluster provisioning may fail.

# Cluster Templates

_Available as of Rancher v2.3.0_

You can use cluster templates to provision Rancher-launched clusters hosted by an infrastructure provider.

Figuring out the right settings to create a cluster can take a lot of effort and time, and applying the same settings to multiple clusters can also be painful and error-prone. For such cases, it is useful to create a cluster template to define all the cluster settings in one place and use that template to create clusters.

While creating a cluster, all settings defined in the cluster template are applied and locked in, unless the template settings are marked as Questions. After you create a cluster from a template, the template-defined settings cannot be modified unless you [update the cluster to a newer version]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/#updating-a-cluster-created-with-a-cluster-template) of the same template.

Global Admins can also use template enforcement to require new clusters to use a template.

For details on how to managing templates and launching clusters from templates, refer to the [cluster template documentation]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates).

<br/>

# Requirements

If you use RKE to set up a cluster, your cluster nodes must meet our [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).
