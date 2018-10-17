---
title: Choosing a Version of Rancher
weight: 230
---

## Single Node Installs

When performing [single-node installs]({{< baseurl >}}/rancher/v2.x/en/installation/single-node), upgrades, or rollbacks, you can use _tags_ to install a specific version of Rancher.

### Server Tags

Rancher Server is distributed as a Docker image, which have tags attached to them. You can specify this tag when entering the command to deploy Rancher. Remember that if you use a tag without an explicit version (like `latest` or `stable`), you must explicitly pull a new version of that image tag. Otherwise any image cached on the host will be used.

| Tag                        | Description                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rancher/rancher:latest`   | Our latest development release. These builds are validated through our CI automation framework. These releases are not recommended for production environments. |
| `rancher/rancher:stable`   | Our newest stable release. This tag is recommended for production.                                                                                              |
| `rancher/rancher:<v2.X.X>` | You can install specific versions of Rancher by using the tag from a previous release. See what's available at DockerHub.                                                                          |

<br/>

>**Note:** The `master` tag or any tag with `-rc` or another suffix is meant for the Rancher testing team to validate.  You should not use these tags, as these builds are not officially supported.

## High Availability Installs

When installing, upgrading, or rolling back Rancher Server in a [high availability configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ha), you can choose what version of Rancher you want to use.

The images available for installation are controlled by two factors:

- The repository of Helm charts that you will configure (or have configured) during initial installation of Rancher Server. 
- The `rancherImageTag` option, which you can set from the command line.

### Rancher Chart Repositories

In high availability Rancher configurations, Rancher Server is distributed by Helm chart. Therefore, as you prepare to install or upgrade a high availability Rancher configuration, you must configure a chart repository that contains Docker images for Rancher. You can install Rancher from two different repos:

Repository | Repo Configuration Command | Description
-----------|-----|-------------
`latest`   | `helm repo add rancher-latest https://releases.rancher.com/server-charts/latest` | Adds a repository of Helm charts for the latest versions of Rancher. We recommend using this repo for testing out new Rancher builds.
`stable`   | `helm repo add rancher-stable https://releases.rancher.com/server-charts/stable` | Adds a repository of Helm charts for older, stable versions of Rancher. We recommend using this repo for production environments.
<br/>
Instructions on when to make these configurations are available in [High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha).

>**Important!**
>
>When _upgrading_ or _rolling back_ Rancher in a high availability configuration, you must use the same repository that you used during installation.

### Chart Option: `rancherImageTag`

When installing Rancher in a high availability configuration, the latest version is used by default. However, if you want to install specific version of Rancher, you can set the `rancherImageTag` [option]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#advanced-options). This option sets the version of Rancher that's deployed when you install by Helm chart.

>**Note:** The versions of Rancher available in [chart repository](#rancher-chart-repositories) are different.