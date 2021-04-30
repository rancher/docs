---
headless: true
---

{{% tabs %}}
{{% tab "Rancher v2.5.8" %}}

| Action | Rancher Launched Kubernetes Clusters |  EKS and GKE Clusters* | Other Hosted Kubernetes Clusters | Non-EKS or GKE Registered Clusters |
| --- | --- | ---| ---|----|
| [Using kubectl and a kubeconfig file to Access a Cluster]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/kubectl/) | ✓ | ✓ | ✓ | ✓ |
| [Managing Cluster Members]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/cluster-members/) | ✓ | ✓ | ✓ | ✓ |
| [Editing and Upgrading Clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/) | ✓ | ✓ | ✓ | ** |
| [Managing Nodes]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/nodes) | ✓ | ✓ | ✓ | ✓ *** |
| [Managing Persistent Volumes and Storage Classes]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/volumes-and-storage/) | ✓ | ✓ | ✓ | ✓ |
| [Managing Projects, Namespaces and Workloads]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/projects-and-namespaces/) | ✓ | ✓ | ✓ | ✓ |
| [Using App Catalogs]({{<baseurl>}}/rancher/v2.5/en/catalog/) | ✓ | ✓ | ✓ | ✓ |
| [Configuring Tools (Alerts, Notifiers, Logging, Monitoring, Istio)]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/) | ✓ | ✓ | ✓ | ✓ |
| [Running Security Scans]({{<baseurl>}}/rancher/v2.5/en/security/security-scan/) | ✓ | ✓ | ✓ | ✓ |
| [Cloning Clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cloning-clusters/)| ✓ | ✓ |✓ | |
| [Ability to rotate certificates]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/certificate-rotation/) | ✓ | ✓  |  | |
| [Ability to back up your Kubernetes Clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/backing-up-etcd/) | ✓ | ✓ |  | |
| [Ability to recover and restore etcd]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/restoring-etcd/) | ✓ |  ✓ |  | |
| [Cleaning Kubernetes components when clusters are no longer reachable from Rancher]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cleaning-cluster-nodes/) | ✓ | | | |
| [Configuring Pod Security Policies]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/pod-security-policy/) | ✓ | ✓ |  ||

\* Registered GKE and EKS clusters have the same options available as GKE and EKS clusters created from the Rancher UI. The  difference is that when a registered cluster is deleted from the Rancher UI, [it is not destroyed.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/registered-clusters/#additional-features-for-registered-eks-and-gke-clusters)

\* \* Cluster configuration options can't be edited for imported clusters, except for [K3s and RKE2 clusters.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/imported-clusters/)

\* \* \* For registered cluster nodes, the Rancher UI exposes the ability to cordon drain, and edit the node.

{{% /tab %}}
{{% tab "Rancher v2.5.0-v2.5.7" %}}

| Action | Rancher Launched Kubernetes Clusters | Hosted Kubernetes Clusters | Registered EKS Clusters | All Other Registered Clusters |
| --- | --- | ---| ---|----|
| [Using kubectl and a kubeconfig file to Access a Cluster]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/kubectl/) | ✓ | ✓ | ✓ | ✓ |
| [Managing Cluster Members]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/cluster-members/) | ✓ | ✓ | ✓ | ✓ |
| [Editing and Upgrading Clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/) | ✓ | ✓ | ✓ | * |
| [Managing Nodes]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/nodes) | ✓ | ✓ | ✓ | ✓ ** |
| [Managing Persistent Volumes and Storage Classes]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/volumes-and-storage/) | ✓ | ✓ | ✓ | ✓ |
| [Managing Projects, Namespaces and Workloads]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/projects-and-namespaces/) | ✓ | ✓ | ✓ | ✓ |
| [Using App Catalogs]({{<baseurl>}}/rancher/v2.5/en/catalog/) | ✓ | ✓ | ✓ | ✓ |
| [Configuring Tools (Alerts, Notifiers, Logging, Monitoring, Istio)]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/tools/) | ✓ | ✓ | ✓ | ✓ |
| [Running Security Scans]({{<baseurl>}}/rancher/v2.5/en/security/security-scan/) | ✓ | ✓ | ✓ | ✓ |
| [Cloning Clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cloning-clusters/)| ✓ | ✓ |✓ | |
| [Ability to rotate certificates]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/certificate-rotation/) | ✓ |  | ✓ | |
| [Ability to back up your Kubernetes Clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/backing-up-etcd/) | ✓ | | ✓ | |
| [Ability to recover and restore etcd]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/restoring-etcd/) | ✓ | | ✓ | |
| [Cleaning Kubernetes components when clusters are no longer reachable from Rancher]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cleaning-cluster-nodes/) | ✓ | | | |
| [Configuring Pod Security Policies]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/pod-security-policy/) | ✓ |  | ✓ ||

\* Cluster configuration options can't be edited for imported clusters, except for [K3s and RKE2 clusters.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/imported-clusters/)

\* \* For registered cluster nodes, the Rancher UI exposes the ability to cordon drain, and edit the node.


{{% /tab %}}
{{% /tabs %}}