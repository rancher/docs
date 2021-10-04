---
title: TLS Settings
weight: 3
---

Changing the default TLS settings depends on the chosen installation method.

# Running Rancher in a highly available Kubernetes cluster

When you install Rancher inside of a Kubernetes cluster, TLS is offloaded at the cluster's ingress controller. The possible TLS settings depend on the used ingress controller:

* nginx-ingress-controller (default for RKE1 and RKE2): [Default TLS Version and Ciphers](https://kubernetes.github.io/ingress-nginx/user-guide/tls/#default-tls-version-and-ciphers).
* traefik (default for K3s): [TLS Options](https://doc.traefik.io/traefik/https/tls/#tls-options).

# Running Rancher in a single Docker container

The default TLS configuration only accepts TLS 1.2 and secure TLS cipher suites. You can change this by setting the following environment variables:

| Parameter | Description | Default | Available options |
|-----|-----|-----|-----|
| `CATTLE_TLS_MIN_VERSION` | Minimum TLS version | `1.2` | `1.0`, `1.1`, `1.2`, `1.3` |
| `CATTLE_TLS_CIPHERS` | Allowed TLS cipher suites | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`,<br/>`TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`,<br/>`TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305`,<br/>`TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`,<br/>`TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`,<br/>`TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305` | See [Golang tls constants](https://golang.org/pkg/crypto/tls/#pkg-constants) |
