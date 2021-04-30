---
title: Upgrades
weight: 2
aliases:
  - /rancher/v2.0-v2.4/en/upgrades/upgrades
  - /rancher/v2.0-v2.4/en/installation/upgrades-rollbacks/upgrades
  - /rancher/v2.0-v2.4/en/upgrades/upgrades/ha-server-upgrade-helm-airgap
  - /rancher/v2.0-v2.4/en/upgrades/air-gap-upgrade/
  - /rancher/v2.0-v2.4/en/upgrades/upgrades/ha
  - /rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/upgrades/ha
  - /rancher/v2.0-v2.4/en/installation/upgrades-rollbacks/upgrades/
  - /rancher/v2.0-v2.4/en/upgrades/upgrades/ha-server-upgrade-helm/
  - /rancher/v2.0-v2.4/en/installation/upgrades-rollbacks/upgrades/ha
  - /rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades-rollbacks/upgrades
  - /rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades-rollbacks/upgrades/ha
  - /rancher/v2.0-v2.4/en/installation/upgrades-rollbacks/
  - /rancher/v2.0-v2.4/en/upgrades/
---
The following instructions will guide you through upgrading a Rancher server that was installed on a Kubernetes cluster with Helm. These steps also apply to air gap installs with Helm.

For the instructions to upgrade Rancher installed with Docker, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/single-node-upgrades)

To upgrade the components in your Kubernetes cluster, or the definition of the [Kubernetes services]({{<baseurl>}}/rke/latest/en/config-options/services/) or [add-ons]({{<baseurl>}}/rke/latest/en/config-options/add-ons/), refer to the [upgrade documentation for RKE]({{<baseurl>}}/rke/latest/en/upgrades/), the Rancher Kubernetes Engine.

If you installed Rancher using the RKE Add-on yaml, follow the directions to [migrate or upgrade]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on).

- [Prerequisites](#prerequisites)
- [Upgrade Outline](#upgrade-outline)
- [Known Upgrade Issues](#known-upgrade-issues)
- [RKE Add-on Installs](#rke-add-on-installs)

# Prerequisites

### Access to kubeconfig

Helm should be run from the same location as your kubeconfig file, or the same location where you run your kubectl commands from.

If you installed Kubernetes with RKE, the config will have been created in the directory you ran `rke up` in. 

The kubeconfig can also be manually targeted for the intended cluster with the `--kubeconfig` tag (see: https://helm.sh/docs/helm/helm/)

### Review Known Issues

Review the [known upgrade issues](#known-upgrade-issues) in the Rancher documentation for the most noteworthy issues to consider when upgrading Rancher.

A more complete list of known issues for each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)

Note that upgrades _to_ or _from_ any chart in the [rancher-alpha repository]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#helm-chart-repositories/) aren't supported.

### Helm Version

The upgrade instructions assume you are using Helm 3.

For migration of installs started with Helm 2, refer to the official [Helm 2 to 3 migration docs.](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/) The [Helm 2 upgrade page here]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/upgrades-rollbacks/upgrades/ha/helm2)provides a copy of the older upgrade instructions that used Helm 2, and it is intended to be used if upgrading to Helm 3 is not feasible.

### For air gap installs: Populate private registry

-For [air gap installs only,]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap) collect and populate images for the new Rancher server version. Follow the guide to [populate your private registry]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/populate-private-registry/) with the images for the Rancher version that you want to upgrade to.

### For upgrades from v2.0-v2.2 with external TLS termination

If you are upgrading Rancher from v2.x to v2.3+, and you are using external TLS termination, you will need to edit the cluster.yml to [enable using forwarded host headers.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#configuring-ingress-for-external-tls-when-using-nginx-v0-25)

### For upgrades with cert-manager older than 0.8.0

[Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753) Upgrade cert-manager to the latest version by following [these instructions.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/upgrading-cert-manager)

# Upgrade Outline

Follow the steps to upgrade Rancher server:

- [1. Back up your Kubernetes cluster that is running Rancher server](#1-back-up-your-kubernetes-cluster-that-is-running-rancher-server)
- [2. Update the Helm chart repository](#2-update-the-helm-chart-repository)
- [3. Upgrade Rancher](#3-upgrade-rancher)
- [4. Verify the Upgrade](#4-verify-the-upgrade)

# 1. Back up Your Kubernetes Cluster that is Running Rancher Server


[Take a one-time snapshot]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/backup/rke-backups/#option-b-one-time-snapshots)
of your Kubernetes cluster running Rancher server.

You'll use the backup as a restoration point if something goes wrong during upgrade.

# 2. Update the Helm chart repository

1. Update your local helm repo cache.

    ```
    helm repo update
    ```

1. Get the repository name that you used to install Rancher.

    For information about the repos and their differences, see [Helm Chart Repositories]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#helm-chart-repositories).

    {{< release-channel >}}

    ```
    helm repo list

    NAME          	       URL
    stable        	       https://charts.helm.sh/stable
    rancher-<CHART_REPO>	 https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

    > **Note:** If you want to switch to a different Helm chart repository, please follow the [steps on how to switch repositories]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/choosing-version/#switching-to-a-different-helm-chart-repository). If you switch repositories, make sure to list the repositories again before continuing onto Step 3 to ensure you have the correct one added.


1. Fetch the latest chart to install Rancher from the Helm chart repository.

    This command will pull down the latest charts and save it in the current directory as a `.tgz` file.

    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```
    You can fetch the chart for the specific version you are upgrading to by adding in the `--version=` tag.  For example:
    
    ```plain
    helm fetch rancher-<CHART_REPO>/rancher --version=v2.4.11
    ```

# 3. Upgrade Rancher

This section describes how to upgrade normal (Internet-connected) or air gap installations of Rancher with Helm.

{{% tabs %}}
{{% tab "Kubernetes Upgrade" %}}

Get the values, which were passed with `--set`, from the current Rancher Helm chart that is installed.

```
helm get values rancher -n cattle-system

hostname: rancher.my.org
```

> **Note:** There will be more values that are listed with this command. This is just an example of one of the values.

If you are also upgrading cert-manager to the latest version from a version older than 0.11.0, follow [Option B: Reinstalling Rancher and cert-manager.](#option-b-reinstalling-rancher-and-cert-manager)

Otherwise, follow [Option A: Upgrading Rancher.](#option-a-upgrading-rancher)

### Option A: Upgrading Rancher

Upgrade Rancher to the latest version with all your settings.

Take all the values from the previous step and append them to the command using `--set key=value`:

```
helm upgrade rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org
```

> **Note:** The above is an example, there may be more values from the previous step that need to be appended.

Alternatively, it's possible to export the current values to a file and reference that file during upgrade. For example, to only change the Rancher version:

```
helm get values rancher -n cattle-system -o yaml > values.yaml

helm upgrade rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  -f values.yaml \
  --version=2.4.5
```

### Option B: Reinstalling Rancher and cert-manager

If you are currently running the cert-manger whose version is older than v0.11, and want to upgrade both Rancher and cert-manager to a newer version, then you need to reinstall both Rancher and cert-manger due to the API change in cert-manger v0.11. 

1. Uninstall Rancher

    ```
    helm delete rancher -n cattle-system
    ```

2. Uninstall and reinstall `cert-manager` according to the instructions on the [Upgrading Cert-Manager]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/upgrading-cert-manager) page.

3. Reinstall Rancher to the latest version with all your settings. Take all the values from the step 1 and append them to the command using `--set key=value`. Note: There will be many more options from the step 1 that need to be appended.

    ```
    helm install rancher rancher-<CHART_REPO>/rancher \
    --namespace cattle-system \
    --set hostname=rancher.my.org
    ```

{{% /tab %}}

{{% tab "Kubernetes Air Gap Upgrade" %}}

Render the Rancher template using the same chosen options that were used when installing Rancher. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools.

Based on the choice you made during installation, complete one of the procedures below.

Placeholder | Description
------------|-------------
`<VERSION>` | The version number of the output tarball.
`<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.
`<CERTMANAGER_VERSION>` | Cert-manager version running on k8s cluster.


### Option A: Default Self-signed Certificate

 ```plain
helm template ./rancher-<VERSION>.tgz --output-dir . \
 --name rancher \
 --namespace cattle-system \
 --set hostname=<RANCHER.YOURDOMAIN.COM> \
 --set certmanager.version=<CERTMANAGER_VERSION> \
 --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
 --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
 --set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
```

### Option B: Certificates from Files using Kubernetes Secrets

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

If you are using a Private CA signed cert, add `--set privateCA=true` following `--set ingress.tls.source=secret`:

```plain
helm template ./rancher-<VERSION>.tgz --output-dir . \
--name rancher \
--namespace cattle-system \
--set hostname=<RANCHER.YOURDOMAIN.COM> \
--set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
--set ingress.tls.source=secret \
--set privateCA=true \
--set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
--set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
```

### Apply the Rendered Templates

Copy the rendered manifest directories to a system with access to the Rancher server cluster and apply the rendered templates.

Use `kubectl` to apply the rendered manifests.

```plain
kubectl -n cattle-system apply -R -f ./rancher
```

{{% /tab %}}
{{% /tabs %}}

# 4. Verify the Upgrade

Log into Rancher to confirm that the upgrade succeeded.

>**Having network issues following upgrade?**
>
> See [Restoring Cluster Networking]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/namespace-migration/#restoring-cluster-networking).

# Known Upgrade Issues

The following table lists some of the most noteworthy issues to be considered when upgrading Rancher. A more complete list of known issues for each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)

Upgrade Scenario | Issue
---|---
Upgrading to v2.4.6 or v2.4.7 | These Rancher versions had an issue where the `kms:ListKeys` permission was required to create, edit, or clone Amazon EC2 node templates. This requirement was removed in v2.4.8.
Upgrading to v2.3.0+ | Any user provisioned cluster will be automatically updated upon any edit as tolerations were added to the images used for Kubernetes provisioning.
Upgrading to v2.2.0-v2.2.x | Rancher introduced the [system charts](https://github.com/rancher/system-charts) repository which contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. To be able to use these features in an air gap install, you will need to mirror the `system-charts` repository locally and configure Rancher to use that repository. Please follow the instructions to [configure Rancher system charts]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/local-system-charts/).
Upgrading from v2.0.13 or earlier  | If your cluster's certificates have expired, you will need to perform [additional steps]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/certificate-rotation/#rotating-expired-certificates-after-upgrading-older-rancher-versions) to rotate the certificates.
Upgrading from v2.0.7 or earlier | Rancher introduced the `system` project, which is a project that's automatically created to store important namespaces that Kubernetes needs to operate. During upgrade to v2.0.7+, Rancher expects these namespaces to be unassigned from all projects. Before beginning upgrade, check your system namespaces to make sure that they're unassigned to [prevent cluster networking issues.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/namespace-migration)

# RKE Add-on Installs

**Important: RKE add-on install is only supported up to Rancher v2.0.8**

Please use the Rancher helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/).

If you are currently using the RKE add-on install method, see [Migrating from a RKE add-on install]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.
