---
title: Enabling Experimental Features
weight: 17
---
Rancher includes some features that are experimental and disabled by default. You might want to enable these features, for example, if you decide that the benefits of using an [unsupported storage type]({{<baseurl>}}/rancher/v2.6/en/installation/resources/feature-flags/enable-not-default-storage-drivers) outweighs the risk of using an untested feature. Feature flags were introduced to allow you to try these features that are not enabled by default.

The features can be enabled in three ways:

- [Enable features when starting Rancher.](#enabling-features-when-starting-rancher) When installing Rancher with a CLI, you can use a feature flag to enable a feature by default.
- [Enable features from the Rancher UI](#enabling-features-with-the-rancher-ui) by going to the **Settings** page.
- [Enable features with the Rancher API](#enabling-features-with-the-rancher-api) after installing Rancher.

Each feature has two values:

- A default value, which can be configured with a flag or environment variable from the command line
- A set value, which can be configured with the Rancher API or UI

If no value has been set, Rancher uses the default value.

Because the API sets the actual value and the command line sets the default value, that means that if you enable or disable a feature with the API or UI, it will override any value set with the command line.

For example, if you install Rancher, then set a feature flag to true with the Rancher API, then upgrade Rancher with a command that sets the feature flag to false, the default value will still be false, but the feature will still be enabled because it was set with the Rancher API. If you then deleted the set value (true) with the Rancher API, setting it to NULL, the default value (false) would take effect.

> **Note:** There are some feature flags that may require a restart of the Rancher server container. These features that require a restart are marked in the table of these docs and in the UI.

The following is a list of the feature flags available in Rancher:

- `rke2`: We have introduced the ability to provision RKE2 clusters as tech preview. By default, this feature flag is enabled, which allows users to attempt to provision these type of clusters. Additionally, users can now select "Windows" in the Cluster Management page, then choose the appropriate options to configure the custom Windows cluster. Only Windows worker nodes may be registered. 
- `token-hashing`: This feature enables one-way [hashing of tokens]({{<baseurl>}}/rancher/v2.6/en/api/api-tokens) and cannot be disabled once enabled.
- `fleet`: Rancher comes with [Fleet]({{<baseurl>}}/rancher/v2.6/en/deploy-across-clusters/fleet) preinstalled in v2.5+. Rancher v2.6's new provisioning system leverages Fleet's bundle deployment capabilities in order to manage clusters at scale. Therefore, in Rancher v2.6, Fleet can no longer be disabled. If Fleet was disabled in Rancher v2.5.x, it will become enabled if Rancher is upgraded to v2.6.x.
- `continuous-delivery`: In Rancher v2.5.x, Fleet came with a GitOps feature that could not be disabled separately from Fleet. In Rancher v2.6, the `continuous-delivery` feature flag was introduced to allow the GitOps feature of Fleet to be disabled. For more information, see [this page.](./continuous-delivery)
- `istio-virtual-service-ui`: This feature enables a [UI to create, read, update, and delete Istio virtual services and destination rules]({{<baseurl>}}/rancher/v2.6/en/installation/resources/feature-flags/istio-virtual-service-ui), which are traffic management features of Istio.
- `unsupported-storage-drivers`: This feature [allows unsupported storage drivers.]({{<baseurl>}}/rancher/v2.6/en/installation/resources/feature-flags/enable-not-default-storage-drivers) In other words, it enables types for storage providers and provisioners that are not enabled by default.

The below table shows the availability and default value for feature flags in Rancher:

| Feature Flag Name             | Default Value | Status       | Available as of | Rancher Restart Required? |
| ----------------------------- | ------------- | ------------ | --------------- |---|
| `dashboard` | `true` | Experimental | v2.4.0 | x |
| `dashboard` | `true` | GA* and no longer a feature flag | v2.5.0 | x |
| `istio-virtual-service-ui`    | `false`       | Experimental | v2.3.0          | |
| `istio-virtual-service-ui`    | `true`        | GA*           | v2.3.2          | |
| `proxy` | `false` | Experimental | v2.4.0 | |
| `proxy` | N/A | Discontinued | v2.5.0 |  |
| `unsupported-storage-drivers` | `false`       | Experimental | v2.3.0          | |
| `fleet`  | `true` | GA* | v2.5.0 |   |
| `fleet`  | `true` | Can no longer be disabled | v2.6.0 | N/A  |
| `continuous-delivery` | `true` | GA* | v2.6.0 | |
| `token-hashing` | `false` | GA* | v2.6.0 | |
| `rke2` | `true` | Experimental | v2.6.0 | |

\* Generally Available. This feature is included in Rancher and it is not experimental.

# Enabling Features when Starting Rancher

When you install Rancher, enable the feature you want with a feature flag. The command is different depending on whether you are installing Rancher on a single node or if you are doing a Kubernetes Installation of Rancher.

### Enabling Features for Kubernetes Installs

> **Note:** Values set from the Rancher API will override the value passed in through the command line.

When installing Rancher with a Helm chart, use the `--features` option. In the below example, two features are enabled by passing the feature flag names names in a comma separated list:

```
helm install rancher-latest/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set 'extraEnv[0].name=CATTLE_FEATURES'
  --set 'extraEnv[0].value=<FEATURE-FLAG-NAME-1>=true,<FEATURE-FLAG-NAME-2>=true'
```

Note: If you are installing an alpha version, Helm requires adding the `--devel` option to the command.

### Rendering the Helm Chart for Air Gap Installations

For an air gap installation of Rancher, you need to add a Helm chart repository and render a Helm template before installing Rancher with Helm. For details, refer to the [air gap installation documentation.]({{<baseurl>}}/rancher/v2.6/en/installation/other-installation-methods/air-gap/install-rancher)

Here is an example of a command for passing in the feature flag names when rendering the Helm template. In the below example, two features are enabled by passing the feature flag names in a comma separated list.

The Helm 3 command is as follows:

```
helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
  --no-hooks \ # prevent files for Helm hooks from being generated
  --namespace cattle-system \
  --set hostname=<RANCHER.YOURDOMAIN.COM> \
  --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
  --set ingress.tls.source=secret \
  --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
  --set useBundledSystemChart=true # Use the packaged Rancher system charts
  --set 'extraEnv[0].name=CATTLE_FEATURES'
  --set 'extraEnv[0].value=<FEATURE-FLAG-NAME-1>=true,<FEATURE-FLAG-NAME-2>=true'
```

The Helm 2 command is as follows:

```
helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
  --namespace cattle-system \
  --set hostname=<RANCHER.YOURDOMAIN.COM> \
  --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
  --set ingress.tls.source=secret \
  --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
  --set useBundledSystemChart=true # Use the packaged Rancher system charts
  --set 'extraEnv[0].name=CATTLE_FEATURES'
  --set 'extraEnv[0].value=<FEATURE-FLAG-NAME-1>=true,<FEATURE-FLAG-NAME-2>=true'
```

### Enabling Features for Docker Installs

When installing Rancher with Docker, use the `--features` option. In the below example, two features are enabled by passing the feature flag names in a comma separated list:

```
docker run -d -p 80:80 -p 443:443 \
  --restart=unless-stopped \
  rancher/rancher:rancher-latest \
  --features=<FEATURE-FLAG-NAME-1>=true,<FEATURE-NAME-2>=true 
```


# Enabling Features with the Rancher UI

1. In the upper left corner, click **☰ > Global Settings**.
1. Click **Feature Flags**.
1. To enable a feature, go to the disabled feature you want to enable and click **⋮ > Activate**.

**Result:** The feature is enabled.

### Disabling Features with the Rancher UI

1. In the upper left corner, click **☰ > Global Settings**.
1. Click **Feature Flags**. You will see a list of experimental features.
1. To disable a feature, go to the enabled feature you want to disable and click **⋮ > Deactivate**.

**Result:** The feature is disabled.

# Enabling Features with the Rancher API

1. Go to `<RANCHER-SERVER-URL>/v3/features`.
1. In the `data` section, you will see an array containing all of the features that can be turned on with feature flags. The name of the feature is in the `id` field. Click the name of the feature you want to enable.
1. In the upper left corner of the screen, under **Operations,** click **Edit**.
1. In the **Value** drop-down menu, click **True**.
1. Click **Show Request**.
1. Click **Send Request**.
1. Click **Close**.

**Result:** The feature is enabled.

### Disabling Features with the Rancher API

1. Go to `<RANCHER-SERVER-URL>/v3/features`.
1. In the `data` section, you will see an array containing all of the features that can be turned on with feature flags. The name of the feature is in the `id` field. Click the name of the feature you want to enable.
1. In the upper left corner of the screen, under **Operations,** click **Edit**.
1. In the **Value** drop-down menu, click **False**.
1. Click **Show Request**.
1. Click **Send Request**.
1. Click **Close**.

**Result:** The feature is disabled.
