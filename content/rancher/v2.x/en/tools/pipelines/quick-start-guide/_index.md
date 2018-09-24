---
title: Pipelines Quick Start Guide
weight: 500
---

Rancher ships with several example repositories that help you setup a pipeline quickly and easily. Before you use pipelines with your own repositories in a production environment, we recommend setting up the example repository that most resembles your environment. Use this example repository as a sandbox for repo configuration, build demonstration, etc. Rancher includes example repositories for:

- Go
- Maven
- php

## Configure Repositories

By default, the example pipeline repositories are disabled. Go enable one (or) more to test out the pipeline feature.

1. From the context menu, open the project for which you want to run a pipeline.

1. From the main menu, select **Workloads**. The select the **Pipelines** tab.

1. Click **Configure Repositories**.

    **Step Result:** A list of example repositories displays.
    
    >**Note:** Example repositories only display if you haven't fetched your own repositories.

1. Click **Enable** for one of the example repos (e.g., `https://github.com/rancher/pipeline-example-go.git`). Then click **Done**.

**Result:** A pipeline is configured for the example repository, and it's added to the **Pipeline** tab.

## Run Example Pipelines

1. Assuming you've enabled an example repository, go to pipelines Nav bar of the project.

1. Expand the action button of the enabled repository.

1. Click Run.
    
    >**Note:** When you are running a pipeline the first time, it will take a few minutes to pull relevant images and provision necessary pipeline components.
    To understand what the example pipeline is doing, you can check the `.rancher-pipeline.yml` file in the example repositories, or click `Edit Config` action of the enabled repository to see it via UI wizard.
<<<<<<< HEAD
=======

For detail guides for pipeline configurations, please refer to the [configuration page](/rancher/v2.x/en/tools/pipelines/quick-start-guide/)

>>>>>>> ab68fa0e... updating configure repos
