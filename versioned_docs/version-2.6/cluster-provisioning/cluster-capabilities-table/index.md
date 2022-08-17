---
headless: true
---


| Action | Rancher Launched Kubernetes Clusters |  EKS, GKE and AKS Clusters<sup>1</sup> | Other Hosted Kubernetes Clusters | Non-EKS or GKE Registered Clusters |
| --- | --- | ---| ---|----|
| [Using kubectl and a kubeconfig file to Access a Cluster]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/cluster-access/kubectl/) | ✓ | ✓ | ✓ | ✓ |
| [Managing Cluster Members]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/cluster-access/cluster-members/) | ✓ | ✓ | ✓ | ✓ |
| [Editing and Upgrading Clusters]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/editing-clusters/) | ✓ | ✓ | ✓ | ✓<sup>2</sup> |
| [Managing Nodes]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/nodes) | ✓ | ✓ | ✓ | ✓<sup>3</sup> |
| [Managing Persistent Volumes and Storage Classes]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/volumes-and-storage/) | ✓ | ✓ | ✓ | ✓ |
| [Managing Projects, Namespaces and Workloads]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/projects-and-namespaces/) | ✓ | ✓ | ✓ | ✓ |
| [Using App Catalogs]({{<baseurl>}}/rancher/v2.6/en/helm-charts/) | ✓ | ✓ | ✓ | ✓ |
| Configuring Tools ([Alerts, Notifiers, Monitoring]({{<baseurl>}}/rancher/v2.6/en/monitoring-alerting/), [Logging]({{<baseurl>}}/rancher/v2.6/en/logging/), [Istio]({{<baseurl>}}/rancher/v2.6/en/istio/)) | ✓ | ✓ | ✓ | ✓ |
| [Running Security Scans]({{<baseurl>}}/rancher/v2.6/en/security/security-scan/) | ✓ | ✓ | ✓ | ✓ |
| [Use existing configuration to create additional clusters]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/cloning-clusters/)| ✓ | ✓ | ✓ | |
| [Ability to rotate certificates]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/certificate-rotation/) | ✓ | ✓  |  | |
| Ability to [backup]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/backing-up-etcd/) and [restore]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/restoring-etcd/) Rancher-launched clusters | ✓ | ✓ |  | ✓<sup>4</sup> |
| [Cleaning Kubernetes components when clusters are no longer reachable from Rancher]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/cleaning-cluster-nodes/) | ✓ | | | |
| [Configuring Pod Security Policies]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/pod-security-policy/) | ✓ | ✓ |  ||

1. Registered GKE and EKS clusters have the same options available as GKE and EKS clusters created from the Rancher UI. The  difference is that when a registered cluster is deleted from the Rancher UI, it is not destroyed.

2. Cluster configuration options can't be edited for registered clusters, except for [K3s and RKE2 clusters.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/registered-clusters/)

3. For registered cluster nodes, the Rancher UI exposes the ability to cordon, drain, and edit the node.

4. For registered clusters using etcd as a control plane, snapshots must be taken manually outside of the Rancher UI to use for backup and recovery.
