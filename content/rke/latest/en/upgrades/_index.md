---
title: Upgrades
weight: 100
---

After RKE has deployed Kubernetes, you can upgrade the versions of the components in your Kubernetes cluster, [definition of the Kubernetes services]({{< baseurl >}}/rke/latest/en/config-options/services/) or [add-ons]({{< baseurl >}}/rke/latest/en/config-options/add-ons/).

## Kubernetes Version Upgrades

You can use RKE to upgrade the Kubernetes version of clusters previously deployed via RKE. There are two methods of specifying the Kubernetes version to upgrade to:
- By specifying the [`kubernetes_version`](({{< baseurl >}}/rke/latest/en/config-options/#kubernetes-version)) configuration in the `cluster.yml`. This is the recommended option, as RKE will then select the appropriate set of cluster component images for that Kubernetes version.
- By specifying the [`system_images`]({{< baseurl >}}/rke/latest/en/config-options/system-images/) configuration in the `cluster.yml`. This enables fine-grained control of the image version for each component, but is not recommended for the majority of use cases, as it requires the user to manually configure each component image, and could result in running with images in an un-tested combination.

> **Note:** In case both `kubernetes_version` and `system_images` are defined, the `system_images` configuration will take precedence over `kubernetes_version`. In addition, if neither `kubernetes_version` nor `system_images` are configured in the `cluster.yml`, RKE will apply the default Kubernetes version for the specific version of RKE used to invoke `rke up`. The default Kubernetes version for each RKE version can be found in [the RKE release notes](https://github.com/rancher/rke/releases/).

It is important to ensure that the correct files to manage [Kubernetes cluster state]({{< baseurl >}}/rke/latest/en/installation/#kubernetes-cluster-state) are present in the working directory when invoking `rke up` to upgrade the cluster.
- In v0.1.x, RKE saved the Kubernetes cluster state as a secret. When updating the state, RKE pulls the secret, updates/changes the state and saves a new secret. When upgrading a cluster last managed via RKE v0.1.x you should ensure the `kube_config_cluster.yml` file is present in the working directory when invoking `rke up`.
- As of v0.2.0, RKE creates a `.rkestate` file in the same directory that has the cluster configuration file `cluster.yml`. The `.rkestate` file contains the current state of the cluster including the RKE configuration and the certificates. It is required to keep this file in order to update the cluster or perform any operation on it through RKE. When upgrading a cluster last managed via RKE v0.2.0 or later, you should ensure the `cluster.rkestate` file is present in the working directory when invoking `rke up`.

> **Note:** RKE does not support rollback to previous versions.

### Upgrading using kubernetes_version

To upgrade the Kubernetes version using [`kubernetes_version`]({{< baseurl >}}/rke/latest/en/config-options/#kubernetes-version), set the `kubernetes_version` string in the `cluster.yml` to the desired version from the list of supported Kubernetes versions for the specific version of RKE. The list of supported Kubernetes versions for each RKE version can be found in [the RKE release notes](https://github.com/rancher/rke/releases/).

```yaml
kubernetes_version: "v1.15.5-rancher1-1"
```

Having configured the `kubernetes_version`, ensure that any `system_images` configuration is absent from the `cluster.yml`, and then invoke `rke up` to upgrade `Kubernetes`.

```
$ rke up --config cluster.yml
```

### Upgrading using system_images

RKE supports version upgrades by changing the image tags of the [system-images]({{< baseurl >}}/rke/latest/en/config-options/system-images/).

For example, to change the deployed Kubernetes version, you update the `rancher/hyperkube` tag from `v1.9.7` to `v1.10.3` in the `cluster.yml` that was originally used to deploy your Kubernetes cluster.

Original YAML

```yaml
system_images:
    kubernetes: rancher/hyperkube:v1.9.7
```

Updated YAML

```yaml
system_images:
    kubernetes: rancher/hyperkube:v1.10.3
```

After updating your `cluster.yml` with the required changes, all you need to do is run `rke up` to upgrade Kubernetes.

```
$ rke up --config cluster.yml
```

## Service Upgrades

[Services]({{< baseurl >}}/rke/latest/en/config-options/services/) can be upgraded by changing any of the services arguments or `extra_args` and running `rke up` again with the updated configuration file.

> **Note:** The following arguments, `service_cluster_ip_range` or `cluster_cidr`, cannot be changed as any changes to these arguments will result in a broken cluster. Currently, network pods are not automatically upgraded.

## Add-Ons Upgrades

As of v0.1.8, upgrades to add-ons are supported.

[Add-ons]({{< baseurl >}}/rke/latest/en/config-options/add-ons/) can also be upgraded by changing any of the add-ons and running `rke up` again with the updated configuration file.
