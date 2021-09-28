---
title: Enable Monitoring
weight: 1
---

As an [administrator]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Prometheus to monitor your Kubernetes cluster.

This page describes how to enable monitoring and alerting within a cluster using the new monitoring application.

You can enable monitoring with or without SSL.

# Requirements

- Make sure that you are allowing traffic on port 9796 for each of your nodes because Prometheus will scrape metrics from here.
- Make sure your cluster fulfills the resource requirements. The cluster should have at least 1950Mi memory available, 2700m CPU, and 50Gi storage. A breakdown of the resource limits and requests is [here.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/configuration/helm-chart-options/#configuring-resource-limits-and-requests)
- When installing monitoring on an RKE cluster using RancherOS or Flatcar Linux nodes, change the etcd node certificate directory to `/opt/rke/etc/kubernetes/ssl`.

> **Note:** If you want to set up Alertmanager, Grafana or Ingress, it has to be done with the settings on the Helm chart deployment. It's problematic to create Ingress outside the deployment.

# Setting Resource Limits and Requests

The resource requests and limits can be configured when installing `rancher-monitoring`.  To configure Prometheus resources from the Rancher UI, click **Apps & Marketplace > Monitoring** in the upper left corner.

For more information about the default limits, see [this page.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/configuration/helm-chart-options/#configuring-resource-limits-and-requests)

# Install the Monitoring Application

{{% tabs %}}
{{% tab "Rancher v2.5.8" %}}

### Enable Monitoring for use without SSL

1. In the Rancher UI, go to the cluster where you want to install monitoring and click **Cluster Explorer.**
1. Click **Apps.**
1. Click the `rancher-monitoring` app.
1. Optional: Click **Chart Options** and configure alerting, Prometheus and Grafana. For help, refer to the [configuration reference.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/configuration/helm-chart-options/)
1. Scroll to the bottom of the Helm chart README and click **Install.**

**Result:** The monitoring app is deployed in the `cattle-monitoring-system` namespace.

### Enable Monitoring for use with SSL

1. Follow the steps on [this page]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/secrets/) to create a secret in order for SSL to be used for alerts.
 - The secret should be created in the `cattle-monitoring-system` namespace. If it doesn't exist, create it first.
 - Add the `ca`, `cert`, and `key` files to the secret.
1. In the Rancher UI, go to the cluster where you want to install monitoring and click **Cluster Explorer.**
1. Click **Apps.**
1. Click the `rancher-monitoring` app.
1. Click **Alerting**.
1. Click **Additional Secrets** and add the secrets created earlier.
 
**Result:** The monitoring app is deployed in the `cattle-monitoring-system` namespace.

When [creating a receiver,]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/configuration/alertmanager/#creating-receivers-in-the-rancher-ui) SSL-enabled receivers such as email or webhook will have a **SSL** section with fields for **CA File Path**, **Cert File Path**, and **Key File Path**. Fill in these fields with the paths to each of `ca`, `cert`, and `key`. The path will be of the form `/etc/alertmanager/secrets/name-of-file-in-secret`.

For example, if you created a secret with these key-value pairs:

```yaml
ca.crt=`base64-content`
cert.pem=`base64-content`
key.pfx=`base64-content`
```

Then **Cert File Path** would be set to `/etc/alertmanager/secrets/cert.pem`.

{{% /tab %}}
{{% tab "Rancher v2.5.0-2.5.7" %}}

1. In the Rancher UI, go to the cluster where you want to install monitoring and click **Cluster Explorer.**
1. Click **Apps.**
1. Click the `rancher-monitoring` app.
1. Optional: Click **Chart Options** and configure alerting, Prometheus and Grafana. For help, refer to the [configuration reference.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/configuration/helm-chart-options/)
1. Scroll to the bottom of the Helm chart README and click **Install.**

**Result:** The monitoring app is deployed in the `cattle-monitoring-system` namespace.

{{% /tab %}}

{{% /tabs %}}
