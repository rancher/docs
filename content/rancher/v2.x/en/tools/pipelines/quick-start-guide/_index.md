---
title: Pipelines Quick Start Guide
weight: 500
---

Rancher ships with several example repositories that you can use to familiarize yourself with pipelines.  We recommend configuring and testing the example repository that most resembles your environment before using pipelines with your own repositories in a production environment. Use this example repository as a sandbox for repo configuration, build demonstration, etc. Rancher includes example repositories for:

- Go
- Maven
- php

## 1—Configure Repositories

By default, the example pipeline repositories are disabled. Go enable one (or more) to test out the pipeline feature.

1. From the context menu, open the project for which you want to run a pipeline.

1. From the main menu, select **Workloads**. The select the **Pipelines** tab.

1. Click **Configure Repositories**.

    **Step Result:** A list of example repositories displays.
    
    >**Note:** Example repositories only display if you haven't fetched your own repos.

1. Click **Enable** for one of the example repos (e.g., `https://github.com/rancher/pipeline-example-go.git`). Then click **Done**.

**Results:** 

- A pipeline is configured for the example repository, and it's added to the **Pipeline** tab.
- The following workloads are deployed to a new namespace:

    - `docker-registry`
    - `jenkins`
    - `minio`

## 2—Run Example Pipelines

<<<<<<< HEAD
1. Click Run.
    
    >**Note:** When you are running a pipeline the first time, it will take a few minutes to pull relevant images and provision necessary pipeline components.
    To understand what the example pipeline is doing, you can check the `.rancher-pipeline.yml` file in the example repositories, or click `Edit Config` action of the enabled repository to see it via UI wizard.
<<<<<<< HEAD
=======
=======
After configuring an example repository, run the pipeline to see how it works.

1. From the **Pipelines** tab, select **Ellipsis (...) > Run**. 

    >**Note:** When you run a pipeline the first time, it takes a few minutes to pull relevant images and provision necessary pipeline components.
    To understand what the example pipeline is doing,  select `Ellipsis (...) >  Edit Config` for your repo. Alternatively, view the `.rancher-pipeline.yml` file in the example repositories.

**Result:** The pipeline runs.

## What's Next?

For detailed information about setting up a pipeline configuration in production, see the [Configuring Pipelines]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/configurations/).


