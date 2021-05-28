---
title: 4. Install Rancher
weight: 400
aliases:
  - /rancher/v2.5/en/installation/air-gap-high-availability/config-rancher-system-charts/
  - /rancher/v2.5/en/installation/air-gap-high-availability/config-rancher-for-private-reg/
  - /rancher/v2.5/en/installation/air-gap-single-node/install-rancher
  - /rancher/v2.5/en/installation/air-gap/install-rancher
  - /rancher/v2.5/en/installation/air-gap-installation/install-rancher/
  - /rancher/v2.5/en/installation/air-gap-high-availability/install-rancher/
---

This section is about how to deploy Rancher for your air gapped environment in a high-availability Kubernetes installation. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy.

### Privileged Access for Rancher v2.5+

When the Rancher server is deployed in the Docker container, a local Kubernetes cluster is installed within the container for Rancher to use. Because many features of Rancher run as deployments, and privileged mode is required to run containers within containers, you will need to install Rancher with the `--privileged` option.

# Docker Instructions 

If you want to continue the air gapped installation using Docker commands, skip the rest of this page and follow the instructions on [this page.](./docker-install-commands)

# Kubernetes Instructions

Rancher recommends installing Rancher on a Kubernetes cluster. A highly available Kubernetes install is comprised of three nodes running the Rancher server components on a Kubernetes cluster. The persistence layer (etcd) is also replicated on these three nodes, providing redundancy and data duplication in case one of the nodes fails.

This section describes installing Rancher:

- [1. Add the Helm Chart Repository](#1-add-the-helm-chart-repository)
- [2. Choose your SSL Configuration](#2-choose-your-ssl-configuration)
- [3. Render the Rancher Helm Template](#3-render-the-rancher-helm-template)
- [4. Install Rancher](#4-install-rancher)

# 1. Add the Helm Chart Repository

From a system that has access to the internet, fetch the latest Helm chart and copy the resulting manifests to a system that has access to the Rancher server cluster.

1. If you haven't already, install `helm` locally on a workstation that has internet access. Note: Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.5/en/installation/options/helm-version) to choose a version of Helm to install Rancher.

2. Use `helm repo add` command to add the Helm chart repository that contains charts to install Rancher. For more information about the repository choices and which is best for your use case, see [Choosing a Version of Rancher]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/chart-options/#helm-chart-repositories).
  {{< release-channel >}}
    ```
    helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

3. Fetch the latest Rancher chart. This will pull down the chart and save it in the current directory as a `.tgz` file.
    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```

    If you require a specific version of Rancher, you can fetch this with the Helm `--version` parameter like in the following example:
    ```plain
    helm fetch rancher-stable/rancher --version=v2.4.8
    ```

# 2. Choose your SSL Configuration

Rancher Server is designed to be secure by default and requires SSL/TLS configuration.

When Rancher is installed on an air gapped Kubernetes cluster, there are two recommended options for the source of the certificate.

> **Note:** If you want terminate SSL/TLS externally, see [TLS termination on an External Load Balancer]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/chart-options/#external-tls-termination).

| Configuration                              | Chart option                 | Description                                                                                                                                                 | Requires cert-manager |
| ------------------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| Rancher Generated Self-Signed Certificates | `ingress.tls.source=rancher` | Use certificates issued by Rancher's generated CA (self signed)<br> This is the **default** and does not need to be added when rendering the Helm template. | yes                   |
| Certificates from Files                    | `ingress.tls.source=secret`  | Use your own certificate files by creating Kubernetes Secret(s). <br> This option must be passed when rendering the Rancher Helm template.                  | no                    |

# Helm Chart Options for Air Gap Installations

When setting up the Rancher Helm template, there are several options in the Helm chart that are designed specifically for air gap installations.

| Chart Option            | Chart Value                      | Description   |
| ----------------------- | -------------------------------- | ---- |
| `certmanager.version` | "<version>" | Configure proper Rancher TLS issuer depending of running cert-manager version. |
| `systemDefaultRegistry` | `<REGISTRY.YOURDOMAIN.COM:PORT>` | Configure Rancher server to always pull from your private registry when provisioning clusters.  |
| `useBundledSystemChart` | `true`                           | Configure Rancher server to use the packaged copy of Helm system charts. The [system charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. These [Helm charts](https://github.com/rancher/system-charts) are located in GitHub, but since you are in an air gapped environment, using the charts that are bundled within Rancher is much easier than setting up a Git mirror. |

# 3. Render the Rancher Helm Template

Based on the choice your made in [2. Choose your SSL Configuration](#2-choose-your-ssl-configuration), complete one of the procedures below.

# Option A: Default Self-Signed Certificate


By default, Rancher generates a CA and uses cert-manager to issue the certificate for access to the Rancher server interface.

> **Note:**
> Recent changes to cert-manager require an upgrade. If you are upgrading Rancher and using a version of cert-manager older than v0.11.0, please see our [upgrade cert-manager documentation]({{<baseurl>}}/rancher/v2.5/en/installation/options/upgrading-cert-manager/).

### 1. Add the cert-manager repo

From a system connected to the internet, add the cert-manager repo to Helm:

```plain
helm repo add jetstack https://charts.jetstack.io
helm repo update
```

### 2. Fetch the cert-manager chart

Fetch the latest cert-manager chart available from the [Helm chart repository](https://hub.helm.sh/charts/jetstack/cert-manager).

```plain
helm fetch jetstack/cert-manager --version v1.0.4
```

### 3. Render the cert-manager template

Render the cert-manager template with the options you would like to use to install the chart. Remember to set the `image.repository` option to pull the image from your private registry. This will create a `cert-manager` directory with the Kubernetes manifest files.

```plain
helm template cert-manager ./cert-manager-v1.0.4.tgz --output-dir . \
    --namespace cert-manager \
    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller \
    --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-webhook \
    --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-cainjector
```

### 4. Download the cert-manager CRD

Download the required CRD file for cert-manager:
   ```plain
   curl -L -o cert-manager/cert-manager-crd.yaml https://github.com/jetstack/cert-manager/releases/download/v1.0.4/cert-manager.crds.yaml
   ```

### 5. Render the Rancher template

Render the Rancher template, declaring your chosen options. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools.


Placeholder | Description
------------|-------------
`<VERSION>` | The version number of the output tarball.
`<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.
`<CERTMANAGER_VERSION>` | Cert-manager version running on k8s cluster.

{{% tabs %}}
{{% tab "Rancher v2.5.8" %}}
```plain
helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
    --no-hooks \ # prevent files for Helm hooks from being generated
    --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set certmanager.version=<CERTMANAGER_VERSION> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
    --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    --set useBundledSystemChart=true # Use the packaged Rancher system charts
```

**Optional**: To install a specific Rancher version, set the `rancherImageTag` value, example: `--set rancherImageTag=v2.5.8`
{{% /tab %}}
{{% tab "Rancher before v2.5.8" %}}

```plain
helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
    --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set certmanager.version=<CERTMANAGER_VERSION> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
    --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    --set useBundledSystemChart=true # Use the packaged Rancher system charts
```

**Optional**: To install a specific Rancher version, set the `rancherImageTag` value, example: `--set rancherImageTag=v2.5.6`
{{% /tab %}}
{{% /tabs %}}



# Option B: Certificates From Files using Kubernetes Secrets


### 1. Create secrets

Create Kubernetes secrets from your own certificates for Rancher to use. The common name for the cert will need to match the `hostname` option in the command below, or the ingress controller will fail to provision the site for Rancher.

### 2. Render the Rancher template

Render the Rancher template, declaring your chosen options. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools.

| Placeholder                      | Description                                     |
| -------------------------------- | ----------------------------------------------- |
| `<VERSION>`                      | The version number of the output tarball.       |
| `<RANCHER.YOURDOMAIN.COM>`       | The DNS name you pointed at your load balancer. |
| `<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.         |

{{% tabs %}}
{{% tab "Rancher v2.5.8+" %}}

```plain
   helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
    --no-hooks \ # prevent files for Helm hooks from being generated
    --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
    --set ingress.tls.source=secret \
    --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    --set useBundledSystemChart=true # Use the packaged Rancher system charts
```

If you are using a Private CA signed cert, add `--set privateCA=true` following `--set ingress.tls.source=secret`:

```plain
   helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
    --no-hooks \ # prevent files for Helm hooks from being generated
    --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
    --set ingress.tls.source=secret \
    --set privateCA=true \
    --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    --set useBundledSystemChart=true # Use the packaged Rancher system charts
```

**Optional**: To install a specific Rancher version, set the `rancherImageTag` value, example: `--set rancherImageTag=v2.3.6`

Then refer to [Adding TLS Secrets]({{<baseurl>}}/rancher/v2.5/en/installation/resources/encryption/tls-secrets/) to publish the certificate files so Rancher and the ingress controller can use them.
{{% /tab %}}
{{% tab "Rancher before v2.5.8" %}}


```plain
   helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
    --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
    --set ingress.tls.source=secret \
    --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    --set useBundledSystemChart=true # Use the packaged Rancher system charts
```

If you are using a Private CA signed cert, add `--set privateCA=true` following `--set ingress.tls.source=secret`:

```plain
   helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
    --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
    --set ingress.tls.source=secret \
    --set privateCA=true \
    --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    --set useBundledSystemChart=true # Use the packaged Rancher system charts
```

**Optional**: To install a specific Rancher version, set the `rancherImageTag` value, example: `--set rancherImageTag=v2.3.6`

Then refer to [Adding TLS Secrets]({{<baseurl>}}/rancher/v2.5/en/installation/resources/encryption/tls-secrets/) to publish the certificate files so Rancher and the ingress controller can use them.
{{% /tab %}}
{{% /tabs %}}



# 4. Install Rancher

Copy the rendered manifest directories to a system that has access to the Rancher server cluster to complete installation.

Use `kubectl` to create namespaces and apply the rendered manifests.

If you choose to use self-signed certificates in [B. Choose your SSL Configuration](#b-choose-your-ssl-configuration), install cert-manager.

### For Self-Signed Certificate Installs, Install Cert-manager

{{% accordion id="install-cert-manager" label="Click to expand" %}}

If you are using self-signed certificates, install cert-manager:

1. Create the namespace for cert-manager.
```plain
kubectl create namespace cert-manager
```

1. Create the cert-manager CustomResourceDefinitions (CRDs).
```plain
kubectl apply -f cert-manager/cert-manager-crd.yaml
```

    > **Note:**
    > If you are running Kubernetes v1.15 or below, you will need to add the `--validate=false` flag to your `kubectl apply` command above, or else you will receive a validation error relating to the `x-kubernetes-preserve-unknown-fields` field in cert-manager’s CustomResourceDefinition resources. This is a benign error and occurs due to the way kubectl performs resource validation.

1. Launch cert-manager.
```plain
kubectl apply -R -f ./cert-manager
```

{{% /accordion %}}

### Install Rancher with kubectl

```plain
kubectl create namespace cattle-system
kubectl -n cattle-system apply -R -f ./rancher
```
The installation is complete.

> **Note:** If you don't intend to send telemetry data, opt out [telemetry]({{<baseurl>}}/rancher/v2.5/en/faq/telemetry/) during the initial login. Leaving this active in an air-gapped environment can cause issues if the sockets cannot be opened successfully.

# Additional Resources

These resources could be helpful when installing Rancher:

- [Rancher Helm chart options]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/)
- [Adding TLS secrets]({{<baseurl>}}/rancher/v2.5/en/installation/resources/encryption/tls-secrets/)
- [Troubleshooting Rancher Kubernetes Installations]({{<baseurl>}}/rancher/v2.5/en/installation/options/troubleshooting/)
