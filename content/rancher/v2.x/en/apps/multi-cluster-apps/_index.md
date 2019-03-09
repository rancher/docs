---
title: Multi-Cluster Apps
weight: 5000
---
_Note: Available as of v2.2.0_

In use cases where you need to deploy copies of the same workload to multiple clusters or projects, deploy it using a multi-cluster app. A _multi-cluster app_ is an app installed using a Helm Chart across multiple clusters. 

Multi-Cluster Apps are beneficial because they reduce the repetition of deploying individual workloads to each target. They also reduce the likelihood of user error during workload configuration, as you only have to configure a single object rather than a unique object for each target. But you still have the option of configuring workloads of an app differently for certain targets, through Answer Overrides. Additionally, because multi-cluster apps are a single object, they simplify routine maintenance. For example, rather than upgrading several apps, you can upgrade the multi-cluster app, which then propagates the upgrade action to the app in each target project.

You can deploy multi-cluster apps using a template from any global level catalog. After the initial deployment, multi-cluster apps can be upgraded or rolled back just like any other workload.


## Multi-Cluster App Installation

1. From the Global View, go to **Apps** -> **Multi-Cluster Apps**. 
2. This page lists all multi-cluster apps you have access to. 
3. Click on **Launch** and select an application template.
4. You'll find a lot of similarities between this and the Catalog App Launch page. Over here, you get to configure your multi- cluster app, and all the apps it launches in your target projects. 
You can categorize these configuration details in two parts.

### Configure your Multi-Cluster App
The following fields let you do this

- **Name**  
Provide a unique name for your multi-cluster app.

- **Target Projects**  
This is where you can provide all the projects that you want your apps to run in. You will be presented with a list of all projects you have access to.

- **Upgrade Strategy**  
You can select how all the apps created by your multi-cluster app will undergo an upgrade. More on this in the `Multi-Cluster App Management` section below.

- **Members**  
You can share your multi-cluster app with other users, by adding them as members of your multi-cluster apps.
You can choose from these three access-types while adding a user to your multi-cluster app.

	- **Owner**  
	 User added as an owner can manage the entire multi-cluster app configuration. They can modify the multi-cluster app configuration by updating the following fields  
	 1. Target Projects  
	 2. Members  
	 3. Roles   
	 Along with this, they can also manage the configuration of the apps launched by the multi-cluster app. They can do so by modifying the following fields  
	 1. Version of the application template  
	 2. Answers passed to certain target projects or their clusters, by using Answer Overrides 
	 
	 So in short, owners can alter the multi-cluster app, and the corresponding apps, or delete the multi-cluster app. They can  manage/remove apps in target projects by modifying the targets list, without expliciltly being members of these projects. Hence, make sure you add only trusted users with the access-type `owner`.
	  
	- **Member**  
	 User added with access-type member, has permissions to modify the configuration of apps launched by the multi-cluster app across all target projects. They can do so by updating the following fields  
	 1. Version of the application template  
	 2. Answers passed to certain target projects or their clusters, by using Answer Overrides
	 
	 Users added with access type `Member` can modify your underlying apps without explicitly being part of the projects these apps are launched in. Hence be sure to added trusted users with `Member` access type.

	- **Read-only**  
	 Users given read-only access can only list/get the multi-cluster apps, and can't modify it. 

	**NOTE**  
Please make sure you share your multi-cluster app with only trusted users as `Owner` or `Member`.

- **Roles**  
	- When you launch a regular Catalog App through Rancher, your permissions get used for creation of all workloads/resources that the app needs. You are marked as the creator of this app. A change in your permissions in Rancher, will affect your ability to further manage this app. 
	- Multi-cluster app on the other hand launches these catalog apps for you in the target projects. But we don't want the multi-cluster app creator to be added as the underlying apps' creator. The reason being, a change in your permissions could affect how all these apps will get managed. If you accidentally get removed from one of the target projects, you can no longer control the app in that project. 
	Hence we create a behind-the-scenes system user and assign it as the creator of all underyling apps of a multi-cluster app.
	You can pass permissions to this system user through `Roles`.
	- **Roles accepted are based on your permissions**
		- You can only assign Roles which you yourself have in the target projects. This is to prevent any privilege escalation.
		- Rancher UI presents two options to choose from for this field: Project and Cluster permissions. Where Project permission corresponds to the "project-member" role and Cluster permission corresponds to the "cluster-owner" role.
		- We perform exact match to check if you have the roles you pass, in your target projects.
		- For example if you select the Project permission, you need to have the role "project-member" in all target projects. But these exact match checks are relaxed for global admins, owners of the target projects, and their clusters (users with role "project-owner" in targets or "cluster-owner" in clusters of these target projects).
		- If instead you select the Cluster permissions, you need to be the cluster-owner of the target project's clusters (This too is relaxed for the global admin).
		- If you are a cluster-owner of the clusters your target projects belong to, you can pass "Project" or "Cluster" roles, without explicitly being a member of the clusters' projects.
		- If you are a project-owner, or project-member of your target projects, you can pass the "Project" role only. 
		- If you don't have any of these roles, it means you don't have enough permissions in the selected target projects to create apps. So you cannot assign anyone else these roles either.
	- You can just start your multi-cluster app with the Project permissions selected by default. This corresponds to the `project-member` role, which encompassess all permissions required for managing apps and most workloads. This also does a check of your membership in that project. If you are an owner or a member of the target projects, your multi-cluster app creation will go through. But if you don't have any of these exact roles in the targets, then you won't be allowed to create a multi-cluster app with these targets.
	- There are some apps like grafana or datadog, that require access to certain cluster-scoped resources, which the "project-member" role cannot provide. In that case, please select the Cluster permissions. Even if you launch your multi-cluster app with the Project role, you can later upgrade to use the Cluster permissions.

### Configure the underlying apps
The following fields are responsible for that

- **Template Version**  
Provide the version of your application template.

- **Answer Overrides**  
If you select multiple targets for your multi-cluster app, but want certain answers to be different for some targets, you can pass those answers through answer overrides. You can choose the scope of an override: `Global`, `Cluster` by selecing a cluster, or `Project` by selecting a project. All apps launched via your multi-cluster app in those scopes will use these overridden answers if provided.

## Upgrading Multi-Cluster App Roles and Projects  

- **Changing Roles on an existing Multi-Cluster app**
The creator and any users added with the access-type "owner" to a multi-cluster app, can upgrade its Roles. When adding a new Role, we check if the user has that exact role in all current target projects. These checks allow the same relaxations for global admins, cluster owners and project-owners as described in the installation section for the field `Roles`.

- **Adding/Removing target projects**
The creator and any users added with access-type "owner" to a multi-cluster app, can add or remove its target projects. When adding a new project, we check if the caller of this request has all Roles defined on multi-cluster app, in the new projects they want to add. The roles checks are again relaxed for global admins, cluster-owners and project-owners.


## Multi-Cluster App Management

After deploying a multi-cluster app, you need to maintain it using the catalog features available for all Helm chart deployments, be they single-cluster or multi-cluster. Just like catalog app deployments to an individual cluster, multi-cluster apps can be cloned, upgraded, or rolled back.

- **Clone**

    After creating a multi-cluster app, you can clone it and use it as a template for another multi-cluster app with a slightly different configuration. Cloning saves you the work of manually duplicating a configuration.

- **Upgrade**

    When a new version of an app is released, you can upgrade it across clusters by upgrading its multi-cluster app. When performing a multi-cluster upgrade, you'll have an opportunity to configure an upgrade strategy that optimizes network speed and upgrade reliability for your environment. The upgrade strategies you can choose from are `Rolling Upgrade` and `Simultaneous Upgrade`.

    If you choose `Rolling update`, the **batch size** option lets you choose how many targets can be upgraded simultaneously, and `Interval` lets you specify the time interval you want between upgrades of consecutive batches.

- **Rollback**

    In the event that an upgrade causes issues for one or more of your targets, you can roll the application back to the prior version. We store up to 10 revisions of your multi-cluster app from which you can choose one. Rolling back a multi-cluster app reverts it for _all_ target clusters and projects, not just those targets affected by the upgrade issue.

