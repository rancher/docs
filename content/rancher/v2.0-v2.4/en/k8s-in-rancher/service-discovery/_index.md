---
title: Service Discovery
weight: 3045
aliases:
  - /rancher/v2.0-v2.4/en/tasks/workloads/add-a-dns-record/
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/service-discovery
---

For every workload created, a complementing Service Discovery entry is created. This Service Discovery entry enables DNS resolution for the workload's pods using the following naming convention:
`<workload>.<namespace>.svc.cluster.local`.

However, you also have the option of creating additional Service Discovery records. You can use these additional records so that a given namespace resolves with one or more external IP addresses, an external hostname, an alias to another DNS record, other workloads, or a set of pods that match a selector that you create.

1. From the **Global** view, open the project that you want to add a DNS record to.

1. Click **Resources** in the main navigation bar. Click the **Service Discovery** tab. (In versions before v2.3.0, just click the **Service Discovery** tab.) Then click **Add Record**.

1. Enter a **Name** for the DNS record. This name is used for DNS resolution.

1. Select a **Namespace** from the drop-down list. Alternatively, you can create a new namespace on the fly by clicking **Add to a new namespace**.

1. Select one of the **Resolves To** options to route requests to the DNS record.

    1. **One or more external IP addresses**

        Enter an IP address in the **Target IP Addresses** field. Add more IP addresses by clicking **Add Target IP**.

    1. **An external hostname**

        Enter a **Target Hostname**.

    1. **Alias of another DNS record's value**

        Click **Add Target Record** and select another DNS record from the **Value** drop-down.

    1. **One or more workloads**

        Click **Add Target Workload** and select another workload from the **Value** drop-down.

    1. **The set of pods which match a selector**

        Enter key value pairs of [label selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors) to create a record for all pods that match your parameters.

1. Click **Create**

**Result:** A new DNS record is created.

- You can view the record by from the project's **Service Discovery** tab.
- When you visit the new DNS name for the new record that you created (`<recordname>.<namespace>.svc.cluster.local`), it resolves the chosen namespace.

## Related Links

- [Adding entries to Pod /etc/hosts with HostAliases](https://kubernetes.io/docs/concepts/services-networking/add-entries-to-pod-etc-hosts-with-host-aliases/)
