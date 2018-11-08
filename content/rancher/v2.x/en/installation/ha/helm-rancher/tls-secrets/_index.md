---
title: Adding TLS Secrets
weight: 276
---

Kubernetes will create all the objects and services for Rancher, but it will not become available until we populate the `tls-rancher-ingress` secret in the `cattle-system` namespace with the certificate and key.

Combine the server certificate followed by any intermediate certificate(s) needed into a file named `tls.crt`. Copy your certificate key into a file named `tls.key`.

Use `kubectl` with the `tls` secret type to create the secrets.

```
kubectl -n cattle-system create secret tls tls-rancher-ingress \
  --cert=tls.crt \
  --key=tls.key
```

### Using a Private CA Signed Certificate

If you are using a private CA, Rancher requires a copy of the CA certificate which is used by the Rancher Agent to validate the connection to the server.

Copy the CA certificate into a file named `cacerts.pem` and use `kubectl` to create the `tls-ca` secret in the `cattle-system` namespace.

>**Important:** Make sure the file is called `cacerts.pem` as Rancher uses that filename to configure the CA certificate.

```
kubectl -n cattle-system create secret generic tls-ca \
  --from-file=cacerts.pem
```
