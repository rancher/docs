---
title: Choosing a Rancher Version
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/server-tags
---

This section describes how to choose a Rancher version.

For a high-availability installation of Rancher, which is recommended for production, the Rancher server is installed using a **Helm chart** on a Kubernetes cluster. Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm-version) to choose a version of Helm to install Rancher.

For Docker installations of Rancher, which is used for development and testing, you will install Rancher as a **Docker image.**

{{% tabs %}}
{{% tab "Helm Charts" %}}

When installing, upgrading, or rolling back Rancher Server when it is [installed on a Kubernetes cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/), Rancher server is installed using a Helm chart on a Kubernetes cluster. Therefore, as you prepare to install or upgrade a high availability Rancher configuration, you must add a Helm chart repository that contains the charts for installing Rancher.

Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm-version) to choose a version of Helm to install Rancher.

### Helm Chart Repositories

Rancher provides several different Helm chart repositories to choose from. We align our latest and stable Helm chart repositories with the Docker tags that are used for a Docker installation. Therefore, the `rancher-latest` repository will contain charts for all the Rancher versions that have been tagged as `rancher/rancher:latest`. When a Rancher version has been promoted to the `rancher/rancher:stable`, it will get added to the `rancher-stable` repository.

| Type           | Command to Add the Repo                                                          | Description of the Repo            |
| -------------- | ------------ | ----------------- |
| rancher-latest | `helm repo add rancher-latest https://releases.rancher.com/server-charts/latest` | Adds a repository of Helm charts for the latest versions of Rancher. We recommend using this repo for testing out new Rancher builds.                                                                                                                                                      |
| rancher-stable | `helm repo add rancher-stable https://releases.rancher.com/server-charts/stable` | Adds a repository of Helm charts for older, stable versions of Rancher. We recommend using this repo for production environments.                                                                                                                                                          |
| rancher-alpha  | `helm repo add rancher-alpha https://releases.rancher.com/server-charts/alpha`   | Adds a repository of Helm charts for alpha versions of Rancher for previewing upcoming releases. These releases are discouraged in production environments. Upgrades _to_ or _from_ charts in the rancher-alpha repository to any other chart, regardless or repository, aren't supported. |

<br/>
Instructions on when to select these repos are available below in [Switching to a Different Helm Chart Repository](#switching-to-a-different-helm-chart-repository).

> **Note:** The introduction of the `rancher-latest` and `rancher-stable` Helm Chart repositories was introduced after Rancher v2.1.0, so the `rancher-stable` repository contains some Rancher versions that were never marked as `rancher/rancher:stable`. The versions of Rancher that were tagged as `rancher/rancher:stable` before v2.1.0 are v2.0.4, v2.0.6, v2.0.8. Post v2.1.0, all charts in the `rancher-stable` repository will correspond with any Rancher version tagged as `stable`.

### Helm Chart Versions

Rancher Helm chart versions match the Rancher version (i.e `appVersion`).  Once you've added the repo you can search it to show available versions with the following command:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;`helm search repo --versions`

If you have several repos you can specify the repo name, ie. `helm search repo rancher-stable/rancher --versions` <br/>
For more information, see https://helm.sh/docs/helm/helm_search_repo/

To fetch a specific version of your chosen repo, define the `--version` parameter like in the following example:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;`helm fetch rancher-stable/rancher --version=2.4.8`

For the Rancher v2.1.x versions, there were some Helm charts where the version was a build number, i.e. `yyyy.mm.<build-number>`. These charts have been replaced with the equivalent Rancher version and are no longer available.

### Switching to a Different Helm Chart Repository

After installing Rancher, if you want to change which Helm chart repository to install Rancher from, you will need to follow these steps.

> **Note:** Because the rancher-alpha repository contains only alpha charts, switching between the rancher-alpha repository and the rancher-stable or rancher-latest repository for upgrades is not supported.

{{< release-channel >}}

1. List the current Helm chart repositories.

    ```plain
    helm repo list

    NAME          	      URL
    stable        	      https://charts.helm.sh/stable
    rancher-<CHART_REPO>		https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

2. Remove the existing Helm Chart repository that contains your charts to install Rancher, which will either be `rancher-stable` or `rancher-latest` depending on what you had initially added.

    ```plain
    helm repo remove rancher-<CHART_REPO>
    ```

3. Add the Helm chart repository that you want to start installing Rancher from.

    ```plain
    helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

4. Continue to follow the steps to [upgrade Rancher]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/upgrades-rollbacks/upgrades/ha) from the new Helm chart repository.
{{% /tab %}}
{{% tab "Docker Images" %}}
When performing [Docker installs]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/single-node), upgrades, or rollbacks, you can use _tags_ to install a specific version of Rancher.

### Server Tags

Rancher Server is distributed as a Docker image, which have tags attached to them. You can specify this tag when entering the command to deploy Rancher. Remember that if you use a tag without an explicit version (like `latest` or `stable`), you must explicitly pull a new version of that image tag. Otherwise, any image cached on the host will be used.

| Tag                        | Description   |
| -------------------------- | ------ |
| `rancher/rancher:latest`   | Our latest development release. These builds are validated through our CI automation framework. These releases are not recommended for production environments. |
| `rancher/rancher:stable`   | Our newest stable release. This tag is recommended for production.                                                                                              |
| `rancher/rancher:<v2.X.X>` | You can install specific versions of Rancher by using the tag from a previous release. See what's available at DockerHub.                                       |

> **Notes:**
>
> - The `master` tag or any tag with `-rc` or another suffix is meant for the Rancher testing team to validate. You should not use these tags, as these builds are not officially supported.
> - Want to install an alpha review for preview? Install using one of the alpha tags listed on our [announcements page](https://forums.rancher.com/c/announcements) (e.g., `v2.2.0-alpha1`). Caveat: Alpha releases cannot be upgraded to or from any other release.

{{% /tab %}} 
{{% /tabs %}}
