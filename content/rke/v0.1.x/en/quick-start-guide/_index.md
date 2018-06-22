---
title: Quick Start Guide
short title: Quick Start
weight: 25
draft: true
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

The Kubernetes cluster components are launched using Docker on a Linux machine. You can use any Linux you want, as long as you can install Docker on it. The most commonly used OS is the current Ubuntu LTS release, 16.04. Kubernetes runs integration tests on the following Docker versions: `1.11.2` to `1.13.1`, and `17.03.x`. We follow these tested Docker versions by marking them as supported.

### Install Docker

You can either follow the [Docker installation](https://docs.docker.com/install/) instructions or you can use one of Rancher's [install scripts](https://github.com/rancher/install-docker) to install Docker.

Docker Version   | Install Script |
----------|------------------
1.11.2  |  <code>curl https://releases.rancher.com/install-docker/1.11.sh &#124; sh</code> |
1.12.6  |  <code>curl https://releases.rancher.com/install-docker/1.12.sh &#124; sh</code> |
1.13.1  | <code>curl https://releases.rancher.com/install-docker/1.13.sh &#124; sh</code> |
17.03.2 |  <code>curl https://releases.rancher.com/install-docker/17.03.sh &#124; sh</code> |

Confirm that a Kubernetes supported version of Docker is installed on your machine, by running  `docker version`.

```bash
$ docker version
Client:
 Version:      17.03.2-ce
 API version:  1.27
 Go version:   go1.7.5
 Git commit:   f5ec1e2
 Built:        Tue Jun 27 03:35:14 2017
 OS/Arch:      linux/amd64

Server:
 Version:      17.03.2-ce
 API version:  1.27 (minimum version 1.12)
 Go version:   go1.7.5
 Git commit:   f5ec1e2
 Built:        Tue Jun 27 03:35:14 2017
 OS/Arch:      linux/amd64
 Experimental: false
```

### Port Requirements

In order for the Kubernetes cluster to be deployed, port `TCP/6443` needs to be opened to the machine. If you are using an external firewall, make sure you have this port opened between the machine you are using to run `rke` and the machine you are going to use in the cluster.

#### Opening port TCP/6443 using `iptables``

```bash
# Open TCP/6443 for all
iptables -A INPUT -p tcp --dport 6443 -j ACCEPT

# Open TCP/6443 for one specific IP
iptables -A INPUT -p tcp -s your_ip_here --dport 6443 -j ACCEPT
```

#### Opening port TCP/6443 using `firewalld`

```bash
# Open TCP/6443 for all
firewall-cmd --zone=public --add-port=6443/tcp --permanent
firewall-cmd --reload

# Open TCP/6443 for one specific IP
firewall-cmd --permanent --zone=public --add-rich-rule='
  rule family="ipv4"
  source address="your_ip_here/32"
  port protocol="tcp" port="6443" accept'
firewall-cmd --reload
```

## Creating the Cluster Configuration File

RKE uses a cluster configuration file, referred to as `cluster.yml` to determine what nodes will be in the cluster and how to deploy Kubernetes. There are [many configuration options]({{< baseurl >}}/rke/v0.1.x/en/config-options/) that can be set in the `cluster.yml`. In our example, we will be assuming the minimum of one [node]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes) for your Kubernetes cluster.

There are two easy ways to create a `cluster.yml`:

- Using our [minimal `cluster.yml`]({{< baseurl >}}/rke/v0.1.x/en/config-options/example-yamls/#minimal-cluster-yml-example) and updating it based on the node that you will be using.
- Using `rke config` to query for all the information needed.

### Using `rke config`

To create a new `cluster.yml`, you can run `rke config` and this command will query for all the information needed to build your cluster. Review [our cluster configuration options]({{< baseurl >}}/rke/v0.1.x/en/config-options/) to understand what each question means. The ones that are required for this quick start guide are in the example below.

> **Note:** As features are added into RKE, the list and order of questions may change.

```bash
./rke_darwin-amd64 config

# This example is using one host
[+] Number of Hosts [1]: 1
# Address where the host is reachable over SSH
[+] SSH Address of host (1) [none]: 10.0.0.1
# SSH Port to use
[+] SSH Port of host (1) [22]: 22
[+] SSH Private Key Path of host (10.0.0.1) [none]:  ~/.ssh/your_rsa_key
# Username to use for the SSH connection
[+] SSH User of host (10.0.0.1) [ubuntu]: root

# We'll be configuring all three roles onto this single host
[+] Is host (10.0.0.1) a control host (y/n)? [y]: y
[+] Is host (10.0.0.1) a worker host (y/n)? [n]: y
[+] Is host (10.0.0.1) an Etcd host (y/n)? [n]: y
```

After answering the list of questions, there is a `cluster.yml` created in the directory where you launched the `rke config` command. After the `cluster.yml` is created, you can edit the file to make any changes.

## Deploying Kubernetes with RKE

After you've created your `cluster.yml`, you can deploy your cluster with a simple command. This command assumes the `cluster.yml` file is in the same directory as where you are running the command.

```
# MacOS
$ ./rke_darwin-amd64 up
# Linux
$ ./rke_linux-amd64 up
```

There will be log statements as the Kubernetes cluster is created.

```bash
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

```bash
# Confirm that kubectl is working by checking the version of your Kubernetes cluster
$ kubectl --kubeconfig kube_config_cluster.yml version
Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.0", GitCommit:"fc32d2f3698e36b93322a3465f63a14e9f0eaead", GitTreeState:"clean", BuildDate:"2018-03-27T00:13:02Z", GoVersion:"go1.9.4", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"8+", GitVersion:"v1.8.9-rancher1", GitCommit:"68595e18f25e24125244e9966b1e5468a98c1cd4", GitTreeState:"clean", BuildDate:"2018-03-13T04:37:53Z", GoVersion:"go1.8.3", Compiler:"gc", Platform:"linux/amd64"}
```

The client and server version are reported, indicating that you have a local `kubectl` client and are able to request the server version from the newly built cluster. Now, you can issue any command to your cluster, like requesting the nodes that are in the cluster.

```bash
$ kubectl --kubeconfig kube_config_cluster.yml get nodes
NAME            STATUS    ROLES                      AGE       VERSION
10.0.0.1         Ready     controlplane,etcd,worker   35m       v1.10.3-rancher1
```
