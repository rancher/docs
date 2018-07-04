---
title: 5 - Install Rancher
weight: 276
---

Rancher installation is now managed using the Helm package manager for Kubernetes.  Use `helm` to install the prerequisite and Rancher charts.

## Prerequisites

### Add the Chart Repo

Add the Rancher chart repository.

```
helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
```

### Install `cert-manager`

Rancher relies on [cert-manager](https://github.com/kubernetes/charts/tree/master/stable/cert-manager) from the Kubernetes Helm Stable catalog to issue self-signed or LetsEncrypt certificates.

Install `cert-manager` from the Helm stable catalog.

```
helm install stable/cert-manager --name cert-manager --namespace kube-system
```

## Installing Rancher

Rancher server is designed to be "secure by default" and requires SSL/TLS configuration.

There are three options for the source of the certificate.

* `rancher` - (Default) Use Rancher generated CA/Certificates.
* `letsEncrypt` - Use [LetsEncrypt](https://letsencrypt.org/) to issue a cert.
* `secret` - Configure a Kubernetes Secret with your certificate files.

### (Default) Rancher Generated Certificates

The default is to use the Rancher to generate a CA and use the `cert-manager` to issue the certificate for access to the Rancher server interface.

The only requirement is to set the `hostname` to the DNS name you pointed at your Load Balancer.

```
helm install rancher-stable/rancher --name rancher --namespace cattle-system \
--set hostname=rancher.my.org
```

### LetsEncrypt

Use LetsEncrypt's free service to issue trusted SSL certs. This configuration uses http validation so the Load Balancer must have a Public DNS record and be accessible from the internet.

Set `hostname`, `ingress.tls.source=letEncrypt` and LetsEncrypt options.

```
helm install rancher-stable/rancher --name rancher --namespace cattle-system \
--set hostname=rancher.my.org \
--set ingress.tls.source=letsEncrypt \
--set letsEncrypt.email=me@example.org
```

> LetsEncrypt ProTip: The default `production` environment only allows you to register a name 5 times in a week. If you're rebuilding a bunch of times, use `--set letsEncrypt.environment=staging` until you have you're confident your config is right.

### Certificates from Files (Kubernetes Secret)

Create Kubernetes Secrets from your own certificates for Rancher to use.

> NOTE: The common name for the cert will need to match the `hostname` option or the ingress controller will fail to provision the site for Rancher.

Set `hostname` and `ingress.tls.source=secret`

> NOTE: If you are using a Private CA signed cert, add `--set privateCA=true`

```
helm install rancher-stable/rancher --name rancher --namespace cattle-system \
--set hostname=rancher.my.org \
--set ingress.tls.source=secret
```

Now that Rancher is running, see [Adding TLS Secrets](#Adding-TLS-Secrets) to publish the certificate files so Rancher and the Ingress Controller can use them.

## Adding TLS Secrets

Kubernetes will create all the objects and services for Rancher, but it will not become available until we populate the `tls-rancher-ingress` secret in the `cattle-system` namespace with the certificate and key.

Combine the server certificate followed by the intermediate cert chain your CA provided into a file named `tls.crt`. Copy your key into a file name `tls.key`.

Use `kubectl` with the `tls` type to create the secrets.

```
kubectl -n cattle-system create secret tls tls-rancher-ingress --cert=./tls.crt --key=./tls.key
```

### Private CA Signed - Additional Steps

If you are using a private CA, Rancher will need to have a copy of the CA cert to include when generating agent configs.

Copy the CA cert into a file named `cacerts.pem` and use `kubectl` to create the `tls-ca` secret in the `cattle-system` namespace.

```
kubectl -n cattle-system create secret generic tls-ca --from-file=cacerts.pem
```

## Common Chart Options

| Option | Default Value | Description |
| --- | --- | --- |
| `hostname` | " " | `string` - the Fully Qualified Domain Name for your Rancher Server |
| `ingress.tls.source` | "rancher" | `string` - Where to get the cert for the ingress. - "rancher, letsEncrypt, secret" |
| `letsEncrypt.email` | " " | `string` - Your email address |
| `letsEncrypt.environment` | "production" | `string` - Valid options: "staging, production" |
| `privateCA` | false | `bool` - Set to true if your cert is signed by a private CA |

## Advanced Options

| Option | Default Value | Description |
| --- | --- | --- |
| `debug` | false | `bool` - set debug flag on rancher server |
| `imagePullSecrets` | [] | `list` - list of names of Secret resource containing private registry credentials |
| `resources` | {} | `map` - rancher pod resource requests & limits |
| `rancherImage` | "rancher/rancher" | `string` - rancher image source |
| `rancherImageTag` | same as chart version | `string` - rancher/rancher image tag |

## Private or Air Gap Registry

You can point to a private registry for an "Air Gap" install.

### Create Registry Secret

Create a Registry secret in the `cattle-system` namespace. Check out the [Kubernetes Docs](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) for more info.

### Registry Options

Add the `rancherImage` to point to your private registry image and `imagePullSecrets` to your install command.

```
--set rancherImage=private.reg.org:5000/rancher/rancher \
--set imagePullSecrets[0].name=secretName
```