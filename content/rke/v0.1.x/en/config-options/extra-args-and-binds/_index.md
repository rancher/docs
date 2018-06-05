---
title: Extra Args and Binds
weight: 3000
draft: true
---


RKE supports additional service arguments.

```yaml
services:
  # ...
  kube-controller:
    extra_args:
      cluster-name: "mycluster"
```
This will add/append `--cluster-name=mycluster` to the container list of arguments.

As of `v0.1.3-rc2` using `extra_args` will add new arguments and **override** existing defaults. For example, if you need to modify the default admission controllers list, you need to change the default list and add apply it using `extra_args`.

RKE also supports additional volume binds:

```yaml
services:
  # ...
  kubelet:
    extra_binds:
      - "/host/dev:/dev"
      - "/usr/libexec/kubernetes/kubelet-plugins:/usr/libexec/kubernetes/kubelet-plugins:z"
```
