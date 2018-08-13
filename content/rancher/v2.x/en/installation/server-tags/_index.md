---
title: Server Tags
weight: 2000
---
{{< product >}} Server is distributed as a Docker image, which have _tags_ attached to them. Tags are used to identify what version is included in the image. Rancher includes additional tags that point to a specific version. Remember that if you use the additional tags, you must explicitly pull a new version of that image tag. Otherwise it will use the cached image on the host.

You can find Rancher images at [DockerHub](https://hub.docker.com/r/rancher/rancher/tags/).

-	`rancher/rancher:latest`: Our latest development release. These builds are validated through our CI automation framework. These releases are not recommended for production environments.

-	`rancher/rancher:stable`: Our newest stable release. This tag is recommended for production.

The `master` tag or any tag with a `-rc` or another suffix is meant for the {{< product >}} testing team to validate.  You should not use these tags, as these builds are not officially supported.
