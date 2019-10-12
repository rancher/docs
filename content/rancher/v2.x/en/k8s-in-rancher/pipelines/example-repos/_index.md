---
title: Example Repositories
weight: 500
aliases:
  - /rancher/v2.x/en/tools/pipelines/quick-start-guide/
---

Rancher ships with several example repositories that you can use to familiarize yourself with pipelines.  We recommend configuring and testing the example repository that most resembles your environment before using pipelines with your own repositories in a production environment. Use this example repository as a sandbox for repo configuration, build demonstration, etc. Rancher includes example repositories for:

- Go
- Maven
- php

> **Note**: The example repositories are only available if you have not [configured a version control provider]({{< baseurl >}}/rancher/v2.x/en/project-admin/tools/pipelines).

## Configure Repositories

By default, the example pipeline repositories are disabled. Enable one (or more) to test out the pipeline feature and see how it works.

1. From the **Global** view, navigate to the project that you want to test out pipelines.

1. Click **Resources > Pipelines.** In versions prior to v2.3.0, click **Workloads > Pipelines.**

1. Click **Configure Repositories**.

    **Step Result:** A list of example repositories displays.

    >**Note:** Example repositories only display if you haven't fetched your own repos.

1. Click **Enable** for one of the example repos (e.g., `https://github.com/rancher/pipeline-example-go.git`). Then click **Done**.

**Results:**

- The example repository is enabled to work with a pipeline is available in the **Pipeline** tab.

- The following workloads are deployed to a new namespace:

    - `docker-registry`
    - `jenkins`
    - `minio`

## View the Example Pipeline

After enabling an example repository, review the pipeline to see how it is set up.

1. From the **Global** view, navigate to the project that you want to test out pipelines.

1. Click **Resources > Pipelines.** In versions prior to v2.3.0, click **Workloads > Pipelines.**

1. Find the example repository, select the vertical **Ellipsis (...)**. There are two ways to view the pipeline:
  * **Rancher UI**: Click on **Edit Config** to view the stages and steps of the pipeline.
  * **YAML**: Click on View/Edit YAML to view the `./rancher-pipeline.yml` file.

## Run the Example Pipeline

After enabling an example repository, run the pipeline to see how it works.

1. From the **Global** view, navigate to the project that you want to test out pipelines.

1. Click **Resources > Pipelines.** In versions prior to v2.3.0, click **Workloads > Pipelines.**

1. Find the example repository, select the vertical **Ellipsis (...) > Run**.

    >**Note:** When you run a pipeline the first time, it takes a few minutes to pull relevant images and provision necessary pipeline components.

**Result:** The pipeline runs. You can see the results in the logs.

## What's Next?

For detailed information about setting up your own pipeline for your repository, [configure a version control provider]({{< baseurl >}}/rancher/v2.x/en/project-admin/tools/pipelines), [enable a repository](#configure-repositories) and finally [configure your pipeline]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/pipelines/#pipeline-configuration).
