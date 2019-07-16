---
title: Rancher Deployment Strategies
weight: 100
---

There are 2 recommended deployment strategies. Each one has its own pros and cons. Read more about which one would fit best for your use case:

* [Hub and Spoke](#hub-and-spoke)
* [Regional](#regional)

## Hub & Spoke
---

![Hub and Spoke Deployment]({{< baseurl >}}/img/rancher/bpg/hub-and-spoke.png)

In this deployment scenario, there is a single Rancher control plane managing Kubernetes clusters  across the globe. The control plane would be run in an HA configuration, and there would be impact due to latencies.

### Pros:

* Environments could have nodes and network connectivity across regions.
* Single control plane interface to view/see all regions and environments.
* Kubernetes does not require Rancher to operate and can tolerate loosing connectivity to the Rancher control plane.

### Cons:

* Subject to network latencies
* If control plane goes out global provisioning of new services is unavailable until restored. However each Kubernetes cluster can continue to be managed individually.

## Regional
---

![Regional Deployment]({{< baseurl >}}/img/rancher/bpg/regional.png)

In the regional deployment model a control plane is deployed in close proximity to the compute nodes.

### Pros:

* Rancher functionality in regions stay operational if a control plane in another region go down.
* Network latency is greatly reduced, improving the performance of functionality in Rancher
* Upgrades of Rancher control plane can be done independently per region

### Cons:

* Overhead of managing multiple Rancher installations.
* Visibility across global Kubernetes clusters requires multiple interfaces/panes of glass.
* Deploying multi-cluster apps in Rancher requires repeating the process for each Rancher server.
