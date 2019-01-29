---
title: "4.  Install Rancher"
weight: 200
---

Rancher installation is managed using the Helm package manager for Kubernetes.  Use `helm` to install the prerequisite and charts to install Rancher.

> **Note:** For systems without direct internet access see [Air Gap: High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/).

### Add the Helm Chart Repository

Use `helm repo add` command to add the Helm chart repository that contains charts to install Rancher. For more information about the repository choices and which is best for your use case, see [Choosing a Version of Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories).

Replace both occurences of `<CHART_REPO>` with the Helm chart repository that you want to use (i.e. `latest` or `stable`).

```
helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
```

### Choose your SSL Configuration

Rancher Server is designed to be secure by default and requires SSL/TLS configuration.

There are three recommended options for the source of the certificate.

> **Note:** If you want terminate SSL/TLS externally, see [TLS termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination).

| Configuration | Chart option | Description | Requires cert-manager |
|-----|-----|-----|-----|
| [Rancher Generated Certificates](#rancher-generated-certificates) | `ingress.tls.source=rancher` | Use certificates issued by Rancher's generated CA (self signed)<br/>This is the **default** | [yes](#optional-install-cert-manager) |
| [Let’s Encrypt](#let-s-encrypt) | `ingress.tls.source=letsEncrypt` | Use [Let's Encrypt](https://letsencrypt.org/) to issue a certificate | [yes](#optional-install-cert-manager) |
| [Certificates from Files](#certificates-from-files) | `ingress.tls.source=secret` | Use your own certificate files by creating Kubernetes Secret(s) | no |

### Optional: Install cert-manager

> **Note:** cert-manager is only required for certificates issued by Rancher's generated CA (`ingress.tls.source=rancher`) and Let's Encrypt issued certificates (`ingress.tls.source=letsEncrypt`). You should skip this step if you are using your own certificate files (option `ingress.tls.source=secret`) or if you use [TLS termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination).

> **Important:** Due to an issue with Helm v2.12.0 and cert-manager, please use Helm v2.12.1 or higher.

Rancher relies on [cert-manager](https://github.com/kubernetes/charts/tree/master/stable/cert-manager) version v0.5.2 from the official Kubernetes Helm chart repository to issue certificates from Rancher's own generated CA or to request Let's Encrypt certificates.


Install `cert-manager` from Kubernetes Helm chart repository.

```
helm install stable/cert-manager \
  --name cert-manager \
  --namespace kube-system \
  --version v0.5.2
```

Wait for `cert-manager` to be rolled out:

```
kubectl -n kube-system rollout status deploy/cert-manager
Waiting for deployment "cert-manager" rollout to finish: 0 of 1 updated replicas are available...
deployment "cert-manager" successfully rolled out
```

<br/>

#### Rancher Generated Certificates

> **Note:** You need to have [cert-manager](#optional-install-cert-manager) installed before proceeding.

The default is for Rancher to generate a CA and uses `cert-manager` to issue the certificate for access to the Rancher server interface. Because `rancher` is the default option for `ingress.tls.source`, we are not specifying `ingress.tls.source` when running the `helm install` command.

- Replace `<CHART_REPO>` with the repository that you configured in [Add the Helm Chart Repository](#add-the-helm-chart-repository) (i.e. `latest` or `stable`).
- Set the `hostname` to the DNS name you pointed at your load balancer.

```
helm install rancher-<CHART_REPO>/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org
```

Wait for Rancher to be rolled out:

```
kubectl -n cattle-system rollout status deploy/rancher
Waiting for deployment "rancher" rollout to finish: 0 of 3 updated replicas are available...
deployment "rancher" successfully rolled out
```

#### Let's Encrypt

> **Note:** You need to have [cert-manager](#optional-install-cert-manager) installed before proceeding.

This option uses `cert-manager` to automatically request and renew [Let's Encrypt](https://letsencrypt.org/) certificates. This is a free service that provides you with a valid certificate as Let's Encrypt is a trusted CA. This configuration uses HTTP validation (`HTTP-01`) so the load balancer must have a public DNS record and be accessible from the internet.

- Replace `<CHART_REPO>` with the repository that you configured in [Add the Helm Chart Repository](#add-the-helm-chart-repository) (i.e. `latest` or `stable`).

- Set `hostname` to the public DNS record, set `ingress.tls.source` to `letsEncrypt` and `letsEncrypt.email` to the email address used for communication about your certificate (for example, expiry notices)

```
helm install rancher-<CHART_REPO>/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=letsEncrypt \
  --set letsEncrypt.email=me@example.org
```

Wait for Rancher to be rolled out:

```
kubectl -n cattle-system rollout status deploy/rancher
Waiting for deployment "rancher" rollout to finish: 0 of 3 updated replicas are available...
deployment "rancher" successfully rolled out
```

#### Certificates from Files

Create Kubernetes secrets from your own certificates for Rancher to use.


> **Note:** The `Common Name` or a `Subject Alternative Names` entry in the server certificate must match the `hostname` option, or the ingress controller will fail to configure correctly. Although an entry in the `Subject Alternative Names` is technically required, having a matching `Common Name` maximizes compatibility with older browsers/applications. If you want to check if your certificates are correct, see [How do I check Common Name and Subject Alternative Names in my server certificate?]({{< baseurl >}}/rancher/v2.x/en/faq/technical/#how-do-i-check-common-name-and-subject-alternative-names-in-my-server-certificate)

- Replace `<CHART_REPO>` with the repository that you configured in [Add the Helm Chart Repository](#add-the-helm-chart-repository) (i.e. `latest` or `stable`).
- Set `hostname` and set `ingress.tls.source` to `secret`.
- If you are using a Private CA signed certificate , add `--set privateCA=true` to the command shown below.

```
helm install rancher-<CHART_REPO>/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret
```

Now that Rancher is deployed, see [Adding TLS Secrets]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/) to publish the certificate files so Rancher and the ingress controller can use them.

After adding the secrets, check if Rancher was rolled out successfully:

```
kubectl -n cattle-system rollout status deploy/rancher
Waiting for deployment "rancher" rollout to finish: 0 of 3 updated replicas are available...
deployment "rancher" successfully rolled out
```

If you see the following error: `error: deployment "rancher" exceeded its progress deadline`, you can check the status of the deployment by running the following command:

```
kubectl -n cattle-system get deploy rancher
NAME      DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
rancher   3         3         3            3           3m
```

It should show the same count for `DESIRED` and `AVAILABLE`.

### Advanced Configurations

The Rancher chart configuration has many options for customizing the install to suit your specific environment. Here are some common advanced scenarios.

* [HTTP Proxy]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#http-proxy)
* [Private Docker Image Registry]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#private-registry-and-air-gap-installs)
* [TLS Termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination)

See the [Chart Options]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/) for the full list of options.

### Save your options

Make sure you save the `--set` options you used. You will need to use the same options when you upgrade Rancher to new versions with Helm.

### Finishing Up

That's it you should have a functional Rancher server. Point a browser at the hostname you picked and you should be greeted by the colorful login page.

Doesn't work? Take a look at the [Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/troubleshooting/) Page
