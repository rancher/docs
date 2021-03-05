---
title: "3. Expose Your Services"
weight: 400
---

In testing environments, you usually need to route external traffic to your cluster containers by using an unadvertised IP and port number, providing users access to their apps. You can accomplish this goal using port mapping, which exposes a workload (i.e., service) publicly over a specific port, provided you know your node IP address(es). You can either map a port using HostPorts (which exposes a service on a specified port on a single node) or NodePorts (which exposes a service on _all_ nodes on a single port).

Use this document to correct workloads that list `ports` in `output.txt`. You can correct it by either setting a HostPort or a NodePort.

<figcaption>Resolve <code>ports</code> for the <code>web</code> Workload</figcaption>

![Resolve Ports]({{<baseurl>}}/img/rancher/resolve-ports.png)


## In This Document

<!-- TOC -->

- [What's Different About Exposing Services in Rancher v2.x?](#what-s-different-about-exposing-services-in-rancher-v2-x)
- [HostPorts](#hostport)
- [Setting HostPort](#setting-hostport)
- [NodePorts](#nodeport)
- [Setting NodePort](#setting-nodeport)

<!-- /TOC -->

## What's Different About Exposing Services in Rancher v2.x?

In Rancher v1.6, we used the term _Port Mapping_ for exposing an IP address and port where your you and your users can access a service. 

In Rancher v2.x, the mechanisms and terms for service exposure have changed and expanded. You now have two port mapping options: _HostPorts_ (which is most synonymous with v1.6 port mapping, allows you to expose your app at a single IP and port) and _NodePorts_ (which allows you to map ports on _all_ of your cluster nodes, not just one).

Unfortunately, port mapping cannot be parsed by the migration-tools CLI. If the services you're migrating from v1.6 to v2.x have port mappings set, you'll have to either set a [HostPort](#hostport) or [NodePort](#nodeport) as a replacement.

## HostPort

A _HostPort_ is a port exposed to the public on a _specific node_ running one or more pod. Traffic to the node and the exposed port (`<HOST_IP>:<HOSTPORT>`) are routed to the requested container's private port. Using a HostPort for a Kubernetes pod in Rancher v2.x is synonymous with creating a public port mapping for a container in Rancher v1.6. 

In the following diagram, a user is trying to access an instance of Nginx, which is running within a pod on port 80. However, the Nginx deployment is assigned a HostPort of 9890. The user can connect to this pod by browsing to its host IP address, followed by the HostPort in use (9890 in case).

![HostPort Diagram]({{<baseurl>}}/img/rancher/hostPort.svg)


#### HostPort Pros

- Any port available on the host can be exposed. 
- Configuration is simple, and the HostPort is set directly in the Kubernetes pod specifications. Unlike NodePort, no other objects need to be created to expose your app. 

#### HostPort Cons

- Limits the scheduling options for your pod, as only hosts with vacancies for your chosen port can be used.
- If the scale of your workload is larger than the number of nodes in your Kubernetes cluster, the deployment fails.
- Any two workloads that specify the same HostPort cannot be deployed to the same node.
- If the host where your pods are running becomes unavailable, Kubernetes reschedules the pods to different nodes. Thus, if the IP address for your workload changes, external clients of your application will lose access to the pod. The same thing happens when you restart your pods—Kubernetes reschedules them to a different node.

## Setting HostPort

You can set a HostPort for migrated workloads (i.e., services) using the Rancher v2.x UI. To add a HostPort, browse to the project containing your workloads, and edit each workload that you want to expose, as shown below. Map the port that your service container exposes to the HostPort exposed on your target node.

For example, for the web-deployment.yml file parsed from v1.6 that we've been using as a sample, we would edit its Kubernetes manifest, set the publish the port that the container uses, and then declare a HostPort listening on the port of your choice (`9890`) as shown below. You can then access your workload by clicking the link created in the Rancher UI. 

<figcaption>Port Mapping: Setting HostPort</figcaption>

{{< img "/img/rancher/set-hostport.gif" "Set HostPort">}}

## NodePort

A _NodePort_ is a port that's open to the public _on each_ of your cluster nodes. When the NodePort receives a request for any of the cluster hosts' IP address for the set NodePort value, NodePort (which is a Kubernetes service) routes traffic to a specific pod, regardless of what node it's running on. NodePort provides a static endpoint where external requests can reliably reach your pods.

NodePorts help you circumvent an IP address shortcoming. Although pods can be reached by their IP addresses, they are disposable by nature. Pods are routinely destroyed and recreated, getting a new IP address with each replication. Therefore, IP addresses are not a reliable way to access your pods. NodePorts help you around this issue by providing a static service where they can always be reached.  Even if your pods change their IP addresses, external clients dependent on them can continue accessing them without disruption, all without any knowledge of the pod re-creation occurring on the back end.

In the following diagram, a user is trying to connect to an instance of Nginx running in a Kubernetes cluster managed by Rancher. Although he knows what NodePort Nginx is operating on (30216 in this case), he does not know the IP address of the specific node that the pod is running on. However, with NodePort enabled, he can connect to the pod using the IP address for _any_ node in the cluster. Kubeproxy will forward the request to the correct node and pod.  

![NodePort Diagram]({{<baseurl>}}/img/rancher/nodePort.svg)

NodePorts are available within your Kubernetes cluster on an internal IP. If you want to expose pods external to the cluster, use NodePorts in conjunction with an external load balancer. Traffic requests from outside your cluster for `<NodeIP>:<NodePort>` are directed to the workload. The `<NodeIP>` can be the IP address of any node in your Kubernetes cluster.

#### NodePort Pros

- Creating a NodePort service provides a static public endpoint to your workload pods. There, even if the pods are destroyed, Kubernetes can deploy the workload anywhere in the cluster without altering the public endpoint.
- The scale of the pods is not limited by the number of nodes in the cluster. NodePort allows decoupling of public access from the number and location of pods.

#### NodePort Cons

- When a NodePort is used, that `<NodeIP>:<NodePort>` is reserved in your Kubernetes cluster on all nodes, even if the workload is never deployed to the other nodes.
- You can only specify a port from a configurable range (by default, it is `30000-32767`).
- An extra Kubernetes object (a Kubernetes service of type NodePort) is needed to expose your workload. Thus, finding out how your application is exposed is not straightforward.

## Setting NodePort

You can set a NodePort for migrated workloads (i.e., services) using the Rancher v2.x UI. To add a NodePort, browse to the project containing your workloads, and edit each workload that you want to expose, as shown below. Map the port that your service container exposes to a NodePort, which you'll be able to access from each cluster node.

For example, for the `web-deployment.yml` file parsed from v1.6 that we've been using as a sample, we would edit its Kubernetes manifest, set the publish the port that the container uses, and then declare a NodePort. You can then access your workload by clicking the link created in the Rancher UI. 

>**Note:** 
>
>- If you set a NodePort without giving it a value, Rancher chooses a port at random from the following range: `30000-32767`.
>- If you manually set a NodePort, you must assign it a value within the `30000-32767` range.

<figcaption>Port Mapping: Setting NodePort</figcaption>

{{< img "/img/rancher/set-nodeport.gif" "Set NodePort" >}}

### [Next: Configure Health Checks]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/monitor-apps)
