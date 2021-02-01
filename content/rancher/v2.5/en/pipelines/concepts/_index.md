---
title: Concepts
weight: 1
aliases:
  - /rancher/v2.5/en/k8s-in-rancher/pipelines/concepts
---

The purpose of this page is to explain common concepts and terminology related to pipelines.

- **Pipeline:**

    A _pipeline_ is a software delivery process that is broken into different stages and steps. Setting up a pipeline can help developers deliver new software as quickly and efficiently as possible. Within Rancher, you can configure pipelines for each of your Rancher projects. A pipeline is based on a specific repository. It defines the process to build, test, and deploy your code. Rancher uses the [pipeline as code](https://jenkins.io/doc/book/pipeline-as-code/) model. Pipeline configuration is represented as a pipeline file in the source code repository, using the file name `.rancher-pipeline.yml` or `.rancher-pipeline.yaml`.

- **Stages:**

    A pipeline stage consists of multiple steps. Stages are executed in the order defined in the pipeline file. The steps in a stage are executed concurrently. A stage starts when all steps in the former stage finish without failure.

- **Steps:**

    A pipeline step is executed inside a specified stage. A step fails if it exits with a code other than `0`. If a step exits with this failure code, the entire pipeline fails and terminates.

- **Workspace:**

    The workspace is the working directory shared by all pipeline steps. In the beginning of a pipeline, source code is checked out to the workspace. The command for every step bootstraps in the workspace. During a pipeline execution, the artifacts from a previous step will be available in future steps. The working directory is an ephemeral volume and will be cleaned out with the executor pod when a pipeline execution is finished.

Typically, pipeline stages include:

- **Build:**

    Each time code is checked into your repository, the pipeline automatically clones the repo and builds a new iteration of your software. Throughout this process, the software is typically reviewed by automated tests.

- **Publish:**

    After the build is completed, either a Docker image is built and published to a Docker registry or a catalog template is published.

- **Deploy:**

    After the artifacts are published, you would release your application so users could start using the updated product.
