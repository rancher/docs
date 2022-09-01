| Action | Rancher Launched Kubernetes Clusters |  EKS, GKE and AKS Clusters<sup>1</sup> | Other Hosted Kubernetes Clusters | Non-EKS or GKE Registered Clusters |
| --- | --- | ---| ---|----|
| [Using kubectl and a kubeconfig file to Access a Cluster](../how-to-guides/advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md) | ✓ | ✓ | ✓ | ✓ |
| [Managing Cluster Members](../how-to-guides/advanced-user-guides/manage-clusters/access-clusters/add-users-to-clusters.md) | ✓ | ✓ | ✓ | ✓ |
| [Editing and Upgrading Clusters](../pages-for-subheaders/cluster-configuration.md) | ✓ | ✓ | ✓ | ✓<sup>2</sup> |
| [Managing Nodes](../how-to-guides/advanced-user-guides/manage-clusters/nodes-and-node-pools.md) | ✓ | ✓ | ✓ | ✓<sup>3</sup> |
| [Managing Persistent Volumes and Storage Classes](../pages-for-subheaders/create-kubernetes-persistent-storage.md) | ✓ | ✓ | ✓ | ✓ |
| [Managing Projects, Namespaces and Workloads](../how-to-guides/advanced-user-guides/manage-clusters/projects-and-namespaces.md) | ✓ | ✓ | ✓ | ✓ |
| [Using App Catalogs](../pages-for-subheaders/helm-charts-in-rancher.md) | ✓ | ✓ | ✓ | ✓ |
| Configuring Tools ([Alerts, Notifiers, Monitoring](../pages-for-subheaders/monitoring-and-alerting.md), [Logging](../pages-for-subheaders/logging.md), [Istio](../pages-for-subheaders/istio.md)) | ✓ | ✓ | ✓ | ✓ |
| [Running Security Scans](security/security-scan/) | ✓ | ✓ | ✓ | ✓ |
| [Use existing configuration to create additional clusters](../how-to-guides/advanced-user-guides/manage-clusters/clone-cluster-configuration.md)| ✓ | ✓ | ✓ | |
| [Ability to rotate certificates](../how-to-guides/advanced-user-guides/manage-clusters/rotate-certificates.md) | ✓ | ✓  |  | |
| Ability to [backup](../how-to-guides/new-user-guides/backup-restore-and-disaster-recovery/back-up-rancher-launched-kubernetes-clusters.md) and [restore](../how-to-guides/new-user-guides/backup-restore-and-disaster-recovery/restore-rancher-launched-kubernetes-clusters-from-backup.md) Rancher-launched clusters | ✓ | ✓ |  | ✓<sup>4</sup> |
| [Cleaning Kubernetes components when clusters are no longer reachable from Rancher](../how-to-guides/advanced-user-guides/manage-clusters/clean-cluster-nodes.md) | ✓ | | | |
| [Configuring Pod Security Policies](../how-to-guides/advanced-user-guides/manage-clusters/add-a-pod-security-policy.md) | ✓ | ✓ |  ||

1. Registered GKE and EKS clusters have the same options available as GKE and EKS clusters created from the Rancher UI. The  difference is that when a registered cluster is deleted from the Rancher UI, it is not destroyed.

2. Cluster configuration options can't be edited for registered clusters, except for [K3s and RKE2 clusters.](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/register-existing-clusters.md)

3. For registered cluster nodes, the Rancher UI exposes the ability to cordon, drain, and edit the node.

4. For registered clusters using etcd as a control plane, snapshots must be taken manually outside of the Rancher UI to use for backup and recovery.
