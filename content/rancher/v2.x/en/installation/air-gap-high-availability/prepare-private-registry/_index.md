---
title: "2. Prepare Private Registry"
weight: 200
aliases:

---

## A. Collect Images

Start by collecting all the images needed to install Rancher in an air gap environment. You'll collect images from your chosen Rancher release, RKE, and (if you're using a self-signed TLS certificate) Cert-Manager. 

1. Using a computer with internet access, browse to our [releases page](https://github.com/rancher/rancher/releases) and find the Rancher v2.1.x release that you want to install. Don't download releases marked `rc` or `Pre-release`, as they are not stable for production environments.

    ![Choose Release Version]({{< baseurl >}}/img/rancher/choose-release-version.png)

2. From the release's **Assets** section (pictured above), download the following three files, which are required to install Rancher in an air gap environment:


    | Release File | Description |
    | --- | --- |
    | `rancher-images.txt` | This file contains a list of all files needed to install Rancher.
    | `rancher-save-images.sh` | This script pulls all the images in the `rancher-images.txt` from Docker Hub and saves all of the images as `rancher-images.tar.gz`. |
    | `rancher-load-images.sh` | This script loads images from the `rancher-images.tar.gz` file and pushes them to your private registry. |


1. Make `rancher-save-images.sh` an executable.
    
    ```
    chmod +x rancher-save-images.sh
    ```
    

1. From the directory that contains the RKE binary, add RKE's images to `rancher-images.txt`, which is a list of all the files needed to install Rancher. 
     
    ```
    rke config --system-images >> ./rancher-images.txt
    ```
1. **Default Rancher Generated Self-Signed Certificate Users Only:** If you elect to use the Rancher default self-signed TLS certificates, you must add the [`cert-manager`](https://github.com/helm/charts/tree/master/stable/cert-manager) image to `rancher-images.txt` as well. You may skip to [B. Publish Images](#b-publish-images  ) if you are using you using your own certificates.
    
    1.  Fetch the latest `cert-manager` Helm chart and parse the template for image details.
    
        ```plain
        helm fetch stable/cert-manager
        helm template ./cert-manager-<version>.tgz | grep -oP '(?<=image: ").*(?=")' >> ./rancher-images.txt
        ```
    
    2. Sort and unique the images list to remove any overlap between the sources.
        
        ```plain
        sort -u rancher-images.txt -o rancher-images.txt
        ```

1. Run `rancher-save-images.sh` with the `rancher-images.txt` image list to create a tarball of all the required images.

    ```plain
    ./rancher-save-images.sh --image-list ./rancher-images.txt
        ```
    
    **Step Result:** Docker begins pulling the images used for an air gap install. Be patient. This process takes a few minutes. When the process completes, your current directory will output a tarball named `rancher-images.tar.gz`. Check that the output is in the directory.

## B. Publish Images


Using a computer with access to the internet and your private registry, move the images from `rancher-images.txt` to your private registry using the image scripts.

>**Note:** Image publication may require up to 20GB of empty disk space.

1. Log into your private registry if required.

    ```plain
    docker login <REGISTRY.YOURDOMAIN.COM:PORT>
    ```

1. Use `rancher-load-images.sh` to extract, tag and push `rancher-images.txt` and `rancher-images.tar.gz` to your private registry.

    ```plain
    ./rancher-load-images.sh --image-list ./rancher-images.txt --registry <REGISTRY.YOURDOMAIN.COM:PORT>
    ```

### [Next: Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/install-kube/)