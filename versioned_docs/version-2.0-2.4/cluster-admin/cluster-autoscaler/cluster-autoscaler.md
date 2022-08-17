---
title: Cluster Autoscaler
weight: 1
---

In this section, you'll learn how to install and use the [Kubernetes cluster-autoscaler](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/) on Rancher custom clusters using AWS EC2 Auto Scaling Groups.

The cluster autoscaler is a tool that automatically adjusts the size of the Kubernetes cluster when one of the following conditions is true:

* There are pods that failed to run in the cluster due to insufficient resources.
* There are nodes in the cluster that have been underutilized for an extended period of time and their pods can be placed on other existing nodes.

To prevent your pod from being evicted, set a `priorityClassName: system-cluster-critical` property on your pod spec.

Cluster Autoscaler is designed to run on Kubernetes master nodes. It can run in the `kube-system` namespace. Cluster Autoscaler doesn't scale down nodes with non-mirrored `kube-system` pods running on them.

It's possible to run a customized deployment of Cluster Autoscaler on worker nodes, but extra care needs to be taken to ensure that Cluster Autoscaler remains up and running.

# Cloud Providers

Cluster Autoscaler provides support to distinct cloud providers. For more information, go to [cluster-autoscaler supported cloud providers.](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#deployment)

### Setting up Cluster Autoscaler on Amazon Cloud Provider

For details on running the cluster autoscaler  on Amazon cloud provider, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/cluster-autoscaler/amazon)
