---
title: "3. Install Kubernetes with RKE"
weight: 300
aliases:

---

## A. Create an RKE Config File

From a system that can access ports 22/tcp and 6443/tcp on your host nodes, use the sample below to create a new file named `rancher-cluster.yml`. This file is a Rancher Kubernetes Engine configuration file (RKE config file), which is a configuration for the cluster you're deploying Rancher to.

Replace values in the code sample below with help of the _RKE Options_ table. Use the IP address or DNS names of the [3 nodes]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/provision-hosts) you created.

>**Tip:** For more details on the options available, see the RKE [Config Options]({{< baseurl >}}/rke/v0.1.x/en/config-options/).

<figcaption>RKE Options</figcaption>

| Option             | Required | Description                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| `address`          | ✓        | The DNS or IP address for the node within the air gap network.                                                           |
| `user`             | ✓        | A user that can run docker commands.                                                    |
| `role`             | ✓       | List of Kubernetes roles assigned to the node.                                          |
| `internal_address` | optional<sup>1</sup>      | The DNS or IP address used for internal cluster traffic.                             |
| `ssh_key_path`     |        | Path to SSH private key used to authenticate to the node (defaults to `~/.ssh/id_rsa`). |


> <sup>1</sup> Some services like AWS EC2 require setting the `internal_address` if you want to use self-referencing security groups or firewalls.

```yaml
nodes:
- address: 10.10.3.187            # node air gap network IP
  internal_address: 172.31.7.22   # node intra-cluster IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_path: /home/user/.ssh/id_rsa
- address: 10.10.3.254            # node air gap network IP
  internal_address: 172.31.13.132 # node intra-cluster IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_path: /home/user/.ssh/id_rsa
- address: 10.10.3.89             # node air gap network IP
  internal_address: 172.31.3.216  # node intra-cluster IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_path: /home/user/.ssh/id_rsa

private_registries:
- url: <REGISTRY.YOURDOMAIN.COM:PORT> # private registry url
  user: rancher
  password: "*********"
  is_default: true
```



## B. Run RKE

After configuring `rancher-cluster.yml`, open Terminal and change directories to the RKE binary. Then enter the command below to stand up your high availability cluster.

```
rke up --config ./rancher-cluster.yml
```

### [Next: Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/install-rancher)
