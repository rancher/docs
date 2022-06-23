---
title: Pipelines
weight: 11
aliases:
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines  
---

Rancher's pipeline provides a simple CI/CD experience. Use it to automatically checkout code, run builds or scripts, publish Docker images or catalog applications, and deploy the updated software to users.

Setting up a pipeline can help developers deliver new software as quickly and efficiently as possible. Using Rancher, you can integrate with a GitHub repository to setup a continuous integration (CI) pipeline.

After configuring Rancher and GitHub, you can deploy containers running Jenkins to automate a pipeline execution:

- Build your application from code to image.
- Validate your builds.
- Deploy your build images to your cluster.
- Run unit tests.  
- Run regression tests.

>**Notes:**
>
>- Pipelines improved in Rancher v2.1. Therefore, if you configured pipelines while using v2.0.x, you'll have to reconfigure them after upgrading to v2.1.
>- Still using v2.0.x? See the pipeline documentation for [previous versions]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/docs-for-v2.0.x).
>- Rancher's pipeline provides a simple CI/CD experience, but it does not offer the full power and flexibility of and is not a replacement of enterprise-grade Jenkins or other CI tools your team uses.

This section covers the following topics:

- [Concepts](#concepts)
- [How Pipelines Work](#how-pipelines-work)
- [Roles-based Access Control for Pipelines](#roles-based-access-control-for-pipelines)
- [Setting up Pipelines](#setting-up-pipelines)
  - [Configure version control providers](#1-configure-version-control-providers)
  - [Configure repositories](#2-configure-repositories)
  - [Configure the pipeline](#3-configure-the-pipeline)
- [Pipeline Configuration Reference](#pipeline-configuration-reference)
- [Running your Pipelines](#running-your-pipelines)
- [Triggering a Pipeline](#triggering-a-pipeline)
  - [Modifying the Event Triggers for the Repository](#modifying-the-event-triggers-for-the-repository)

# Concepts

For an explanation of concepts and terminology used in this section, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/concepts)

# How Pipelines Work

After enabling the ability to use pipelines in a project, you can configure multiple pipelines in each project. Each pipeline is unique and can be configured independently.

A pipeline is configured off of a group of files that are checked into source code repositories. Users can configure their pipelines either through the Rancher UI or by adding a `.rancher-pipeline.yml` into the repository.

Before pipelines can be configured, you will need to configure authentication to your version control provider, e.g. GitHub, GitLab, Bitbucket. If you haven't configured a version control provider, you can always use [Rancher's example repositories]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/example-repos/) to view some common pipeline deployments.

When you configure a pipeline in one of your projects, a namespace specifically for the pipeline is automatically created. The following components are deployed to it:

  - **Jenkins:**

    The pipeline's build engine. Because project users do not directly interact with Jenkins, it's managed and locked.

    >**Note:**  There is no option to use existing Jenkins deployments as the pipeline engine.

  - **Docker Registry:**

    Out-of-the-box, the default target for your build-publish step is an internal Docker Registry. However, you can make configurations to push to a remote registry instead. The internal Docker Registry is only accessible from cluster nodes and cannot be directly accessed by users. Images are not persisted beyond the lifetime of the pipeline and should only be used in pipeline runs. If you need to access your images outside of pipeline runs, please push to an external registry.

  - **Minio:**

    Minio storage is used to store the logs for pipeline executions.

  >**Note:** The managed Jenkins instance works statelessly, so don't worry about its data persistency. The Docker Registry and Minio instances use ephemeral volumes by default, which is fine for most use cases. If you want to make sure pipeline logs can survive node failures, you can configure persistent volumes for them, as described in [data persistency for pipeline components]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/storage).

# Roles-based Access Control for Pipelines

If you can access a project, you can enable repositories to start building pipelines.

Only [administrators]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/), [cluster owners or members]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), or [project owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles) can configure version control providers and manage global pipeline execution settings.

Project members can only configure repositories and pipelines.

# Setting up Pipelines

To set up pipelines, you will need to do the following:

1. [Configure version control providers](#1-configure-version-control-providers)
2. [Configure repositories](#2-configure-repositories)
3. [Configure the pipeline](#3-configure-the-pipeline)

### 1. Configure Version Control Providers

Before you can start configuring a pipeline for your repository, you must configure and authorize a version control provider.

| Provider  | Available as of  |
| --- | --- |
| GitHub  | v2.0.0           |
| GitLab | v2.1.0 |
| Bitbucket | v2.2.0 |

Select your provider's tab below and follow the directions.

{{% tabs %}}
{{% tab "GitHub" %}}
1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar. In versions before v2.2.0, you can select **Resources > Pipelines**.

1. Follow the directions displayed to **Setup a Github application**. Rancher redirects you to Github to setup an OAuth App in Github.

1. From GitHub, copy the **Client ID** and **Client Secret**. Paste them into Rancher.

1. If you're using GitHub for enterprise, select **Use a private github enterprise installation**. Enter the host address of your GitHub installation.

1. Click **Authenticate**.

{{% /tab %}}
{{% tab "GitLab" %}}

_Available as of v2.1.0_

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar. In versions before v2.2.0, you can select **Resources > Pipelines**.

1. Follow the directions displayed to **Setup a GitLab application**. Rancher redirects you to GitLab.

1. From GitLab, copy the **Application ID** and **Secret**. Paste them into Rancher.

1. If you're using GitLab for enterprise setup, select **Use a private gitlab enterprise installation**. Enter the host address of your GitLab installation.

1. Click **Authenticate**.

>**Note:**
> 1. Pipeline uses Gitlab [v4 API](https://docs.gitlab.com/ee/api/v3_to_v4.html) and the supported Gitlab version is 9.0+.  
> 2. If you use GitLab 10.7+ and your Rancher setup is in a local network, enable the **Allow requests to the local network from hooks and services** option in GitLab admin settings.
{{% /tab %}}
{{% tab "Bitbucket Cloud" %}}

_Available as of v2.2.0_

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar.

1. Choose the **Use public Bitbucket Cloud** option.

1. Follow the directions displayed to **Setup a Bitbucket Cloud application**. Rancher redirects you to Bitbucket to setup an OAuth consumer in Bitbucket.

1. From Bitbucket, copy the consumer **Key** and **Secret**. Paste them into Rancher.

1. Click **Authenticate**.

{{% /tab %}}
{{% tab "Bitbucket Server" %}}

_Available as of v2.2.0_

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Select **Tools > Pipelines** in the navigation bar.

1. Choose the **Use private Bitbucket Server setup** option.

1. Follow the directions displayed to **Setup a Bitbucket Server application**.

1. Enter the host address of your Bitbucket server installation.

1. Click **Authenticate**.

>**Note:**
> Bitbucket server needs to do SSL verification when sending webhooks to Rancher. Please ensure that Rancher server's certificate is trusted by the Bitbucket server. There are two options:
>
> 1. Setup Rancher server with a certificate from a trusted CA.
> 1. If you're using self-signed certificates, import Rancher server's certificate to the Bitbucket server. For instructions, see the Bitbucket server documentation for [configuring self-signed certificates](https://confluence.atlassian.com/bitbucketserver/if-you-use-self-signed-certificates-938028692.html).
>
{{% /tab %}}
{{% /tabs %}}

**Result:** After the version control provider is authenticated, you will be automatically re-directed to start configuring which repositories you want start using with a pipeline.

### 2. Configure Repositories

After the version control provider is authorized, you are automatically re-directed to start configuring which repositories that you want start using pipelines with. Even if someone else has set up the version control provider, you will see their repositories and can build a pipeline.

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Click **Resources > Pipelines.** In versions before v2.3.0, click **Workloads > Pipelines.**

1. Click on **Configure Repositories**.

1. A list of repositories are displayed. If you are configuring repositories the first time, click on **Authorize & Fetch Your Own Repositories** to fetch your repository list.

1. For each repository that you want to set up a pipeline, click on **Enable**.

1. When you're done enabling all your repositories, click on **Done**.

**Results:** You have a list of repositories that you can start configuring pipelines for.

### 3. Configure the Pipeline

Now that repositories are added to your project, you can start configuring the pipeline by adding automated stages and steps. For your convenience, there are multiple built-in step types for dedicated tasks.

1. From the **Global** view, navigate to the project that you want to configure pipelines.

1. Click **Resources > Pipelines.** In versions before v2.3.0, click **Workloads > Pipelines.**

1. Find the repository that you want to set up a pipeline for.

1. Configure the pipeline through the UI or using a yaml file in the repository, i.e. `.rancher-pipeline.yml` or `.rancher-pipeline.yaml`. Pipeline configuration is split into stages and steps. Stages must fully complete before moving onto the next stage, but steps in a stage run concurrently. For each stage, you can add different step types. Note: As you build out each step, there are different advanced options based on the step type. Advanced options include trigger rules, environment variables, and secrets. For more information on configuring the pipeline through the UI or the YAML file, refer to the [pipeline configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/config)

   * If you are going to use the UI, select the vertical **&#8942; > Edit Config** to configure the pipeline using the UI. After the pipeline is configured, you must view the YAML file and push it to the repository.
   * If you are going to use the YAML file, select the vertical **&#8942; > View/Edit YAML** to configure the pipeline. If you choose to use a YAML file, you need to push it to the repository after any changes in order for it to be updated in the repository. When editing the pipeline configuration, it takes a few moments for Rancher to check for an existing pipeline configuration.

1. Select which `branch` to use from the list of branches.

1. _Available as of v2.2.0_ Optional: Set up notifications.

1. Set up the trigger rules for the pipeline.

1. Enter a **Timeout** for the pipeline. 

1. When all the stages and steps are configured, click **Done**.

**Results:** Your pipeline is now configured and ready to be run.


# Pipeline Configuration Reference

Refer to [this page]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/config) for details on how to configure a pipeline to:

- Run a script
- Build and publish images
- Publish catalog templates
- Deploy YAML
- Deploy a catalog app

The configuration reference also covers how to configure:

- Notifications
- Timeouts
- The rules that trigger a pipeline
- Environment variables
- Secrets


# Running your Pipelines

Run your pipeline for the first time. From the project view in Rancher, go to **Resources > Pipelines.** (In versions before v2.3.0, go to the **Pipelines** tab.) Find your pipeline and select the vertical **&#8942; > Run**.

During this initial run, your pipeline is tested, and the following pipeline components are deployed to your project as workloads in a new namespace dedicated to the pipeline:

- `docker-registry`
- `jenkins`
- `minio`

This process takes several minutes. When it completes, you can view each pipeline component from the project **Workloads** tab.

# Triggering a Pipeline

When a repository is enabled, a webhook is automatically set in the version control provider. By default, the pipeline is triggered by a **push** event to a repository, but you can modify the event(s) that trigger running the pipeline.

Available Events:

* **Push**: Whenever a commit is pushed to the branch in the repository, the pipeline is triggered.
* **Pull Request**: Whenever a pull request is made to the repository, the pipeline is triggered.
* **Tag**: When a tag is created in the repository, the pipeline is triggered.

> **Note:** This option doesn't exist for Rancher's [example repositories]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines/example-repos/).

### Modifying the Event Triggers for the Repository

1. From the **Global** view, navigate to the project that you want to modify the event trigger for the pipeline.

1. 1. Click **Resources > Pipelines.** In versions before v2.3.0, click **Workloads > Pipelines.**

1. Find the repository that you want to modify the event triggers. Select the vertical **&#8942; > Setting**.

1. Select which event triggers (**Push**, **Pull Request** or **Tag**) you want for the repository.

1. Click **Save**.
