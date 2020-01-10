---
title: 3. Installing Rancher Using the Helm Kubernetes Package Manager
description: Rancher installation is managed using the Helm Kubernetes package manager. Use Helm to install the prerequisites and charts to install Rancher
weight: 200
---

Rancher is installed using the Helm package manager for Kubernetes. Helm charts provide templating syntax for Kubernetes YAML manifest documents.

With Helm, we can create configurable deployments instead of just using static files. For more information about creating your own catalog of deployments, check out the docs at https://helm.sh/.

For systems without direct internet access, see [Air Gap: High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/).

To choose a Rancher version to install, refer to [Choosing a Rancher Version.]({{<baseurl>}}/rancher/v2.x/en/installation/options/server-tags)

To choose a version of Helm to install Rancher with, refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.x/en/installation/options/helm-version)

> **Note:** The installation instructions assume you are using Helm 3. For migration of installs started with Helm 2, refer to the official [Helm 2 to 3 migration docs.](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/) This [section]({{<baseurl>}}/rancher/v2.x/en/installation/options/helm2) provides a copy of the older high-availability Rancher installation instructions that used Helm 2, and it is intended to be used if upgrading to Helm 3 is not feasible.

### Install Helm

Helm requires a simple CLI tool to be installed. Refer to the [instructions provided by the Helm project](https://helm.sh/docs/intro/install/) for your specific platform.

### Add the Helm Chart Repository

Use `helm repo add` command to add the Helm chart repository that contains charts to install Rancher. For more information about the repository choices and which is best for your use case, see [Choosing a Version of Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/options/server-tags/#helm-chart-repositories).

{{< release-channel >}}

```
helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
```

### Create a Namespace for Rancher

We'll need to define a namespace where the resources created by the Chart should be installed. This should always be `cattle-system`:

```
kubectl create namespace cattle-system
```

### Choose your SSL Configuration

Rancher Server is designed to be secure by default and requires SSL/TLS configuration.

There are three recommended options for the source of the certificate.

> **Note:** If you want terminate SSL/TLS externally, see [TLS termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination).

| Configuration                  | Chart option                     | Description                                                                                 | Requires cert-manager                 |
| ------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------- |
| Rancher Generated Certificates | `ingress.tls.source=rancher`     | Use certificates issued by Rancher's generated CA (self signed)<br/>This is the **default** | [yes](#optional-install-cert-manager) |
| Let’s Encrypt                  | `ingress.tls.source=letsEncrypt` | Use Let's Encrypt to issue a certificate                                                    | [yes](#optional-install-cert-manager) |
| Certificates from Files        | `ingress.tls.source=secret`      | Use your own certificate files by creating Kubernetes Secret(s)                             | no                                    |

### Optional: Install cert-manager

Rancher relies on [cert-manager](https://github.com/jetstack/cert-manager) to issue certificates from Rancher's own generated CA or to request Let's Encrypt certificates.

`cert-manager` is only required for certificates issued by Rancher's generated CA (`ingress.tls.source=rancher`) and Let's Encrypt issued certificates (`ingress.tls.source=letsEncrypt`). You should skip this step if you are using your own certificate files (option `ingress.tls.source=secret`) or if you use [TLS termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination).

{{% accordion id="cert-manager" label="Click to Expand" %}}

> **Important:**
> Due to an issue with Helm v2.12.0 and cert-manager, please use Helm v2.12.1 or higher.

> Recent changes to cert-manager require an upgrade. If you are upgrading Rancher and using a version of cert-manager older than v0.9.1, please see our [upgrade documentation]({{< baseurl >}}/rancher/v2.x/en/installation/options/upgrading-cert-manager/).

These instructions are adapted from the [official cert-manager documentation](https://docs.cert-manager.io/en/latest/getting-started/install/kubernetes.html#installing-with-helm).

```
# Install the CustomResourceDefinition resources separately
kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.9/deploy/manifests/00-crds.yaml

# Create the namespace for cert-manager
kubectl create namespace cert-manager

# Label the cert-manager namespace to disable resource validation
kubectl label namespace cert-manager certmanager.k8s.io/disable-validation=true

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Update your local Helm chart repository cache
helm repo update

# Install the cert-manager Helm chart
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v0.9.1
```

Once you’ve installed cert-manager, you can verify it is deployed correctly by checking the cert-manager namespace for running pods:

```
kubectl get pods --namespace cert-manager

NAME                                            READY   STATUS      RESTARTS   AGE
cert-manager-7cbdc48784-rpgnt                   1/1     Running     0          3m
cert-manager-webhook-5b5dd6999-kst4x            1/1     Running     0          3m
cert-manager-cainjector-3ba5cd2bcd-de332x       1/1     Running     0          3m
```

If the ‘webhook’ pod (2nd line) is in a ContainerCreating state, it may still be waiting for the Secret to be mounted into the pod. Wait a couple of minutes for this to happen but if you experience problems, please check the [troubleshooting](https://docs.cert-manager.io/en/latest/getting-started/troubleshooting.html) guide.
{{% /accordion %}}

### Install Rancher with Helm and Your Chosen Certificate Option

{{% tabs %}}
{{% tab "Rancher-generated Certificates" %}}

> **Note:** You need to have [cert-manager](#optional-install-cert-manager) installed before proceeding.

The default is for Rancher to generate a CA and uses `cert-manager` to issue the certificate for access to the Rancher server interface. Because `rancher` is the default option for `ingress.tls.source`, we are not specifying `ingress.tls.source` when running the `helm install` command.

- Set the `hostname` to the DNS name you pointed at your load balancer.

```
helm install rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org
```

Wait for Rancher to be rolled out:

```
kubectl -n cattle-system rollout status deploy/rancher
Waiting for deployment "rancher" rollout to finish: 0 of 3 updated replicas are available...
deployment "rancher" successfully rolled out
```

{{% /tab %}}
{{% tab "Let's Encrypt" %}}

> **Note:** You need to have [cert-manager](#optional-install-cert-manager) installed before proceeding.

This option uses `cert-manager` to automatically request and renew [Let's Encrypt](https://letsencrypt.org/) certificates. This is a free service that provides you with a valid certificate as Let's Encrypt is a trusted CA. This configuration uses HTTP validation (`HTTP-01`) so the load balancer must have a public DNS record and be accessible from the internet.

- Set `hostname` to the public DNS record, set `ingress.tls.source` to `letsEncrypt` and `letsEncrypt.email` to the email address used for communication about your certificate (for example, expiry notices)

```
helm install rancher rancher-<CHART_REPO>/rancher \
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

{{% /tab %}}
{{% tab "Certificates from Files" %}}
Create Kubernetes secrets from your own certificates for Rancher to use.

> **Note:** The `Common Name` or a `Subject Alternative Names` entry in the server certificate must match the `hostname` option, or the ingress controller will fail to configure correctly. Although an entry in the `Subject Alternative Names` is technically required, having a matching `Common Name` maximizes compatibility with older browsers/applications. If you want to check if your certificates are correct, see [How do I check Common Name and Subject Alternative Names in my server certificate?]({{< baseurl >}}/rancher/v2.x/en/faq/technical/#how-do-i-check-common-name-and-subject-alternative-names-in-my-server-certificate)

- Set `hostname` and set `ingress.tls.source` to `secret`.
- If you are using a Private CA signed certificate , add `--set privateCA=true` to the command shown below.

```
helm install rancher rancher-<CHART_REPO>/rancher \
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
{{% /tab %}}
{{% /tabs %}}

### Advanced Configurations

The Rancher chart configuration has many options for customizing the install to suit your specific environment. Here are some common advanced scenarios.

- [HTTP Proxy]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#http-proxy)
- [Private Docker Image Registry]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#private-registry-and-air-gap-installs)
- [TLS Termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination)

See the [Chart Options]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/) for the full list of options.

### Save your options

Make sure you save the `--set` options you used. You will need to use the same options when you upgrade Rancher to new versions with Helm.

### Finishing Up

That's it you should have a functional Rancher server. Point a browser at the hostname you picked and you should be greeted by the colorful login page.

Doesn't work? Take a look at the [Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/troubleshooting/) Page
