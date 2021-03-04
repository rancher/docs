---
title: Set Up Load Balancer and Ingress Controller within Rancher
description: Learn how you can set up load balancers and ingress controllers to redirect service requests within Rancher, and learn about the limitations of load balancers
weight: 3040
aliases:
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress
---

Within Rancher, you can set up load balancers and ingress controllers to redirect service requests.

## Load Balancers

After you launch an application, the app is only available within the cluster. It can't be reached from outside the cluster.

If you want your applications to be externally accessible, you must add a load balancer or ingress to your cluster. Load balancers create a gateway for external connections to access your cluster, provided that the user knows the load balancer's IP address and the application's port number.

Rancher supports two types of load balancers:

- [Layer-4 Load Balancers]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers/#layer-4-load-balancer)
- [Layer-7 Load Balancers]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers/#layer-7-load-balancer)

For more information, see [load balancers]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers).

### Load Balancer Limitations

Load Balancers have a couple of limitations you should be aware of:

- Load Balancers can only handle one IP address per service, which means if you run multiple services in your cluster, you must have a load balancer for each service. Running multiples load balancers can be expensive.

- If you want to use a load balancer with a Hosted Kubernetes cluster (i.e., clusters hosted in GKE, EKS, or AKS), the load balancer must be running within that cloud provider's infrastructure. Please review the compatibility tables regarding support for load balancers based on how you've provisioned your clusters:


    - [Support for Layer-4 Load Balancing]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers/#support-for-layer-4-load-balancing)

    - [Support for Layer-7 Load Balancing]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/load-balancers/#support-for-layer-7-load-balancing)

## Ingress

As mentioned in the limitations above, the disadvantages of using a load balancer are:

- Load Balancers can only handle one IP address per service.
- If you run multiple services in your cluster, you must have a load balancer for each service.
- It can be expensive to have a load balancer for every service.

In contrast, when an ingress is used as the entrypoint into a cluster, the ingress can route traffic to multiple services with greater flexibility. It can map multiple HTTP requests to services without individual IP addresses for each service. 

Therefore, it is useful to have an ingress if you want multiple services to be exposed with the same IP address, the same Layer 7 protocol, or the same privileged node-ports: 80 and 443.

Ingress works in conjunction with one or more ingress controllers to dynamically route service requests. When the ingress receives a request, the ingress controller(s) in your cluster direct the request to the correct service based on service subdomains or path rules that you've configured.

Each Kubernetes Ingress resource corresponds roughly to a file in `/etc/nginx/sites-available/` containing a `server{}` configuration block, where requests for specific files and folders are configured.

Your ingress, which creates a port of entry to your cluster similar to a load balancer, can reside within your cluster or externally. Ingress and ingress controllers residing in RKE-launched clusters are powered by [Nginx](https://www.nginx.com/).

Ingress can provide other functionality as well, such as SSL termination, name-based virtual hosting, and more.

>**Using Rancher in a High Availability Configuration?**
>
>Refrain from adding an Ingress to the `local` cluster. The Nginx Ingress Controller that Rancher uses acts as a global entry point for _all_ clusters managed by Rancher, including the `local` cluster.  Therefore, when users try to access an application, your Rancher connection may drop due to the Nginx configuration being reloaded. We recommend working around this issue by deploying applications only in clusters that you launch using Rancher.

- For more information on how to set up ingress in Rancher, see [Ingress]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/ingress).
- For complete information about ingress and ingress controllers, see the [Kubernetes Ingress Documentation](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- When using ingresses in a project, you can program the ingress hostname to an external DNS by setting up a Global DNS entry, see [Global DNS]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/globaldns/).
