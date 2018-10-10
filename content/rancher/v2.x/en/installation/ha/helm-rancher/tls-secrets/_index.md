---
title: Adding TLS Secrets
weight: 276
---

Kubernetes will create all the objects and services for Rancher, but it will not become available until we populate the `tls-rancher-ingress` secret in the `cattle-system` namespace with the certificate and key.

Combine the server certificate followed by the intermediate cert chain your CA provided into a file named `tls.crt`. Copy your key into a file name `tls.key`.

Use `kubectl` with the `tls` secret type to create the secrets.

```
kubectl -n cattle-system create secret tls tls-rancher-ingress \
  --cert=tls.crt \
  --key=tls.key
```

### Private CA Signed - Additional Steps

If you are using a private CA, Rancher will need to have a copy of the CA cert to include when generating agent configs.

Copy the CA cert into a file named `cacerts.pem` and use `kubectl` to create the `tls-ca` secret in the `cattle-system` namespace.

>**Important:** Make sure the file is called `cacerts.pem` as Rancher uses that filename to configure the CA cert.

```
kubectl -n cattle-system create secret generic tls-ca \
  --from-file=cacerts.pem
```
