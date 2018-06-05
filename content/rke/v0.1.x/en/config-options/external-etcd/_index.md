---
title: External etcd
weight: 3000
draft: true
---


RKE supports using external etcd instead of deploying etcd servers, to enable external etcd the following parameters should be populated:

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

Note that RKE only supports connecting to TLS enabled etcd setup, user can enable multiple endpoints in the `external_urls` field. RKE will not accept having external urls and nodes with `etcd` role at the same time, user should only specify either etcd role for servers or external etcd but not both.
