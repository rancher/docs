---
title: Server Tags
weight: 200
---

# Rancher Server Tags

{{< product >}} Server is distributed as Docker image, tags are used to identify what version is included in the image. We also have additional tags that will point to a specific version. Keep in mind that if you use the additional tags, you will need to explicitely pull a new version of that image tag otherwise it will use the cached image on the host.

The images can be found on [DockerHub](https://hub.docker.com/r/rancher/rancher/tags/).

-	`rancher/rancher:latest`: Our latest development release. These builds are validated through our CI automation framework. These releases are not recommended for production environments.

<!-- -	`rancher/rancher:stable`: Our newest stable release. This tag is recommended for production. -->

Any tag with a `-rc` or other suffix is meant for the {{< product >}} testing team to validate.  You should not use these tags, and upgrading from or to a `rc` build is not supported.
