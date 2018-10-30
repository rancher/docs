---
title: "Air Gap: Single Node Install"
weight:
---

## Outline

<!-- TOC -->

- [1. Collect Image Sources](#1-collect-image-sources)
- [2. Publish Images](#2-publish-images)
- [3. Install Rancher](#3-install-rancher)
- [4. Configure Rancher for the Private Registry](#4-configure-rancher-for-the-private-registry)

<!-- /TOC -->

## 1. Collect Image Sources

Collect the list of images required for Rancher. These steps will require internet access.

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
    ```

## 3. Provision Linux Host

Provision a single Linux host according to our [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements) to launch your {{< product >}} Server.

## 4. Choose an SSL Option and Install Rancher

To deploy Rancher on a single node in an air gap environment, follow the instructions in the standard [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/). Parts of the install where you must complete a special action for air gap are flagged with a substitute step, which is listed in the subheading below.

For development and testing environments, we recommend installing Rancher by running a single Docker container. In this installation scenario, you'll install Docker on a single Linux host, and then deploy Rancher on your host using a single Docker container.

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

>**Do you want to...**
>
>- Use a proxy? See [HTTP Proxy Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/proxy/)
>- Configure custom CA root certificate to access your services? See [Custom CA root certificate]({{< baseurl >}}/rancher/v2.x/en/admin-settings/custom-ca-root-certificate/)
>- Complete an Air Gap Installation? See [Air Gap](#air-gap)
>- Record all transactions with the Rancher API? See [API Auditing](#api-auditing)
>

Choose from the following options. Regardless of which install option you choose, prepend your Rancher image tag with your private registry URL (`<REGISTRY.YOURDOMAIN.COM:PORT>`).


{{% accordion id="option-a" label="Option A-Default Self-Signed Certificate" %}}

If you are installing Rancher in a development or testing environment where identity verification isn't a concern, install Rancher using the self-signed certificate that it generates. This installation option omits the hassle of generating a certificate yourself.

Log into your Linux host, and then run the minimum installation command below.

>**Air Gap User?** [Add your private registry URL]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/#add-private-registry-url-to-run-command) before the `rancher/rancher` image.

    docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>


{{% /accordion %}}
{{% accordion id="option-b" label="Option B-Bring Your Own Certificate: Self-Signed" %}}
In development or testing environments where your team will access your Rancher server, create a self-signed certificate for use with your install so that your team can verify they're connecting to your instance of Rancher.

>**Prerequisites:**
>Create a self-signed certificate using [OpenSSL](https://www.openssl.org/) or another method of your choice.
>
>- The certificate files must be in [PEM format](#pem).
>- In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [SSL FAQ / Troubleshooting](#cert-order).

After creating your certificate, run the Docker command below to install Rancher. Use the `-v` flag and provide the path to your certificates to mount them in your container.

- Replace `<CERT_DIRECTORY>` with the directory path to your certificate file.
- Replace `<FULL_CHAIN.pem>`,`<PRIVATE_KEY.pem>`, and `<CA_CERTS>` with your certificate names.

>**Air Gap User?** [Add your private registry URL]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/#add-private-registry-url-to-run-command) before the `rancher/rancher` image.


    docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
    -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    -v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
    

{{% /accordion %}}
{{% accordion id="option-c" label="Option C-Bring Your Own Certificate: Signed by Recognized CA" %}}

In production environments where you're exposing an app publicly, use a certificate signed by a recognized CA so that your user base doesn't encounter security warnings.

>**Prerequisite:** The certificate files must be in [PEM format](#pem).

After obtaining your certificate, run the Docker command below.

- Use the `-v` flag and provide the path to your certificates to mount them in your container. Because your certificate is signed by a recognized CA, mounting an additional CA certificate file is unnecessary.

	- Replace `<CERT_DIRECTORY>` with the directory path to your certificate file.
	- Replace `<FULL_CHAIN.pem>` and `<PRIVATE_KEY.pem>` with your certificate names.

- Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

>**Air Gap User?** [Add your private registry URL]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/#add-private-registry-url-to-run-command) before the `rancher/rancher` image.


    docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
	-v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG> --no-cacerts

{{% /accordion %}}
{{% accordion id="option-d" label="Option D-Let's Encrypt Certificate" %}}

For production environments, you also have the options of using [Let's Encrypt](https://letsencrypt.org/) certificates. Let's Encrypt uses an http-01 challenge to verify that you have control over your domain. You can confirm that you control the domain by pointing the hostname that you want to use for Rancher access (for example, `rancher.mydomain.com`) to the IP of the machine it is running on. You can bind the hostname to the IP address by creating an A record in DNS.

>**Prerequisites:**
>
>- Let's Encrypt is an Internet service. Therefore, this option cannot be used in an internal/air gapped network.
>- Create a record in your DNS that binds your Linux host IP address to the hostname that you want to use for Rancher access (`rancher.mydomain.com` for example).
>- Open port `TCP/80` on your Linux host. The Let's Encrypt http-01 challenge can come from any source IP address, so port `TCP/80` must be open to all IP addresses.


After you fulfill the prerequisites, you can install Rancher using a Let's Encrypt certificate by running the following command. Replace `<YOUR.DNS.NAME>` with your your domain.

>**Air Gap User?** [Add your private registry URL]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/#add-private-registry-url-to-run-command) before the `rancher/rancher` image.


    docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
    --acme-domain <YOUR.DNS.NAME>
    
>**Remember:** Let's Encrypt provides rate limits for requesting new certificates. Therefore, limit how often you create or destroy the container. For more information, see [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).
{{% /accordion %}}

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