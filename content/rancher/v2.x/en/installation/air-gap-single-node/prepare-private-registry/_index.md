---
title: "2. Prepare Private Registry"
weight: 200
aliases:
---

>**Prerequisites:** You must have a [private registry](https://docs.docker.com/registry/deploying/) available to use.

By default, all system images are being pulled from DockerHub. If you are on a system that does not have access to DockerHub, you will need to create a private registry that is populated with all the required [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/). 

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
As of RKE v0.1.10, you have to configure your private registry credentials, but you can specify this registry as a default registry so that all system images are pulled from the designated private registry. You can use the command `rke config --system-images` to get the list of default system images to populate your private registry. For details, refer to the [RKE documentation on how to set a default registry]({{<baseurl>}}/rke/latest/en/config-options/private-registries/).


Prior to RKE v0.1.10, you had to configure your private registry credentials **and** update the names of all the [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/) in the `cluster.yml` so that the image names would have the private registry URL appended before each image name.

The steps in this guide assume that your private registry requires credentials, but Rancher doesn't require the private registry to have credentials. If you don't need credentials to pull from the registry, you can skip configuring the registry in RKE and later configure it from the Rancher UI instead.
=======
As of v0.1.10, you have to configure your private registry credentials, but you can specify this registry as a default registry so that all system images are pulled from the designated private registry. You can use the command `rke config --system-images` to get the list of default system images to populate your private registry. 

Prior to v0.1.10, you had to configure your private registry credentials **and** update the names of all the [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/) in the `cluster.yml` so that the image names would have the private registry URL appended before each image name. 
>>>>>>> Add RKE info on airgap registry to airgap installation docs
=======
As of v0.1.10, you have to configure your private registry credentials, but you can specify this registry as a default registry so that all system images are pulled from the designated private registry. You can use the command `rke config --system-images` to get the list of default system images to populate your private registry. 

Prior to v0.1.10, you had to configure your private registry credentials **and** update the names of all the [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/) in the `cluster.yml` so that the image names would have the private registry URL appended before each image name. 
>>>>>>> Add RKE info on airgap registry to airgap installation docs
=======
As of RKE v0.1.10, you have to configure your private registry credentials, but you can specify this registry as a default registry so that all system images are pulled from the designated private registry. You can use the command `rke config --system-images` to get the list of default system images to populate your private registry. For details, refer to the [RKE documentation on how to set a default registry]({{<baseurl>}}/rke/latest/en/config-options/private-registries/).


Prior to RKE v0.1.10, you had to configure your private registry credentials **and** update the names of all the [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/) in the `cluster.yml` so that the image names would have the private registry URL appended before each image name.

The steps in this guide assume that your private registry requires credentials, but Rancher doesn't require the private registry to have credentials. If you don't need credentials to pull from the registry, you can skip configuring the registry in RKE and later configure it from the Rancher UI instead.
>>>>>>> Update air gap private registry docs


## A. Collect Image Sources

Using a computer with internet access, browse to our [releases page](https://github.com/rancher/rancher/releases) and find the Rancher 2.x.x release that you want to install. Don't download releases marked `rc` or `Pre-release`, as they are not stable for production environments.

![Choose Release Version]({{< baseurl >}}/img/rancher/choose-release-version.png)

From the release's **Assets** section, download the following three files, which are required to install Rancher in an air gap environment:


| Release File | Description |
| --- | --- |
| `rancher-images.txt` | This file contains a list of all files needed to install Rancher.
| `rancher-save-images.sh` | This script pulls all the images in the `rancher-images.txt` from Docker Hub and saves all of the images as `rancher-images.tar.gz`. |
| `rancher-load-images.sh` | This script loads images from the `rancher-images.tar.gz` file and pushes them to your private registry. |


## B. Publish Images

After collecting the release files, publish the images from `rancher-images.txt` to your private registry using the image scripts.

>**Note:** Image publication may require up to 20GB of empty disk space.

1. From a system with internet access, use the `rancher-save-images.sh` with the `rancher-images.txt` image list to create a tarball of all the required images.

    ```plain
    ./rancher-save-images.sh --image-list ./rancher-images.txt
    ```

1. Copy `rancher-load-images.sh`, `rancher-images.txt` and `rancher-images.tar.gz` files to the [Linux host]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/provision-host) that you've provisioned by completing the substeps below.

    1. Log into your registry if required.

        ```plain
        docker login <REGISTRY.YOURDOMAIN.COM:PORT>
        ```

    1. Use `rancher-load-images.sh` to extract, tag and push the images to your private registry.

        ```plain
        ./rancher-load-images.sh --image-list ./rancher-images.txt --registry <REGISTRY.YOURDOMAIN.COM:PORT>
        ```

### [Next: Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/install-rancher/)