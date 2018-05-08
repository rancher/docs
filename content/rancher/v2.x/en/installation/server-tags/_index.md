---
title: Server Tags
weight: 200
---

# Rancher Server Tags

{{< product >}} Server is distributed as Docker image, tags are used to identify what version is included in the image. We also have additional tags that will point to a specific version. Keep in mind that if you use the additional tags, you will need to explicitely pull a new version of that image tag otherwise it will use the cached image on the host.

The images can be found on [DockerHub](https://hub.docker.com/r/rancher/rancher/tags/).

-	`rancher/rancher:latest`: Our latest development builds. These builds are validated through our CI automation framework. These releases aren't for production environments.

<!-- -	`rancher/rancher:stable`: Our latest stable release builds. This tag is recommended for production. -->

Please don't use the `master` tag or any release with a `rc{n}` suffix. These builds are meant for the {{< product >}} team to test out builds.
