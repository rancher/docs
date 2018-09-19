---
title: 2—Installing Rancher
weight: 50
aliases:
---

After your private registry is setup for your Rancher installation, complete that installation. Follow one of the procedures below based on the configuration in which you want to run Rancher.

<!-- TOC -->

- [Single Node Install](#single-node-install)
- [High Availability Install](#high-availability-install)

<!-- /TOC -->

## Single Node Install

To deploy Rancher on a single node in an air gap environment, follow the instructions in [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/). Parts of the install where you must complete a special action for air gap are flagged with a substitute step, which is listed in the subheading below.


### Add Private Registry URL to Run Command

When you get [Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#2-choose-an-ssl-option-and-install-rancher), regardless of which install option you choose, prepend your Rancher image tag with your private registry URL (`<registry.yourdomain.com:port>`), as shown in the example below. 

```
docker run -d --restart=unless-stopped \
 -p 80:80 -p 443:443 \
 <registry.yourdomain.com:port>/rancher/rancher:latest
```

## High Availability Install

To install Rancher in a high availability configuration within an air gap environment, follow the instructions in [High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha). Parts of the install where you must complete a special action for air gap are flagged with substitute steps, which are listed in the subheadings below.

### Add Private Registry to RKE YAML

When you get to [Create the rancher-cluster.yml File]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/#create-the-rancher-cluster-yml-file), replace its code sample with the one below, which adds the `private registries` block:

>**Note:** When declaring the `address` for each of your air gap nodes, use its external IP address.

```yaml
nodes:
    - address: 18.222.121.187
        internal_address: 172.31.7.22
        user: rancher
        role: [ "controlplane", "etcd", "worker" ]
        ssh_key_file: /home/user/.ssh/id_rsa
    - address: 18.220.193.254
        internal_address: 172.31.13.132
        user: rancher
        role: [ "controlplane", "etcd", "worker" ]
        ssh_key_file: /home/user/.ssh/id_rsa
    - address: 13.59.83.89
        internal_address: 172.31.3.216
        user: rancher
        role: [ "controlplane", "etcd", "worker" ]
        ssh_key_file: /home/user/.ssh/id_rsa
    private_registries:
    - url: my_registry.example.com
        user: rancher
        password: "*********"
        is_default: true
```

#### Optional: Run RKE Through Bastion Host

When setting up an air gap environment, it may be useful to run RKE through a [bastion host]({{< baseurl >}}/rke/v0.1.x/en/config-options/bastion-host/). This configuration can be helpful if you want to keep your RKE config (`rancher-cluster.yml`) or SSH keys on your local machine. Use of a bastion host requires it to be accessible from both the Internet and your air gap nodes over port 22.

**Port Requirements:**

| Port   | Outgoing Host  | Incoming Host     |
| ------ | -------------- | ----------------- |
| 22 TCP | local RKE host | bastion host      |
| 22 TCP | bastion host   | each air gap node |

To enable running RKE through a bastion server, add the following sample to `rancher-cluster.yml`:

```yaml
bastion_host:
    address: 18.224.54.35 # public IP of the bastion server
    user: rancher
    port: 22
    ssh_key_path: /path/to/ssh/key
```

>**Note:** When declaring the `address` for each of your air gap nodes and bastion host, use its external IP address.


**Example in context:**

```yaml
bastion_host:
    address: 18.224.54.35 # public IP of the bastion server
    user: rancher
    port: 22
    ssh_key_path: /home/user/.ssh/id_rsa
nodes:
    - address: 18.222.121.187
        internal_address: 172.31.7.22
        user: rancher
        role: [ "controlplane", "etcd", "worker" ]
        ssh_key_file: /home/user/.ssh/id_rsa
    - address: 18.220.193.254
        internal_address: 172.31.13.132
        user: rancher
        role: [ "controlplane", "etcd", "worker" ]
        ssh_key_file: /home/user/.ssh/id_rsa
    - address: 13.59.83.89
        internal_address: 172.31.3.216
        user: rancher
        role: [ "controlplane", "etcd", "worker" ]
        ssh_key_file: /home/user/.ssh/id_rsa
    private_registries:
    - url: my_registry.example.com
        user: rancher
        password: "*********"
        is_default: true
```

After adding the bastion host to `rancher-cluster.yml`,  running `rke up` provisions the Kubernetes cluster through the bastion server, and provides the resulting `kube_config`. However, it's important to note that as your nodes are not accessible by public IP, the machine from which you run `kubectl` in later steps must be able to access your air gapped nodes at the addresses provided. Due to this requirement, you may need to move the resulting `kube_config` after its creation.

### Initialize Helm Using Private Registry

When you get to [Helm Init]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/#helm-init), add your private registry in the step to initialize Helm, as shown below:

```
helm init --service-account tiller \
--tiller-image user-ag-2-registry.rancher.space/gcr.io/kubernetes-helm/tiller:v2.10.0
```

### Install cert-manager Using Private Registry

When you get to [Install cert-manager]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#install-cert-manager), replace the install commands provided with the one below:

```
helm install stable/cert-manager --name cert-manager --namespace kube-system \
--set image.repository=user-ag-2-registry.rancher.space/quay.io/jetstack/cert-manager-controller
```

### Install Rancher Using Private Registry

When you get to [Choose Your SSL Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#choose-your-ssl-configuration), set your `hostname` and `rancherImage`, adding your private registry's URL, as shown below:

```plain
helm install rancher-stable/rancher --name rancher --namespace cattle-system \
--set hostname=user-ag-2.rancher.space \
--set rancherImage=user-ag-2-registry.rancher.space/rancher/rancher
```

### [Next: Configuring Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/config-rancher-for-private-reg/)