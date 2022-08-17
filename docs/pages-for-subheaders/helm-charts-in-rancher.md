---
title: Helm Charts in Rancher
weight: 11
---

In this section, you'll learn how to manage Helm chart repositories and applications in Rancher. Helm chart repositories are managed using **Apps & Marketplace**. It uses a catalog-like system to import bundles of charts from repositories and then uses those charts to either deploy custom Helm applications or Rancher's tools such as Monitoring or Istio. Rancher tools come as pre-loaded repositories which deploy as standalone Helm charts. Any additional repositories are only added to the current cluster.

### Changes in Rancher v2.6

Starting in Rancher v2.6.0, a new versioning scheme for Rancher feature charts was implemented. The changes are centered around the major version of the charts and the +up annotation for upstream charts, where applicable.

**Major Version:** The major version of the charts is tied to Rancher minor versions. When you upgrade to a new Rancher minor version, you should ensure that all of your **Apps & Marketplace** charts are also upgraded to the correct release line for the chart.

:::note

Any major versions that are less than the ones mentioned in the table below are meant for 2.5 and below only. For example, you are advised to not use <100.x.x versions of Monitoring in 2.6.x+.

:::

**Feature Charts:**

| **Name** | **Supported Minimum Version** | **Supported Maximum Version** |
| ---------------- | ------------ | ------------ |
| external-ip-webhook | 100.0.0+up1.0.0 | 100.0.1+up1.0.1 |
| harvester-cloud-provider | 100.0.2+up0.1.12 | 100.0.2+up0.1.12 |
| harvester-csi-driver | 100.0.2+up0.1.11 | 100.0.2+up0.1.11 |
| rancher-alerting-drivers | 100.0.0 | 100.0.2 |
| rancher-backup | 2.0.1 | 2.1.2 |
| rancher-cis-benchmark | 2.0.1 | 2.0.4 |
| rancher-gatekeeper | 100.0.0+up3.6.0 | 100.1.0+up3.7.1 |
| rancher-istio | 100.0.0+up1.10.4 | 100.2.0+up1.12.6 |
| rancher-logging | 100.0.0+up3.12.0 | 100.1.2+up3.17.4 |
| rancher-longhorn | 100.0.0+up1.1.2 | 100.1.1+up1.2.3 |
| rancher-monitoring | 100.0.0+up16.6.0 | 100.1.0+up19.0.3
| rancher-sriov (experimental) | 100.0.0+up0.1.0 | 100.0.3+up0.1.0 |
| rancher-vsphere-cpi | 100.3.0+up1.2.1 | 100.3.0+up1.2.1 |
| rancher-vsphere-csi | 100.3.0+up2.5.1-rancher1 | 100.3.0+up2.5.1-rancher1 |
| rancher-wins-upgrader | 0.0.100 | 100.0.0+up0.0.1 |
| neuvector | 100.0.0+up2.2.0 | 100.0.0+up2.2.0 |

<br/>
**Charts based on upstream:** For charts that are based on upstreams, the +up annotation should inform you of what upstream version the Rancher chart is tracking. Check the upstream version compatibility with Rancher during upgrades also.

- As an example, `100.x.x+up16.6.0` for Monitoring tracks upstream kube-prometheus-stack `16.6.0` with some Rancher patches added to it.

- On upgrades, ensure that you are not downgrading the version of the chart that you are using. For example, if you are using a version of Monitoring > `16.6.0` in Rancher 2.5, you should not upgrade to `100.x.x+up16.6.0`. Instead, you should upgrade to the appropriate version in the next release.


### Charts

From the top-left menu select _"Apps & Marketplace"_ and you will be taken to the Charts page.

The charts page contains all Rancher, Partner, and Custom Charts.

* Rancher tools such as Logging or Monitoring are included under the Rancher label
* Partner charts reside under the Partners label
* Custom charts will show up under the name of the repository

All three types are deployed and managed in the same way.

:::note

Apps managed by the Cluster Manager (the global view in the legacy Rancher UI) should continue to be managed only by the Cluster Manager, and apps managed with <b>Apps & Marketplace</b> in the new UI must be managed only by <b>Apps & Marketplace</b>.

:::

### Repositories

From the left sidebar select _"Repositories"_.

These items represent helm repositories, and can be either traditional helm endpoints which have an index.yaml, or git repositories which will be cloned and can point to a specific branch. In order to use custom charts, simply add your repository here and they will become available in the Charts tab under the name of the repository.

To add a private CA for Helm Chart repositories:

- **HTTP-based chart repositories**: You must add a base64 encoded copy of the CA certificate in DER format to the spec.caBundle field of the chart repo, such as `openssl x509 -outform der -in ca.pem | base64 -w0`. Click **Edit YAML** for the chart repo and set, as in the following example:<br/>
    ```
    [...]
    spec:
      caBundle:
    MIIFXzCCA0egAwIBAgIUWNy8WrvSkgNzV0zdWRP79j9cVcEwDQYJKoZIhvcNAQELBQAwPzELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRQwEgYDVQQKDAtNeU9yZywgSW5jLjENMAsGA1UEAwwEcm9vdDAeFw0yMTEyMTQwODMyMTdaFw0yNDEwMDMwODMyMT
    ...
    nDxZ/tNXt/WPJr/PgEB3hQdInDWYMg7vGO0Oz00G5kWg0sJ0ZTSoA10ZwdjIdGEeKlj1NlPyAqpQ+uDnmx6DW+zqfYtLnc/g6GuLLVPamraqN+gyU8CHwAWPNjZonFN9Vpg0PIk1I2zuOc4EHifoTAXSpnjfzfyAxCaZsnTptimlPFJJqAMj+FfDArGmr4=
    [...]
    ```


- **Git-based chart repositories**: You must add a base64 encoded copy of the CA certificate in DER format to the spec.caBundle field of the chart repo, such as `openssl x509 -outform der -in ca.pem | base64 -w0`. Click **Edit YAML** for the chart repo and set, as in the following example:<br/>
    ```
    [...]
    spec:
      caBundle:
    MIIFXzCCA0egAwIBAgIUWNy8WrvSkgNzV0zdWRP79j9cVcEwDQYJKoZIhvcNAQELBQAwPzELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAkNBMRQwEgYDVQQKDAtNeU9yZywgSW5jLjENMAsGA1UEAwwEcm9vdDAeFw0yMTEyMTQwODMyMTdaFw0yNDEwMDMwODMyMT
    ...
    nDxZ/tNXt/WPJr/PgEB3hQdInDWYMg7vGO0Oz00G5kWg0sJ0ZTSoA10ZwdjIdGEeKlj1NlPyAqpQ+uDnmx6DW+zqfYtLnc/g6GuLLVPamraqN+gyU8CHwAWPNjZonFN9Vpg0PIk1I2zuOc4EHifoTAXSpnjfzfyAxCaZsnTptimlPFJJqAMj+FfDArGmr4=
    [...]
    ```


:::note Helm chart repositories with authentication

As of Rancher v2.6.3, a new value `disableSameOriginCheck` has been added to the Repo.Spec. This allows users to bypass the same origin checks, sending the repository Authentication information as a Basic Auth Header with all API calls. This is not recommended but can be used as a temporary solution in cases of non-standard Helm chart repositories such as those that have redirects to a different origin URL.

To use this feature for an existing Helm chart repository, click <b>⋮ > Edit YAML</b>. On the `spec` portion of the YAML file, add `disableSameOriginCheck` and set it to `true`.

```yaml
[...]
spec:
  disableSameOriginCheck: true
[...]
```

:::

### Helm Compatibility

Only Helm 3 compatible charts are supported.


### Deployment and Upgrades

From the _"Charts"_ tab select a Chart to install. Rancher and Partner charts may have extra configurations available through custom pages or questions.yaml files, but all chart installations can modify the values.yaml and other basic settings. Once you click install, a Helm operation job is deployed, and the console for the job is displayed.

To view all recent changes, go to the _"Recent Operations"_ tab. From there you can view the call that was made, conditions, events, and logs.

After installing a chart, you can find it in the _"Installed Apps"_ tab. In this section you can upgrade or delete the installation, and see further details. When choosing to upgrade, the form and values presented will be the same as installation.

Most Rancher tools have additional pages located in the toolbar below the _"Apps & Marketplace"_ section to help manage and use the features. These pages include links to dashboards, forms to easily add Custom Resources, and additional information.

:::caution

If you are upgrading your chart using _"Customize Helm options before upgrade"_ , please be aware that using the _"--force"_ option may result in errors if your chart has immutable fields. This is because some objects in Kubernetes cannot be changed once they are created. To ensure you do not get this error you can:

  * use the default upgrade option ( i.e do not use _"--force"_ option )
  * uninstall the existing chart and install the upgraded chart
  * delete the resources with immutable fields from the cluster before performing the _"--force"_ upgrade

:::

#### Changes in Rancher v2.6.3

The upgrade button has been removed for legacy apps from the **Apps & Marketplace > Installed Apps** page.

If you have a legacy app installed and want to upgrade it:

- The legacy [feature flag](enable-experimental-features.md) must be turned on (if it's not turned on automatically because of having a legacy app before upgrading)
- You can upgrade the app from cluster explorer, from the left nav section **Legacy > Project > Apps**
- For multi-cluster apps, you can go to **≡ > Multi-cluster Apps** and upgrade the app from there

### Limitations

[Dashboard apps or Rancher feature charts](helm-charts-in-rancher.md) **cannot** be installed using the Rancher CLI.
