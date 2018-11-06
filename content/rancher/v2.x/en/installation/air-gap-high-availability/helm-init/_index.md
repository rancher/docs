---
title: 4. Initialize Helm
weight: 400
aliases:
---

## A. Initialize Helm and Render Templates


From a system that has access to the internet, render the installs et and copy resulting manifests to a system that has access to the Rancher server cluster.

Initialize `helm` locally on a system that has internet access.

```plain
helm init -c
```

Then, using the same system, fetch and render the `helm` charts. Render the template with the options you would use to install the chart. See [Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/) for details on the various options. Remember to set the `rancherImage` option to pull the image from your private registry. This will create a `rancher` directory with the Kubernetes manifest files.

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

### [Next: Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/install-rancher/)