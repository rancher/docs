---
title: Nodes
weight: 3005
draft: true
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
  - address: example.com
    user: ubuntu
    role:
    - role
    hostname_override: node3
    internal_address: 192.168.1.6
    labels:
      app: ingress
```

### Node Options

Within each node, there are multiple directives that can be used.

#### Address

The `address` directive will be used to set the hostname or IP address of the node. RKE must be able to connect to this address.

#### Internal Address

The `internal_address` provides the ability to have nodes with multiple addresses set a specific address to use for inter-host communication on a private network. If the `internal_address` is not set, the `address` is used for inter-host communication.

#### Overriding the Hostname

The `hostname_override` is used to be able to provide a friendly name for RKE to use when registering the node in Kubernetes. This hostname doesn't need to be a routable address. If the `hostname_override` isn't set, then the `address` directive is used when registering the node in Kubernetes.

> **Note:** When [cloud providers]({{< baseurl >}}/rke/v0.1.x/en/config-options/cloud-providers/) are configured, Kubernetes will use the hostname provided by the cloud provider.

#### SSH Port

In each node, you specify which `port` to be used when connecting to this node. The default port is `22`.

#### SSH Users

For each node, you specify the `user` to be used when connecting to this node. This user must be a member of the Docker group or allowed to write to the node's Docker socket.

#### SSH Key Path

For each node, you specify the path, i.e. `ssh_key_path`, for the SSH private key to be used when connecting to this node.

> **Note:** If you have a private key that can be used across all nodes, you can set the [SSH key path at the cluster level]({{< baseurl >}}/rke/v0.1.x/en/config-options/#cluster-level-ssh-key-path). The SSH key path set in each node will always take precedence.

#### SSH Key

Instead of setting the path to the SSH key, you can alternatively specify the actual key, i.e. `ssh_key`, to be used to connect to the node.

#### Kubernetes Roles

You can specify the list of roles that you want the node to be as part of the Kubernetes cluster. Three roles are supported: `controlplane`, `etcd` and `worker`. Node roles are not mutually exclusive. It's possible to assign any combination of roles to any node. It's also possible to change a node's role using the upgrade process.

* **etcd**

With this role, the `etcd` container will be run on these nodes. Although you can run etcd on just one node, it typically takes 3, 5 or more nodes to create an HA configuration. Etcd is a distributed reliable key-value store which stores all Kubernetes state.

* **controlplane**

With this role, the stateless components that are used to deploy Kubernetes will run on these nodes. These components are used to run the API server, scheduler, and controllers.


* **worker**

With this role, any workloads or pods that are deployed will land on these nodes.

> **Note:** Prior to v0.1.8, workloads/pods might have run on any nodes with `worker` or `controlplane` roles, but as of v0.1.8, they will only be deployed to any `worker` nodes. 

#### Docker Socket

If the Docker socket is different than the default, you can set the `docker_socket`. The default is `/var/run/docker.sock`

#### Labels

You have the ability to add an arbitrary map of labels for each node. It can be used when using the [ingress controller's]({{< baseurl >}}/rke/v0.1.x/en/config-options/ingress-controller/) `node_selector` option.









<!-- explain how to set up nodes in yaml with examples and what is required-->
