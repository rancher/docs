---
title: Azure Node Template Configuration
weight: 1
---

For more information about Azure, refer to the official [Azure documentation.](https://docs.microsoft.com/en-us/azure/?product=featured)

{{% tabs %}}
{{% tab "Rancher v2.2.0+" %}}

Account access information is stored as a cloud credential. Cloud credentials are stored as Kubernetes secrets. Multiple node templates can use the same cloud credential. You can use an existing cloud credential or create a new one. 

- **Placement** sets the geographical region where your cluster is hosted and other location metadata.
- **Network** configures the networking used in your cluster.
- **Instance** customizes your VM configuration.

The [Docker daemon](https://docs.docker.com/engine/docker-overview/#the-docker-daemon) configuration options include:

- **Labels:** For information on labels, refer to the [Docker object label documentation.](https://docs.docker.com/config/labels-custom-metadata/)
- **Docker Engine Install URL:** Determines what Docker version will be installed on the instance.
- **Registry mirrors:** Docker Registry mirror to be used by the Docker daemon
- **Other advanced options:** Refer to the [Docker daemon option reference](https://docs.docker.com/engine/reference/commandline/dockerd/)

{{% /tab %}}
{{% tab "Rancher before v2.2.0" %}}

- **Account Access** stores your account information for authenticating with Azure. 
- **Placement** sets the geographical region where your cluster is hosted and other location metadata.
- **Network** configures the networking used in your cluster.
- **Instance** customizes your VM configuration.

The [Docker daemon](https://docs.docker.com/engine/docker-overview/#the-docker-daemon) configuration options include:

- **Labels:** For information on labels, refer to the [Docker object label documentation.](https://docs.docker.com/config/labels-custom-metadata/)
- **Docker Engine Install URL:** Determines what Docker version will be installed on the instance.
- **Registry mirrors:** Docker Registry mirror to be used by the Docker daemon
- **Other advanced options:** Refer to the [Docker daemon option reference](https://docs.docker.com/engine/reference/commandline/dockerd/)
{{% /tab %}}
{{% /tabs %}}
