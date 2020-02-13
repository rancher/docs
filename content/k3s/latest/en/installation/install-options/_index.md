---
title: "Installation Options"
weight: 20
---

This page focuses on the options that can be used when you set up K3s for the first time:

- [Installation script options](#installation-script-options)
- [Installing K3s from the binary](#installing-k3s-from-the-binary)
- [Registration options for the K3s server](#registration-options-for-the-k3s-server)
- [Registration options for the K3s agent](#registration-options-for-the-k3s-agent)

For more advanced options, refer to [this page.]({{<baseurl>}}/k3s/latest/en/advanced)

# Installation Script Options

As mentioned in the [Quick-Start Guide]({{< baseurl >}}/k3s/latest/en/quick-start/), you can use the installation script available at https://get.k3s.io to install K3s as a service on systemd and openrc based systems.

The simplest form of this command is as follows:
```sh
curl -sfL https://get.k3s.io | sh -
```

When using this method to install K3s, the following environment variables can be used to configure the installation:

- `INSTALL_K3S_SKIP_DOWNLOAD`

    If set to true will not download K3s hash or binary.

- `INSTALL_K3S_SYMLINK`

    If set to 'skip' will not create symlinks, 'force' will overwrite, default will symlink if command does not exist in path.

- `INSTALL_K3S_SKIP_START`

    If set to true will not start K3s service.

- `INSTALL_K3S_VERSION`

    Version of K3s to download from github. Will attempt to download the latest version if not specified.

- `INSTALL_K3S_BIN_DIR`

    Directory to install K3s binary, links, and uninstall script to, or use `/usr/local/bin` as the default.

- `INSTALL_K3S_BIN_DIR_READ_ONLY`

    If set to true will not write files to `INSTALL_K3S_BIN_DIR`, forces setting `INSTALL_K3S_SKIP_DOWNLOAD=true`.

- `INSTALL_K3S_SYSTEMD_DIR`

    Directory to install systemd service and environment files to, or use `/etc/systemd/system` as the default.

- `INSTALL_K3S_EXEC`

    Command with flags to use for launching K3s in the service. If the command is not specified, it will default to "agent" if `K3S_URL` is set or "server" if it is not set.
    
    The final systemd command resolves to a combination of this environment variable and script args. To illustrate this, the following commands result in the same behavior of registering a server without flannel:
     ```sh
     curl ... | INSTALL_K3S_EXEC="--no-flannel" sh -s -
     curl ... | INSTALL_K3S_EXEC="server --no-flannel" sh -s -
     curl ... | INSTALL_K3S_EXEC="server" sh -s - --no-flannel
     curl ... | sh -s - server --no-flannel
     curl ... | sh -s - --no-flannel
     ```

   - `INSTALL_K3S_NAME`

    Name of systemd service to create, will default from the K3s exec command if not specified. If specified the name will be prefixed with 'k3s-'.

   - `INSTALL_K3S_TYPE`

    Type of systemd service to create, will default from the K3s exec command if not specified.


Environment variables which begin with `K3S_` will be preserved for the systemd and openrc services to use. Setting `K3S_URL` without explicitly setting an exec command will default the command to "agent". When running the agent `K3S_TOKEN` must also be set.


# Installing K3s from the Binary

As stated, the installation script is primarily concerned with configuring K3s to run as a service. If you choose to not use the script, you can run K3s simply by downloading the binary from our [release page](https://github.com/rancher/k3s/releases/latest), placing it on your path, and executing it. The K3s binary supports the following commands:

Command | Description
--------|------------------
<span class='nowrap'>`k3s server`</span> | Run the K3s management server, which will also launch Kubernetes control plane components such as the API server, controller-manager, and scheduler.
<span class='nowrap'>`k3s agent`</span> |  Run the K3s node agent. This will cause K3s to run as a worker node, launching the Kubernetes node services `kubelet` and `kube-proxy`.
<span class='nowrap'>`k3s kubectl`</span> | Run an embedded [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/) CLI. If the `KUBECONFIG` environment variable is not set, this will automatically attempt to use the config file that is created at `/etc/rancher/k3s/k3s.yaml` when launching a K3s server node.
<span class='nowrap'>`k3s crictl`</span> | Run an embedded [crictl](https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md). This is a CLI for interacting with Kubernetes's container runtime interface (CRI). Useful for debugging.
<span class='nowrap'>`k3s ctr`</span> | Run an embedded [ctr](https://github.com/projectatomic/containerd/blob/master/docs/cli.md). This is a CLI for containerd, the container daemon used by K3s. Useful for debugging.
<span class='nowrap'>`k3s help`</span> | Shows a list of commands or help for one command

The `k3s server` and `k3s agent` commands have additional configuration options that can be viewed with <span class='nowrap'>`k3s server --help`</span> or <span class='nowrap'>`k3s agent --help`</span>. For convenience, that help text is presented here:

# Registration Options for the K3s Server
```
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
   --flannel-backend value                    (networking) One of 'none', 'vxlan', 'ipsec', or 'flannel' (default: "vxlan")
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
   --no-deploy value                          (components) Do not deploy packaged components (valid items: coredns, servicelb, traefik, local-storage, metrics-server)
   --disable-scheduler                        (components) Disable Kubernetes default scheduler
   --disable-cloud-controller                 (components) Disable k3s default cloud controller manager
   --disable-network-policy                   (components) Disable k3s default network policy controller
   --node-name value                          (agent/node) Node name [$K3S_NODE_NAME]
   --with-node-id                             (agent/node) Append id to node name
   --node-label value                         (agent/node) Registering kubelet with set of labels
   --node-taint value                         (agent/node) Registering kubelet with set of taints
   --docker                                   (agent/runtime) Use docker instead of containerd
   --container-runtime-endpoint value         (agent/runtime) Disable embedded containerd and use alternative CRI implementation
   --pause-image value                        (agent/runtime) Customized pause image for containerd sandbox
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
   --no-flannel                               (deprecated) use --flannel-backend=none
   --cluster-secret value                     (deprecated) use --token [$K3S_CLUSTER_SECRET]
```

# Registration Options for the K3s Agent
```
NAME:
   k3s agent - Run node agent

USAGE:
   k3s agent [OPTIONS]

OPTIONS:
   -v value                            (logging) Number for the log level verbosity (default: 0)
   --vmodule value                     (logging) Comma-separated list of pattern=N settings for file-filtered logging
   --log value, -l value               (logging) Log to file
   --alsologtostderr                   (logging) Log to standard error as well as file (if set)
   --token value, -t value             (cluster) Token to use for authentication [$K3S_TOKEN]
   --token-file value                  (cluster) Token file to use for authentication [$K3S_TOKEN_FILE]
   --server value, -s value            (cluster) Server to connect to [$K3S_URL]
   --data-dir value, -d value          (agent/data) Folder to hold state (default: "/var/lib/rancher/k3s")
   --node-name value                   (agent/node) Node name [$K3S_NODE_NAME]
   --with-node-id                      (agent/node) Append id to node name
   --node-label value                  (agent/node) Registering kubelet with set of labels
   --node-taint value                  (agent/node) Registering kubelet with set of taints
   --docker                            (agent/runtime) Use docker instead of containerd
   --container-runtime-endpoint value  (agent/runtime) Disable embedded containerd and use alternative CRI implementation
   --pause-image value                 (agent/runtime) Customized pause image for containerd sandbox
   --private-registry value            (agent/runtime) Private registry configuration file (default: "/etc/rancher/k3s/registries.yaml")
   --node-ip value, -i value           (agent/networking) IP address to advertise for node
   --node-external-ip value            (agent/networking) External IP address to advertise for node
   --resolv-conf value                 (agent/networking) Kubelet resolv.conf file [$K3S_RESOLV_CONF]
   --flannel-iface value               (agent/networking) Override default flannel interface
   --flannel-conf value                (agent/networking) Override default flannel config file
   --kubelet-arg value                 (agent/flags) Customized flag for kubelet process
   --kube-proxy-arg value              (agent/flags) Customized flag for kube-proxy process
   --rootless                          (experimental) Run rootless
   --no-flannel                        (deprecated) use --flannel-backend=none
   --cluster-secret value              (deprecated) use --token [$K3S_CLUSTER_SECRET]
```

### Node Labels and Taints for Agents

K3s agents can be configured with the options `--node-label` and `--node-taint` which adds a label and taint to the kubelet. The two options only add labels and/or taints at registration time, so they can only be added once and not changed after that again by running K3s commands.

Below is an example showing how to add labels and a taint:
```
     --node-label foo=bar \
     --node-label hello=world \
     --node-taint key1=value1:NoExecute
```

If you want to change node labels and taints after node registration you should use `kubectl`. Refer to the official Kubernetes documentation for details on how to add [taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) and [node labels.](https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes/#add-a-label-to-a-node)