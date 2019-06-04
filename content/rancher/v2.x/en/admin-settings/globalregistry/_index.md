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

1. Enter in your desired configuration options. For detail instructions, follow the [Configuration Options](#configuration-options) section.

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

## Configuration Options

Field | Description | Default
----|-----------------|------------
Admin Password | The initial password of Harbor admin. Change it from Harbor UI after the registry is ready | Harbor12345
Encryption Key For Harbor | The key used for encryption. Must be a string of 16 chars | add-your-secret0
**Registry** |  | 
Storage Backend For Registry | Storage type for images: `filesystem` or `s3`. If `filesystem` is selected, persistent volume is required in your local cluster. | filesystem
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Use a storage class
Storage Class | Specify the storage class used to provision the persistent volume(A storage class is required in the local cluster to use this option) | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | 100Gi
Existing Claim | Specify the existing PVC for registry images(An existing PVC is required to use this option) | 
Registry CPU Limit | CPU limit for the docker registry workload | 1000 (milli CPUs)
Registry Memory Limit | Memory limit for the docker registry workload | 2048 (MiB)
Registry CPU Reservation | CPU reservation for the docker registry workload | 100 (milli CPUs)
Registry Memory Reservation | Memory reservation for the docker registry workload | 256 (MiB)
Registry Node Selector | Select the nodes where the docker registry workload will be scheduled to | 
**Database** |  | 
Config Database Type | Choose `internal` or `external`. When `internal` is selected, a PostgreSQL workload will be included in the application, and a persistent volume is required for it. When `external` is selected, you can configure an external PostgreSQL. You should create databases for Harbor core service, Clair and Notary before enabling.| internal
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Use a storage class
Storage Class | Specify the storage class used to provision the persistent volume(A storage class is required in the local cluster to use this option) | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | 5Gi
Existing Claim | Specify the existing PVC for PostgreSQL database(An existing PVC is required to use this option) | 
Database CPU Limit | CPU limit for the database workload | 500 (milli CPUs)
Database Memory Limit | Memory limit for the database workload | 2048 (MiB)
Database CPU Reservation | CPU reservation for the database workload | 100 (milli CPUs)
Database Memory Reservation | Memory reservation for the database workload | 256 (MiB)
Database Node Selector | Select the nodes where the database workload will be scheduled to | 
SSL Mode for PostgreSQL | SSL mode used to connect the external database | disable
Host for PostgreSQL | The hostname for external database | 
Port for PostgreSQL | The port for external database | 5432
Username for PostgreSQL | The username for external database | 
Password for PostgreSQL | The password for external database | 
Core Database | The database used by core service | registry
Clair Database | The database used by Clair | clair
Notary Server Database | The database used by Notary server | notary_server
Notary Signer Database | The database used by Notary signer | notary_signer
**Redis** |  | 
Config Redis Type | Choose `internal` or `external`. When `internal` is selected, a Redis workload will be included in the application, and a persistent volume is required for it. When `external` is selected, you can configure an external Redis. | internal
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Use a storage class
Storage Class | Specify the storage class used to provision the persistent volume(A storage class is required in the local cluster to use this option) | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | 5Gi
Existing Claim | Specify the existing PVC for Redis(An existing PVC is required to use this option) | 
Redis CPU Limit | CPU limit for the Redis workload | 500 (milli CPUs)
Redis Memory Limit | Memory limit for the Redis workload | 2048 (MiB)
Redis CPU Reservation | CPU reservation for the Redis workload | 100 (milli CPUs)
Redis Memory Reservation | Memory reservation for the Redis workload | 256 (MiB)
Redis Node Selector | Select the nodes where the Redis workload will be scheduled to | 
Host for Redis | The hostname for external Redis | 
Port for Redis | The port for external Redis | 6379
Password for Redis | The password for external Redis | 
Core Database Index | The database index for core service | 
Jobservice Database Index | The database index for jobservice | 
Registry Database Index | The database index for docker registry | 
**Clair** |  | 
Enable Clair | Whether or not to enable Clair for vulnerabilities scanning | true
Clair CPU Limit | CPU limit for the Clair workload | 500 (milli CPUs)
Clair Memory Limit | Memory limit for the Clair workload | 2048 (MiB)
Clair CPU Reservation | CPU reservation for the Clair workload | 100 (milli CPUs)
Clair Memory Reservation | Memory reservation for the Clair workload | 256 (MiB)
Clair Node Selector | Select the nodes where the Clair workload will be scheduled to | 
**Notary** |  | 
Enable Notary | Whether or not to enable Notary for [Docker Content Trust](https://docs.docker.com/engine/security/trust/content_trust/). When enabled, the access endpoint to the Notary server is `<Rancher-Server-URL>/registry/notary`. | true
Notary CPU Limit | CPU limit for the Notary workload | 500 (milli CPUs)
Notary Memory Limit | Memory limit for the Notary workload | 2048 (MiB)
Notary CPU Reservation | CPU reservation for the Notary workload | 100 (milli CPUs)
Notary Memory Reservation | Memory reservation for the Notary workload | 256 (MiB)
Notary Node Selector | Select the nodes where the Notary workload will be scheduled to | 