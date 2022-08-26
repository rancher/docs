---
title: RKE1 to RKE2 Windows Migration Guidance
weight: 3
---

**Caution:** The contents of this document are not covered under SLA by Rancher Support. Please proceed with caution.

This document covers how end users can migrate their Windows workloads from RKE1 to RKE2.

- [RKE1 Windows Scheduling](#rke1-windows-scheduling)
- [RKE2 Windows Scheduling](#rke2-windows-scheduling)
- [Example Migrations](#example-migrations)
  - [RKE1 to RKE2 Windows Workload](#rke1-to-rke2-windows-workload)
  - [RKE1 Windows Cluster Linux-Only Deployment](#rke1-windows-cluster-linux-only-deployment)
- [RKE1 Windows-Supported Windows Server Versions](#rke1-windows-supported-windows-server-versions)
  - [Long-Term Servicing Channel (LTSC)](#long-term-servicing-channel-ltsc)
  - [Semi-Annual Channel (SAC)](#semi-annual-channel-sac)
- [RKE2 Windows-Supported Windows Server Versions](#rke2-windows-supported-windows-server-versions)
  - [Long-Term Servicing Channel in RKE2](#long-term-servicing-channel-in-rke2)
- [Kubernetes Version Support](#kubernetes-version-support)
  - [Rancher 2.5 vs. Rancher 2.6 Support Matrix for Windows Clusters](#rancher-2-5-vs-rancher-2-6-support-matrix-for-windows-clusters)
  - [Rancher 2.5 vs. Rancher 2.6 Supported Kubernetes Versions for Provisioning RKE1 and RKE2 Windows Clusters](#rancher-2-5-vs-rancher-2-6-supported-kubernetes-versions-for-provisioning-rke1-and-rke2-windows-clusters)
- [Guiding Migrations of Workloads to RKE2 Windows](#guiding-migrations-of-workloads-to-rke2-windows)
  - [In-Place Upgrade of Rancher 2.5](#in-place-upgrade-of-rancher-2-5)
  - [Migrating Windows Workloads to a new Rancher environment](#migrating-windows-workloads-to-a-new-rancher-environment)

## RKE1 Windows Scheduling

RKE1 Windows workload scheduling is based on taints and tolerations.

Every Linux node in an RKE1 Windows cluster, regardless of the role assigned to it, will have have a default taint that prevents workloads to be scheduled on it unless the workload has a toleration configured. This is a major design feature for RKE1 Windows clusters which were designed to only run Windows workloads.

- Default RKE1 Linux node `NoSchedule` taint:

```yml
apiVersion: v1
kind: Node
spec:
  ...
  taints:
  - effect: NoSchedule
    key: cattle.io/os
    value: linux
```
<br/>

- RKE1 Linux `NoSchedule` toleration for workloads

The following toleration would allow an end-user workload to schedule on any Linux node of an RKE1 Windows cluster. These tolerations are used for various core Rancher services and workloads.

```yml
apiVersion: apps/v1
kind: Deployment
spec:
  ...
  template:
    ...
    spec:
      tolerations:
      - effect: NoSchedule
        key: cattle.io/os
        operator: Equal
        value: linux
```
<br/>

- Aligning with best practices, any end-user workloads being run on Linux nodes would be scheduled on those with the worker role only:

```yml
apiVersion: apps/v1
kind: Deployment
spec:
  ...
  template:
    ...
    spec:
      tolerations:
      - effect: NoSchedule
        key: cattle.io/os
        operator: Equal
        value: linux
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - preference:
              matchExpressions:
              - key: node-role.kubernetes.io/worker
                operator: In
                values:
                - "true"
            weight: 100
      ...
```

## RKE2 Windows Scheduling

Based on feedback and requests for hybrid workload support, RKE2 Windows was designed to support both Linux and Windows workloads by default. RKE2 scheduling relies on node selectors by default. This is a marked change from RKE1 as taints and tolerations were not incorporated into RKE2. Node selectors were a critical part of RKE1 Windows clusters, which makes for an easy migration of your workloads.

## Example Migrations

### RKE1 to RKE2 Windows Workload

- Pre-migration RKE1 Windows deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  ...
  template:
    ...
    spec:
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: kubernetes.io/os
                operator: NotIn
                values:
                - linux
```
<br/>

- Migrated RKE2 Windows deployment using `NodeAffinity`:

```yaml
apiVersion: apps/v1
kind: Deployment
...
spec:
  ...
  template:
    ...
    spec:
      ...
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
              - matchExpressions:
                  - key: kubernetes.io/os
                    operator: In
                    values:
                      - windows
```

### RKE1 Windows Cluster Linux-Only Deployment

>**Important:** When leveraging node selectors and node affinity, note the following:
>
>- If both `nodeSelector` and `nodeAffinity` are specified, both must be satisfied for the `Pod` to be scheduled onto a node.
>- If you specify multiple `matchExpressions` associated with a single `nodeSelectorTerms`, then the `Pod` can be scheduled onto a node only if all the `matchExpressions` are satisfied.

<br/>

- Pre-migration RKE1 Windows cluster Linux-only deployment targeting RKE1 Linux worker nodes:

```yml
apiVersion: apps/v1
kind: Deployment
spec:
  ...
  template:
    ...
    spec:
      tolerations:
      - effect: NoSchedule
        key: cattle.io/os
        operator: Equal
        value: linux
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            preference:
              matchExpressions:
              - key: node-role.kubernetes.io/worker
                operator: In
                values:
                - "true"
            
```
<br/>

- Migrated RKE2 hybrid cluster Linux-only deployment targeting RKE2 Linux worker nodes using node selectors:

```yml
apiVersion: apps/v1
kind: Deployment
spec:
  ...
  template:
    ...
    spec:
      nodeSelector:
        kubernetes.io/os: "linux"
        node-role.kubernetes.io/worker: "true"
 ```
<br/>

- Migrated RKE2 hybrid cluster Linux-only deployment targeting RKE2 Linux worker nodes using node affinity:

 ```yaml
 apiVersion: apps/v1
kind: Deployment
spec:
  ...
  template:
    ...
    spec:
       affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            preference:
              matchExpressions:
              - key: node-role.kubernetes.io/worker
                operator: In
                values:
                - "true"
            nodeSelectorTerms:
              - matchExpressions:
                  - key: kubernetes.io/os
                    operator: In
                    values:
                      - linux
 ```
## RKE1 Windows-Supported Windows Server Versions

### Long-Term Servicing Channel (LTSC)

- Windows Server 2019 LTSC &#9989; Will reach Mainstream EOL on Jan 9, 2024 and Extended EOL on Jan 9, 2029

### Semi-Annual Channel (SAC)

- Windows Server 20H2 SAC &#10071; Will reach EOL on Aug 9, 2022
- Windows Server 2004 SAC &#10060; EOL Reached on Dec 14, 2021
- Windows Server 1909 SAC &#10060; EOL Reached on May 11, 2021
- Windows Server 1903 SAC &#10060; EOL Reached on Dec 8, 2020
- Windows Server 1809 SAC &#10060; EOL Reached on Nov 10, 2020

## RKE2 Windows-Supported Windows Server Versions

### Long-Term Servicing Channel in RKE2

- Windows Server 2019 LTSC &#9989; Will reach Mainstream EOL on Jan 9, 2024 and Extended EOL on Jan 9, 2029
- Windows Server 2022 LTSC &#9989; Will reach Mainstream EOL on Oct 13, 2026 and Extended EOL on Oct 13, 2031

>**Note:** SAC is not supported in RKE2.


For more information, please see the following references:

- [Windows Server SAC Lifecycle](https://docs.microsoft.com/en-us/lifecycle/products/windows-server)

- [Windows Server 2022 LTSC Lifecycle](https://docs.microsoft.com/en-us/lifecycle/products/windows-server-2022)

- [Windows Server 2019 LTSC Lifecycle](https://docs.microsoft.com/en-us/lifecycle/products/windows-server-2019)


## Kubernetes Version Support

>**Note:** All versions listed below are SLA Supported per the [Rancher v2.6.7 Support Matrix](https://www.suse.com/suse-rancher/support-matrix/all-supported-versions/rancher-v2-6-7/). Any version not listed should be assumed as being EOL and not supported under SLA by SUSE.

### Rancher 2.5 vs. Rancher 2.6 Support Matrix for Windows Clusters

**RKE1 vs. RKE2 Windows cluster-supported Kubernetes versions:**

| Kubernetes Versions 	| RKE1 	| RKE2 	|
|--------------	|:----:	|:----:	|
| 1.18                	|   &check;   	|      	|
| 1.19                	|   &check;   	|      	|
| 1.20                	|   &check;   	|      	|
| 1.21                	|   &check;   	|      	|
| 1.22                	|   &check;   	|   &check;   |
| 1.23                	|      	  |   &check;  	|
| 1.24                	|      	  |   &check;   |
| 1.25+               	|      	  |   &check;   |


### Rancher 2.5 vs. Rancher 2.6 Supported Kubernetes Versions for Provisioning RKE1 and RKE2 Windows Clusters

| Rancher Versions 	|    Kubernetes Versions   	| RKE1 	| RKE2 	|
|:-----------------------:	|:------------------------:	|:----:	|:----:	|
| 2.5 - RKE1 Provisioning 	|      1.18 1.19 1.20      	|   &check;   	|      	|
| 2.6 - RKE1 Provisioning 	| 1.18 1.19 1.20 1.21 1.22 	|   &check;   	|      	|
| 2.6 - RKE2 Provisioning 	|   1.22 1.23 1.24 1.25+   	|      	|   &check;   	|


## Guiding Migrations of Workloads to RKE2 Windows
<br/>
Referencing the tables in [Rancher 2.5 vs. Rancher 2.6 Support Matrix for Windows Clusters](#rancher-2-5-vs-rancher-2-6-support-matrix-for-windows-clusters) and [Rancher 2.5 vs. Rancher 2.6 Supported Kubernetes Versions for Provisioning RKE1 and RKE2 Windows Clusters](#rancher-2-5-vs-rancher-2-6-supported-kubernetes-versions-for-provisioning-rke1-and-rke2-windows-clusters), you will find the overlap in Kubernetes versions between RKE1 and RKE2 occurs in 1.22. This will be the base version required to migrate RKE1 Windows workloads when following the Rancher recommended approach.

### In-Place Upgrade of Rancher 2.5

1. Upgrade the Rancher version to v2.6.5+.
1. Upgrade the RKE1 Windows downstream cluster(s) to RKE1 v1.22 using the latest available patch version.
1. Provision a new RKE2 Windows downstream cluster using RKE2 v1.22 using the matching patch version that the RKE1 Windows cluster is at.
1. Begin the migration of the Windows workloads from RKE1 to RKE2 clusters.
1. Perform validation tests to ensure that there has been no functionality loss or change when migrating your application from RKE1 to RKE2.
1. After successful validation tests have occurred, you can opt to upgrade your RKE2 1.22.x cluster to a new minor version such as 1.23 or 1.24.


### Migrating Windows Workloads to a New Rancher Environment

>**Important:** To perform either of the following options requires Rancher v2.6.5 or above.

**When using matching Kubernetes patch versions for RKE1 and RKE2:**

1. Provision a new RKE2 Windows downstream cluster using RKE2 v1.22 using the matching patch version that the RKE1 Windows cluster is at.
1. Begin the migration of the Windows workloads from RKE1 to RKE2 clusters.
1. Perform validation tests to ensure that there has been no functionality loss or change when migrating your application from RKE1 to RKE2.
1. After successful validation tests have occurred, you can opt to upgrade your RKE2 1.22.x cluster to a new minor version such as 1.23 or 1.24.


**When using a newer Kubernetes patch version for RKE2:**

1. Provision a new RKE2 Windows downstream cluster using RKE2 v1.23 or v1.24.
1. Begin the migration of the Windows workloads from RKE1 to RKE2 clusters.
1. Perform validation tests to ensure that there has been no functionality loss or change when migrating your application from RKE1 to RKE2.