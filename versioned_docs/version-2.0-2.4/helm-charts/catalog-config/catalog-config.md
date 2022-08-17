---
title: Custom Catalog Configuration Reference
weight: 300
aliases:
  - /rancher/v2.0-v2.4/en/catalog/catalog-config
  - /rancher/v2.0-v2.4/en/catalog/catalog-config
  - /rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/catalog-config
---

Any user can create custom catalogs to add into Rancher. Besides the content of the catalog, users must ensure their catalogs are able to be added into Rancher.

- [Types of Repositories](#types-of-repositories)
- [Custom Git Repository](#custom-git-repository)
- [Custom Helm Chart Repository](#custom-helm-chart-repository)
- [Catalog Fields](#catalog-fields)
- [Private Repositories](#private-repositories)
  - [Using Username and Password](#using-username-and-password)
  - [Using an OAuth token](#using-an-oauth-token)

# Types of Repositories

Rancher supports adding in different types of repositories as a catalog:

* Custom Git Repository
* Custom Helm Chart Repository

# Custom Git Repository

The Git URL needs to be one that `git clone` [can handle](https://git-scm.com/docs/git-clone#_git_urls_a_id_urls_a) and must end in `.git`. The branch name must be a branch that is in your catalog URL. If no branch name is provided, it will default to use the `master` branch. Whenever you add a catalog to Rancher, it will be available almost immediately.

# Custom Helm Chart Repository

A Helm chart repository is an HTTP server that contains one or more packaged charts. Any HTTP server that can serve YAML files and tar files and can answer GET requests can be used as a repository server.

Helm comes with a built-in package server for developer testing (`helm serve`). The Helm team has tested other servers, including Google Cloud Storage with website mode enabled, S3 with website mode enabled or hosting custom chart repository server using open-source projects like [ChartMuseum](https://github.com/helm/chartmuseum).

In Rancher, you can add the custom Helm chart repository with only a catalog name and the URL address of the chart repository.

# Catalog Fields

When [adding your catalog]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/custom/adding/) to Rancher, you'll provide the following information:


| Variable              |  Description  |
| --------------------  | ------------- |
| 	Name                | Name for your custom catalog to distinguish the repositories in Rancher  |
| 	Catalog URL         | URL of your custom chart repository|
| 	Use Private Catalog | Selected if you are using a private repository that requires authentication |
| Username (Optional) | Username or OAuth Token |
| Password (Optional) | If you are authenticating using a username, enter the associated password. If you are using an OAuth token, use `x-oauth-basic`. |
| 	Branch              | For a Git repository, the branch name. Default: `master`. For a Helm Chart repository, this field is ignored.  |
| Helm version | The Helm version that will be used to deploy all of the charts in the catalog. This field cannot be changed later. For more information, refer to the [section on Helm versions.]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/#catalog-helm-deployment-versions) |

# Private Repositories

_Available as of v2.2.0_

Private Git or Helm chart repositories can be added into Rancher using either credentials, i.e. `Username` and `Password`. Private Git repositories also support authentication using OAuth tokens.

### Using Username and Password

1. When [adding the catalog]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/custom/adding/), select the **Use private catalog** checkbox.

2. Provide the `Username` and `Password` for your Git or Helm repository.

### Using an OAuth token

Read [using Git over HTTPS and OAuth](https://github.blog/2012-09-21-easier-builds-and-deployments-using-git-over-https-and-oauth/) for more details on how OAuth authentication works.

1. Create an [OAuth token](https://github.com/settings/tokens)
with `repo` permission selected, and click **Generate token**.

2. When [adding the catalog]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/custom/adding/), select the **Use private catalog** checkbox.

3. For `Username`, provide the Git generated OAuth token. For `Password`, enter `x-oauth-basic`.  
