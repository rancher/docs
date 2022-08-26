---
title: Migrating from v1.6 to v2.x
weight: 28
aliases:
  - /rancher/v2.x/en/v1.6-migration/
---

Rancher v2.x has been rearchitected and rewritten with the goal of providing a complete management solution for Kubernetes and Docker.  Due to these extensive changes, there is no direct upgrade path from v1.6 to v2.x, but rather a migration of your v1.6 services into v2.x as Kubernetes workloads.  In v1.6, the most common orchestration used was Rancher's own engine called Cattle. The following guide explains and educates our Cattle users on running workloads in a Kubernetes environment.

## Video

This video demonstrates a complete walk through of migration from Rancher v1.6 to v2.x.

{{< youtube OIifcqj5Srw >}}

## Migration Plan

>**Want to more about Kubernetes before getting started?** Read our [Kubernetes Introduction](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/kubernetes-introduction.md).


- [1. Get Started](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/install-and-configure-rancher.md)

    >**Already a Kubernetes user in v1.6?**
    >
    > _Get Started_ is the only section you need to review for migration to v2.x. You can skip everything else.
- [2. Migrate Your Services](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/migrate-services.md)
- [3. Expose Your Services](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/expose-services.md)
- [4. Configure Health Checks](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/monitor-apps.md)
- [5. Schedule Your Services](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/schedule-services.md)
- [6. Service Discovery](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/discover-services.md)
- [7. Load Balancing](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/load-balancing.md)


## Migration Example Files

Throughout this migration guide, we will reference several example services from Rancher v1.6 that we're migrating to v2.x. These services are:

- A service named `web`, which runs [Let's Chat](http://sdelements.github.io/lets-chat/), a self-hosted chat for small teams.
- A service named `database`, which runs [Mongo DB](https://www.mongodb.com/), an open source document database.
- A service named `webLB`, which runs [HAProxy](http://www.haproxy.org/), an open source load balancer used in Rancher v1.6.

During migration, we'll export these services from Rancher v1.6.  The export generates a unique directory for each Rancher v1.6 environment and stack, and two files are output into each stack's directory:

- `docker-compose.yml`

    A file that contains standard Docker directives for each service in your stack. We'll be converting these files to Kubernetes manifests that can be read by Rancher v2.x.

- `rancher-compose.yml`

    A file for Rancher-specific functionality such as health checks and load balancers. These files cannot be read by Rancher v2.x, so don't worry about their contents—we're discarding them and recreating them using the v2.x UI.


### [Next: Get Started](../how-to-guides/new-user-guides/migrate-from-v1.6-v2.x/install-and-configure-rancher.md)
