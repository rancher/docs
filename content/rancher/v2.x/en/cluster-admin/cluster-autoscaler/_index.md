---
title: Cluster autoscaler
weight: 1
---

This doc will guide you how to install and use [k8s cluster-autoscaler](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/) on Rancher custom clusters using AWS EC2 Auto Scaling Groups.

Cluster Autoscaler is a tool that automatically adjusts the size of the k8s cluster when one of the following conditions is true:

* there are pods that failed to run in the cluster due to insufficient resources,
* there are nodes in the cluster that have been underutilized for an extended period of time and their pods can be placed on other existing nodes.

Cluster Autoscaler is designed to run on k8s master nodes. It's possible to run a customized deployment of Cluster Autoscaler on worker nodes, but extra care needs to be taken to ensure that Cluster Autoscaler remains up and running. Users can put it into kube-system namespace (Cluster Autoscaler doesn't scale down node with non-mirrored kube-system pods running on them) and set a priorityClassName: system-cluster-critical property on your pod spec (to prevent your pod from being evicted).

Cluster Autoscaler is providing support to distinct cloud providers, more info at [cluster-autoscaler supported cloud providers](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler#deployment)

### Setting up the cluster autoscaler on Amazon Cloud Provider

For details on running the cluster autoscaler  on Amazon cloud provider, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/cluster-autoscaler/amazon)