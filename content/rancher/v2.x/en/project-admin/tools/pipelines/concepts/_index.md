---
title: Pipeline Terminology
weight: 1000
aliases:
  - /rancher/v2.x/en/tools/pipelines/concepts/
---

When setting up a pipeline, it's helpful to know a few related terms.

- **Pipeline:**

    A pipeline consists of stages and steps. It defines the process to build, test, and deploy your code. Rancher pipeline uses the [pipeline as code](https://jenkins.io/doc/book/pipeline-as-code/) model—pipeline configuration is represented as a pipeline file in the source code repository, using the file name `.rancher-pipeline.yml` or `.rancher-pipeline.yaml`.

- **Stages:**

    A pipeline stage consists of multiple steps. Stages are executed in the order defined in the pipeline file. The steps in a stage are executed concurrently. A stage starts when all steps in the former stage finish without failure.

- **Steps:**

    A pipeline step is executed inside a specified stage. A step fails if it exits with a code other than `0`. If a step exits with this failure code, the entire pipeline fails and terminates.

- **Workspace:**

    The workspace is the working directory shared by all pipeline steps. In the beginning of a pipeline, source code is checked out to the workspace. The command for every step bootstraps in the workspace. During a pipeline execution, the artifacts from a previous step will be available in future steps. The working directory is an ephemeral volume and will be cleaned out with the executor pod when a pipeline execution is finished.
