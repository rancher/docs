---
title: "Upgrades"
weight: 25
---

This section describes how to upgrade your K3s cluster.

[Upgrade basics]({{< baseurl >}}/k3s/latest/en/upgrades/basic/) describes several techniques for upgrading your cluster manually. It can also be used as a basis for upgrading through third-party Infrastructure-as-Code tools like [Terraform](https://www.terraform.io/).

[Automated upgrades]({{< baseurl >}}/k3s/latest/en/upgrades/automated/) describes how to perform Kubernetes-native automated upgrades using Rancher's [system-upgrade-controller](https://github.com/rancher/system-upgrade-controller).

> The experimental embedded Dqlite data store was deprecated in K3s v1.19.1. Please note that upgrades from experimental Dqlite to experimental embedded etcd are not supported. If you attempt an upgrade it will not succeed and data will be lost.