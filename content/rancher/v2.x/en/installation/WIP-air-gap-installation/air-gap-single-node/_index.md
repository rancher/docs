---
title: "Air Gap: Single Node Install"
weight:
---
## Outline

<!-- TOC -->

- [Prerequisites](#prerequisites)
- [Caveats](#caveats)
- [1. Provision Linux Host](#1-provision-linux-host)
- [2. Collect Image Sources](#2-collect-image-sources)
- [3. Publish Images](#3-publish-images)
- [4. Choose an SSL Option and Install Rancher](#4-choose-an-ssl-option-and-install-rancher)
- [5. Configure Rancher for the Private Registry](#5-configure-rancher-for-the-private-registry)

<!-- /TOC -->

## Prerequisites

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).


## Caveats

In versions of Rancher prior to v2.1.0, registries with authentication are not supported when installing Rancher in HA or provisioning clusters, but after clusters are provisioned, registries with authentication can be used in the Kubernetes clusters.

As of v2.1.0, registries with authentication work for installing Rancher as well as provisioning clusters.


## 1. Provision Linux Host

Provision a single, air gapped Linux host according to our [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements) to launch your {{< product >}} Server.

This host should be disconnected from the internet, but should have connectivity with your private registry.

## 2. Collect Image Sources

Using a computer with internet access, browse to our Rancher [releases page](https://github.com/rancher/rancher/releases) and find the version that you want to install. Download the following three files, which are required to install Rancher in an air gap environment:


| Release File | Description |
| --- | --- |
| `rancher-images.txt` | This file contains a list of all files needed to install Rancher.
| `rancher-save-images.sh` | This script pulls all the images in the `rancher-images.txt` from various public registries and saves all of the images as `rancher-images.tar.gz`. |
| `rancher-load-images.sh` | This script loads images from the `rancher-images.tar.gz` file and pushes them to your private registry. |


## 3. Publish Images

After downloading the release files, publish the images from `rancher-images.txt` to your private registry using the image scripts.

>**Note:** Image publication may require up to 20GB of empty disk space.

1. From a system with internet access, use the `rancher-save-images.sh` with the `rancher-images.txt` image list to create a tarball of all the required images.

    ```plain
    ./rancher-save-images.sh --image-list ./rancher-images.txt
    ```

1. Copy `rancher-load-images.sh`, `rancher-images.txt` and `rancher-images.tar.gz` files to the [Linux host](#1-provision-linux-host) that you've provisioned.

    1. Log into your registry if required.

        ```plain
        docker login <REGISTRY.YOURDOMAIN.COM:PORT>
        ```

    1. Use `rancher-load-images.sh` to extract, tag and push the images to your private registry.

        ```plain
        ./rancher-load-images.sh --image-list ./rancher-images.txt --registry <REGISTRY.YOURDOMAIN.COM:PORT>
        ```


## 4. Choose an SSL Option and Install Rancher

For development and testing in air gap environments, we recommend installing Rancher by running a single Docker container. In this installation scenario, you'll deploy Rancher to your air gap host using an image pulled from your private registry.

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

>**Do you want to...**
>
>- Configure custom CA root certificate to access your services? See [Custom CA root certificate]({{< baseurl >}}/rancher/v2.x/en/admin-settings/custom-ca-root-certificate/).
>- Record all transactions with the Rancher API? See [API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#enable-api-audit-log).


Choose from the following options:


{{% accordion id="option-a" label="Option A-Default Self-Signed Certificate" %}}

If you are installing Rancher in a development or testing environment where identity verification isn't a concern, install Rancher using the self-signed certificate that it generates. This installation option omits the hassle of generating a certificate yourself.

Log into your Linux host, and then run the installation command below. Replace `<REGISTRY.YOURDOMAIN.COM:PORT>` with your private registry URL and port.

    docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>

{{% /accordion %}}
{{% accordion id="option-b" label="Option B-Bring Your Own Certificate: Self-Signed" %}}
In development or testing environments where your team will access your Rancher server, create a self-signed certificate for use with your install so that your team can verify they're connecting to your instance of Rancher.

>**Prerequisites:**
>From a computer with an internet connection, create a self-signed certificate using [OpenSSL](https://www.openssl.org/) or another method of your choice.
>
>- The certificate files must be in [PEM format]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#pem).
>- In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [SSL FAQ / Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#cert-order).

After creating your certificate, run the Docker command below to install Rancher. Use the `-v` flag and provide the path to your certificates to mount them in your container.

When entering the command, use the table below to replace each placeholder.

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<CA_CERTS>` | The path to the certificate authority's private key.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.

```
docker run -d --restart=unless-stopped \
-p 80:80 -p 443:443 \
-v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
-v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
-v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```


{{% /accordion %}}
{{% accordion id="option-c" label="Option C-Bring Your Own Certificate: Signed by Recognized CA" %}}

In production environments where you're exposing an app publicly, use a certificate signed by a recognized CA so that your user base doesn't encounter security warnings.

>**Prerequisite:** The certificate files must be in [PEM format]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#pem).

After obtaining your certificate, run the Docker command below, replacing each placeholder. Because your certificate is signed by a recognized CA, mounting an additional CA certificate file is unnecessary.

When entering the command, use the table below to replace each placeholder.

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port. Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

    ```
    docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
	-v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG> --no-cacerts
    ```

{{% /accordion %}}
## 5. Configure Rancher for the Private Registry

Rancher needs to be configured to use the private registry in order to provision any [Rancher launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) or [Rancher tools]({{< baseurl >}}/rancher/v2.x/en/tools/) .

1. Log into Rancher and configure the default admin password.

1. Go into the **Settings** view.

    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

1. Look for the setting called `system-default-registry` and choose **Edit**.

    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)

>**Note:** If you want to configure the setting when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.