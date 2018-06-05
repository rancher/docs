---
title: Ingress Controller
weight: 3000
draft: true
---


RKE will deploy Nginx controller by default, user can disable this by specifying `none` to ingress `provider` option in the cluster configuration, user also can specify list of options for nginx config map listed in this [doc](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/configmap.md), and command line extra_args listed in this [doc](https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/cli-arguments.md), for example:
```
ingress:
  provider: nginx
  options:
    map-hash-bucket-size: "128"
    ssl-protocols: SSLv2
  extra_args:
    enable-ssl-passthrough: ""
```
By default, RKE will deploy ingress controller on all schedulable nodes (controlplane and workers), to specify only certain nodes for ingress controller to be deployed, user has to specify `node_selector` for the ingress and the right label on the node, for example:
```
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

RKE will deploy Nginx Ingress controller as a DaemonSet with `hostnetwork: true`, so ports `80`, and `443` will be opened on each node where the controller is deployed.
