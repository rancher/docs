---
title: Extra Args, Extra Binds, and Extra Environment Variables
weight: 231
---

RKE supports additional service arguments, volume binds and environment variables.

### Extra Args

For any of the Kubernetes services, you can update the `extra_args` to change the existing defaults.

As of `v0.1.3`, using `extra_args` will add new arguments and **override** any existing defaults. For example, if you need to modify the default admission controllers list, you need to include the default list and edit it with your changes so all changes are included.

Prior to `v0.1.3`, using `extra_args` would only add new arguments to the list and there was no ability to change the default list.

```yaml
services:
    kube-controller:
      extra_args:
        cluster-name: "mycluster"
```

### Extra Binds

Additional volume binds can be added to services using the `extra_binds` arguments.

```yaml
services:
    kubelet:
      extra_binds:
        - "/host/dev:/dev"
        - "/usr/libexec/kubernetes/kubelet-plugins:/usr/libexec/kubernetes/kubelet-plugins:z"
```

### Extra Environment Variables

Additional environment variables can be added to services by using the `extra_env` arguments.

```yaml
services:
    kubelet:
      extra_env:
        - "HTTP_PROXY=http://your_proxy"
```
