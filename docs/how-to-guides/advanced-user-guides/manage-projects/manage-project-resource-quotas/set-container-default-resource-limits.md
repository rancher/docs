---
title: Setting Container Default Resource Limits
weight: 3
---

When setting resource quotas, if you set anything related to CPU or Memory (i.e. limits or reservations) on a project / namespace, all containers will require a respective CPU or Memory field set during creation. See the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/#requests-vs-limits) for more details on why this is required.

To avoid setting these limits on each and every container during workload creation, a default container resource limit can be specified on the namespace.

### Editing the Container Default Resource Limit

Edit the container default resource limit when:

- You have a CPU or Memory resource quota set on a project, and want to supply the corresponding default values for a container.
- You want to edit the default container resource limit.

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to edit the default resource limit and click **Explore**.
1. Click **Cluster > Projects/Namespaces**.
1. Find the project that you want to edit the container default resource limit. From that project, select **⋮ > Edit Config**.
1. Expand **Container Default Resource Limit** and edit the values.

### Resource Limit Propagation

When the default container resource limit is set at a project level, the parameter will be propagated to any namespace created in the project after the limit has been set. For any existing namespace in a project, this limit will not be automatically propagated. You will need to manually set the default container resource limit for any existing namespaces in the project in order for it to be used when creating any containers.

You can set a default container resource limit on a project and launch any catalog applications.  

Once a container default resource limit is configured on a namespace, the default will be pre-populated for any containers created in that namespace. These limits/reservations can always be overridden during workload creation.

### Container Resource Quota Types

The following resource limits can be configured:

| Resource Type            | Description                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU Limit                | The maximum amount of CPU (in [millicores](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)) allocated to the container.|
| CPU Reservation          | The minimum amount of CPU (in millicores) guaranteed to the container.                                                                                                       |
| Memory Limit             | The maximum amount of memory (in bytes) allocated to the container.                                                                                                          |
| Memory Reservation       | The minimum amount of memory (in bytes) guaranteed to the container.