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

Before setting up Global Registry, you should set up databases for the Harbor registry and data. You need internal or external storage for the images, Postgres for metadata, and Redis for the cache. For more information on configuring the storage, refer to the [Configuration Options]({{< baseurl >}}/rancher/v2.x/en/admin-settings/globalregistry/harbor/).

There prerequisites are different depending on whether you use `internal` or `external` storage. A database is considered `internal` if Redis or a local database instance will be deployed in the local cluster, whereas `external` storage is outside the local cluster. When using the `internal` type of storage, the databases are deployed together with Harbor in the same app.

- **Requirements for `internal` storage:** [Persistent volumes]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/) are required in the local cluster if you use `filesystem` type for Docker registry storage. For instructions on how to add a persistent volume, refer to [Adding Persistent Volumes]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/#adding-persistent-volumes).
- **Requirements for `external` storage:** If you use an `external` database, you need to create databases in PostgreSQL before registry deployment. You can configure which databases to use in the configuration options.

> **Note:** It is not recommended to use NFS (network file system) for setting up a persistent volume because it can [cause problems with Postgres](https://www.postgresql.org/docs/9.1/creating-cluster.html#CREATING-CLUSTER-NFS).

### Setting Up Persistent Volumes on the Cloud

If your high-availability installation is on a cloud and your persistent volumes will also be on the cloud, you need to set your cloud provider when installing Kubernetes on your cluster. Persistent volumes will be created by your storage class if you specify your cloud provider in `cluster.yml.` Below is an example of a `cluster.yml` cluster config file with a cloud provider specified:

```
nodes:
  - address: <Public IP>
    internal_address: <Private IP>
    user: ubuntu
    role: [controlplane,worker,etcd]
  - address: <Public IP>
    internal_address: <Private IP>
    user: ubuntu
    role: [controlplane,worker,etcd]
  - address: <Public IP>
    internal_address: <Private IP>
    user: ubuntu
    role: [controlplane,worker,etcd]
    ssh_key_path: 

cloud_provider:
    name: aws

services:
  etcd:
    snapshot: true
    creation: 6h
    retention: 24h
```

For more information on how to set your specific cloud provider for your Kubernetes cluster, refer to the RKE documentation on [Cloud Providers]({{< baseurl >}}/rke/latest/en/config-options/cloud-providers/).

## Enabling Global Registry

As an [administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/), you can configure Rancher to deploy the Global Registry.

1. From the **Global** view, select **Tools > Global Registry** from the main menu.

1. Configure the Global Registry. At a minimum, you will enter a Harbor admin password, a Harbor encryption key, and a storage type. If the databases are already set up, and you have created a default storage class, Rancher can use default options for the rest of the configuration. For more information on setting up the database, Redis, Clair, and Notary, refer to the [Configuration Options]({{< baseurl >}}/rancher/v2.x/en/admin-settings/globalregistry/harbor/).

1. Click **Save**.

**Result:** A Harbor instance will be deployed as an [application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) named `global-registry-harbor` to local cluster's `system` project. Harbor then acts as a Kubernetes private registry and you can pull images from it with Docker commands.

### Test if Global Registry is Enabled

In the **Apps** tab, in the local cluster's `system` project, you should be able to see the nodes running the `global-registry` workloads.

You should also be able to see the Harbor UI if you go to `<Rancher server URL>/registry.`

## Disabling Global Registry

To disable the Global Registry:

1. From the **Global** view, select **Tools > Global Registry** from the main menu.

1. Click **Disable registry**, then click the red button again to confirm the disable action.

> **Result:** The `global-registry-harbor` application in local cluster's `system` project gets removed. 

### Manual Cleanup

The persistent volumes used by the Global Registry will not be removed on disabling, in order to prevent the images and metadata in the persistent volumes from being lost. You need to manually delete relevant volumes in local cluster's `system` project if you want to clean them up.

## Using Global Registry

Once the Global Registry is enabled, you can:

- Use Global Registry as a private registry in Rancher projects. You should be able to log in to the registry, pull an image, tag an image, and push an image to the registry using the Docker commands listed at `<your Rancher server URL>/g/global-registry`. For more information about private registries, see [how to use registries]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/registries/). 

- Access the Harbor UI through the endpoint `<Rancher-Server-URL>/registry`.

- Use the Rancher server hostname as the registry hostname in image names. For example:
 ```
 docker pull <Rancher-Server-Hostname>/library/busybox:latest
 ```

- Access the Notary server if Notary is enabled. The endpoint for the Notary server is `<Rancher-Server-URL>/registry/notary`.

For more information on how to manage images with Harbor, refer to the [Harbor user guide](https://github.com/goharbor/harbor/blob/master/docs/user_guide.md).

### Harbor Authentication

The authentication of Harbor is independent of Rancher authentication. For registry account management, log in to Harbor UI and manage Harbor users.

### Accessing a Private Registry Without a Secure Connection

When you access a private registry in Docker, if your connection is not secure, you could get an error that says `x509: certificate signed by unknown authority.` You can connect if you add a security exception to Docker:

1. Open the Docker UI.
1. Go to **Preferences.**
1. Add your Rancher server URL to the **Insecure registries** list.
1. Click **Apply & Restart.**

> **Result:** You should be able to log in to the private registry and pull images using Docker commands.