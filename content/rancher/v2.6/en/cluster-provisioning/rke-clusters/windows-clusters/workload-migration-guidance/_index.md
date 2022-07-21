---
title: RKE1 to RKE2 Windows Migration Guidance
weight: 3
---

**WARNING<br>The contents of this document are not covered under SLA by Rancher Support. Please proceed with caution.**

This document covers how end users can migrate their Windows workloads from RKE1 to RKE2.

- [1. Background](#1-background)
  - [1.1. Scheduling](#11-scheduling)
    - [1.1.1. RKE1 Windows Scheduling](#111-rke1-windows-scheduling)
    - [1.1.2. RKE2 Windows Scheduling](#112-rke2-windows-scheduling)
    - [1.2. Example Migrations](#12-example-migrations)
      - [1.2.1. RKE1 to RKE2 Windows Workload](#121-rke1-to-rke2-windows-workload)
      - [1.2.2. Example Migration of an RKE1 Windows Cluster Linux-Only Deployment](#122-example-migration-of-an-rke1-windows-cluster-linux-only-deployment)
  - [1.3. Supported Versions of Windows Server](#13-supported-versions-of-windows-server)
    - [1.3.1. RKE1 Windows Supported Windows Server Versions](#131-rke1-windows-supported-windows-server-versions)
      - [1.3.1.1. LTSC](#1311-ltsc)
      - [1.3.1.2. SAC](#1312-sac)
    - [1.3.2. RKE2 Windows Supports LTSC Versions of Windows Server Only](#132-rke2-windows-supports-ltsc-versions-of-windows-server-only)
      - [1.3.2.1. LTSC](#1321-ltsc)
  - [1.4. Kubernetes Version Support](#14-kubernetes-version-support)
    - [1.4.1. Rancher 2.5 vs. Rancher 2.6 Support Matrix for Windows Clusters](#141-rancher-25-vs-rancher-26-support-matrix-for-windows-clusters)
    - [1.4.2. Rancher 2.5 vs Rancher 2.6 Supported Kubernetes Versions for Provisioning RKE1 and RKE2 Windows Clusters](#142-rancher-25-vs-rancher-26-supported-kubernetes-versions-for-provisioning-rke1-and-rke2-windows-clusters)
- [2. Guiding Migrations of Workloads to RKE2 Windows](#2-guiding-migrations-of-workloads-to-rke2-windows)
  - [2.1. Steps for migrating RKE1 Windows Workloads](#21-steps-for-migrating-rke1-windows-workloads)
    - [2.1.1. In-Place Upgrade of Rancher 2.5](#211-in-place-upgrade-of-rancher-25)
    - [2.1.2. [Requires v2.6.5+] Migrating Windows Workloads to a new Rancher environment](#212-requires-v265-migrating-windows-workloads-to-a-new-rancher-environment)
      - [2.1.2.1. Use matching Kubernetes patch versions for RKE and RKE2](#2121-use-matching-kubernetes-patch-versions-for-rke-and-rke2)
      - [2.1.2.2. Use a Newer Kubernetes Patch Version for RKE2](#2122-use-a-newer-kubernetes-patch-version-for-rke2)


## 1. Background
### 1.1. Scheduling

#### 1.1.1. RKE1 Windows Scheduling

RKE1 Windows Workload scheduling is based on taints and tolerations.

Every Linux node in an RKE1 Windows cluster, regardless of the role assigned to it, will have have a default taint that prevents workloads to be scheduled on it unless the workload has a toleration configured. This is a major design feature for RKE1 Windows clusters which were designed to only run Windows workloads.

Default RKE1 Linux Node `NoSchedule` Taint

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

RKE1 Linux `NoSchedule` Toleration for Workloads

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

Aligning with best practices, any end-user workloads being ran on Linux nodes would be scheduled on those with the worker role only.

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

#### 1.1.2. RKE2 Windows Scheduling

Based on feedback and requests for hybrid workload support, RKE2 Windows was designed to support both Linux and Windows workloads by default. RKE2 scheduling relies on node selectors by default. This is a marked change from RKE1 as taints and tolerations were not incorporated into RKE2. Node selectors were a critical part of RKE1 Windows clusters, which makes for an easy migration of your workloads.

#### 1.2. Example Migrations

##### 1.2.1. RKE1 to RKE2 Windows Workload

Pre-Migration RKE1 Windows Deployment

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


Migrated RKE2 Windows Deployment Using `NodeAffinity`

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

##### 1.2.2. Example Migration of an RKE1 Windows Cluster Linux-Only Deployment

Important Things to Keep in Mind when Leveraging Node Selectors and Node Affinity

- If you specify both nodeSelector and nodeAffinity, both must be satisfied for the Pod to be scheduled onto a node.
- If you specify multiple matchExpressions associated with a single nodeSelectorTerms, then the Pod can be scheduled onto a node only if all the matchExpressions are satisfied.

Pre-Migration RKE1 Windows Cluster Linux-Only Deployment Targeting RKE1 Linux Worker Nodes

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

Migrated RKE2 Hybrid Cluster Linux-Only Deployment Targeting RKE2 Linux Worker Nodes Using Node Selectors

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

Migrated RKE2 Hybrid Cluster Linux-Only Deployment Targeting RKE2 Linux Worker Nodes Using Node Affinity

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

### 1.3. Supported Versions of Windows Server

#### 1.3.1. RKE1 Windows Supported Windows Server Versions

##### 1.3.1.1. LTSC

- Windows Server 2019 LTSC :heavy_check_mark: Will reach Mainstream EOL on Jan 9, 2024 and Extended EOL on Jan 9, 2029

##### 1.3.1.2. SAC

- Windows Server 20H2 SAC :heavy_exclamation_mark: Will reach EOL on Aug 9, 2022
- Windows Server 2004 SAC :x: <mark>EOL Reached on Dec 14, 2021</mark>
- Windows Server 1909 SAC :x: <mark>EOL Reached on May 11, 2021</mark>
- Windows Server 1903 SAC :x: <mark>EOL Reached on Dec 8, 2020</mark>
- Windows Server 1809 SAC :x: <mark>EOL Reached on Nov 10, 2020</mark>

#### 1.3.2. RKE2 Windows Supports LTSC Versions of Windows Server Only

##### 1.3.2.1. LTSC

- Windows Server 2019 LTSC :heavy_check_mark: Will reach Mainstream EOL on Jan 9, 2024 and Extended EOL on Jan 9, 2029
- Windows Server 2022 LTSC :heavy_check_mark: Will reach Mainstream EOL on Oct 13, 2026 and Extended EOL on Oct 13, 2031


**References**

[Windows Server SAC Lifecycle](https://docs.microsoft.com/en-us/lifecycle/products/windows-server)

[Windows Server 2022 LTSC Lifecycle](https://docs.microsoft.com/en-us/lifecycle/products/windows-server-2022)

[Windows Server 2019 LTSC Lifecycle](https://docs.microsoft.com/en-us/lifecycle/products/windows-server-2019)


### 1.4. Kubernetes Version Support

**NB.**  All versions listed below are SLA Supported per the [Rancher v2.6.5 Support Matrix](https://www.suse.com/suse-rancher/support-matrix/all-supported-versions/rancher-v2-6-5/). Any version not listed should be assumed as being EOL and not supported under SLA by SUSE

#### 1.4.1. Rancher 2.5 vs. Rancher 2.6 Support Matrix for Windows Clusters

RKE1 vs RKE2 Windows Cluster Supported Kubernetes Versions

| Kubernetes Versions 	| RKE1 	| RKE2 	|
|---------------------	|:----:	|:----:	|
| 1.18                	|   :heavy_check_mark:  	|      	|
| 1.19                	|   :heavy_check_mark:  	|      	|
| 1.20                	|   :heavy_check_mark:  	|      	|
| 1.21                	|   :heavy_check_mark:  	|      	|
| 1.22                	|   :heavy_check_mark:  	|   :heavy_check_mark:  	|
| 1.23                	|      	|   :heavy_check_mark: 	|
| 1.24                	|      	|  :heavy_check_mark:  	|
| 1.25+               	|      	|   :heavy_check_mark:  	|


#### 1.4.2. Rancher 2.5 vs Rancher 2.6 Supported Kubernetes Versions for Provisioning RKE1 and RKE2 Windows Clusters

| Rancher Versions 	|    Kubernetes Versions   	| RKE1 	| RKE2 	|
|:-----------------------:	|:------------------------:	|:----:	|:----:	|
| 2.5 - RKE1 Provisioning 	|      1.18 1.19 1.20      	|   :heavy_check_mark:  	|      	|
| 2.6 - RKE1 Provisioning 	| 1.18 1.19 1.20 1.21 1.22 	|   :heavy_check_mark:  	|      	|
| 2.6 - RKE2 Provisioning 	|   1.22 1.23 1.24 1.25+   	|      	|   :heavy_check_mark:  	|


## 2. Guiding Migrations of Workloads to RKE2 Windows

Referencing the tables in [Rancher 2.5 vs. Rancher 2.6 Support Matrix for Windows Clusters](#rancher-25-vs-rancher-26-support-matrix-for-windows-clusters) and [Rancher 2.5 vs Rancher 2.6 Supported Kubernetes Versions for Provisioning RKE1 and RKE2 Windows Clusters](#rancher-25-vs-rancher-26-supported-kubernetes-versions-for-provisioning-rke1-and-rke2-windows-clusters), you will find the overlap in Kubernetes versions between RKE1 and RKE2 occurs in 1.22. This will be the base version required to migrate RKE1 Windows workloads when following the Rancher recommended approach.

### 2.1. Steps for migrating RKE1 Windows Workloads

#### 2.1.1. In-Place Upgrade of Rancher 2.5

- [ ] Upgrade the Rancher version to v2.6.5+
- [ ] Upgrade the RKE1 Windows downstream cluster(s) to RKE1 v1.22 using the latest available patch version
- [ ] Provision a new RKE2 Windows downstream cluster using RKE2 v1.22 using the matching patch version that the RKE1 Windows cluster is at
- [ ] Begin the migration of the Windows workloads from RKE1 to RKE2 clusters
- [ ] Perform validation tests to ensure that there has been no functionality loss or change when migrating your application from RKE1 to RKE2
- [ ] After successful validation tests have occurred, you can opt to upgrade your RKE2 1.22.x cluster to a new minor version such as 1.23 or 1.24.


#### 2.1.2. [Requires v2.6.5+] Migrating Windows Workloads to a new Rancher environment

##### 2.1.2.1. Use matching Kubernetes patch versions for RKE and RKE2

- [ ] Provision a new RKE2 Windows downstream cluster using RKE2 v1.22 using the matching patch version that the RKE1 Windows cluster is at
- [ ] Begin the migration of the Windows workloads from RKE1 to RKE2 clusters
- [ ] Perform validation tests to ensure that there has been no functionality loss or change when migrating your application from RKE1 to RKE2
- [ ] After successful validation tests have occurred, you can opt to upgrade your RKE2 1.22.x cluster to a new minor version such as 1.23 or 1.24.


##### 2.1.2.2. Use a Newer Kubernetes Patch Version for RKE2

- [ ] Provision a new RKE2 Windows downstream cluster using RKE2 v1.23 or v1.24
- [ ] Begin the migration of the Windows workloads from RKE1 to RKE2 clusters
- [ ] Perform validation tests to ensure that there has been no functionality loss or change when migrating your application from RKE1 to RKE2



