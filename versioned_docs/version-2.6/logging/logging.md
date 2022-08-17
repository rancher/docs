---
title: Rancher Integration with Logging Services
shortTitle: Logging
description: Rancher integrates with popular logging services. Learn the requirements and benefits of integrating with logging services, and enable logging on your cluster.
metaDescription: "Rancher integrates with popular logging services. Learn the requirements and benefits of integrating with logging services, and enable logging on your cluster."
weight: 15
---

The [Banzai Cloud Logging operator](https://banzaicloud.com/docs/one-eye/logging-operator/) now powers Rancher's logging solution in place of the former, in-house solution.

For an overview of the changes in v2.5, see [this section.]({{<baseurl>}}/rancher/v2.6/en/logging/architecture/#changes-in-rancher-v2-5) For information about migrating from Logging V1, see [this page.](./migrating)

- [Enabling Logging](#enabling-logging)
- [Uninstall Logging](#uninstall-logging)
- [Architecture](#architecture)
- [Role-based Access Control](#role-based-access-control)
- [Configuring the Logging Custom Resources](#configuring-the-logging-custom-resources)
  - [Flows and ClusterFlows](#flows-and-clusterflows)
  - [Outputs and ClusterOutputs](#outputs-and-clusteroutputs)
- [Configuring the Logging Helm Chart](#configuring-the-logging-helm-chart)
  - [Windows Support](#windows-support)
  - [Working with a Custom Docker Root Directory](#working-with-a-custom-docker-root-directory)
  - [Working with Taints and Tolerations](#working-with-taints-and-tolerations)
  - [Logging V2 with SELinux](#logging-v2-with-selinux)
  - [Additional Logging Sources](#additional-logging-sources)
- [Troubleshooting](#troubleshooting)

# Enabling Logging

You can enable the logging for a Rancher managed cluster by going to the Apps page and installing the logging app.

1. Go to the cluster where you want to install logging and click **Apps & Marketplace**.
1. Click the **Logging** app.
1. Scroll to the bottom of the Helm chart README and click **Install**.

**Result:** The logging app is deployed in the `cattle-logging-system` namespace.

# Uninstall Logging

1. Go to the cluster where you want to install logging and click **Apps & Marketplace**.
1. Click **Installed Apps**.
1. Go to the `cattle-logging-system` namespace and check the boxes for `rancher-logging` and `rancher-logging-crd`.
1. Click **Delete**.
1. Confirm **Delete**.

**Result** `rancher-logging` is uninstalled.

# Architecture

For more information about how the logging application works, see [this section.](./architecture)



# Role-based Access Control

Rancher logging has two roles, `logging-admin` and `logging-view`. For more information on how and when to use these roles, see [this page.](./rbac)

# Configuring Logging Custom Resources

To manage `Flows,` `ClusterFlows`, `Outputs`, and `ClusterOutputs`, 

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to configure logging custom resources and click **Explore**.
1. In the left navigation bar, click **Logging**.

### Flows and ClusterFlows

For help with configuring `Flows` and `ClusterFlows`, see [this page.](./custom-resource-config/flows)

### Outputs and ClusterOutputs

For help with configuring `Outputs` and `ClusterOutputs`, see [this page.](./custom-resource-config/outputs)

# Configuring the Logging Helm Chart

For a list of options that can be configured when the logging application is installed or upgraded, see [this page.](./helm-chart-options)

### Windows Support

Logging support for Windows clusters is available and logs can be collected from Windows nodes.

For details on how to enable or disable Windows node logging, see [this section.](./helm-chart-options/#enable-disable-windows-node-logging)

### Working with a Custom Docker Root Directory

For details on using a custom Docker root directory, see [this section.](./helm-chart-options/#working-with-a-custom-docker-root-directory)


### Working with Taints and Tolerations

For information on how to use taints and tolerations with the logging application, see [this page.](./taints-tolerations)


### Logging V2 with SELinux

For information on enabling the logging application for SELinux-enabled nodes, see [this section.](./helm-chart-options/#enabling-the-logging-application-to-work-with-selinux)

### Additional Logging Sources

By default, Rancher collects logs for control plane components and node components for all cluster types. In some cases additional logs can be collected. For details, see [this section.](./helm-chart-options/#enabling-the-logging-application-to-work-with-selinux)


# Troubleshooting

### The `cattle-logging` Namespace Being Recreated

If your cluster previously deployed logging from the global view in the legacy Rancher UI, you may encounter an issue where its `cattle-logging` namespace is continually being recreated.

The solution is to delete all `clusterloggings.management.cattle.io` and `projectloggings.management.cattle.io` custom resources from the cluster specific namespace in the management cluster.
The existence of these custom resources causes Rancher to create the `cattle-logging` namespace in the downstream cluster if it does not exist.

The cluster namespace matches the cluster ID, so we need to find the cluster ID for each cluster.

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster you want to get the ID of and click **Explore**.
2. Copy the `<cluster-id>` portion from one of the URLs below. The `<cluster-id>` portion is the cluster namespace name.

```bash
# Cluster Management UI
https://<your-url>/c/<cluster-id>/

# Cluster Dashboard
https://<your-url>/dashboard/c/<cluster-id>/
```

Now that we have the `<cluster-id>` namespace, we can delete the CRs that cause `cattle-logging` to be continually recreated.
*Warning:* ensure that logging, the version installed from the global view in the legacy Rancher UI, is not currently in use.

```bash
kubectl delete clusterloggings.management.cattle.io -n <cluster-id>
kubectl delete projectloggings.management.cattle.io -n <cluster-id>
```
