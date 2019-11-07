---
title: "k3s - 5 less than k8s"
shortTitle: k3s
date: 2019-02-05T09:52:46-07:00
name: "menu"
---

Lightweight Kubernetes.  Easy to install, half the memory, all in a binary less than 40mb.

Great for:

* Edge
* IoT
* CI
* ARM
* Situations where a PhD in k8s clusterology is infeasible

What is this?
---

k3s is intended to be a fully compliant Kubernetes distribution with the following changes:

1. Removed legacy and non-default features. You lilkely won't notice the
   stuff that has been removed.
2. Removed most in-tree plugins (cloud providers and storage plugins) which can be replaced
   with out of tree addons.
3. Added sqlite3 as the default storage mechanism and support for other external SQL databases such as PostgreSQL and MySQL. etcd3 is also supported as an external database.
4. Added local storage provider, service load balancer, helm-controller, and traefik ingress controller.
5. Wrapped in simple launcher that handles a lot of the complexity of TLS and options.
6. Minimal to no OS dependencies (just a sane kernel and cgroup mounts needed). k3s packages required dependencies
    * containerd
    * Flannel
    * CoreDNS
    * CNI
    * Host utilities (iptables, socat, etc)
