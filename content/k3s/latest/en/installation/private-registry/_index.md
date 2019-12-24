---
title: "Using private registries"
weight: 50
---

This guide describes how to use your own private image registry with k3s.

This guide assumes that you already have the following things working:

- An image registry
- One or more k3s nodes
- Your TLS certificates used by your image registry (or the reverse proxy) are added to the k3s hosts


k3s can read a `registries.yaml` file to connect to your own private registry without installing k3s with docker as an external dependency. By creating a `registries.yaml` file at `/etc/rancher/k3s/registries.yaml` k3s will pick this file up when it starts and will use it to connect to a private registry. On master nodes the `/etc/rancher/k3s/` directory already exists, on worker nodes it doesn't and needs to be created under the root user, `mkdir -p /etc/rancher/k3s`.

`registries.yaml` can have the following format, listing all possible options:

```
mirrors:
  images.example.com:
    endpoints:
    - https://endpoint.example.com
    - https://endpoint2.example.com

configs:
  images.example.com:
    auth:
      username: joe
      password: hunter2
      # auth is a base64 encoded string from the concatenation of the username, a colon, and the password.
      auth: base64_encoded_identity_token
      # identity_token is used to authenticate the user and get an access token for the registry.
      identity_token: a_identity_token
    tls:
      ca_file: /path/to/cafile
      cert_file: /path/to/cert
      key_file: /path/to/key_file

```

Multiple registries can be listed under configs. Once `/etc/rancher/k3s/registries.yaml` has been deployed on all nodes on your k3s cluster, you'll need to restart the `k3s` or `k3s-agent` on each nodes. `k3s` for master nodes and `k3s-agent` for worker nodes.

After the restart pulling from your private registries should work.
