---
title: Network Plug-ins
weight: 3000
draft: true
---

RKE supports the following network plugins that are deployed as addons:

- Flannel
- Calico
- Canal
- Weave

To use specific network plugin configure `cluster.yml` to include:

```yaml
network:
  plugin: flannel
```

### Network Options

There are extra options that can be specified for each network plugin:

#### Flannel

- **flannel_image**: Flannel daemon Docker image
- **flannel_cni_image**: Flannel CNI binary installer Docker image
- **flannel_iface**: Interface to use for inter-host communication

#### Calico

- **calico_node_image**: Calico Daemon Docker image
- **calico_cni_image**: Calico CNI binary installer Docker image
- **calico_controllers_image**: Calico Controller Docker image
- **calicoctl_image**: Calicoctl tool Docker image
- **calico_cloud_provider**: Cloud provider where Calico will operate, currently supported values are: `aws`, `gce`

#### Canal

- **canal_node_image**: Canal Node Docker image
- **canal_cni_image**: Canal CNI binary installer Docker image
- **canal_flannel_image**: Canal Flannel Docker image

#### Weave

- **weave_node_image**: Weave Node Docker image
- **weave_cni_image**: Weave CNI binary installer Docker image
