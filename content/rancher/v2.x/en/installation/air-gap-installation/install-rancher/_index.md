---
title: 2—Installing Rancher
weight: 50
---

After your private registry is set up for your Rancher installation, complete your installation. Follow one of the procedures below based on the configuration in which you want to run Rancher.

<!-- TOC -->

- [Single Node Air Gap Install](#single-node-air-gap-install)
- [High Availability Air Gap Install](#high-availability-air-gap-install)

<!-- /TOC -->
## Single Node Air Gap Install

To deploy Rancher on a single node in an air gap environment, follow the instructions in the standard [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/). Parts of the install where you must complete a special action for air gap are flagged with a substitute step, which is listed in the subheading below.


### Add Private Registry URL to Run Command

When you get to the section [Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#2-choose-an-ssl-option-and-install-rancher), regardless of which install option you choose, prepend your Rancher image tag with your private registry URL (`<REGISTRY.YOURDOMAIN.COM:PORT>`), as shown in the example below.

```
docker run -d --restart=unless-stopped \
 -p 80:80 -p 443:443 \
 <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

>**Note:** If you want to automatically configure Rancher to default to the private registry, you can do it during the installation by setting the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`. This will allow you to skip [3—Configuring Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/config-rancher-for-private-reg/)
>
> Example:
```
docker run -d --restart=unless-stopped \
 -p 80:80 -p 443:443 \
 -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \
 <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:v2.0.0
```

## High Availability Air Gap Install

To install Rancher in a high availability configuration within an air gap environment, follow the instructions in the standard [High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha). Parts of the install where you must complete a special action for air gap are flagged with substitute steps, which are listed in the subheadings below.

### Add Private Registry to RKE YAML

When you get to the [Create the rancher-cluster.yml File]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/#create-the-rancher-cluster-yml-file) step, replace its code sample with the one below, which adds the `private_registries` code block. By adding this private registry into the file, it automatically uses the private registry when pulling any images.

Replace values in the code sample according to the table below.

| Directive Replacement   | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `address`               | The IP address for each of your air gap nodes outside of the cluster. |
| `internal_address`      | The IP address for each of your air gap nodes within the cluster.     |
| `url`                   | The URL for your private registry.                                    |

<br>

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
    - url: <REGISTRY.YOURDOMAIN.COM:PORT>      # private registry url
        user: rancher
        password: "*********"
        is_default: true
```

### Initialize Helm Using Private Registry

When you get to [Helm Init]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/#helm-init), add your private registry in the step to initialize Helm, as shown below. Replace `<REGISTRY.YOURDOMAIN.COM:PORT>` with your registry's hostname and domain.

```
helm init --service-account tiller \
--tiller-image <REGISTRY.YOURDOMAIN.COM:PORT>/gcr.io/kubernetes-helm/tiller:v2.10.0
```

### Install cert-manager Using Private Registry

When you get to [Install cert-manager]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#install-cert-manager), replace the install commands provided with the one below. Replace `<REGISTRY.YOURDOMAIN.COM:PORT>` with your registry's hostname and domain.


```
helm install stable/cert-manager --name cert-manager --namespace kube-system \
--set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
```

### Install Rancher Using Private Registry

When you get to [Choose Your SSL Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#choose-your-ssl-configuration), set your `hostname` and `rancherImage`, replacing `<REGISTRY.YOURDOMAIN.COM:PORT>` with your registry's hostname and domain.


```
helm install rancher-stable/rancher --name rancher --namespace cattle-system \
--set hostname=<REGISTRY.YOURDOMAIN.COM:PORT> \
--set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

### [Next: Configuring Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/config-rancher-for-private-reg/)
