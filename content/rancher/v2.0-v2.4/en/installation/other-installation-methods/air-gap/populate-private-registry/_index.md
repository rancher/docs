---
title: '2. Collect and Publish Images to your Private Registry'
weight: 200
aliases:
  - /rancher/v2.0-v2.4/en/installation/air-gap-high-availability/prepare-private-registry/
  - /rancher/v2.0-v2.4/en/installation/air-gap-single-node/prepare-private-registry/
  - /rancher/v2.0-v2.4/en/installation/air-gap-single-node/config-rancher-for-private-reg/
  - /rancher/v2.0-v2.4/en/installation/air-gap-high-availability/config-rancher-for-private-reg/
---

This section describes how to set up your private registry so that when you install Rancher, Rancher will pull all the required images from this registry.

By default, all images used to [provision Kubernetes clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/) or launch any [tools]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/) in Rancher, e.g. monitoring, pipelines, alerts, are pulled from Docker Hub. In an air gapped installation of Rancher, you will need a private registry that is located somewhere accessible by your Rancher server. Then, you will load the registry with all the images.

Populating the private registry with images is the same process for installing Rancher with Docker and for installing Rancher on a Kubernetes cluster.

The steps in this section differ depending on whether or not you are planning to use Rancher to provision a downstream cluster with Windows nodes or not. By default, we provide the steps of how to populate your private registry assuming that Rancher will provision downstream Kubernetes clusters with only Linux nodes. But if you plan on provisioning any [downstream Kubernetes clusters using Windows nodes]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/windows-clusters/), there are separate instructions to support the images needed.

> **Prerequisites:**
>
> You must have a [private registry](https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry) available to use.
>
> If the registry has certs, follow [this K3s documentation](https://rancher.com/docs/k3s/latest/en/installation/private-registry/) about adding a private registry. The certs and registry configuration files need to be mounted into the Rancher container.

{{% tabs %}}
{{% tab "Linux Only Clusters" %}}

For Rancher servers that will only provision Linux clusters, these are the steps to populate your private registry.

1. [Find the required assets for your Rancher version](#1-find-the-required-assets-for-your-rancher-version)
2. [Collect the cert-manager image](#2-collect-the-cert-manager-image) (unless you are bringing your own certificates or terminating TLS on a load balancer)
3. [Save the images to your workstation](#3-save-the-images-to-your-workstation)
4. [Populate the private registry](#4-populate-the-private-registry)

### Prerequisites

These steps expect you to use a Linux workstation that has internet access, access to your private registry, and at least 20 GB of disk space.

If you will use ARM64 hosts, the registry must support manifests. As of April 2020, Amazon Elastic Container Registry does not support manifests.

### 1. Find the required assets for your Rancher version

1. Go to our [releases page,](https://github.com/rancher/rancher/releases) find the Rancher v2.x.x release that you want to install, and click **Assets.** Note: Don't use releases marked `rc` or `Pre-release`, as they are not stable for production environments.

2. From the release's **Assets** section, download the following files, which are required to install Rancher in an air gap environment:

| Release File   | Description  |
| ---------------- | -------------- |
| `rancher-images.txt`     | This file contains a list of images needed to install Rancher, provision clusters and user Rancher tools. |
| `rancher-save-images.sh` | This script pulls all the images in the `rancher-images.txt` from Docker Hub and saves all of the images as `rancher-images.tar.gz`. |
| `rancher-load-images.sh` | This script loads images from the `rancher-images.tar.gz` file and pushes them to your private registry.   |

### 2. Collect the cert-manager image

> Skip this step if you are using your own certificates, or if you are terminating TLS on an external load balancer.

In a Kubernetes Install, if you elect to use the Rancher default self-signed TLS certificates, you must add the [`cert-manager`](https://hub.helm.sh/charts/jetstack/cert-manager) image to `rancher-images.txt` as well. 

1.  Fetch the latest `cert-manager` Helm chart and parse the template for image details:

    > **Note:** Recent changes to cert-manager require an upgrade. If you are upgrading Rancher and using a version of cert-manager older than v0.12.0, please see our [upgrade documentation]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/upgrading-cert-manager/).

    ```plain
    helm repo add jetstack https://charts.jetstack.io
    helm repo update
    helm fetch jetstack/cert-manager --version v1.0.4
    helm template ./cert-manager-<version>.tgz | grep -oP '(?<=image: ").*(?=")' >> ./rancher-images.txt
    ```

2.  Sort and unique the images list to remove any overlap between the sources:

    ```plain
    sort -u rancher-images.txt -o rancher-images.txt
    ```

### 3. Save the images to your workstation

1. Make `rancher-save-images.sh` an executable:
   ```
   chmod +x rancher-save-images.sh
   ```

1. Run `rancher-save-images.sh` with the `rancher-images.txt` image list to create a tarball of all the required images:
   ```plain
   ./rancher-save-images.sh --image-list ./rancher-images.txt
   ```
   **Result:** Docker begins pulling the images used for an air gap install. Be patient. This process takes a few minutes. When the process completes, your current directory will output a tarball named `rancher-images.tar.gz`. Check that the output is in the directory.

### 4. Populate the private registry

Next, you will move the images in the `rancher-images.tar.gz` to your private registry using the scripts to load the images.

Move the images in the `rancher-images.tar.gz` to your private registry using the scripts to load the images.

The `rancher-images.txt` is expected to be on the workstation in the same directory that you are running the `rancher-load-images.sh` script. The `rancher-images.tar.gz` should also be in the same directory.

1.  Log into your private registry if required:
   ```plain
   docker login <REGISTRY.YOURDOMAIN.COM:PORT>
   ```
1.  Make `rancher-load-images.sh` an executable:
   ```
   chmod +x rancher-load-images.sh
   ```

1.  Use `rancher-load-images.sh` to extract, tag and push `rancher-images.txt` and `rancher-images.tar.gz` to your private registry:
   ```plain
   ./rancher-load-images.sh --image-list ./rancher-images.txt --registry <REGISTRY.YOURDOMAIN.COM:PORT>
   ```
{{% /tab %}}
{{% tab "Linux and Windows Clusters" %}}

_Available as of v2.3.0_

For Rancher servers that will provision Linux and Windows clusters, there are distinctive steps to populate your private registry for the Windows images and the Linux images. Since a Windows cluster is a mix of Linux and Windows nodes, the Linux images pushed into the private registry are manifests.

# Windows Steps

The Windows images need to be collected and pushed from a Windows server workstation.

1. <a href="#windows-1">Find the required assets for your Rancher version</a>
2. <a href="#windows-2">Save the images to your Windows Server workstation</a>
3. <a href="#windows-3">Prepare the Docker daemon</a>
4. <a href="#windows-4">Populate the private registry</a>

### Prerequisites

These steps expect you to use a Windows Server 1809 workstation that has internet access, access to your private registry, and at least 50 GB of disk space.

The workstation must have Docker 18.02+ in order to support manifests, which are required when provisioning Windows clusters.

Your registry must support manifests. As of April 2020, Amazon Elastic Container Registry does not support manifests.

<a name="windows-1"></a>

### 1. Find the required assets for your Rancher version

1. Browse to our [releases page](https://github.com/rancher/rancher/releases) and find the Rancher v2.x.x release that you want to install. Don't download releases marked `rc` or `Pre-release`, as they are not stable for production environments.

2. From the release's "Assets" section, download the following files:

| Release File                 | Description      |
|----------------------------|------------------|
| `rancher-windows-images.txt` | This file contains a list of Windows images needed to provision Windows clusters.                                                                    |
| `rancher-save-images.ps1`    | This script pulls all the images in the `rancher-windows-images.txt` from Docker Hub and saves all of the images as `rancher-windows-images.tar.gz`. |
| `rancher-load-images.ps1`    | This script loads the images from the `rancher-windows-images.tar.gz` file and pushes them to your private registry.                                 |

<a name="windows-2"></a>

### 2. Save the images to your Windows Server workstation

1. Using `powershell`, go to the directory that has the files that were downloaded in the previous step.

1. Run `rancher-save-images.ps1` to create a tarball of all the required images:
   ```plain
   ./rancher-save-images.ps1
   ```

   **Result:** Docker begins pulling the images used for an air gap install. Be patient. This process takes a few minutes. When the process completes, your current directory will output a tarball named `rancher-windows-images.tar.gz`. Check that the output is in the directory.

<a name="windows-3"></a>

### 3. Prepare the Docker daemon

Append your private registry address to the `allow-nondistributable-artifacts` config field in the Docker daemon (`C:\ProgramData\Docker\config\daemon.json`). Since the base image of Windows images are maintained by the `mcr.microsoft.com` registry, this step is required as the layers in the Microsoft registry are missing from Docker Hub and need to be pulled into the private registry.

   ```
   {
     ...
     "allow-nondistributable-artifacts": [
       ...
       "<REGISTRY.YOURDOMAIN.COM:PORT>"
     ]
     ...
   }
   ```

<a name="windows-4"></a>

### 4. Populate the private registry

Move the images in the `rancher-windows-images.tar.gz` to your private registry using the scripts to load the images.

The `rancher-windows-images.txt` is expected to be on the workstation in the same directory that you are running the `rancher-load-images.ps1` script. The `rancher-windows-images.tar.gz` should also be in the same directory.

1. Using `powershell`, log into your private registry if required:
   ```plain
   docker login <REGISTRY.YOURDOMAIN.COM:PORT>
   ```

1. Using `powershell`, use `rancher-load-images.ps1` to extract, tag and push the images from `rancher-images.tar.gz` to your private registry:
   ```plain
   ./rancher-load-images.ps1 --registry <REGISTRY.YOURDOMAIN.COM:PORT>
   ```

# Linux Steps

The Linux images needs to be collected and pushed from a Linux host, but _must be done after_ populating the Windows images into the private registry. These step are different from the Linux only steps as the Linux images that are pushed will actually manifests that support Windows and Linux images.

1. <a href="#linux-1">Find the required assets for your Rancher version</a>
2. <a href="#linux-2">Collect all the required images</a>
3. <a href="#linux-3">Save the images to your Linux workstation</a>
4. <a href="#linux-4">Populate the private registry</a>

### Prerequisites

You must populate the private registry with the Windows images before populating the private registry with Linux images. If you have already populated the registry with Linux images, you will need to follow these instructions again as they will publish manifests that support Windows and Linux images.

These steps expect you to use a Linux workstation that has internet access, access to your private registry, and at least 20 GB of disk space.

The workstation must have Docker 18.02+ in order to support manifests, which are required when provisioning Windows clusters.

<a name="linux-1"></a>

### 1. Find the required assets for your Rancher version

1. Browse to our [releases page](https://github.com/rancher/rancher/releases) and find the Rancher v2.x.x release that you want to install. Don't download releases marked `rc` or `Pre-release`, as they are not stable for production environments. Click **Assets.**

2. From the release's **Assets** section, download the following files:

| Release File                 | Description    |
|----------------------------| -------------------------- |
| `rancher-images.txt`         | This file contains a list of images needed to install Rancher, provision clusters and user Rancher tools.           |
| `rancher-windows-images.txt` | This file contains a list of images needed to provision Windows clusters.                                                            |
| `rancher-save-images.sh`     | This script pulls all the images in the `rancher-images.txt` from Docker Hub and saves all of the images as `rancher-images.tar.gz`. |
| `rancher-load-images.sh`     | This script loads images from the `rancher-images.tar.gz` file and pushes them to your private registry.                             |

<a name="linux-2"></a>

### 2. Collect all the required images

**For Kubernetes Installs using Rancher Generated Self-Signed Certificate:** In a Kubernetes Install, if you elect to use the Rancher default self-signed TLS certificates, you must add the [`cert-manager`](https://hub.helm.sh/charts/jetstack/cert-manager) image to `rancher-images.txt` as well. You skip this step if you are using you using your own certificates.

1. Fetch the latest `cert-manager` Helm chart and parse the template for image details:
   > **Note:** Recent changes to cert-manager require an upgrade. If you are upgrading Rancher and using a version of cert-manager older than v0.12.0, please see our [upgrade documentation]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/upgrading-cert-manager/).
   ```plain
   helm repo add jetstack https://charts.jetstack.io
   helm repo update
   helm fetch jetstack/cert-manager --version v0.12.0
   helm template ./cert-manager-<version>.tgz | grep -oP '(?<=image: ").*(?=")' >> ./rancher-images.txt
   ```

2. Sort and unique the images list to remove any overlap between the sources:
   ```plain
   sort -u rancher-images.txt -o rancher-images.txt
   ```

<a name="linux-3"></a>

### 3. Save the images to your workstation

1. Make `rancher-save-images.sh` an executable:
   ```
   chmod +x rancher-save-images.sh
   ```

1. Run `rancher-save-images.sh` with the `rancher-images.txt` image list to create a tarball of all the required images:
   ```plain
   ./rancher-save-images.sh --image-list ./rancher-images.txt
   ```

**Result:** Docker begins pulling the images used for an air gap install. Be patient. This process takes a few minutes. When the process completes, your current directory will output a tarball named `rancher-images.tar.gz`. Check that the output is in the directory.

<a name="linux-4"></a>

### 4. Populate the private registry

Move the images in the `rancher-images.tar.gz` to your private registry using the `rancher-load-images.sh script` to load the images.

The image list, `rancher-images.txt` or `rancher-windows-images.txt`, is expected to be on the workstation in the same directory that you are running the `rancher-load-images.sh` script. The `rancher-images.tar.gz` should also be in the same directory.

1. Log into your private registry if required:

```plain
docker login <REGISTRY.YOURDOMAIN.COM:PORT>
```

1. Make `rancher-load-images.sh` an executable:

```
chmod +x rancher-load-images.sh
```

1. Use `rancher-load-images.sh` to extract, tag and push the images from `rancher-images.tar.gz` to your private registry:

```plain
./rancher-load-images.sh --image-list ./rancher-images.txt \
   --windows-image-list ./rancher-windows-images.txt \
   --registry <REGISTRY.YOURDOMAIN.COM:PORT>
```


{{% /tab %}}
{{% /tabs %}}

### [Next step for Kubernetes Installs - Launch a Kubernetes Cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/launch-kubernetes/)

### [Next step for Docker Installs - Install Rancher]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/install-rancher/)
