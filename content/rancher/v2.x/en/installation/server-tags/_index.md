---
title: Choosing a Version of Rancher
weight: 230
---

## Single Node Installs

When performing [single-node installs]({{< baseurl >}}/rancher/v2.x/en/installation/single-node), upgrades, or rollbacks, you can use _tags_ to install a specific version of Rancher.

### Server Tags

Rancher Server is distributed as a Docker image, which have tags attached to them. You can specify this tag when entering the command to deploy Rancher. Remember that if you use a tag without an explicit version (like `latest` or `stable`), you must explicitly pull a new version of that image tag. Otherwise, any image cached on the host will be used.

Tag                        | Description
-------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------
`rancher/rancher:latest`   | Our latest development release. These builds are validated through our CI automation framework. These releases are not recommended for production environments.
`rancher/rancher:stable`   | Our newest stable release. This tag is recommended for production.
`rancher/rancher:<v2.X.X>` | You can install specific versions of Rancher by using the tag from a previous release. See what's available at DockerHub.




>**Notes:** 
>
>- The `master` tag or any tag with `-rc` or another suffix is meant for the Rancher testing team to validate. You should not use these tags, as these builds are not officially supported.
>- Want to install an alpha review for preview? Install using one of the alpha tags listed on our [announcements page](https://forums.rancher.com/c/announcements) (e.g., `v2.2.0-alpha1`).
>
>        _Caveat:_ Alpha releases cannot be upgraded to or from any other release.


## High Availability Installs

When installing, upgrading, or rolling back Rancher Server in a [high availability configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ha/), Rancher server is installed using a Helm chart on a Kubernetes cluster. Therefore, as you prepare to install or upgrade a high availability Rancher configuration, you must add a Helm chart repository that contains the charts for installing Rancher.

### Helm Chart Repositories

Rancher provides several different Helm chart repositories to choose from. We align our latest and stable Helm chart repositories with the Docker tags that are used for a single node installation. Therefore, the `rancher-latest` repository will contain charts for all the Rancher versions that have been tagged as `rancher/rancher:latest`. When a Rancher version has been promoted to the `rancher/rancher:stable`, it will get added to the `rancher-stable` repository.

Type | Command to Add the Repo | Description of the Repo
-----------|-----|-------------
rancher-latest   | `helm repo add rancher-latest https://releases.rancher.com/server-charts/latest` | Adds a repository of Helm charts for the latest versions of Rancher. We recommend using this repo for testing out new Rancher builds.
rancher-stable  | `helm repo add rancher-stable https://releases.rancher.com/server-charts/stable` | Adds a repository of Helm charts for older, stable versions of Rancher. We recommend using this repo for production environments.
rancher-alpha    | `helm repo add rancher-alpha https://releases.rancher.com/server-charts/alpha` | Adds a repository of Helm charts for alpha versions of Rancher for previewing upcoming releases. These releases are discouraged in production environments. Upgrades _to_ or _from_ charts in the rancher-alpha repository to any other chart, regardless or repository, aren't supported.

<br/>
Instructions on when to select these repos are available below in [Switching to a Different Helm Chart Repository](#switching-to-a-different-helm-chart-repository).

> **Note:** The introduction of the `rancher-latest` and `rancher-stable` Helm Chart repositories was introduced after Rancher v2.1.0, so the `rancher-stable` repository contains some Rancher versions that were never marked as `rancher/rancher:stable`. The versions of Rancher that were tagged as `rancher/rancher:stable` prior to v2.1.0 are v2.0.4, v2.0.6, v2.0.8. Post v2.1.0, all charts in the `rancher-stable` repository will correspond with any Rancher version tagged as `stable`.

### Helm Chart Versions

Up until the initial release of the Helm chart for Rancher v2.1.0, the version of the Helm chart matched the Rancher version (i.e `appVersion`).

Since there are times where the Helm chart will require changes without any changes to the Rancher version, we have moved to a versioning scheme using `yyyy.mm.<build-number>` for the Helm charts.

Run `helm search rancher` to view which Rancher version will be launched for the your Helm chart.

```
NAME                      CHART VERSION    APP VERSION    DESCRIPTION
rancher-latest/rancher    2018.10.1            v2.1.0      Install Rancher Server to manage Kubernetes clusters acro...
```

### Switching to a Different Helm Chart Repository

After installing Rancher, if you want to change which Helm chart repository to install Rancher from, you will need to follow these steps.

>**Note:** Because the rancher-alpha repository contains only alpha charts, switching between the rancher-alpha repository and the rancher-stable or rancher-latest repository for upgrades is not supported.

{{< release-channel >}}

1. List the current Helm chart repositories.

    ```
    helm repo list

    NAME          	      URL
    stable        	      https://kubernetes-charts.storage.googleapis.com
    rancher-<CHART_REPO>		https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

2. Remove the existing Helm Chart repository that contains your charts to install Rancher, which will either be `rancher-stable` or `rancher-latest` depending on what you had initially added.

    ```
    helm repo remove rancher-<CHART_REPO>
    ```

3. Add the Helm chart repository that you want to start installing Rancher from.

    ```
    helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

4. Continue to follow the steps to [upgrade Rancher]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/ha-server-upgrade-helm/) from the new Helm chart repository.
