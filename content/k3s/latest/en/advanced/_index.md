---
title: "Advanced Options and Configuration"
weight: 40
aliases:
  - /k3s/latest/en/running/
  - /k3s/latest/en/configuration/
---

This section contains advanced information describing the different ways you can run and manage K3s:

- [Setting Up the kubeconfig File](#setting-up-the-kubeconfig-file) 
- [Using Helm 3](#using-helm-3)
- [Auto-deploying manifests](#auto-deploying-manifests)
- [Using the Helm CRD](#using-the-helm-crd)
- [Accessing the cluster from outside with kubectl](#accessing-the-cluster-from-outside-with-kubectl)
- [Using Docker as the container runtime](#using-docker-as-the-container-runtime)
- [Running K3s with RootlessKit (Experimental)](#running-k3s-with-rootlesskit-experimental)
- [Node labels and taints](#node-labels-and-taints)
- [Starting the server with the installation script](#starting-the-server-with-the-installation-script)
- [Additional preparation for Alpine Linux setup](#additional-preparation-for-alpine-linux-setup)
- [Running K3d (K3s in Docker) and docker-compose](#running-k3d-k3s-in-docker-and-docker-compose)

# Setting Up the kubeconfig File

The kubeconfig file is used to configure access to the Kubernetes cluster. It is required to be set up properly in order to access the Kubernetes API such as with kubectl or for installing applications with Helm. You may set the kubeconfig by either exporting the KUBECONFIG environment variable or by specifying a flag for kubectl and helm. Refer to the examples below for details.

Leverage the KUBECONFIG environment variable:

```
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
kubectl get pods --all-namespaces
helm ls --all-namespaces
```

Or specify the location of the kubeconfig file per command:

```
kubectl --kubeconfig /etc/rancher/k3s/k3s.yaml get pods --all-namespaces
helm --kubeconfig /etc/rancher/k3s/k3s.yaml ls --all-namespaces
```

# Using Helm 3

K3s release _v1.17.0+k3s.1_ added support for Helm 3. You can access the Helm 3 documentation [here](https://helm.sh/docs/intro/quickstart/).
Note that Helm 3 no longer requires tiller and the helm init command. Refer to the official documentation for details.

K3s does not require any special configuration to start using Helm 3. Just be sure you have properly set up your kubeconfig as per the [Setting Up the kubeconfig File](#setting-up-the-kubeconfig-file) section above.


### Upgrading

If you were using Helm v2 in previous versions of K3s, you may upgrade to v1.17.0+k3s.1 or newer and Helm 2 will still function. If you wish to migrate to Helm 3, [this](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/) blog post by Helm explains how to use a plugin to successfully migrate. Refer to the official Helm 3 documentation [here](https://helm.sh/docs/) for more information. K3s will handle either Helm v2 or Helm v3 as of v1.17.0+k3s.1. Just be sure you have properly set your kubeconfig as per the examples above in the [Setting Up the kubeconfig File](#setting-up-the-kubeconfig-file) section.

# Auto-Deploying Manifests

Any file found in `/var/lib/rancher/k3s/server/manifests` will automatically be deployed to
Kubernetes in a manner similar to `kubectl apply`.

It is also possible to deploy Helm charts. K3s supports a CRD controller for installing charts. A YAML file specification can look as following (example taken from `/var/lib/rancher/k3s/server/manifests/traefik.yaml`):

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: traefik
  namespace: kube-system
spec:
  chart: stable/traefik
  set:
    rbac.enabled: "true"
    ssl.enabled: "true"
```

Keep in mind that `namespace` in your HelmChart resource metadata section should always be `kube-system`, because the K3s deploy controller is configured to watch this namespace for new HelmChart resources. If you want to specify the namespace for the actual Helm release, you can do that using `targetNamespace` key under the `spec` directive, as shown in the configuration example below.

> **Note:** In order for the Helm Controller to know which version of Helm to use to Auto-Deploy a helm app, please specify the `helmVersion` in the spec of your YAML file.

Also note that besides `set`, you can use `valuesContent` under the `spec` directive. And it's okay to use both of them:

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: grafana
  namespace: kube-system
spec:
  chart: stable/grafana
  targetNamespace: monitoring
  set:
    adminPassword: "NotVerySafePassword"
  valuesContent: |-
    image:
      tag: master
    env:
      GF_EXPLORE_ENABLED: true
    adminUser: admin
    sidecar:
      datasources:
        enabled: true
```

K3s versions `<= v0.5.0` used `k3s.cattle.io` for the API group of HelmCharts. This has been changed to `helm.cattle.io` for later versions.

# Using the Helm CRD

You can deploy a 3rd party Helm chart using an example like this:

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: nginx
  namespace: kube-system
spec:
  chart: nginx
  repo: https://charts.bitnami.com/bitnami
  targetNamespace: default
```

You can install a specific version of a Helm chart using an example like this:

```yaml
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: stable/nginx-ingress
  namespace: kube-system
spec:
  chart: nginx-ingress
  version: 1.24.4
  targetNamespace: default
```

# Accessing the Cluster from Outside with kubectl

Copy `/etc/rancher/k3s/k3s.yaml` on your machine located outside the cluster as `~/.kube/config`. Then replace "localhost" with the IP or name of your K3s server. `kubectl` can now manage your K3s cluster.

# Using Docker as the Container Runtime

K3s includes and defaults to [containerd,](https://containerd.io/) an industry-standard container runtime. If you want to use Docker instead of containerd then you simply need to run the agent with the `--docker` flag.

K3s will generate config.toml for containerd in `/var/lib/rancher/k3s/agent/etc/containerd/config.toml`. For advanced customization for this file you can create another file called `config.toml.tmpl` in the same directory and it will be used instead.

The `config.toml.tmpl` will be treated as a Golang template file, and the `config.Node` structure is being passed to the template, the following is an example on how to use the structure to customize the configuration file https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L32

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

Just add `--rootless` flag to either server or agent.  So run `k3s server --rootless` and then look for the message
`Wrote kubeconfig [SOME PATH]` for where your kubeconfig to access you cluster is.

> Be careful, if you use `-o` to write
the kubeconfig to a different directory it will probably not work.  This is because the K3s instance in running in a different
mount namespace.

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

```bash
echo "cgroup /sys/fs/cgroup cgroup defaults 0 0" >> /etc/fstab

cat >> /etc/cgconfig.conf <<EOF
mount {
cpuacct = /cgroup/cpuacct;
memory = /cgroup/memory;
devices = /cgroup/devices;
freezer = /cgroup/freezer;
net_cls = /cgroup/net_cls;
blkio = /cgroup/blkio;
cpuset = /cgroup/cpuset;
cpu = /cgroup/cpu;
}
EOF
```

Then update **/etc/update-extlinux.conf** by adding:

```
default_kernel_opts="...  cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory"
```

Then update the config and reboot:

```bash
update-extlinux
reboot
```

After rebooting:

- Download **k3s** to **/usr/local/bin/k3s**
- Create an openrc file in **/etc/init.d**

# Running K3d (K3s in Docker) and docker-compose

[k3d](https://github.com/rancher/k3d) is a utility designed to easily run K3s in Docker.

It can be installed via the the [brew](https://brew.sh/) utility on MacOS:

```
brew install k3d
```

`rancher/k3s` images are also available to run the K3s server and agent from Docker. 

A `docker-compose.yml` is in the root of the K3s repo that serves as an example of how to run K3s from Docker. To run from `docker-compose` from this repo, run:

    docker-compose up --scale node=3
    # kubeconfig is written to current dir

    kubectl --kubeconfig kubeconfig.yaml get node

    NAME           STATUS   ROLES    AGE   VERSION
    497278a2d6a2   Ready    <none>   11s   v1.13.2-k3s2
    d54c8b17c055   Ready    <none>   11s   v1.13.2-k3s2
    db7a5a5a5bdd   Ready    <none>   12s   v1.13.2-k3s2

To run the agent only in Docker, use `docker-compose up node`.

Alternatively the `docker run` command can also be used:

    sudo docker run \
      -d --tmpfs /run \
      --tmpfs /var/run \
      -e K3S_URL=${SERVER_URL} \
      -e K3S_TOKEN=${NODE_TOKEN} \
      --privileged rancher/k3s:vX.Y.Z

