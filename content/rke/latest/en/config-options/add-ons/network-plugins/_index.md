---
title: Network Plug-ins
weight: 261
---

RKE provides the following network plug-ins that are deployed as add-ons:

- Flannel
- Calico
- Canal
- Weave

> After you launch the cluster, you cannot change your network provider. Therefore, choose which network provider you want to use carefully, as Kubernetes doesn’t allow switching between network providers. Once a cluster is created with a network provider, changing network providers would require you tear down the entire cluster and all its applications.

- [Changing the Default Network Plug-in](#changing-the-default-network-plug-in)
- [Disabling Deployment of a Network Plug-in](#disabling-deployment-of-a-network-plug-in)
- [Network Plug-in Options](#network-plug-in-options)
- [Canal](#canal)
  - [Canal Network Plug-in Options](#canal-network-plug-in-options)
  - [Canal Interface](#canal-interface)
  - [Canal Network Plug-in Tolerations](#canal-network-plug-in-tolerations)
- [Flannel](#flannel)
  - [Flannel Network Plug-in Options](#flannel-network-plug-in-options)
  - [Flannel Interface](#flannel-interface)
- [Calico](#calico)
  - [Calico Network Plug-in Options](#calico-network-plug-in-options)
  - [Calico Cloud Provider](#calico-cloud-provider)
  - [Calico Network Plug-in Tolerations](#calico-network-plug-in-tolerations)
- [Weave](#weave)
  - [Weave Network Plug-in Options](#weave-network-plug-in-options)
- [Custom Network Plug-ins](#custom-network-plug-ins)

# Changing the Default Network Plug-in

By default, the network plug-in is `canal`. If you want to use another network plug-in, you need to specify which network plug-in to enable at the cluster level in the `cluster.yml`.

```yaml
# Setting the flannel network plug-in
network:
  plugin: flannel
```

The images used for network plug-ins are under the [`system_images` directive]({{<baseurl>}}/rke/latest/en/config-options/system-images/). For each Kubernetes version, there are default images associated with each network plug-in, but these can be overridden by changing the image tag in `system_images`.

# Disabling Deployment of a Network Plug-in

You can disable deploying a network plug-in by specifying `none` to the network `plugin` directive in the cluster configuration.

```yaml
network:
  plugin: none
```

# Network Plug-in Options

Besides the different images that could be used to deploy network plug-ins, certain network plug-ins support additional options that can be used to customize the network plug-in.

- [Canal](#canal)
- [Flannel](#flannel)
- [Calico](#calico)
- [Weave](#weave)

# Canal

### Canal Network Plug-in Options

```yaml
network:
  plugin: canal
  options:
    canal_iface: eth1
    canal_flannel_backend_type: vxlan
    canal_autoscaler_priority_class_name: system-cluster-critical # Available as of RKE v1.2.6+
    canal_priority_class_name: system-cluster-critical # Available as of RKE v1.2.6+
```

### Canal Interface

By setting the `canal_iface`, you can configure the interface to use for inter-host communication.

The `canal_flannel_backend_type` option allows you to specify the type of [flannel backend](https://github.com/coreos/flannel/blob/master/Documentation/backends.md) to use. By default the `vxlan` backend is used.

### Canal Network Plug-in Tolerations

_Available as of v1.2.4_

The configured tolerations apply to the `calico-kube-controllers` Deployment.

```yaml
network:
  plugin: canal
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

To check for applied tolerations on the `calico-kube-controllers` Deployment, use the following command:

```
kubectl -n kube-system get deploy calico-kube-controllers -o jsonpath='{.spec.template.spec.tolerations}'
```

# Flannel
### Flannel Network Plug-in Options

```yaml
network:
  plugin: flannel
  options:
    flannel_iface: eth1
    flannel_backend_type: vxlan
    flannel_autoscaler_priority_class_name: system-cluster-critical # Available as of RKE v1.2.6+
    flannel_priority_class_name: system-cluster-critical # Available as of RKE v1.2.6+
```

### Flannel Interface

By setting the `flannel_iface`, you can configure the interface to use for inter-host communication.
The `flannel_backend_type` option allows you to specify the type of [flannel backend](https://github.com/coreos/flannel/blob/master/Documentation/backends.md) to use. By default the `vxlan` backend is used.


# Calico

### Calico Network Plug-in Options

```yaml
network:
  plugin: calico
  options:
    calico_cloud_provider: aws
    calico_autoscaler_priority_class_name: system-cluster-critical # Available as of RKE v1.2.6+
    calico_priority_class_name: system-cluster-critical # Available as of RKE v1.2.6+
```
### Calico Cloud Provider

Calico currently only supports 2 cloud providers, AWS or GCE, which can be set using `calico_cloud_provider`.

**Valid Options**

- `aws`
- `gce`

### Calico Network Plug-in Tolerations

_Available as of v1.2.4_

The configured tolerations apply to the `calico-kube-controllers` Deployment.

```yaml
network:
  plugin: calico
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

To check for applied tolerations on the `calico-kube-controllers` Deployment, use the following command:

```
kubectl -n kube-system get deploy calico-kube-controllers -o jsonpath='{.spec.template.spec.tolerations}'
```

# Weave
### Weave Network Plug-in Options

```yaml
network:
  plugin: weave
  options:
    weave_autoscaler_priority_class_name: system-cluster-critical # Available as of RKE v1.2.6+
    weave_priority_class_name: system-cluster-critical # Available as of RKE v1.2.6+
  weave_network_provider:
    password: "Q]SZOQ5wp@n$oijz"
```

### Weave Encryption

Weave encryption can be enabled by passing a string password to the network provider config.

# Custom Network Plug-ins

It is possible to add a custom network plug-in by using the [user-defined add-on functionality]({{<baseurl>}}/rke/latest/en/config-options/add-ons/user-defined-add-ons/) of RKE. In the `addons` field, you can add the add-on manifest of a cluster that has the network plugin-that you want, as shown in [this example.]({{<baseurl>}}/rke/latest/en/config-options/add-ons/network-plugins/custom-network-plugin-example)
