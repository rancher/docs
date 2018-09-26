---
title: Concepts
weight: 500
---

## Pipelines

A pipeline consists of stages and steps. It defines the process to build, test and deploy your code. Rancher Pipeline uses the pipeline as source code model and pipeline configuration is represented as a pipeline file in the source code repository, using the file name `.rancher-pipeline.yml` or `.rancher-pipeline.yaml`.

## Stages

A pipeline stage consists of multiple steps. Stages are executed in the order defined in the pipeline file. The steps in a stage are executed concurrently. A stage starts when all steps in the former stage finish without failure.

## Steps

A pipeline step is executed inside a specified container. A step fails when its commands get non-zero exit code, and it will cause the stage and the entire pipeline to fail and terminate. 

## Workspace

The workspace is the working directory shared by all pipeline steps. In the begining of a pipeline, source code is checked out to the workspace. The commands of every step bootstraps in the workspace. During a pipeline execution, the artifacts from a previous step will be available in future steps. The working directory is an ephemeral volume and will be cleaned out with the executor pod when a pipeline execution is finished.