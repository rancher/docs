---
title: Multi-cluster Apps
weight: 2
---

> As of Rancher v2.5, we now recommend using [Fleet]({{<baseurl>}}/rancher/v2.5/en/deploy-across-clusters/fleet) for deploying apps across clusters.

Typically, most applications are deployed on a single Kubernetes cluster, but there will be times you might want to deploy multiple copies of the same application across different clusters and/or projects. In Rancher, a _multi-cluster application_,  is an application deployed using a Helm chart across multiple clusters. With the ability to deploy the same application across multiple clusters, it avoids the repetition of the same action on each cluster, which could introduce user error during application configuration. With multi-cluster applications, you can customize to have the same configuration across all projects/clusters as well as have the ability to change the configuration based on your target project. Since multi-cluster application is considered a single application, it's easy to manage and maintain this application.

Any Helm charts from a global catalog can be used to deploy and manage multi-cluster applications.

After creating a multi-cluster application, you can program a global DNS entry to make it easier to access the application.

- [Prerequisites](#prerequisites)
- [Launching a multi-cluster app](#launching-a-multi-cluster-app)
- [Multi-cluster app configuration options](#multi-cluster-app-configuration-options)
  - [Targets](#targets)
  - [Upgrades](#upgrades)
  - [Roles](#roles)
- [Application configuration options](#application-configuration-options)
  - [Using a questions.yml file](#using-a-questions-yml-file)
  - [Key value pairs for native Helm charts](#key-value-pairs-for-native-helm-charts)
  - [Members](#members)
  - [Overriding application configuration options for specific projects](#overriding-application-configuration-options-for-specific-projects)
- [Upgrading multi-cluster app roles and projects](#upgrading-multi-cluster-app-roles-and-projects)
- [Multi-cluster application management](#multi-cluster-application-management)
- [Deleting a multi-cluster application](#deleting-a-multi-cluster-application)

# Prerequisites

To create a multi-cluster app in Rancher, you must have at least one of the following permissions:

- A [project-member role]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#project-roles) in the target cluster(s), which gives you the ability to create, read, update, and delete the workloads
- A [cluster owner role]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) for the clusters(s) that include the target project(s)

# Launching a Multi-Cluster App

1. From the **Global** view, choose **Apps** in the navigation bar. Click **Launch**.

2. Find the application that you want to launch, and then click **View Details**.

3.  (Optional) Review the detailed descriptions, which are derived from the Helm chart's `README`.

4. Under **Configuration Options** enter a **Name** for the multi-cluster application. By default, this name is also used to create a Kubernetes namespace in each [target project](#targets) for the multi-cluster application. The namespace is named as `<MULTI-CLUSTER_APPLICATION_NAME>-<PROJECT_ID>`.

5. Select a **Template Version**.

6. Complete the [multi-cluster applications specific configuration options](#multi-cluster-app-configuration-options) as well as the [application configuration options](#application-configuration-options).

7. Select the **Members** who can [interact with the multi-cluster application](#members).

8. Add any [custom application configuration answers](#overriding-application-configuration-options-for-specific-projects) that would change the configuration for specific project(s) from the default application configuration answers.

7. Review the files in the **Preview** section. When you're satisfied, click **Launch**.

**Result**: Your application is deployed to your chosen namespace. You can view the application status from the project's:

# Multi-cluster App Configuration Options

Rancher has divided the configuration option for the multi-cluster application into several sections.

### Targets

In the **Targets** section, select the projects that you want the application to be deployed in. The list of projects is based on what projects you have access to. For each project that you select, it will be added to the list, which shows the cluster name and project name that were selected. To remove a target project, click on **-**.

### Upgrades

In the **Upgrades** section, select the upgrade strategy to use, when you decide to upgrade your application.

* **Rolling Update (batched):** When selecting this upgrade strategy, the number of applications upgraded at a time is based on the selected **Batch size** and the **Interval** specifies how many seconds to wait before starting the next batch of updates.

* **Upgrade all apps simultaneously:** When selecting this upgrade strategy, all applications across all projects will be upgraded at the same time.

### Roles

In the **Roles** section, you define the role of the multi-cluster application. Typically, when a user [launches catalog applications]({{<baseurl>}}/rancher/v2.5/en/catalog/launching-apps), that specific user's permissions are used for creation of all workloads/resources that is required by the app.

For multi-cluster applications, the application is deployed by a _system user_ and is assigned as the creator of all underlying resources. A _system user_ is used instead of the actual user due to the fact that the actual user could be removed from one of the target projects. If the actual user was removed from one of the projects, then that user would no longer be able to manage the application for the other projects.

Rancher will let you select from two options for Roles, **Project** and **Cluster**. Rancher will allow creation using any of these roles based on the user's permissions.

- **Project** - This is the equivalent of a [project member]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#project-roles). If you select this role, Rancher will check that in all the target projects, the user has minimally the [project member]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#project-roles) role. While the user might not be explicitly granted the _project member_ role, if the user is an [administrator]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/global-permissions/), a [cluster owner]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), or a [project owner]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#project-roles), then the user is considered to have the appropriate level of permissions.

- **Cluster** - This is the equivalent of a [cluster owner]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#cluster-roles). If you select this role, Rancher will check that in all the target projects, the user has minimally the [cluster owner]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#project-roles) role. While the user might not be explicitly granted the _cluster owner_ role, if the user is an [administrator]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/global-permissions/), then the user is considered to have the appropriate level of permissions.

When launching the application, Rancher will confirm if you have these permissions in the target projects before launching the application.

> **Note:** There are some applications like _Grafana_ or _Datadog_ that require access to specific cluster-scoped resources. These applications will require the _Cluster_ role. If you find out later that the application requires cluster roles, the multi-cluster application can be upgraded to update the roles.

# Application Configuration Options

For each Helm chart, there are a list of desired answers that must be entered in order to successfully deploy the chart. When entering answers, you must format them using the syntax rules found in [Using Helm: The format and limitations of –set](https://helm.sh/docs/intro/using_helm/#the-format-and-limitations-of---set), as Rancher passes them as `--set` flags to Helm.

> For example, when entering an answer that includes two values separated by a comma (i.e. `abc, bcd`), it is required to wrap the values with double quotes (i.e., ``"abc, bcd"``).

### Using a questions.yml file

If the Helm chart that you are deploying contains a `questions.yml` file, Rancher's UI will translate this file to display an easy to use UI to collect the answers for the questions.

### Key Value Pairs for Native Helm Charts

For native Helm charts (i.e., charts from the **Helm Stable** or **Helm Incubator** catalogs or a custom Helm chart repository, answers are provided as key value pairs in the **Answers** section. These answers are used to override the default values.

### Members

By default, multi-cluster applications can only be managed by the user who created it. In the **Members** section, other users can be added so that they can also help manage or view the multi-cluster application.

1. Find the user that you want to add by typing in the member's name in the **Member** search box.

2. Select the **Access Type** for that member. There are three access types for a multi-cluster project, but due to how the permissions of a multi-cluster application are launched, please read carefully to understand what these access types mean.

    - **Owner**: This access type can manage any configuration part of the multi-cluster application including the template version, the [multi-cluster applications specific configuration options](#Multi-cluster App Configuration Options), the [application specific configuration options](#application-configuration-options), the members who can interact with the multi-cluster application and the [custom application configuration answers](#overriding-application-configuration-options-for-specific-projects). Since a multi-cluster application is created with a different set of permissions from the user, any _owner_ of the multi-cluster application can manage/remove applications in [target projects](#targets) without explicitly having access to these project(s). Only trusted users should be provided with this access type.

    - **Member**: This access type can only modify the template version, the [application specific configuration options](#application-configuration-options) and the [custom application configuration answers](#overriding-application-configuration-options-for-specific-projects). Since a multi-cluster application is created with a different set of permissions from the user, any _member_ of the multi-cluster application can modify the application without explicitly having access to these project(s). Only trusted users should be provided with this access type.

    - **Read-only**: This access type cannot modify any configuration option for the multi-cluster application. Users can only view these applications.

    > **Note:**  Please ensure only trusted users are given _Owner_ or _Member_ access as they will automatically be able to manage applications created for this multi-cluster application in target projects they might not have direct access to.

### Overriding Application Configuration Options for Specific Projects

The ability to use the same configuration to deploy the same application across multiple clusters/projects is one of the main benefits of multi-cluster applications. There might be a specific project that requires a slightly different configuration option, but you want to manage that application with all the other matching applications. Instead of creating a brand new application, you can override specific [application specific configuration options](#application-configuration-options) for specific projects.

1. In the **Answer Overrides** section, click **Add Override**.

2. For each override, you can select the following:

	- **Scope**: Select which target projects you want to override the answer in the configuration option.

	- **Question**: Select which question you want to override.

	- **Answer**: Enter the answer that you want to be used instead.

# Upgrading Multi-Cluster App Roles and Projects

- **Changing Roles on an existing Multi-Cluster app**
The creator and any users added with the access-type "owner" to a multi-cluster app, can upgrade its Roles. When adding a new Role, we check if the user has that exact role in all current target projects. These checks allow the same relaxations for global admins, cluster owners and project-owners as described in the installation section for the field `Roles`.

- **Adding/Removing target projects**
1. The creator and any users added with access-type "owner" to a multi-cluster app, can add or remove its target projects. When adding a new project, we check if the caller of this request has all Roles defined on multi-cluster app, in the new projects they want to add. The roles checks are again relaxed for global admins, cluster-owners and project-owners.
2. We do not do these membership checks when removing target projects. This is because the caller's permissions could have with respect to the target project, or the project could have been deleted and hence the caller wants to remove it from targets list.


# Multi-Cluster Application Management

One of the benefits of using a multi-cluster application as opposed to multiple individual applications of the same type, is the ease of management. Multi-cluster applications can be cloned, upgraded or rolled back.

1. From the **Global** view, choose **Apps** in the navigation bar.

2. Choose the multi-cluster application you want to take one of these actions on and click the **&#8942;**. Select one of the following options:

   * **Clone**: Creates another multi-cluster application with the same configuration. By using this option, you can easily duplicate a multi-cluster application.
   * **Upgrade**: Upgrade your multi-cluster application to change some part of the configuration. When performing an upgrade for multi-cluster application, the [upgrade strategy](#upgrades) can be modified if you have the correct [access type](#members).
   * **Rollback**: Rollback your application to a specific version. If after an upgrade, there are issues for your multi-cluster application for one or more of your [targets](#targets), Rancher has stored up to 10 versions of the multi-cluster application. Rolling back a multi-cluster application reverts the application for **all** target clusters and projects, not just the targets(s) affected by the upgrade issue.

# Deleting a Multi-Cluster Application

1. From the **Global** view, choose **Apps** in the navigation bar.

2. Choose the multi-cluster application you want to delete and click the **&#8942; > Delete**. When deleting the multi-cluster application, all applications and namespaces are deleted in all of the target projects.

   > **Note:** The applications in the target projects, that are created for a multi-cluster application, cannot be deleted individually. The applications can only be deleted when the multi-cluster application is deleted.
