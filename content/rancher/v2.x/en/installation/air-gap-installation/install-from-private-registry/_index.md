---
title: Installing From a Private Registry
weight: 350
draft: true
---
# Installing From a Private Registry

If you have a private registry, you can move Rancher into that registry and install it from there.

>**Prerequisite:** It is assumed you either have your own private registry or other means of distributing docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation for private registries](https://docs.docker.com/registry/).


1. Browse to https://github.com/rancher/rancher/releases/tag/v2.0.0 and download all files in the release.

2. Run rancher-save-images.sh in an environment that has access to dockerhub. This script will download all images into a file rancher-images.tar.gz.

3. Copy file to private network (it's a big file).

4. Run rancher-load-images.sh in the same directory as rancher-images.tar.gz to load the archive into private registry.

5. Change /v3/settings/system-default-registry to your private registry. The setting will be added to the UI, not currently there though.
