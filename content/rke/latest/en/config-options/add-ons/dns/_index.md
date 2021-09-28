---
title: DNS providers
weight: 262
---

- [Available DNS Providers](#available-dns-providers)
- [Disabling deployment of a DNS Provider](#disabling-deployment-of-a-dns-provider)
- [CoreDNS](#coredns)
  - [Scheduling CoreDNS](#scheduling-coredns)
  - [Upstream nameservers](#coredns-upstream-nameservers)
  - [Priority Class Name](#coredns-priority-class-name)
  - [Tolerations](#coredns-tolerations)
- [kube-dns](#kube-dns)
  - [Scheduling kube-dns](#scheduling-kube-dns)
  - [Upstream nameservers](#kube-dns-upstream-nameservers)
  - [Priority Class Name](#kube-dns-priority-class-name)
  - [Tolerations](#kube-dns-tolerations)
- [NodeLocal DNS](#nodelocal-dns)
  - [Configuring NodeLocal DNS](#configuring-nodelocal-dns)
  - [Priority Class Name](#nodelocal-priority-class-name)
  - [Removing NodeLocal DNS](#removing-nodelocal-dns)

# Available DNS Providers

RKE provides the following DNS providers that can be deployed as add-ons:

  * [CoreDNS](https://coredns.io)
  * [kube-dns](https://github.com/kubernetes/dns)

| RKE version | Kubernetes version | Default DNS provider |
|-------------|--------------------|----------------------|
| v0.2.5 and higher | v1.14.0 and higher | CoreDNS |
| v0.2.5 and higher | v1.13.x and lower | kube-dns |
| v0.2.4 and lower | any | kube-dns |

CoreDNS was made the default in RKE v0.2.5 when using Kubernetes 1.14 and higher. If you are using an RKE version lower than v0.2.5, kube-dns will be deployed by default.

> **Note:** If you switch from one DNS provider to another, the existing DNS provider will be removed before the new one is deployed.

# Disabling Deployment of a DNS Provider

_Available as of v0.2.0_

You can disable the default DNS provider by specifying `none` to  the dns `provider` directive in the cluster configuration. Be aware that this will prevent your pods from doing name resolution in your cluster.

```yaml
dns:
  provider: none
```

# CoreDNS

_Available as of v0.2.5_

CoreDNS can only be used on Kubernetes v1.12.0 and higher.

RKE will deploy CoreDNS as a Deployment with the default replica count of 1. The pod consists of 1 container: `coredns`. RKE will also deploy coredns-autoscaler as a Deployment, which will scale the coredns Deployment by using the number of cores and nodes. Please see [Linear Mode](https://github.com/kubernetes-incubator/cluster-proportional-autoscaler#linear-mode) for more information about this logic.

The images used for CoreDNS are under the [`system_images` directive]({{<baseurl>}}/rke/latest/en/config-options/system-images/). For each Kubernetes version, there are default images associated with CoreDNS, but these can be overridden by changing the image tag in `system_images`.

### Scheduling CoreDNS

If you only want the CoreDNS pod to be deployed on specific nodes, you can set a `node_selector` in the `dns` section. The label in the `node_selector` would need to match the label on the nodes for the CoreDNS pod to be deployed.

```yaml
nodes:
- address: 1.1.1.1
  role: [controlplane,worker,etcd]
  user: root
  labels:
    app: dns

dns:
  provider: coredns
  node_selector:
    app: dns
```


### CoreDNS Upstream nameservers

By default, CoreDNS will use the host configured nameservers (usually residing at `/etc/resolv.conf`) to resolve external queries. If you want to configure specific upstream nameservers to be used by CoreDNS, you can use the `upstreamnameservers` directive.

When you set `upstreamnameservers`, the `provider` also needs to be set.

```yaml
dns:
  provider: coredns
  upstreamnameservers:
  - 1.1.1.1
  - 8.8.4.4
```


### CoreDNS Priority Class Name

_Available as of RKE v1.2.6+_

The [pod priority](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#pod-priority) is set by configuring a priority class name under `options`:

```yaml
dns:
    options:
      coredns_autoscaler_priority_class_name: system-cluster-critical
      coredns_priority_class_name: system-cluster-critical
    provider: coredns
```

### CoreDNS Tolerations

_Available as of v1.2.4_

The configured tolerations apply to the `coredns` and the `coredns-autoscaler` Deployment.

```yaml
dns:
  provider: coredns
  tolerations:
  - key: "node.kubernetes.io/unreachable"
    operator: "Exists"
    effect: "NoExecute"
    tolerationseconds: 300
  - key: "node.kubernetes.io/not-ready"
    operator: "Exists"
    effect: "NoExecute"
    tolerationseconds: 300
```

To check for applied tolerations on the `coredns` and `coredns-autoscaler` Deployment, use the following commands:

```
kubectl -n kube-system get deploy coredns -o jsonpath='{.spec.template.spec.tolerations}'
kubectl -n kube-system get deploy coredns-autoscaler -o jsonpath='{.spec.template.spec.tolerations}'
```

# kube-dns

RKE will deploy kube-dns as a Deployment with the default replica count of 1. The pod consists of 3 containers: `kubedns`, `dnsmasq` and `sidecar`. RKE will also deploy kube-dns-autoscaler as a Deployment, which will scale the kube-dns Deployment by using the number of cores and nodes. Please see [Linear Mode](https://github.com/kubernetes-incubator/cluster-proportional-autoscaler#linear-mode) for more information about this logic.

The images used for kube-dns are under the [`system_images` directive]({{<baseurl>}}/rke/latest/en/config-options/system-images/). For each Kubernetes version, there are default images associated with kube-dns, but these can be overridden by changing the image tag in `system_images`.

### Scheduling kube-dns

_Available as of v0.2.0_

If you only want the kube-dns pod to be deployed on specific nodes, you can set a `node_selector` in the `dns` section. The label in the `node_selector` would need to match the label on the nodes for the kube-dns pod to be deployed.

```yaml
nodes:
- address: 1.1.1.1
  role: [controlplane,worker,etcd]
  user: root
  labels:
    app: dns

dns:
  provider: kube-dns
  node_selector:
    app: dns
```

### kube-dns Upstream nameservers

_Available as of v0.2.0_

By default, kube-dns will use the host configured nameservers (usually residing at `/etc/resolv.conf`) to resolve external queries. If you want to configure specific upstream nameservers to be used by kube-dns, you can use the `upstreamnameservers` directive.

When you set `upstreamnameservers`, the `provider` also needs to be set.

```yaml
dns:
  provider: kube-dns
  upstreamnameservers:
  - 1.1.1.1
  - 8.8.4.4
```

### kube-dns Priority Class Name

_Available as of RKE v1.2.6+_

The [pod priority](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#pod-priority) is set by configuring a priority class name under `options`:

```yaml
dns:
    options:
      kube_dns_autoscaler_priority_class_name: system-cluster-critical
      kube_dns_priority_class_name: system-cluster-critical
    provider: kube-dns
```


### kube-dns Tolerations

_Available as of v1.2.4_

The configured tolerations apply to the `kube-dns` and the `kube-dns-autoscaler` Deployment.

```yaml
dns:
  provider: kube-dns
  tolerations:
  - key: "node.kubernetes.io/unreachable"
    operator: "Exists"
    effect: "NoExecute"
    tolerationseconds: 300
  - key: "node.kubernetes.io/not-ready"
    operator: "Exists"
    effect: "NoExecute"
    tolerationseconds: 300

```

To check for applied tolerations on the `coredns` and `coredns-autoscaler` Deployment, use the following commands:

```
kubectl get deploy kube-dns -n kube-system -o jsonpath='{.spec.template.spec.tolerations}'
kubectl get deploy kube-dns-autoscaler -n kube-system -o jsonpath='{.spec.template.spec.tolerations}'
```



# NodeLocal DNS

_Available as of v1.1.0_

> **Note:** The option to enable NodeLocal DNS is available for:
>
> * Kubernetes v1.15.11 and up
> * Kubernetes v1.16.8 and up
> * Kubernetes v1.17.4 and up

NodeLocal DNS is an additional component that can be deployed on each node to improve DNS performance. It is not a replacement for the `provider` parameter, you will still need to have one of the available DNS providers configured. See [Using NodeLocal DNSCache in Kubernetes clusters](https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/) for more information on how NodeLocal DNS works.

Enable NodeLocal DNS by configuring an IP address.

### Configuring NodeLocal DNS

The `ip_address` parameter is used to configure what link-local IP address will be configured one each host to listen on, make sure this IP address is not already configured on the host.

```yaml
dns:
  provider: coredns
  nodelocal:
    ip_address: "169.254.20.10"
```

> **Note:** When enabling NodeLocal DNS on an existing cluster, pods that are currently running will not be modified, the updated `/etc/resolv.conf` configuration will take effect only for pods started after enabling NodeLocal DNS.

### NodeLocal Priority Class Name

_Available as of RKE v1.2.6+_

The [pod priority](https://kubernetes.io/docs/concepts/configuration/pod-priority-preemption/#pod-priority) is set by configuring a priority class name under `options`:

```yaml
dns:
    options:
      nodelocal_autoscaler_priority_class_name: system-cluster-critical
      nodelocal_priority_class_name: system-cluster-critical
    provider: coredns # a DNS provider must be configured
```

### Removing NodeLocal DNS

By removing the `ip_address` value, NodeLocal DNS will be removed from the cluster.

> **Warning:** When removing NodeLocal DNS, a disruption to DNS can be expected. The updated `/etc/resolv.conf` configuration will take effect only for pods that are started after removing NodeLocal DNS. In general pods using the default `dnsPolicy: ClusterFirst` will need to be re-deployed.
