---
title: Network Plug-ins
weight: 261
---

RKE supports the following network plug-ins that are deployed as add-ons:

- Flannel
- Calico
- Canal
- Weave

By default, the network plug-in is `canal`. If you want to use another network plug-in, you need to specify which network plug-in to enable at the cluster level in the `cluster.yml`.

```yaml
# Setting the flannel network plug-in
network:
    plugin: flannel
```

The images used for network plug-ins are under the [`system_images` directive]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/). For each Kubernetes version, there are default images associated with each network plug-in, but these can be overridden by changing the image tag in `system_images`.

## Network Plug-in Options

Besides the different images that could be used to deploy network plug-ins, certain network plug-ins support additional options that can be used to customize the network plug-in.

### Canal Network Plug-in Options

```yaml
network:
    plugin: canal
    options:
        canal_iface: eth1
        canal_flannel_backend_type: vxlan
```

#### Canal Interface

By setting the `canal_iface`, you can configure the interface to use for inter-host communication.
The `canal_flannel_backend_type` option allows you to specify the type of [flannel backend](https://github.com/coreos/flannel/blob/master/Documentation/backends.md) to use. By default the `vxlan` backend is used.

### Flannel Network Plug-in Options

```yaml
network:
    plugin: flannel
    options:
      flannel_iface: eth1
      flannel_backend_type: vxlan
```

#### Flannel Interface

By setting the `flannel_iface`, you can configure the interface to use for inter-host communication.
The `flannel_backend_type` option allows you to specify the type of [flannel backend](https://github.com/coreos/flannel/blob/master/Documentation/backends.md) to use. By default the `vxlan` backend is used.

### Calico Network Plug-in Options

```yaml
network:
    plugin: calico
    calico_cloud_provider: aws
```

#### Cloud Provider

Calico currently only supports 2 cloud providers, AWS or GCE, which can be set using `calico_cloud_provider`.

**Valid Options**

- `aws`
- `gce`
