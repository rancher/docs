---
title: "5. Install Rancher"
weight: 500
aliases:
---

## A. Install Rancher

Add the Helm chart repository that contains charts to install Rancher. Replace `<CHART_REPO>` with the [repository that you're using]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories) (i.e. `latest` or `stable`). Please see the [High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha) guide for additional options and troubleshooting.

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

## B. Copy and Apply Manifests

Copy the rendered manifest directories to a system that has access to the Rancher server cluster.

Use `kubectl` to create namespaces and apply the rendered manifests.

```plain
kubectl -n kube-system apply -R -f ./cert-manager

kubectl create namespace cattle-system
kubectl -n cattle-system apply -R -f ./rancher
```

Make sure you follow any additional instructions required by SSL install options. See [Choose your SSL Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#choose-your-ssl-configuration) for details.