---
title: Services
weight: 3045
---

Pod configuration is managed by Deployments, StatefulSets and Daemonsets, whereas services direct traffic to pods using selectors.

For every workload (with at least one port configured) created, a complementing Service Discovery entry is created. This Service Discovery entry enables DNS resolution for the workload's pods using the following naming convention:
`<workload>.<namespace>.svc.cluster.local`.

You can create additional services so that a given namespace resolves with one or more external IP addresses, an external hostname, an alias to another DNS record, other workloads, or a set of pods that match a selector that you create.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to add a service and click **Explore**.
1. Click **Service Discovery > Services**.
1. Click **Create**.
1. Choose the type of service you want to create.
1. Select a **Namespace** from the drop-down list. 
1. Enter a **Name** for the service. This name is used for DNS resolution.
1. Fill out the rest of the form. For help, refer to the upstream Kubernetes documentation about [services.](https://kubernetes.io/docs/concepts/services-networking/service/)
1. Click **Create**.

**Result:** A new service is created.

- You can view the record by from the project's **Service Discovery** tab.
- When you visit the new DNS name for the new record that you created (`<recordname>.<namespace>.svc.cluster.local`), it resolves the chosen namespace.

## Related Links

- [Adding entries to Pod /etc/hosts with HostAliases](https://kubernetes.io/docs/concepts/services-networking/add-entries-to-pod-etc-hosts-with-host-aliases/)
