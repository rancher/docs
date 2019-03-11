---
title: Add Private Catalogs
weight: 4030
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/add-private-catalogs/
---

## Add Private Git/Helm Chart Repositories
_Available as of v2.2.0_

You can add private catalog repositories based on Helm and Git.

![add-private-catalog.png]({{< baseurl >}}/img/rancher/catalog/add-private-catalog.png)

### Add Private Git/Helm Chart Repository using username and password:

1. From the `Global -> Catalogs` page, click **Add Catalog** to add your custom private chart repository:

    | Variable              |  Description  |
    | --------------------  | ------------- |
    | 	Name                | Custom catalog name. |
    | 	Catalog URL         | The URL of your custom chart repository. |
    | 	Use Private Catalog | Select it to use private catalog. |
    | 	Username            | Your Git/Helm username. |
    | 	Password            | Your Git/Helm password. |
    | 	Branch              | Git branch name. Ignored if it is a Helm repository. |
    

**Result**: Your custom catalog is added to the Rancher with `Active` state once it completes synchronization.

### Add Private Git Chart Repository using OAuth token:

1. Create an [OAuth token](https://github.com/settings/tokens) 
with `repo` permission selected, and click **Generate token**.

    ![add-git-token.png]({{< baseurl >}}/img/rancher/catalog/add-git-token.png)


2. From the `Global -> Catalogs` page, click **Add Catalog** to add your custom private chart repository:

    | Variable              |  Description  |
    | --------------------  | ------------- |
    | 	Name                | Custom catalog name. |
    | 	Catalog URL         | The URL of your custom chart repository. |
    | 	Use Private Catalog | Select it to use private catalog. |
    | 	Username            | Your Git generated OAuth token. |
    | 	Password            | Enter `x-oauth-basic`. read [using Git over HTTPS and OAuth](https://github.blog/2012-09-21-easier-builds-and-deployments-using-git-over-https-and-oauth/) for more details. |
    | 	Branch              | Your Git branch name, default to master. |
    

**Result**: Your custom catalog is added to the Rancher with `Active` state once it completes synchronization.
