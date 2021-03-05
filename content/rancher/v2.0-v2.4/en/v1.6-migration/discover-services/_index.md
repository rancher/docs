---
title: "6. Service Discovery"
weight: 600
---

Service discovery is one of the core functionalities of any container-based environment. Once you have packaged and launched your application, the next step is making it discoverable to other containers in your environment or the external world. This document will describe how to use the service discovery support provided by Rancher v2.x so that you can find them by name.

This document will also show you how to link the workloads and services that you migrated into Rancher v2.x. When you parsed your services from v1.6 using migration-tools CLI, it output two files for each service: one deployment manifest and one service manifest. You'll have to link these two files together before the deployment works correctly in v2.x.

<figcaption>Resolve the <code>output.txt</code> Link Directive</figcaption>

![Resolve Link Directive]({{<baseurl>}}/img/rancher/resolve-links.png)

## In This Document

<!-- TOC -->


- [Service Discovery: Rancher v1.6 vs. v2.x](#service-discovery-rancher-v1-6-vs-v2-x)
- [Service Discovery Within and Across Namespaces](#service-discovery-within-and-across-namespaces)
- [Container Discovery](#container-discovery)
- [Service Name Alias Creation](#service-name-alias-creation)

<!-- /TOC -->

## Service Discovery: Rancher v1.6 vs. v2.x

For Rancher v2.x, we've replaced the Rancher DNS microservice used in v1.6 with native [Kubernetes DNS support](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/), which provides equivalent service discovery for Kubernetes workloads and pods. Former Cattle users can replicate all the service discovery features from Rancher v1.6 in v2.x. There's no loss of functionality.

Kubernetes schedules a DNS pod and service in the cluster, which is similar to the [Rancher v1.6 DNS microservice]({{<baseurl>}}/rancher/v1.6/en/cattle/internal-dns-service/#internal-dns-service-in-cattle-environments). Kubernetes then configures its kubelets to route all DNS lookups to this DNS service, which is skyDNS, a flavor of the default Kube-DNS implementation.

The following table displays each service discovery feature available in the two Rancher releases.

Service Discovery Feature | Rancher v1.6 | Rancher v2.x | Description
--------------------------|--------------|--------------|-------------
[service discovery within and across stack][1] (i.e., clusters) | ✓ | ✓ | All services in the stack are resolvable by `<service_name>` and by `<service_name>.<stack_name>` across stacks.
[container discovery][2] | ✓ | ✓ | All containers are resolvable globally by their name.
[service alias name creation][3] | ✓ | ✓ | Adding an alias name to services and linking to other services using aliases.
[discovery of external services][4] | ✓  | ✓ | Pointing to services deployed outside of Rancher using the external IP(s) or a domain name.

[1]: #service-discovery-within-and-across-stacks
[2]: #container-discovery
[3]: #service-name-alias-creation
[4]: #service-name-alias-creation

<br/>

### Service Discovery Within and Across Namespaces


When you create a _new_ workload in v2.x (not migrated, more on that [below](#linking-migrated-workloads-and-services)), Rancher automatically creates a service with an identical name, and then links the service and workload together. If you don't explicitly expose a port, the default port of `42` is used. This practice makes the workload discoverable within and across namespaces by its name.

### Container Discovery

Individual pods running in the Kubernetes cluster also get a DNS record assigned, which uses dot notation as well: `<POD_IP_ADDRESS>.<NAMESPACE_NAME>.pod.cluster.local`. For example, a pod with an IP of `10.42.2.7` in the namespace `default` with a DNS name of `cluster.local` would have an entry of `10-42-2-7.default.pod.cluster.local`.

Pods can also be resolved using the `hostname` and `subdomain` fields if set in the pod spec. Details about this resolution is covered in the [Kubernetes docs](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/).

### Linking Migrated Workloads and Services

When you migrate v1.6 services to v2.x, Rancher does not automatically create a Kubernetes service record for each migrated deployment. Instead, you'll have to link the deployment and service together manually, using any of the methods listed below.

In the image below, the `web-deployment.yml` and `web-service.yml` files [created after parsing]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/run-migration-tool/#migration-example-file-output) our [migration example services]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/#migration-example-files) are linked together.

<figcaption>Linked Workload and Kubernetes Service</figcaption>

![Linked Workload and Kubernetes Service]({{<baseurl>}}/img/rancher/linked-service-workload.png)


### Service Name Alias Creation

Just as you can create an alias for Rancher v1.6 services, you can do the same for Rancher v2.x workloads. Similarly, you can also create DNS records pointing to services running externally, using either their hostname or IP address. These DNS records are Kubernetes service objects.

Using the v2.x UI, use the context menu to navigate to the `Project` view. Then click **Resources > Workloads > Service Discovery.** (In versions before v2.3.0, click the **Workloads > Service Discovery** tab.) All existing DNS records created for your workloads are listed under each namespace.

Click **Add Record** to create new DNS records. Then view the various options supported to link to external services or to create aliases for another workload, DNS record, or set of pods.

<figcaption>Add Service Discovery Record</figcaption>
![Add Service Discovery Record]({{<baseurl>}}/img/rancher/add-record.png)

The following table indicates which alias options are implemented natively by Kubernetes and which options are implemented by Rancher leveraging Kubernetes.

Option | Kubernetes-implemented? | Rancher-implemented?
-------|-------------------------|---------------------
Pointing to an external hostname | ✓ | |
Pointing to a set of pods that match a selector | ✓ | |
Pointing to an external IP address | | ✓
Pointing to another workload | | ✓
Create alias for another DNS record | | ✓


### [Next: Load Balancing]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/load-balancing/)
