---
title: 2 - Configure Load Balancer
weight: 276
---

Choose a hostname that you will use to access Rancher and 

### Load Balancer

RKE will configure a Kubernetes ingress controller pod to listen on ports 80 and 443 tcp on each one of your nodes.

Configure your load balancer as a basic Layer 4 tcp forwarder. The exact configuration will vary depending on your environment.

#### Examples

* [Amazon NLB]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install2/loadbalancer/nlb)
* [Round Robin DNS]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install2/loadbalancer/rrdns)
