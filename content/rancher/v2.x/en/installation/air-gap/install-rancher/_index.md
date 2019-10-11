---
title: 4. Install Rancher
weight: 400
aliases:
  - /rancher/v2.x/en/installation/air-gap-installation/install-rancher/
  - /rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-system-charts/
  - /rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-for-private-reg/
  - /rancher/v2.x/en/installation/air-gap-high-availability/install-rancher/
  - /rancher/v2.x/en/installation/air-gap-single-node/install-rancher
---

This section is about how to deploy Rancher for your air gapped environment. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy. There are _tabs_ for either a high availability (recommended) or a single node installation.

{{% tabs %}}
{{% tab "HA Install (Recommended)" %}}

Rancher recommends installing Rancher in a Highly Available (HA) configuration. An HA installation is comprised of three nodes running the Rancher server components on a Kubernetes cluster. The persistence layer (etcd) is also replicated on these three nodes, providing redundancy and data duplication in case one of the nodes fails.

This section describes installing Rancher in five parts:

- [A. Add the Helm Chart Repository](#a-add-the-helm-chart-repository)
- [B. Choose your SSL Configuration](#b-choose-your-ssl-configuration)
- [C. Render the Rancher Helm Template](#c-render-the-rancher-helm-template)
- [D. Install Rancher](#d-install-rancher)
- [E. For Rancher versions prior to v2.3.0, Configure System Charts](#e-for-rancher-versions-prior-to-v2-3-0-configure-system-charts)

### A. Add the Helm Chart Repository

From a system that has access to the internet, fetch the latest Helm chart and copy the resulting manifests to a system that has access to the Rancher server cluster.

1. If you haven't already, initialize `helm` locally on a workstation that has internet access.

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


### B. Choose your SSL Configuration

Rancher Server is designed to be secure by default and requires SSL/TLS configuration.

For HA air gap configurations, there are two recommended options for the source of the certificate.

> **Note:** If you want terminate SSL/TLS externally, see [TLS termination on an External Load Balancer]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination).

| Configuration | Chart option | Description | Requires cert-manager |
|-----|-----|-----|-----|
| Rancher Generated Self-Signed Certificates | `ingress.tls.source=rancher` | Use certificates issued by Rancher's generated CA (self signed)<br> This is the **default** and does not need to be added when rendering the Helm template. | yes |
| Certificates from Files | `ingress.tls.source=secret` | Use your own certificate files by creating Kubernetes Secret(s). <br> This option must be passed when rendering the Rancher Helm template. | no |

### C. Render the Rancher Helm Template

When setting up the Rancher Helm template, there are several options in the Helm chart that are designed specifically for air gap installations.

Chart Option | Chart Value | Description
---|---|---
`systemDefaultRegistry` | `<REGISTRY.YOURDOMAIN.COM:PORT>` | Configure Rancher server to always pull from your private registry when provisioning clusters.
`useBundledSystemChart` | `true` | Configure Rancher server to use the packaged copy of Helm system charts. The [system charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. These [Helm charts](https://github.com/rancher/system-charts) are located in GitHub, but since you are in an air gapped environment, using the charts that are bundled within Rancher is much easier than setting up a Git mirror. _Available as of v2.3.0_

Based on the choice your made in [B. Choose your SSL Configuration](#b-optional-install-cert-manager), complete one of the procedures below.

{{% accordion id="self-signed" label="Option A-Default Self-Signed Certificate" %}}

By default, Rancher generates a CA and uses cert-manager to issue the certificate for access to the Rancher server interface.

> **Note:**
> Recent changes to cert-manager require an upgrade. If you are upgrading Rancher and using a version of cert-manager older than v0.9.1, please see our [upgrade cert-manager documentation]({{< baseurl >}}/rancher/v2.x/en/installation/options/upgrading-cert-manager/).

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

1. Render the Rancher template, declaring your chosen options. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools.


    Placeholder | Description
    ------------|-------------
    `<VERSION>` | The version number of the output tarball.
    `<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
    `<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.

     ```plain
    helm template ./rancher-<VERSION>.tgz --output-dir . \
     --name rancher \
     --namespace cattle-system \
     --set hostname=<RANCHER.YOURDOMAIN.COM> \
     --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
     --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
     --set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
    ```

{{% /accordion %}}

{{% accordion id="secret" label="Option B: Certificates From Files using Kubernetes Secrets" %}}

1. Create Kubernetes secrets from your own certificates for Rancher to use.

    > **Note:** The common name for the cert will need to match the `hostname` option or the ingress controller will fail to provision the site for Rancher.

1. Render the Rancher template, declaring your chosen options. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools.

    >**Note:** If you are using a Private CA signed cert, add `--set privateCA=true` following `--set ingress.tls.source=secret`.

    Placeholder | Description
    ------------|-------------
    `<VERSION>` | The version number of the output tarball.
    `<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
    `<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.

     ```plain
     helm template ./rancher-<VERSION>.tgz --output-dir . \
      --name rancher \
      --namespace cattle-system \
      --set hostname=<RANCHER.YOURDOMAIN.COM> \
      --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
      --set ingress.tls.source=secret \
      --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
      --set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
    ```

1.    See [Adding TLS Secrets]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/) to publish the certificate files so Rancher and the ingress controller can use them.

{{% /accordion %}}

### D. Install Rancher

Copy the rendered manifest directories to a system that has access to the Rancher server cluster to complete installation.

Use `kubectl` to create namespaces and apply the rendered manifests.

If you chose to use self-signed certificates in [B. Choose your SSL Configuration](#b-optional-install-cert-manager), install cert-manager.

{{% accordion id="install-cert-manager" label="Self-Signed Certificate Installs - Install Cert-manager" %}}

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

{{% /accordion %}}

Install Rancher:

```plain
kubectl create namespace cattle-system
kubectl -n cattle-system apply -R -f ./rancher
```

**Step Result:** If you are installing Rancher v2.3.0+, the installation is complete.

### E. For Rancher versions prior to v2.3.0, Configure System Charts

If you are installing Rancher versions prior to v2.3.0, you will not be able to use the packaged system charts. Since the Rancher system charts are hosted in Github, an air gapped installation will not be able to access these charts. Therefore, you must [configure the Rancher system charts]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0).

### Additional Resources

These resources could be helpful when installing Rancher:

- [Rancher Helm chart options]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/)
- [Adding TLS secrets]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/)
- [Troubleshooting Rancher HA installations]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/troubleshooting/)

{{% /tab %}}
{{% tab "Single Node Install" %}}

The single node installation is for Rancher users that are wanting to **test** out Rancher. Instead of running on a Kubernetes cluster, you install the Rancher server component on a single node using a `docker run` command. Since there is only one node and a single Docker container, if the node goes down, there is no copy of the etcd data available on other nodes and you will lose all the data of your Rancher server. **Important: If you install Rancher following the single node installation guide, there is no upgrade path to transition your single node installation to a HA installation.** Instead of running the single node installation, you have the option to follow the HA install guide, but only use one node to install Rancher. Afterwards, you can scale up the etcd nodes in your Kubernetes cluster to make it a HA installation.

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

Environment Variable Key | Environment Variable Value | Description
---|---|---
`CATTLE_SYSTEM_DEFAULT_REGISTRY` | `<REGISTRY.YOURDOMAIN.COM:PORT>` | Configure Rancher server to always pull from your private registry when provisioning clusters.
`CATTLE_SYSTEM_CATALOG` | `bundled` | Configure Rancher server to use the packaged copy of Helm system charts. The [system charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. These [Helm charts](https://github.com/rancher/system-charts) are located in GitHub, but since you are in an air gapped environment, using the charts that are bundled within Rancher is much easier than setting up a Git mirror. _Available as of v2.3.0_

>**Do you want to...**
>
>- Configure custom CA root certificate to access your services? See [Custom CA root certificate]({{< baseurl >}}/rancher/v2.x/en/admin-settings/custom-ca-root-certificate/).
>- Record all transactions with the Rancher API? See [API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#api-audit-log).


- For Rancher prior to v2.3.0, you will need to mirror the `system-charts` repository to a location in your network that Rancher can reach. Then, after Rancher is installed, you will need to configure Rancher to use that repository. For details, refer to the documentation on [setting up the system charts for Rancher prior to v2.3.0.]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0)


Choose from the following options:

{{% accordion id="option-a" label="Option A-Default Self-Signed Certificate" %}}

If you are installing Rancher in a development or testing environment where identity verification isn't a concern, install Rancher using the self-signed certificate that it generates. This installation option omits the hassle of generating a certificate yourself.

Log into your Linux host, and then run the installation command below. When entering the command, use the table below to replace each placeholder.

Placeholder | Description
------------|-------------
`<REGISTRY.YOURDOMAIN.COM:PORT>` |  Your private registry URL and port.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.


```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    -e CATTLE_SYSTEM_CATALOG=bundled \ #Available as of v2.3.0, use the packaged Rancher system charts
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

{{% /accordion %}}
{{% accordion id="option-b" label="Option B-Bring Your Own Certificate: Self-Signed" %}}

In development or testing environments where your team will access your Rancher server, create a self-signed certificate for use with your install so that your team can verify they're connecting to your instance of Rancher.

>**Prerequisites:**
>From a computer with an internet connection, create a self-signed certificate using [OpenSSL](https://www.openssl.org/) or another method of your choice.
>
>- The certificate files must be in [PEM format]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#pem).
>- In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [SSL FAQ / Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#cert-order).

After creating your certificate, log into your Linux host, and then run the installation command below. When entering the command, use the table below to replace each placeholder. Use the `-v` flag and provide the path to your certificates to mount them in your container.

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<CA_CERTS>` | The path to the certificate authority's private key.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.

```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
    -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    -v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
    -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    -e CATTLE_SYSTEM_CATALOG=bundled \ #Available as of v2.3.0, use the packaged Rancher system charts
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

{{% /accordion %}}
{{% accordion id="option-c" label="Option C-Bring Your Own Certificate: Signed by Recognized CA" %}}

In development or testing environments where you're exposing an app publicly, use a certificate signed by a recognized CA so that your user base doesn't encounter security warnings.

>**Prerequisite:** The certificate files must be in [PEM format]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#pem).

After obtaining your certificate, log into your Linux host, and then run the installation command below. When entering the command, use the table below to replace each placeholder. Because your certificate is signed by a recognized CA, mounting an additional CA certificate file is unnecessary.

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.

> **Note:**  Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    --no-cacerts \
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
    -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    -e CATTLE_SYSTEM_CATALOG=bundled \ #Available as of v2.3.0, use the packaged Rancher system charts
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

{{% /accordion %}}

If you are installing Rancher v2.3.0+, the installation is complete.

If you are installing Rancher versions prior to v2.3.0, you will not be able to use the packaged system charts. Since the Rancher system charts are hosted in Github, an air gapped installation will not be able to access these charts. Therefore, you must [configure the Rancher system charts]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0).

{{% /tab %}}
{{% /tabs %}}
