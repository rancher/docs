---
title: 4. Install Rancher
weight: 400
aliases:
  - /rancher/v2.x/en/installation/air-gap-installation/install-rancher/
---

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

> **Note:** If you want terminate SSL/TLS externally, see [TLS termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination).

| Configuration | Chart option | Description | Requires cert-manager |
|-----|-----|-----|-----|
| [Rancher Generated Self-Signed Certificates](#self-signed) | `ingress.tls.source=rancher` | Use certificates issued by Rancher's generated CA (self signed)<br/>This is the **default** | yes |
| [Certificates from Files](#secret) | `ingress.tls.source=secret` | Use your own certificate files by creating Kubernetes Secret(s) | no |

## C. Install Rancher

Based on the choice your made in [B. Choose your SSL Configuration](#b-optional-install-cert-manager), complete one of the procedures below.

{{% accordion id="self-signed" label="Option A: Default Self-Signed Certificate" %}}
By default, Rancher generates a CA and uses cert manger to issue the certificate for access to the Rancher server interface. 

1. From a system connected to the internet, fetch the latest cert-manager chart available from the [official Helm chart repository](https://github.com/helm/charts/tree/master/stable). 

    ```plain
    helm fetch stable/cert-manager --version 0.5.2
    ```

1. Render the cert manager template with the options you would like to use to install the chart. Remember to set the `image.repository` option to pull the image from your private registry. This will create a `cert-manager` directory with the Kubernetes manifest files.

    ```plain
    helm template ./cert-manager-v0.5.2.tgz --output-dir . \
    --name cert-manager --namespace kube-system \
    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
    ```

1. Render the Rancher template, declaring your chosen options. Use the reference table below to replace each placeholder.

    Placeholder | Description
    ------------|-------------
    `<VERSION>` | The version number of the output tarball.
    `<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
    `<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.).
    
    
    ```plain
    helm template ./rancher-<VERSION>.tgz --output-dir . \
     --name rancher \
     --namespace cattle-system \
     --set hostname=<RANCHER.YOURDOMAIN.COM> \
     --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher
    ```

{{% /accordion %}}

{{% accordion id="secret" label="Option B: Certificates for Files (Kubernetes Secret)" %}}

1. Create Kubernetes secrets from your own certificates for Rancher to use.

    > **Note:** The common name for the cert will need to match the `hostname` option or the ingress controller will fail to provision the site for Rancher.

1. Render the Rancher template, declaring your chosen options. Use the reference table below to replace each placeholder.

    Placeholder | Description
    ------------|-------------
    `<VERSION>` | The version number of the output tarball.
    `<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
    `<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.
    
    
    > **Note:** If you are using a Private CA signed cert, add `--set privateCA=true` following `--set ingress.tls.source=secret`
    
    ```
    helm template ./rancher-<VERSION>.tgz --output-dir . \
      --name rancher \
      --namespace cattle-system \
      --set hostname=<RANCHER.YOURDOMAIN.COM> \
      --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher
      --set ingress.tls.source=secret \
```

1.    See [Adding TLS Secrets]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/) to publish the certificate files so Rancher and the ingress controller can use them. 
{{% /accordion %}}

## D. Install Rancher

Copy the rendered manifest directories to a system that has access to the Rancher server cluster to complete installation.

Use `kubectl` to create namespaces and apply the rendered manifests.

```plain
kubectl -n kube-system apply -R -f ./cert-manager

kubectl create namespace cattle-system
kubectl -n cattle-system apply -R -f ./rancher
```

### [Next: Configure Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-for-private-reg/)
