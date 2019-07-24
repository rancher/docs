---
title: DNS providers
weight: 262
---

RKE provides the following DNS providers that can be deployed as add-ons:

  * [CoreDNS](https://coredns.io)
  * [kube-dns](https://github.com/kubernetes/dns)

| RKE version | Kubernetes version | Default DNS provider |
|-------------|--------------------|----------------------|
| v0.2.5 and higher | v1.14.0 and higher | CoreDNS |
| v0.2.5 and higher | v1.13.x and lower | kube-dns |
| v0.2.4 and lower | any | kube-dns |

CoreDNS was made the default in RKE v0.2.5 when using Kubernetes 1.14 and higher. If you are using an RKE version lower than v0.2.5, kube-dns will be deployed by default.

# CoreDNS

_Available as of v0.2.5_

CoreDNS can only be used on Kubernetes v1.12.0 and higher.

RKE will deploy CoreDNS as a Deployment with the default replica count of 1. The pod consists of 1 container: `coredns`. RKE will also deploy coredns-autoscaler as a Deployment, which will scale the coredns Deployment by using the number of cores and nodes. Please see [Linear Mode](https://github.com/kubernetes-incubator/cluster-proportional-autoscaler#linear-mode) for more information about this logic.

The images used for CoreDNS are under the [`system_images` directive]({{< baseurl >}}/rke/latest/en/config-options/system-images/). For each Kubernetes version, there are default images associated with CoreDNS, but these can be overridden by changing the image tag in `system_images`.

## Scheduling CoreDNS

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

## Configuring CoreDNS

### Upstream nameservers

By default, CoreDNS will use the host configured nameservers (usually residing at `/etc/resolv.conf`) to resolve external queries. If you want to configure specific upstream nameservers to be used by CoreDNS, you can use the `upstreamnameservers` directive.

When you set `upstreamnameservers`, the `provider` also needs to be set.

```yaml
dns:
    provider: coredns
    upstreamnameservers:
    - 1.1.1.1
    - 8.8.4.4
```

# kube-dns

RKE will deploy kube-dns as a Deployment with the default replica count of 1. The pod consists of 3 containers: `kubedns`, `dnsmasq` and `sidecar`. RKE will also deploy kube-dns-autoscaler as a Deployment, which will scale the kube-dns Deployment by using the number of cores and nodes. Please see [Linear Mode](https://github.com/kubernetes-incubator/cluster-proportional-autoscaler#linear-mode) for more information about this logic.

The images used for kube-dns are under the [`system_images` directive]({{< baseurl >}}/rke/latest/en/config-options/system-images/). For each Kubernetes version, there are default images associated with kube-dns, but these can be overridden by changing the image tag in `system_images`.

## Scheduling kube-dns

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

## Configuring kube-dns

### Upstream nameservers

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

# Disabling deployment of a DNS provider

_Available as of v0.2.0_

You can disable the default DNS provider by specifying `none` to  the dns `provider` directive in the cluster configuration. Be aware that this will prevent your pods from doing name resolution in your cluster.

```yaml
dns:
    provider: none
```
