---
title: Roles-based Access Contro
shortTitle: RBAC
weight: 3
---

This section describes the permissions required to use the rancher-cis-benchmark App.

The rancher-cis-benchmark is a cluster-admin only feature by default.

However, the `rancher-cis-benchmark` chart installs three default `ClusterRoles`:
- cis-admin
- cis-edit
- cis-view

# Cluster-Admin Access

Rancher CIS Scans is a cluster-admin only feature by default.
This means only the rancher global admins, and the cluster’s cluster-owner can:

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
| `cis-edit`| `edit` | Ability to CRUD clusterscanbenchmarks, clusterscanprofiles, clusterscans, clusterscanreports CR
| `cis-view` | `view `| Ability to List(R) clusterscanbenchmarks, clusterscanprofiles, clusterscans, clusterscanreports CR

Rancher will continue to use cluster-owner, cluster-member, project-owner, project-member, etc as role names, but these default k8s roles will determine access to CIS feature.
By default only cluster-owner role will have ability to use `rancher-cis-benchmark` feature.
But the above ClusterRoles can be granted to cluster-member, project-owner, project-member users if a cluster-owner wants to share access.
