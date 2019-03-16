---
title: Cluster and Project Level Catalogs
weight: 4020
---
_Note: Available as of v2.2.0_

### Cluster and Project Level Catalogs

The catalog added at the global level is shared with all clusters and projects. This means all users have equal access to the application templates (charts) from these global catalogs.
Some use cases require cluster level isolation between application templates from catalogs. For instance, when you have clusters dedicated to different teams (dev, QA, prod) or different customers.
Rancher 2.2 can address this need by letting you add catalogs at the cluster level.
A similar need for isolation between catalogs might arise at the project-level too. For example, if different teams are working in the same cluster but in separate projects and want to make some application templates available only for certain teams. For this, Rancher 2.2 also lets you add a catalog at the project level.

### Adding Cluster Level Catalogs

Only cluster owners are allowed to add/update/remove catalogs at the cluster level. All other cluster members can view and use templates from them.

1. From the **Global** view, navigate to your cluster.
2. From the **Tools** dropdown, select **Catalogs**. 
2. Click **Add Catalog**.
3. The form presented will be very similar to the one shown while adding a global level catalog
4. Along with the `Name`, `URL`, `Branch`, you also get to select `Scope` of the catalog. It is defaulted to `Cluster` when you're adding a catalog at the cluster level.
5. Fill out the form and click on **Create**

### Adding Project Level Catalogs

Only project owners are allowed to add/update/remove catalogs at the project level. All other project members can view and use templates from them.

1. From the **Global** view, navigate to your project.
2. Choose **Apps** from the main menu 
2. Click **Manage Catalogs**.
3. The form presented will be very similar to the one shown while adding a global and cluster level catalog
4. Along with the `Name`, `URL`, `Branch`, you also get to select `Scope` of the catalog. It is defaulted to `Project` when you're adding a catalog at the project level.
5. Fill out the form and click on **Create**

### Access to Catalogs and Templates

Global catalog templates are accessible across all the clusters and projects.
Cluster level catalog templates are accessible only within the cluster they belong to.
Project level catalog templates are accessible only within the project they belong to.
