---
title: Provisioning Drivers
weight: 1140
---

Drivers in Rancher allow you to manage which providers can be used to deploy [hosted Kubernetes clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/) or [nodes in an infrastructure provider]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/) to allow Rancher to deploy and manage Kubernetes.

###  Rancher Drivers

With Rancher drivers, you can enable/disable existing built-in drivers that are packaged in Rancher. Alternatively, you can add your own driver if Rancher has not yet implemented it.

There are two types of drivers within Rancher:

* [Cluster Drivers](#cluster-drivers)
* [Node Drivers](#node-drivers)

### Cluster Drivers   

Cluster drivers are used to provision [hosted Kubernetes clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/), such as GKE, EKS, AKS, etc.. The availability of which cluster driver to display when creating a cluster is defined based on the cluster driver's status. Only `active` cluster drivers will be displayed as an option for creating clusters for hosted Kubernetes clusters. By default, Rancher is packaged with several existing cluster drivers, but you can also create custom cluster drivers to add to Rancher.

By default, Rancher has activated several hosted Kubernetes cloud providers including:

*  [Amazon EKS]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/eks/)
*  [Google GKE]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/gke/)
*  [Azure AKS]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/aks/)

There are several other hosted Kubernetes cloud providers that are disabled by default, but are packaged in Rancher:

* [Alibaba ACK]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/ack/)
* [Huawei CCE]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/cce/)
* [Tencent]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/tke/)

### Node Drivers

Node drivers are used to provision hosts, which Rancher uses to launch and manage Kubernetes clusters. A node driver is the same as a [Docker Machine driver](https://docs.docker.com/machine/drivers/). The availability of which node driver to display when creating node templates is defined based on the node driver's status. Only `active` node drivers will be displayed as an option for creating node templates. By default, Rancher is packaged with many existing Docker Machine drivers, but you can also create custom node drivers to add to Rancher.

If there are specific node drivers that you don't want to show to your users, you would need to de-activate these node drivers.

Rancher supports several major cloud providers, but by default, these node drivers are active and available for deployment:

*   [Amazon EC2]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/ec2/)
*   [Azure]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/azure/)
*   [Digital Ocean]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/digital-ocean/)
*   [vSphere]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere/)
