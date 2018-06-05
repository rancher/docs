---
title: Kubernetes Versions
weight: 3000
draft: true
---

<!--where to find default for rke
how is default version determined
how to change it using configuration Options-->

The current default kubernetes version used by RKE is `v1.10.1-rancher1`.

There are two ways to select a kubernetes version:

- Using the kubernetes image defined in [System Images](#rke-system-images)
- Using the configuration option `kubernetes_version`

In case both are defined, the system images configuration will take precedence over `kubernetes_version`. Since the `kubernetes_version` options was added mainly to be used by Rancher v2.0, it has a limited number of supported tags that can be found [here](https://github.com/rancher/types/blob/master/apis/management.cattle.io/v3/k8s_defaults.go#L14).

If a version is defined in `kubernetes_version` and is not found in this map, the default is used.
