---
title: Upgrades
weight: 100
---

After RKE has deployed Kubernetes, you can upgrade the versions of the components in your Kubernetes cluster, the [definition of the Kubernetes services]({{<baseurl>}}/rke/latest/en/config-options/services/) or the [add-ons]({{<baseurl>}}/rke/latest/en/config-options/add-ons/).

The default Kubernetes version for each RKE version can be found in the release notes accompanying [the RKE download](https://github.com/rancher/rke/releases/). RKE v1.x should be used.

You can also select a newer version of Kubernetes to install for your cluster.

Each version of RKE has a specific [list of supported Kubernetes versions.](#listing-supported-kubernetes-versions)

In case the Kubernetes version is defined in the `kubernetes_version` directive and under the `system-images` directive, the `system-images` configuration will take precedence over the `kubernetes_version`.

This page covers the following topics:

- [How upgrades work](#how-upgrades-work)
- [Prerequisites](#prerequisites)
- [Upgrading Kubernetes](#upgrading-kubernetes)
- [Configuring the upgrade strategy](#configuring-the-upgrade-strategy)
- [Maintaining availability for applications during upgrades](#maintaining-availability-for-applications-during-upgrades)
- [Listing supported Kubernetes versions](#listing-supported-kubernetes-versions)
- [Kubernetes version precedence](#kubernetes-version-precedence)
- [Using an unsupported Kubernetes version](#using-an-unsupported-kubernetes-version)
- [Mapping the Kubernetes version to services](#mapping-the-kubernetes-version-to-services)
- [Service upgrades](#service-upgrades)
- [Upgrading Nodes Manually](#upgrading-nodes-manually)
- [Rolling Back the Kubernetes Version](#rolling-back-the-kubernetes-version)
- [Troubleshooting](#troubleshooting)

### How Upgrades Work

In [this section,]({{<baseurl>}}/rke/latest/en/upgrades/how-upgrades-work) you'll learn what happens when you edit or upgrade your RKE Kubernetes cluster.

### Prerequisites

- Ensure that any `system_images` configuration is absent from the `cluster.yml`. The Kubernetes version should only be listed under the `system_images` directive if an [unsupported version](#using-an-unsupported-kubernetes-version) is being used. Refer to [Kubernetes version precedence](#kubernetes-version-precedence) for more information.
- Ensure that the correct files to manage [Kubernetes cluster state]({{<baseurl>}}/rke/latest/en/installation/#kubernetes-cluster-state) are present in the working directory. Refer to the tabs below for the required files, which differ based on the RKE version.

{{% tabs %}}
{{% tab "RKE v0.2.0+" %}}
The `cluster.rkestate` file contains the current state of the cluster including the RKE configuration and the certificates.

This file is created in the same directory that has the cluster configuration file `cluster.yml`.

It is required to keep the `cluster.rkestate` file to perform any operation on the cluster through RKE, or when upgrading a cluster last managed via RKE v0.2.0 or later.
{{% /tab %}}
{{% tab "RKE before v0.2.0" %}}
Ensure that the `kube_config_cluster.yml` file is present in the working directory.

RKE saves the Kubernetes cluster state as a secret. When updating the state, RKE pulls the secret, updates or changes the state, and saves a new secret. The `kube_config_cluster.yml` file is required for upgrading a cluster last managed via RKE v0.1.x.
{{% /tab %}}
{{% /tabs %}}

### Upgrading Kubernetes

To upgrade the Kubernetes version of an RKE-provisioned cluster, set the `kubernetes_version` string in the `cluster.yml` to the desired version from the [list of supported Kubernetes versions](#listing-supported-kubernetes-versions) for the specific version of RKE:

```yaml
kubernetes_version: "v1.15.5-rancher1-1"
```

Then invoke `rke up`:

```
$ rke up --config cluster.yml
```

### Configuring the Upgrade Strategy

As of v0.1.8, upgrades to add-ons are supported. [Add-ons]({{<baseurl>}}/rke/latest/en/config-options/add-ons/) can also be upgraded by changing any of the add-ons and running `rke up` again with the updated configuration file.

As of v1.1.0, additional upgrade options became available to give you more granular control over the upgrade process. These options can be used to maintain availability of your applications during a cluster upgrade.

For details on upgrade configuration options, refer to [Configuring the Upgrade Strategy.]({{<baseurl>}}/rke/latest/en/upgrades/configuring-strategy)

### Maintaining Availability for Applications During Upgrades

In [this section,]({{<baseurl>}}/rke/latest/en/upgrades/maintaining-availability/) you'll learn the requirements to prevent downtime for your applications when you upgrade the cluster using `rke up`.

### Listing Supported Kubernetes Versions

Please refer to the [release notes](https://github.com/rancher/rke/releases) of the RKE version that you are running, to find the list of supported Kubernetes versions as well as the default Kubernetes version. Note: RKE v1.x should be used.

You can also list the supported versions and system images of specific version of RKE release with a quick command.

```
$ rke config --list-version --all
v1.15.3-rancher2-1
v1.13.10-rancher1-2
v1.14.6-rancher2-1
v1.16.0-beta.1-rancher1-1
```

### Kubernetes Version Precedence

In case both `kubernetes_version` and `system_images` are defined, the `system_images` configuration will take precedence over `kubernetes_version`.

In addition, if neither `kubernetes_version` nor `system_images` are configured in the `cluster.yml`, RKE will apply the default Kubernetes version for the specific version of RKE used to invoke `rke up`.

### Using an Unsupported Kubernetes Version

As of v0.2.0, if a version is defined in `kubernetes_version` and is not found in the specific list of supported Kubernetes versions, then RKE will error out.

Before v0.2.0, if a version is defined in `kubernetes_version` and is not found in the specific list of supported Kubernetes versions,  the default version from the supported list is used.

If you want to use a different version from the supported list, please use the [system images]({{<baseurl>}}/rke/latest/en/config-options/system-images/) option.

### Mapping the Kubernetes Version to Services

In RKE, `kubernetes_version` is used to map the version of Kubernetes to the default services, parameters, and options.

For RKE v0.3.0+, the service defaults are located [here](https://github.com/rancher/kontainer-driver-metadata/blob/master/rke/k8s_service_options.go).

For RKE before v0.3.0, the service defaults are located [here](https://github.com/rancher/types/blob/release/v2.2/apis/management.cattle.io/v3/k8s_defaults.go). Note: The version in the path of the service defaults file corresponds to a Rancher version. Therefore, for Rancher v2.1.x, [this file](https://github.com/rancher/types/blob/release/v2.1/apis/management.cattle.io/v3/k8s_defaults.go) should be used.

### Service Upgrades

[Services]({{<baseurl>}}/rke/latest/en/config-options/services/) can be upgraded by changing any of the services arguments or `extra_args` and running `rke up` again with the updated configuration file.

> **Note:** The following arguments, `service_cluster_ip_range` or `cluster_cidr`, cannot be changed as any changes to these arguments will result in a broken cluster. Currently, network pods are not automatically upgraded.

### Upgrading Nodes Manually

_Available as of v1.1.0_

You can manually update each type of node separately. As a best practice, upgrade the etcd nodes first, followed by controlplane and then worker nodes.

### Rolling Back the Kubernetes Version

_Available as of v1.1.0_

A cluster can be restored back to a snapshot that uses a previous Kubernetes version.

### Troubleshooting

_Applies to v1.1.0+_

If a node doesn't come up after an upgrade, the `rke up` command errors out.

No upgrade will proceed if the number of unavailable nodes exceeds the configured maximum.

If an upgrade stops, you may need to fix an unavailable node or remove it from the cluster before the upgrade can continue.

A failed node could be in many different states:

- Powered off
- Unavailable
- User drains a node while upgrade is in process, so there are no kubelets on the node
- The upgrade itself failed

Some expected failure scenarios include the following:

- If the maximum unavailable number of nodes is reached during an upgrade, the RKE CLI will error out and exit the CLI with a failure code.
- If some nodes fail to upgrade, but the number of failed nodes doesn't reach the maximum unavailable number of nodes, the RKE CLI logs the nodes that were unable to upgrade and continues to upgrade the add-ons. After the add-ons are upgraded, RKE will error out and exit the CLI with a failure code regardless of add-on upgrade status.