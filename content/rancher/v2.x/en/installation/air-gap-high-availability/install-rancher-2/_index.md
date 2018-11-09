---
title: "5. Choose an SSL Option and Install Rancher"
weight: 500
aliases:
---

## A. Render Templates and Install Rancher

Add the Helm chart repository that contains charts to install Rancher. Replace `<CHART_REPO>` with the [repository that you're using]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories) (i.e. `latest` or `stable`). 

```plain
helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
```

Fetch the latest Rancher chart. This will pull down the chart and save it in the current directory as a `.tgz` file. Replace `<CHART_REPO>` with the repo you're using (`latest` or `stable`).

```plain
helm fetch rancher-<CHART_REPO>/rancher
```

Render the template with the options you would use to install the chart. See [Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/) for details on the various options. Remember to set the `rancherImage` option to pull the image from your private registry. This will create a `rancher` directory with the Kubernetes manifest files.

```plain
helm template ./rancher-<version>.tgz --output-dir . \
--name rancher --namespace cattle-system \
--set hostname=<RANCHER.YOURDOMAIN.COM> \
--set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher
```

>Want additional options? Need help troubleshooting? See [High Availability Install: Advanced Options]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#advanced-configurations).

## A. Choose an SSL Option and Install Rancher


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
