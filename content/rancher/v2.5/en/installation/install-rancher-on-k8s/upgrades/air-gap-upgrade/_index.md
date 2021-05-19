---
title: Rendering the Helm Template in an Air Gapped Environment
shortTitle: Air Gap Upgrade
weight: 1
---

> These instructions assume you have already followed the instructions for a Kubernetes upgrade on [this page,]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/upgrades/) including the prerequisites, up until step 3. Upgrade Rancher.

### Rancher Helm Template Options

Render the Rancher template using the same chosen options that were used when installing Rancher. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools.

Based on the choice you made during installation, complete one of the procedures below.

Placeholder | Description
------------|-------------
`<VERSION>` | The version number of the output tarball.
`<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.
`<CERTMANAGER_VERSION>` | Cert-manager version running on k8s cluster.


### Option A: Default Self-signed Certificate

{{% tabs %}}
{{% tab "Rancher v2.5.8+" %}}

```
helm template rancher ./rancher-<VERSION>.tgz --output-dir . \
    --no-hooks \ # prevent files for Helm hooks from being generated
	--namespace cattle-system \
	--set hostname=<RANCHER.YOURDOMAIN.COM> \
	--set certmanager.version=<CERTMANAGER_VERSION> \
	--set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
	--set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
	--set useBundledSystemChart=true # Use the packaged Rancher system charts
```

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

{{% /tab %}}
{{% /tabs %}}



### Option B: Certificates from Files using Kubernetes Secrets


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
{{% /tab %}}
{{% /tabs %}}


### Apply the Rendered Templates

Copy the rendered manifest directories to a system with access to the Rancher server cluster and apply the rendered templates.

Use `kubectl` to apply the rendered manifests.

```plain
kubectl -n cattle-system apply -R -f ./rancher
```

# Verify the Upgrade

Log into Rancher to confirm that the upgrade succeeded.

>**Having network issues following upgrade?**
>
> See [Restoring Cluster Networking]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/namespace-migration).

# Known Upgrade Issues

A list of known issues for each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)
