---
title: Installation
weight: 50
draft: true
---

<!-- Mohamed: Refer to the blog to see how this could be better written-->

## Requirements

- Docker versions `1.11.2` up to `1.13.1` and `17.03.x` are validated for Kubernetes versions 1.8, 1.9 and 1.10
- OpenSSH 7.0+ must be installed on each node for stream local forwarding to work.
- The SSH user used for node access must be a member of the `docker` group:

```bash
usermod -aG docker <user_name>
```

- Ports 6443, 2379, and 2380 should be opened between cluster nodes.
- Swap disabled on worker nodes.

### Download the rke binary

Browse to the [latest release](https://github.com/rancher/rke/releases/latest) and download `rke_darwin-amd64` for MacOS and `rke_linux-amd64` if you use a Linux machine.

When you have downloaded the binary, you can make it executable by running `chmod +x rke_darwin-amd64` or `chmod +x rke_linux-amd64`.

After, you can test if it's executable by running `./rke_darwin-amd64 -version` or `./rke_linux-amd64 -version`.

```bash
$ chmod +x rke_darwin-amd64
$ ./rke_darwin-amd64 -version
rke version v0.1.5
```

### Preparing Linux machines to be used in the cluster

The Kubernetes cluster components are launched using Docker on a Linux machine. You can use any Linux you want, as long as you can install Docker on it. The most commonly used OS is the current Ubuntu LTS release, 16.04. Kubernetes runs integration tests on the following Docker versions: `1.11.2` to `1.13.1`, and `17.03.x`. We follow these tested Docker versions by marking them as supported. To make installing Docker easy, we've created `install-docker` scripts. Pick the version you want to install and run the command in the `Install Script` column to install it.

Version   | Supported? | Install Script |
----------|------------|------------------
`1.11.2`  | Yes        | <code>curl https://releases.rancher.com/install-docker/1.11.sh &#124; sh</code> |
`1.12.6`  | Yes        | <code>curl https://releases.rancher.com/install-docker/1.12.sh &#124; sh</code> |
`1.13.1`  | Yes        | <code>curl https://releases.rancher.com/install-docker/1.13.sh &#124; sh</code> |
`17.03.2` | Yes        | <code>curl https://releases.rancher.com/install-docker/17.03.sh &#124; sh</code> |

You can test if Docker is installed correctly by running `docker version`, it should show the client and server version.

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

To connect to the Kubernetes cluster, port `TCP/6443` needs to be opened to the machine. If you are using an external firewall, make sure you have this opened between the machine you are using to run `rke` and the machine you are going to use in the cluster. If you are using `iptables` or `firewalld`, you can use the following commands:

Example opening port TCP/6443 using `iptables`

```bash
# Open TCP/6443 for all
iptables -A INPUT -p tcp --dport 6443 -j ACCEPT

# Open TCP/6443 for one specific IP
iptables -A INPUT -p tcp -s your_ip_here --dport 6443 -j ACCEPT
```

Example opening port TCP/6443 using `firewalld`

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

### Creating `cluster.yml` and Kubernetes cluster

For this quick start, we will be configuring one machine. There are 3 roles you can define on a machine:

Role   | Description |
----------|----------|
etcd  | Keeps the state of your cluster and is the most important component in your cluster, single source of truth of your cluster. |
controlplane  | Responsible of running all the master components of your cluster, like the `kube-apiserver`, `controller-manager` and the `scheduler`.  |
worker | Workers will run the actual workloads. |

<br>

To create the `cluster.yml`, you can run `./rke_darwin-amd64 config` or `./rke_linux-amd64 config`. It will query you for all the information needed to build your cluster.

```bash
./rke_darwin-amd64 config
# SSH private key location to use
[+] Cluster Level SSH Private Key Path [~/.ssh/id_rsa]: ~/.ssh/your_rsa_key
# For this example we'll be using one host
[+] Number of Hosts [1]:
# Address where the host is reachable over SSH
[+] SSH Address of host (1) [none]: 10.0.0.1
# SSH Port to use
[+] SSH Port of host (1) [22]:
# You can configure SSH keys per configured host, not needed in this example
[+] SSH Private Key Path of host (10.0.0.1) [none]:
[-] You have entered empty SSH key path, trying fetch from SSH key parameter
[+] SSH Private Key of host (10.0.0.1) [none]:
[-] You have entered empty SSH key, defaulting to cluster level SSH key: ~/.ssh/your_rsa_key
# Username to use for the SSH connection
[+] SSH User of host (10.0.0.1) [ubuntu]: root
# We'll be configuring all three roles onto this single host
[+] Is host (10.0.0.1) a control host (y/n)? [y]: y
[+] Is host (10.0.0.1) a worker host (y/n)? [n]: y
[+] Is host (10.0.0.1) an Etcd host (y/n)? [n]: y
# If you want to override the hostname for this host, you can specify that here
[+] Override Hostname of host (10.0.0.1) [none]:
# If the host has multiple network connections, you can specify a private network connection here
[+] Internal IP of host (10.0.0.1) [none]:
# The location of the Docker socket
[+] Docker socket path on host (10.0.0.1) [/var/run/docker.sock]:
# Network plugin to use for your cluster
[+] Network Plugin Type (flannel, calico, weave, canal) [flannel]:
# We will be using certificates as authentication strategy
[+] Authentication Strategy [x509]:
# RBAC will be turned on
[+] Authorization Mode (rbac, none) [rbac]:
# Images to use for your cluster
[+] Etcd Docker Image [rancher/coreos-etcd:v3.0.17]:
[+] Kubernetes Docker image [rancher/k8s:v1.8.9-rancher1-1]:
# Internal cluster domain to be used
[+] Cluster domain [cluster.local]:
# IP ranges to be used by the clusters
[+] Service Cluster IP Range [10.233.0.0/18]:
# If we want to use PodSecurityPolicy
[+] Enable PodSecurityPolicy [n]:
[+] Cluster Network CIDR [10.233.64.0/18]:
[+] Cluster DNS Service IP [10.233.0.3]:
# The container image to be used by Kubernetes pods
[+] Infra Container image [rancher/pause-amd64:3.0]:
```

There should be a `cluster.yml` created in the directory where you launched the rke command. If you have to correct anything, you can do that directly in the `cluster.yml` file.

If you are satisfied with the configuration, you can start building your cluster by using `./rke_darwin-amd64 up` or `./rke_linux-amd64 up`.

### Using RKE



```bash
$ ./rke_darwin-amd64 up
INFO[0000] Building Kubernetes cluster
INFO[0000] [dialer] Setup tunnel for host [10.0.0.1]
INFO[0000] [network] Deploying port listener containers
INFO[0000] [network] Pulling image [alpine:latest] on host [10.0.0.1]
...
INFO[0101] Finished building Kubernetes cluster successfully
```

The last line should read `Finished building Kubernetes cluster successfully` to indicate that your cluster is ready to use. A kubeconfig file has been written to `kube_config_cluster.yml` to be used to interact with your cluster.

### Interacting with your cluster

The way you interact with your cluster is by the use of a binary called `kubectl`. Before we can issue commands to our cluster, we need to download the `kubectl` binary. Please follow [the intructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on the Kubernetes documentation page to install `kubectl`. You can verify the installation of `kubectl` and the connection to the cluster using `kubectl --kubeconfig kube_config_cluster.yml version`.

```bash
$ kubectl --kubeconfig kube_config_cluster.yml version
Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.0", GitCommit:"fc32d2f3698e36b93322a3465f63a14e9f0eaead", GitTreeState:"clean", BuildDate:"2018-03-27T00:13:02Z", GoVersion:"go1.9.4", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"8+", GitVersion:"v1.8.9-rancher1", GitCommit:"68595e18f25e24125244e9966b1e5468a98c1cd4", GitTreeState:"clean", BuildDate:"2018-03-13T04:37:53Z", GoVersion:"go1.8.3", Compiler:"gc", Platform:"linux/amd64"}
```

The client and server version are reported, indicating that you have a local `kubectl` client and are able to request the server version from the newly built cluster. Now you can issue any command to your cluster, like requesting the nodes that are in the cluster using `kubectl --kubeconfig kube_config_cluster.yml get nodes`

```bash
$ kubectl --kubeconfig kube_config_cluster.yml get nodes
NAME            STATUS    ROLES                      AGE       VERSION
10.0.0.1         Ready     controlplane,etcd,worker   35m       v1.8.9-rancher1
```
