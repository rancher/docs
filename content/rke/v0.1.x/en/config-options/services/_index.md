
title: Kubernetes Services
weight: 3000
draft: true
---

## Default services

<!--Talk about the default services launched and options around them-->

To deploy Kubernetes, RKE deploys several core components or services in Docker containers on the cluster nodes. The deployed containers depend on the role(s) assigned to each node.

All RKE services support additional [custom arguments and Docker mount binds]({{< baseurl >}}/rke/v0.1.x/en/config-options/extra-args-and-binds).

Various examples and configurations can be found in the [example YMALs]({{< baseurl >}}/rke/v0.1.x/en/config-options/example-yamls/)

### etcd

Kubernetes uses [Etcd](https://github.com/coreos/etcd/blob/master/Documentation/docs.md) as a store for cluster state and data. Etcd is a reliable, consistent and distributed key-value store.

RKE supports running Etcd in a single node mode or in HA cluster mode. It also supports adding and removing Etcd nodes to the cluster.

RKE also supports running Kubernetes with an [external Etcd service]({{< baseurl >}}/rke/v0.1.x/en/config-options/services/external-etcd/).


### kube-api

The [Kubernetes API](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) REST service, which handles requests and data for all Kubernetes objects and provide shared state for all the other Kubernetes components.

In addition to extra arguments and binds, RKE supports the following options for kube-api:

##### `service_cluster_ip_range`

This is the virtual IP address that will be assigned to services created on Kubernetes. The default value for this option is `10.43.0.0/16`.


##### `service_node_port_range`
The port range to be used for Kubernetes services created with the [type](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types) `NodePort`.

The default value for this option is `30000-32767`.

##### `pod_security_policy`

An option to enable the [Kubernetes Pod Security Policy](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).

The default value for this option is `false`, which disables PSP.

> **Note**: RKE will configure an initially open policy to allow pods to work on the cluster. You will need to configure your own policies to fully utilize PSP.


### `kube-controller`

The [Kubernetes Controller Manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) service. This is the component responsible for running Kubernetes main control loops. The controller manager monitors the cluster desired state through the kube-apiserver and make the necessary changes to the current state to reach the desired state.

RKE support the following options for the controller service:

##### `cluster_cidr`
The CIDR pool used to assign IP addresses to Pods in the cluster. By default, each node in the cluster is assigned a /24 network from this pool for Pod IP assignment on this node.

The default value for this option is `10.42.0.0/16`.

##### `service_cluster_ip_range`

This is the virtual IP address that will be assigned to services created on Kubernetes. The default value for this option is `10.43.0.0/16`.


### `scheduler`

The [Kubernetes Scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) service. The Kubernetes Scheduler is responsible for scheduling cluster workloads based on various configurations, metrics, resource requirements and workload-specific requirements.

RKE doesn't support any specific options for the scheduler service at this time.


### `kubelet`

The [Kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) services acts as a "node agent" for Kubernetes. It runs on all nodes deployed by RKE, and gives Kubernetes the ability to manage the container runime one the node.

RKE supports the following options for the `kubelet` service:

##### cluster_domain

The [base domain](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) for the cluster. All services and DNS records created on the cluster. The default value for this option is `cluster.local`

##### `cluster_dns_server`

The IP address assigned to the DNS service endpoint within the cluster. DNS queries will be sent to this IP address which is used by KubeDNS. The default value for this option is `10.43.0.10`


##### `fail_swap_on`

The default behavior for Kubelet is to _fail_ if swap is enabled on the node. However, RKE doesn't follow this default, and allows deployments on nodes with swap enabled. If you like to revert to the default Kubelet behavior, set this option to `true`.

The defualt for this option is `false`.


### `kube-proxy`
The [Kubernetes Network Proxy](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/) service runs on all nodes and manages endpoints created by Kubernetes for TCP/UDP ports.

RKE doesn't support any specific options for the `kube-proxy` service at this time.
