---
title: '3. Install Kubernetes with RKE (Kubernetes Installs Only)'
weight: 300
aliases:
  - /rancher/v2.0-v2.4/en/installation/air-gap-high-availability/install-kube
  - /rancher/v2.0-v2.4/en/installation/options/air-gap-helm2/launch-kubernetes
---

This section is about how to prepare to launch a Kubernetes cluster which is used to deploy Rancher server for your air gapped environment.

Since a Kubernetes Installation requires a Kubernetes cluster, we will create a Kubernetes cluster using [Rancher Kubernetes Engine]({{<baseurl>}}/rke/latest/en/) (RKE). Before being able to start your Kubernetes cluster, you'll need to [install RKE]({{<baseurl>}}/rke/latest/en/installation/) and create a RKE config file.

- [A. Create an RKE Config File](#a-create-an-rke-config-file)
- [B. Run RKE](#b-run-rke)
- [C. Save Your Files](#c-save-your-files)

### A. Create an RKE Config File

From a system that can access ports 22/tcp and 6443/tcp on your host nodes, use the sample below to create a new file named `rancher-cluster.yml`. This file is a Rancher Kubernetes Engine configuration file (RKE config file), which is a configuration for the cluster you're deploying Rancher to.

Replace values in the code sample below with help of the _RKE Options_ table. Use the IP address or DNS names of the [3 nodes]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/air-gap-high-availability/provision-hosts) you created.

> **Tip:** For more details on the options available, see the RKE [Config Options]({{<baseurl>}}/rke/latest/en/config-options/).

<figcaption>RKE Options</figcaption>

| Option             | Required             | Description                                                                             |
| ------------------ | -------------------- | --------------------------------------------------------------------------------------- |
| `address`          | ✓                    | The DNS or IP address for the node within the air gap network.                          |
| `user`             | ✓                    | A user that can run docker commands.                                                    |
| `role`             | ✓                    | List of Kubernetes roles assigned to the node.                                          |
| `internal_address` | optional<sup>1</sup> | The DNS or IP address used for internal cluster traffic.                                |
| `ssh_key_path`     |                      | Path to SSH private key used to authenticate to the node (defaults to `~/.ssh/id_rsa`). |

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

### B. Run RKE

After configuring `rancher-cluster.yml`, bring up your Kubernetes cluster:

```
rke up --config ./rancher-cluster.yml
```

### C. Save Your Files

> **Important**
> The files mentioned below are needed to maintain, troubleshoot and upgrade your cluster.

Save a copy of the following files in a secure location:

- `rancher-cluster.yml`: The RKE cluster configuration file.
- `kube_config_rancher-cluster.yml`: The [Kubeconfig file]({{<baseurl>}}/rke/latest/en/kubeconfig/) for the cluster, this file contains credentials for full access to the cluster.
- `rancher-cluster.rkestate`: The [Kubernetes Cluster State file]({{<baseurl>}}/rke/latest/en/installation/#kubernetes-cluster-state), this file contains credentials for full access to the cluster.<br/><br/>_The Kubernetes Cluster State file is only created when using RKE v0.2.0 or higher._

> **Note:** The "rancher-cluster" parts of the two latter file names are dependent on how you name the RKE cluster configuration file.

### [Next: Install Rancher]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/install-rancher)
