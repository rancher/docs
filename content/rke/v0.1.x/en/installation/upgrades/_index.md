---
title: Upgrades
weight: 70
draft: true
---

After RKE has deployed Kubernetes, you can upgrade the versions of the components in your Kubernetes cluster, [definition of the Kubernetes services]({{< baseurl >}}/rke/v0.1.x/en/config-options/services/) or [add-ons]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/).

## Version Upgrades

RKE supports version upgrades by changing the image tags of the [system-images]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/).

For example, to change the deployed Kubernetes version, you update the `rancher/hyperkube` tag from `v1.9.7` to `v1.10.3` in the `cluster.yml` that was originally used to deploy your Kubernetes cluster.

Original YAML

```yaml
system-images:
  kubernetes: rancher/hyperkube:v1.9.7
```

Updated YAML

```yaml
system-images:
  kubernetes: rancherhyperkube:v1.10.3
```

After updating your `cluster.yml` with the required changes, all you need to do is run `rke up` to upgrade Kubernetes.

```
$ rke up --config cluster.yml
```

First, RKE will use the local `kube_config_cluster.yml` to confirm the versions of the existing components in the Kubernetes cluster before upgrading to the latest image.

> **Note:** RKE does not support rollback to previous versions.

## Service Upgrades

[Services]({{< baseurl >}}/rke/v0.1.x/en/config-options/services/) can be upgraded by changing any of the services arguments or `extra_args` and running `rke up` again with the updated configuration file.

> **Note:** The following arguments, `service_cluster_ip_range` or `cluster_cidr`, cannot be changed as any changes to these arguments will result in a broken cluster. Currently, network pods are not automatically upgraded.

## Add-Ons Upgrades

As of v0.1.8, upgrades to add-ons are supported.

[Add-ons]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/) can also be upgraded by changing any of the add-ons and running `rke up` again with the updated configuration file.
