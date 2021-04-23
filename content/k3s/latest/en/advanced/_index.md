---
title: "Advanced Options and Configuration"
weight: 45
aliases:
  - /k3s/latest/en/running/
  - /k3s/latest/en/configuration/
---

This section contains advanced information describing the different ways you can run and manage K3s:

- [Certificate rotation](#certificate-rotation)
- [Auto-deploying manifests](#auto-deploying-manifests)
- [Using Docker as the container runtime](#using-docker-as-the-container-runtime)
- [Configuring containerd](#configuring-containerd)
- [Secrets Encryption Config (Experimental)](#secrets-encryption-config-experimental)
- [Running K3s with RootlessKit (Experimental)](#running-k3s-with-rootlesskit-experimental)
- [Node labels and taints](#node-labels-and-taints)
- [Starting the server with the installation script](#starting-the-server-with-the-installation-script)
- [Additional preparation for Alpine Linux setup](#additional-preparation-for-alpine-linux-setup)
- [Running K3d (K3s in Docker) and docker-compose](#running-k3d-k3s-in-docker-and-docker-compose)
- [Enabling legacy iptables on Raspbian Buster](#enabling-legacy-iptables-on-raspbian-buster)
- [Enabling cgroups for Raspbian Buster](#enabling-cgroups-for-raspbian-buster)
- [SELinux Support](#selinux-support)
- [Additional preparation for (Red Hat/CentOS) Enterprise Linux](#additional-preparation-for-red-hat-centos-enterprise-linux)

# Certificate Rotation

By default, certificates in K3s expire in 12 months.

If the certificates are expired or have fewer than 90 days remaining before they expire, the certificates are rotated when K3s is restarted.

# Auto-Deploying Manifests

Any file found in `/var/lib/rancher/k3s/server/manifests` will automatically be deployed to Kubernetes in a manner similar to `kubectl apply`.

For information about deploying Helm charts, refer to the section about [Helm.](../helm)

# Using Docker as the Container Runtime

K3s includes and defaults to [containerd,](https://containerd.io/) an industry-standard container runtime.

To use Docker instead of containerd,

1. Install Docker on the K3s node. One of Rancher's [Docker installation scripts](https://github.com/rancher/install-docker) can be used to install Docker:

    ```
    curl https://releases.rancher.com/install-docker/19.03.sh | sh
    ```

1. Install K3s using the `--docker` option:

    ```
    curl -sfL https://get.k3s.io | sh -s - --docker
    ```

1. Confirm that the cluster is available:

    ```
    $ sudo k3s kubectl get pods --all-namespaces
    NAMESPACE     NAME                                     READY   STATUS      RESTARTS   AGE
    kube-system   local-path-provisioner-6d59f47c7-lncxn   1/1     Running     0          51s
    kube-system   metrics-server-7566d596c8-9tnck          1/1     Running     0          51s
    kube-system   helm-install-traefik-mbkn9               0/1     Completed   1          51s
    kube-system   coredns-8655855d6-rtbnb                  1/1     Running     0          51s
    kube-system   svclb-traefik-jbmvl                      2/2     Running     0          43s
    kube-system   traefik-758cd5fc85-2wz97                 1/1     Running     0          43s
    ```

1. Confirm that the Docker containers are running:

    ```
    $ sudo docker ps
    CONTAINER ID        IMAGE                     COMMAND                  CREATED              STATUS              PORTS               NAMES
    3e4d34729602        897ce3c5fc8f              "entry"                  About a minute ago   Up About a minute                       k8s_lb-port-443_svclb-traefik-jbmvl_kube-system_d46f10c6-073f-4c7e-8d7a-8e7ac18f9cb0_0
    bffdc9d7a65f        rancher/klipper-lb        "entry"                  About a minute ago   Up About a minute                       k8s_lb-port-80_svclb-traefik-jbmvl_kube-system_d46f10c6-073f-4c7e-8d7a-8e7ac18f9cb0_0
    436b85c5e38d        rancher/library-traefik   "/traefik --configfi…"   About a minute ago   Up About a minute                       k8s_traefik_traefik-758cd5fc85-2wz97_kube-system_07abe831-ffd6-4206-bfa1-7c9ca4fb39e7_0
    de8fded06188        rancher/pause:3.1         "/pause"                 About a minute ago   Up About a minute                       k8s_POD_svclb-traefik-jbmvl_kube-system_d46f10c6-073f-4c7e-8d7a-8e7ac18f9cb0_0
    7c6a30aeeb2f        rancher/pause:3.1         "/pause"                 About a minute ago   Up About a minute                       k8s_POD_traefik-758cd5fc85-2wz97_kube-system_07abe831-ffd6-4206-bfa1-7c9ca4fb39e7_0
    ae6c58cab4a7        9d12f9848b99              "local-path-provisio…"   About a minute ago   Up About a minute                       k8s_local-path-provisioner_local-path-provisioner-6d59f47c7-lncxn_kube-system_2dbd22bf-6ad9-4bea-a73d-620c90a6c1c1_0
    be1450e1a11e        9dd718864ce6              "/metrics-server"        About a minute ago   Up About a minute                       k8s_metrics-server_metrics-server-7566d596c8-9tnck_kube-system_031e74b5-e9ef-47ef-a88d-fbf3f726cbc6_0
    4454d14e4d3f        c4d3d16fe508              "/coredns -conf /etc…"   About a minute ago   Up About a minute                       k8s_coredns_coredns-8655855d6-rtbnb_kube-system_d05725df-4fb1-410a-8e82-2b1c8278a6a1_0
    c3675b87f96c        rancher/pause:3.1         "/pause"                 About a minute ago   Up About a minute                       k8s_POD_coredns-8655855d6-rtbnb_kube-system_d05725df-4fb1-410a-8e82-2b1c8278a6a1_0
    4b1fddbe6ca6        rancher/pause:3.1         "/pause"                 About a minute ago   Up About a minute                       k8s_POD_local-path-provisioner-6d59f47c7-lncxn_kube-system_2dbd22bf-6ad9-4bea-a73d-620c90a6c1c1_0
    64d3517d4a95        rancher/pause:3.1         "/pause"
    ```

### Optional: Use crictl with Docker

crictl provides a CLI for CRI-compatible container runtimes.

If you would like to use crictl after installing K3s with the `--docker` option, install crictl using the [official documentation:](https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md) 

```
$ VERSION="v1.17.0"
$ curl -L https://github.com/kubernetes-sigs/cri-tools/releases/download/$VERSION/crictl-${VERSION}-linux-amd64.tar.gz --output crictl-${VERSION}-linux-amd64.tar.gz
$ sudo tar zxvf crictl-$VERSION-linux-amd64.tar.gz -C /usr/local/bin
crictl
```

Then start using crictl commands:

```
$ sudo crictl version
Version:  0.1.0
RuntimeName:  docker
RuntimeVersion:  19.03.9
RuntimeApiVersion:  1.40.0
$ sudo crictl images
IMAGE                            TAG                 IMAGE ID            SIZE
rancher/coredns-coredns          1.6.3               c4d3d16fe508b       44.3MB
rancher/klipper-helm             v0.2.5              6207e2a3f5225       136MB
rancher/klipper-lb               v0.1.2              897ce3c5fc8ff       6.1MB
rancher/library-traefik          1.7.19              aa764f7db3051       85.7MB
rancher/local-path-provisioner   v0.0.11             9d12f9848b99f       36.2MB
rancher/metrics-server           v0.3.6              9dd718864ce61       39.9MB
rancher/pause                    3.1                 da86e6ba6ca19       742kB
```

# Configuring containerd

K3s will generate config.toml for containerd in `/var/lib/rancher/k3s/agent/etc/containerd/config.toml`.

For advanced customization for this file you can create another file called `config.toml.tmpl` in the same directory and it will be used instead.

The `config.toml.tmpl` will be treated as a Go template file, and the `config.Node` structure is being passed to the template. [This template](https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L32) example on how to use the structure to customize the configuration file.

# Secrets Encryption Config (Experimental)
As of v1.17.4+k3s1, K3s added the experimental feature of enabling secrets encryption at rest by passing the flag `--secrets-encryption` on a server, this flag will do the following automatically:

- Generate an AES-CBC key
- Generate an encryption config file with the generated key

```
{
  "kind": "EncryptionConfiguration",
  "apiVersion": "apiserver.config.k8s.io/v1",
  "resources": [
    {
      "resources": [
        "secrets"
      ],
      "providers": [
        {
          "aescbc": {
            "keys": [
              {
                "name": "aescbckey",
                "secret": "xxxxxxxxxxxxxxxxxxx"
              }
            ]
          }
        },
        {
          "identity": {}
        }
      ]
    }
  ]
}
```

- Pass the config to the KubeAPI as encryption-provider-config

Once enabled any created secret will be encrypted with this key. Note that if you disable encryption then any encrypted secrets will not be readable until you enable encryption again.

# Running K3s with RootlessKit (Experimental)

> **Warning:** This feature is experimental.

RootlessKit is a kind of Linux-native "fake root" utility, made for mainly [running Docker and Kubernetes as an unprivileged user,](https://github.com/rootless-containers/usernetes) so as to protect the real root on the host from potential container-breakout attacks.

Initial rootless support has been added but there are a series of significant usability issues surrounding it.

We are releasing the initial support for those interested in rootless and hopefully some people can help to improve the usability.  First, ensure you have a proper setup and support for user namespaces.  Refer to the [requirements section](https://github.com/rootless-containers/rootlesskit#setup) in RootlessKit for instructions.
In short, latest Ubuntu is your best bet for this to work.

### Known Issues with RootlessKit

* **Ports**

    When running rootless a new network namespace is created.  This means that K3s instance is running with networking fairly detached from the host.  The only way to access services run in K3s from the host is to set up port forwards to the K3s network namespace. We have a controller that will automatically bind 6443 and service port below 1024 to the host with an offset of 10000. 

    That means service port 80 will become 10080 on the host, but 8080 will become 8080 without any offset.

    Currently, only `LoadBalancer` services are automatically bound.

* **Daemon lifecycle**

    Once you kill K3s and then start a new instance of K3s it will create a new network namespace, but it doesn't kill the old pods.  So you are left
    with a fairly broken setup.  This is the main issue at the moment, how to deal with the network namespace.

    The issue is tracked in https://github.com/rootless-containers/rootlesskit/issues/65

* **Cgroups**

    Cgroups are not supported.

### Running Servers and Agents with Rootless

Just add `--rootless` flag to either server or agent. So run `k3s server --rootless` and then look for the message `Wrote kubeconfig [SOME PATH]` for where your kubeconfig file is.

For more information about setting up the kubeconfig file, refer to the [section about cluster access.](../cluster-access)

> Be careful, if you use `-o` to write the kubeconfig to a different directory it will probably not work. This is because the K3s instance in running in a different mount namespace.

# Node Labels and Taints

K3s agents can be configured with the options `--node-label` and `--node-taint` which adds a label and taint to the kubelet. The two options only add labels and/or taints [at registration time,]({{<baseurl>}}/k3s/latest/en/installation/install-options/#node-labels-and-taints-for-agents) so they can only be added once and not changed after that again by running K3s commands.

If you want to change node labels and taints after node registration you should use `kubectl`. Refer to the official Kubernetes documentation for details on how to add [taints](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) and [node labels.](https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes/#add-a-label-to-a-node)

# Starting the Server with the Installation Script

The installation script will auto-detect if your OS is using systemd or openrc and start the service.
When running with openrc, logs will be created at `/var/log/k3s.log`. 

When running with systemd, logs will be created in `/var/log/syslog` and viewed using `journalctl -u k3s`.

An example of installing and auto-starting with the install script:

```bash
curl -sfL https://get.k3s.io | sh -
```

When running the server manually you should get an output similar to the following:

```
$ k3s server
INFO[2019-01-22T15:16:19.908493986-07:00] Starting k3s dev                             
INFO[2019-01-22T15:16:19.908934479-07:00] Running kube-apiserver --allow-privileged=true --authorization-mode Node,RBAC --service-account-signing-key-file /var/lib/rancher/k3s/server/tls/service.key --service-cluster-ip-range 10.43.0.0/16 --advertise-port 6445 --advertise-address 127.0.0.1 --insecure-port 0 --secure-port 6444 --bind-address 127.0.0.1 --tls-cert-file /var/lib/rancher/k3s/server/tls/localhost.crt --tls-private-key-file /var/lib/rancher/k3s/server/tls/localhost.key --service-account-key-file /var/lib/rancher/k3s/server/tls/service.key --service-account-issuer k3s --api-audiences unknown --basic-auth-file /var/lib/rancher/k3s/server/cred/passwd --kubelet-client-certificate /var/lib/rancher/k3s/server/tls/token-node.crt --kubelet-client-key /var/lib/rancher/k3s/server/tls/token-node.key 
Flag --insecure-port has been deprecated, This flag will be removed in a future version.
INFO[2019-01-22T15:16:20.196766005-07:00] Running kube-scheduler --kubeconfig /var/lib/rancher/k3s/server/cred/kubeconfig-system.yaml --port 0 --secure-port 0 --leader-elect=false
INFO[2019-01-22T15:16:20.196880841-07:00] Running kube-controller-manager --kubeconfig /var/lib/rancher/k3s/server/cred/kubeconfig-system.yaml --service-account-private-key-file /var/lib/rancher/k3s/server/tls/service.key --allocate-node-cidrs --cluster-cidr 10.42.0.0/16 --root-ca-file /var/lib/rancher/k3s/server/tls/token-ca.crt --port 0 --secure-port 0 --leader-elect=false 
Flag --port has been deprecated, see --secure-port instead.
INFO[2019-01-22T15:16:20.273441984-07:00] Listening on :6443                           
INFO[2019-01-22T15:16:20.278383446-07:00] Writing manifest: /var/lib/rancher/k3s/server/manifests/coredns.yaml 
INFO[2019-01-22T15:16:20.474454524-07:00] Node token is available at /var/lib/rancher/k3s/server/node-token 
INFO[2019-01-22T15:16:20.474471391-07:00] To join node to cluster: k3s agent -s https://10.20.0.3:6443 -t ${NODE_TOKEN} 
INFO[2019-01-22T15:16:20.541027133-07:00] Wrote kubeconfig /etc/rancher/k3s/k3s.yaml
INFO[2019-01-22T15:16:20.541049100-07:00] Run: k3s kubectl                             
```

The output will likely be much longer as the agent will create a lot of logs. By default the server
will register itself as a node (run the agent).

# Additional Preparation for Alpine Linux Setup

In order to set up Alpine Linux, you have to go through the following preparation:

Update **/etc/update-extlinux.conf** by adding:

```
default_kernel_opts="...  cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory"
```

Then update the config and reboot:

```bash
update-extlinux
reboot
```

# Running K3d (K3s in Docker) and docker-compose

[k3d](https://github.com/rancher/k3d) is a utility designed to easily run K3s in Docker.

It can be installed via the the [brew](https://brew.sh/) utility on MacOS:

```
brew install k3d
```

`rancher/k3s` images are also available to run the K3s server and agent from Docker. 

A `docker-compose.yml` is in the root of the K3s repo that serves as an example of how to run K3s from Docker. To run from `docker-compose` from this repo, run:

    docker-compose up --scale agent=3
    # kubeconfig is written to current dir

    kubectl --kubeconfig kubeconfig.yaml get node

    NAME           STATUS   ROLES    AGE   VERSION
    497278a2d6a2   Ready    <none>   11s   v1.13.2-k3s2
    d54c8b17c055   Ready    <none>   11s   v1.13.2-k3s2
    db7a5a5a5bdd   Ready    <none>   12s   v1.13.2-k3s2

To run the agent only in Docker, use `docker-compose up agent`.

Alternatively the `docker run` command can also be used:

    sudo docker run \
      -d --tmpfs /run \
      --tmpfs /var/run \
      -e K3S_URL=${SERVER_URL} \
      -e K3S_TOKEN=${NODE_TOKEN} \
      --privileged rancher/k3s:vX.Y.Z


# Enabling legacy iptables on Raspbian Buster

Raspbian Buster defaults to using `nftables` instead of `iptables`.  **K3S** networking features require `iptables` and do not work with `nftables`.  Follow the steps below to switch configure **Buster** to use `legacy iptables`:
```
sudo iptables -F
sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
sudo update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy
sudo reboot
```

# Enabling cgroups for Raspbian Buster

Standard Raspbian Buster installations do not start with `cgroups` enabled. **K3S** needs `cgroups` to start the systemd service. `cgroups`can be enabled by appending `cgroup_memory=1 cgroup_enable=memory` to `/boot/cmdline.txt`.

## example of /boot/cmdline.txt
```
console=serial0,115200 console=tty1 root=PARTUUID=58b06195-02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait cgroup_memory=1 cgroup_enable=memory
```

# SELinux Support

_Supported as of v1.19.4+k3s1. Experimental as of v1.17.4+k3s1._

If you are installing K3s on a system where SELinux is enabled by default (such as CentOS), you must ensure the proper SELinux policies have been installed. 

### Automatic Installation

_Available as of v1.19.3+k3s2_

The [install script]({{<baseurl>}}/k3s/latest/en/installation/install-options/#installation-script-options) will automatically install the SELinux RPM from the Rancher RPM repository if on a compatible system if not performing an air-gapped install. Automatic installation can be skipped by setting `INSTALL_K3S_SKIP_SELINUX_RPM=true`.

### Manual Installation

The necessary policies can be installed with the following commands:
```
yum install -y container-selinux selinux-policy-base
yum install -y https://rpm.rancher.io/k3s/latest/common/centos/7/noarch/k3s-selinux-0.2-1.el7_8.noarch.rpm
```

To force the install script to log a warning rather than fail, you can set the following environment variable: `INSTALL_K3S_SELINUX_WARN=true`.

### Enabling and Disabling SELinux Enforcement

The way that SELinux enforcement is enabled or disabled depends on the K3s version.

{{% tabs %}}
{{% tab "K3s v1.19.1+k3s1" %}}

To leverage SELinux, specify the `--selinux` flag when starting K3s servers and agents.

This option can also be specified in the K3s [configuration file:]({{<baseurl>}}/k3s/latest/en/installation/install-options/#configuration-file)

```
selinux: true
```

The `--disable-selinux` option should not be used. It is deprecated and will be either ignored or will be unrecognized, resulting in an error, in future minor releases.

Using a custom `--data-dir` under SELinux is not supported. To customize it, you would most likely need to write your own custom policy. For guidance, you could refer to the [containers/container-selinux](https://github.com/containers/container-selinux) repository, which contains the SELinux policy files for Container Runtimes, and the [rancher/k3s-selinux](https://github.com/rancher/k3s-selinux) repository, which contains the SELinux policy for K3s .

{{%/tab%}}
{{% tab "K3s before v1.19.1+k3s1" %}}

SELinux is automatically enabled for the built-in containerd.

To turn off SELinux enforcement in the embedded containerd, launch K3s with the `--disable-selinux` flag.

Using a custom `--data-dir` under SELinux is not supported. To customize it, you would most likely need to write your own custom policy. For guidance, you could refer to the [containers/container-selinux](https://github.com/containers/container-selinux) repository, which contains the SELinux policy files for Container Runtimes, and the [rancher/k3s-selinux](https://github.com/rancher/k3s-selinux) repository, which contains the SELinux policy for K3s .

{{%/tab%}}
{{% /tabs %}}

# Additional preparation for (Red Hat/CentOS) Enterprise Linux

It is recommended to turn off firewalld:
```
systemctl disable firewalld --now
```
