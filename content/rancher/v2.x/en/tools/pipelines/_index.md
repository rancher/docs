---
title:  Pipelines
weight: 5005
aliases:
  - /rancher/v2.x/en/concepts/ci-cd-pipelines/
  - /rancher/v2.x/en/tasks/pipelines/
---

## Overview

Rancher Pipeline is designed to provide a simple CI/CD experience, but it is not meant to replace enterprise-grade Jenkins or any other CI tool your team is using. With pipeline you can automatically checkout code, do build, test, publish docker images and deploy Kubernetes resources to your clusters.

Pipeline is scoped per project. Every project can have individual configurations and setup.

Pipelines are represented as pipeline files that are checked into source code repositories. Users can read and edit the pipeline configuration from Rancher UI, or update the configuration in the repository using tools like git cli to trigger a build with the latest CI definition.

Currently, Integrations with GitHub and GitLab are supported, and more options for version control system is coming; Deploying Kubernetes yaml file is supported, and catalog deployment will be added in future release.

## How it works

Pipeline deploys multiple components on demand, i.e. when the first pipeline execution is triggered. 
It consists of the following components:

  - Jenkins engine: It is managed and locked. Users are not expected to interact with it directly and it is not an option to reuse existing Jenkins to be the pipeline engine.
  - Internal docker registry: It is the default, out-of-the-box target, but users can choose to push to their remote registry. The internal docker registry is only accessible from cluster nodes and is not accessible directly by users.
  - Minio storage: It is used to store the logs of pipeline executions.

  >**Note:** The managed Jenkins instance works statelessly so users need not to worry about its data persistency. The docker registry and the Minio use ephemeral volumes by default, and users are encouraged to configure persistent volumes for them, as described in [data persistency for pipeline components](/rancher/v2.x/en/tools/pipelines/configurations/#data-persistency-for-pipeline-components)

When a pipeline execution is triggered, Rancher dynamically provisions a Kubernetes pod to run your CI tasks, and remove it when it is finished.
Webhooks are automatically added to the version control system when a repository is enabled. When users push the code, open a pull request or create a tag, the version control system can send a webhook to Rancher server and trigger a pipeline execution. This requires webhook management permission of the repo, therefore when users auth and fetch their repositories only those on which they have admin permission will be shown.

>**Note:** There are refactoring changes in Pipeline in v2.1. Therefore users who upgrade from v2.0.x to v2.1 need to reconfigure the pipelines. For documentation of previous version, please refer to [docs for v2.0.x](/rancher/v2.x/en/tools/pipelines/docs-for-v2.0.x)