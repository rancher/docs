---
title: Air Gap Installation
weight: 345
---
Rancher supports installing from a private registry. In every [release](https://github.com/rancher/rancher/releases), we provide you with the needed Docker images and scripts to mirror those images to your own registry. The Docker images are used when nodes are added to a cluster, or when you enable features like pipelines or logging.

>**Prerequisite:** It is assumed you either have your own private registry or other means of distributing docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation for private registries](https://docs.docker.com/registry/).


>**Note:** In Rancher v2.0.0, registries with authentication are not supported for installing from a private registry. The Docker images can only be pulled from a registry without authentication enabled. This limitation only applies to Docker images.

## Release files

* **rancher-images.txt**: Contains all images needed for that release.
* **rancher-save-images.sh**: This script will pull all needed images from DockerHub, and save all of the images as a compressed file called `rancher-images.tar.gz`. This file can be transferred to your on-premise host that can access your private registry.
* **rancher-load-images.sh**: This script will load images from rancher-images.tar.gz and push them to your private registry. You have to supply the hostname of your private registry as first argument to the script.<br/>`rancher-load-images.sh registry.yourdomain.com:5000`

### Making the Rancher images available

We will cover two scenarios:

* **Scenario 1**: You have one host that can access DockerHub to pull and save the images, and a separate host that access your private registry to push the images.
* **Scenario 2**: You have one host that can access both DockerHub and your private registry.

#### Scenario 1: One host that can access DockerHub, separate host that can access private registry

![Scenario1]({{< baseurl >}}/img/rancher/airgap/privateregistry.svg)

1. Browse to the release page of your version (i.e. `https://github.com/rancher/rancher/releases/tag/v2.0.0`) and download `rancher-save-images.sh` and `rancher-load-images.sh`

2. Transfer and run `rancher-save-images.sh` on the host the can access DockerHub. This will require at least 20GB of disk space.

3. Transfer the output file from step 2 (`rancher-images.tar.gz`) to the host that can access the private registry.

4. Transfer and run `rancher-load-images.sh` on the host that can access the private registry. It should be run in the same directory as `rancher-images.tar.gz`.

#### Scenario 2: You have one host that can access both DockerHub and your private registry.

![Scenario2]({{< baseurl >}}/img/rancher/airgap/privateregistrypushpull.svg)

1. Browse to the release page of your version (i.e. `https://github.com/rancher/rancher/releases/tag/v2.0.0`) and download `rancher-images.txt`

2. Pull all the images present in `rancher-images.txt`, re-tag each image with the location of your registry, and push the image to the registry. This will require at least 20GB of disk space. See an example script below:

```
#!/bin/sh
IMAGES=`curl -s -L https://github.com/rancher/rancher/releases/download/v2.0.0/rancher-images.txt`
for IMAGE in $IMAGES; do
    until docker inspect $IMAGE > /dev/null 2>&1; do
        docker pull $IMAGE
    done
    docker tag $IMAGE registry.yourdomain.com:5000/$IMAGE
    docker push registry.yourdomain.com:5000/$IMAGE
done
```

### Configuring Rancher to use the private registry

Rancher needs to be configured to use the private registry as source for the needed images.

1. Go into the Settings view.
  ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)
2. Look for the setting called `system-default-registry` and choose **Edit**.
  ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)
3. Change the value to your registry, i.e. `registry.yourdomain.com:5000`. Do not prefix the registry with `http://` or `https://`
  ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)


>**Note:** If you want to configure the setting when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`. Example:
```
#!/bin/sh
docker run -d -p 80:80 -p 443:443 -e CATTLE_SYSTEM_DEFAULT_REGISTRY=registry.yourdomain.com:5000 registry.yourdomain.com:5000/rancher/rancher:v2.0.0
```
