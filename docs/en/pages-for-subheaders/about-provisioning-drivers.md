---
title: Provisioning Drivers
weight: 70
---

Drivers in Rancher allow you to manage which providers can be used to deploy [hosted Kubernetes clusters](set-up-clusters-from-hosted-kubernetes-providers.md) or [nodes in an infrastructure provider](use-new-nodes-in-an-infra-provider.md) to allow Rancher to deploy and manage Kubernetes.

###  Rancher Drivers

With Rancher drivers, you can enable/disable existing built-in drivers that are packaged in Rancher. Alternatively, you can add your own driver if Rancher has not yet implemented it.

There are two types of drivers within Rancher:

* [Cluster Drivers](#cluster-drivers)
* [Node Drivers](#node-drivers)

### Cluster Drivers   

Cluster drivers are used to provision [hosted Kubernetes clusters](set-up-clusters-from-hosted-kubernetes-providers.md), such as GKE, EKS, AKS, etc.. The availability of which cluster driver to display when creating a cluster is defined based on the cluster driver's status. Only `active` cluster drivers will be displayed as an option for creating clusters for hosted Kubernetes clusters. By default, Rancher is packaged with several existing cluster drivers, but you can also create custom cluster drivers to add to Rancher.

By default, Rancher has activated several hosted Kubernetes cloud providers including:

*  [Amazon EKS](amazon-eks-permissions.md)
*  [Google GKE](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/set-up-clusters-from-hosted-kubernetes-providers/gke.md)
*  [Azure AKS](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/set-up-clusters-from-hosted-kubernetes-providers/aks.md)

There are several other hosted Kubernetes cloud providers that are disabled by default, but are packaged in Rancher:

* [Alibaba ACK](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/set-up-clusters-from-hosted-kubernetes-providers/alibaba.md)
* [Huawei CCE](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/set-up-clusters-from-hosted-kubernetes-providers/huawei.md)
* [Tencent](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/set-up-clusters-from-hosted-kubernetes-providers/tencent.md)

### Node Drivers

Node drivers are used to provision hosts, which Rancher uses to launch and manage Kubernetes clusters. A node driver is the same as a [Docker Machine driver](https://docs.docker.com/machine/drivers/). The availability of which node driver to display when creating node templates is defined based on the node driver's status. Only `active` node drivers will be displayed as an option for creating node templates. By default, Rancher is packaged with many existing Docker Machine drivers, but you can also create custom node drivers to add to Rancher.

If there are specific node drivers that you don't want to show to your users, you would need to de-activate these node drivers.

Rancher supports several major cloud providers, but by default, these node drivers are active and available for deployment:

*   [Amazon EC2](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/launch-kubernetes-with-rancher/use-new-nodes-in-an-infra-provider/create-an-amazon-ec2-cluster.md)
*   [Azure](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/launch-kubernetes-with-rancher/use-new-nodes-in-an-infra-provider/create-an-azure-cluster.md)
*   [Digital Ocean](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/launch-kubernetes-with-rancher/use-new-nodes-in-an-infra-provider/create-a-digitalocean-cluster.md)
*   [vSphere](vsphere.md)

There are several other node drivers that are disabled by default, but are packaged in Rancher: 

*   [Harvester](../explanations/integrations-in-rancher/harvester.md#harvester-node-driver/), available in Rancher v2.6.1
