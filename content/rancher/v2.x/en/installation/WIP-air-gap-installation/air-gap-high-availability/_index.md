---
title: "Air Gap: High Availability Install"
weight:
---

## Outline

<!-- TOC -->

- [Outline](#outline)
- [Prerequisites](#prerequisites)
- [Caveats](#caveats)
- [1. Provision Three Linux Hosts and Load Balancer](#1-provision-three-linux-hosts-and-load-balancer)
    - [Host Requirements](#host-requirements)
    - [Recommended Architecture](#recommended-architecture)
    - [Required Tools](#required-tools)
    - [Load Balancer](#load-balancer)
- [2. Collect and Publish Image Sources](#2-collect-and-publish-image-sources)
- [3. Create an RKE Config File](#3-create-an-rke-config-file)
    - [Common RKE Nodes Options](#common-rke-nodes-options)
- [4. Run RKE](#4-run-rke)
- [5. Initialize Helm and Render Templates](#5-initialize-helm-and-render-templates)
- [6. Optional: Install Cert-Manager](#6-optional-install-cert-manager)
- [7. Install Rancher](#7-install-rancher)
- [8. Copy and Apply Manifests](#8-copy-and-apply-manifests)
- [9. Configure Rancher for the Private Registry](#9-configure-rancher-for-the-private-registry)

<!-- /TOC -->

## Prerequisites

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).


## Caveats

In versions of Rancher prior to v2.1.0, registries with authentication are not supported when installing Rancher in HA or provisioning clusters, but after clusters are provisioned, registries with authentication can be used in the Kubernetes clusters.

As of v2.1.0, registries with authentication work for installing Rancher as well as provisioning clusters.


## 1. Provision Three Linux Hosts and Load Balancer

Provision three air gapped Linux hosts according to our requirements below to launch Rancher in an HA configuration.

These hosts should be disconnected from the internet, but should have connectivity with your private registry.

### Host Requirements
View hardware and software requirements for each of your cluster nodes in [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

### Recommended Architecture

- DNS for Rancher should resolve to a layer 4 load balancer
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>HA Rancher install with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)

### Required Tools

The following CLI tools are required for this install. Please make sure these tools are installed and available in your `$PATH`

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
* [rke]({{< baseurl >}}/rke/v0.1.x/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes.


### Load Balancer

RKE, the installer that provisions your air gapped cluster, will configure an Ingress controller pod on each of your nodes. The Ingress controller pods are bound to ports TCP/80 and TCP/443 on the host network and are the entry point for HTTPS traffic to the Rancher server.

Configure a load balancer as a basic Layer 4 TCP forwarder. The exact configuration will vary depending on your environment.


## 2. Collect and Publish Image Sources

Using a computer with internet access, browse to our Rancher [releases page](https://github.com/rancher/rancher/releases) and find the version that you want to install in your air gap environment. Download the following three files:


| Release File | Description |
| --- | --- |
| `rancher-images.txt` | Contains a list of all files needed to install Rancher.
| `rancher-save-images.sh` | Pulls all the images in the `rancher-images.txt` from various public registries and saves all of the images as `rancher-images.tar.gz`. |
| `rancher-load-images.sh` | Loads images from the `rancher-images.tar.gz` file and pushes them to your private registry. |


After downloading the release files, publish the images from `rancher-images.txt` to your private registry using the image scripts.

>**Note:** Image publication may require up to 20GB of empty disk space.

1. From Terminal, change directories to the path containing the files listed above.

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


## 3. Create an RKE Config File


From a system that can access ports 22/tcp and 6443/tcp on your host nodes, use the sample below create `rancher-cluster.yml`. This file is a Rancher Kubernetes Engine configuration file (RKE config file), which is a configuration for the cluster you're deploying Rancher to.  Replace the IP Addresses in the `nodes` list with the IP address or DNS names of the 3 nodes you created.

>**Tip:** See [Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/) for more details on the options available.

Replace values in the code sample according to the table below.

| Directive Replacement   | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `address`               | The IP address for each of your air gap nodes outside of the cluster. |
| `internal_address`      | The IP address for each of your air gap nodes within the cluster.     |
| `url`                   | The URL for your private registry.                                    |

> **Note:**  If your node has public and internal addresses, it is recommended to set the `internal_address:` so Kubernetes will use it for intra-cluster communication.  Some services like AWS EC2 require setting the `internal_address:` if you want to use self-referencing security groups or firewalls.

```yaml
nodes:
- address: 18.222.121.187           # air gap node external IP
  internal_address: 172.31.7.22   # air gap node internal IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_file: /home/user/.ssh/id_rsa
- address: 18.220.193.254           # air gap node external IP
  internal_address: 172.31.13.132 # air gap node internal IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_file: /home/user/.ssh/id_rsa
- address: 13.59.83.89              # air gap node external IP
  internal_address: 172.31.3.216  # air gap node internal IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_file: /home/user/.ssh/id_rsa

private_registries:
- url: <REGISTRY.YOURDOMAIN.COM:PORT> # private registry url
  user: rancher
  password: "*********"
  is_default: true
```

### Common RKE Nodes Options

| Option             | Required | Description                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| `address`          | yes      | The public DNS or IP address                                                           |
| `user`             | yes      | A user that can run docker commands                                                    |
| `role`             | yes      | List of Kubernetes roles assigned to the node                                          |
| `internal_address` | no       | The private DNS or IP address for internal cluster traffic                             |
| `ssh_key_path`     | no       | Path to SSH private key used to authenticate to the node (defaults to `~/.ssh/id_rsa`) |

<!-- TODO: add troubleshooting and other links -->

## 4. Run RKE

After configuring `rancher-cluster.yml`, open Terminal and change directories to the RKE binary. Then enter the command below to stand up your high availability cluster.

```
rke up --config ./rancher-cluster.yml
```

## 5. Initialize Helm and Render Templates


Instead of installing the `tiller` agent on the cluster, render the installs on a system that has access to the internet and copy resulting manifests to a system that has access to the Rancher server cluster.

Initialize `helm` locally on a system that has internet access.

```plain
helm init -c
```

Then, using the same system, fetch and render the `helm` charts.

## 6. Optional: Install Cert-Manager

If you are installing Rancher with its self-signed certificates, you will need to install 'cert-manager' on your cluster. If you are installing your own certificates you may skip this section.

From a system connected to the internet, fetch the latest `cert-manager` chart available from thea [official Helm chart repository](https://github.com/helm/charts/tree/master/stable).

```plain
helm fetch stable/cert-manager
```

Render the template with the option you would use to install the chart. Remember to set the `image.repository` option to pull the image from your private registry. This will create a `cert-manager` directory with the Kubernetes manifest files.

```plain
helm template ./cert-manager-<version>.tgz --output-dir . \
--name cert-manager --namespace kube-system \
--set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
```

## 7. Install Rancher

Add the Helm chart repository that contains charts to install Rancher. Replace `<CHART_REPO>` with the [repository that you're using]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories) (i.e. `latest` or `stable`). Please see the [High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha) guide for additional options and troubleshooting.

```plain
helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
```

Fetch the latest Rancher chart. This will pull down the chart and save it in the current directory as a `.tgz` file. Replace `<CHART_REPO>` with the repo you're using (`latest` or `stable`).

```plain
helm fetch rancher-<CHART_REPO>/rancher
```

Render the template with the options you would use to install the chart. See [Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/) for details on the various options. Remember to set the `rancherImage` option to pull the image from your private registry. This will create a `rancher` directory with the Kubernetes manifest files.

```plain
helm template ./rancher-<version>.tgz --output-dir . \
--name rancher --namespace cattle-system \
--set hostname=<RANCHER.YOURDOMAIN.COM> \
--set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher
```

## 8. Copy and Apply Manifests

Copy the rendered manifest directories to a system that has access to the Rancher server cluster.

Use `kubectl` to create namespaces and apply the rendered manifests.

```plain
kubectl -n kube-system apply -R -f ./cert-manager

kubectl create namespace cattle-system
kubectl -n cattle-system apply -R -f ./rancher
```

Make sure you follow any additional instructions required by SSL install options. See [Choose your SSL Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#choose-your-ssl-configuration) for details.

## 9. Configure Rancher for the Private Registry

Rancher needs to be configured to use the private registry in order to provision any [Rancher launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) or [Rancher tools]({{< baseurl >}}/rancher/v2.x/en/tools/) .

1. Log into Rancher and configure the default admin password.

1. Go into the **Settings** view.

    ![Settings]({{< baseurl >}}/img/rancher/airgap/settings.png)

1. Look for the setting called `system-default-registry` and choose **Edit**.

    ![Edit]({{< baseurl >}}/img/rancher/airgap/edit-system-default-registry.png)

1. Change the value to your registry (e.g. `registry.yourdomain.com:port`). Do not prefix the registry with `http://` or `https://`.

    ![Save]({{< baseurl >}}/img/rancher/airgap/enter-system-default-registry.png)

>**Note:** If you want to configure the setting when starting the rancher/rancher container, you can use the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.
