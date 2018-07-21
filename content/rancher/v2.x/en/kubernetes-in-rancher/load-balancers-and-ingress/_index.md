---
title: Load Balancing and Ingresses
weight: 3040
---

Within Rancher, you can setup load balancers and ingress controllers to redirect service requests.

## Load Balancers

After you launch an application, the app is only available within the cluster. It can't be reached from outside the cluster.

If you want your applications to be externally accessible, you must add a load balancer to your cluster. Load balancers create a gateway for external connections to access your cluster, provided that the user knows the load balancer's IP address and the application's port number.

Rancher supports two types of load balancers:

- [Layer-4 Load Balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers/#layer-4-load-balancer)
- [Layer-7 Load Balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers/#layer-7-load-balancer)

For more information, see [load balancers]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers).

### Load Balancer Limitations

Load Balancers have a couple of limitations you should be aware of:

- Load Balancers can only handle one IP address per service, which means if you run multiple services in your cluster, you must have a load balancer for each service. Running multiples load balancers can be expensive.

- If you want to use a load balancer with a Hosted Kubernetes cluster (i.e., clusters hosted in GKE, EKS, or AKS), you must host your load balancer with the same cloud provider. Please review the compatibility tables regarding support for load balancers based on how you've provisioned your clusters:


    - [Support for Layer-4 Load Balancing]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers/#support-for-layer-4-load-balancing)

    - [Support for Layer-7 Load Balancing]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/load-balancers/#support-for-layer-7-load-balancing)

## Ingress

As mentioned in the limitations above, using a load balancer per service can be expensive. You can get around this issue using an ingress.

Ingress is a set or rules that act as a load balancer. Ingress works in conjunction with one or more ingress controllers to dynamically route service requests. When the ingress receives a request, the ingress controller(s) in your cluster program the load balancer to direct the request to the correct service based on service subdomains or path rules that you've configured.

Your load balancer can either reside within your cluster or externally. Ingress and ingress controllers residing in RKE-launcher clusters are powered by [Nginx](https://www.nginx.com/).

Ingress can provide other functionality as well, such as SSL termination, name-based virtual hosting, and more.

- For more information on how to setup ingress in Rancher, see [Ingress]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/load-balancers-and-ingress/ingress).
- For complete information about ingress and ingress controllers, see the [Kubernetes Ingress Documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)

