---
title: External etcd
weight: 3027
draft: true
---

By default, RKE will launch etcd servers, but RKE also supports being able to use an external etcd. RKE only supports connecting to a TLS enabled etcd setup.

> **Note:** RKE will not accept having external etcd servers in conjunction with [nodes]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes/) with the `etcd` role.

```
services:
  etcd:
    path: /etcdcluster
    external_urls:
      - https://etcd-example.com:2379
    ca_cert: |-
      -----BEGIN CERTIFICATE-----
      xxxxxxxxxx
      -----END CERTIFICATE-----
    cert: |-
      -----BEGIN CERTIFICATE-----
      xxxxxxxxxx
      -----END CERTIFICATE-----
    key: |-
      -----BEGIN PRIVATE KEY-----
      xxxxxxxxxx
      -----END PRIVATE KEY-----
```

## External etcd Options

### Path

The `path` defines the location of where the etcd cluster is on the endpoints.

### External URLs

The `external_urls` are the endpoints of where the etcd cluster is hosted. There can be multiple endpoints for the etcd cluster.

### CA Cert/Cert/KEY

The certificates and private keys used to authenticate and access the etcd service.
