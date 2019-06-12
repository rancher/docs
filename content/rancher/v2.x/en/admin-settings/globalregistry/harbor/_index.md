---
title: Global Registry Configuration
weight: 1
---

_Available as of v2.3.0-alpha_

While setting up Global Registry, you need to configure the credentials and storage options for Harbor.

At a minimum, the admin needs to configure a Harbor admin password, a Harbor encryption key, and a storage type. If the databases are already set up, and you have created a default storage class, Rancher can use default options for the rest of the configuration.

The Global Registry needs databases for the Harbor registry and data. It needs `internal` or `external` storage for storing:

- Docker images
- A Postgres database for the metadata (only Postgres is supported)
- Redis for the cache

If you plan to use Clair for image vulnerability scanning, or a Notary server to verify the origin of images, you should also set up those databases before enabling Global Registry.

Each configuration option maps to a field of a Kubernetes [workload]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/), [ConfigMap]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/configmaps) or [secret]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/secrets). When you change an option, it only affects the workload that uses that option.

To specify the workload that uses each configuration option, you can add a node selector in the UI to match the labels which you added in a node. Then the workload will be deployed to that node. If you don't select a node, Rancher will select a node by default.

You can configure each aspect of the Harbor registry:

- **General:** Set admin credentials and encryption
- **Registry:** Set basic Harbor registry storage options
- **Database:** Configure Harbor database
- **Redis:** Configure the cache layer
- **Clair:** Scan images for vulnerabilities with Clair
- **Notary:** Verify the integrity and origin of images with Notary


## Persistent Volumes in Cloud Clusters

If your high-availability installation is in the cloud infrastructure provider and your persistent volumes will also be in the cloud, you must set your cloud provider when installing Kubernetes on your cluster that is running the Rancher server. Persistent volumes will be created by your storage class if you specify your cloud provider in `cluster.yml.`

For more information on how to set your specific cloud provider for your Kubernetes cluster, refer to the RKE documentation on [Cloud Providers]({{< baseurl >}}/rke/latest/en/config-options/cloud-providers/).

## General

The admin password is the initial password for the Harbor admin user. After you enable Global Registry, go to the Harbor UI to change the password for the admin user.

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Admin Password | The initial password of Harbor admin. Change it from Harbor UI after the registry is ready | Yes | No | n/a
Encryption Key For Harbor | The key used for encryption. Must be a string of 16 chars | No | Yes | n/a

## Registry

Use these options to configure the Harbor registry. For more information on persistent volumes (PVs) and persistent volume claims (PVCs), refer to [Volumes and Storage]({{< baseurl >}}rancher/v2.x/en/cluster-admin/volumes-and-storage).

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Storage Backend Type | Storage type for images: `filesystem` or `s3`. If `filesystem` is selected, persistent volume is required in your local cluster. | Yes | No | filesystem
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Yes | Yes | Use a storage class
Storage Class | Specify the storage class used to provision the  (A storage class is required in the local cluster to use this option) | Yes, when using SC | Yes | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | Yes, when using SC | Yes | 100Gi
Existing Claim | Specify the existing PVC for registry images (An existing PVC is required to use this option) | Yes, when using existing PV | Yes | n/a 
Registry CPU Limit | CPU limit for the Docker registry workload | Yes | Yes | 1000 (milli CPUs)
Registry Memory Limit | Memory limit for the Docker registry workload | Yes | Yes | 2048 (MB)
Registry CPU Reservation | CPU reservation for the Docker registry workload | Yes | Yes | 100 (milli CPUs)
Registry Memory Reservation | Memory reservation for the Docker registry workload | Yes | Yes | 256 (MB)
Registry Node Selector | Select the nodes where the Docker registry workload will be scheduled to | No | Yes | n/a 

## Database

These options are used to configure the database for Harbor data. Only Postgres is supported. For more information on persistent volumes (PVs) and persistent volume claims (PVCs), refer to [Volumes and Storage]({{< baseurl >}}rancher/v2.x/en/cluster-admin/volumes-and-storage).

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Config Database Type | Choose `internal` or `external`. When `internal` is selected, a PostgreSQL workload will be included in the application, and a persistent volume is required for it. When `external` is selected, you can configure an external PostgreSQL. | Yes | No | internal
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Yes, when using internal database | Yes | Use a storage class
Storage Class | Specify the storage class used to provision the persistent volume (A storage class is required in the local cluster to use this option) | Yes, when using SC and internal database | Yes | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | Yes, when using SC and internal database | Yes | 5Gi
Existing Claim | Specify the existing PVC for PostgreSQL database (An existing PVC is required to use this option) | Yes, when using existing PV and internal database | Yes | n/a 
Database CPU Limit | CPU limit for the database workload | Yes | Yes | 500 (milli CPUs)
Database Memory Limit | Memory limit for the database workload | Yes | Yes | 2048 (MB)
Database CPU Reservation | CPU reservation for the database workload | Yes | Yes | 100 (milli CPUs)
Database Memory Reservation | Memory reservation for the database workload | Yes | Yes | 256 (MB)
Database Node Selector | Select the nodes where the database workload will be scheduled to | No (Only shows when using external database) | Yes | n/a 
SSL Mode for PostgreSQL | SSL mode used to connect the external database | No (Only shows when using external database) | Yes | disable
Host for PostgreSQL | The hostname for external database | Yes (Only shows when using external database) | Yes | n/a 
Port for PostgreSQL | The port for external database | Yes (Only shows when using external database) | Yes | 5432
Username for PostgreSQL | The username for external database | Yes (Only shows when using external database) | Yes | n/a 
Password for PostgreSQL | The password for external database | Yes (Only shows when using external database) | Yes | n/a 
Core Database | The database used by core service | No (Only shows when using external database) | Yes | registry
Clair Database | The database used by Clair | No (Only shows when using external database) | Yes | clair
Notary Server Database | The database used by Notary server | No (Only shows when using external database) | Yes | notary_server
Notary Signer Database | The database used by Notary signer | No (Only shows when using external database) | Yes | notary_signer


## Redis

These options are used to configure the cache layer. For more information on persistent volumes (PVs) and persistent volume claims (PVCs), refer to [Volumes and Storage]({{< baseurl >}}rancher/v2.x/en/cluster-admin/volumes-and-storage).

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Config Redis Type | Choose `internal` or `external`. When `internal` is selected, a Redis workload will be included in the application, and a persistent volume is required for it. When `external` is selected, you can configure an external Redis. | Yes | No | internal
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Yes, when using internal Redis | Yes | Use a storage class
Storage Class | Specify the storage class used to provision the persistent volume (A storage class is required in the local cluster to use this option) | Yes, when using SC and internal Redis | Yes | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | Yes, when using SC and internal Redis | Yes | 5Gi
Existing Claim | Specify the existing PVC for Redis (An existing PVC is required to use this option) | Yes, when using existing PV and internal Redis | Yes | n/a 
Redis CPU Limit | CPU limit for the Redis workload | Yes | Yes | 500 (milli CPUs)
Redis Memory Limit | Memory limit for the Redis workload | Yes | Yes | 2048 (MB)
Redis CPU Reservation | CPU reservation for the Redis workload | Yes | Yes | 100 (milli CPUs)
Redis Memory Reservation | Memory reservation for the Redis workload | Yes | Yes | 256 (MB)
Redis Node Selector | Select the nodes where the Redis workload will be scheduled to | No | Yes | n/a 
Host for Redis | The hostname for external Redis | Yes (Only shows when using external Redis) | Yes | n/a 
Port for Redis | The port for external Redis | Yes (Only shows when using external Redis) | Yes | 6379
Password for Redis | The password for external Redis | No (Only shows when using external Redis) | Yes | n/a 
Jobservice Database Index | The database index for jobservice | Yes (Only shows when using external Redis) | Yes | n/a 
Registry Database Index | The database index for Docker registry | Yes (Only shows when using external Redis) | Yes | n/a 

## Clair

You can optionally scan images for vulnerabilities with Clair.

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Enable Clair | Whether or not to enable Clair for vulnerabilities scanning | Yes | Yes | true
Clair CPU Limit | CPU limit for the Clair workload | Yes, when Clair enabled | Yes | 500 (milli CPUs)
Clair Memory Limit | Memory limit for the Clair workload | Yes, when Clair enabled | Yes | 2048 (MB)
Clair CPU Reservation | CPU reservation for the Clair workload | Yes, when Clair enabled | Yes | 100 (milli CPUs)
Clair Memory Reservation | Memory reservation for the Clair workload | Yes, when Clair enabled | Yes | 256 (MB)
Clair Node Selector | Select the nodes where the Clair workload will be scheduled to | Yes, when Clair enabled | Yes | n/a 

## Notary

You can optionally verify the integrity and origin of images with Notary.

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Enable Notary | Whether or not to enable Notary for [Docker Content Trust](https://docs.docker.com/engine/security/trust/content_trust/). When enabled, the access endpoint to the Notary server is `<Rancher-Server-URL>/registry/notary`. | Yes | Yes | true
Notary Server CPU Limit | CPU limit for the Notary Server workload | Yes, when Notary enabled | Yes | 500 (milli CPUs)
Notary Server Memory Limit | Memory limit for the Notary Server workload | Yes, when Notary enabled | Yes | 2048 (MB)
Notary Server CPU Reservation | CPU reservation for the Notary Server workload | Yes, when Notary enabled | Yes | 100 (milli CPUs)
Notary Server Memory Reservation | Memory reservation for the Notary Server workload | Yes, when Notary enabled | Yes | 256 (MB)
Notary Signer CPU Limit | CPU limit for the Notary Signer workload | Yes, when Notary enabled | Yes | 500 (milli CPUs)
Notary Signer Memory Limit | Memory limit for the Notary Signer workload | Yes, when Notary enabled | Yes | 2048 (MB)
Notary Signer CPU Reservation | CPU reservation for the Notary Signer workload | Yes, when Notary enabled | Yes | 100 (milli CPUs)
Notary Signer Memory Reservation | Memory reservation for the Notary Signer workload | Yes, when Notary enabled | Yes | 256 (MB)
Notary Node Selector | Select the nodes where the Notary Server and Notary Signer workloads will be scheduled to | No | Yes | n/a 
