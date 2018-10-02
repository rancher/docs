---
title: 1—Preparing the Private Registry
weight: 25
draft: true
---

For the first part of your air gap install, you'll prepare your private registry in order to be able to install and start using Rancher.

<a id="step-1"></a>

## Image Sources

Collect the list of images required for Rancher. These steps will require internet access.

{{% tabs %}}
{{% tab "HA Install" %}}
The Rancher HA install uses images from 3 sources. Combine the 3 sources into a file named `rancher-images.txt`.

* **Rancher** - Images required by Rancher. Download the `rancher-images.txt` file from [Rancher releases](https://github.com/rancher/rancher/releases) page for the version of Rancher you are installing.
* **RKE** - Images required by `rke` to install Kubernetes. Run `rke` and add the images to the end of `rancher-images.txt`.
    
    ```plain
    rke config --system-images >> ./rancher-images.txt
    ```
* **Cert-Manager** - (Optional) If you choose to install with Rancher Self-Signed TLS certificates, you will need the [`cert-manager`](https://github.com/helm/charts/tree/master/stable/cert-manager) image. You may skip this image if you are using you using your own certificates.
    
    Fetch and the latest `cert-manager` Helm chart and parse the template for image details.
    
    ```plain
    helm fetch stable/cert-manager
    helm template ./cert-manager-<version>.tgz | grep -oP '(?<=image: ").*(?=")' >> ./rancher-images.txt
    ```

Sort and unique the images list to remove any overlap between the sources.

```plain
sort -u rancher-images.txt -o rancher-images.txt
```

{{% /tab %}}
{{% tab "Single Node" %}}
All the required images for a Single Node install can be found in the `rancher-images.txt` included with the release of Rancher you are installing.

Download the `rancher-images.txt` from the [Rancher releases](https://github.com/rancher/rancher/releases) page.

{{% /tab %}}
{{% /tabs %}}

## Publish Images

Once you have the `rancher-images.txt` file populated, publish the images from the list to your private registry.

> **NOTE** This may require up to 20GB of disk space.

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
    ```

### [Next: Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/)
