---
title: Helm
weight: 42
---

K3s release _v1.17.0+k3s.1_ added support for Helm 3. You can access the Helm 3 documentation [here](https://helm.sh/docs/intro/quickstart/).

Helm is the package management tool of choice for Kubernetes. Helm charts provide templating syntax for Kubernetes YAML manifest documents. With Helm we can create configurable deployments instead of just using static files. For more information about creating your own catalog of deployments, check out the docs at https://helm.sh/.

K3s does not require any special configuration to start using Helm 3. Just be sure you have properly set up your kubeconfig as per the section about [cluster access.](../cluster-access)

This section covers the following topics:

- [Upgrading Helm](#upgrading-helm)
- [Deploying manifests and Helm charts](#deploying-manifests-and-helm-charts)
- [Using the Helm CRD](#using-the-helm-crd)

### Upgrading Helm

If you were using Helm v2 in previous versions of K3s, you may upgrade to v1.17.0+k3s.1 or newer and Helm 2 will still function. If you wish to migrate to Helm 3, [this](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/) blog post by Helm explains how to use a plugin to successfully migrate. Refer to the official Helm 3 documentation [here](https://helm.sh/docs/) for more information. K3s will handle either Helm v2 or Helm v3 as of v1.17.0+k3s.1. Just be sure you have properly set your kubeconfig as per the examples in the section about [cluster access.](../cluster-access)

Note that Helm 3 no longer requires Tiller and the `helm init` command. Refer to the official documentation for details.

### Deploying Manifests and Helm Charts

Any file found in `/var/lib/rancher/k3s/server/manifests` will automatically be deployed to Kubernetes in a manner similar to `kubectl apply`.

It is also possible to deploy Helm charts. K3s supports a CRD controller for installing charts. A YAML file specification can look as following (example taken from `/var/lib/rancher/k3s/server/manifests/traefik.yaml`):

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: traefik
  namespace: kube-system
spec:
  chart: stable/traefik
  set:
    rbac.enabled: "true"
    ssl.enabled: "true"
```

Keep in mind that `namespace` in your HelmChart resource metadata section should always be `kube-system`, because the K3s deploy controller is configured to watch this namespace for new HelmChart resources. If you want to specify the namespace for the actual Helm release, you can do that using `targetNamespace` key under the `spec` directive, as shown in the configuration example below.

> **Note:** In order for the Helm Controller to know which version of Helm to use to Auto-Deploy a helm app, please specify the `helmVersion` in the spec of your YAML file.

Also note that besides `set`, you can use `valuesContent` under the `spec` directive. And it's okay to use both of them:

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: grafana
  namespace: kube-system
spec:
  chart: stable/grafana
  targetNamespace: monitoring
  set:
    adminPassword: "NotVerySafePassword"
  valuesContent: |-
    image:
      tag: master
    env:
      GF_EXPLORE_ENABLED: true
    adminUser: admin
    sidecar:
      datasources:
        enabled: true
```

K3s versions `<= v0.5.0` used `k3s.cattle.io` for the API group of HelmCharts. This has been changed to `helm.cattle.io` for later versions.

### Using the Helm CRD

You can deploy a third-party Helm chart using an example like this:

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: nginx
  namespace: kube-system
spec:
  chart: nginx
  repo: https://charts.bitnami.com/bitnami
  targetNamespace: default
```

You can install a specific version of a Helm chart using an example like this:

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: stable/nginx-ingress
  namespace: kube-system
spec:
  chart: nginx-ingress
  version: 1.24.4
  targetNamespace: default
```