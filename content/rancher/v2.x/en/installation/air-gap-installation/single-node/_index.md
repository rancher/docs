---
title: "Air Gap: Single Node Install"
weight:
---

## 1. Collect Image Sources

All the required images for a Single Node install can be found in the `rancher-images.txt` included with the release of Rancher you are installing.

Download the `rancher-images.txt` from the [Rancher releases](https://github.com/rancher/rancher/releases) page.

## 2. Publish Images

Once you have the `rancher-images.txt` file populated, publish the images from the list to your private registry.

>**Note:** This may require up to 20GB of disk space.

1. Browse to the [Rancher releases page](https://github.com/rancher/rancher/releases) and download the following tools for saving and publishing the images.

    | Release File | Description |
    | --- | --- |
    | `rancher-save-images.sh` | This script pulls all the images in the `rancher-images.txt` from various public registries and saves all of the images as `rancher-images.tar.gz`. |
    | `rancher-load-images.sh` | This script loads images from the `rancher-images.tar.gz` file and pushes them to your private registry. |

1. From a system with internet access, use the `rancher-save-images.sh` with the `rancher-images.txt` image list to create a tarball of all the required images.

    ```plain
    ./rancher-save-images.sh --image-list ./rancher-images.txt
    ```

1. Copy `rancher-load-images.sh`, `rancher-images.txt` and `rancher-images.tar.gz` files to a system that can reach your private registry.

    Log into your registry if required.

    ```plain
    docker login <REGISTRY.YOURDOMAIN.COM:PORT>
    ```

    Use `rancher-load-images.sh` to extract, tag and push the images to your private registry.

    ```plain
    ./rancher-load-images.sh --image-list ./rancher-images.txt --registry <REGISTRY.YOURDOMAIN.COM:PORT>

## 3. Install Rancher 

To deploy Rancher on a single node in an air gap environment, follow the instructions in the standard [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/). Parts of the install where you must complete a special action for air gap are flagged with a substitute step, which is listed in the subheading below.

### Add Private Registry URL to Run Command

When you get to the section [Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#2-choose-an-ssl-option-and-install-rancher), regardless of which install option you choose, prepend your Rancher image tag with your private registry URL (`<REGISTRY.YOURDOMAIN.COM:PORT>`), as shown in the example below.

```plain
docker run -d --restart=unless-stopped \
 -p 80:80 -p 443:443 \
 <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

## 4. Configure Rancher for the Private Registry

Rancher needs to be configured to use the private registry in order to provision any [Rancher launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) or [Rancher tools]({{< baseurl >}}/rancher/v2.x/en/tools/) .

1. Log into Rancher and configure the default admin password.

1. Go into the **Settings** view.

    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

1. Look for the setting called `system-default-registry` and choose **Edit**.

    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)

>**Note:** If you want to configure the setting when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.