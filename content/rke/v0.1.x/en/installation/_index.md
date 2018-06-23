---
title: Installation
weight: 50
---

RKE is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts. You can get started in a couple of quick and easy steps:

1. [Download the RKE Binary](#download-the-rke-bindary)
2. [Prepare the Nodes for the Kubernetes Cluster](#prepare-the-nodes-for-the-kubernetes-cluster)
3. [Creating the Cluster Configuration File](#creating-the-cluster-configuration-file)
4. [Deploying Kubernetes with RKE](#deploying-kubernetes-with-rke)
5. [Interacting with your Kubernetes Cluster](#interacting-with-your-kubernetes-cluster)

## Download the RKE binary

1. From your workstation, open a web browser and navigate to our [RKE Releases](https://github.com/rancher/rke/releases/latest) page. Download the latest RKE installer applicable to your Operating System:

    - **MacOS**: `rke_darwin-amd64`
    - **Linux**: `rke_linux-amd64`
    - **Windows**: `rke_windows-amd64.exe`

2. Make the RKE binary that you just downloaded executable. Open Terminal, change directory to the location of the RKE binary, and then run one of the commands below.

    >**Using Windows?**
    >The file is already an executable. Skip to [Prepare the Nodes for the Kubernetes Cluster](#prepare-the-nodes-for-the-kubernetes-cluster).

    ```
    # MacOS
    $ chmod +x rke_darwin-amd64
    # Linux
    $ chmod +x rke_linux-amd64
    ```

3.  Confirm that RKE is now executable by running the following command:

    ```
    # MacOS
    $ ./rke_darwin-amd64 --version
    # Linux
    $ ./rke_linux-amd64 --version
    ```

## Prepare the Nodes for the Kubernetes cluster

The Kubernetes cluster components are launched using Docker on a Linux distro. You can use any Linux you want, as long as you can install Docker on it.

Review the [OS requirements]({{< baseurl >}}/rke/v0.1.x/en/installation/os/) and configure each node appropriately.

## Creating the Cluster Configuration File

RKE uses a cluster configuration file, referred to as `cluster.yml` to determine what nodes will be in the cluster and how to deploy Kubernetes. There are [many configuration options]({{< baseurl >}}/rke/v0.1.x/en/config-options/) that can be set in the `cluster.yml`. In our example, we will be assuming the minimum of one [node]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes) for your Kubernetes cluster.

There are two easy ways to create a `cluster.yml`:

- Using our [minimal `cluster.yml`]({{< baseurl >}}/rke/v0.1.x/en/config-options/example-yamls/#minimal-cluster-yml-example) and updating it based on the node that you will be using.
- Using `rke config` to query for all the information needed.

### Using `rke config`

To create a new `cluster.yml`, run `rke config` and this command prompts you for all the information needed to build your cluster. Review [our cluster configuration options]({{< baseurl >}}/rke/v0.1.x/en/config-options/) to understand what each question means.

```
./rke_darwin-amd64 config
```

After answering the list of questions, there is a `cluster.yml` created in the directory where you launched the `rke config` command. After the `cluster.yml` is created, you can edit the file to make any changes.

#### Creating a Basic `cluster.yml`
```
$ rke config --name cluster.yml
```

After answering the list of questions, there is a `cluster.yml` created in the directory where you launched the `rke config` command.

#### Creating an Empty `cluster.yml`

If you want an empty `cluster.yml` template, you can use the `--empty` flag so that a template is produced, but there are no values in the template.

```
$ rke config --empty --name cluster.yml
```

#### Printing the `cluster.yml`

Instead of creating a file, you can print the generated configuration to stdout using the `--print` flag.

```
$ rke config --print
```

### High Availability

RKE is HA ready, you can specify more than one `controlplane` node in the `cluster.yml` file. RKE will deploy master components on all of these nodes and the kubelets are configured to connect to `127.0.0.1:6443` by default which is the address of `nginx-proxy` service that proxy requests to all master nodes.

To create an HA cluster, specify more than one host with role `controlplane`.

## Deploying Kubernetes with RKE

After you've created your `cluster.yml`, you can deploy your cluster with a simple command. This command assumes the `cluster.yml` file is in the same directory as where you are running the command.

```
# MacOS
$ ./rke_darwin-amd64 up
# Linux
$ ./rke_linux-amd64 up
```

There will be log statements as the Kubernetes cluster is created.

```
$ ./rke_darwin-amd64 up
INFO[0000] Building Kubernetes cluster
INFO[0000] [dialer] Setup tunnel for host [10.0.0.1]
INFO[0000] [network] Deploying port listener containers
INFO[0000] [network] Pulling image [alpine:latest] on host [10.0.0.1]
...
INFO[0101] Finished building Kubernetes cluster successfully
```

The last line should read `Finished building Kubernetes cluster successfully` to indicate that your cluster is ready to use. As part of the Kubernetes creation process, a `kubeconfig` file has been created and written at `kube_config_cluster.yml`, which can be used to start interacting your Kubernetes cluster.

### Interacting with your Kubernetes cluster

In order to start interacting with your Kubernetes cluster, you will use a different binary called `kubectl`. You will need to [install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your local machine. You can connect to the RKE created cluster by using the `kube_config_cluster.yml` that was generated when you deployed Kubernetes.

```
# Confirm that kubectl is working by checking the version of your Kubernetes cluster
$ kubectl --kubeconfig kube_config_cluster.yml version
Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.0", GitCommit:"fc32d2f3698e36b93322a3465f63a14e9f0eaead", GitTreeState:"clean", BuildDate:"2018-03-27T00:13:02Z", GoVersion:"go1.9.4", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"8+", GitVersion:"v1.8.9-rancher1", GitCommit:"68595e18f25e24125244e9966b1e5468a98c1cd4", GitTreeState:"clean", BuildDate:"2018-03-13T04:37:53Z", GoVersion:"go1.8.3", Compiler:"gc", Platform:"linux/amd64"}
```

The client and server version are reported, indicating that you have a local `kubectl` client and are able to request the server version from the newly built cluster. Now, you can issue [any kubectl command](https://kubernetes.io/docs/reference/kubectl/kubectl/) to your cluster, like requesting the nodes that are in the cluster.

```
$ kubectl --kubeconfig kube_config_cluster.yml get nodes
NAME            STATUS    ROLES                      AGE       VERSION
10.0.0.1         Ready     controlplane,etcd,worker   35m       v1.10.3-rancher1
```
