---
title: Bastion/Jump Host Configuration
weight: 3000
draft: true
---
Since RKE uses `ssh` to connect to hosts, you may have to use RKE with a bastion host.
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
