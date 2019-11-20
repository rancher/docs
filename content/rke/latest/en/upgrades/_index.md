---
title: Upgrades
weight: 100
---

After RKE has deployed Kubernetes, you can upgrade the versions of the components in your Kubernetes cluster, [definition of the Kubernetes services]({{< baseurl >}}/rke/latest/en/config-options/services/) or [add-ons]({{< baseurl >}}/rke/latest/en/config-options/add-ons/).

## Kubernetes Version Upgrades

To upgrade the Kubernetes version of an RKE provisioned cluster set the `kubernetes_version` string in the `cluster.yml` to the desired version from the list of supported Kubernetes versions for the specific version of RKE. You can find the list of supported Kubernetes versions for a specific version of RKE as documented at [Listing Supported Kubernetes Versions]({{< baseurl >}}/rke/latest/en/config-options/#listing-supported-kubernetes-versions.).

```yaml
kubernetes_version: "v1.15.5-rancher1-1"
```

> **Note:** RKE does not support rollback to previous versions.

> **Note:** In case both `kubernetes_version` and `system_images` are defined, the `system_images` configuration will take precedence over `kubernetes_version`. In addition, if neither `kubernetes_version` nor `system_images` are configured in the `cluster.yml`, RKE will apply the default Kubernetes version for the specific version of RKE used to invoke `rke up`. The default Kubernetes version for each RKE version can be found in [the RKE release notes](https://github.com/rancher/rke/releases/).

Having configured the `kubernetes_version`, ensure that any `system_images` configuration is absent from the `cluster.yml`, and then invoke `rke up` to upgrade `Kubernetes`.

It is important to ensure that the correct files to manage [Kubernetes cluster state]({{< baseurl >}}/rke/latest/en/installation/#kubernetes-cluster-state) are present in the working directory when invoking `rke up` to upgrade the cluster.
- In v0.1.x, RKE saved the Kubernetes cluster state as a secret. When updating the state, RKE pulls the secret, updates/changes the state and saves a new secret. When upgrading a cluster last managed via RKE v0.1.x you should ensure the `kube_config_cluster.yml` file is present in the working directory when invoking `rke up`.
- As of v0.2.0, RKE creates a `cluster.rkestate` file in the same directory that has the cluster configuration file `cluster.yml`. The `cluster.rkestate` file contains the current state of the cluster including the RKE configuration and the certificates. It is required to keep this file in order to update the cluster or perform any operation on it through RKE. When upgrading a cluster last managed via RKE v0.2.0 or later, you should ensure the `cluster.rkestate` file is present in the working directory when invoking `rke up`.

```
$ rke up --config cluster.yml
```

## Service Upgrades

[Services]({{< baseurl >}}/rke/latest/en/config-options/services/) can be upgraded by changing any of the services arguments or `extra_args` and running `rke up` again with the updated configuration file.

> **Note:** The following arguments, `service_cluster_ip_range` or `cluster_cidr`, cannot be changed as any changes to these arguments will result in a broken cluster. Currently, network pods are not automatically upgraded.

## Add-Ons Upgrades

As of v0.1.8, upgrades to add-ons are supported.

[Add-ons]({{< baseurl >}}/rke/latest/en/config-options/add-ons/) can also be upgraded by changing any of the add-ons and running `rke up` again with the updated configuration file.
