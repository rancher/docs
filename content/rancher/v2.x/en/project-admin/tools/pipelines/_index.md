---
title:  Pipelines
weight: 2529
aliases:
  - /rancher/v2.x/en/concepts/ci-cd-pipelines/
  - /rancher/v2.x/en/tasks/pipelines/
  - /rancher/v2.x/en/tools/pipelines/
---
>**Notes:**
>
>- Pipelines are new and improved for Rancher v2.1! Therefore, if you configured pipelines while using v2.0.x, you'll have to reconfigure them after upgrading to v2.1.
>- Still using v2.0.x? See the pipeline documentation for [previous versions]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/docs-for-v2.0.x).

A _pipeline_ is a software delivery process that is broken into different stages and steps. Setting up a pipeline can help developers deliver new software as quickly and efficiently as possible. Within Rancher, you can configure pipelines for each of your Rancher projects.

Typically, pipeline stages include:

- **Build:**

    Each time code is checked into your repository, the pipeline automatically clones the repo and builds a new iteration of your software. Throughout this process, the software is typically reviewed by automated tests.

- **Publish:**

    After the build is completed, either a Docker image is built and published to a Docker registry or a catalog template is published.

- **Deploy:**

    After the artifacts are published, you would release your application so users could start using the updated product.

## Overview

Rancher's pipeline provides a simple CI/CD experience. Use it to automatically checkout code, run builds or scripts, publish Docker images or catalog applications, and deploy the updated software to users.

After enabling the ability to use pipelines in a project, you can configure multiple pipelines in each project. Each pipeline is unique and can be configured independently.

A pipeline is conifgured off of a group of files that are checked into source code repositories. Users can configure their pipelines either through the Rancher UI or by adding a `.rancher-pipeline.yml` into the repository.

>**Note:** Rancher's pipeline
provides a simple CI/CD experience, but it does not offer the full power and flexibility of and is not a replacement of enterprise-grade Jenkins or other CI tools your team uses.

## Supported Version Control Platforms

Rancher pipelines currently supports a couple of different repositories.

| Platform  | Available as of  |
| --- | --- |
| GitHub  | v2.0.0           |
| GitLab | v2.1.0 |
| Bitbucket | v2.2.0 |

## How Pipelines Work

When you configure a pipeline in one of your projects, a namespace specifically for the pipeline is automatically created. The following components are deployed to it:

  - **Jenkins:**

    The pipeline's build engine. Because project users do not directly interact with Jenkins, it's managed and locked.

    >**Note:**  There is no option to use existing Jenkins deployments as the pipeline engine.

    <a id="reg"></a>

  - **Docker Registry:**

    Out-of-the-box, the default target for your build-publish step is an internal Docker Registry. However, you can make configurations to push to a remote registry instead. The internal Docker Registry is only accessible from cluster nodes and cannot be directly accessed by users. Images are not persisted beyond the lifetime of the pipeline and should only be used in pipeline runs. If you need to access your images outside of pipeline runs, please push to an external registry.

    <a id="minio"></a>

  - **Minio:**

    Minio storage is used to store the logs for pipeline executions.

  >**Note:** The managed Jenkins instance works statelessly, so don't worry about its data persistency. The Docker Registry and Minio instances use ephemeral volumes by default, which is fine for most use cases. If you want to make sure pipeline logs can survive node failures, you can configure persistent volumes for them, as described in [data persistency for pipeline components]({{< baseurl >}}/rancher/v2.x/en/tools/pipelines/configurations/#data-persistency-for-pipeline-components).

## Pipeline Triggers

After you configure a pipeline, you can trigger it using different methods:


- **Manually:**

    After you configure a pipeline, you can trigger a build using the latest CI definition from either Rancher UI or Git CLI.  When a pipeline execution is triggered, Rancher dynamically provisions a Kubernetes pod to run your CI tasks and then remove it upon completion.

- **Automatically:**

    When you enable a repository for a pipeline, webhooks are automatically added to the version control system. When project users interact with the repo—push code, open pull requests, or create a tag—the version control system sends a webhook to Rancher Server, triggering a pipeline execution.

    To use this automation, webhook management permission is required for the repo. Therefore, when users authenticate and fetch their repositories, only those on which they have admin permission will be shown.
