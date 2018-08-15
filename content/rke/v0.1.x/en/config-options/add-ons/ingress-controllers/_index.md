---
title: Ingress Controllers
weight: 262
---

By default, RKE deploys the nginx ingress controller on all schedulable nodes.

> **Note:** As of v0.1.8, only workers are considered schedulable nodes, but prior to v0.1.8, worker and controlplane nodes were considered schedulable nodes.  

RKE will deploy the ingress controller as a DaemonSet with `hostnetwork: true`, so ports `80`, and `443` will be opened on each node where the controller is deployed.

The images used for ingress controller is under the [`system_images` directive]({< baseurl >}}/rke/v0.1.x/en/config-options/system-images/). For each Kubernetes version, there are default images associated with the ingress controller, but these can be overridden by changing the image tag in `system_images`.

## Scheduling Ingress Controllers

If you only wanted ingress controllers to be deployed on specific nodes, you can set a `node_selector` for the ingress. The label in the `node_selector` would need to match the label on the nodes for the ingress controller to be deployed.

```yaml
nodes:
    - address: 1.1.1.1
      role: [controlplane,worker,etcd]
      user: root
      labels:
        app: ingress

ingress:
    provider: nginx
    node_selector:
      app: ingress
```

## Disabling the Default Ingress Controller

You can disable the default controller by specifying `none` to  the ingress `provider` directive in the cluster configuration.

```yaml
ingress:
    provider: none
```
## Configuring NGINX Ingress Controller

For the configuration of nginx, there are configuration options available in Kubernetes. There are a [list of options for the NGINX config map](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/configmap.md) , [command line extra_args](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/cli-arguments.md) and [annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/).

```yaml
ingress:
    provider: nginx
    options:
      map-hash-bucket-size: "128"
      ssl-protocols: SSLv2
    extra_args:
      enable-ssl-passthrough: ""
```
