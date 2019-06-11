---
title: Global Registry
weight: 1145
---

_Available as of v2.3.0_

Rancher's Global Registry provides a way to set up a [Harbor](https://github.com/goharbor/harbor) registry to store and manage your Docker images. Harbor is an open source cloud native registry that manages and serves container images in a secure environment.

Before users can pull images from a global registry, an admin needs to enable the registry in the Rancher UI.

Global Registry is only available in [HA setups]({{< baseurl >}}/rancher/v2.x/en/installation/ha/) with the [`local` cluster enabled]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#import-local-cluster).

After you enable Global Registry, you can:

- Use Global Registry as a private registry in Rancher projects. For more information, see [how to use registries]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/registries/). You would use the Rancher server URL as the domain name when using the private registry. 
- Access the Harbor UI through an endpoint on your Rancher server
- Pull Docker images from the Global Registry and deploy the workloads in a project
- Control access to Docker images using Harbor authentication
- Ensure content trust using Docker Notary (optional)
- Scan images for vulnerability using Clair (optional)

## SSL Certificates

The Global Registry reuses the same SSL certificate of Rancher server so you don't need to prepare additional certificates for it. The CA root certificate is added to every node of managed kubernetes clusters. Therefore, in the case where you're using a private certificate authority, you can use images from the Global Registry without additional configuration of the Docker daemon on cluster nodes.

## Prerequisites

Before setting up Global Registry, you should set up databases for the Harbor registry and data. For more information, refer to the [Configuration Options]({{< baseurl >}}/rancher/v2.x/en/admin-settings/globalregistry/harbor/).

There prerequisites are different depending on whether you use `internal` or `external` storage. A database is considered `internal` if Redis or a local database instance will be deployed in the local cluster, whereas `external` storage is outside the local cluster. When using the `internal` type of storage, the databases are deployed together with Harbor in the same app.

- **Requirements for `internal` storage:** [Persistent volumes]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/) are required in the local cluster if you use `filesystem` type for Docker registry storage. For instructions on how to add a persistent volume, refer to [Adding Persistent Volumes]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#import-local-cluster).
- **Requirements for `external` storage:** If you use an `external` database, you need to create databases in PostgreSQL before registry deployment. You can configure which databases to use in the configuration options.

## Enabling Global Registry

As an [administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/), you can configure Rancher to deploy the Global Registry.

1. From the **Global** view, select **Tools > Global Registry** from the main menu.

1. At a minimum, you will enter a Harbor admin password, a Harbor encryption key, and a storage type. If the databases are already set up, Rancher can use default options for the rest of the configuration. For more information on setting up the database, Redis, Clair, and Notary, refer to the [Configuration Options]({{< baseurl >}}/rancher/v2.x/en/admin-settings/globalregistry/harbor/).

1. Click **Save**.

**Result:** A Harbor instance will be deployed as an [application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) named `global-registry-harbor` to local cluster's `system` project. In the **Apps** tab, you can see the nodes running `global-registry` workloads. Harbor then acts as a Kubernetes private registry and you can pull images from it with Docker commands.

## Disabling Global Registry

To disable the Global Registry:

1. From the **Global** view, select **Tools > Global Registry** from the main menu.

1. Click **Disable registry**, then click the red button again to confirm the disable action.

**Result:** The `global-registry-harbor` application in local cluster's `system` project gets removed. Note that persistent volumes used by the Global Registry will not be removed on disabling, in order to prevent the images and metadata in the persistent volumes from being lost. You need to manually delete relevant volumes in local cluster's `system` project if you want to clean them up.

## Using Global Registry

Once the Global Registry is enabled, you can:

- Use Global Registry as a private registry in Rancher projects. For more information, see [how to use registries]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/registries/). 

- Access the Harbor UI through the endpoint `<Rancher-Server-URL>/registry`.

- Use the Rancher server hostname as the registry hostname in image names. For example:
 ```
 docker pull <Rancher-Server-Hostname>/library/busybox:latest
 ```

- Access the Notary server if Notary is enabled. The endpoint for the Notary server is `<Rancher-Server-URL>/registry/notary`.

> **Note:** The authentication of Harbor is independent of Rancher authentication. For registry account management, log in to Harbor UI and manage Harbor users.
