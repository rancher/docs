---
title: "Installation Options"
weight: 2
---

This section contains information on flags and environment variables used for starting a k3s cluster.

Install Script
--------------

The install script will attempt to download the latest release, to specify a specific
<<<<<<< HEAD
version for download we can use the `INSTALL_K3S_VERSION` environment variable, for example:
=======
version for download we can use the `INSTALL_K3S_VERSION` environment variable, eg:
>>>>>>> Initial k3s docs
```sh
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=vX.Y.Z-rc1 sh -
```

To install just the server without an agent we can add a `INSTALL_K3S_EXEC`
environment variable to the command:
```sh
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable-agent" sh -
```

<<<<<<< HEAD
The installer can also be run without performing downloads by setting `INSTALL_K3S_SKIP_DOWNLOAD=true`, for example:
=======
The installer can also be run without performing downloads by setting `INSTALL_K3S_SKIP_DOWNLOAD=true`, eg:
>>>>>>> Initial k3s docs
```sh
curl -sfL https://github.com/rancher/k3s/releases/download/vX.Y.Z/k3s -o /usr/local/bin/k3s
chmod 0755 /usr/local/bin/k3s

curl -sfL https://get.k3s.io -o install-k3s.sh
chmod 0755 install-k3s.sh

export INSTALL_K3S_SKIP_DOWNLOAD=true
./install-k3s.sh
```

The full help text for the install script environment variables are as follows:
   - `K3S_*`

     Environment variables which begin with `K3S_` will be preserved for the
     systemd service to use. Setting `K3S_URL` without explicitly setting
     a systemd exec command will default the command to "agent", and we
     enforce that `K3S_TOKEN` or `K3S_CLUSTER_SECRET` is also set.

   - `INSTALL_K3S_SKIP_DOWNLOAD`

     If set to true will not download k3s hash or binary.

   - `INSTALL_K3S_VERSION`

     Version of k3s to download from github. Will attempt to download the
     latest version if not specified.

   - `INSTALL_K3S_BIN_DIR`

     Directory to install k3s binary, links, and uninstall script to, or use
     /usr/local/bin as the default

   - `INSTALL_K3S_SYSTEMD_DIR`

     Directory to install systemd service and environment files to, or use
     /etc/systemd/system as the default

   - `INSTALL_K3S_EXEC` or script arguments

     Command with flags to use for launching k3s in the systemd service, if
     the command is not specified will default to "agent" if `K3S_URL` is set
     or "server" if not. The final systemd command resolves to a combination
     of EXEC and script args ($@).

     The following commands result in the same behavior:
     ```sh
     curl ... | INSTALL_K3S_EXEC="--disable-agent" sh -s -
     curl ... | INSTALL_K3S_EXEC="server --disable-agent" sh -s -
     curl ... | INSTALL_K3S_EXEC="server" sh -s - --disable-agent
     curl ... | sh -s - server --disable-agent
     curl ... | sh -s - --disable-agent
     ```

   - `INSTALL_K3S_NAME`

     Name of systemd service to create, will default from the k3s exec command
     if not specified. If specified the name will be prefixed with 'k3s-'.

   - `INSTALL_K3S_TYPE`

     Type of systemd service to create, will default from the k3s exec command
     if not specified.

Server Options
<<<<<<< HEAD
--------------

The following information on server options is also available through `k3s server --help` :

=======
------------------
>>>>>>> Initial k3s docs
* `--bind-address` _value_

    k3s bind address (default: localhost)

* `--https-listen-port` _value_

    HTTPS listen port (default: 6443)

* `--http-listen-port` _value_

    HTTP listen port (for /healthz, HTTPS redirect, and port for TLS terminating LB) (default: 0)

* `--data-dir` _value_, `-d` _value_

    Folder to hold state default /var/lib/rancher/k3s or ${HOME}/.rancher/k3s if not root

* `--disable-agent`

    Do not run a local agent and register a local kubelet

* `--log` _value_, `-l` _value_

    Log to file

* `--cluster-cidr` _value_

    Network CIDR to use for pod IPs (default: "10.42.0.0/16")

* `--cluster-secret` _value_

    Shared secret used to bootstrap a cluster [$`K3S_CLUSTER_SECRET`]

* `--service-cidr` _value_

    Network CIDR to use for services IPs (default: "10.43.0.0/16")

* `--cluster-dns` _value_

    Cluster IP for coredns service. Should be in your service-cidr range

* `--cluster-domain` _value_

    Cluster Domain (default: "cluster.local")

* `--no-deploy` _value_

    Do not deploy packaged components (valid items: coredns, servicelb, traefik)

* `--write-kubeconfig` _value_, `-o` _value_

    Write kubeconfig for admin client to this file [$`K3S_KUBECONFIG_OUTPUT`]

* `--write-kubeconfig-mode` _value_

    Write kubeconfig with this mode [$`K3S_KUBECONFIG_MODE`]

* `--tls-san` _value_

    Add additional hostname or IP as a Subject Alternative Name in the TLS cert

* `--kube-apiserver-arg` _value_

    Customized flag for kube-apiserver process

* `--kube-scheduler-arg` _value_

    Customized flag for kube-scheduler process

* `--kube-controller-arg` _value_

    Customized flag for kube-controller-manager process

* `--rootless`

    (experimental) Run rootless

* `--storage-backend` _value_

    Specify storage type etcd3 or kvsql [$`K3S_STORAGE_BACKEND`]

* `--storage-endpoint` _value_

    Specify etcd, Mysql, Postgres, or Sqlite (default) data source name [$`K3S_STORAGE_ENDPOINT`]

* `--storage-cafile` _value_

    SSL Certificate Authority file used to secure storage backend communication [$`K3S_STORAGE_CAFILE`]

* `--storage-certfile` _value_

    SSL certification file used to secure storage backend communication [$`K3S_STORAGE_CERTFILE`]

* `--storage-keyfile` _value_

    SSL key file used to secure storage backend communication [$`K3S_STORAGE_KEYFILE`]

* `--node-ip` _value_, `-i` _value_

    (agent) IP address to advertise for node

* `--node-name` _value_

    (agent) Node name [$`K3S_NODE_NAME`]

* `--docker`

    (agent) Use docker instead of containerd

* `--no-flannel`

    (agent) Disable embedded flannel

* `--flannel-iface` _value_

    (agent) Override default flannel interface

* `--container-runtime-endpoint` _value_

    (agent) Disable embedded containerd and use alternative CRI implementation

* `--pause-image` _value_

    (agent) Customized pause image for containerd sandbox

* `--resolv-conf` _value_

    (agent) Kubelet resolv.conf file [$`K3S_RESOLV_CONF`]

* `--kubelet-arg` _value_

    (agent) Customized flag for kubelet process

* `--kube-proxy-arg` _value_

    (agent) Customized flag for kube-proxy process

* `--node-label` _value_

<<<<<<< HEAD
    (agent) Registering kubelet with set of labels

* `--node-taint` _value_

    (agent) Registering kubelet with set of taints
=======
    (agent) Registring kubelet with set of labels

* `--node-taint` _value_

    (agent) Registring kubelet with set of taints
>>>>>>> Initial k3s docs

Agent Options
------------------

<<<<<<< HEAD
The following information on agent options is also available through `k3s agent --help` :

=======
>>>>>>> Initial k3s docs
* `--token` _value_, `-t` _value_

    Token to use for authentication [$`K3S_TOKEN`]

* `--token-file` _value_

    Token file to use for authentication [$`K3S_TOKEN_FILE`]

* `--server` _value_, `-s` _value_

    Server to connect to [$`K3S_URL`]

* `--data-dir` _value_, `-d` _value_

    Folder to hold state (default: "/var/lib/rancher/k3s")

* `--cluster-secret` _value_

    Shared secret used to bootstrap a cluster [$`K3S_CLUSTER_SECRET`]

* `--rootless`

    (experimental) Run rootless

* `--docker`

    (agent) Use docker instead of containerd

* `--no-flannel`

    (agent) Disable embedded flannel

* `--flannel-iface` _value_

    (agent) Override default flannel interface

* `--node-name` _value_

    (agent) Node name [$`K3S_NODE_NAME`]

* `--node-ip` _value_, `-i` _value

    (agent) IP address to advertise for node

* `--container-runtime-endpoint` _value_

    (agent) Disable embedded containerd and use alternative CRI implementation

* `--pause-image` _value_

    (agent) Customized pause image for containerd sandbox

* `--resolv-conf` _value_

    (agent) Kubelet resolv.conf file [$`K3S_RESOLV_CONF`]

* `--kubelet-arg` _value_

    (agent) Customized flag for kubelet process

* `--kube-proxy-arg` _value_

    (agent) Customized flag for kube-proxy process

* `--node-label` _value_

<<<<<<< HEAD
    (agent) Registering kubelet with set of labels

* `--node-taint` _value_

    (agent) Registering kubelet with set of taints
=======
    (agent) Registring kubelet with set of labels

* `--node-taint` _value_

    (agent) Registring kubelet with set of taints
>>>>>>> Initial k3s docs

Customizing components
----------------------

As of v0.3.0 any of the following processes can be customized with extra flags:

<<<<<<< HEAD
* `--kube-apiserver-arg` _value_

    (server) [kube-apiserver options](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/)

* `--kube-controller-arg` _value_

    (server) [kube-controller-manager options](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/)

* `--kube-scheduler-arg` _value_

    (server) [kube-scheduler options](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/)

* `--kubelet-arg` _value_

    (agent) [kubelet options](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)

* `--kube-proxy-arg` _value_

    (agent) [kube-proxy options](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/)

Adding extra arguments can be done by passing the following flags to server or agent.
For example to add the following arguments `-v=9` and `log-file=/tmp/kubeapi.log` to the kube-apiserver, you should add the following options to k3s server:

```
--kube-apiserver-arg v=9   --kube-apiserver-arg log-file=/tmp/kubeapi.log
=======
- [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) (server)
- [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) (server)
- [kube-scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) (server)
- [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) (agent)
- [kube-proxy](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/) (agent)

Adding extra argument can be done by passing the following flags to server or agent:
```
--kube-apiserver-arg value
--kube-scheduler-arg value
--kube-controller-arg value
--kubelet-arg value        
--kube-proxy-arg value     
```
For example to add the following arguments `-v=9` and `log-file=/tmp/kubeapi.log` to the kube-apiserver, you should pass the following:
```
k3s server --kube-apiserver-arg v=9 --kube-apiserver-arg log-file=/tmp/kubeapi.log
>>>>>>> Initial k3s docs
```
