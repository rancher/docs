---
title: Feature Flags
---

Feature flags were introduced to allow you to try experimental features that are not enabled by default.

To learn about feature values and how to enable features, refer [here](../../pages-for-subheaders/enable-experimental-features.md).

The following is a list of the feature flags available in Rancher:

- `harvester`: This feature flag is available starting in v2.6.1. It is used to manage access to the Virtualization Management page where users can navigate directly to Harvester clusters and access the Harvester UI. For more information, see [this page](../explanations/integrations-in-rancher/harvester.md#feature-flag/).
- `rke2`: Used to enable the ability to provision RKE2 clusters. By default, this feature flag is enabled, which allows users to attempt to provision these type of clusters.
- `fleet`: The previous `fleet` feature flag is now required to be enabled as the Fleet capabilities are leveraged within the new provisioning framework. If you had this feature flag disabled in earlier versions, upon upgrading to Rancher v2.6, the flag will automatically be enabled. See this [page](../how-to-guides/new-user-guides/deploy-apps-across-clusters/fleet.md) for more information.
- `continuous-delivery`: In Rancher v2.5.x, Fleet came with a GitOps feature that could not be disabled separately from Fleet. In Rancher v2.6, the `continuous-delivery` feature flag was introduced to allow the GitOps feature of Fleet to be disabled. For more information, see [this page.](../getting-started/installation-and-upgrade/advanced-options/enable-experimental-features/continuous-delivery.md).
- `legacy`: There are a set of features from previous versions that are slowly being phased out of Rancher for newer iterations of the feature. This is a mix of deprecated features as well as features that will eventually be moved to newer variations in Rancher. By default, this feature flag is disabled for new installations. If you are upgrading from a previous version, this feature flag would be enabled.
- `token-hashing`: Used to enable new token-hashing feature. Once enabled, existing tokens will be hashed and all new tokens will be hashed automatically using the SHA256 algorithm. Once a token is hashed it cannot be undone. Once this feature flag is enabled, it cannot be disabled. See [hashing of tokens](../reference-guides/about-the-api/api-tokens.md) for more information.
- `unsupported-storage-drivers`: This feature [allows unsupported storage drivers.](../getting-started/installation-and-upgrade/advanced-options/enable-experimental-features/unsupported-storage-drivers.md). In other words, it enables types for storage providers and provisioners that are not enabled by default.
- `istio-virtual-service-ui`: This feature enables a [UI to create, read, update, and delete Istio virtual services and destination rules,](../getting-started/installation-and-upgrade/advanced-options/enable-experimental-features/istio-traffic-management-features.md) which are traffic management features of Istio.
- `multi-cluster-management`: Used for multi-cluster provisioning and management of Kubernetes clusters. This feature flag can only be set at install time and not changed afterwards.

The below table shows the availability and default value for feature flags in Rancher:

| Feature Flag Name             | Default Value | Status       | Available as of | Rancher Restart Required? |
| ----------------------------- | ------------- | ------------ | --------------- |---|
| `istio-virtual-service-ui`    | `false`       | Experimental | v2.3.0          | |
| `istio-virtual-service-ui`    | `true`        | GA*           | v2.3.2          | |
| `unsupported-storage-drivers` | `false`       | Experimental | v2.3.0          | |
| `fleet`  | `true` | GA* | v2.5.0 |   |
| `fleet`  | `true` | Can no longer be disabled | v2.6.0 | N/A  |
| `continuous-delivery` | `true` | GA* | v2.6.0 | |
| `token-hashing` | `false` for new installs, `true` for upgrades | GA* | v2.6.0 | |
| `legacy` | `false` for new installs, `true` for upgrades | GA* | v2.6.0 | |
| `multi-cluster-management` | `false` | GA* | v2.5.0 | |
| `harvester` | `true` | Experimental | v2.6.1 | |
| `rke2` | `true` | Experimental | v2.6.0 | |

\* Generally Available. This feature is included in Rancher and it is not experimental.