---
title: Load Balancing and Ingresses
weight: 3040
---

Within Rancher, you can setup load balancers and ingress controllers to redirect service requests.

### Load Balancers

After you launch an application, the app is only available within the cluster. It can't be reached from outside the cluster.

If you want your applications to be externally accessible, you must add a load balancer to your cluster. Load balancers create a gateway for external connections to access your cluster, provided that the user knows the load balancer's IP address and the application's port number.

Rancher supports two types of load balancers:

- [Layer-4 Load Balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers/#layer-4-load-balancer)
- [Layer-7 Load Balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers/#layer-7-load-balancer)

For more information, see [load balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers).

#### Ingress

Load Balancers can only handle one IP address per service, which means if you run multiple services in your cluster, you must have a load balancer for each service. Running multiples load balancers can be expensive.

To address this issue, you can set up an ingress. Ingress is a controller that sits behind a load balancer. When the load balancer receives a request for one of the services running in your cluster, the load balancer passes it to your Ingress. Ingress then routes the request to the correct service based on service subdomains or path rules that you've configured.

Ingress can provide other functionality as well, such as SSL termination and name-based virtual hosting.

- For more information on how to setup ingress in Rancher, see [Ingress]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/ingress).
- For complete information about ingress, see the [Kubernetes Ingress Documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)
