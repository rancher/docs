---
title: Installation
weight: 50
---

RKE is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts. You can get started in a couple of quick and easy steps:

1. [Download the RKE Binary](#download-the-rke-binary)
2. [Prepare the Nodes for the Kubernetes Cluster](#prepare-the-nodes-for-the-kubernetes-cluster)
3. [Creating the Cluster Configuration File](#creating-the-cluster-configuration-file)
4. [Deploying Kubernetes with RKE](#deploying-kubernetes-with-rke)
5. [Interacting with your Kubernetes Cluster](#interacting-with-your-kubernetes-cluster)

## Download the RKE binary

1. From your workstation, open a web browser and navigate to our [RKE Releases](https://github.com/rancher/rke/releases/latest) page. Download the latest RKE installer applicable to your Operating System and Architecture:

    - **MacOS**: `rke_darwin-amd64`
    - **Linux (Intel/AMD)**: `rke_linux-amd64`
    - **Linux (ARM 32-bit)**: `rke_linux-arm`
    - **Linux (ARM 64-bit)**: `rke_linux-arm64`
    - **Windows (32-bit)**: `rke_windows-386.exe`
    - **Windows (64-bit)**: `rke_windows-amd64.exe`

2. Copy the RKE binary to a folder in your `$PATH` and rename it `rke` (or `rke.exe` for Windows)

    ```
    # MacOS
    $ mv rke_darwin-amd64 rke
    # Linux
    $ mv rke_linux-amd64 rke
    # Windows PowerShell
    > mv rke_windows-amd64.exe rke.exe
    ```

3. Make the RKE binary that you just downloaded executable. Open Terminal, change directory to the location of the RKE binary, and then run one of the commands below.

    >**Using Windows?**
    >The file is already an executable. Skip to [Prepare the Nodes for the Kubernetes Cluster](#prepare-the-nodes-for-the-kubernetes-cluster).

    ```
    $ chmod +x rke
    ```

4.  Confirm that RKE is now executable by running the following command:

    ```
    $ rke --version
    ```

## Prepare the Nodes for the Kubernetes cluster

The Kubernetes cluster components are launched using Docker on a Linux distro. You can use any Linux you want, as long as you can install Docker on it.

Review the [OS requirements]({{< baseurl >}}/rke/v0.1.x/en/installation/os/) and configure each node appropriately.

## Creating the Cluster Configuration File

RKE uses a cluster configuration file, referred to as `cluster.yml` to determine what nodes will be in the cluster and how to deploy Kubernetes. There are [many configuration options]({{< baseurl >}}/rke/v0.1.x/en/config-options/) that can be set in the `cluster.yml`. In our example, we will be assuming the minimum of one [node]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes) for your Kubernetes cluster.

There are two easy ways to create a `cluster.yml`:

- Using our [minimal `cluster.yml`]({{< baseurl >}}/rke/v0.1.x/en/example-yamls/#minimal-cluster-yml-example) and updating it based on the node that you will be using.
- Using `rke config` to query for all the information needed.

### Using `rke config`

Run `rke config` to create a new `cluster.yml` in the current directory. This command will prompt you for all the information needed to build a cluster. See [cluster configuration options]({{< baseurl >}}/rke/v0.1.x/en/config-options/) for details on the various options.

```
rke config --name cluster.yml
```

#### Creating an Empty `cluster.yml`

You can create an empty template `cluster.yml` file by specifying the `--empty` flag.

```
rke config --empty --name cluster.yml
```

#### Printing the `cluster.yml`

Instead of creating a file, you can print the generated configuration to stdout using the `--print` flag.

```
rke config --print
```

### High Availability

RKE is HA ready, you can specify more than one `controlplane` node in the `cluster.yml` file. RKE will deploy master components on all of these nodes and the kubelets are configured to connect to `127.0.0.1:6443` by default which is the address of `nginx-proxy` service that proxy requests to all master nodes.

To create an HA cluster, specify more than one host with role `controlplane`.

## Deploying Kubernetes with RKE

After you've created your `cluster.yml`, you can deploy your cluster with a simple command. This command assumes the `cluster.yml` file is in the same directory as where you are running the command.

```
rke up

INFO[0000] Building Kubernetes cluster
INFO[0000] [dialer] Setup tunnel for host [10.0.0.1]
INFO[0000] [network] Deploying port listener containers
INFO[0000] [network] Pulling image [alpine:latest] on host [10.0.0.1]
...
INFO[0101] Finished building Kubernetes cluster successfully
```

The last line should read `Finished building Kubernetes cluster successfully` to indicate that your cluster is ready to use. As part of the Kubernetes creation process, a `kubeconfig` file has been created and written at `kube_config_cluster.yml`, which can be used to start interacting with your Kubernetes cluster.

> **Note:** If you have used a different file name from `cluster.yml`, then the kube config file will be named `kube_config_<FILE_NAME>.yml`.

### Certificates

_Available as of v0.2.0_

By default, Kubernetes clusters require certificates and RKE auto-generates the certificates for all cluster components. You can also use [custom certificates]({{< baseurl >}}/rke/v0.1.x/en/installation/certs/). After the Kubernetes cluster is deployed, you can [manage these auto-generated certificates]({{< baseurl >}}/rke/v0.1.x/en/cert-mgmt/#certifcate-rotation).

### Kubernetes Cluster State

The Kubernetes cluster state, which consists of the cluster configuration file `cluster.yml` and components certificates in Kubernetes cluster, is saved by RKE, but depending on your RKE version, the cluster state is saved differently.

As of v0.2.0, RKE creates a `.rkestate` file in the same directory that has the cluster configuration file `cluster.yml`. The `.rkestate` file contains the current state of the cluster including the RKE configuration and the certificates. It is required to keep this file in order to update the cluster or perform any operation on it through RKE.

```
$ tree -L 1
.
├── cluster.rkestate
├── cluster.yml
├── kube_config_cluster.yml
```

Prior to v0.2.0, RKE saved the Kubernetes cluster state as a secret. When updating the state, RKE pulls the secret, updates/changes the state and saves a new secret.   

## Interacting with your Kubernetes cluster

After your cluster is up and running, you can start using the [generated kubeconfig file]({{< baseurl >}}/rke/v0.1.x/en/kubeconfig) to start interacting with your Kubernetes cluster using `kubectl`.

After installation, there are several maintenance items that might arise:

* [Certificate Management]({{< baseurl >}}/rke/v0.1.x/en/cert-mgmt/)
* [Adding and Removing Nodes in the cluster]({{< baseurl >}}/rke/v0.1.x/en/managing-clusters)
