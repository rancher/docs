---
title: Bastion/Jump Host Configuration
weight: 3015
draft: true
---

Since RKE uses `ssh` to connect to [nodes]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes/), you can configure to use a bastion host.

```yaml
bastion_host:
  address: x.x.x.x
  user: ubuntu
  port: 22
  ssh_key_path: /home/user/.ssh/bastion_rsa
  # or
  # ssh_key: |-
  #   -----BEGIN RSA PRIVATE KEY-----
  #
  #   -----END RSA PRIVATE KEY-----
```

## Bastion Host Options

### Address

The `address` directive will be used to set the hostname or IP address of the bastion host. RKE must be able to connect to this address.

### SSH Port

You specify which `port` to be used when connecting to the bastion host. The default port is `22`.

### SSH Users

You specify the `user` to be used when connecting to this node.

### SSH Key Path

You specify the path, i.e. `ssh_key_path`, for the SSH private key to be used when connecting to the bastion host.

### SSH Key

Instead of setting the path to the SSH key, you can specify the actual key, i.e. `ssh_key`, to be used to connect to the bastion host.
