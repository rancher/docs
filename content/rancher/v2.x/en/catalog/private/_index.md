---
title: Add Private Catalogs
weight: 4030
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/add-private-catalogs/
---

### Add Private Git/Helm Chart Repositories
_Available as of v2.2.0_

From Rancher v2.2.0, you can now select to add private catalog repositories using credentials like Username and Password, you may also want to use the 
OAuth token if your Git or Helm repository server support that.

![add-private-catalog.png]({{< baseurl >}}/img/rancher/catalog/add-private-catalog.png)

As an example, if you want to add a private Github repository as your custom catalog using OAuth token:

1. Firstly, you will need to create an [OAuth token](https://github.com/settings/tokens) 
with `repo` permission selected, and click **Generate token**.

    ![add-git-token.png]({{< baseurl >}}/img/rancher/catalog/add-git-token.png)


2. From the `Global -> Catalogs` page, you can now click **Add Catalog** to add your custom private chart repository:

    | Variable              |  Description  |
    | --------------------  | ------------- |
    | 	Name                | Custom catalog name. |
    | 	Catalog URL         | Enter the URL of your custom chart repository, e.g, `https://github.com/username/myrepo.git`. |
    | 	Use Private Catalog | Select if this is private chart repository server. |
    | 	Username            | Enter your Github username or Git generated OAuth token. |
    | 	Password            | Enter your Github password or `x-oauth-basic` if OAuth token is provided above, read [using Git over HTTPS and OAuth](https://github.blog/2012-09-21-easier-builds-and-deployments-using-git-over-https-and-oauth/) for more details. |
    | 	Branch              | Enter your Github branch name, default to master. |
    

**Result**: Your custom catalog is added to the Rancher with `Active` state once it completes synchronization.
