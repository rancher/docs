---
title: Rancher Deployment Strategies
weight: 100
---

## Regional
---
<img src="{{site.baseurl}}/src/img/bpg/regional.png" width="800" alt="Regional deployment">

In the regional deployment model a control plane is deployed in close proximity to the compute nodes.

### Pros:

* Rancher functionality in regions stay operational if a control plane in another region go down.
* Network latency is greatly reduced, improving the performance of functionality in Rancher
* Upgrades of Rancher control plane can be done independently per region

### Cons:

* Overhead of managing multiple Rancher installations.
* Visibility across global Kubernetes clusters requires multiple interfaces/panes of glass. 
* Deploying multi-cluster apps in Rancher requires repeating the process for each Rancher server. 