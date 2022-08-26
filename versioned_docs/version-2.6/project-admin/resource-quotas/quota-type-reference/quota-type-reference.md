---
title: Resource Quota Type Reference
weight: 4
---

When you create a resource quota, you are configuring the pool of resources available to the project. You can set the following resource limits for the following resource types.

| Resource Type            | Description                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU Limit*                | The maximum amount of CPU (in [millicores](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)) allocated to the project/namespace.<sup>1</sup> |
| CPU Reservation*         | The minimum amount of CPU (in millicores) guaranteed to the project/namespace.<sup>1</sup>                                                                                                        |
| Memory Limit*           | The maximum amount of memory (in bytes) allocated to the project/namespace.<sup>1</sup>                                                                                                           |
| Memory Reservation*       | The minimum amount of memory (in bytes) guaranteed to the project/namespace.<sup>1</sup>                                                                                                          |
| Storage Reservation      | The minimum amount of storage (in gigabytes) guaranteed to the project/namespace.                                                                                                                 |
| Services Load Balancers  | The maximum number of load balancers services that can exist in the project/namespace.                                                                                                            |
| Services Node Ports      | The maximum number of node port services that can exist in the project/namespace.                                                                                                                 |
| Pods                     | The maximum number of pods that can exist in the project/namespace in a non-terminal state (i.e., pods with a state of `.status.phase in (Failed, Succeeded)` equal to true).                     |
| Services                 | The maximum number of services that can exist in the project/namespace.                                                                                                                           |
| ConfigMaps               | The maximum number of ConfigMaps that can exist in the project/namespace.                                                                                                                         |
| Persistent Volume Claims | The maximum number of persistent volume claims that can exist in the project/namespace.                                                                                                           |
| Replications Controllers | The maximum number of replication controllers that can exist in the project/namespace.                                                                                                            |
| Secrets                  | The maximum number of secrets that can exist in the project/namespace.                                                                                                                            |

>**<sup>*</sup>** When setting resource quotas, if you set anything related to CPU or Memory (i.e. limits or reservations) on a project / namespace, all containers will require a respective CPU or Memory field set during creation. A container default resource limit can be set at the same time to avoid the need to explicitly set these limits for every workload. See the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/#requests-vs-limits) for more details on why this is required.