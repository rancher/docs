---
title: Global Registry Configuration
weight: 1
---

_Available as of v2.3.0-alpha_

While configuring global registry, there are multiple options that can be configured.

## General

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Admin Password | The initial password of Harbor admin. Change it from Harbor UI after the registry is ready | Yes | No | n/a
Encryption Key For Harbor | The key used for encryption. Must be a string of 16 chars | No | Yes | n/a

## Registry

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Storage Backend Type | Storage type for images: `filesystem` or `s3`. If `filesystem` is selected, persistent volume is required in your local cluster. | Yes | No | filesystem
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Yes | Yes | Use a storage class
Storage Class | Specify the storage class used to provision the persistent volume(A storage class is required in the local cluster to use this option) | Yes, when use SC | Yes | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | Yes, when use SC | Yes | 100Gi
Existing Claim | Specify the existing PVC for registry images(An existing PVC is required to use this option) | Yes, when use existing PV | Yes | n/a 
Registry CPU Limit | CPU limit for the docker registry workload | Yes | Yes | 1000 (milli CPUs)
Registry Memory Limit | Memory limit for the docker registry workload | Yes | Yes | 2048 (MiB)
Registry CPU Reservation | CPU reservation for the docker registry workload | Yes | Yes | 100 (milli CPUs)
Registry Memory Reservation | Memory reservation for the docker registry workload | Yes | Yes | 256 (MiB)
Registry Node Selector | Select the nodes where the docker registry workload will be scheduled to | No | Yes | n/a 

## Database

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Config Database Type | Choose `internal` or `external`. When `internal` is selected, a PostgreSQL workload will be included in the application, and a persistent volume is required for it. When `external` is selected, you can configure an external PostgreSQL. You should create databases for Harbor core service, Clair and Notary before enabling.| Yes | No | internal
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Yes, when use internal database | Yes | Use a storage class
Storage Class | Specify the storage class used to provision the persistent volume(A storage class is required in the local cluster to use this option) | Yes, when use SC and internal database | Yes | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | Yes, when use SC and internal database | Yes | 5Gi
Existing Claim | Specify the existing PVC for PostgreSQL database(An existing PVC is required to use this option) | Yes, when use existing PV and internal database | Yes | n/a 
Database CPU Limit | CPU limit for the database workload | Yes | Yes | 500 (milli CPUs)
Database Memory Limit | Memory limit for the database workload | Yes | Yes | 2048 (MiB)
Database CPU Reservation | CPU reservation for the database workload | Yes | Yes | 100 (milli CPUs)
Database Memory Reservation | Memory reservation for the database workload | Yes | Yes | 256 (MiB)
Database Node Selector | Select the nodes where the database workload will be scheduled to | No (Only shows when use external database) | Yes | n/a 
SSL Mode for PostgreSQL | SSL mode used to connect the external database | No (Only shows when use external database) | Yes | disable
Host for PostgreSQL | The hostname for external database | Yes (Only shows when use external database) | Yes | n/a 
Port for PostgreSQL | The port for external database | Yes (Only shows when use external database) | Yes | 5432
Username for PostgreSQL | The username for external database | Yes (Only shows when use external database) | Yes | n/a 
Password for PostgreSQL | The password for external database | Yes (Only shows when use external database) | Yes | n/a 
Core Database | The database used by core service | No (Only shows when use external database) | Yes | registry
Clair Database | The database used by Clair | No (Only shows when use external database) | Yes | clair
Notary Server Database | The database used by Notary server | No (Only shows when use external database) | Yes | notary_server
Notary Signer Database | The database used by Notary signer | No (Only shows when use external database) | Yes | notary_signer


## Redis

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Config Redis Type | Choose `internal` or `external`. When `internal` is selected, a Redis workload will be included in the application, and a persistent volume is required for it. When `external` is selected, you can configure an external Redis. | Yes | No | internal
Source | Whether to use a storage class to provision a new PV or to use an existing PVC | Yes, when use internal Redis | Yes | Use a storage class
Storage Class | Specify the storage class used to provision the persistent volume(A storage class is required in the local cluster to use this option) | Yes, when use SC and internal Redis | Yes | The default storage class
Persistent Volume Size | Specify the size of the persistent volume | Yes, when use SC and internal Redis | Yes | 5Gi
Existing Claim | Specify the existing PVC for Redis(An existing PVC is required to use this option) | Yes, when use existing PV and internal Redis | Yes | n/a 
Redis CPU Limit | CPU limit for the Redis workload | Yes | Yes | 500 (milli CPUs)
Redis Memory Limit | Memory limit for the Redis workload | Yes | Yes | 2048 (MiB)
Redis CPU Reservation | CPU reservation for the Redis workload | Yes | Yes | 100 (milli CPUs)
Redis Memory Reservation | Memory reservation for the Redis workload | Yes | Yes | 256 (MiB)
Redis Node Selector | Select the nodes where the Redis workload will be scheduled to | No | Yes | n/a 
Host for Redis | The hostname for external Redis | Yes (Only shows when use external Redis) | Yes | n/a 
Port for Redis | The port for external Redis | Yes (Only shows when use external Redis) | Yes | 6379
Password for Redis | The password for external Redis | No (Only shows when use external Redis) | Yes | n/a 
Jobservice Database Index | The database index for jobservice | Yes (Only shows when use external Redis) | Yes | n/a 
Registry Database Index | The database index for docker registry | Yes (Only shows when use external Redis) | Yes | n/a 

## Clair

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Enable Clair | Whether or not to enable Clair for vulnerabilities scanning | Yes | Yes | true
Clair CPU Limit | CPU limit for the Clair workload | Yes, when Clair enabled | Yes | 500 (milli CPUs)
Clair Memory Limit | Memory limit for the Clair workload | Yes, when Clair enabled | Yes | 2048 (MiB)
Clair CPU Reservation | CPU reservation for the Clair workload | Yes, when Clair enabled | Yes | 100 (milli CPUs)
Clair Memory Reservation | Memory reservation for the Clair workload | Yes, when Clair enabled | Yes | 256 (MiB)
Clair Node Selector | Select the nodes where the Clair workload will be scheduled to | Yes, when Clair enabled | Yes | n/a 

## Notary

Field | Description | Required | Editable | Default
----|-----------------|------------|------------|------------
Enable Notary | Whether or not to enable Notary for [Docker Content Trust](https://docs.docker.com/engine/security/trust/content_trust/). When enabled, the access endpoint to the Notary server is `<Rancher-Server-URL>/registry/notary`. | Yes | Yes | true
Notary Server CPU Limit | CPU limit for the Notary Server workload | Yes, when Notary enabled | Yes | 500 (milli CPUs)
Notary Server Memory Limit | Memory limit for the Notary Server workload | Yes, when Notary enabled | Yes | 2048 (MiB)
Notary Server CPU Reservation | CPU reservation for the Notary Server workload | Yes, when Notary enabled | Yes | 100 (milli CPUs)
Notary Server Memory Reservation | Memory reservation for the Notary Server workload | Yes, when Notary enabled | Yes | 256 (MiB)
Notary Signer CPU Limit | CPU limit for the Notary Signer workload | Yes, when Notary enabled | Yes | 500 (milli CPUs)
Notary Signer Memory Limit | Memory limit for the Notary Signer workload | Yes, when Notary enabled | Yes | 2048 (MiB)
Notary Signer CPU Reservation | CPU reservation for the Notary Signer workload | Yes, when Notary enabled | Yes | 100 (milli CPUs)
Notary Signer Memory Reservation | Memory reservation for the Notary Signer workload | Yes, when Notary enabled | Yes | 256 (MiB)
Notary Node Selector | Select the nodes where the Notary Server and Notary Signer workloads will be scheduled to | No | Yes | n/a 
