---
title: Managing Catalog Apps
weight: 500
aliases:
  - /rancher/v2.0-v2.4/en/catalog/managing-apps
  - /rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/managing-apps
---

After deploying an application, one of the benefits of using an application versus individual workloads/resources is the ease of being able to manage many workloads/resources applications. Apps can be cloned, upgraded or rolled back.

- [Cloning catalog applications](#cloning-catalog-applications)
- [Upgrading catalog applications](#upgrading-catalog-applications)
- [Rolling back catalog applications](#rolling-back-catalog-applications)
- [Deleting catalog application deployments](#deleting-catalog-application-deployments)

### Cloning Catalog Applications

After an application is deployed, you can easily clone it to use create another application with almost the same configuration. It saves you the work of manually filling in duplicate information.

### Upgrading Catalog Applications

After an application is deployed, you can easily upgrade to a different template version.

1. From the **Global** view, navigate to the project that contains the catalog application that you want to upgrade.

1. From the main navigation bar, choose **Apps**. In versions before v2.2.0, choose **Catalog Apps** on the main navigation bar. Click **Launch**.

3. Find the application that you want to upgrade, and then click the &#8942; to find **Upgrade**.

4. Select the **Template Version** that you want to deploy.

5. (Optional) Update your **Configuration Options**.

6. (Optional) Select whether or not you want to force the catalog application to be upgraded by checking the box for **Delete and recreate resources if needed during the upgrade**.

    > In Kubernetes, some fields are designed to be immutable or cannot be updated directly. As of v2.2.0, you can now force your catalog application to be updated regardless of these fields. This will cause the catalog apps to be deleted and resources to be re-created if needed during the upgrade.

7. Review the files in the **Preview** section. When you're satisfied, click **Launch**.

**Result**: Your application is updated. You can view the application status from the project's:

- **Workloads** view
- **Apps** view. In versions before v2.2.0, this is the **Catalog Apps** view.


### Rolling Back Catalog Applications

After an application has been upgraded, you can easily rollback to a different template version.

1. From the **Global** view, navigate to the project that contains the catalog application that you want to upgrade.

1. From the main navigation bar, choose **Apps**. In versions before v2.2.0, choose **Catalog Apps** on the main navigation bar. Click **Launch**.

3. Find the application that you want to rollback, and then click the &#8942; to find **Rollback**.

4. Select the **Revision** that you want to roll back to. By default, Rancher saves up to the last 10 revisions.

5. (Optional) Select whether or not you want to force the catalog application to be upgraded by checking the box for **Delete and recreate resources if needed during the upgrade**.

    > In Kubernetes, some fields are designed to be immutable or cannot be updated directly. As of v2.2.0, you can now force your catalog application to be updated regardless of these fields. This will cause the catalog apps to be deleted and resources to be re-created if needed during the rollback.

7. Click **Rollback**.

**Result**: Your application is updated. You can view the application status from the project's:

- **Workloads** view
- **Apps** view. In versions before v2.2.0, this is the **Catalog Apps** view.

### Deleting Catalog Application Deployments

As a safeguard to prevent you from unintentionally deleting other catalog applications that share a namespace, deleting catalog applications themselves does not delete the namespace they're assigned to.

Therefore, if you want to delete both an app and the namespace that contains the app, you should remove the app and the namespace separately:

1. Uninstall the app using the app's `uninstall` function.

1. From the **Global** view, navigate to the project that contains the catalog application that you want to delete.

1. From the main menu, choose **Namespaces**.

1. Find the namespace running your catalog app. Select it and click **Delete**.

**Result:** The catalog application deployment and its namespace are deleted.
