---
title: "2. Collect and Publish Image Sources"
weight: 200
aliases:

---

Using a computer with internet access, browse to our Rancher [releases page](https://github.com/rancher/rancher/releases) and find the version that you want to install in your air gap environment. Download the following three files:


| Release File | Description |
| --- | --- |
| `rancher-images.txt` | Contains a list of all files needed to install Rancher.
| `rancher-save-images.sh` | Pulls all the images in the `rancher-images.txt` from various public registries and saves all of the images as `rancher-images.tar.gz`. |
| `rancher-load-images.sh` | Loads images from the `rancher-images.tar.gz` file and pushes them to your private registry. |


The Rancher HA install uses images from 3 sources. Combine the 3 sources into a file named `rancher-images.txt`.

* **Rancher** - Images required by Rancher. Download the `rancher-images.txt` file from [Rancher releases](https://github.com/rancher/rancher/releases) page for the version of Rancher you are installing.
* **RKE** - Images required by `rke` to install Kubernetes. Run `rke` and add the images to the end of `rancher-images.txt`.
    
    ```plain
    rke config --system-images >> ./rancher-images.txt
    ```
* **Cert-Manager** - (Conditional) Rancher requires a TLS certificate. During installation, if you elect to use the default Rancher self-signed TLS certificates 
[Option A: Default Self-Signed Certificates]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/install-rancher/#a-choose-an-ssl-option-and-install-rancher) in [Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/install-rancher/), you will need the [`cert-manager`](https://github.com/helm/charts/tree/master/stable/cert-manager) image. You may skip this image if you are using you using your own certificates.
    
    Fetch the latest `cert-manager` Helm chart and parse the template for image details.
    
    ```plain
    helm fetch stable/cert-manager
    helm template ./cert-manager-<version>.tgz | grep -oP '(?<=image: ").*(?=")' >> ./rancher-images.txt
    ```

Sort and unique the images list to remove any overlap between the sources.

```plain
sort -u rancher-images.txt -o rancher-images.txt
```


Using a computer with access to the internet, move the images from `rancher-images.txt` to your private registry using the image scripts.

>**Note:** Image publication may require up to 20GB of empty disk space.

1. Make `rancher-save-images.sh` an executable.

    ```
    chmod +x rancher-save-images.sh
    ```

1. Run `rancher-save-images.sh` with the `rancher-images.txt` image list to create a tarball of all the required images.

    ```plain
    ./rancher-save-images.sh --image-list ./rancher-images.txt
    ```

    **Step Result:** Docker begins pulling the images used for an air gap install. Be patient. This process takes a few minutes. When the process completes, your current directory will output a tarball named `rancher-images.tar.gz`.

1. Push `rancher-load-images.sh`, `rancher-images.txt` and `rancher-images.tar.gz` to your private registry.files to each of the [Linux hosts](#1-provision-three-linux-hosts-and-load-balancer) that you've provisioned.


    1. Log into your private registry if required.

        ```plain
        docker login <REGISTRY.YOURDOMAIN.COM:PORT>
        ```

    1. Use `rancher-load-images.sh` to extract, tag and push the images to your private registry.

        ```plain
        ./rancher-load-images.sh --image-list ./rancher-images.txt --registry <REGISTRY.YOURDOMAIN.COM:PORT>
        ```

### [Next: Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/install-kube/)