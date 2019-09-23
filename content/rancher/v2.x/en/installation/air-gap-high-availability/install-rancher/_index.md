---
title: 4. Install Rancher
weight: 400
aliases:
  - /rancher/v2.x/en/installation/air-gap-installation/install-rancher/
  - /rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-system-charts/
  - /rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-for-private-reg/
---

This section describes installing Rancher in five parts:

- [A. Add the Helm Chart Repository](#a-add-the-helm-chart-repository)
- [B. Choose your SSL Configuration](#b-choose-your-ssl-configuration)
- [C. Set Up Rancher Certificates](#c-set-up-rancher-certificates)
- [D. Render the Rancher Helm Template](#d-render-the-rancher-helm-template)
- [E. Install Rancher](#e-install-rancher)
- [F. For Rancher prior to v2.3.0, Configure System Charts](#f-for-rancher-prior-to-v2-3-0-configure-system-charts)

## A. Add the Helm Chart Repository

From a system that has access to the internet, render the installs and copy the resulting manifests to a system that has access to the Rancher server cluster.

1. If you haven't already, initialize `helm` locally on a system that has internet access.

    ```plain
    helm init -c
    ```

2. Use `helm repo add` command to add the Helm chart repository that contains charts to install Rancher. For more information about the repository choices and which is best for your use case, see [Choosing a Version of Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories).

    {{< release-channel >}}

    ```
    helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
    ```
3. Fetch the latest Rancher chart. This will pull down the chart and save it in the current directory as a `.tgz` file.

    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```

>Want additional options? Need help troubleshooting? See [High Availability Install: Advanced Options]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#advanced-configurations).


## B. Choose your SSL Configuration

Rancher Server is designed to be secure by default and requires SSL/TLS configuration.

For HA air gap configurations, there are two recommended options for the source of the certificate.

> **Note:** If you want terminate SSL/TLS externally, see [TLS termination on an External Load Balancer]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination).

| Configuration | Chart option | Description | Requires cert-manager |
|-----|-----|-----|-----|
| [Rancher Generated Self-Signed Certificates](#self-signed) | `ingress.tls.source=rancher` | Use certificates issued by Rancher's generated CA (self signed)<br/>This is the **default** | yes |
| [Certificates from Files](#secret) | `ingress.tls.source=secret` | Use your own certificate files by creating Kubernetes Secret(s). Then you will use this option when rendering the Rancher Helm template. | no |

## C. Set Up Rancher Certificates

Based on the choice your made in [B. Choose your SSL Configuration](#b-optional-install-cert-manager), complete one of the procedures below.

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. 

{{% tabs %}}
{{% tab "Option A: Default Self-Signed Certificate" %}}

By default, Rancher generates a CA and uses cert-manager to issue the certificate for access to the Rancher server interface.

> **Note:**
> Recent changes to cert-manager require an upgrade. If you are upgrading Rancher and using a version of cert-manager older than v0.9.1, please see our [upgrade documentation]({{< baseurl >}}/rancher/v2.x/en/installation/options/upgrading-cert-manager/).

1. From a system connected to the internet, add the cert-manager repo to Helm.

    ```plain
    helm repo add jetstack https://charts.jetstack.io
    helm repo update
    ```

1. Fetch the latest cert-manager chart available from the [Helm chart repository](https://hub.helm.sh/charts/jetstack/cert-manager).

    ```plain
    helm fetch jetstack/cert-manager --version v0.9.1
    ```

1. Render the cert manager template with the options you would like to use to install the chart. Remember to set the `image.repository` option to pull the image from your private registry. This will create a `cert-manager` directory with the Kubernetes manifest files.

    ```plain
    helm template ./cert-manager-v0.9.1.tgz --output-dir . \
        --name cert-manager --namespace cert-manager \
        --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
        --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-webhook
        --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-cainjector
    ```

1. Download the required CRD file for cert-manager

    ```plain
    curl -L -o cert-manager/cert-manager-crd.yaml https://raw.githubusercontent.com/jetstack/cert-manager/release-0.9/deploy/manifests/00-crds.yaml
    ```
{{% /tab %}}
{{% tab "Option B: Certificates for Files (Kubernetes Secret)" %}}

1. Create Kubernetes secrets from your own certificates for Rancher to use.

    > **Note:** The common name for the cert will need to match the `hostname` option or the ingress controller will fail to provision the site for Rancher.

1. [Render the Rancher template using one of the commands in the next section,](#d-render-the-rancher-helm-template) declaring your chosen options. The command will be different depending on the version of Rancher that you are installing. To use your own certificates, add this option to the Helm command:

    ```
    --set ingress.tls.source=secret
    ```

    If you are using a Private CA signed cert, add `--set privateCA=true` following `--set ingress.tls.source=secret`.

1.    See [Adding TLS Secrets]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/) to publish the certificate files so Rancher and the ingress controller can use them.

{{% /tab %}}
{{% /tabs %}}

## D. Render the Rancher Helm Template

Render the Rancher template, declaring your chosen options. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools. You can set the the extra environment variable `extraEnv` to use the same `name` and `value` keys as the container manifest definitions.
    
Placeholder | Description
------------|-------------
`<VERSION>` | The version number of the output tarball.
`<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry. This configures Rancher to use your private registry when starting the `rancher/rancher` container.

The exact options for the command to render the Helm template will vary depending on the version of Rancher that you are installing.

{{% tabs %}}
{{% tab "Rancher v2.3.0+" %}}

As of Rancher v2.3.0, a local copy of `system-charts` has been packaged into the `rancher/rancher` container. To be able to use these features in an air gap install, you will need to run the Rancher install command with an extra environment variable, `CATTLE_SYSTEM_CATALOG=bundled`, which tells Rancher to use the local copy of the charts instead of attempting to fetch them from GitHub.

If your private registry doesn't require credentials, you can set it as default when starting the `rancher/rancher` container by using the `systemDefaultRegistry` variable. This will allow Rancher to use the registry when provisioning other clusters without additional configuration.

```plain
helm template ./rancher-<VERSION>.tgz --output-dir . \
     --name rancher \
     --namespace cattle-system \
     --set hostname=<RANCHER.YOURDOMAIN.COM> \
     --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
     --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT>
     --set extraEnv[0].name=CATTLE_SYSTEM_CATALOG
     --set extraEnv[0].value=bundled
     --set ingress.tls.source=secret # Use this option if you are using your own certificates instead of cert-manager.
```
{{% /tab %}}
{{% tab "Rancher prior to v2.3.0" %}}

For Rancher prior to v2.3.0, you will need to mirror the `system-charts` repository to a location in your network that Rancher can reach. Then, after Rancher is installed, you will need to configure Rancher to use that repository. For details, refer to the documentation on [setting up the system charts for Rancher prior to v2.3.0.]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0)

If your private registry doesn't require credentials, you can set it as default when starting the `rancher/rancher` container by using the `CATTLE_SYSTEM_DEFAULT_REGISTRY` variable. This will allow Rancher to use the registry when provisioning other clusters without additional configuration.

```plain
helm template ./rancher-<VERSION>.tgz --output-dir . \
  --name rancher \
  --namespace cattle-system \
  --set hostname=<RANCHER.YOURDOMAIN.COM> \
  --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
  --set extraEnv[0].name=CATTLE_SYSTEM_DEFAULT_REGISTRY \
  --set extraEnv[0].value=<REGISTRY.YOURDOMAIN.COM:PORT> \
  --set ingress.tls.source=secret # Use this option if you are using your own certificates instead of cert-manager.
```
{{% /tab %}}
{{% /tabs %}}

## E. Install Rancher

Copy the rendered manifest directories to a system that has access to the Rancher server cluster to complete installation.

Use `kubectl` to create namespaces and apply the rendered manifests.

If you are using self-signed certificates, install cert-manager:

1. Create the namespace for cert-manager.
    ```plain
    kubectl create namespace cert-manager
    ```

1. Label the cert-manager namespace to disable resource validation.
    ```plain
    kubectl label namespace cert-manager certmanager.k8s.io/disable-validation=true
    ```

1. Create the cert-manager CustomResourceDefinitions (CRDs).
    ```plain
    kubectl apply -f cert-manager/cert-manager-crd.yaml
    ```

1. Launch cert-manager.
    ```plain
    kubectl apply -R -f ./cert-manager
    ```

Install Rancher:

```plain
kubectl create namespace cattle-system
kubectl -n cattle-system apply -R -f ./rancher
```

If you are installing Rancher v2.3.0, the installation is complete.

### F. For Rancher Prior to v2.3.0, Configure System Charts

If you are installing Rancher prior to v2.3.0, the final step is to [configure the Rancher system charts.]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0)

### Additional Resources

These resources could be helpful when you install Rancher:

- [Rancher Helm chart options]({{<baseurl>}}rancher/v2.x/en/installation/ha/helm-rancher/chart-options/)
- [Adding TLS secrets]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/)
- [Troubleshooting Rancher HA installations]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/troubleshooting/)