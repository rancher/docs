---
title: Single Node Installation
weight: 250
---

# Installing Rancher Using a Docker Container

## Provision Linux Host

Provision a single Linux host to use as a template to launch your {{< product >}}.

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
	>- `rancher/rancher` is hosted on DockerHub. If you don't have access to DockerHub, or you are installing Rancher without an internet connection, refer to {{< ref "private-registries" >}}.
	>- For a list of other Rancher server tags available, refer to {{< ref "server-tags" >}}.

**Result:** Rancher is installed.
