---
title: Node Requirements for Rancher Managed Clusters
weight: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes the requirements for the Rancher managed Kubernetes clusters where your apps and services will be installed. These downstream clusters should be separate from the three-node cluster running Rancher.

:::note

If Rancher is installed on a high-availability Kubernetes cluster, the Rancher server three-node cluster and downstream clusters have different requirements. For Rancher installation requirements, refer to the node requirements in the [installation section.](../../../pages-for-subheaders/installation-requirements.md)

:::

Make sure the nodes for the Rancher server fulfill the following requirements:

- [Operating systems and container runtime requirements](#operating-systems-and-container-runtime-requirements)
- [Hardware Requirements](#hardware-requirements)
- [Networking Requirements](#networking-requirements)
- [Optional: Security Considerations](#optional-security-considerations)

# Operating Systems and Container Runtime Requirements

Rancher should work with any modern Linux distribution and any modern Docker version. Linux is required for the etcd and controlplane nodes of all downstream clusters. Worker nodes may run Linux or [Windows Server.](#windows-nodes)

For details on which OS and Docker versions were tested with each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

All supported operating systems are 64-bit x86.

If you plan to use ARM64, see [Running on ARM64 (Experimental).](../../../getting-started/installation-and-upgrade/advanced-options/enable-experimental-features/rancher-on-arm64.md)

For information on how to install Docker, refer to the official [Docker documentation.](https://docs.docker.com/)

### Oracle Linux and RHEL Derived Linux Nodes

Some distributions of Linux derived from RHEL, including Oracle Linux, may have default firewall rules that block communication with Helm. We recommend disabling firewalld. For Kubernetes 1.19, firewalld must be turned off.

:::note

In RHEL 8.4, two extra services are included on the NetworkManager: `nm-cloud-setup.service` and `nm-cloud-setup.timer`. These services add a routing table that interferes with the CNI plugin's configuration. If these services are enabled, you must disable them using the command below, and then reboot the node to restore connectivity:

   ```
   systemctl disable nm-cloud-setup.service nm-cloud-setup.timer
   reboot
   ```

:::

### SUSE Linux Nodes

SUSE Linux may have a firewall that blocks all ports by default. In that situation, follow [these steps](../../../getting-started/installation-and-upgrade/installation-requirements/port-requirements.md#opening-suse-linux-ports) to open the ports needed for adding a host to a custom cluster.

### Flatcar Container Linux Nodes

When [Launching Kubernetes with Rancher](../../../pages-for-subheaders/launch-kubernetes-with-rancher.md) using Flatcar Container Linux nodes, it is required to use the following configuration in the [Cluster Config File](cluster-provisioning/rke-clusters/options/#cluster-config-file)

<Tabs>
<TabItem value="Canal">

```yaml
rancher_kubernetes_engine_config:
  network:
    plugin: canal
    options:
      canal_flex_volume_plugin_dir: /opt/kubernetes/kubelet-plugins/volume/exec/nodeagent~uds
      flannel_backend_type: vxlan

  services:
    kube-controller:
      extra_args:
        flex-volume-plugin-dir: /opt/kubernetes/kubelet-plugins/volume/exec/
```

</TabItem>
<TabItem value="Calico">

```yaml
rancher_kubernetes_engine_config:
  network:
    plugin: calico
    options:
      calico_flex_volume_plugin_dir: /opt/kubernetes/kubelet-plugins/volume/exec/nodeagent~uds
      flannel_backend_type: vxlan

  services:
    kube-controller:
      extra_args:
        flex-volume-plugin-dir: /opt/kubernetes/kubelet-plugins/volume/exec/
```

</TabItem>
</Tabs>

It is also required to enable the Docker service, you can enable the Docker service using the following command:

```
systemctl enable docker.service
```

The Docker service is enabled automatically when using [Node Drivers](../../../pages-for-subheaders/about-provisioning-drivers.md#node-drivers).

### Windows Nodes

Nodes with Windows Server must run Docker Enterprise Edition.

Windows nodes can be used for worker nodes only. See [Configuring Custom Clusters for Windows](../../../pages-for-subheaders/use-windows-clusters.md)

# Hardware Requirements

The hardware requirements for nodes with the `worker` role mostly depend on your workloads. The minimum to run the Kubernetes node components is 1 CPU (core) and 1GB of memory.

Regarding CPU and memory, it is recommended that the different planes of Kubernetes clusters (etcd, controlplane, and workers) should be hosted on different nodes so that they can scale separately from each other.

For hardware recommendations for large Kubernetes clusters, refer to the official Kubernetes documentation on [building large clusters.](https://kubernetes.io/docs/setup/best-practices/cluster-large/)

For hardware recommendations for etcd clusters in production, refer to the official [etcd documentation.](https://etcd.io/docs/v3.4.0/op-guide/hardware/)

# Networking Requirements

For a production cluster, we recommend that you restrict traffic by opening only the ports defined in the port requirements below.

The ports required to be open are different depending on how the user cluster is launched. Each of the sections below list the ports that need to be opened for different [cluster creation options](../../../pages-for-subheaders/kubernetes-clusters-in-rancher-setup.md).

For a breakdown of the port requirements for etcd nodes, controlplane nodes, and worker nodes in a Kubernetes cluster, refer to the [port requirements for the Rancher Kubernetes Engine.](https://rancher.com/docs/rke/latest/en/os/#ports)

Details on which ports are used in each situation are found under [Downstream Cluster Port Requirements](../../../getting-started/installation-and-upgrade/installation-requirements/port-requirements.md#downstream-kubernetes-cluster-nodes).

# Optional: Security Considerations

If you want to provision a Kubernetes cluster that is compliant with the CIS (Center for Internet Security) Kubernetes Benchmark, we recommend to following our hardening guide to configure your nodes before installing Kubernetes.

For more information on the hardening guide and details on which version of the guide corresponds to your Rancher and Kubernetes versions, refer to the [security section.](../../../pages-for-subheaders/rancher-security.md#rancher-hardening-guide)
