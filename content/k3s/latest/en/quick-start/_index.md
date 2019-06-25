---
title: "Quick-Start"
weight: 1
---

There are many ways to run k3s, we cover a couple easy ways to get started in this section.
The [installation options](../installation) section will cover in greater detail how k3s can be setup.

Install Script
--------------
The k3s `install.sh` script provides a convenient way for installing to systemd or openrc,
to install k3s as a service just run:
```bash
curl -sfL https://get.k3s.io | sh -
```

A kubeconfig file is written to `/etc/rancher/k3s/k3s.yaml` and the service is automatically started or restarted.
<<<<<<< HEAD
<<<<<<< HEAD
The install script will install k3s and additional utilities, such as `kubectl`, `crictl`, `k3s-killall.sh`, and `k3s-uninstall.sh`, for example:
=======
The install script will install k3s and additional utilities, such as `kubectl`, `crictl`, `k3s-killall.sh`, and `k3s-uninstall.sh`, eg:
>>>>>>> Initial k3s docs
=======
The install script will install k3s and additional utilities, such as `kubectl`, `crictl`, `k3s-killall.sh`, and `k3s-uninstall.sh`, eg:
>>>>>>> Initial k3s docs

```bash
sudo kubectl get nodes
```

`K3S_TOKEN` is created at `/var/lib/rancher/k3s/server/node-token` on your server.
To install on worker nodes we should pass `K3S_URL` along with
<<<<<<< HEAD
<<<<<<< HEAD
`K3S_TOKEN` or `K3S_CLUSTER_SECRET` environment variables, for example:
=======
`K3S_TOKEN` or `K3S_CLUSTER_SECRET` environment variables, eg:
>>>>>>> Initial k3s docs
=======
`K3S_TOKEN` or `K3S_CLUSTER_SECRET` environment variables, eg:
>>>>>>> Initial k3s docs
```bash
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=XXX sh -
```

Manual Download
---------------
1. Download `k3s` from latest [release](https://github.com/rancher/k3s/releases/latest), x86_64, armhf, and arm64 are supported.
2. Run server.

```bash
sudo k3s server &
# Kubeconfig is written to /etc/rancher/k3s/k3s.yaml
sudo k3s kubectl get nodes

# On a different node run the below. NODE_TOKEN comes from 
# /var/lib/rancher/k3s/server/node-token on your server
sudo k3s agent --server https://myserver:6443 --token ${NODE_TOKEN}
```
