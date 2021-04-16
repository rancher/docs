---
title: RKE Cluster Configuration Reference
weight: 2250
---

When Rancher installs Kubernetes, it uses [RKE]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) as the Kubernetes distribution.

This section covers the configuration options that are available in Rancher for a new or existing RKE Kubernetes cluster.

You can configure the Kubernetes options one of two ways:

- [Rancher UI](#rancher-ui-options): Use the Rancher UI to select options that are commonly customized when setting up a Kubernetes cluster.
- [Cluster Config File](#cluster-config-file): Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the options available in an RKE installation, except for system_images configuration, by specifying them in YAML.

The RKE cluster config options are nested under the `rancher_kubernetes_engine_config` directive. For more information, see the section about the [cluster config file.](#cluster-config-file)

This section is a cluster configuration reference, covering the following topics:

- [Rancher UI Options](#rancher-ui-options)
  - [Kubernetes version](#kubernetes-version)
  - [Network provider](#network-provider)
  - [Project network isolation](#project-network-isolation)
  - [Kubernetes cloud providers](#kubernetes-cloud-providers)
  - [Private registries](#private-registries)
  - [Authorized cluster endpoint](#authorized-cluster-endpoint)
  - [Node pools](#node-pools)
- [Advanced Options](#advanced-options)
  - [NGINX Ingress](#nginx-ingress)
  - [Node port range](#node-port-range)
  - [Metrics server monitoring](#metrics-server-monitoring)
  - [Pod security policy support](#pod-security-policy-support)
  - [Docker version on nodes](#docker-version-on-nodes)
  - [Docker root directory](#docker-root-directory)
  - [Recurring etcd snapshots](#recurring-etcd-snapshots)
  - [Agent Environment Variables](#agent-environment-variables)
- [Cluster config file](#cluster-config-file)
  - [Config file structure in Rancher v2.3.0+](#config-file-structure-in-rancher-v2-3-0)
  - [Default DNS provider](#default-dns-provider)
- [Rancher specific parameters](#rancher-specific-parameters)

# Rancher UI Options

When creating a cluster using one of the options described in [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters), you can configure basic Kubernetes options using the **Cluster Options** section.

### Kubernetes Version

The version of Kubernetes installed on your cluster nodes. Rancher packages its own version of Kubernetes based on [hyperkube](https://github.com/rancher/hyperkube).

### Network Provider

The [Network Provider](https://kubernetes.io/docs/concepts/cluster-administration/networking/) that the cluster uses. For more details on the different networking providers, please view our [Networking FAQ]({{<baseurl>}}/rancher/v2.5/en/faq/networking/cni-providers/).

>**Note:** After you launch the cluster, you cannot change your network provider. Therefore, choose which network provider you want to use carefully, as Kubernetes doesn't allow switching between network providers. Once a cluster is created with a network provider, changing network providers would require you  tear down the entire cluster and all its applications.

Out of the box, Rancher is compatible with the following network providers:

- [Canal](https://github.com/projectcalico/canal)
- [Flannel](https://github.com/coreos/flannel#flannel)
- [Calico](https://docs.projectcalico.org/v3.11/introduction/)
- [Weave](https://github.com/weaveworks/weave)


**Notes on Weave:**

When Weave is selected as network provider, Rancher will automatically enable encryption by generating a random password. If you want to specify the password manually, please see how to configure your cluster using a [Config File]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options/#cluster-config-file) and the [Weave Network Plug-in Options]({{<baseurl>}}/rke/latest/en/config-options/add-ons/network-plugins/#weave-network-plug-in-options).

### Project Network Isolation

Project network isolation is used to enable or disable communication between pods in different projects.

{{% tabs %}}
{{% tab "Rancher v2.5.8+" %}}

To enable project network isolation as a cluster option, you will need to use any RKE network plugin that supports the enforcement of Kubernetes network policies, such as Canal or the Cisco ACI plugin.

{{% /tab %}}
{{% tab "Rancher before v2.5.8" %}}

To enable project network isolation as a cluster option, you will need to use Canal as the CNI.

{{% /tab %}}
{{% /tabs %}}

### Kubernetes Cloud Providers

You can configure a [Kubernetes cloud provider]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options/cloud-providers). If you want to use [volumes and storage]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/volumes-and-storage/) in Kubernetes, typically you must select the specific cloud provider in order to use it. For example, if you want to use Amazon EBS, you would need to select the `aws` cloud provider.

>**Note:** If the cloud provider you want to use is not listed as an option, you will need to use the [config file option](#cluster-config-file) to configure the cloud provider. Please reference the [RKE cloud provider documentation]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/) on how to configure the cloud provider.

If you want to see all the configuration options for a cluster, please click **Show advanced options** on the bottom right. The advanced options are described below:

### Private registries

The cluster-level private registry configuration is only used for provisioning clusters.

There are two main ways to set up private registries in Rancher: by setting up the [global default registry]({{<baseurl>}}/rancher/v2.5/en/admin-settings/config-private-registry) through the **Settings** tab in the global view, and by setting up a private registry in the advanced options in the cluster-level settings. The global default registry is intended to be used for air-gapped setups, for registries that do not require credentials. The cluster-level private registry is intended to be used in all setups in which the private registry requires credentials.

If your private registry requires credentials, you need to pass the credentials to Rancher by editing the cluster options for each cluster that needs to pull images from the registry.

The private registry configuration option tells Rancher where to pull the [system images]({{<baseurl>}}/rke/latest/en/config-options/system-images/) or [addon images]({{<baseurl>}}/rke/latest/en/config-options/add-ons/) that will be used in your cluster.

- **System images** are components needed to maintain the Kubernetes cluster.
- **Add-ons** are used to deploy several cluster components, including network plug-ins, the ingress controller, the DNS provider, or the metrics server.

See the [RKE documentation on private registries]({{<baseurl>}}/rke/latest/en/config-options/private-registries/) for more information on the private registry for components applied during the provisioning of the cluster.

### Authorized Cluster Endpoint

Authorized Cluster Endpoint can be used to directly access the Kubernetes API server, without requiring communication through Rancher.

> The authorized cluster endpoint only works on Rancher-launched Kubernetes clusters. In other words, it only works in clusters where Rancher [used RKE]({{<baseurl>}}/rancher/v2.5/en/overview/architecture/#tools-for-provisioning-kubernetes-clusters) to provision the cluster. It is not available for clusters in a hosted Kubernetes provider, such as Amazon's EKS.

This is enabled by default in Rancher-launched Kubernetes clusters, using the IP of the node with the `controlplane` role and the default Kubernetes self signed certificates.

For more detail on how an authorized cluster endpoint works and why it is used, refer to the [architecture section.]({{<baseurl>}}/rancher/v2.5/en/overview/architecture/#4-authorized-cluster-endpoint)

We recommend using a load balancer with the authorized cluster endpoint. For details, refer to the [recommended architecture section.]({{<baseurl>}}/rancher/v2.5/en/overview/architecture-recommendations/#architecture-for-an-authorized-cluster-endpoint)

### Node Pools

For information on using the Rancher UI to set up node pools in an RKE cluster, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools)

# Advanced Options

The following options are available when you create clusters in the Rancher UI. They are located under **Advanced Options.**

### NGINX Ingress

Option to enable or disable the [NGINX ingress controller]({{<baseurl>}}/rke/latest/en/config-options/add-ons/ingress-controllers/).

### Node Port Range

Option to change the range of ports that can be used for [NodePort services](https://kubernetes.io/docs/concepts/services-networking/service/#nodeport). Default is `30000-32767`.

### Metrics Server Monitoring

Option to enable or disable [Metrics Server]({{<baseurl>}}/rke/latest/en/config-options/add-ons/metrics-server/).

### Pod Security Policy Support

Option to enable and select a default [Pod Security Policy]({{<baseurl>}}/rancher/v2.5/en/admin-settings/pod-security-policies). You must have an existing Pod Security Policy configured before you can use this option.

### Docker Version on Nodes

Option to require [a supported Docker version]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/) installed on the cluster nodes that are added to the cluster, or to allow unsupported Docker versions installed on the cluster nodes.

### Docker Root Directory

If the nodes you are adding to the cluster have Docker configured with a non-default Docker Root Directory (default is `/var/lib/docker`), please specify the correct Docker Root Directory in this option.

### Recurring etcd Snapshots

Option to enable or disable [recurring etcd snapshots]({{<baseurl>}}/rke/latest/en/etcd-snapshots/#etcd-recurring-snapshots).

### Agent Environment Variables

_Available as of v2.5.6_

Option to set environment variables for [rancher agents]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/rancher-agents/). The environment variables can be set using key value pairs. If rancher agent requires use of proxy to communicate with Rancher server, `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY` environment variables can be set using agent environment variables.


# Cluster Config File

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE config file. Using a config file allows you to set any of the [options available]({{<baseurl>}}/rke/latest/en/config-options/) in an RKE installation, except for `system_images` configuration. The `system_images` option is not supported when creating a cluster with the Rancher UI or API.

- To edit an RKE config file directly from the Rancher UI, click **Edit as YAML**.
- To read from an existing RKE file, click **Read from a file**.

![image]({{<baseurl>}}/img/rancher/cluster-options-yaml.png)

### Config File Structure in Rancher v2.3.0+

RKE (Rancher Kubernetes Engine) is the tool that Rancher uses to provision Kubernetes clusters. Rancher's cluster config files used to have the same structure as [RKE config files,]({{<baseurl>}}/rke/latest/en/example-yamls/) but the structure changed so that in Rancher, RKE cluster config items are separated from non-RKE config items. Therefore, configuration for your cluster needs to be nested under the `rancher_kubernetes_engine_config` directive in the cluster config file. Cluster config files created with earlier versions of Rancher will need to be updated for this format. An example cluster config file is included below.

{{% accordion id="v2.3.0-cluster-config-file" label="Example Cluster Config File" %}}

```yaml
#
# Cluster Config
#
docker_root_dir: /var/lib/docker
enable_cluster_alerting: false
enable_cluster_monitoring: false
enable_network_policy: false
local_cluster_auth_endpoint:
  enabled: true
#
# Rancher Config
#
rancher_kubernetes_engine_config: # Your RKE template config goes here.
  addon_job_timeout: 30
  authentication:
    strategy: x509
  ignore_docker_version: true
#
# # Currently only nginx ingress provider is supported.
# # To disable ingress controller, set `provider: none`
# # To enable ingress on specific nodes, use the node_selector, eg:
#    provider: nginx
#    node_selector:
#      app: ingress
#
  ingress:
    provider: nginx
  kubernetes_version: v1.15.3-rancher3-1
  monitoring:
    provider: metrics-server
#
#   If you are using calico on AWS
#
#    network:
#      plugin: calico
#      calico_network_provider:
#        cloud_provider: aws
#
# # To specify flannel interface
#
#    network:
#      plugin: flannel
#      flannel_network_provider:
#      iface: eth1
#
# # To specify flannel interface for canal plugin
#
#    network:
#      plugin: canal
#      canal_network_provider:
#        iface: eth1
#
  network:
    options:
      flannel_backend_type: vxlan
    plugin: canal
#
#    services:
#      kube-api:
#        service_cluster_ip_range: 10.43.0.0/16
#      kube-controller:
#        cluster_cidr: 10.42.0.0/16
#        service_cluster_ip_range: 10.43.0.0/16
#      kubelet:
#        cluster_domain: cluster.local
#        cluster_dns_server: 10.43.0.10
#
  services:
    etcd:
      backup_config:
        enabled: true
        interval_hours: 12
        retention: 6
        safe_timestamp: false
      creation: 12h
      extra_args:
        election-timeout: 5000
        heartbeat-interval: 500
      gid: 0
      retention: 72h
      snapshot: false
      uid: 0
    kube_api:
      always_pull_images: false
      pod_security_policy: false
      service_node_port_range: 30000-32767
  ssh_agent_auth: false
windows_prefered_cluster: false
```
{{% /accordion %}}

### Default DNS provider

The table below indicates what DNS provider is deployed by default. See [RKE documentation on DNS provider]({{<baseurl>}}/rke/latest/en/config-options/add-ons/dns/) for more information how to configure a different DNS provider. CoreDNS can only be used on Kubernetes v1.12.0 and higher.

| Rancher version | Kubernetes version | Default DNS provider |
|-------------|--------------------|----------------------|
| v2.2.5 and higher | v1.14.0 and higher | CoreDNS |
| v2.2.5 and higher | v1.13.x and lower | kube-dns |
| v2.2.4 and lower | any | kube-dns |

# Rancher specific parameters

Besides the RKE config file options, there are also Rancher specific settings that can be configured in the Config File (YAML):

### docker_root_dir

See [Docker Root Directory](#docker-root-directory).

### enable_cluster_monitoring

Option to enable or disable [Cluster Monitoring]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/).

### enable_network_policy

Option to enable or disable Project Network Isolation.

Before Rancher v2.5.8, project network isolation is only available if you are using the Canal network plugin for RKE. 

In v2.5.8+, project network isolation is available if you are using any RKE network plugin that supports the enforcement of Kubernetes network policies, such as Canal or the Cisco ACI plugin.

### local_cluster_auth_endpoint

See [Authorized Cluster Endpoint](#authorized-cluster-endpoint).

Example:

```yaml
local_cluster_auth_endpoint:
  enabled: true
  fqdn: "FQDN"
  ca_certs: "BASE64_CACERT"
```

### Custom Network Plug-in

You can add a custom network plug-in by using the [user-defined add-on functionality]({{<baseurl>}}/rke/latest/en/config-options/add-ons/user-defined-add-ons/) of RKE. You define any add-on that you want deployed after the Kubernetes cluster is deployed.

There are two ways that you can specify an add-on:

- [In-line Add-ons]({{<baseurl>}}/rke/latest/en/config-options/add-ons/user-defined-add-ons/#in-line-add-ons)
- [Referencing YAML Files for Add-ons]({{<baseurl>}}/rke/latest/en/config-options/add-ons/user-defined-add-ons/#referencing-yaml-files-for-add-ons)

For an example of how to configure a custom network plug-in by editing the `cluster.yml`, refer to the [RKE documentation.]({{<baseurl>}}/rke/latest/en/config-options/add-ons/network-plugins/custom-network-plugin-example)
