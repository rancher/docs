---
title: Extra Args, Extra Binds, and Extra Environment Variables
weight: 231
---

RKE supports additional service arguments, volume binds and environment variables.

### Extra Args

For any of the Kubernetes services, you can update the `extra_args` to change the existing defaults.

As of `v0.1.3`, using `extra_args` will add new arguments and **override** any existing defaults. For example, if you need to modify the default admission plugins list, you need to include the default list and edit it with your changes so all changes are included.

Before `v0.1.3`, using `extra_args` would only add new arguments to the list and there was no ability to change the default list.

All service defaults and parameters are defined per [`kubernetes_version`]({{<baseurl>}}/rke/latest/en/config-options/#kubernetes-version):

- For RKE v0.3.0+, the service defaults and parameters are defined per [`kubernetes_version`]({{<baseurl>}}/rke/latest/en/config-options/#kubernetes-version). The service defaults are located [here](https://github.com/rancher/kontainer-driver-metadata/blob/master/rke/k8s_service_options.go). The default list of admissions plugins is the same for all Kubernetes versions and is located [here](https://github.com/rancher/kontainer-driver-metadata/blob/master/rke/k8s_service_options.go#L11).

- For RKE before v0.3.0, the service defaults and admission plugins are defined per [`kubernetes_version`]({{<baseurl>}}/rke/latest/en/config-options/#kubernetes-version) and located [here](https://github.com/rancher/types/blob/release/v2.2/apis/management.cattle.io/v3/k8s_defaults.go). 

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
