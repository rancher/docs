---
title: Enable Monitoring
weight: 1
---

As an [administrator](../authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/global-permissions.md) or [cluster owner](../authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md#cluster-roles), you can configure Rancher to deploy Prometheus to monitor your Kubernetes cluster.

This page describes how to enable monitoring and alerting within a cluster using the new monitoring application.

You can enable monitoring with or without SSL.

# Requirements

- Make sure that you are allowing traffic on port 9796 for each of your nodes because Prometheus will scrape metrics from here.
- Make sure your cluster fulfills the resource requirements. The cluster should have at least 1950Mi memory available, 2700m CPU, and 50Gi storage. A breakdown of the resource limits and requests is [here.](../../../reference-guides/monitoring-v2-configuration/helm-chart-options.md#configuring-resource-limits-and-requests)
- When installing monitoring on an RKE cluster using RancherOS or Flatcar Linux nodes, change the etcd node certificate directory to `/opt/rke/etc/kubernetes/ssl`.
- For clusters provisioned with the RKE CLI and the address is set to a hostname instead of an IP address, set `rkeEtcd.clients.useLocalhost` to `true` during the Values configuration step of the installation. The YAML snippet will look like the following:

```yaml
rkeEtcd:
  clients:
    useLocalhost: true
```

:::note

If you want to set up Alertmanager, Grafana or Ingress, it has to be done with the settings on the Helm chart deployment. It's problematic to create Ingress outside the deployment.

:::

# Setting Resource Limits and Requests

The resource requests and limits can be configured when installing `rancher-monitoring`.  To configure Prometheus resources from the Rancher UI, click **Apps & Marketplace > Monitoring** in the upper left corner.

For more information about the default limits, see [this page.](../../../reference-guides/monitoring-v2-configuration/helm-chart-options.md#configuring-resource-limits-and-requests)

# Install the Monitoring Application

### Enable Monitoring for use without SSL

1.  Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. Click **Cluster Tools** (bottom left corner).
1. Click **Install** by Monitoring.
1. Optional: Customize requests, limits and more for Alerting, Prometheus, and Grafana in the Values step. For help, refer to the [configuration reference.](../../../reference-guides/monitoring-v2-configuration/helm-chart-options.md)

**Result:** The monitoring app is deployed in the `cattle-monitoring-system` namespace.

### Enable Monitoring for use with SSL

1. Follow the steps on [this page](../../new-user-guides/kubernetes-resources-setup/secrets.md) to create a secret in order for SSL to be used for alerts.
 - The secret should be created in the `cattle-monitoring-system` namespace. If it doesn't exist, create it first.
 - Add the `ca`, `cert`, and `key` files to the secret.
1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to enable monitoring for use with SSL and click **Explore**.
1. Click **Apps & Marketplace > Charts**.
1. Click **Monitoring**.
1. Click **Install** or **Update**, depending on whether you have already installed Monitoring.
1. Check the box for **Customize Helm options before install** and click **Next**.
1. Click **Alerting**.
1. In the **Additional Secrets** field, add the secrets created earlier.

**Result:** The monitoring app is deployed in the `cattle-monitoring-system` namespace.

When [creating a receiver,](../monitoring-v2-configuration-guides/advanced-configuration/alertmanager.md#creating-receivers-in-the-rancher-ui) SSL-enabled receivers such as email or webhook will have a **SSL** section with fields for **CA File Path**, **Cert File Path**, and **Key File Path**. Fill in these fields with the paths to each of `ca`, `cert`, and `key`. The path will be of the form `/etc/alertmanager/secrets/name-of-file-in-secret`.

For example, if you created a secret with these key-value pairs:

```yaml
ca.crt=`base64-content`
cert.pem=`base64-content`
key.pfx=`base64-content`
```

Then **Cert File Path** would be set to `/etc/alertmanager/secrets/cert.pem`.
