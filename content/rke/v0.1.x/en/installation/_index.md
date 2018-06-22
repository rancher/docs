---
title: Installation
weight: 50
draft: true
---



RKE is a fast, versatile Kubernetes installer that you can use to install Kubernetes on your Linux hosts. You can get started in a couple of quick and easy steps:

1. [Download the RKE Binary](#download-the-rke-bindary)
2. [Prepare the Nodes for the Kubernetes Cluster](#prepare-the-nodes-for-the-kubernetes-cluster)
3. [Creating the Cluster Configuration File](#creating-the-cluster-configuration-file)
4. [Deploying Kubernetes with RKE](#deploying-kubernetes-with-rke)
5. [Interacting with your Kubernetes Cluster](#interacting-with-your-kubernetes-cluster)

RKE was designed with simplicity in mind, it's wrttin ig Golang and distributed as a single binary executable. You can simply download the appropriate build for your platform and use it directly. RKE provides build for Linux, MacOS and Windows.

- For  Kubernetes versions 1.8, 1.9 and 1.10, Docker versions `1.11.2` up to `1.13.1` and `17.03.x` are validated
- OpenSSH 7.0+ must be installed on each node for stream local forwarding to work
- The SSH user used for node access must be a member of the `docker` group on the node:

   ```
   usermod -aG docker <user_name>
   ```

- Ports 6443, 2379, and 2380 should be opened between cluster nodes.
- Swap should be disabled on any worker nodes

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

```bash
# MacOS
./rke_darwin-amd64 -version
# Linux
./rke_linux-amd64 -version
```

### Cluster Deployment Prerequisites

#### OS and Docker version
RKE deploys Kubernetes cluster components by launching them using in Docker containers on the cluster nodes.

This means that you can use almost any Linux based OS, as long as you can install and run Docker on it. The most commonly used OS is the current Ubuntu LTS release, 16.04. Kubernetes officially supports and runs integration tests on the following Docker versions:

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

```
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

#### SSH version

RKE connects to nodes using SSH, and creates a [forwarding tunnel](https://www.ssh.com/ssh/tunneling/example#sec-Server-Side-Configuration) to the node Docker socket to be able to directly control Docker without running actual commands on the node.

For this approach to work, you need the following:
- SSH server version running on the node must to be 7.0 or later.
- The user you configure to connect to the node must be a member of the `docker` system group.

You can add the user to the docker group by running the following command:
```bash
usermod -aG docker <user_name>
```

#### Open Ports
RKE deploys Kubernetes on cluster nodes using SSH. So, the machine running RKE needs to have access to the SSH port on all nodes. It's also possible to configure and use a [bastion host]({{< baseurl >}}/rke/v0.1.x/en/config-options/bastion-host/) for access to the cluster nodes.

The Kubernetes API port `6443/TCP` needs to be open on controlplane nodes to allow access from the machine running RKE and the machine(s) that will be used later to manage the Kubernetes cluster.

If you are using an external firewall, make sure you have this opened. If you are using `iptables` or `firewalld`, you can use the following commands:


If you are using an external firewall, make sure you have this port opened between the machine you are using to run `rke` and the machine you are going to use in the cluster.

#### Opening port TCP/6443 using `iptables``

```
# Open TCP/6443 for all
iptables -A INPUT -p tcp --dport 6443 -j ACCEPT

# Open TCP/6443 for one specific IP
iptables -A INPUT -p tcp -s your_ip_here --dport 6443 -j ACCEPT
```

#### Opening port TCP/6443 using `firewalld`

```
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

Additionally, Kubernetes requires that the several ports are open between nodes. The list can be found [here](https://kubernetes.io/docs/tasks/tools/install-kubeadm/#check-required-ports).

RKE will check these open ports during every run. It's possible to disable this port check with the option `rke up --disable-port-check`.

## Cluster Configuration

RKE uses a cluster configuration file, referred to as `cluster.yml` to determine what nodes will be in the cluster and how to deploy Kubernetes. There are [many configuration options]({{< baseurl >}}/rke/v0.1.x/en/config-options/) that can be set in the `cluster.yml`. In our example, we will be assuming the minimum of one [node]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes) for your Kubernetes cluster.

There are two easy ways to create a `cluster.yml`:

- Using our [minimal `cluster.yml`]({{< baseurl >}}/rke/v0.1.x/en/config-options/example-yamls/#minimal-cluster-yml-example) and updating it based on the node that you will be using.
- Using `rke config` to query for all the information needed.

### Using `rke config`

RKE provides the command `rke config` to generate a cluster configuration template or to interactivity generate a working cluster configuration file. Review [our cluster configuration options]({{< baseurl >}}/rke/v0.1.x/en/config-options/) to understand what each question means.

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
### Generating your first Kubernetes cluster configuration

For a quick start, we will be configuring one [node]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes/). There are 3 roles you can define on a node:

Role   | Description |
----------|----------|
etcd  | Keeps the state of your cluster and is the most important component in your cluster, single source of truth of your cluster. |
controlplane  | Responsible of running all the master components of your cluster, like the `kube-apiserver`, `controller-manager` and the `scheduler`.  |
worker | Workers will run the actual workloads. |


To create the `cluster.yml`, you can run `./rke_darwin-amd64 config` or `./rke_linux-amd64 config`. It will query you for all the information needed to build your cluster. Here is a commented example run where most of the defaults used:

```bash
./rke_darwin-amd64 config
# SSH private key location to use
[+] Cluster Level SSH Private Key Path [~/.ssh/id_rsa]:
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
[-] You have entered empty SSH key, defaulting to cluster level SSH key: ~/.ssh/id_rsa
# Username to use for the SSH connection
[+] SSH User of host (10.0.0.1) [ubuntu]:
# We'll be configuring all three roles onto this single host
[+] Is host (10.0.0.1) a control host (y/n)? [y]:
[+] Is host (10.0.0.1) a worker host (y/n)? [n]: y
[+] Is host (10.0.0.1) an Etcd host (y/n)? [n]: y
# If you want to override the hostname for this host, you can specify that here
[+] Override Hostname of host (10.0.0.1) [none]: single-node-k8s
# If the host has multiple network connections, you can specify a private network connection here
[+] Internal IP of host (10.0.0.1) [none]:
# The location of the Docker socket
[+] Docker socket path on host (10.0.0.1) [/var/run/docker.sock]:
# Network plugin to use for your cluster
[+] Network Plugin Type (flannel, calico, weave, canal) [canal]:
# We will be using certificates as authentication strategy
[+] Authentication Strategy [x509]:
# RBAC will be turned on
[+] Authorization Mode (rbac, none) [rbac]:
# Images to use for your cluster
[+] Kubernetes Docker image [rancher/hyperkube:v1.10.3-rancher2]:
# Internal cluster domain to be used
[+] Cluster domain [cluster.local]:
# IP ranges to be used by the clusters
[+] Service Cluster IP Range [10.43.0.0/16]:
# If we want to use PodSecurityPolicy
[+] Enable PodSecurityPolicy [n]:
[+] Cluster Network CIDR [10.42.0.0/16]:
[+] Cluster DNS Service IP [10.43.0.10]:
# We don't need include addons at this time
[+] Add addon manifest urls or yaml files [no]:
```

There should be a `cluster.yml` created in the directory where you launched the rke command. If you have to correct anything, you can do that directly in the `cluster.yml` file. The generated file will look like this:
```yaml
nodes:
- address: 10.0.0.1
  port: "22"
  internal_address: ""
  role:
  - controlplane
  - worker
  - etcd
  hostname_override: single-node-k8s
  user: ubuntu
  docker_socket: /var/run/docker.sock
  ssh_key: ""
  ssh_key_path: ~/.ssh/id_rsa
  labels: {}
services:
  etcd:
    image: ""
    extra_args: {}
    extra_binds: []
    extra_env: []
    external_urls: []
    ca_cert: ""
    cert: ""
    key: ""
    path: ""
    snapshot: false
    retention: ""
    creation: ""
  kube-api:
    image: ""
    extra_args: {}
    extra_binds: []
    extra_env: []
    service_cluster_ip_range: 10.43.0.0/16
    service_node_port_range: ""
    pod_security_policy: false
  kube-controller:
    image: ""
    extra_args: {}
    extra_binds: []
    extra_env: []
    cluster_cidr: 10.42.0.0/16
    service_cluster_ip_range: 10.43.0.0/16
  scheduler:
    image: ""
    extra_args: {}
    extra_binds: []
    extra_env: []
  kubelet:
    image: ""
    extra_args: {}
    extra_binds: []
    extra_env: []
    cluster_domain: cluster.local
    infra_container_image: ""
    cluster_dns_server: 10.43.0.10
    fail_swap_on: false
  kubeproxy:
    image: ""
    extra_args: {}
    extra_binds: []
    extra_env: []
network:
  plugin: canal
  options: {}
authentication:
  strategy: x509
  options: {}
  sans: []
addons: ""
addons_include: []
system_images:
  etcd: rancher/coreos-etcd:v3.1.12
  alpine: rancher/rke-tools:v0.1.10
  nginx_proxy: rancher/rke-tools:v0.1.10
  cert_downloader: rancher/rke-tools:v0.1.10
  kubernetes_services_sidecar: rancher/rke-tools:v0.1.10
  kubedns: rancher/k8s-dns-kube-dns-amd64:1.14.8
  dnsmasq: rancher/k8s-dns-dnsmasq-nanny-amd64:1.14.8
  kubedns_sidecar: rancher/k8s-dns-sidecar-amd64:1.14.8
  kubedns_autoscaler: rancher/cluster-proportional-autoscaler-amd64:1.0.0
  kubernetes: rancher/hyperkube:v1.10.3-rancher2
  flannel: rancher/coreos-flannel:v0.9.1
  flannel_cni: rancher/coreos-flannel-cni:v0.2.0
  calico_node: rancher/calico-node:v3.1.1
  calico_cni: rancher/calico-cni:v3.1.1
  calico_controllers: ""
  calico_ctl: rancher/calico-ctl:v2.0.0
  canal_node: rancher/calico-node:v3.1.1
  canal_cni: rancher/calico-cni:v3.1.1
  canal_flannel: rancher/coreos-flannel:v0.9.1
  wave_node: weaveworks/weave-kube:2.1.2
  weave_cni: weaveworks/weave-npc:2.1.2
  pod_infra_container: rancher/pause-amd64:3.1
  ingress: rancher/nginx-ingress-controller:0.10.2-rancher3
  ingress_backend: rancher/nginx-ingress-controller-defaultbackend:1.4
ssh_key_path: ~/.ssh/id_rsa
ssh_agent_auth: false
authorization:
  mode: rbac
  options: {}
ignore_docker_version: false
kubernetes_version: ""
private_registries: []
ingress:
  provider: ""
  options: {}
  node_selector: {}
  extra_args: {}
cluster_name: ""
cloud_provider:
  name: ""
prefix_path: ""
addon_job_timeout: 0
bastion_host:
  address: ""
  port: ""
  user: ""
  ssh_key: ""
  ssh_key_path: ""
```

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

The client and server version are reported, indicating that you have a local `kubectl` client and are able to request the server version from the newly built cluster. Now, you can issue any command to your cluster, like requesting the nodes that are in the cluster.

```
$ kubectl --kubeconfig kube_config_cluster.yml get nodes
NAME            STATUS    ROLES                      AGE       VERSION
10.0.0.1         Ready     controlplane,etcd,worker   35m       v1.10.3-rancher1
```
