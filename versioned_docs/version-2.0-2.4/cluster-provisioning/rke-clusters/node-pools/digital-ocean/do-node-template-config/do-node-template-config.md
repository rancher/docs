---
title: DigitalOcean Node Template Configuration
weight: 1
----

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Rancher v2.2.0+">

Account access information is stored as a cloud credential. Cloud credentials are stored as Kubernetes secrets. Multiple node templates can use the same cloud credential. You can use an existing cloud credential or create a new one.

### Droplet Options

The **Droplet Options** provision your cluster's geographical region and specifications.

### Docker Daemon

The [Docker daemon](https://docs.docker.com/engine/docker-overview/#the-docker-daemon) configuration options include:

- **Labels:** For information on labels, refer to the [Docker object label documentation.](https://docs.docker.com/config/labels-custom-metadata/)
- **Docker Engine Install URL:** Determines what Docker version will be installed on the instance.
- **Registry mirrors:** Docker Registry mirror to be used by the Docker daemon
- **Other advanced options:** Refer to the [Docker daemon option reference](https://docs.docker.com/engine/reference/commandline/dockerd/)

</TabItem>
<TabItem value="Rancher before v2.2.0">

### Access Token

The **Access Token** stores your DigitalOcean Personal Access Token. Refer to [DigitalOcean Instructions: How To Generate a Personal Access Token](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-api-v2#how-to-generate-a-personal-access-token).

### Droplet Options

The **Droplet Options** provision your cluster's geographical region and specifications.

### Docker Daemon

The [Docker daemon](https://docs.docker.com/engine/docker-overview/#the-docker-daemon) configuration options include:

- **Labels:** For information on labels, refer to the [Docker object label documentation.](https://docs.docker.com/config/labels-custom-metadata/)
- **Docker Engine Install URL:** Determines what Docker version will be installed on the instance.
- **Registry mirrors:** Docker Registry mirror to be used by the Docker daemon
- **Other advanced options:** Refer to the [Docker daemon option reference](https://docs.docker.com/engine/reference/commandline/dockerd/)

</TabItem>
</Tabs>