---
title: K3s Cluster Configuration Reference (Tech Preview)
shortTitle: K3s Cluster Configuration
weight: 6
---

This section covers the configuration options that are available in Rancher for a new or existing K3s Kubernetes cluster.

# Overview

You can configure the Kubernetes options one of two ways:

- [Rancher UI](#configuration-options-in-the-rancher-ui): Use the Rancher UI to select options that are commonly customized when setting up a Kubernetes cluster.
- [Cluster Config File](#cluster-config-file): Instead of using the Rancher UI to choose Kubernetes options for the cluster, advanced users can create a K3s config file. Using a config file allows you to set any of the [options](https://rancher.com/docs/k3s/latest/en/installation/install-options/) available in an K3s installation.

# Configuration Options in the Rancher UI

> Some advanced configuration options are not exposed in the Rancher UI forms, but they can be enabled by editing the K3s cluster configuration file in YAML. For the complete reference of configurable options for K3s clusters in YAML, see the [K3s documentation.](https://rancher.com/docs/k3s/latest/en/installation/install-options/)

### Basics
#### Kubernetes Version

The version of Kubernetes installed on your cluster nodes. Rancher packages its own version of Kubernetes based on [hyperkube](https://github.com/rancher/hyperkube).

For more detail, see [Upgrading Kubernetes]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/upgrading-kubernetes).

#### Encrypt Secrets

Option to enable or disable secrets encryption. When enabled, secrets will be encrypted using a AES-CBC key. If disabled, any previously secrets will not be readable until encryption is enabled again. Refer to the [K3s documentation](https://rancher.com/docs/k3s/latest/en/advanced/#secrets-encryption-config-experimental) for details.

#### Project Network Isolation

If your network provider allows project network isolation, you can choose whether to enable or disable inter-project communication. 

#### SELinux

Option to enable or disable [SELinux](https://rancher.com/docs/k3s/latest/en/advanced/#selinux-support) support.

#### CoreDNS

By default, [CoreDNS](https://coredns.io/) is installed as the default DNS provider. If CoreDNS is not installed, an alternate DNS provider must be installed yourself. Refer to the [K3s documentation](https://rancher.com/docs/k3s/latest/en/networking/#coredns) for details..

#### Klipper Service LB

Option to enable or disable the [Klipper](https://github.com/rancher/klipper-lb) service load balancer. Refer to the [K3s documentation](https://rancher.com/docs/k3s/latest/en/networking/#service-load-balancer) for details.

#### Traefik Ingress

Option to enable or disable the [Traefik](https://traefik.io/) HTTP reverse proxy and load balancer. For more details and configuration options, see the [K3s documentation](https://rancher.com/docs/k3s/latest/en/networking/#traefik-ingress-controller).

#### Local Storage

Option to enable or disable [local storage](https://rancher.com/docs/k3s/latest/en/storage/) on the node(s).

#### Metrics Server

Option to enable or disable the [metrics server](https://github.com/kubernetes-incubator/metrics-server). If enabled, ensure port 10250 is opened for inbound TCP traffic.

### Add-On Config

Additional Kubernetes manifests, managed as a [Add-on](https://kubernetes.io/docs/concepts/cluster-administration/addons/), to apply to the cluster on startup. Refer to the [K3s documentation](https://rancher.com/docs/k3s/latest/en/helm/#automatically-deploying-manifests-and-helm-charts) for details.

### Agent Environment Vars

Option to set environment variables for [K3s agents](https://rancher.com/docs/k3s/latest/en/architecture/). The environment variables can be set using key value pairs. Refer to the [K3 documentation](https://rancher.com/docs/k3s/latest/en/installation/install-options/agent-config/) for more details.

### etcd

#### Automatic Snapshots

Option to enable or disable recurring etcd snapshots. If enabled, users have the option to configure the frequency of snapshots. For details, refer to the [K3s documentation](https://rancher.com/docs/k3s/latest/en/backup-restore/#creating-snapshots).

#### Metrics

Option to choose whether to expose etcd metrics to the public or only within the cluster.

### Networking

#### Cluster CIDR

IPv4/IPv6 network CIDRs to use for pod IPs (default: 10.42.0.0/16).

#### Service CIDR

IPv4/IPv6 network CIDRs to use for service IPs (default: 10.43.0.0/16).

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

For more detail on how an authorized cluster endpoint works and why it is used, refer to the [architecture section.]({{<baseurl>}}/rancher/v2.6/en/overview/architecture/#4-authorized-cluster-endpoint)

We recommend using a load balancer with the authorized cluster endpoint. For details, refer to the [recommended architecture section.]({{<baseurl>}}/rancher/v2.6/en/overview/architecture-recommendations/#architecture-for-an-authorized-cluster-endpoint)

### Registries

Select the image repository to pull Rancher images from. For more details and configuration options, see the [K3s documentation](https://rancher.com/docs/k3s/latest/en/installation/private-registry/).

### Upgrade Strategy

#### Controle Plane Concurrency

Select how many nodes can be upgraded at the same time. Can be a fixed number or percentage.

#### Worker Concurrency

Select how many nodes can be upgraded at the same time. Can be a fixed number or percentage.

#### Drain Nodes (Control Plane)

Option to remove all pods from the node prior to upgrading.

#### Drain Nodes (Worker Nodes)

Option to remove all pods from the node prior to upgrading.

### Advanced

Option to set kubelet options for different nodes. For available options, refer to the [Kubernetes documentation](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/).

# Cluster Config File

Instead of using the Rancher UI forms to choose Kubernetes options for the cluster, advanced users can create an K3s config file. Using a config file allows you to set any of the [options](https://rancher.com/docs/k3s/latest/en/installation/install-options/) available in an K3s installation.

To edit an K3s config file directly from the Rancher UI, click **Edit as YAML**.


