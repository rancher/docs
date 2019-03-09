---
title: Multi-Cluster Applications
weight: 5000
---
_Available as of v2.2.0_

In use cases where you need to deploy a common workload to multiple clusters or projects, deploy it using a multi-cluster application. A _multi-cluster application_ is a Helm chart installed as an app across multiple clusters. 

Multi-cluster applications are beneficial because they reduce the repetition of deploying individual workloads to each target. They also reduce the likelihood of user error during workload configuration, as you only have to configure a single object rather than a unique object for each target. But you still have the option of configuring workloads of an app differently for certain targets, through Answer Overrides. Additionally, because multi-cluster apps are a single object, they simplify routine maintenance. For example, rather than upgrading several unique apps, you can upgrade the multi-cluster application, which then replicates to each target project.

You can deploy multi-cluster applications using a template from any global level catalog. Following initial deployment, multi-cluster applications can be upgraded or rolled back just like any other workload.


## Multi-Cluster Application Installation

For managing multi-cluster applications, on the Global View, go to **Tools** -> **Multi-Cluster Apps**. This page lists all multiclusterapps you have access to. To launch a new one, click on **Launch**.
You'll find a lot of similarities between this and the Catalog App Launch page. Over here, you get to configure your multi- cluster app, and all the apps it launches in your target projects. 
You can categorize these configuration details in two parts

### Configure your multi-cluster app
The following fields let you do this

- **Name**  
Provide a unique name for your multi-cluster app

- **Target Projects**  
This is where you can provide all the projects that you want your apps to run in. The list of projects presented to you will contain all projects across all clusters that you have access to.

- **Upgrade Strategy**  
You can select how you want all the apps created by your multi-cluster app to undergo an upgrade. More on this in section <blah>

- **Members**  
You can share your multi-cluster app with other users, by adding them as members of your multi-cluster apps
You can choose from these three access-types while adding a user to your multi-cluster app:

	- **Owner**  
	 User added as an owner can manage the entire multi-cluster app configuration, by adding/removing target projects, adding/removing members, changing Roles (explained below). Along with this, they can also manage the configuration of the apps launched by the multi-cluster app, by changing the version of your application template, or answers passed to certain target projects. So in short, owners can alter the multi-cluster app defintion, and the corresponding app's definitions. Hence, make sure you add only trusted users with the access-type owner since they can upgrade apps in all projects or remove apps from some projects by modifying the targets list, without expliciltly being members of these projects

	- **Member**  
	 User added with access-type member, has rights to modify the configuration of apps launched by the multi-cluster app across all target projects. They can upgrade the underlying apps by changing the version of application template, or they can change answers passed to certain targets, by providing Answer Overrides. Again, be sure to added trusted users even with Member access type since they can modify your underlying apps without explicitly being part of the projects these apps are launched in

	- **Read-only**  
	 Users given read-only access can only list/get the multi-cluster apps, and can't modify it. 

	**NOTE**  
Please make sure you share your multi-cluster app with only trusted users as `Owner` or `Member`

- **Roles**  
When you launch a regular Catalog App through Rancher, your permissions get used for creation of all workloads/resources that the app needs, you are marked as the creator of this app. A change in your permissions in Rancher, will affect your ability to further manage this app. 
Multi-cluster app on the other hand launches these catalog apps for you in the target projects. But we don't want the multi-cluster app creator to be added as the underlying apps' creator. The reason being, a change in your permissions could affect how all these apps will get managed. If you accidentally get removed from one of the target projects, you can no longer control the app in that project. 
Hence we create a behind-the-scenes system user and assign it as the creator of all underyling apps of a multi-cluster app.
You can pass permissions to this system user through Roles.
Rancher UI presents two options to choose from for this field: Project and Cluster permissions
You can just start your multi-cluster app with the Project permissions selected by default. This corresponds to the `project-member` role, which encompassess all permissions required for managing apps and most workloads.
There are some apps like grafana or datadog, which require access to certain cluster-scoped resources, which the Project role cannot provide. In that case, please select the Cluster permissions. Even if you launch your multi-cluster app with the Project role, you can later upgrade to use the Cluster permissions

### Configure the underlying apps
The following fields are responsible for that


- **Template Version**  
Provide the version of your application template

- **Answer Overrides**  
If you select three targets for your multi-cluster app, but want certain answers to be different for some targets, you can pass those answers through answer overrides. You can choose the scope of an override: `Global`, `Cluster` by selecing a cluster, or `Project` by selecting a project. All apps launched via your multi-cluster app in those scopes will use these overridden answers if provided

## Multi-Cluster Application Management

After deploying a multi-cluster application, you need to maintain it using the catalog features available for all Helm chart deployments, be they single-cluster or multi-cluster. Just like catalog app deployments to an individual cluster, multi-cluster applications can be cloned, upgraded, or rolled back.

- **Clone**

    After creating a multi-cluster application, you can clone it and use it as a template for another multi-cluster application with a slightly different configuration. Cloning saves you the busy work of manually duplicating a configuration.

- **Upgrade**

    When a new version of an application is released, you can upgrade it across clusters by upgrading its multi-cluster application. When performing a multi-cluster upgrade, you'll have an opportunity to configure an upgrade strategy that optimizes network speed and upgrade reliability for your environment. The upgrade strategies you can choose from are `Rolling Upgrade` and `Simulatenous Upgrade`

    If you choose `Rolling update`, the **batch size** option lets you choose how many target-side workloads can be upgraded simultaneously, and `Interval` lets you specify the time interval you want between upgrades of consecutive batches.

- **Rollback**

    In the event that an upgrade causes issues for one or more of your targets, you can roll the application back to the prior version. Rolling back a multi-cluster application reverts it for _all_ target clusters and projects, not just those targets affected by the upgrade issue.

