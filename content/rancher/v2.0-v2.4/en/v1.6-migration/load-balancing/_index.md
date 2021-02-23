---
title: "7. Load Balancing"
weight: 700
---

If your applications are public-facing and consume significant traffic, you should place a load balancer in front of your cluster so that users can always access their apps without service interruption. Typically, you can fulfill a high volume of service requests by [horizontally scaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) your deployment, which spins up additional application containers as traffic ramps up. However, this technique requires routing that distributes traffic across your nodes efficiently. In cases where you need to accommodate public traffic that scales up and down, you'll need a load balancer.

As outlined in [its documentation]({{<baseurl>}}/rancher/v1.6/en/cattle/adding-load-balancers/), Rancher v1.6 provided rich support for load balancing using its own microservice powered by HAProxy, which supports HTTP, HTTPS, TCP hostname, and path-based routing. Most of these same features are available in v2.x. However, load balancers that you used with v1.6 cannot be migrated to v2.x. You'll have to manually recreate your v1.6 load balancer in v2.x.

If you encounter the `output.txt` text below after parsing your v1.6 Compose files to Kubernetes manifests, you'll have to resolve it by manually creating a load balancer in v2.x.

<figcaption><code>output.txt</code> Load Balancer Directive</figcaption>

![Resolve Load Balancer Directive]({{<baseurl>}}/img/rancher/resolve-load-balancer.png)

## In This Document

<!-- TOC -->

- [Load Balancing Protocol Options](#load-balancing-protocol-options)
- [Load Balancer Deployment](#load-balancer-deployment)
- [Load Balancing Architecture](#load-balancing-architecture)
- [Ingress Caveats](#ingress-caveats)
- [Deploying Ingress](#deploying-ingress)
- [Rancher v2.x Load Balancing Limitations](#rancher-v2-x-load-balancing-limitations)

<!-- /TOC -->

## Load Balancing Protocol Options

By default, Rancher v2.x replaces the v1.6 load balancer microservice with the native [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), which is backed by NGINX Ingress Controller for layer 7 load balancing. By default, Kubernetes Ingress only supports the HTTP and HTTPS protocols, not TCP. Load balancing is limited to these two protocols when using Ingress.

> **TCP Required?** See [TCP Load Balancing Options](#tcp-load-balancing-options)


## Load Balancer Deployment

In Rancher v1.6, you could add port/service rules for configuring your HA proxy to load balance for target services. You could also configure the hostname/path-based routing rules.

Rancher v2.x offers similar functionality, but load balancing is instead handled by Ingress. An Ingress is a specification of rules that a controller component applies to your load balancer. The actual load balancer can run outside of your cluster or within it.

By default, Rancher v2.x deploys NGINX Ingress Controller on clusters provisioned using RKE (Rancher's own Kubernetes installer) to process the Kubernetes Ingress rules. The NGINX Ingress Controller is installed by default only in clusters provisioned by RKE. Clusters provisioned by cloud providers like GKE have their own Ingress Controllers that configure the load balancer. For this document, our scope is limited to the RKE-installed NGINX Ingress Controller only.

RKE deploys NGINX Ingress Controller as a [Kubernetes DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/), meaning that an NGINX instance is deployed on every node in the cluster. NGINX acts like an Ingress Controller listening to Ingress creation within your entire cluster, and it also configures itself as the load balancer to satisfy the Ingress rules. The DaemonSet is configured with hostNetwork to expose two ports: 80 and 443.

For more information NGINX Ingress Controller, their deployment as DaemonSets, deployment configuration options, see the [RKE documentation]({{<baseurl>}}/rke/latest/en/config-options/add-ons/ingress-controllers/).

## Load Balancing Architecture

Deployment of Ingress Controller in v2.x as a DaemonSet brings some architectural changes that v1.6 users should know about.

In Rancher v1.6 you could deploy a scalable load balancer service within your stack. If you had four hosts in your Cattle environment, you could deploy one load balancer service with a scale of two and point to your application by appending port 80 to your two host IP Addresses. You could also launch another load balancer on the remaining two hosts to balance a different service again using port 80 because your load balancer is using different host IP Addresses).

<!-- add comparison table-->

<figcaption>Rancher v1.6 Load Balancing Architecture</figcaption>

![Rancher v1.6 Load Balancing]({{<baseurl>}}/img/rancher/cattle-load-balancer.svg)

The Rancher v2.x Ingress Controller is a DaemonSet, it is globally deployed on all schedulable nodes to serve your entire Kubernetes Cluster. Therefore, when you program the Ingress rules, you must use a unique hostname and path to point to your workloads, as the load balancer node IP addresses and ports 80 and 443 are common access points for all workloads.

<figcaption>Rancher v2.x Load Balancing Architecture</figcaption>

![Rancher v2.x Load Balancing]({{<baseurl>}}/img/rancher/kubernetes-load-balancer.svg)

## Ingress Caveats

Although Rancher v2.x supports HTTP and HTTPS hostname and path-based load balancing, you must use unique host names and paths when configuring your workloads. This limitation derives from:

- Ingress confinement to ports 80 and 443 (i.e, the ports HTTP[S] uses for routing).
- The load balancer and the Ingress Controller is launched globally for the cluster as a DaemonSet.

> **TCP Required?** Rancher v2.x still supports TCP. See [TCP Load Balancing Options](#tcp-load-balancing-options) for workarounds.

## Deploying Ingress

You can launch a new load balancer to replace your load balancer from v1.6. Using the Rancher v2.x UI, browse to the applicable project and choose **Resources > Workloads > Load Balancing.** (In versions before v2.3.0, click **Workloads > Load Balancing.**) Then click **Deploy**. During deployment, you can choose a target project or namespace.

>**Prerequisite:** Before deploying Ingress, you must have a workload deployed that's running a scale of two or more pods.
>

![Workload Scale]({{<baseurl>}}/img/rancher/workload-scale.png)

For balancing between these two pods, you must create a Kubernetes Ingress rule. To create this rule, navigate to your cluster and project, and click **Resources > Workloads > Load Balancing.** (In versions before v2.3.0, click **Workloads > Load Balancing.**) Then click **Add Ingress**. This GIF below depicts how to add Ingress to one of your projects.

<figcaption>Browsing to Load Balancer Tab and Adding Ingress</figcaption>

![Adding Ingress]({{<baseurl>}}/img/rancher/add-ingress.gif)

Similar to a service/port rules in Rancher v1.6, here you can specify rules targeting your workload's container port. The sections below demonstrate how to create Ingress rules.

### Configuring Host- and Path-Based Routing

Using Rancher v2.x, you can add Ingress rules that are based on host names or a URL path. Based on the rules you create, your NGINX Ingress Controller routes traffic to multiple target workloads or Kubernetes services.

For example, let's say you have multiple workloads deployed to a single namespace. You can add an Ingress to route traffic to these two workloads using the same hostname but different paths, as depicted in the image below. URL requests to `foo.com/name.html` will direct users to the `web` workload, and URL requests to `foo.com/login` will direct users to the `chat` workload.

<figcaption>Ingress: Path-Based Routing Configuration</figcaption>

![Ingress: Path-Based Routing Configuration]({{<baseurl>}}/img/rancher/add-ingress-form.png)

Rancher v2.x also places a convenient link to the workloads on the Ingress record. If you configure an external DNS to program the DNS records, this hostname can be mapped to the Kubernetes Ingress address.

<figcaption>Workload Links</figcaption>

![Load Balancer Links to Workloads]({{<baseurl>}}/img/rancher/load-balancer-links.png)

The Ingress address is the IP address in your cluster that the Ingress Controller allocates for your workload. You can reach your workload by browsing to this IP address. Use `kubectl` command below to see the Ingress address assigned by the controller:

```
kubectl get ingress
```

### HTTPS/Certificates Option

Rancher v2.x Ingress functionality supports the HTTPS protocol, but if you want to use it, you need to use a valid SSL/TLS certificate. While configuring Ingress rules, use the **SSL/TLS Certificates** section to configure a certificate.

- We recommend [uploading a certificate]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/certificates/) from a known certificate authority (you'll have to do this before configuring Ingress). Then, while configuring your load balancer, use the **Choose a certificate** option and select the uploaded certificate that you want to use.
- If you have configured [NGINX default certificate]({{<baseurl>}}/rke/latest/en/config-options/add-ons/ingress-controllers/#configuring-an-nginx-default-certificate), you can select **Use default ingress controller certificate**.

<figcaption>Load Balancer Configuration: SSL/TLS Certificate Section</figcaption>

![SSL/TLS Certificates Section]({{<baseurl>}}/img/rancher/load-balancer-ssl-certs.png)

### TCP Load Balancing Options

#### Layer-4 Load Balancer

For the TCP protocol, Rancher v2.x supports configuring a Layer 4 load balancer using the cloud provider in which your Kubernetes cluster is deployed. Once this load balancer appliance is configured for your cluster, when you choose the option of a `Layer-4 Load Balancer` for port-mapping during workload deployment, Rancher automatically creates a corresponding load balancer service. This service will call the corresponding cloud provider and configure the load balancer appliance to route requests to the appropriate pods. See [Cloud Providers]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options/cloud-providers/) for information on how to configure LoadBalancer services for your cloud provider.

For example, if we create a deployment named `myapp` and specify a Layer 4 load balancer in the **Port Mapping** section, Rancher will automatically add an entry to the **Load Balancer** tab named `myapp-loadbalancer`.

<figcaption>Workload Deployment: Layer 4 Load Balancer Creation</figcaption>

![Deploy Layer-4 Load Balancer]({{<baseurl>}}/img/rancher/deploy-workload-load-balancer.png)

Once configuration of the load balancer succeeds, the Rancher UI provides a link to your workload's public endpoint.

#### NGINX Ingress Controller TCP Support by ConfigMaps

Although NGINX supports TCP, Kubernetes Ingress itself does not support the TCP protocol. Therefore, out-of-the-box configuration of NGINX Ingress Controller for TCP balancing isn't possible.

However, there is a workaround to use NGINX's TCP balancing by creating a Kubernetes ConfigMap, as described in the [Ingress GitHub readme](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/exposing-tcp-udp-services.md). You can create a ConfigMap object that stores pod configuration parameters as key-value pairs, separate from the pod image, as described in the [Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/).

To configure NGINX to expose your services via TCP, you can add the ConfigMap `tcp-services` that should exist in the `ingress-nginx` namespace. This namespace also contains the NGINX Ingress Controller pods.

![Layer-4 Load Balancer: ConfigMap Workaround]({{<baseurl>}}/img/rancher/layer-4-lb-config-map.png)

The key in the ConfigMap entry should be the TCP port that you want to expose for public access: `<namespace/service name>:<service port>`. As shown above, two workloads are listed in the `Default` namespace. For example, the first entry in the ConfigMap above instructs NGINX to expose the `myapp` workload (the one in the `default` namespace that's listening on private port 80) over external port `6790`. Adding these entries to the ConfigMap automatically updates the NGINX pods to configure these workloads for TCP balancing. The workloads exposed should be available at `<NodeIP>:<TCP Port>`. If they are not accessible, you might have to expose the TCP port explicitly using a NodePort service.

## Rancher v2.x Load Balancing Limitations

Cattle provided feature-rich load balancer support that is [well documented]({{<baseurl>}}/rancher/v1.6/en/cattle/adding-load-balancers/#load-balancers). Some of these features do not have equivalents in Rancher v2.x. This is the list of such features:

- No support for SNI in current NGINX Ingress Controller.
- TCP load balancing requires a load balancer appliance enabled by cloud provider within the cluster. There is no Ingress support for TCP on Kubernetes.
- Only ports 80 and 443 can be configured for HTTP/HTTPS routing via Ingress. Also Ingress Controller is deployed globally as a DaemonSet and not launched as a scalable service. Also, users cannot assign random external ports to be used for balancing. Therefore, users need to ensure that they configure unique hostname/path combinations to avoid routing conflicts using the same two ports.
- There is no way to specify port rule priority and ordering.
- Rancher v1.6 added support for draining backend connections and specifying a drain timeout. This is not supported in Rancher v2.x.
- There is no support for specifying a custom stickiness policy and a custom load balancer config to be appended to the default config as of now in Rancher v2.x. There is some support, however, available in native Kubernetes for customizing the NGINX configuration as noted in the [NGINX Ingress Controller Custom Configuration Documentation](https://kubernetes.github.io/ingress-nginx/examples/customization/custom-configuration/).

### Finished!
