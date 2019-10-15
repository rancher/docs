---
title: Bastion/Jump Host Configuration
weight: 220
---

Since RKE uses `ssh` to connect to [nodes]({{< baseurl >}}/rke/latest/en/config-options/nodes/), you can configure the `cluster.yml` so RKE will use a bastion host. Keep in mind that the [port requirements]({{< baseurl >}}/rke/latest/en/os/#ports) for the RKE node move to the configured bastion host.

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
    # Optionally using SSH certificates
    # ssh_cert_path: /home/user/.ssh/id_rsa-cert.pub
    # or
    # ssh_cert: |-
    #   ssh-rsa-cert-v01@openssh.com AAAAHHNza...
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

### SSH Certificate Path

You specify the path, i.e. `ssh_cert_path`, for the signed SSH certificate to be used when connecting to the bastion host.

### SSH Certificate

Instead of setting the path to the signed SSH certificate, you can specify the actual certificate, i.e. `ssh_cert`, to be used to connect to the bastion host.
