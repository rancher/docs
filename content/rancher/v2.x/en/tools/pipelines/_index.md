---
title:  Pipelines
weight: 5005
aliases:
  - /rancher/v2.x/en/concepts/ci-cd-pipelines/
  - /rancher/v2.x/en/tasks/pipelines/
---
>**Notes:** 
>
>- Pipelines are new and improved for Rancher v2.1! Therefore, if you configured pipelines while using v2.0.x, you'll have to reconfigure them after upgrading to v2.1.
>- Still using v2.0.x? See the pipeline documentation for [previous versions](/rancher/v2.x/en/tools/pipelines/docs-for-v2.0.x).

A _pipeline_ is a software delivery process that is broken into different stages, allowing developers to deliver new software as quickly and efficiently as possible. Within Rancher, you can configure a pipeline for each of your Rancher projects.

The pipeline stages are:

- **Build:** 

    Each time code is checked into your repository, the pipeline automatically clones the repo and builds a new iteration of your software. Throughout this process, the software is typically reviewed by automated tests.

- **Publish:**

    After each build is completed, it's automatically published to a Docker registry, where it can be pulled for manual testing. 

- **Deploy:**

    A natural extension of the publish stage, the deploy stage lets you release your software to customers with the click of a button.


## Overview

Rancher Pipeline provides a simple CI/CD experience. Use it to automatically checkout code, run builds, perform tests, publish docker images, and deploy Kubernetes resources to your clusters.

You can configure a pipeline for each project in Rancher. Every project can have individual configurations and setups.

Pipelines are represented as pipeline files that are checked into source code repositories. Users can read and edit the pipeline configuration by either:

- Using the Rancher UI.
- Updating the configuration in the repository, using tools like Git CLI to trigger a build with the latest CI definition.

>**Note:** Rancher Pipeline not a replacement for enterprise-grade Jenkins or any other CI tool your team uses.

## Supported Version Control Platforms

Rancher pipelines currently supports GitHub and GitLab (available as of Rancher v2.0.1).

>**Note:** Additions to pipelines are scoped for future releases of Rancher, such as:
>
>- Additional version control systems
>- Deployment of Kubernetes YAML
>- Catalog deployment
  

## How Pipelines Work

When you configure a pipeline in one of your projects, a namespace specifically for the pipeline is automatically created. The following components are deployed to it: 

  - **Jenkins:** 

    The pipeline's build engine. Because project users likely won't interact with Jenkins, it's managed and locked.

    >**Note:**  There is no option to reuse existing Jenkins deployments as the pipeline engine.
    
    <a id="reg"></a>

  - **Docker Registry:** 

    Out-of-the-box, the default target for your builds is an internal Docker Registry. However, you can make configurations to push to a remote registry instead. Docker Registry is only accessible from cluster nodes and cannot be directly accessed by users.

    <a id="minio"></a>

  - **Minio:** 

    Minio storage is used to store the logs for pipeline executions.

  >**Note:** The managed Jenkins instance works statelessly, so don't worry about its data persistency. The Docker Registry and Minio instances use ephemeral volumes by default, but we recommend that you configure persistent volumes for them, as described in [data persistency for pipeline components](/rancher/v2.x/en/tools/pipelines/configurations/#data-persistency-for-pipeline-components).


## Pipeline Triggers

After you configure a pipeline, you can trigger it using different methods:


- **Manually:**

    After you configure a pipeline, you can trigger a build using the latest CI definition from either Rancher UI or Git CLI.  When a pipeline execution is triggered, Rancher dynamically provisions a Kubernetes pod to run your CI tasks and then remove it upon completion.

- **Automatically:**

    When you enable a repository for a pipeline, webhooks are automatically added to the version control system. When project users interact with the repo—push code, open pull requests, or create a tag—the version control system sends a webhook to Rancher Server, triggering a pipeline execution. 

    To use this automation, webhook management permission is required for the repo. Therefore, when users authenticate and fetch their repositories, only those on which they have admin permission will be shown.
