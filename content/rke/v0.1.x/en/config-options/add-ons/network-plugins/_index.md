---
title: Network Plug-ins
weight: 251
draft: true
---

RKE supports the following network plugins that are deployed as add-ons:

- Flannel
- Calico
- Canal
- Weave

To use a specific network plugin configure `cluster.yml` to include:

```yaml
network:
  plugin: flannel
```
Additionally, some plugins support additional options that can be used to customize their behavior.

If this section is not specified in the cluster configration, the default network plugin will be used. The default is `canal`.

### Network Options

There are extra options that can be specified for each network plugin:

#### Flannel

- **flannel_iface**: Interface to use for inter-host communication

#### Calico

- **calico_cloud_provider**: Cloud provider where Calico will operate, currently supported values are: `aws`, `gce`
