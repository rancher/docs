---
title: Quick Start Guide
weight: 1000
---

## Configure Repositories

1. Go to the project you want to run a pipeline.

2. Select workloads from the top level Nav bar.

3. Select pipelines from the secondary Nav bar.

4. Click Configure Repositories button. If you haven't done authorization with your git account, you will see a list of example repositories. Otherwise, you will see a list of your repositories.

5. Click the `Enable` button of an example repo, e.g., `https://github.com/rancher/pipeline-example-go.git`.

6. Click Done, you can see the repo under pipelines Nav bar. 

## Run Example Pipelines

1. Assuming you've enabled an example repository, go to pipelines Nav bar of the project.

2. Expand the action button of the enabled repository.

3. Click Run.
    
    >**Note:** When you are running a pipeline the first time, it will take a few minutes to pull relevant images and provision necessary pipeline components.
    To understand what the example pipeline is doing, you can check the `.rancher-pipeline.yml` file in the example repositories, or click `Edit Config` action of the enabled repository to see it via UI wizard.
