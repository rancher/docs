---
title: 4 - Install Rancher
weight: 200
---

Rancher installation is now managed using the Helm package manager for Kubernetes.  Use `helm` to install the prerequisite and Rancher charts.

### Add the Chart Repo

Use `helm repo add` to add the Rancher chart repository.

```
helm repo add rancher-stable https://releases.rancher.com/server-charts/stable
```

### Install cert-manager

Rancher relies on [cert-manager](https://github.com/kubernetes/charts/tree/master/stable/cert-manager) from the Kubernetes Helm "stable" catalog to issue self-signed or LetsEncrypt certificates.

Install `cert-manager` from the Helm stable catalog.

```
helm install stable/cert-manager --name cert-manager --namespace kube-system
```

### Choose your SSL Configuration

Rancher server is designed to be "secure by default" and requires SSL/TLS configuration.

There are three options for the source of the certificate.

* `rancher` - (Default) Use Rancher generated CA/Certificates.
* `letsEncrypt` - Use [LetsEncrypt](https://letsencrypt.org/) to issue a cert.
* `secret` - Configure a Kubernetes Secret with your certificate files.

<br\>

#### (Default) Rancher Generated Certificates

The default is to use the Rancher to generate a CA and use the `cert-manager` to issue the certificate for access to the Rancher server interface.

The only requirement is to set the `hostname` to the DNS name you pointed at your Load Balancer.

```
helm install rancher-stable/rancher --name rancher --namespace cattle-system \
--set hostname=rancher.my.org
```

#### LetsEncrypt

Use LetsEncrypt's free service to issue trusted SSL certs. This configuration uses http validation so the Load Balancer must have a Public DNS record and be accessible from the internet.

Set `hostname`, `ingress.tls.source=letEncrypt` and LetsEncrypt options.

```
helm install rancher-stable/rancher --name rancher --namespace cattle-system \
--set hostname=rancher.my.org \
--set ingress.tls.source=letsEncrypt \
--set letsEncrypt.email=me@example.org
```

> LetsEncrypt ProTip: The default `production` environment only allows you to register a name 5 times in a week. If you're rebuilding a bunch of times, use `--set letsEncrypt.environment=staging` until you have you're confident your config is right.

#### Certificates from Files (Kubernetes Secret)

Create Kubernetes Secrets from your own certificates for Rancher to use.

> NOTE: The common name for the cert will need to match the `hostname` option or the ingress controller will fail to provision the site for Rancher.

Set `hostname` and `ingress.tls.source=secret`

> NOTE: If you are using a Private CA signed cert, add `--set privateCA=true`

```
helm install rancher-stable/rancher --name rancher --namespace cattle-system \
--set hostname=rancher.my.org \
--set ingress.tls.source=secret
```

Now that Rancher is running, see [Adding TLS Secrets](tls-secrets/) to publish the certificate files so Rancher and the Ingress Controller can use them.

### Advanced Configurations

The Rancher chart configuration has many options for customizing the install to suit your specific environment. Here are some common advanced scenarios.

* [Private Docker Image Registry/Air Gap Network](chart-options/#private-or-air-gap-registry)

See the [Chart Options](chart-options/) for the full list of options.

### Finishing Up

That's it you should have a functional Rancher server. Point a browser at the hostname you picked and you should be greeted by the colorful login page.

Doesn't Work? Take a look at the [Troubleshooting](troubleshooting/) Page
