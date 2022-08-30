---
title: '3. Install Kubernetes (Skip for Docker Installs)'
weight: 300
---

> Skip this section if you are installing Rancher on a single node with Docker.

This section describes how to install a Kubernetes cluster according to our [best practices for the Rancher server environment.]({{<baseurl>}}/rancher/v2.6/en/overview/architecture-recommendations/#environment-for-kubernetes-installations) This cluster should be dedicated to run only the Rancher server.

Rancher can be installed on any Kubernetes cluster, including hosted Kubernetes providers.

The steps to set up an air-gapped Kubernetes cluster on RKE, RKE2, or K3s are shown below.

{{% tabs %}}
{{% tab "K3s" %}}

In this guide, we are assuming you have created your nodes in your air gapped environment and have a secure Docker private registry on your bastion server.

### Installation Outline

1. [Prepare Images Directory](#1-prepare-images-directory)
2. [Create Registry YAML](#2-create-registry-yaml)
3. [Install K3s](#3-install-k3s)
4. [Save and Start Using the kubeconfig File](#4-save-and-start-using-the-kubeconfig-file)

### 1. Prepare Images Directory
Obtain the images tar file for your architecture from the [releases](https://github.com/k3s-io/k3s/releases) page for the version of K3s you will be running.

Place the tar file in the `images` directory before starting K3s on each node, for example:

```sh
sudo mkdir -p /var/lib/rancher/k3s/agent/images/
sudo cp ./k3s-airgap-images-$ARCH.tar /var/lib/rancher/k3s/agent/images/
```

### 2. Create Registry YAML
Create the registries.yaml file at `/etc/rancher/k3s/registries.yaml`. This will tell K3s the necessary details to connect to your private registry.

The registries.yaml file should look like this before plugging in the necessary information:

```
---
mirrors:
  customreg:
    endpoint:
      - "https://ip-to-server:5000"
configs:
  customreg:
    auth:
      username: xxxxxx # this is the registry username
      password: xxxxxx # this is the registry password
    tls:
      cert_file: <path to the cert file used in the registry>
      key_file:  <path to the key file used in the registry>
      ca_file: <path to the ca file used in the registry>
```

Note, at this time only secure registries are supported with K3s (SSL with custom CA).

For more information on private registries configuration file for K3s, refer to the [K3s documentation.]({{<baseurl>}}/k3s/latest/en/installation/private-registry/)

### 3. Install K3s

Rancher needs to be installed on a supported Kubernetes version. To find out which versions of Kubernetes are supported for your Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

To specify the K3s version, use the INSTALL_K3S_VERSION environment variable when running the K3s installation script.

Obtain the K3s binary from the [releases](https://github.com/k3s-io/k3s/releases) page, matching the same version used to get the airgap images tar.
Also obtain the K3s install script at https://get.k3s.io

Place the binary in `/usr/local/bin` on each node.
Place the install script anywhere on each node, and name it `install.sh`.

Install K3s on each server:

```
INSTALL_K3S_SKIP_DOWNLOAD=true ./install.sh
```

Install K3s on each agent:

```
INSTALL_K3S_SKIP_DOWNLOAD=true K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken ./install.sh
```

Note, take care to ensure you replace `myserver` with the IP or valid DNS of the server and replace `mynodetoken` with the node-token from the server.
The node-token is on the server at `/var/lib/rancher/k3s/server/node-token`

>**Note:** K3s additionally provides a `--resolv-conf` flag for kubelets, which may help with configuring DNS in air-gap networks.

### 4. Save and Start Using the kubeconfig File

When you installed K3s on each Rancher server node, a `kubeconfig` file was created on the node at `/etc/rancher/k3s/k3s.yaml`. This file contains credentials for full access to the cluster, and you should save this file in a secure location.

To use this `kubeconfig` file, 

1. Install [kubectl,](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) a Kubernetes command-line tool.
2. Copy the file at `/etc/rancher/k3s/k3s.yaml` and save it to the directory `~/.kube/config` on your local machine.
3. In the kubeconfig file, the `server` directive is defined as localhost. Configure the server as the DNS of your load balancer, referring to port 6443. (The Kubernetes API server will be reached at port 6443, while the Rancher server will be reached at ports 80 and 443.) Here is an example `k3s.yaml`:

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: [CERTIFICATE-DATA]
    server: [LOAD-BALANCER-DNS]:6443 # Edit this line
  name: default
contexts:
- context:
    cluster: default
    user: default
  name: default
current-context: default
kind: Config
preferences: {}
users:
- name: default
  user:
    password: [PASSWORD]
    username: admin
```

**Result:** You can now use `kubectl` to manage your K3s cluster. If you have more than one kubeconfig file, you can specify which one you want to use by passing in the path to the file when using `kubectl`:

```
kubectl --kubeconfig ~/.kube/config/k3s.yaml get pods --all-namespaces
```

For more information about the `kubeconfig` file, refer to the [K3s documentation]({{<baseurl>}}/k3s/latest/en/cluster-access/) or the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) about organizing cluster access using `kubeconfig` files.

### Note on Upgrading

Upgrading an air-gap environment can be accomplished in the following manner:

1. Download the new air-gap images (tar file) from the [releases](https://github.com/k3s-io/k3s/releases) page for the version of K3s you will be upgrading to. Place the tar in the `/var/lib/rancher/k3s/agent/images/` directory on each node. Delete the old tar file.
2. Copy and replace the old K3s binary in `/usr/local/bin` on each node. Copy over the install script at https://get.k3s.io (as it is possible it has changed since the last release). Run the script again just as you had done in the past with the same environment variables.
3. Restart the K3s service (if not restarted automatically by installer).
{{% /tab %}}
{{% tab "RKE2" %}}

In this guide, we are assuming you have created your nodes in your air-gapped environment and have a secure Docker private registry on your bastion server.

### Installation Outline

1. [Create RKE2 configuration](#1-create-rke2-configuration)
2. [Create Registry YAML](#2-create-registry-yaml)
3. [Install RKE2](#3-install-rke2)
4. [Save and Start Using the kubeconfig File](#4-save-and-start-using-the-kubeconfig-file)

### 1. Create RKE2 configuration
Create the config.yaml file at `/etc/rancher/rke2/config.yaml`. This will contain all the configuration options necessary to create a highly available RKE2 cluster.

On the first server the minimum config is:

```
token: my-shared-secret
tls-san:
  - loadbalancer-dns-domain.com
```

On each other server the config file should contain the same token and tell RKE2 to connect to the existing first server:

```
server: https://ip-of-first-server:9345
token: my-shared-secret
tls-san:
  - loadbalancer-dns-domain.com
```

For more information, refer to the [RKE2 documentation](https://docs.rke2.io/install/ha/).

>**Note:** RKE2 additionally provides a `resolv-conf` option for kubelets, which may help with configuring DNS in air-gap networks.

### 2. Create Registry YAML
Create the registries.yaml file at `/etc/rancher/rke2/registries.yaml`. This will tell RKE2 the necessary details to connect to your private registry.

The registries.yaml file should look like this before plugging in the necessary information:

```
---
mirrors:
  customreg:
    endpoint:
      - "https://ip-to-server:5000"
configs:
  customreg:
    auth:
      username: xxxxxx # this is the registry username
      password: xxxxxx # this is the registry password
    tls:
      cert_file: <path to the cert file used in the registry>
      key_file:  <path to the key file used in the registry>
      ca_file: <path to the ca file used in the registry>
```

For more information on private registries configuration file for RKE2, refer to the [RKE2 documentation.](https://docs.rke2.io/install/containerd_registry_configuration/)

### 3. Install RKE2

Rancher needs to be installed on a supported Kubernetes version. To find out which versions of Kubernetes are supported for your Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

Download the install script, rke2, rke2-images, and sha256sum archives from the release and upload them into a directory on each server:

```
mkdir /tmp/rke2-artifacts && cd /tmp/rke2-artifacts/
wget https://github.com/rancher/rke2/releases/download/v1.21.5%2Brke2r2/rke2-images.linux-amd64.tar.zst
wget https://github.com/rancher/rke2/releases/download/v1.21.5%2Brke2r2/rke2.linux-amd64.tar.gz
wget https://github.com/rancher/rke2/releases/download/v1.21.5%2Brke2r2/sha256sum-amd64.txt
curl -sfL https://get.rke2.io --output install.sh
```

Next, run install.sh using the directory on each server, as in the example below:

```
INSTALL_RKE2_ARTIFACT_PATH=/tmp/rke2-artifacts sh install.sh
```

Then enable and start the service on all servers:

``
systemctl enable rke2-server.service
systemctl start rke2-server.service
``

For more information, refer to the [RKE2 documentation](https://docs.rke2.io/install/airgap/).

### 4. Save and Start Using the kubeconfig File

When you installed RKE2 on each Rancher server node, a `kubeconfig` file was created on the node at `/etc/rancher/rke2/rke2.yaml`. This file contains credentials for full access to the cluster, and you should save this file in a secure location.

To use this `kubeconfig` file, 

1. Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl), a Kubernetes command-line tool.
2. Copy the file at `/etc/rancher/rke2/rke2.yaml` and save it to the directory `~/.kube/config` on your local machine.
3. In the kubeconfig file, the `server` directive is defined as localhost. Configure the server as the DNS of your load balancer, referring to port 6443. (The Kubernetes API server will be reached at port 6443, while the Rancher server will be reached at ports 80 and 443.) Here is an example `rke2.yaml`:

```
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: [CERTIFICATE-DATA]
    server: [LOAD-BALANCER-DNS]:6443 # Edit this line
  name: default
contexts:
- context:
    cluster: default
    user: default
  name: default
current-context: default
kind: Config
preferences: {}
users:
- name: default
  user:
    password: [PASSWORD]
    username: admin
```

**Result:** You can now use `kubectl` to manage your RKE2 cluster. If you have more than one kubeconfig file, you can specify which one you want to use by passing in the path to the file when using `kubectl`:

```
kubectl --kubeconfig ~/.kube/config/rke2.yaml get pods --all-namespaces
```

For more information about the `kubeconfig` file, refer to the [RKE2 documentation](https://docs.rke2.io/cluster_access/) or the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) about organizing cluster access using `kubeconfig` files.

### Note on Upgrading

Upgrading an air-gap environment can be accomplished in the following manner:

1. Download the new air-gap artifacts and install script from the [releases](https://github.com/rancher/rke2/releases) page for the version of RKE2 you will be upgrading to.
2. Run the script again just as you had done in the past with the same environment variables.
3. Restart the RKE2 service.
{{% /tab %}}
{{% tab "RKE" %}}
We will create a Kubernetes cluster using Rancher Kubernetes Engine (RKE). Before being able to start your Kubernetes cluster, you’ll need to install RKE and create a RKE config file.

### 1. Install RKE

Install RKE by following the instructions in the [RKE documentation.]({{<baseurl>}}/rke/latest/en/installation/)

> **Note:** Certified version(s) of RKE based on the Rancher version can be found in the [Rancher Support Matrix.](https://www.suse.com/suse-rancher/support-matrix/all-supported-versions/)

### 2. Create an RKE Config File

From a system that can access ports 22/TCP and 6443/TCP on the Linux host node(s) that you set up in a previous step, use the sample below to create a new file named `rancher-cluster.yml`.

This file is an RKE configuration file, which is a configuration for the cluster you're deploying Rancher to.

Replace values in the code sample below with help of the _RKE Options_ table. Use the IP address or DNS names of the three nodes you created.

> **Tip:** For more details on the options available, see the RKE [Config Options]({{<baseurl>}}/rke/latest/en/config-options/).

<figcaption>RKE Options</figcaption>

| Option             | Required             | Description                                                                             |
| ------------------ | -------------------- | --------------------------------------------------------------------------------------- |
| `address`          | ✓                    | The DNS or IP address for the node within the air gapped network.                          |
| `user`             | ✓                    | A user that can run Docker commands.                                                    |
| `role`             | ✓                    | List of Kubernetes roles assigned to the node.                                          |
| `internal_address` | optional<sup>1</sup> | The DNS or IP address used for internal cluster traffic.                                |
| `ssh_key_path`     |                      | Path to the SSH private key used to authenticate to the node (defaults to `~/.ssh/id_rsa`). |

> <sup>1</sup> Some services like AWS EC2 require setting the `internal_address` if you want to use self-referencing security groups or firewalls.

```yaml
nodes:
  - address: 10.10.3.187 # node air gap network IP
    internal_address: 172.31.7.22 # node intra-cluster IP
    user: rancher
    role: ['controlplane', 'etcd', 'worker']
    ssh_key_path: /home/user/.ssh/id_rsa
  - address: 10.10.3.254 # node air gap network IP
    internal_address: 172.31.13.132 # node intra-cluster IP
    user: rancher
    role: ['controlplane', 'etcd', 'worker']
    ssh_key_path: /home/user/.ssh/id_rsa
  - address: 10.10.3.89 # node air gap network IP
    internal_address: 172.31.3.216 # node intra-cluster IP
    user: rancher
    role: ['controlplane', 'etcd', 'worker']
    ssh_key_path: /home/user/.ssh/id_rsa

private_registries:
  - url: <REGISTRY.YOURDOMAIN.COM:PORT> # private registry url
    user: rancher
    password: '*********'
    is_default: true
```

### 3. Run RKE

After configuring `rancher-cluster.yml`, bring up your Kubernetes cluster:

```
rke up --config ./rancher-cluster.yml
```

### 4. Save Your Files

> **Important**
> The files mentioned below are needed to maintain, troubleshoot and upgrade your cluster.

Save a copy of the following files in a secure location:

- `rancher-cluster.yml`: The RKE cluster configuration file.
- `kube_config_cluster.yml`: The [Kubeconfig file]({{<baseurl>}}/rke/latest/en/kubeconfig/) for the cluster, this file contains credentials for full access to the cluster.
- `rancher-cluster.rkestate`: The [Kubernetes Cluster State file]({{<baseurl>}}/rke/latest/en/installation/#kubernetes-cluster-state), this file contains the current state of the cluster including the RKE configuration and the certificates.<br/><br/>_The Kubernetes Cluster State file is only created when using RKE v0.2.0 or higher._
{{% /tab %}}
{{% /tabs %}}

> **Note:** The "rancher-cluster" parts of the two latter file names are dependent on how you name the RKE cluster configuration file.

### Issues or errors?

See the [Troubleshooting]({{<baseurl>}}/rancher/v2.6/en/installation/resources/troubleshooting/) page.

### [Next: Install Rancher](../install-rancher)
