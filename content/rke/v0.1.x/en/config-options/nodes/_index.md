---
title: Nodes
weight: 3000
draft: true
---
The `nodes` section is the only required section in the `cluster.yml` file. It's used by RKE to specify cluster node, ssh credentials used to access them and their roles in the RKE cluster.

The `nodes` section is a yaml list of node definitions:

``` yaml
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

The node definition supports the following options:
###### address
This is the hostname or the IP address of the node. RKE should be able to connect to this address.

###### internal_address
This option allows the user to use nodes with multiple addresses to keep inter-host communication on a private network. If this is not set, `address` is used instead.

###### hostname_override
This is a friendly name that RKE use to register the node with in Kubernetes. This doesn't need to be a routable address. If the `hostname_override` is not used, the `address` field is used instead.

> Note that this option is ignored by Kubernetes when Cloud Providers configuration is used. In that case, Kubernetes uses the hostname provided by the cloud provider.

###### port
SSH port to be used when connecting to this node. Default port is `22`

###### user
SSH user to be used when connecting to this node. Note that this user must be a member of the `docker` group or allowed to write to the node Docker socket.

###### ssh_key_path
Path for the ssh private key used to connect to this node.

###### ssh_key
An in-line option to set the private key used to connect to this node inside the cluster.yml file.

###### role
A yaml list of roles to specify the node role(s) in the Kubernetes cluster. Three roles are supported: `controlplane`, `etcd` and `worker`. Node roles are not mutually exclusive. It's possible to assign any combination of roles to any node. It's also possible to change a node's role using the upgrade process.

A working cluster has to have at least 1 node with the `controlplane` and `etcd` roles.

###### docker_socket
An option to specify a different Docker socket location for the node. The default is `/var/run/docker.sock`


###### labels
An option to set an arbitrary map labels for nodes. It's also handy when used with the ingress controller `node_selector` option.









<!-- explain how to set up nodes in yaml with examples and what is required-->
