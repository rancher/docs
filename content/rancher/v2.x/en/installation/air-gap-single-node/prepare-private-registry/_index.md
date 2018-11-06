---
title: "2. Prepare Private Registry"
weight: 200
aliases:
---

## A. Collect Image Sources

Using a computer with internet access, browse to our Rancher [releases page](https://github.com/rancher/rancher/releases) and find the version that you want to install. Download the following three files, which are required to install Rancher in an air gap environment:


| Release File | Description |
| --- | --- |
| `rancher-images.txt` | This file contains a list of all files needed to install Rancher.
| `rancher-save-images.sh` | This script pulls all the images in the `rancher-images.txt` from various public registries and saves all of the images as `rancher-images.tar.gz`. |
| `rancher-load-images.sh` | This script loads images from the `rancher-images.tar.gz` file and pushes them to your private registry. |


## B. Publish Images

After downloading the release files, publish the images from `rancher-images.txt` to your private registry using the image scripts.

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