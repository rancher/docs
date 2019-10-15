---
title: "Quick-Start Guide"
weight: 1
---

>**Note:** The intent of this guide is to quickly launch a cluster that you can use to evaluate K3S. This guide is not intended for production environments. Production environments should utilize a High-Availability solutuion. The [installation options](../installation) section covers in greater detail how K3S can be setup.

Install Script
--------------
The k3s `install.sh` script provides a convenient way for installing to systemd or openrc,
to install k3s as a service just run:
```bash
curl -sfL https://get.k3s.io | sh -
```

A kubeconfig file is written to `/etc/rancher/k3s/k3s.yaml` and the service is automatically started or restarted.
The install script will install k3s and additional utilities, such as `kubectl`, `crictl`, `ctr`, `k3s-killall.sh`, and `k3s-uninstall.sh`.

To install on worker nodes and add them to the cluster, we should pass `K3S_URL` along with `K3S_TOKEN` or `K3S_CLUSTER_SECRET` environment variables. `K3S_TOKEN` is created at `/var/lib/rancher/k3s/server/node-token` on your server. Here is an example showing how to join a node:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=XXX sh -
```

Note: Each machine must have a unique hostname. If your machines do not have unique hostnames, pass the `K3S_NODE_NAME` environment variable and provide a value with a valid and unique hostname for each node.
