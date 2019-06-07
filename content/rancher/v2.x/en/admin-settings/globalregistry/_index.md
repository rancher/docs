---
title: Global Registry
weight: 1145
---

_Available as of v2.3.0_

Rancher's Global Registry provides a way to set up a [Harbor](https://github.com/goharbor/harbor) registry to store and manage your docker images. The Global Registry reuses the same SSL certificate of Rancher server so you don't need to prepare additional certificates for it. The CA root certificate is added to every node of managed kubernetes clusters. Therefore, in the case where you're using a private certificate authority, you can use images from the Global Registry without additional configuration of the docker daemon on cluster nodes.

> **Note:** Global Registry is only available in [HA setups]({{< baseurl >}}/rancher/v2.x/en/installation/ha/) with the [`local` cluster enabled]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#import-local-cluster).

## Prerequisites

Depending on the configuration options you use, check the following prerequisites before enabling Global Registry:

- If you use `filesystem` type for docker registry storage, or use `internal` type database or Redis, [persistent volumes]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/) are required in the local cluster.
- If you use `external` type database, you need to create databases in PostgreSQL before registry deployment. You can configure which databases to use in the configuration options.

## Enabling Global Registry

As an [administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/), you can configure Rancher to deploy the Global Registry.

1. From the **Global** view, select **Tools > Global Registry** from the main menu.

1. Enter in your desired configuration options. For detail instructions, follow the [Configuration Options]({{< baseurl >}}/rancher/v2.x/en/admin-settings/globalregistry/harbor/) section.

1. Click **Save**.

**Result:** A Harbor instance will be deployed as an [application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) named `global-registry-harbor` to local cluster's `system` project.

## Disabling Global Registry

To disable the Global Registry:

1. From the **Global** view, select **Tools > Global Registry** from the main menu.

1. Click **Disable registry**, then click the red button again to confirm the disable action.

**Result:** The `global-registry-harbor` application in local cluster's `system` project gets removed. Note that persistent volumes used by the Global Registry will not be removed on disabling, so as to prevent data lost. You need to manually delete relevant volumes in local cluster's `system` project if you want to clean them up.

## Using Global Registry

Once the Global Registry is enabled, you can:

1. Access Harbor UI through the endpoint `<Rancher-Server-URL>/registry`.

1. Use the Rancher server hostname as the registry hostname in image names. For example:
 ```
 docker pull <Rancher-Server-Hostname>/library/busybox:latest
 ```

1. If Notary is enabled, the endpoint for notary server is `<Rancher-Server-URL>/registry/notary`.

1. Use Global Registry as a private registry in Rancher projects, see [how to use registries]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/registries/).

> **Notes:**
>
>- The authentication of Harbor is independent of Rancher authentication, you should log in to Harbor UI and manage Harbor users for registry account management.
