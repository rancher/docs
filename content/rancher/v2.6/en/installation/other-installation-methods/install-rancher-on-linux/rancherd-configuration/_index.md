---
title: RancherD Configuration Reference
weight: 1
aliases:
  - /rancher/v2.5/en/installation/install-rancher-on-linux/rancherd-configuration
---

> RancherD is an experimental feature.

In RancherD, a server node is defined as a machine (bare-metal or virtual) running the `rancherd server` command. The server runs the Kubernetes API as well as Kubernetes workloads.

An agent node is defined as a machine running the `rancherd agent` command. They don't run the Kubernetes API. To add nodes designated to run your apps and services, join agent nodes to your cluster.

In the RancherD installation instructions, we recommend running three server nodes in the Rancher server cluster. Agent nodes are not required.

- [Certificates for the Rancher Server](#certificates-for-the-rancher-server)
- [Node Taints](#node-taints)
- [Customizing the RancherD Helm Chart](#customizing-the-rancherd-helm-chart)
- [RancherD Server CLI Options](#rancherd-server-cli-options)
- [RancherD Agent CLI Options](#rancherd-agent-cli-options)

# Certificates for the Rancher Server

Rancherd does not use cert-manger to provision certs. Instead RancherD allows you to bring your own self-signed or trusted certs by storing the .pem files in `/etc/rancher/ssl/`. When doing this you should also set the `publicCA` parameter to `true` in your HelmChartConfig. For more information on the HelmChartConfig, refer to the section about [customizing the RancherD Helm chart.](#customizing-the-rancherd-helm-chart)

Private key: `/etc/rancher/ssl/key.pem`

Certificate: `/etc/rancher/ssl/cert.pem`

CA Certificate(self-signed): `/etc/rancher/ssl/cacerts.pem`

Additional CA Certificate: `/etc/ssl/certs/ca-additional.pem`

# Node Taints

By default, server nodes will be schedulable and thus your workloads can get launched on them. If you wish to have a dedicated control plane where no user workloads will run, you can use taints. The node-taint parameter will allow you to configure nodes with taints. Here is an example of adding a node taint to the `config.yaml`:

```
node-taint:
  - "CriticalAddonsOnly=true:NoExecute"
```
# Customizing the RancherD Helm Chart

Rancher is launched as a [Helm](https://helm.sh/) chart using the cluster’s [Helm integration.](https://docs.rke2.io/helm/) This means that you can easily customize the application through a manifest file describing your custom parameters.

The RancherD chart provisions Rancher in a daemonset. It exposes hostport `8080/8443` down to the container port (`80/443`), and uses hostpath to mount certs if needed.

RancherD uses `helm-controller` to bootstrap the RancherD chart. To provide a customized `values.yaml` file, the configuration options must be passed in through the `helm-controller` custom resource definition.

Here is an example of the manifest:

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChartConfig
metadata:
  name: rancher
  namespace: kube-system
spec:
  valuesContent: |
    publicCA: true
```

Put this manifest on your host in `/var/lib/rancher/rke2/server/manifests` before running RancherD.

### Common Options

| Parameter         | Default Value             | Description          |
| ------------------------------ | ----------------------------------------------------- | -------------------------------------------- |
| `addLocal`                     | "auto"                                                | ***string*** - Have Rancher detect and import the local Rancher server cluster |
| `auditLog.destination`         | "sidecar"                                             | ***string*** - Stream to sidecar container console or hostPath volume - *"sidecar, hostPath"*                                                                                                                |
| `auditLog.hostPath`            | "/var/log/rancher/audit"                              | ***string*** - log file destination on host (only applies when **auditLog.destination** is set to **hostPath**)                                                                                              |
| `auditLog.level`               | 0                                                     | ***int*** - set the [API Audit Log level](https://rancher.com/docs/rancher/v2.5/en/installation/api-auditing). 0 is off. [0-3]                                                                               |
| `auditLog.maxAge`              | 1                                                     | ***int*** - maximum number of days to retain old audit log files (only applies when **auditLog.destination** is set to **hostPath**)                                                                         |
| `auditLog.maxBackups`          | 1                                                     | int - maximum number of audit log files to retain (only applies when **auditLog.destination** is set to **hostPath**)                                                                                        |
| `auditLog.maxSize`             | 100                                                   | ***int*** - maximum size in megabytes of the audit log file before it gets rotated (only applies when **auditLog.destination** is set to **hostPath**)                                                       |
| `debug`                        | false                                                 | ***bool*** - set debug flag on rancher server                                                                                                                                                                |
| `extraEnv`                     | []                                                    | ***list*** - set additional environment variables for Rancher                                                                             |
| `imagePullSecrets`             | []                                                    | ***list*** - list of names of Secret resource containing private registry credentials                                                                                                                        |
| `proxy`                        | " "                                                   | ***string** - HTTP[S] proxy server for Rancher                                                                                                                                                               |
| `noProxy`                      | "127.0.0.0/8,10.0.0.0/8,cattle-system.svc,172.16.0.0/12,192.168.0.0/16" | ***string*** - comma separated list of hostnames or ip address not to use the proxy                                                                                                                          |
| `resources`                    | {}                                                    | ***map*** - rancher pod resource requests & limits                                                                                                                                                           |
| `rancherImage`                 | "rancher/rancher"                                     | ***string*** - rancher image source                                                                                                                                                                          |
| `rancherImageTag`              | same as chart version                                 | ***string*** - rancher/rancher image tag                                                                                                                                                                     |
| `rancherImagePullPolicy`       | "IfNotPresent"                                        | ***string*** - Override imagePullPolicy for rancher server images - *"Always", "Never", "IfNotPresent"*                                                                                                      |
| `systemDefaultRegistry`        | ""                                                    | ***string*** - private registry to be used for all system Docker images, e.g., [http://registry.example.com/]                                     |
| `useBundledSystemChart`        | false                                                 | ***bool*** - select to use the system-charts packaged with Rancher server. This option is used for air gapped installations.                     |
| `publicCA`                     | false                                                 | ***bool*** - Set to true if your cert is signed by a public CA                                                                                                                                               |

# RancherD Server CLI Options

The command to run the Rancher management server is:

```
rancherd server [OPTIONS]
```

It can be run with the following options:

### Config

| Option | Description |
|--------|-------------|
| `--config FILE, -c FILE` | Load configuration from FILE (default: "/etc/rancher/rke2/config.yaml") |

### Logging

| Option | Description |
|--------|-------------|
| `--debug`  | Turn on debug logs |

### Listener

| Option | Description |
|--------|-------------|
| `--bind-address value` |  RancherD bind address (default: 0.0.0.0) |
| `--advertise-address value`  | IP address that apiserver uses to advertise to members of the cluster (default: node-external-ip/node-ip) |
| `--tls-san value`   | Add additional hostname or IP as a Subject Alternative Name in the TLS cert |

### Data

| Option | Description |
|--------|-------------|
| `--data-dir value, -d value`  | Folder to hold state (default: "/var/lib/rancher/rancherd") |

### Networking

| Option | Description |
|--------|-------------|
| `--cluster-cidr value`    |  Network CIDR to use for pod IPs (default: "10.42.0.0/16") |
| `--service-cidr value`    | Network CIDR to use for services IPs (default: "10.43.0.0/16") |
| `--cluster-dns value`  |   Cluster IP for coredns service. Should be in your service-cidr range (default: 10.43.0.10) |
| `--cluster-domain value`  | Cluster Domain (default: "cluster.local") |

### Cluster

| Option | Description |
|--------|-------------|
| `--token value, -t value`  | Shared secret used to join a server or agent to a cluster |
|  `--token-file value`  | File containing the cluster-secret/token |

### Client

| Option | Description |
|--------|-------------|
| `--write-kubeconfig value, -o value` | Write kubeconfig for admin client to this file |
| `--write-kubeconfig-mode value`  | Write kubeconfig with this mode |

### Flags

| Option | Description |
|--------|-------------|
| `--kube-apiserver-arg value`  |  Customized flag for kube-apiserver process |
| `--kube-scheduler-arg value`  | Customized flag for kube-scheduler process  |
| `--kube-controller-manager-arg value`  | Customized flag for kube-controller-manager process |

### Database

| Option | Description |
|--------|-------------|
| `--etcd-disable-snapshots`  | Disable automatic etcd snapshots |
|  `--etcd-snapshot-schedule-cron value`  | Snapshot interval time in cron spec. eg. every 5 hours '* */5 * * *' (default: "0 */12 * * *") |
| `--etcd-snapshot-retention value`   | Number of snapshots to retain (default: 5) |
|  `--etcd-snapshot-dir value`  | Directory to save db snapshots. (Default location: ${data-dir}/db/snapshots) |
|  `--cluster-reset-restore-path value`  | Path to snapshot file to be restored |

### System Images Registry

| Option | Description |
|--------|-------------|
| `--system-default-registry value`  | Private registry to be used for all system Docker images |

### Components

| Option | Description |
|--------|-------------|
| `--disable value`  | Do not deploy packaged components and delete any deployed components (valid items: rancherd-canal, rancherd-coredns, rancherd-ingress, rancherd-kube-proxy, rancherd-metrics-server) |

### Cloud Provider

| Option | Description |
|--------|-------------|
| `--cloud-provider-name value`   | Cloud provider name  |
| `--cloud-provider-config value`  | Cloud provider configuration file path |

### Security

| Option | Description |
|--------|-------------|
|  `--profile value`    | Validate system configuration against the selected benchmark (valid items: cis-1.5) |

### Agent Node

| Option | Description |
|--------|-------------|
|  `--node-name value`  | Node name |
|  `--node-label value`   | Registering and starting kubelet with set of labels |
|  `--node-taint value`   | Registering kubelet with set of taints  |
|    `--protect-kernel-defaults`   | Kernel tuning behavior. If set, error if kernel tunables are different than kubelet defaults. |
| `--selinux`     | Enable SELinux in containerd |

### Agent Runtime

| Option | Description |
|--------|-------------|
| `--container-runtime-endpoint value`  | Disable embedded containerd and use alternative CRI implementation |
| `--snapshotter value`   | Override default containerd snapshotter (default: "overlayfs") |
|  `--private-registry value`    | Private registry configuration file (default: "/etc/rancher/rke2/registries.yaml") |

### Agent Networking

| Option | Description |
|--------|-------------|
| `--node-ip value, -i value`   | IP address to advertise for node |
|  `--resolv-conf value` |  Kubelet resolv.conf file |

### Agent Flags

| Option | Description |
|--------|-------------|
| `--kubelet-arg value`   | Customized flag for kubelet process |
|  `--kube-proxy-arg value`  | Customized flag for kube-proxy process |

### Experimental

| Option | Description |
|--------|-------------|
| `--agent-token value`   | Shared secret used to join agents to the cluster, but not servers |
| `--agent-token-file value`   | File containing the agent secret |
|  `--server value, -s value`   | Server to connect to, used to join a cluster |
|  `--cluster-reset`  | Forget all peers and become sole member of a new cluster |
| `--secrets-encryption`  | Enable Secret encryption at rest |
 


# RancherD Agent CLI Options

The following command is used to run the RancherD agent:

```
rancherd agent [OPTIONS]
```

The following options are available.

### Config

| Option | Description |
|--------|-------------|
|   `--config FILE, -c FILE`  | Load configuration from FILE (default: "/etc/rancher/rke2/config.yaml") |

### Data

| Option | Description |
|--------|-------------|
| `--data-dir value, -d value`  | Folder to hold state (default: "/var/lib/rancher/rancherd") |

### Logging

| Option | Description |
|--------|-------------|
|  `--debug`     | Turn on debug logs |

### Cluster

| Option | Description |
|--------|-------------|
|  `--token value, -t value` | Token to use for authentication  |
|  `--token-file value`  | Token file to use for authentication |
|  `--server value, -s value`   | Server to connect to |

### Agent Node

| Option | Description |
|--------|-------------|
| `--node-name value`  | Node name |
|   `--node-label value`   | Registering and starting kubelet with set of labels |
| `--node-taint value`   | Registering kubelet with set of taints |
|  `--selinux`  | Enable SELinux in containerd |
|  `--protect-kernel-defaults`   | Kernel tuning behavior. If set, error if kernel tunables are different than kubelet defaults. |

### Agent Runtime

| Option | Description |
|--------|-------------|
| `--container-runtime-endpoint value`  | Disable embedded containerd and use alternative CRI implementation |
|   `--snapshotter value` | Override default containerd snapshotter (default: "overlayfs") |
|  `--private-registry value`   | Private registry configuration file (default: "/etc/rancher/rke2/registries.yaml") |

### Agent Networking

| Option | Description |
|--------|-------------|
|   `--node-ip value, -i value`    | IP address to advertise for node |
|  `--resolv-conf value`   | Kubelet resolv.conf file |

### Agent Flags

| Option | Description |
|--------|-------------|
| `--kubelet-arg value`  | Customized flag for kubelet process |
| `--kube-proxy-arg value`   | Customized flag for kube-proxy process |

### System Images Registry

| Option | Description |
|--------|-------------|
|   `--system-default-registry value`   | Private registry to be used for all system Docker images |

### Cloud Provider

| Option | Description |
|--------|-------------|
|  `--cloud-provider-name value`   | Cloud provider name |
|  `--cloud-provider-config value`   | Cloud provider configuration file path |

### Security

| Option | Description |
|--------|-------------|
|  `--profile value`   | Validate system configuration against the selected benchmark (valid items: cis-1.5) |