---
title: Preparing for Air Gap Install
weight: 300
---
Rancher supports installing from a private registry. In every [release](https://github.com/rancher/rancher/releases), we provide you with the needed Docker images and scripts to mirror those images to your own registry. The Docker images are used when nodes are added to a cluster, or when you enable features like pipelines or logging.

>**Prerequisite:** It is assumed you either have your own private registry or other means of distributing docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation for private registries](https://docs.docker.com/registry/).

>**Note:** In Rancher v2.0.x, registries with authentication are not supported for installing from a private registry. The Docker images can only be pulled from a registry without authentication enabled. This limitation only applies to Docker images.

## Release Files

* **rancher-images.txt**: Contains all images needed for that release.
* **rancher-save-images.sh**: This script will pull all needed images from DockerHub, and save all of the images as a compressed file called `rancher-images.tar.gz`. This file can be transferred to your on-premise host that can access your private registry.
* **rancher-load-images.sh**: This script will load images from rancher-images.tar.gz and push them to your private registry. You have to supply the hostname of your private registry as first argument to the script.<br/>`rancher-load-images.sh registry.yourdomain.com:5000`

## Making the Rancher Images Available

We will cover two scenarios:

* **Scenario 1**: You have a node that can access DockerHub to pull and save the images, and a separate node(s) that access your private registry to push the images.
* **Scenario 2**: You have node(s) that can access both DockerHub and your private registry.

### Scenario 1: A Node that Can Access DockerHub, Separate Node(s) That Can Access the Private Registry

![Scenario1]({{< baseurl >}}/img/rancher/airgap/privateregistry.svg)

1. Browse to the release page of your version of Rancher (e.g. `https://github.com/rancher/rancher/releases/tag/v2.0.0`) and download `rancher-save-images.sh` and `rancher-load-images.sh`.

2. Transfer and run `rancher-save-images.sh` on the host the can access DockerHub. This will require at least 20GB of disk space.

3. Transfer the output file from step 2 (`rancher-images.tar.gz`) to the host that can access the private registry.

4. Transfer and run `rancher-load-images.sh` on the host that can access the private registry. It should be run in the same directory as `rancher-images.tar.gz`.

### Scenario 2: You have node(s) that can access both DockerHub and your private registry.

![Scenario2]({{< baseurl >}}/img/rancher/airgap/privateregistrypushpull.svg)

1. Browse to the release page of your version of Rancher (e.g. `https://github.com/rancher/rancher/releases/tag/v2.0.0`) and download `rancher-images.txt`.

2. Pull all the images present in `rancher-images.txt`, re-tag each image with the location of your registry, and push the image to the registry. This will require at least 20GB of disk space. See an example script below:
    ```
    #!/bin/sh
    IMAGES=`curl -s -L https://github.com/rancher/rancher/releases/download/v2.0.0/rancher-images.txt`
    for IMAGE in $IMAGES; do
      until docker inspect $IMAGE > /dev/null 2>&1; do
        docker pull $IMAGE
      done
      docker tag $IMAGE <registry.yourdomain.com:port>/$IMAGE
      docker push <registry.yourdomain.com:port>/$IMAGE
    done
    ```

## Completing the Rancher Installation

After your private registry is setup on all node(s) for your Rancher installation, complete your Rancher installation.

### Single Node Install

Complete installation of Rancher using the instructions in [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/).

>**Note:**
> When completing [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/), prepend your private registry URL to the image when running the `docker run` command.
>
> Example:
> ```
> docker run -d --restart=unless-stopped \
> -p 80:80 -p 443:443 \
> <registry.yourdomain.com:port>/rancher/rancher:latest
  ```

## Configuring Rancher to Use the Private Registry

Rancher needs to be configured to use the private registry as source for the needed images.

1. Go into the **Settings** view.
    
    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

2. Look for the setting called `system-default-registry` and choose **Edit**.
  
    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

3. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.
  
    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)


>**Note:** If you want to configure the setting when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.
>
> Example:
> ```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<registry.yourdomain.com:port> \
  <registry.yourdomain.com:port>/rancher/rancher:v2.0.0
```

You can install Rancher in an air gap environment in a high availability configuration.

## HA Air Gap Install Outline

Deployment of Rancher in a high-availability configuration within an air gap environment is a multistep process.

<!-- TOC -->


- [1—Gather Images](#1gather-images)
- [2—Populate the Registry](#2populate-the-registry)
- [3—Run RKE with Private Registry Options](#3run-rke-with-private-registry-options)
- [4—Install Helm (tiller)](#4install-helm-tiller)
- [5—Install Rancher](#5install-rancher)

<!-- /TOC -->

## 1—Gather Images

To get started with an HA install within an air gap environment, download the software and files that you'll use for installation.

1. Download the four images required to populate your private Docker registry, which will be used to launch Rancher Server.
    
    
    <table>
        <thead>
            <tr>
                <th>Download</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>RKE</td>
                <td>
                    A list of RKE images that are required can be compiled by running the following command.
                    <pre><code>rke config --system-images</code></pre>
                </td>
            </tr>
            <tr>
                <td>rancher-images.txt</td>
                <td> Rancher has additional images it uses when installing clusters. These images are listed in <code>rancher-images.txt</code>, which can be found at GitHub Releases page for <a href="https://github.com/rancher/rancher/releases">rancher/rancher</a>.</td>
            </tr>
            <tr>
                <td>Helm <code>tiller</code> Image</td>
                <td>
                    You can discover the <code>tiller</code> image compatible with your installed version of <code>helm</code> with the command below.
                    <pre><code>helm init --dry-run --debug | grep image: | awk '{print $2}'</code></pre>
                </td>
            </tr>
            <tr>
                <td>cert-manager Image</td>
                <td>Rancher uses the <a href="https://github.com/jetstack/cert-manager">cert-manager</a> project to issue self-singed certificates for Rancher GUI/Agent access. You can inspect the <code>cert-manager</code> chart <code>values.yaml</code> to find the latest image and tag.
                <pre><code> helm inspect values stable/cert-manager
        ...
        image:
          repository: quay.io/jetstack/cert-manager-controller
          tag: v0.4.1
        ...</code></pre>
                </td>
            </tr>
        </tbody>
    </table>
    
1. From a system with internet access, use the shell script below to compile the images required by the latest Rancher release and write them to `images.txt` in the local directory.

    ```bash
    #!/bin/bash
    set -e
    
    # Collect images for Air Gap/Private Registry install
    # Requires:
    #   rke - https://rancher.com/docs/rke/v0.1.x/en/installation/
    #   helm - https://docs.helm.sh/using_helm/#installing-helm
    #   curl
    #   jq
    
    echo "RKE Images"
    rke config --system-images 2>/dev/null > tmp-images.txt
    
    echo "Helm Tiller Image"
    helm init --dry-run --debug | grep image: | awk '{print $2}' >> tmp-images.txt
    
    echo "Rancher Images"
    latest_url=$(curl -sS "https://api.github.com/repos/rancher/rancher/releases/latest" | jq -r '.assets[]|select(.name=="rancher-images.txt")|.browser_download_url')
    curl -sSL ${latest_url} >> tmp-images.txt
    
    echo "Cert-Manager Image"
    cm_repo=$(helm inspect values stable/cert-manager | grep repository: | awk '{print $2}')
    cm_tag=$(helm inspect values stable/cert-manager | grep tag: | awk '{print $2}')
    echo "${cm_repo}:${cm_tag}" >> tmp-images.txt
    
    echo "Sort and uniq the images list"
    cat tmp-images.txt | sort -u | uniq > images.txt
    
    # cleanup tmp file
    rm tmp-images.txt
    ```

## 2—Populate the Registry

Each image in the list needs to be pulled from public registries, tagged with your private registry URL/path, and then pushed up to your private registry.

1. Pull the images from public registries using the following command:

    ```plain
    docker pull rancher/coreos-etcd:v3.1.12
    ```  

1. Tag the images with your private registry URL and path:
    
    ```plain
    docker tag rancher/coreos-etcd:v3.1.12 <MY_REGISTRY.EXAMPLE.COM>/rancher/coreos-etcd:v3.1.12
    ```  
1. Push the images to your private registry:

    ```plain
    docker push <MY_REGISTRY.EXAMPLE.COM>/rancher/coreos-etcd:v3.1.12
    ```

1. Use the shell script below to to populate the private registry. This shell script can be used with a list of images (`images.txt`). To use this script, the system needs access to both the Internet and the private registry.

    ```bash
    #!/bin/bash
    
    # Usage:
    # ./populate-images.sh --registry my_registry.example.com --images ./images.txt
    
    POSITIONAL=()
    while [[ $# -gt 0 ]]
    do
    key="$1"
    
    case $key in
        -r|--registry)
        reg="$2"
        shift # past argument
        shift # past value
        ;;
        -i|--images)
        images="$2"
        shift
        shift
        ;;
    esac
    done
    
    if [[ -z $reg ]]; then
        echo "-r|--registry is required"
        exit 1
    fi
    
    if [[ -z $images ]]; then
        echo "-i|--images file is required"
        exit 1
    fi
    
    echo "Log into Docker registry ${reg}"
    docker login ${reg}
    
    for i in $(cat ${images}); do
        docker pull ${i}
        docker tag ${i} ${reg}/${i}
        docker push ${reg}/${i}
    done
    ```

## 3—Run RKE with Private Registry Options

Edit your `cluster.yaml` file, specifying your cluster nodes and your private registry.

1. Edit `cluster.yaml`, specifying the nodes you created. Include the `private_registries:` block. Set `is_default: true` for the registry that you pushed the images to.
    
        nodes:
        - address: 18.222.121.187
          internal_address: 172.31.7.22
          user: rancher
          role: [ "controlplane", "etcd", "worker" ]
          ssh_key_file: /home/user/.ssh/id_rsa
        - address: 18.220.193.254
          internal_address: 172.31.13.132
          user: rancher
          role: [ "controlplane", "etcd", "worker" ]
          ssh_key_file: /home/user/.ssh/id_rsa
        - address: 13.59.83.89
          internal_address: 172.31.3.216
          user: rancher
          role: [ "controlplane", "etcd", "worker" ]
          ssh_key_file: /home/user/.ssh/id_rsa
        private_registries:
        - url: my_registry.example.com
          user: rancher
          password: "*********"
          is_default: true

    
1. Run RKE to set up your cluster using your private registry.
    
    ```
    rke up
    ```

## 4—Install Helm (tiller)

Install the Helm package manager. You'll use this software to install Rancher on the Kubernetes cluster you just set up.

1. The `tiller` serviceAccount that the tiller deployment uses needs credentials to access your private registry. Set up the serviceAccount and RBAC permissions as depicted below. Then patch the service account to add the credentials.

    ```
    kubectl -n kube-system create serviceaccount tiller
    kubectl create clusterrolebinding tiller \
      --clusterrole cluster-admin \
      --serviceaccount=kube-system:tiller
    ```

1. Initialize Helm with the `tiller` image in your private registry.

    ```
    helm init --service-account tiller \
    --tiller-image user-ag-2-registry.rancher.space/gcr.io/kubernetes-helm/tiller:v2.10.0
    ```

## 5—Install Rancher

Finally, we're ready to install Rancher.

1. Install cert-manager, which automatically creates and handles certificates for your Rancher deployment.
    
    ```
    helm install stable/cert-manager --name cert-manager --namespace kube-system \
    --set image.repository=user-ag-2-registry.rancher.space/quay.io/jetstack/cert-manager-controller
    ```

1. Install Rancher, setting the image source and imagePullSecrets options.

    ```plain
    helm install rancher-stable/rancher --name rancher --namespace cattle-system \
    --set hostname=user-ag-2.rancher.space \
    --set rancherImage=user-ag-2-registry.rancher.space/rancher/rancher
    ```
