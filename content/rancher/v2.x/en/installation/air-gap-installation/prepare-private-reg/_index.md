---
title: 1—Preparing the Private Registry
weight: 25
draft: true
---

For the first part of your air gap install, you'll prepare your private registry in order to be able to install and start using Rancher.

<a id="step-1"></a>

1. Browse to the [Rancher releases page](https://github.com/rancher/rancher/releases) and download the following files for the version that you want to install.

    | Release File | Description |
    | --- | --- |
    | `rancher-images.txt` | This file contains the list of all images needed to install the release,  create [Rancher launched clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) and use any of the [Rancher tools]({{< baseurl >}}/rancher/v2.x/en/tools/). |
    | `rancher-save-images.sh`  | This script pulls all the images in the `rancher-images.txt` from DockerHub and saves all of the images as a compressed file called `rancher-images.tar.gz`. This file can be transferred to your on-premise host that can access your private registry. |
    | `rancher-load-images.sh` | This script loads images from the `rancher-images.tar.gz` file and pushes them to your private registry. You must supply the hostname of your private registry as first argument to the script.<br/>`rancher-load-images.sh <REGISTRY.YOURDOMAIN.COM:PORT>` |


    >**Doing a [single node installation]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/)?** Skip to [step 3](#pop-reg).


1. **High Availability (HA) Installs Only:** For our [HA installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha/), we use additional tools to install Kubernetes and launch Rancher onto a Kubernetes cluster. You will need to install and download additional software and images in order to complete the HA installation.

    Download the software in the table below.

    | Software | Description |
    |----------|-------------|
    | RKE | [Rancher Kubernetes Engine (RKE)]({{< baseurl >}}/rke/v1.x/en/) is Rancher's fast, light-weight Kubernetes installer. Please download the RKE version that is listed in the release notes of the Rancher version that you are planning to launch. The Docker images in Step 1 will match with this RKE version.  |
    | Helm | As you are installing Rancher through a helm chart, you will need to download [Helm](https://docs.helm.sh/using_helm/#installing-helm).

    <br>

    After the software is installed, run the following shell script to compile the list of additional images required to [install Rancher as a helm chart]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/).

    | Images | Description |
    |----------|-------------|
    | Helm Image (tiller) | You can need a tiller image that is compatible with your installed version of Helm.
    | cert-manager | Rancher uses the [cert-manager](https://github.com/jetstack/cert-manager) project to issue self-signed certificates for Rancher GUI/Agent access.

    ```bash
    #!/bin/bash
    set -e

    # Collect images for Air Gap/Private Registry install
    # Requires:
    #   rke - https://rancher.com/docs/rke/v0.1.x/en/installation/
    #   helm - https://docs.helm.sh/using_helm/#installing-helm
    #   curl
    #   jq

    echo "Helm Tiller Image"
    helm init --dry-run --debug | grep image: | awk '{print $2}' >> tmp-images.txt

    echo "Cert-Manager Image"
    cm_repo=$(helm inspect values stable/cert-manager | grep repository: | awk '{print $2}')
    cm_tag=$(helm inspect values stable/cert-manager | grep tag: | awk '{print $2}')
    echo "${cm_repo}:${cm_tag}" >> tmp-images.txt

    echo "Sort and uniq the images list"
    cat tmp-images.txt | sort -u | uniq > helm-images.txt

    # cleanup tmp file
    rm tmp-images.txt
    ```    

    <a id="pop-reg"></a>
1. Use the Rancher release files that you downloaded in [step 1](#step-1) to populate your private registry with Rancher images. Use the scenario that best matches your use case:

    * **Scenario 1**: You have node(s) that can access both DockerHub and your private registry.
    * **Scenario 2**: You have a node that can access DockerHub to pull and save the images, and a separate node(s) that access your private registry to push the images.


     <br/>
{{% tabs %}}
{{% tab "Scenario 1" %}}

<br/>
The architecture for this scenario is:

- A host that can access both DockerHub and your private registry.

- An on-premise private registry, which you'll use to deploy Rancher in your air gap environment.
<br/>
<br/>
![Scenario2]({{< baseurl >}}/img/rancher/airgap/privateregistrypushpull.svg)


1. You will need to pull all the required images, re-tag each image with the location of your registry, and push the image to the registry. This action requires at least 20GB of disk space.

Use the shell script below to to populate the private registry. This shell script can be used with the list of images from Step 1 (i.e. `rancher-images.txt`) as well as the list of images required for a HA install from Step 2 (i.e. `helm-images.txt`).

```bash
#!/bin/bash

# Usage:
# ./populate-images.sh --registry <REGISTRY.YOURDOMAIN.COM:PORT> --images ./images.txt

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

{{% /tab %}}
{{% tab "Scenario 2" %}}
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

1. Transfer the output file from the previous step (`rancher-images.tar.gz`) to the host that can access the private registry.

1. Transfer and run `rancher-load-images.sh` on the host that can access the private registry. It should be run in the same directory as `rancher-images.tar.gz`.

{{% /tab %}}
{{% /tabs %}}

### [Next: Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/)
