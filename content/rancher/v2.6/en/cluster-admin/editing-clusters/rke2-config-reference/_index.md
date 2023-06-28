---
title: RKE2 Cluster Configuration Reference
shortTitle: RKE2 Cluster Configuration
weight: 5
---

This section covers the configuration options that are available in Rancher for a new or existing RKE2 Kubernetes cluster.

- [Overview](#overview)
- [Editing Clusters with a Form in the Rancher UI](#editing-clusters-with-a-form-in-the-rancher-ui)
- [Editing Clusters with YAML](#editing-clusters-with-yaml)
- [Configuration Options in the Rancher UI](#configuration-options-in-the-rancher-ui)
- [Cluster Config File Reference](#cluster-config-file-reference)

# Overview

You can configure the Kubernetes options in one of the two following ways:

- [Rancher UI](#configuration-options-in-the-rancher-ui): Use the Rancher UI to select options that are commonly customized when setting up a Kubernetes cluster.
- [Cluster Config File](#cluster-config-file): Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE2 config file. Using a config file allows you to set many additional [options](https://docs.rke2.io/install/install_options/install_options) available for an RKE2 installation.

# Editing Clusters with a Form in the Rancher UI

To edit your cluster,

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster you want to configure and click **⋮ > Edit Config**.

# Editing Clusters with YAML

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create an RKE2 config file. Using a config file allows you to set any of the options available in an RKE2 installation by specifying them in YAML.

To edit an RKE2 config file directly from the Rancher UI,

1. Click **☰ > Cluster Management**.
1. Go to the cluster you want to configure and click **⋮ > Edit as YAML**.
1. Edit the RKE options under the `rkeConfig` directive.

# Configuration Options in the Rancher UI

> Some advanced configuration options are not exposed in the Rancher UI forms, but they can be enabled by editing the RKE2 cluster configuration file in YAML. For the complete reference of configurable options for RKE2 Kubernetes clusters in YAML, see the [RKE2 documentation.](https://docs.rke2.io/install/install_options/install_options/)

## Machine Pool

This subsection covers the generic machine pool configurations. For infrastructure provider specific, configurations refer to the following pages:

- [Azure](/cluster-provisioning/rke-clusters/node-pools/azure/azure-machine-config)
- [DigitalOcean](/cluster-provisioning/rke-clusters/node-pools/digital-ocean/do-machine-config)
- [EC2](/cluster-provisioning/rke-clusters/node-pools/ec2/ec2-machine-config)
- [vSphere](/cluster-provisioning/rke-clusters/node-pools/vsphere/vsphere-machine-config)

### Pool Name

The name of the machine pool.

### Machine Count

The number of machines in the pool.

### Roles

Option to assign etcd, control plane, and worker roles to nodes.

### Advanced

#### Auto Replace

The duration nodes can be unreachable before they are automatically deleted and replaced.

#### Drain Before Delete

Enables draining nodes by evicting all pods before the node is deleted.

#### Kubernetes Node Labels

Add [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/) to nodes to help with organization and object selection.

For details on label syntax requirements, see the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set)

#### Taints

Add [taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) to nodes, which can be used to prevent pods from being scheduled to or executed on nodes, unless the pods have matching tolerations.

## Cluster Configuration

### Basics
#### Kubernetes Version

The version of Kubernetes installed on your cluster nodes. Rancher packages its own version of Kubernetes based on [hyperkube](https://github.com/rancher/hyperkube).

For more detail, see [Upgrading Kubernetes]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/upgrading-kubernetes).

#### Container Network Provider

The [Network Provider](https://kubernetes.io/docs/concepts/cluster-administration/networking/) that the cluster uses.

> After you launch the cluster, you cannot change your network provider. Therefore, choose which network provider you want to use carefully, as Kubernetes doesn't allow switching between network providers. Once a cluster is created with a network provider, changing network providers would require you to tear down the entire cluster and all its applications.

Out of the box, Rancher is compatible with the following network providers:

- [Canal](https://github.com/projectcalico/canal)
- [Cilium](https://cilium.io/)*
- [Calico](https://docs.projectcalico.org/v3.11/introduction/)
- [Multus](https://github.com/k8snetworkplumbingwg/multus-cni)

\* When using [project network isolation](#project-network-isolation) in the [Cilium CNI]({{<baseurl>}}/rancher/v2.6/en/faq/networking/cni-providers/#cilium), it is possible to enable cross-node ingress routing. Click the [CNI provider docs]({{<baseurl>}}/rancher/v2.6/en/faq/networking/cni-providers/#ingress-routing-across-nodes-in-cilium) to learn more.

For more details on the different networking providers and how to configure them, please view our [RKE2 documentation](https://docs.rke2.io/install/network_options/).

##### Dual-stack Networking

[Dual-stack](https://docs.rke2.io/install/network_options/#dual-stack-configuration) networking is supported for all CNI providers. To configure RKE2 in dual-stack mode, set valid IPv4/IPv6 CIDRs for your [Cluster CIDR](#cluster-cidr) and/or [Service CIDR](#service-cidr).

###### Additional Configuration {#dual-stack-additional-config}

When using `cilium` or `multus,cilium` as your container network interface provider, ensure the **Enable IPv6 Support** option is also enabled.

#### Cloud Provider

You can configure a [Kubernetes cloud provider]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/cloud-providers). If you want to use dynamically provisioned [volumes and storage]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/volumes-and-storage/) in Kubernetes, typically you must select the specific cloud provider in order to use it. For example, if you want to use Amazon EBS, you would need to select the `aws` cloud provider.

>**Note:** If the cloud provider you want to use is not listed as an option, you will need to use the [config file option](#cluster-config-file) to configure the cloud provider. Please reference [this documentation]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/) on how to configure the cloud provider.

#### Default Pod Security Policy

Choose the default [pod security policy]({{<baseurl>}}/rancher/v2.6/en/admin-settings/pod-security-policies/) for the cluster. Please refer to the [RKE2 documentation](https://docs.rke2.io/security/policies/) on the specifications of each available policy.

#### Worker CIS Profile

Select a [CIS benchmark]({{<baseurl>}}/rancher/v2.6/en/cis-scans/) to validate the system configuration against.

#### Project Network Isolation

If your network provider allows project network isolation, you can choose whether to enable or disable inter-project communication.

Project network isolation is available if you are using any RKE2 network plugin that supports the enforcement of Kubernetes network policies, such as Canal.

#### CoreDNS

By default, [CoreDNS](https://coredns.io/) is installed as the default DNS provider. If CoreDNS is not installed, an alternate DNS provider must be installed yourself. Refer to the [RKE2 documentation](https://docs.rke2.io/networking/#coredns) for additional CoreDNS configurations.

#### NGINX Ingress

If you want to publish your applications in a high-availability configuration, and you're hosting your nodes with a cloud-provider that doesn't have a native load-balancing feature, enable this option to use NGINX Ingress within the cluster. Refer to the [RKE2 documentation](https://docs.rke2.io/networking/#nginx-ingress-controller) for additional configuration options.

Refer to the [RKE2 documentation](https://docs.rke2.io/networking/#nginx-ingress-controller) for additional configuration options.

#### Metrics Server

Option to enable or disable [Metrics Server]({{<baseurl>}}/rke/latest/en/config-options/add-ons/metrics-server/).

Each cloud provider capable of launching a cluster using RKE2 can collect metrics and monitor for your cluster nodes. Enable this option to view your node metrics from your cloud provider's portal.

### Add-On Config

Additional Kubernetes manifests, managed as an [Add-on](https://kubernetes.io/docs/concepts/cluster-administration/addons/), to apply to the cluster on startup. Refer to the [RKE2 documentation](https://docs.rke2.io/helm/#automatically-deploying-manifests-and-helm-charts) for details.

### Agent Environment Vars

Option to set environment variables for [Rancher agents](https://www.rancher.com/docs/rancher/v2.6/en/cluster-provisioning/rke-clusters/rancher-agents/). The environment variables can be set using key value pairs. Refer to the [RKE2 documentation](https://docs.rke2.io/install/install_options/linux_agent_config/) for more details.

### etcd

#### Automatic Snapshots

Option to enable or disable recurring etcd snapshots. If enabled, users have the option to configure the frequency of snapshots. For details, refer to the [RKE2 documentation](https://docs.rke2.io/backup_restore/#creating-snapshots). Note that with RKE2, snapshots are stored on each etcd node. This varies from RKE1 which only stores one snapshot per cluster.

#### Metrics

Option to choose whether to expose etcd metrics to the public or only within the cluster.

### Networking

#### Cluster CIDR

IPv4 and/or IPv6 network CIDRs to use for pod IPs (default: 10.42.0.0/16).

##### Dual-stack Networking

To configure [dual-stack](https://docs.rke2.io/install/network_options/#dual-stack-configuration) mode, enter a valid IPv4/IPv6 CIDR. For example `10.42.0.0/16,2001:cafe:42:0::/56`.

[Additional configuration](#dual-stack-additional-config) is required when using `cilium` or `multus,cilium` as your [container network](#container-network) interface provider.

#### Service CIDR

IPv4/IPv6 network CIDRs to use for service IPs (default: 10.43.0.0/16).

##### Dual-stack Networking

To configure [dual-stack](https://docs.rke2.io/install/network_options/#dual-stack-configuration) mode, enter a valid IPv4/IPv6 CIDR. For example `10.42.0.0/16,2001:cafe:42:0::/56`.

[Additional configuration](#dual-stack-additional-config) is required when using `cilium ` or `multus,cilium` as your [container network](#container-network) interface provider.

#### Cluster DNS

IPv4 Cluster IP for coredns service. Should be in your service-cidr range (default: 10.43.0.10).

#### Cluster Domain

Select the domain for the cluster. The default is `cluster.local`.

#### NodePort Service Port Range

Option to change the range of ports that can be used for [NodePort services](https://kubernetes.io/docs/concepts/services-networking/service/#nodeport). The default is `30000-32767`.

#### TLS Alternate Names

Add additional hostnames or IPv4/IPv6 addresses as Subject Alternative Names on the server TLS cert.

#### Authorized Cluster Endpoint

Authorized Cluster Endpoint can be used to directly access the Kubernetes API server, without requiring communication through Rancher.

This is enabled by default in Rancher-launched Kubernetes clusters, using the IP of the node with the `controlplane` role and the default Kubernetes self signed certificates.

For more detail on how an authorized cluster endpoint works and why it is used, refer to the [architecture section.]({{<baseurl>}}/rancher/v2.6/en/overview/architecture/#4-authorized-cluster-endpoint)

We recommend using a load balancer with the authorized cluster endpoint. For details, refer to the [recommended architecture section.]({{<baseurl>}}/rancher/v2.6/en/overview/architecture-recommendations/#architecture-for-an-authorized-cluster-endpoint)

### Registries

Select the image repository to pull Rancher images from. For more details and configuration options, see the [RKE2 documentation](https://docs.rke2.io/install/containerd_registry_configuration/).

### Upgrade Strategy

#### Control Plane Concurrency

Select how many nodes can be upgraded at the same time. Can be a fixed number or percentage.

#### Worker Concurrency

Select how many nodes can be upgraded at the same time. Can be a fixed number or percentage.

#### Drain Nodes (Control Plane)

Option to remove all pods from the node prior to upgrading.

#### Drain Nodes (Worker Nodes)

Option to remove all pods from the node prior to upgrading.

### Advanced

Option to set kubelet options for different nodes. For available options, refer to the [Kubernetes documentation](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/).

# Cluster Config File Reference

Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create a config file. Using a config file allows you to set the [options available](https://docs.rke2.io/install/install_options/server_config/) in an RKE2 installation, including those already listed in [Configuration Options in the Rancher UI](#configuration-options-in-the-rancher-ui), as well as Rancher-specific parameters.

{{% accordion id="rke2-cluster-config-file" label="Example Cluster Config File Snippet" %}}

```yaml
spec:
  cloudCredentialSecretName: cattle-global-data:cc-s879v
  kubernetesVersion: v1.23.6+rke2r2
  localClusterAuthEndpoint: {}
  rkeConfig:
    chartValues:
      rke2-calico: {}
    etcd:
      snapshotRetention: 5
      snapshotScheduleCron: 0 */5 * * *
    machineGlobalConfig:
      cni: calico
      disable-kube-proxy: false
      etcd-expose-metrics: false
      profile: null
    machinePools:
    - controlPlaneRole: true
      etcdRole: true
      machineConfigRef:
        kind: Amazonec2Config
        name: nc-test-pool1-pwl5h
      name: pool1
      quantity: 1
      unhealthyNodeTimeout: 0s
      workerRole: true
    machineSelectorConfig:
    - config:
        protect-kernel-defaults: false
    registries: {}
    upgradeStrategy:
      controlPlaneConcurrency: "1"
      controlPlaneDrainOptions:
        deleteEmptyDirData: true
        enabled: true
        gracePeriod: -1
        ignoreDaemonSets: true
        timeout: 120
      workerConcurrency: "1"
      workerDrainOptions:
        deleteEmptyDirData: true
        enabled: true
        gracePeriod: -1
        ignoreDaemonSets: true
        timeout: 120
```

### chartValues

Option to specify the values for the system charts installed by RKE2/k3s.

Example:

```yaml
chartValues:
    chart-name:
        key: value
```
### machineGlobalConfig

The RKE2/K3s configurations are nested under the `machineGlobalConfig` directive. Any configuration change made here will apply to every node. The configuration options available in the [standalone version of RKE2](https://docs.rke2.io/install/install_options/server_config/) can be applied here.

Example:

```yaml
machineGlobalConfig:
    etcd-arg:
        - key1=value1
        - key2=value2
```

### machineSelectorConfig

This is the same as [`machineGlobalConfig`](#machineglobalconfig) except that a [label](#kubernetes-node-labels) selector can be specified with the configuration. The configuration will only be applied to nodes that match the provided label selector.

Multiple `config` entries are allowed, each specifying their own `machineLabelSelector`. A user can specify `matchExpressions`, `matchLabels`, both, or neither. Omitting the `machineLabelSelector` section of this has the same effect as putting the config in the `machineGlobalConfig` section.

Example:

```yaml
machineSelectorConfig
  - config:
      config-key: config-value
    machineLabelSelector:
      matchExpressions:
        - key: example-key
          operator: string # Valid operators are In, NotIn, Exists and DoesNotExist.
          values:
            - example-value1
            - example-value2
      matchLabels:
        key1: value1
        key2: value2
```
