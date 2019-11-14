---
title: "Quick-Start Guide"
weight: 10
---

>**Note:** The intent of this guide is to quickly launch a cluster with default options. It is suitable for production environments if you can accept some downtime in production (e.g. on the Edge). A High-Availiability solution should be utilized if down time is not acceptable.
The [installation options](../installation) section covers in greater detail how k3s can be set up.

> New to Kubernetes? The official Kubernetes docs already have some great tutorials outlining the basics [here](https://kubernetes.io/docs/tutorials/kubernetes-basics/).

Install Script
--------------
The k3s `install.sh` script provides a convenient way for installing to systemd or openrc,
to install k3s as a service just run:
```bash
curl -sfL https://get.k3s.io | sh -
```

A kubeconfig file is written to `/etc/rancher/k3s/k3s.yaml` and the service is automatically started or restarted.
The install script will install k3s and additional utilities, such as `kubectl`, `crictl`, `ctr`, `k3s-killall.sh`, and `k3s-uninstall.sh`.

To install on worker nodes and add them to the cluster, we should pass `K3S_URL` along with the `K3S_TOKEN` environment variable. `K3S_TOKEN` is created at `/var/lib/rancher/k3s/server/node-token` on your server. Here is an example showing how to join a node:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -
```

Note: Each machine must have a unique hostname. If your machines do not have unique hostnames, pass the `K3S_NODE_NAME` environment variable and provide a value with a valid and unique hostname for each node.
