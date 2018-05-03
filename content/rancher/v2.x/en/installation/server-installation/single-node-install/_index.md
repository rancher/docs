---
title: Single Node Install
weight: 250
description: For development environments, we recommend installing Rancher by deploying a single Docker container.
---

# Single Node Rancher Server Install

For development environments, we recommend installing Rancher by deploying a single Docker container. In this installation scenario, you'll install Docker on a single Linux host, and then install Rancher on your host using a single Docker container.

## Provision Linux Host

Provision a single Linux host to use as a template to launch your {{< product >}} Server.

### Requirements

{{< requirements_os >}}

{{< requirements_hardware >}}

{{< requirements_software >}}

## Install Rancher

Installing Rancher on a Linux host using a single Docker container is simple. Simply connect to your host and run the command below.

1.	Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection.

2.	From your shell, enter the following command:

	```
	$ sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
	```

	>**Note:**
	>- `rancher/rancher` is hosted on [DockerHub](https://hub.docker.com/). If you don't have access to DockerHub, or you are installing Rancher without an internet connection, refer to [Installing From a Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-from-private-registry/).<br/><br/>
	>- For a list of other Rancher Server tags available, refer to [Rancher Server Tags]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/).

**Result:** Rancher is installed.
