---
title: "Configuration Info"
weight: 50
---

This section contains information on using K3s with various configurations.


Auto-Deploying Manifests
------------------------

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

Keep in mind that `namespace` in your HelmChart resource metadata section should always be `kube-system`, because the K3s deploy controller is configured to watch this namespace for new HelmChart resources. If you want to specify the namespace for the actual helm release, you can do that using `targetNamespace` key in the spec section:

```
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

Also note that besides `set` you can use `valuesContent` in the spec section. And it's okay to use both of them.

K3s versions `<= v0.5.0` used `k3s.cattle.io` for the api group of helmcharts, this has been changed to `helm.cattle.io` for later versions.

Using the helm CRD
---------------------

You can deploy a 3rd party helm chart using an example like this:

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

You can install a specific version of a helm chart using an example like this:

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

Accessing Cluster from Outside
-----------------------------

Copy `/etc/rancher/k3s/k3s.yaml` on your machine located outside the cluster as `~/.kube/config`. Then replace
"localhost" with the IP or name of your K3s server. `kubectl` can now manage your K3s cluster.

Node Registration
-----------------

Agents will register with the server using the node cluster secret along with a randomly generated 
password for the node, stored at `/etc/rancher/node/password`. The server will
store the passwords for individual nodes at `/var/lib/rancher/k3s/server/cred/node-passwd`, and any 
subsequent attempts must use the same password. If the `/etc/rancher/node` directory of an agent is removed the
password file should be recreated for the agent, or the entry removed from the server. A unique node
id can be appended to the hostname by launching k3s servers or agents using the `--with-node-id` flag.

Containerd and Docker
----------

K3s includes and defaults to containerd. If you want to use Docker instead of containerd then you simply need to run the agent with the `--docker` flag.

K3s will generate config.toml for containerd in `/var/lib/rancher/k3s/agent/etc/containerd/config.toml`, for advanced customization for this file you can create another file called `config.toml.tmpl` in the same directory and it will be used instead.

The `config.toml.tmpl` will be treated as a Golang template file, and the `config.Node` structure is being passed to the template, the following is an example on how to use the structure to customize the configuration file https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L32

Rootless (Experimental)
--------

_**WARNING**:_ Experimental feature

Initial rootless support has been added but there are a series of significant usability issues surrounding it.
We are releasing the initial support for those interested in rootless and hopefully some people can help to
improve the usability.  First ensure you have proper setup and support for user namespaces.  Refer to the
[requirements section](https://github.com/rootless-containers/rootlesskit#setup) in RootlessKit for instructions.
In short, latest Ubuntu is your best bet for this to work.


**Issues w/ Rootless**:

* **Ports**

    When running rootless a new network namespace is created.  This means that K3s instance is running with networking
    fairly detached from the host.  The only way to access services run in K3s from the host is to setup port forwards
    to the K3s network namespace.  We have a controller that will automatically bind 6443 and service port below 1024 to the host with an offset of 10000. 

    That means service port 80 will become 10080 on the host, but 8080 will become 8080 without any offset.

    Currently, only `LoadBalancer` services are automatically bound.

* **Daemon lifecycle**

    Once you kill K3s and then start a new instance of K3s it will create a new network namespace, but it doesn't kill the old pods.  So you are left
    with a fairly broken setup.  This is the main issue at the moment, how to deal with the network namespace.

    The issue is tracked in https://github.com/rootless-containers/rootlesskit/issues/65

* **Cgroups**

    Cgroups are not supported

**Running w/ Rootless**:

Just add `--rootless` flag to either server or agent.  So run `k3s server --rootless` and then look for the message
`Wrote kubeconfig [SOME PATH]` for where your kubeconfig to access you cluster is.  Be careful, if you use `-o` to write
the kubeconfig to a different directory it will probably not work.  This is because the K3s instance in running in a different
mount namespace.

Node Labels and Taints
----------------------

K3s agents can be configured with the options `--node-label` and `--node-taint` which adds a label and taint to the kubelet. The two options only add labels and/or taints at registration time, so they can only be added once and not changed after that again by running K3s. If you want to change node labels and taints after node registration you should use `kubectl`. Below is an example showing how to add labels and a taint:
```
     --node-label foo=bar \
     --node-label hello=world \
     --node-taint key1=value1:NoExecute
```

