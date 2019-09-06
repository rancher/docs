---
title: Rancher Launched Kubernetes
weight: 2200
---

If you don't want to use a hosted Kubernetes provider, you can have Rancher launch a Kubernetes cluster using any nodes you want. When Rancher deploys Kubernetes onto these nodes, it uses [Rancher Kubernetes Engine]({{< baseurl >}}/rke/latest/en/) (RKE), which is Rancher's own lightweight Kubernetes installer. It can launch Kubernetes on any computers, including:

- Bare-metal servers
- On-premise virtual machines
- Virtual machines hosted by an infrastructure provider

RKE launched clusters are separated into two categories:

- [Nodes Hosted by an Infrastructure Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/):

    Using Rancher, you can create pools of nodes based on a [node template]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This node template defines the parameters you want to use to launch nodes in your cloud providers. The available cloud providers to create a node template are decided based on active [node drivers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-drivers). The benefit of using a node hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher will automatically create another node to join the cluster to ensure that the count of the node pool is as expected.

    As of v2.2.0, [cloud credential]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#cloud-credentials) are created to store credentials for launching nodes in your infrastructure providers. There are two benefits of using a cloud credential:
    - Credentials are stored as a Kubernetes secret, which is not only more secure, but it also allows you to edit a node template without having to enter your credentials every time.
    - Multiple node templates can share the same cloud credential to create node pools. If your key is compromised or expired, the cloud credential can be updated in a single place, which allows all node templates that are using it to be updated at once. 

- [Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/):

    For use cases where you want to provision bare-metal servers, on-premise virtual machines, or bring virtual machines that already exist in a cloud provider. With this option, you will run a Rancher agent Docker container on the machine.

    >**Note:** If you want to reuse a node from a previous custom cluster, [clean the node]({{< baseurl >}}/rancher/v2.x/en/admin-settings/removing-rancher/rancher-cluster-nodes/) before using it in a cluster again. If you reuse a node that hasn't been cleaned, cluster provisioning may fail.

<br/>

### Requirements

If you use RKE to set up a cluster, your cluster nodes must meet our [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).
