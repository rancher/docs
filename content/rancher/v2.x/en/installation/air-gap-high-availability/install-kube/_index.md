---
title: "3. Install Kubernetes with RKE"
weight: 300
aliases:

---

## A. Create an RKE Config File


From a system that can access ports 22/tcp and 6443/tcp on your host nodes, use the sample below to create `rancher-cluster.yml`. This file is a Rancher Kubernetes Engine configuration file (RKE config file), which is a configuration for the cluster you're deploying Rancher to.  Replace the IP addresses in the `nodes` list with the IP address or DNS names of the 3 nodes you created.

>**Tip:** See [Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/) for more details on the options available.

Replace values in the code sample according to the table below.

| Directive Replacement   | Description                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `address`               | The IP address for each of your air gap nodes outside of the cluster. |
| `internal_address`      | The IP address for each of your air gap nodes within the cluster.     |
| `url`                   | The URL for your private registry.                                    |

> **Note:**  If your node has public and internal addresses, it is recommended to set the `internal_address:` so Kubernetes will use it for intra-cluster communication.  Some services like AWS EC2 require setting the `internal_address:` if you want to use self-referencing security groups or firewalls.

```yaml
nodes:
- address: 18.222.121.187           # air gap node external IP
  internal_address: 172.31.7.22   # air gap node internal IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_file: /home/user/.ssh/id_rsa
- address: 18.220.193.254           # air gap node external IP
  internal_address: 172.31.13.132 # air gap node internal IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_file: /home/user/.ssh/id_rsa
- address: 13.59.83.89              # air gap node external IP
  internal_address: 172.31.3.216  # air gap node internal IP
  user: rancher
  role: [ "controlplane", "etcd", "worker" ]
  ssh_key_file: /home/user/.ssh/id_rsa

private_registries:
- url: <REGISTRY.YOURDOMAIN.COM:PORT> # private registry url
  user: rancher
  password: "*********"
  is_default: true
```

### Common RKE Nodes Options

| Option             | Required | Description                                                                            |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| `address`          | yes      | The public DNS or IP address                                                           |
| `user`             | yes      | A user that can run docker commands                                                    |
| `role`             | yes      | List of Kubernetes roles assigned to the node                                          |
| `internal_address` | no       | The private DNS or IP address for internal cluster traffic                             |
| `ssh_key_path`     | no       | Path to SSH private key used to authenticate to the node (defaults to `~/.ssh/id_rsa`) |

<!-- TODO: add troubleshooting and other links -->

## B. Run RKE

After configuring `rancher-cluster.yml`, open Terminal and change directories to the RKE binary. Then enter the command below to stand up your high availability cluster.

```
rke up --config ./rancher-cluster.yml
```