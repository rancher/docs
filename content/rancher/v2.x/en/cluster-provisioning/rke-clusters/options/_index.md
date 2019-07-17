---
title: Cluster Options
weight: 2250
---

As you configure a new cluster that's provisioned using [RKE]({{< baseurl >}}/rke/latest/en/), you can choose custom Kubernetes options.

You can configure Kubernetes options one of two ways:

- [Rancher UI](#rancher-ui): Use the Rancher UI to select options that are commonly customized when setting up a Kubernetes cluster.
- [Config File](#config-file): Alternatively, you can create a [RKE config file]({{< baseurl >}}/rke/latest/en/config-options/) to customize any option offered by Kubernetes.

## Rancher UI

When creating a cluster using one of the options described in [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters), you can configure basic Kubernetes options using the **Cluster Options** section.

From this section you can choose:

- The version of Kubernetes installed on your cluster nodes. Rancher packages its own version of Kubernetes based on [hyperkube](https://github.com/rancher/hyperkube).

- The [Network Provider](https://kubernetes.io/docs/concepts/cluster-administration/networking/) that the cluster uses. For more details on the different networking providers, please view our [Networking FAQ]({{< baseurl >}}/rancher/v2.x/en/faq/networking/cni-providers/).

    >**Note:** After you launch the cluster, you cannot change your network provider. Therefore, choose which network provider you want to use carefully, as Kubernetes doesn't allow switching between network providers. Once a cluster is created with a network provider, changing network providers would require you  tear down the entire cluster and all its applications.

    Out of the box, Rancher is compatible with the following network providers:

    - <a id="canal"></a>[Canal](https://github.com/projectcalico/canal)

        In v2.0.0 - v2.0.4 and v2.0.6, this was the default option for these clusters was Canal with network isolation. With the network isolation automatically enabled, it prevented any pod communication between [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/).

        As of v2.0.7, if you use Canal, you also have the option of using **Project Network Isolation**, which will enable or disable communication between pods in different [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/).

        >**Attention Rancher v2.0.0 - v2.0.6 Users**
        >
        >- In previous Rancher releases, Canal isolates project network communications with no option to disable it. If you are using any of these Rancher releases, be aware that using Canal prevents all communication between pods in different projects.
        >- If you have clusters using Canal and are upgrading to v2.0.7, those clusters enable Project Network Isolation by default. If you want to disable Project Network Isolation, edit the cluster and disable the option.


    - [Flannel](https://github.com/coreos/flannel#flannel)

         In v2.0.5, this was the default option, which did not prevent any network isolation between projects.

    - [Calico](https://docs.projectcalico.org/)
    - [Weave](https://github.com/weaveworks/weave) (_Available as of v2.2.0_)

         When Weave is selected as network provider, Rancher will automatically enable encryption by generating a random password. If you want to specify the password manually, please see how to configure your cluster using a [Config File]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#config-file) and the [Weave Network Plug-in Options]({{< baseurl >}}/rke/latest/en/config-options/add-ons/network-plugins/#weave-network-plug-in-options).


<br/>

- If you want to configure a [Kubernetes cloud provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers). If you want to use [volumes and storage]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/) in Kubernetes, typically you must select the specific cloud provider in order to use it. For example, if you want to use Amazon EBS, you would need to select the `aws` cloud provider.

    >**Note:** If the cloud provider you want to use is not listed as an option, you will need to use the [config file option](#config-file) to configure the cloud provider. Please reference the [RKE cloud provider documentation]({{< baseurl >}}/rke/latest/en/config-options/cloud-providers/) on how to configure the cloud provider.

If you want to see all the configuration options for a cluster, please click **Show advanced options** on the bottom right. The advanced options are described below:

### Private registries

_Available as of v2.2.0_

If you are using a private registry with authentication for your Docker images, please configure the registry in this section to allow the nodes to pull images from this registry. See [Private Registries]({{< baseurl >}}/rke/latest/en/config-options/private-registries/) for more information.

### Authorized Cluster Endpoint

_Available as of v2.2.0_

Authorized Cluster Endpoint can be used to directly access the Kubernetes API server, without requiring communication through Rancher. This is enabled by default, using the IP of the node with the `controlplane` role and the default Kubernetes self signed certificates. It is recommended to create an FQDN pointing to a load balancer which load balances across your nodes with the `controlplane` role. If you are using private CA signed certificates on the load balancer, you have to supply the CA certificate which will be included in the generated kubeconfig to validate the certificate chain. See the [Kubeconfig Files]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/kubeconfig/) and [API Keys]({{< baseurl >}}/v2.x/en/user-settings/api-keys/#creating-an-api-key) documentation for more information.

### Advanced Cluster Options

#### Nginx Ingress

Option to enable or disable the [NGINX ingress controller]({{< baseurl >}}/rke/latest/en/config-options/add-ons/ingress-controllers/).

#### Node Port Range

Option to change the range of ports that can be used for [NodePort services](https://kubernetes.io/docs/concepts/services-networking/service/#nodeport). Default is `30000-32767`.

#### Metrics Server Monitoring

Option to enable or disable [Metrics Server]({{< baseurl >}}/rke/latest/en/config-options/add-ons/metrics-server/).

#### Pod Security Policy Support

Option to enable and select a default [Pod Security Policy]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies). You must have an existing Pod Security Policy configured before you can use this option.

#### Docker version on nodes

Option to require [a supported Docker version]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/) installed on the cluster nodes that are added to the cluster, or to allow unsupported Docker versions installed on the cluster nodes.

#### Docker Root Directory

If the nodes you are adding to the cluster have Docker configured with a non-default Docker Root Directory (default is `/var/lib/docker`), please specify the correct Docker Root Directory in this option.

#### Recurring etcd Snapshots

Option to enable or disable [recurring etcd snaphots]({{< baseurl >}}/rke/latest/en/etcd-snapshots/#etcd-recurring-snapshots).

## Config File

>**Note:** In Rancher v2.0.5 and v2.0.6, the names of services in the Config File (YAML) should contain underscores only: `kube_api` and `kube_controller`.

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the [options available]({{< baseurl >}}/rke/latest/en/config-options/) in an RKE installation.

- To edit an RKE config file directly from the Rancher UI, click **Edit as YAML**.
- To read from an existing RKE file, click **Read from a file**.

![image]({{< baseurl >}}/img/rancher/cluster-options-yaml.png)

For an example of RKE config file syntax, see the [RKE documentation]({{< baseurl >}}/rke/latest/en/example-yamls/).  

### Default DNS provider

The table below indicates what DNS provider is deployed by default. See [RKE documentation on DNS provider]({{< baseurl >}}/rke/latest/en/config-options/add-ons/dns/) for more information how to configure a different DNS provider. CoreDNS can only be used on Kubernetes v1.12.0 and higher.

| Rancher version | Kubernetes version | Default DNS provider |
|-------------|--------------------|----------------------|
| v2.2.5 and higher | v1.14.0 and higher | CoreDNS |
| v2.2.5 and higher | v1.13.x and lower | kube-dns |
| v2.2.4 and lower | any | kube-dns |

### Rancher specific parameters

_Available as of v2.2.0_

Besides the RKE config file options, there are also Rancher specific settings that can be configured in the Config File (YAML):

#### docker_root_dir

See [Docker Root Directory](#docker-root-directory).

#### enable_cluster_monitoring

Option to enable or disable [Cluster Monitoring]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/).

#### enable_network_policy

Option to enable or disable Project Network Isolation.

#### local_cluster_auth_endpoint

See [Authorized Cluster Endpoint](#authorized-cluster-endpoint).

Example:

```yaml
local_cluster_auth_endpoint:
  enabled: true
  fqdn: "FQDN"
  ca_certs: "BASE64_CACERT"
```
