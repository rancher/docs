---
title: DNS provider
weight: 262
---

By default, RKE deploys [kube-dns](https://github.com/kubernetes/dns) as DNS provider for your cluster.

RKE will deploy kube-dns as a Deployment with the default replica count of 1. The pod consists of 3 containers: `kubedns`, `dnsmasq` and `sidecar`. RKE will also deploy kube-dns-autoscaler as a Deployment, which will scale the kube-dns Deployment by using the number of cores and nodes. Please see [Linear Mode](https://github.com/kubernetes-incubator/cluster-proportional-autoscaler#linear-mode) for more information about this logic.

The images used for kube-dns are under the [`system_images` directive]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/). For each Kubernetes version, there are default images associated with kube-dns, but these can be overridden by changing the image tag in `system_images`.

## Scheduling kube-dns

_Available as of v0.2.0_

If you only wanted ingress controllers to be deployed on specific nodes, you can set a `node_selector` for the ingress. The label in the `node_selector` would need to match the label on the nodes for the ingress controller to be deployed.

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

## Disabling kube-dns

_Available as of v0.2.0_

You can disable the default DNS provider by specifying `none` to  the dns `provider` directive in the cluster configuration. Be aware that this will prevent your pods from doing name resolution in your cluster.

```yaml
dns:
    provider: none
```
## Configuring kube-dns

### Upstream nameservers

_Available as of v0.2.0_

By default, kube-dns will use the host configured nameservers (usually residing at `/etc/resolv.conf`) to resolve external queries. If you want to configure specific upstream nameservers to be used by kube-dns, you can use the `upstreamnameservers` directive.

```yaml
dns:
    provider: kube-dns
    upstreamnameservers:
    - 1.1.1.1  
    - 8.8.4.4
```

## CoreDNS (Experimental)

_Available as of v0.2.0_

If you want to use CoreDNS, you can set the `provider` directive to `coredns`. Both the `node_selector` and `upstreamnameservers` directive is also supported for CoreDNS.

```yaml
dns:
    provider: coredns
    upstreamnameservers:
    - 1.1.1.1
    - 8.8.4.4
```
