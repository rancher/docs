---
title: 4. Install Rancher
weight: 400
aliases:
---

## A. Add the Helm Chart Repository and Render Templates


From a system that has access to the internet, render the installs and copy the resulting manifests to a system that has access to the Rancher server cluster.

1. Initialize `helm` locally on a system that has internet access.

    ```plain
    helm init -c
    ```

2. Use `helm repo add` command to add the Helm chart repository that contains charts to install Rancher. For more information about the repository choices and which is best for your use case, see [Choosing a Version of Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories).

    Replace both occurences of `<CHART_REPO>` with the Helm chart repository that you want to use (i.e. `latest` or `stable`).
    
    ```
    helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
    ```
3. Fetch the latest Rancher chart. This will pull down the chart and save it in the current directory as a `.tgz` file. Replace `<CHART_REPO>` with the repo you're using (`latest` or `stable`).

    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```

4. Render the template with the options you would use to install the chart. See [Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/) for details on the various options. Remember to set the `rancherImage` option to pull the image from your private registry. This will create a `rancher` directory with the Kubernetes manifest files.

    ```plain
    helm template ./rancher-<version>.tgz --output-dir . \
    --name rancher --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher
    ```

>Want additional options? Need help troubleshooting? See [High Availability Install: Advanced Options]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#advanced-configurations).

## B. Optional: Install Cert-Manager

If you are installing Rancher with its self-signed certificates, you will need to install 'cert-manager' on your cluster. If you are installing your own certificates you may skip this section.

From a system connected to the internet, fetch the latest `cert-manager` chart available from thea [official Helm chart repository](https://github.com/helm/charts/tree/master/stable).

```plain
helm fetch stable/cert-manager
```

Render the template with the option you would use to install the chart. Remember to set the `image.repository` option to pull the image from your private registry. This will create a `cert-manager` directory with the Kubernetes manifest files.

```plain
helm template ./cert-manager-<version>.tgz --output-dir . \
--name cert-manager --namespace kube-system \
--set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
```


## D. Choose an SSL Option and Install Rancher


Rancher server is designed to be secure by default and requires SSL/TLS configuration. There are two options for the source of the certificate in an HA air gap setup:

{{% accordion id="self-signed" label="Option A: Default Self-Signed Certificate" %}}
The default is for Rancher to generate a CA and use the `cert-manager` to issue the certificate for access to the Rancher server interface. Use the reference table below to replace each placeholder.

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
Create Kubernetes secrets from your own certificates for Rancher to use.

> **Note:** The common name for the cert will need to match the `hostname` option or the ingress controller will fail to provision the site for Rancher.

Placeholder | Description
------------|-------------
`<VERSION>` | The version number of the output tarball.
`<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.


> **Note:** If you are using a Private CA signed cert, add `--set privateCA=true`

```
helm template ./rancher-<VERSION>.tgz --output-dir . \
  --name rancher \
  --namespace cattle-system \
  --set hostname=<RANCHER.YOURDOMAIN.COM> \
  --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher
  --set ingress.tls.source=secret \
```

Now that Rancher is running, see [Adding TLS Secrets]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/) to publish the certificate files so Rancher and the ingress controller can use them. 
{{% /accordion %}}

## B. Copy and Apply Manifests

Copy the rendered manifest directories to a system that has access to the Rancher server cluster.

Use `kubectl` to create namespaces and apply the rendered manifests.

```plain
kubectl -n kube-system apply -R -f ./cert-manager

kubectl create namespace cattle-system
kubectl -n cattle-system apply -R -f ./rancher
```

### [Next: Configure Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-for-private-reg/)
