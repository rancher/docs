---
title: Installing Docker
weight: 1
---

For Helm CLI installs, Docker is required to be installed on any node that runs the Rancher server.

There are a couple of options for installing Docker. One option is to refer to the [official Docker documentation](https://docs.docker.com/install/) about how to install Docker on Linux. The steps will vary based on the Linux distribution.

Another option is to use one of Rancher's Docker installation scripts, which are available for most recent versions of Docker.

For example, this command could be used to install Docker 19.03 on Ubuntu:

```
curl https://releases.rancher.com/install-docker/19.03.sh | sh
```

Rancher has installation scripts for every version of upstream Docker that Kubernetes supports. To find out whether a script is available for installing a certain Docker version, refer to this [GitHub repository,](https://github.com/rancher/install-docker) which contains all of Rancher's Docker installation scripts.
