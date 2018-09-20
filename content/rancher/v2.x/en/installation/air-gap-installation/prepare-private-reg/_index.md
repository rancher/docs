---
title: 1—Preparing the Private Registry
weight: 25
draft: true
---

For the first part of your air gap install, you'll prepare your private registry for Rancher installation by downloading the Rancher release files, and then pushing them to your private registry.
<a id="step-1"></a>

1. Browse to the [Rancher releases page](https://github.com/rancher/rancher/releases) and download the following files from the version of Rancher tagged with `Latest release`. 

    | Release File                       | Description                                                                                                                                                                                                                                         |
    | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `rancher-images.txt`               | This file contains all images needed to deploy the release.                                                                                                                                                                                                        |
    | `rancher-load-images.sh`           | This script loads images from `rancher-images.tar.gz` and pushes them to your private registry. You must supply the hostname of your private registry as first argument to the script.<br/>`rancher-load-images.sh registry.yourdomain.com:5000` |
    | `rancher-save-images.sh`           | This script pulls all needed images from DockerHub and saves all of the images as a compressed file called `rancher-images.tar.gz`. This file can be transferred to your on-premise host that can access your private registry.                 |

    >**Installing on a single node?**
    >
    >The next two steps don't apply to you. Skip to [step 4](#pop-reg).
            


1. **High Availablity Installs Only:** You need some additional software to complete installation in an air gap environment. Download the software in the table below.
 
    | Software | Description |
    |----------|-------------|
    | RKE | Rancher Kubernetes Engine (RKE) is Rancher's fast, light-weight Kubernetes installer. |
    | Helm Image (tiller) | You can discover the tiller image compatible with your installed version of Helm.
    | cert-manager | Rancher uses the [cert-manager](https://github.com/jetstack/cert-manager) project to issue self-singed certificates for Rancher GUI/Agent access.


1. **High Availablity Installs Only:** From a system with internet access, paste the sample below into an empty file and save it as a shell script. Run the script to compile the images required by the latest Rancher release and write them to `images.txt` in the local directory.

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
    <a id="pop-reg"></a>
1. Use the Rancher release files that you downloaded in [step 1](#step-1) to populate your private registry with Rancher images. Use the scenario that best matches your use case.
     <br/>
{{% tabs %}}
{{% tab "Scenario 1" %}}
<br/>
The architecture for this scenario is:

- A host that can access DockerHub, which pulls and saves Rancher images from the Internet.

- An on-premise host that acts as an intermediary between:

    - The host that can access DockerHub.

    - Your private registry.

- An on-premise private registry, which you'll use to deploy Rancher in your air gap environment.
<br/>
<br/>

![Scenario1]({{< baseurl >}}/img/rancher/airgap/privateregistry.svg)

1. From the host that can access DockerHub, run `rancher-save-images.sh`. This will require at least 20GB of disk space.

1. Transfer the output file from the previous step (`rancher-images.tar.gz`) to the on-premise host that can access the private registry.

1. Transfer and run `rancher-load-images.sh` on the host that can access the private registry. It should be run in the same directory as `rancher-images.tar.gz`. 
{{% /tab %}}
{{% tab "Scenario 2" %}}
<br/>
The architecture for this scenario is:

- A host that can access both DockerHub and your private registry

- An on-premise private registry, which you'll use to deploy Rancher in your air gap environment.
<br/>
<br/>
![Scenario2]({{< baseurl >}}/img/rancher/airgap/privateregistrypushpull.svg)


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
{{% /tab %}}
{{% /tabs %}}

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

### [Next: Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/)