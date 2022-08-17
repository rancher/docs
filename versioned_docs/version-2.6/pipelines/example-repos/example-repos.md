---
title: Example Repositories
weight: 500
---

Rancher ships with several example repositories that you can use to familiarize yourself with pipelines. We recommend configuring and testing the example repository that most resembles your environment before using pipelines with your own repositories in a production environment. Use this example repository as a sandbox for repo configuration, build demonstration, etc. Rancher includes example repositories for:

- Go
- Maven
- php

> **Prerequisites:**
> 
> - The example repositories are only available if you have not [configured a version control provider]({{<baseurl>}}/rancher/v2.6/en/project-admin/pipelines).
> - Because the pipelines app was deprecated in favor of Fleet, you will need to turn on the feature flag for legacy features before using pipelines.
> - Note that pipelines in Kubernetes 1.21+ are no longer supported.
>
>   1. In the upper left corner, click **☰ > Global Settings**.
>   1. Click **Feature Flags**.
>   1. Go to the `legacy` feature flag and click **⋮ > Activate**.

To start using these example repositories,

1. [Enable the example repositories](#1-enable-the-example-repositories)
2. [View the example pipeline](#2-view-the-example-pipeline)
3. [Run the example pipeline](#3-run-the-example-pipeline)

### 1. Enable the Example Repositories

By default, the example pipeline repositories are disabled. Enable one (or more) to test out the pipeline feature and see how it works.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to configure pipelines and click **Explore**.
1. In the dropdown menu in the top navigation bar, select the project where you want to configure pipelines.
1. In the left navigation bar, click **Legacy > Project > Pipelines**.
1. In the **Pipelines** tab, click **Configure Repositories**.

    >**Note:** Example repositories only display if you haven't fetched your own repos.

1. Click **Enable** for one of the example repos (e.g., `https://github.com/rancher/pipeline-example-go.git`). Then click **Done**.

**Results:**

- The example repository is enabled to work with a pipeline is available in the **Pipeline** tab.

- The following workloads are deployed to a new namespace:

    - `docker-registry`
    - `jenkins`
    - `minio`

### 2. View the Example Pipeline

After enabling an example repository, review the pipeline to see how it is set up.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to configure pipelines and click **Explore**.
1. In the dropdown menu in the top navigation bar, select the project where you want to configure pipelines.
1. In the left navigation bar, click **Legacy > Project > Pipelines**.
1. In the **Pipelines** tab, click **Configure Repositories**.
1. Find the example repository, select **⋮ > Edit Config**. There are two ways to view the pipeline:
  * **Rancher UI**: Click on **Edit Config** or **View/Edit YAML** to view the stages and steps of the pipeline. The YAML view shows the `./rancher-pipeline.yml` file.

### 3. Run the Example Pipeline

After enabling an example repository, run the pipeline to see how it works.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to configure pipelines and click **Explore**.
1. In the dropdown menu in the top navigation bar, select the project where you want to configure pipelines.
1. In the left navigation bar, click **Legacy > Project > Pipelines**.
1. In the **Pipelines** tab, go to the pipeline and select the vertical **⋮ > Run**.

    >**Note:** When you run a pipeline the first time, it takes a few minutes to pull relevant images and provision necessary pipeline components.

**Result:** The pipeline runs. You can see the results in the logs.

### What's Next?

For detailed information about setting up your own pipeline for your repository, [configure a version control provider]({{<baseurl>}}/rancher/v2.6/en/project-admin/pipelines), enable a repository and finally configure your pipeline.
