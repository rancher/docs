---
title: Enabling Unsupported Features
weight: 8000
---

Rancher includes some features that are unsupported and disabled by default. You might want to enable these features, for example, if you decide that the benefits of using an [unsupported storage type](#allow-unsupported-storage-drivers) outweighs the risk of using a feature that is not supported. In Rancher v2.3.0, feature flags were introduced to allow you to try these features. 

The features can be enabled in two ways:

- When installing Rancher with a CLI, you can use a feature flag to enable a feature by default
- After installing Rancher, you can turn on the features with the Rancher API

The following is a list of the feature flags available in Rancher:

Feature | Environment Variable Key | Default Value | Description | Available as of |
---|---|---|---|---
[Allow unsupported storage drivers](#allow-unsupported-storage-drivers) | `unsupported-storage-drivers` | `false` | This feature enables unsupported types for storage providers and provisioners. | v2.3.0
[UI for Istio virtual services and destination rules](#ui-for-istio-virtual-services-and-destination-rules) | `istio-virtual-service-ui`| `false` | Enables a UI that lets you create, read, update and delete virtual services and destination rules, which are traffic management features of Istio | v2.3.0

# Enabling Features when Starting Rancher

When you install Rancher, enable the feature you want with a feature flag. The command is different depending on whether you are installing Rancher on a single node or if you are doing an HA installation of Rancher.

{{% tabs %}}
{{% tab "HA Install" %}}
When installing Rancher with Helm, use the `--features` option:
```
helm install rancher-latest/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --features="<FEATURE-NAME>=true"
  ```
{{% /tab %}}
{{% tab "Single Node Install" %}}
When installing Rancher with Docker, use the `--features` option:
```
docker run -d -p 80:80 -p 443:443 \
  --restart=unless-stopped \
  rancher/rancher:rancher-latest \
  --features="<FEATURE-NAME>=true"
```
{{% /tab %}}
{{% /tabs %}}

# Enabling Features with the Rancher API

1. Go to `<RANCHER-SERVER-URL>/v3/features`.
1. In the `data` section, you will see an array containing all of the features that can be turned on with feature flags. The name of the feature is in the `id` field. Click the name of the feature you want to enable.
1. In the upper left corner of the screen, under **Operations,** click **Edit.**
1. In the **Value** drop-down menu, click **True.**
1. Click **Show Request.**
1. Click **Send Request.**
1. Click **Close.**

**Result:** The feature is enabled.


# Disabling Features with the Rancher API

1. Go to `<RANCHER-SERVER-URL>/v3/features`.
1. In the `data` section, you will see an array containing all of the features that can be turned on with feature flags. The name of the feature is in the `id` field. Click the name of the feature you want to enable.
1. In the upper left corner of the screen, under **Operations,** click **Edit.**
1. In the **Value** drop-down menu, click **False.**
1. Click **Show Request.**
1. Click **Send Request.**
1. Click **Close.**

**Result:** The feature is disabled.

# Allow Unsupported Storage Drivers

This feature enables unsupported types for storage providers and provisioners.

### Supported Types for Persistent Volume Plugins
Below is a list of supported storage types for persistent volume plugins. Everything not on the list is unsupported:

- `aws-ebs`
- `azure-disk`
- `azure-file`
- `flex-volume-longhorn`
- `gce-pd`
- `host-path`
- `local`
- `nfs`
- `vsphere-volume`

### Supported Types for StorageClass
Below is a list of supported storage types for a StorageClass. Everything not on the list is unsupported:

- `aws-ebs`
- `azure-disk`
- `azure-file`
- `gce-pd`
- `longhorn`
- `local`
- `vsphere-volume`

# UI for Istio Virtual Services and Destination Rules

> **Prerequisite:** Istio must be [enabled for the cluster.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup)

A central advantage of Istio's traffic management features is that they allow dynamic request routing, which is useful for canary deployments, blue/green deployments, or A/B testing.

When enabled, this feature turns on a page that lets you configure some traffic management features of Istio using the Rancher UI. Without this feature, you need to use `kubectl` to manage traffic with Istio.

The feature enables two UI tabs: one tab for **Virtual Services** and another for **Destination Rules.** 

- **Virtual services** intercept and direct traffic to your Kubernetes services, allowing you to direct percentages of traffic from a request to different services. You can use them to define a set of routing rules to apply when a host is addressed. For details, refer to the [Istio documentation.](https://istio.io/docs/reference/config/networking/v1alpha3/virtual-service/)
- **Destination rules** serve as the single source of truth about which service versions are available to receive traffic from virtual services. You can use these resources to define policies that apply to traffic that is intended for a service after routing has occurred. For details, refer to the [Istio documentation.](https://istio.io/docs/reference/config/networking/v1alpha3/destination-rule)

To see these tabs,

1. Go to the project view in Rancher and click **Resources > Istio.**
1. You will see tabs for **Traffic Graph,** which has the Kiali network visualization integrated into the UI, and **Traffic Metrics,** which shows metrics for the success rate and request volume of traffic to your services, among other metrics. Next to these tabs, you should see the tabs for **Virtual Services** and **Destination Rules.**
