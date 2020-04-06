---
title: K3s Server Configuration Reference
weight: 1
---

In this section, you'll learn how to configure the K3s server.

> Throughout the K3s documentation, you will see some options that can be passed in as both command flags and environment variables. For help with passing in options, refer to [How to Use Flags and Environment Variables.]({{<baseurl>}}/k3s/latest/en/installation/install-options/how-to-flags)

- [Commonly Used Options](#commonly-used-options)
    - [Database](#database)
    - [Cluster Options](#cluster-options)
    - [Client Options](#client-options)
- [Agent Options](#agent-options)
    - [Agent Nodes](#agent-nodes)
    - [Agent Runtime](#agent-runtime)
    - [Agent Networking](#agent-networking)
- [Advanced Options](#advanced-options)
    - [Logging](#logging)
    - [Listeners](#listeners)
    - [Data](#data)
    - [Networking](#networking)
    - [Customized Options](#customized-options)
    - [Storage Class](#storage-class)
    - [Kubernetes Components](#kubernetes-components)
    - [Customized Flags for Kubernetes Processes](#customized-flags-for-kubernetes-processes)
    - [Experimental Options](#experimental-options)
    - [Deprecated Options](#deprecated-options)
- [K3s Server Cli Help](#k3s-server-cli-help)


# Commonly Used Options

### Database

| Flag | Environment Variable | Description |
|------|----------------------|-------------|
|  `--datastore-endpoint` value | `K3S_DATASTORE_ENDPOINT` | Specify etcd, Mysql, Postgres, or Sqlite (default) data source name |
|  `--datastore-cafile` value | `K3S_DATASTORE_CAFILE` | TLS Certificate Authority file used to secure datastore backend communication       |
|  `--datastore-certfile` value | `K3S_DATASTORE_CERTFILE`       | TLS certification file used to secure datastore backend communication      |
|  `--datastore-keyfile` value  | `K3S_DATASTORE_KEYFILE`        | TLS key file used to secure datastore backend communication    |

### Cluster Options

| Flag | Environment Variable | Description |
|------|----------------------|-------------|
|  `--token value, -t` value  | `K3S_TOKEN`      | Shared secret used to join a server or agent to a cluster |
|  `--token-file` value    |  `K3S_TOKEN_FILE`   | File containing the cluster-secret/token      |

### Client Options

| Flag | Environment Variable | Description |
|------|----------------------|-------------|
|  `--write-kubeconfig value, -o` value  | `K3S_KUBECONFIG_OUTPUT` | Write kubeconfig for admin client to this file |
|  `--write-kubeconfig-mode` value | `K3S_KUBECONFIG_MODE` | Write kubeconfig with this [mode.](https://en.wikipedia.org/wiki/Chmod) The option to allow writing to the kubeconfig file is useful for allowing a K3s cluster to be imported into Rancher. An example value is 644. | 

# Agent Options

K3s agent options are available as server options because the server has the agent process embedded within.

### Agent Nodes

| Flag | Environment Variable | Description |
|------|----------------------|-------------|
|   `--node-name` value      | `K3S_NODE_NAME`        | Node name       |
|   `--with-node-id`     |  N/A           | Append id to node name         | (agent/node) 
|   `--node-label` value   | N/A         | Registering and starting kubelet with set of labels        | 
|   `--node-taint` value    | N/A        | Registering kubelet with set of taints         |

### Agent Runtime

| Flag | Default | Description |
|------|---------|-------------|
|   `--docker`  |  N/A            |  Use docker instead of containerd            |     (agent/runtime) 
|  `--container-runtime-endpoint` value  | N/A   | Disable embedded containerd and use alternative CRI implementation |
|   `--pause-image` value    | "docker.io/rancher/pause:3.1"          | Customized pause image for containerd or Docker sandbox       |
|   `--private-registry` value  | "/etc/rancher/k3s/registries.yaml"         | Private registry configuration file     |

### Agent Networking

the agent options are there because the server has the agent process embedded within

| Flag | Environment Variable | Description |
|------|----------------------|-------------|
|   `--node-ip value, -i` value  | N/A         | IP address to advertise for node     |
|   `--node-external-ip` value   |  N/A        | External IP address to advertise for node    | 
|   `--resolv-conf` value   |  `K3S_RESOLV_CONF`    | Kubelet resolv.conf file        |
|   `--flannel-iface` value    |  N/A         | Override default flannel interface   | 
|   `--flannel-conf` value   |   N/A         | Override default flannel config file     |

# Advanced Options

### Logging

| Flag | Default | Description |
|------|---------|-------------|
| `-v` value | 0  |  Number for the log level verbosity |
| `--vmodule` value | N/A | Comma-separated list of pattern=N settings for file-filtered logging |
| `--log value, -l` value  | N/A | Log to file |
| `--alsologtostderr` | N/A | Log to standard error as well as file (if set) |


### Listeners

| Flag | Default | Description |
|------|---------|-------------|
| `--bind-address` value | 0.0.0.0 | k3s bind address |
| `--https-listen-port` value | 6443 | HTTPS listen port |
| `--advertise-address` value | node-external-ip/node-ip | IP address that apiserver uses to advertise to members of the cluster |
| `--advertise-port` value | 0 | Port that apiserver uses to advertise to members of the cluster (default: listen-port) |
| `--tls-san` value  | N/A | Add additional hostname or IP as a Subject Alternative Name in the TLS cert

### Data

| Flag | Default | Description |
|------|---------|-------------|
| `--data-dir value, -d` value  | `/var/lib/rancher/k3s` or `${HOME}/.rancher/k3s` if not root | Folder to hold state |

### Networking

| Flag | Default | Description |
|------|---------|-------------|
| `--cluster-cidr` value | "10.42.0.0/16"         |  Network CIDR to use for pod IPs        | 
|  `--service-cidr` value | "10.43.0.0/16"         | Network CIDR to use for services IPs       |
|  `--cluster-dns` value   | "10.43.0.10"         | Cluster IP for coredns service. Should be in your service-cidr range |
|  `--cluster-domain` value  | "cluster.local"        | Cluster Domain       | 
|  `--flannel-backend` value   | "vxlan"      | One of 'none', 'vxlan', 'ipsec', 'host-gw', or 'wireguard'       |

### Customized Flags

| Flag |  Description |
|------|--------------|
| `--kube-apiserver-arg` value | Customized flag for kube-apiserver process |
| `--kube-scheduler-arg` value | Customized flag for kube-scheduler process |
| `--kube-controller-manager-arg` value  | Customized flag for kube-controller-manager process    |
| `--kube-cloud-controller-manager-arg` value  | Customized flag for kube-cloud-controller-manager process   |

### Storage Class

| Flag |  Description |
|------|--------------|
|   `--default-local-storage-path` value  | Default local storage path for local provisioner storage class      |

### Kubernetes Components

| Flag |  Description |
|------|--------------|
|  `--disable` value    |  Do not deploy packaged components and delete any deployed components (valid items: coredns, servicelb, traefik,local-storage, metrics-server)            |
|   `--disable-scheduler`  | Disable Kubernetes default scheduler            | 
|   `--disable-cloud-controller`   | Disable k3s default cloud controller manager           | 
|   `--disable-network-policy`  | Disable k3s default network policy controller            | 

### Customized Flags for Kubernetes Processes

| Flag |  Description |
|------|--------------|
|  `--kubelet-arg` value      |  Customized flag for kubelet process              |
|  `--kube-proxy-arg` value    |   Customized flag for kube-proxy process           |

### Experimental Options

| Flag | Environment Variable | Description |
|------|----------------------|-------------|
|   `--rootless`   |  N/A           |  Run rootless           |    (experimental) 
|   `--agent-token` value      | `K3S_AGENT_TOKEN`      |  Shared secret used to join agents to the cluster, but not servers      |
|   `--agent-token-file` value | `K3S_AGENT_TOKEN_FILE`       | File containing the agent secret       |
|   `--server value, -s` value | `K3S_URL`          |  Server to connect to, used to join a cluster    |
|   `--cluster-init`   |  `K3S_CLUSTER_INIT`            |   Initialize new cluster master      |
|   `--cluster-reset`   |  `K3S_CLUSTER_RESET`            | Forget all peers and become a single cluster new cluster master        |
|   `--secrets-encryption`   |   N/A        |  Enable Secret encryption at rest     |

### Deprecated Options

| Flag | Environment Variable | Description |
|------|----------------------|-------------|
|  `--no-flannel`    |   N/A           |  Use --flannel-backend=none       |
|   `--no-deploy` value   | N/A             | Do not deploy packaged components (valid items: coredns, servicelb, traefik, local-storage, metrics-server) |
|   `--cluster-secret` value   | `K3S_CLUSTER_SECRET`        | Use --token        |


# K3s Server CLI Help

> If an option appears in brackets below, for example `[$K3S_TOKEN]`, it means that the option can be passed in as an environment variable of that name.

```bash
NAME:
   k3s server - Run management server

USAGE:
   k3s server [OPTIONS]

OPTIONS:
   -v value                                   (logging) Number for the log level verbosity (default: 0)
   --vmodule value                            (logging) Comma-separated list of pattern=N settings for file-filtered logging
   --log value, -l value                      (logging) Log to file
   --alsologtostderr                          (logging) Log to standard error as well as file (if set)
   --bind-address value                       (listener) k3s bind address (default: 0.0.0.0)
   --https-listen-port value                  (listener) HTTPS listen port (default: 6443)
   --advertise-address value                  (listener) IP address that apiserver uses to advertise to members of the cluster (default: node-external-ip/node-ip)
   --advertise-port value                     (listener) Port that apiserver uses to advertise to members of the cluster (default: listen-port) (default: 0)
   --tls-san value                            (listener) Add additional hostname or IP as a Subject Alternative Name in the TLS cert
   --data-dir value, -d value                 (data) Folder to hold state default /var/lib/rancher/k3s or ${HOME}/.rancher/k3s if not root
   --cluster-cidr value                       (networking) Network CIDR to use for pod IPs (default: "10.42.0.0/16")
   --service-cidr value                       (networking) Network CIDR to use for services IPs (default: "10.43.0.0/16")
   --cluster-dns value                        (networking) Cluster IP for coredns service. Should be in your service-cidr range (default: 10.43.0.10)
   --cluster-domain value                     (networking) Cluster Domain (default: "cluster.local")
   --flannel-backend value                    (networking) One of 'none', 'vxlan', 'ipsec', 'host-gw', or 'wireguard' (default: "vxlan")
   --token value, -t value                    (cluster) Shared secret used to join a server or agent to a cluster [$K3S_TOKEN]
   --token-file value                         (cluster) File containing the cluster-secret/token [$K3S_TOKEN_FILE]
   --write-kubeconfig value, -o value         (client) Write kubeconfig for admin client to this file [$K3S_KUBECONFIG_OUTPUT]
   --write-kubeconfig-mode value              (client) Write kubeconfig with this mode [$K3S_KUBECONFIG_MODE]
   --kube-apiserver-arg value                 (flags) Customized flag for kube-apiserver process
   --kube-scheduler-arg value                 (flags) Customized flag for kube-scheduler process
   --kube-controller-manager-arg value        (flags) Customized flag for kube-controller-manager process
   --kube-cloud-controller-manager-arg value  (flags) Customized flag for kube-cloud-controller-manager process
   --datastore-endpoint value                 (db) Specify etcd, Mysql, Postgres, or Sqlite (default) data source name [$K3S_DATASTORE_ENDPOINT]
   --datastore-cafile value                   (db) TLS Certificate Authority file used to secure datastore backend communication [$K3S_DATASTORE_CAFILE]
   --datastore-certfile value                 (db) TLS certification file used to secure datastore backend communication [$K3S_DATASTORE_CERTFILE]
   --datastore-keyfile value                  (db) TLS key file used to secure datastore backend communication [$K3S_DATASTORE_KEYFILE]
   --default-local-storage-path value         (storage) Default local storage path for local provisioner storage class
   --disable value                            (components) Do not deploy packaged components and delete any deployed components (valid items: coredns, servicelb, traefik, local-storage, metrics-server)
   --disable-scheduler                        (components) Disable Kubernetes default scheduler
   --disable-cloud-controller                 (components) Disable k3s default cloud controller manager
   --disable-network-policy                   (components) Disable k3s default network policy controller
   --node-name value                          (agent/node) Node name [$K3S_NODE_NAME]
   --with-node-id                             (agent/node) Append id to node name
   --node-label value                         (agent/node) Registering and starting kubelet with set of labels
   --node-taint value                         (agent/node) Registering kubelet with set of taints
   --docker                                   (agent/runtime) Use docker instead of containerd
   --container-runtime-endpoint value         (agent/runtime) Disable embedded containerd and use alternative CRI implementation
   --pause-image value                        (agent/runtime) Customized pause image for containerd or docker sandbox (default: "docker.io/rancher/pause:3.1")
   --private-registry value                   (agent/runtime) Private registry configuration file (default: "/etc/rancher/k3s/registries.yaml")
   --node-ip value, -i value                  (agent/networking) IP address to advertise for node
   --node-external-ip value                   (agent/networking) External IP address to advertise for node
   --resolv-conf value                        (agent/networking) Kubelet resolv.conf file [$K3S_RESOLV_CONF]
   --flannel-iface value                      (agent/networking) Override default flannel interface
   --flannel-conf value                       (agent/networking) Override default flannel config file
   --kubelet-arg value                        (agent/flags) Customized flag for kubelet process
   --kube-proxy-arg value                     (agent/flags) Customized flag for kube-proxy process
   --rootless                                 (experimental) Run rootless
   --agent-token value                        (experimental/cluster) Shared secret used to join agents to the cluster, but not servers [$K3S_AGENT_TOKEN]
   --agent-token-file value                   (experimental/cluster) File containing the agent secret [$K3S_AGENT_TOKEN_FILE]
   --server value, -s value                   (experimental/cluster) Server to connect to, used to join a cluster [$K3S_URL]
   --cluster-init                             (experimental/cluster) Initialize new cluster master [$K3S_CLUSTER_INIT]
   --cluster-reset                            (experimental/cluster) Forget all peers and become a single cluster new cluster master [$K3S_CLUSTER_RESET]
   --secrets-encryption                       (experimental) Enable Secret encryption at rest
   --no-flannel                               (deprecated) use --flannel-backend=none
   --no-deploy value                          (deprecated) Do not deploy packaged components (valid items: coredns, servicelb, traefik, local-storage, metrics-server)
   --cluster-secret value                     (deprecated) use --token [$K3S_CLUSTER_SECRET]
```