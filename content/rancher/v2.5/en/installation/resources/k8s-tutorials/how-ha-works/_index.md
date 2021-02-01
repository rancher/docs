---
title: About High-availability Installations
weight: 1
---

We recommend using Helm, a Kubernetes package manager, to install Rancher on a dedicated Kubernetes cluster. This is called a high-availability Kubernetes installation because increased availability is achieved by running Rancher on multiple nodes.

In a standard installation, Kubernetes is first installed on three nodes that are hosted in an infrastructure provider such as Amazon's EC2 or Google Compute Engine.

Then Helm is used to install Rancher on top of the Kubernetes cluster. Helm uses Rancher's Helm chart to install a replica of Rancher on each of the three nodes in the Kubernetes cluster. We recommend using a load balancer to direct traffic to each replica of Rancher in the cluster, in order to increase Rancher's availability.

The Rancher server data is stored on etcd. This etcd database also runs on all three nodes, and requires an odd number of nodes so that it can always elect a leader with a majority of the etcd cluster. If the etcd database cannot elect a leader, etcd can fail, requiring the cluster to be restored from backup.

For information on how Rancher works, regardless of the installation method, refer to the [architecture section.]({{<baseurl>}}/rancher/v2.5/en/overview/architecture)

### Recommended Architecture

- DNS for Rancher should resolve to a layer 4 load balancer
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>Kubernetes Rancher install with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>
![High-availability Kubernetes Installation of Rancher]({{<baseurl>}}/img/rancher/ha/rancher2ha.svg)
<sup>Kubernetes Rancher install with Layer 4 load balancer (TCP), depicting SSL termination at ingress controllers</sup>
