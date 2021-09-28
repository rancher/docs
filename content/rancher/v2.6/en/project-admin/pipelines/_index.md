---
title:  Rancher's CI/CD Pipelines
description: Use Rancher’s CI/CD pipeline to automatically checkout code, run builds or scripts, publish Docker images, and deploy software to users
weight: 4000
---
Using Rancher, you can integrate with a GitHub repository to setup a continuous integration (CI) pipeline.

After configuring Rancher and GitHub, you can deploy containers running Jenkins to automate a pipeline execution:

- Build your application from code to image.
- Validate your builds.
- Deploy your build images to your cluster.
- Run unit tests.  
- Run regression tests.

For details, refer to the [pipelines]({{<baseurl>}}/rancher/v2.6/en/pipelines) section.