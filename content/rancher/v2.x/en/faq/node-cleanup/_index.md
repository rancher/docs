---
title: Node Cleanup
weight: 100
---

Whenever possible, we recommend creating fresh new instances when you need to recreate or add nodes to a cluster.

In cases where creating new instances or re-imaging servers is not practical, you can use this procedure to reuse and clean out the old configurations and containers.

Run the following commands as `root` to clean off existing configurations on nodes you want to reuse.

> **WARNING:** Running these commands will destroy all Docker containers, volumes and Rancher/Kubernetes configuration on this node. Use this procedure with caution.

```
docker rm -fv $(docker ps -qa)
docker volume ls -q | xargs docker volume rm
rm -rf /etc/kubernetes/ssl
rm -rf /etc/kubernetes/.tmp
rm -rf /var/lib/etcd
rm -rf /etc/cni
rm -rf /etc/kube-flannel/
reboot
```

> **IMPORTANT:** Failure to run these commands and reboot will result in a failed or inconsistent re-installation of Kubernetes on these nodes. Make sure you reboot to clear any residual network configuration.
