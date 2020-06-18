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
- [Secrets Encryption Config (Experimental)](#secrets-encryption-config-experimental)
- [Running K3s with RootlessKit (Experimental)](#running-k3s-with-rootlesskit-experimental)
- [Node labels and taints](#node-labels-and-taints)
- [Starting the server with the installation script](#starting-the-server-with-the-installation-script)
- [Additional preparation for Alpine Linux setup](#additional-preparation-for-alpine-linux-setup)
- [Running K3d (K3s in Docker) and docker-compose](#running-k3d-k3s-in-docker-and-docker-compose)
- [Enabling legacy iptables on Raspbian Buster](#enabling-legacy-iptables-on-raspbian-buster)
- [Experimental SELinux Support](#experimental-selinux-support)

# Certificate Rotation

By default, certificates in K3s expire in 12 months.

If the certificates are expired or have fewer than 90 days remaining before they expire, the certificates are rotated when K3s is restarted.

# Auto-Deploying Manifests

Any file found in `/var/lib/rancher/k3s/server/manifests` will automatically be deployed to Kubernetes in a manner similar to `kubectl apply`.

For information about deploying Helm charts, refer to the section about [Helm.](../helm)

# Using Docker as the Container Runtime

K3s includes and defaults to [containerd,](https://containerd.io/) an industry-standard container runtime. If you want to use Docker instead of containerd then you simply need to run the agent with the `--docker` flag.

K3s will generate config.toml for containerd in `/var/lib/rancher/k3s/agent/etc/containerd/config.toml`. For advanced customization for this file you can create another file called `config.toml.tmpl` in the same directory and it will be used instead.

The `config.toml.tmpl` will be treated as a Golang template file, and the `config.Node` structure is being passed to the template, the following is an example on how to use the structure to customize the configuration file https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L32

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

# Experimental SELinux Support

As of release v1.17.4+k3s1, experimental support for SELinux has been added to K3s's embedded containerd. If you are installing K3s on a system where SELinux is enabled by default (such as CentOS), you must ensure the proper SELinux policies have been installed. The [install script]({{<baseurl>}}/k3s/latest/en/installation/install-options/#installation-script-options) will fail if they are not. The necessary policies can be installed with the following commands:
```
yum install -y container-selinux selinux-policy-base
rpm -i https://rpm.rancher.io/k3s-selinux-0.1.1-rc1.el7.noarch.rpm
```

To force the install script to log a warning rather than fail, you can set the following environment variable: `INSTALL_K3S_SELINUX_WARN=true`.

You can turn off SELinux enforcement in the embedded containerd by launching K3s with the `--disable-selinux` flag.

Note that support for SELinux in containerd is still under development. Progress can be tracked in [this pull request](https://github.com/containerd/cri/pull/1246).
