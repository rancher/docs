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

For additional chart details, view the [source of these Rancher server charts](https://github.com/rancher/server-chart).

### Install cert-manager

> **Note:** cert-manager is only required for Rancher generated and LetsEncrypt issued certificates.  You may skip this step if you are bringing your own certificates and using the `ingress.tls.source=secret` option.

Rancher relies on [cert-manager](https://github.com/kubernetes/charts/tree/master/stable/cert-manager) from the Kubernetes Helm "stable" catalog to issue self-signed or LetsEncrypt certificates.

Install `cert-manager` from the Helm stable catalog.

```
helm install stable/cert-manager \
  --name cert-manager \
  --namespace kube-system
```

### Choose your SSL Configuration

Rancher server is designed to be "secure by default" and requires SSL/TLS configuration.

There are three options for the source of the certificate.

1. `rancher` - (Default) Use Rancher generated CA/Certificates.
2. `letsEncrypt` - Use [LetsEncrypt](https://letsencrypt.org/) to issue a cert.
3. `secret` - Configure a Kubernetes Secret with your certificate files.

<br\>

#### (Default) Rancher Generated Certificates

The default is for Rancher to generate a CA and use the `cert-manager` to issue the certificate for access to the Rancher server interface.

The only requirement is to set the `hostname` to the DNS name you pointed at your Load Balancer.

```
helm install rancher-stable/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org
```

#### LetsEncrypt

Use [LetsEncrypt](https://letsencrypt.org/)'s free service to issue trusted SSL certs. This configuration uses http validation so the Load Balancer must have a Public DNS record and be accessible from the internet.

Set `hostname`, `ingress.tls.source=letEncrypt` and LetsEncrypt options.

```
helm install rancher-stable/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=letsEncrypt \
  --set letsEncrypt.email=me@example.org
```

#### Certificates from Files (Kubernetes Secret)

Create Kubernetes Secrets from your own certificates for Rancher to use.

> **NOTE:** The common name for the cert will need to match the `hostname` option or the ingress controller will fail to provision the site for Rancher.

Set `hostname` and `ingress.tls.source=secret`

> **NOTE:** If you are using a Private CA signed cert, add `--set privateCA=true`

```
helm install rancher-stable/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret
```

Now that Rancher is running, see [Adding TLS Secrets]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/) to publish the certificate files so Rancher and the Ingress Controller can use them.

### Advanced Configurations

The Rancher chart configuration has many options for customizing the install to suit your specific environment. Here are some common advanced scenarios.

* [HTTP Proxy]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#http-proxy)
* [Private Docker Image Registry]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#private-registry)
* [TLS Termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination)

See the [Chart Options]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/) for the full list of options.

### Save your options

Make sure you save the `--set` options you used. You will need to use the same options when you upgrade Rancher to new versions with Helm.

### Finishing Up

That's it you should have a functional Rancher server. Point a browser at the hostname you picked and you should be greeted by the colorful login page.

Doesn't Work? Take a look at the [Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/troubleshooting/) Page
