---
title: Removing Rancher
weight: 2000
draft: true
---

## Removing Rancher From  Nodes

### Hosted Kubernetes Providers

### Nodes Hosted by IaaS

### Custom Nodes

### Imported Cluster

After you initiate the removal of an imported cluster using the Rancher UI (or API), the following events occur.

1. Rancher creates a `serviceAccount` that it uses to remove the cluster. This account is assigned the [clusterRole](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole) and [clusterRoleBinding](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding) permissions, which are required to remove the cluster. 

1. Using the `serviceAccount`, Rancher schedules and runs a [job](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/) that cleans the Rancher and Kubernetes components off of the node. This job also references the `serviceAccount` and its roles as dependencies, so the job deletes them before its completion. This process:

    - Removes the `cattle-system` namespace from the cluster.
    - Cleans up all remaining namespaces in the cluster (i.e., removes finalizers, annotations, and labels)
 
    >**Using 2.0.7 or Earlier?**
    >
    >These versions of Rancher do not automatically delete the `serviceAccount`, `clusterRole`, and `clusterRole` resources after the job runs. You'll have to delete them yourself.

1. Rancher is removed from the cluster nodes. However, the cluster persists, running the native version of Kubernetes.