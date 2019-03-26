---
title: Nodes
weight: 210
---

The `nodes` directive is the only required section in the `cluster.yml` file. It's used by RKE to specify cluster node(s), ssh credentials used to access the node(s) and which roles these nodes will be in the Kubernetes cluster.

```yaml
nodes:
    nodes:
    - address: 1.1.1.1
      user: ubuntu
      role:
      - controlplane
      - etcd
      ssh_key_path: /home/user/.ssh/id_rsa
      port: 2222
    - address: 2.2.2.2
      user: ubuntu
      role:
      - worker
      ssh_key: |-
        -----BEGIN RSA PRIVATE KEY-----

        -----END RSA PRIVATE KEY-----
    - address: 3.3.3.3
      user: ubuntu
      role:
      - worker
      ssh_key_path: /home/user/.ssh/id_rsa
      ssh_cert_path: /home/user/.ssh/id_rsa-cert.pub
    - address: 4.4.4.4
      user: ubuntu
      role:
      - worker
      ssh_key_path: /home/user/.ssh/id_rsa
      ssh_cert: |-
        ssh-rsa-cert-v01@openssh.com AAAAHHNza...
    - address: example.com
      user: ubuntu
      role:
      - worker
      hostname_override: node3
      internal_address: 192.168.1.6
      labels:
        app: ingress
```

## Node Options

Within each node, there are multiple directives that can be used.

### Address

The `address` directive will be used to set the hostname or IP address of the node. RKE must be able to connect to this address.

### Internal Address

The `internal_address` provides the ability to have nodes with multiple addresses set a specific address to use for inter-host communication on a private network. If the `internal_address` is not set, the `address` is used for inter-host communication.

### Overriding the Hostname

The `hostname_override` is used to be able to provide a friendly name for RKE to use when registering the node in Kubernetes. This hostname doesn't need to be a routable address, but it must be a valid [Kubernetes resource name](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names). If the `hostname_override` isn't set, then the `address` directive is used when registering the node in Kubernetes.

> **Note:** When [cloud providers]({{< baseurl >}}/rke/v0.1.x/en/config-options/cloud-providers/) are configured, you may need to override the hostname in order to use the cloud provider correctly. There is an exception for the [AWS cloud provider](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#aws), where the `hostname_override` field will be explicitly ignored.

### SSH Port

In each node, you specify which `port` to be used when connecting to this node. The default port is `22`.

### SSH Users

For each node, you specify the `user` to be used when connecting to this node. This user must be a member of the Docker group or allowed to write to the node's Docker socket.

### SSH Key Path

For each node, you specify the path, i.e. `ssh_key_path`, for the SSH private key to be used when connecting to this node. The default key path for each node is `~/.ssh/id_rsa`.

> **Note:** If you have a private key that can be used across all nodes, you can set the [SSH key path at the cluster level]({{< baseurl >}}/rke/v0.1.x/en/config-options/#cluster-level-ssh-key-path). The SSH key path set in each node will always take precedence.

### SSH Key

Instead of setting the path to the SSH key, you can alternatively specify the actual key, i.e. `ssh_key`, to be used to connect to the node.

### SSH Certificate Path

For each node, you can specify the path, i.e. `ssh_cert_path`, for the signed SSH certificate to be used when connecting to this node.

### SSH Certificate

Instead of setting the path to the signed SSH certificate, you can alternatively specify the actual certificate, i.e. `ssh_cert`, to be used to connect to the node.

### Kubernetes Roles

You can specify the list of roles that you want the node to be as part of the Kubernetes cluster. Three roles are supported: `controlplane`, `etcd` and `worker`. Node roles are not mutually exclusive. It's possible to assign any combination of roles to any node. It's also possible to change a node's role using the upgrade process.

> **Note:** Prior to v0.1.8, workloads/pods might have run on any nodes with `worker` or `controlplane` roles, but as of v0.1.8, they will only be deployed to any `worker` nodes.

* **etcd**

With this role, the `etcd` container will be run on these nodes.  Etcd keeps the state of your cluster and is the most important component in your cluster, single source of truth of your cluster. Although you can run etcd on just one node, it typically takes 3, 5 or more nodes to create an HA configuration. Etcd is a distributed reliable key-value store which stores all Kubernetes state. [Taint set on nodes](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) with the **etcd** role is shown below:

Taint Key                              | Taint Value  | Taint Effect
---------------------------------------|--------------|--------------
`node-role.kubernetes.io/etcd`         | `true`       | `NoExecute`

* **controlplane**

With this role, the stateless components that are used to deploy Kubernetes will run on these nodes. These components are used to run the API server, scheduler, and controllers. [Taint set on nodes](https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/) with the **controlplane** role is shown below:

Taint Key                              | Taint Value  | Taint Effect
---------------------------------------|--------------|--------------
`node-role.kubernetes.io/controlplane` | `true`       | `NoSchedule`

* **worker**

With this role, any workloads or pods that are deployed will land on these nodes.

### Docker Socket

If the Docker socket is different than the default, you can set the `docker_socket`. The default is `/var/run/docker.sock`

### Labels

You have the ability to add an arbitrary map of labels for each node. It can be used when using the [ingress controller's]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/ingress-controllers/) `node_selector` option.
