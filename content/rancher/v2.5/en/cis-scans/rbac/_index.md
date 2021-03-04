---
title: Roles-based Access Control
shortTitle: RBAC
weight: 3
aliases:
  - /rancher/v2.5/en/cis-scans/rbac
  - /rancher/v2.5/en/cis-scans/v2.5/rbac
---

This section describes the permissions required to use the rancher-cis-benchmark App.

The rancher-cis-benchmark is a cluster-admin only feature by default.

However, the `rancher-cis-benchmark` chart installs these two default `ClusterRoles`:

- cis-admin
- cis-view

In Rancher, only cluster owners and global administrators have `cis-admin` access by default. 

Note: If you were using the `cis-edit` role added in Rancher v2.5 setup, it has now been removed since
Rancher v2.5.2 because it essentially is same as `cis-admin`. If you happen to create any clusterrolebindings
for `cis-edit`, please update them to use `cis-admin` ClusterRole instead.

# Cluster-Admin Access

Rancher CIS Scans is a cluster-admin only feature by default.
This means only the Rancher global admins, and the cluster’s cluster-owner can:

- Install/Uninstall the rancher-cis-benchmark App
- See the navigation links for CIS Benchmark CRDs - ClusterScanBenchmarks, ClusterScanProfiles, ClusterScans
- List the default ClusterScanBenchmarks and ClusterScanProfiles
- Create/Edit/Delete new ClusterScanProfiles
- Create/Edit/Delete a new ClusterScan to run the CIS scan on the cluster
- View and Download the ClusterScanReport created after the ClusterScan is complete


# Summary of Default Permissions for Kubernetes Default Roles

The rancher-cis-benchmark creates three `ClusterRoles` and adds the CIS Benchmark CRD access to the following default K8s `ClusterRoles`:

| ClusterRole created by chart | Default K8s ClusterRole  | Permissions given with Role
| ------------------------------| ---------------------------| ---------------------------|
| `cis-admin` | `admin`| Ability to CRUD clusterscanbenchmarks, clusterscanprofiles, clusterscans, clusterscanreports CR
| `cis-view` | `view `| Ability to List(R) clusterscanbenchmarks, clusterscanprofiles, clusterscans, clusterscanreports CR


By default only cluster-owner role will have ability to manage and use `rancher-cis-benchmark` feature.

The other Rancher roles (cluster-member, project-owner, project-member) do not have any default permissions to manage and use rancher-cis-benchmark resources.

But if a cluster-owner wants to delegate access to other users, they can do so by creating ClusterRoleBindings between these users and the above CIS ClusterRoles manually.
There is no automatic role aggregation supported for the `rancher-cis-benchmark` ClusterRoles.
