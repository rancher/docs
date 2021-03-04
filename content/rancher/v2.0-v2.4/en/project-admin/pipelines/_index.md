---
title:  Rancher's CI/CD Pipelines
description: Use Rancher’s CI/CD pipeline to automatically checkout code, run builds or scripts, publish Docker images, and deploy software to users
weight: 4000
aliases:
  - /rancher/v2.0-v2.4/en/concepts/ci-cd-pipelines/
  - /rancher/v2.0-v2.4/en/tasks/pipelines/
  - /rancher/v2.0-v2.4/en/tools/pipelines/configurations/
---
Using Rancher, you can integrate with a GitHub repository to setup a continuous integration (CI) pipeline.

After configuring Rancher and GitHub, you can deploy containers running Jenkins to automate a pipeline execution:

- Build your application from code to image.
- Validate your builds.
- Deploy your build images to your cluster.
- Run unit tests.  
- Run regression tests.

For details, refer to the [pipelines]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/pipelines) section.