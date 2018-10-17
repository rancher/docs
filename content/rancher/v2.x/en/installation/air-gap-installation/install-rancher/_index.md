---
title: 2—Installing Rancher
weight: 50
---

After your private registry is set up for your Rancher installation, complete your installation. Follow one of the procedures below based on the configuration in which you want to run Rancher.

{{% tabs %}}
{{% tab "HA Install" %}}
This guide will take you through the basic process of installing Rancher Server HA in a Air Gap environment. Please see the [High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha) guide for additional options and troubleshooting.

## RKE

On a system that has access (22/tcp and 6443/tcp) to the nodes you have built to host the Rancher server cluster, use the sample below create the `rancher-cluster.yml` file. Define your nodes and fill out the details for the private registry.

See [Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/) for more details on the options available.

Replace values in the code sample according to the table below.

| Directive Replacement   | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `address`               | The IP address for each of your air gap nodes outside of the cluster. |
| `internal_address`      | The IP address for each of your air gap nodes within the cluster.     |
| `url`                   | The URL for your private registry.                                    |

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

### Run RKE

```plain
rke up --config ./rancher-cluster.yml
```

### Testing the Cluster

Follow the rest of the [Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/) guide to test your cluster and verify the health of your pods before continuing.

## Helm

Instead of installing the `tiller` agent on the cluster, render the installs on a system that has access to the internet and copy resulting manifests to a system that has access to the Rancher server cluster.

### Initialize Helm Locally

Skip the [Initialize Helm (Install Tiller)]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/#helm-init) and initialize `helm` locally on a system that has internet access.

```plain
helm init -c
```

## Installing Rancher

If you set up a default private registry with credentials in RKE, the Kubernetes `kubelet` will have the credentials for your private registry configured.

### Render Templates

Fetch and render the `helm` charts on a system that has internet access.

#### Cert-Manager

If you are installing Rancher with Rancher self-signed certificates you will need to install 'cert-manager' on your cluster. If you are installing your own certificates you may skip this section.

Fetch the latest `cert-manager` chart from your configured repo, replacing `<CHART_REPO>` with the repo you're using (`latest` or `stable`). For more information on chart repo configuration, see [Choosing a Version of Rancher: Rancher Chart Repositories]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#rancher-chart-repositories).

```plain
helm fetch <CHART_REPO>/cert-manager
```

Render the template with the option you would use to install the chart. Remember to set the `image.repository` option to pull the image from your private registry. This will create a `cert-manager` directory with the Kubernetes manifest files.

```plain
helm template ./cert-manager-<version>.tgz --output-dir . \
--name cert-manager --namespace kube-system \
--set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
```

#### Rancher

Install the Rancher chart repo. Replace `<CHART_REPO>` with the repository that you're using ('latest' or 'stable').

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

### Copy Manifests

Copy the rendered manifest directories to a system that has access to the Rancher server cluster.

### Apply the Manifests

Use `kubectl` to create namespaces and apply the rendered manifests.

```plain
kubectl -n kube-system apply -R -f ./cert-manager

kubectl create namespace cattle-system
kubectl -n cattle-system apply -R -f ./rancher
```

Make sure you follow any additional instructions required by SSL install options. See [Choose your SSL Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#choose-your-ssl-configuration) for details.

{{% /tab %}}
{{% tab "Single Node" %}}
To deploy Rancher on a single node in an air gap environment, follow the instructions in the standard [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/). Parts of the install where you must complete a special action for air gap are flagged with a substitute step, which is listed in the subheading below.

### Add Private Registry URL to Run Command

When you get to the section [Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#2-choose-an-ssl-option-and-install-rancher), regardless of which install option you choose, prepend your Rancher image tag with your private registry URL (`<REGISTRY.YOURDOMAIN.COM:PORT>`), as shown in the example below.

```plain
docker run -d --restart=unless-stopped \
 -p 80:80 -p 443:443 \
 <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

{{% /tab %}}
{{% /tabs %}}

### [Next: Configuring Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/config-rancher-for-private-reg/)
