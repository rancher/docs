---
title: Upgrades
weight: 1000
draft: true
---

You can upgrade your Kubernetes cluster or upgrade any of the service arguments.

## Cluster Upgrade

RKE supports kubernetes cluster upgrade through changing the image version of services, in order to do that change the image option for each services, for example:

```yaml
image: rancher/hyperkube:v1.9.7
```

TO

```yaml
image: rancher/hyperkube:v1.10.1
```

And then run:

```bash
rke up --config cluster.yml
```

RKE will first look for the local `kube_config_cluster.yml` and then tries to upgrade each service to the latest image.

> Note that rollback isn't supported in RKE and may lead to unxpected results

## Service Upgrade

Service can also be upgraded by changing any of the services arguments or extra args and run `rke up` again with the updated configuration file.

> Please note that changing the following arguments: `service_cluster_ip_range` or `cluster_cidr` will result in a broken cluster, because currently the network pods will not be automatically upgraded.
