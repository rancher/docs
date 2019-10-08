---
title: Enabling Unsupported Features
weight: 8000
---
_Available as of v2.3.0_

Rancher includes some features that are unsupported and disabled by default. You might want to enable these features, for example, if you decide that the benefits of using an [unsupported storage type]({{<baseurl>}}/rancher/v2.x/en/admin-settings/feature-flags/unsupported-storage-drivers) outweighs the risk of using a feature that is not supported. Feature flags were introduced to allow you to try these features. 

The features can be enabled in two ways:

- When installing Rancher with a CLI, you can use a feature flag to enable a feature by default
- After installing Rancher, you can turn on the features with the Rancher API

Each feature has two values:

- A default value, which can be configured with a flag or environment variable from the command line
- A set value, which can be configured with the Rancher API

If no value has been set, Rancher uses the default value.

Because the API sets the actual value and the command line sets the default value, that means that if you enable or disable a feature with the API, it will override any value set with the command line.

For example, if you install Rancher, then set a feature flag to true with the Rancher API, then upgrade Rancher with a command that sets the feature flag to false, the default value will still be false, but the feature will still be enabled because it was set with the Rancher API. If you then deleted the set value (true) with the Rancher API, setting it to NULL, the default value (false) would take effect.

The following is a list of the feature flags available in Rancher:

Feature | Environment Variable Key | Default Value | Description | Available as of |
---|---|---|---|---
[Allow unsupported storage drivers]({{<baseurl>}}/rancher/v2.x/en/admin-settings/feature-flags/unsupported-storage-drivers) | `unsupported-storage-drivers` | `false` | This feature enables unsupported types for storage providers and provisioners. | v2.3.0
[UI for Istio virtual services and destination rules]({{<baseurl>}}/rancher/v2.x/en/admin-settings/feature-flags/istio-virtual-service-ui) | `istio-virtual-service-ui`| `false` | Enables a UI that lets you create, read, update and delete virtual services and destination rules, which are traffic management features of Istio | v2.3.0

# Enabling Features when Starting Rancher

When you install Rancher, enable the feature you want with a feature flag. The command is different depending on whether you are installing Rancher on a single node or if you are doing an HA installation of Rancher.

> **Note:** Values set from the Rancher API will override the value passed in through the command line.

{{% tabs %}}
{{% tab "HA Install" %}}
When installing Rancher with a Helm chart, use the `--features` option:
```
helm install rancher-latest/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set 'extraEnv[0].name=CATTLE_FEATURES'
  --set 'extraEnv[0].value=<FEATURE-NAME1>=true,<FEATURE-NAME2>=true'
```

### Rendering the Helm Chart for Air Gap Installations

For an air gap installation of Rancher, you need to add a Helm chart repository and render a Helm template before installing Rancher with Helm. For details, refer to the [air gap installation documentation.]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap/install-rancher)

Here is an example of a command for passing in the feature flag options when rendering the Helm template:
```
helm template ./rancher-<VERSION>.tgz --output-dir . \
  --name rancher \
  --namespace cattle-system \
  --set hostname=<RANCHER.YOURDOMAIN.COM> \
  --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
  --set ingress.tls.source=secret \
  --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
  --set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
  --set 'extraEnv[0].name=CATTLE_FEATURES'
  --set 'extraEnv[0].value=<FEATURE-NAME1>=true,<FEATURE-NAME2>=true'
```
{{% /tab %}}
{{% tab "Single Node Install" %}}
When installing Rancher with Docker, use the `--features` option:
```
docker run -d -p 80:80 -p 443:443 \
  --restart=unless-stopped \
  rancher/rancher:rancher-latest \
  --features="<FEATURE-NAME1>=true,<FEATURE-NAME2>=true
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
