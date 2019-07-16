---
title: Rancher Deployment Strategies
weight: 100
---

## Hub & Spoke
---
<img src="{{site.baseurl}}/src/img/bpg/hub-and-spoke.png" width="800" alt="Hub & Spoke deployment">

In this deployment scenario, there is a single Rancher control plane managing Kubernetes clusters  across the globe. The control plane would be run in an HA configuration, and there would be impact due to latencies.

### Pros:

* Environments could have nodes and network connectivity across regions.
* Single control plane interface to view/see all regions and environments.
* Kubernetes does not require Rancher to operate and can tolerate loosing connectivity to the Rancher control plane.

### Cons:

* Subject to network latencies
* If control plane goes out global provisioning of new services is unavailable until restored. However each Kubernetes cluster can continue to be managed indvidually.
