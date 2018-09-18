---
title: High Availability Air Gap Installation
weight: 
draft: true
---

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
