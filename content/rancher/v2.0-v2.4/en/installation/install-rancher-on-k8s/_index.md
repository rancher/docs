---
title: Install Rancher on a Kubernetes Cluster
description: Learn how to install Rancher in development and production environments. Read about single node and high availability installation
weight: 3
aliases:
  - /rancher/v2.0-v2.4/en/installation/k8s-install/
  - /rancher/v2.0-v2.4/en/installation/k8s-install/helm-rancher
  - /rancher/v2.0-v2.4/en/installation/k8s-install/kubernetes-rke
  - /rancher/v2.0-v2.4/en/installation/ha-server-install 
  - /rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/install
---

# Prerequisite

Set up the Rancher server's local Kubernetes cluster. 

The cluster requirements depend on the Rancher version:

- **In Rancher v2.4.x,** Rancher needs to be installed on a K3s Kubernetes cluster or an RKE Kubernetes cluster.
- **In Rancher before v2.4,** Rancher needs to be installed on an RKE Kubernetes cluster.

For the tutorial to install an RKE Kubernetes cluster, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/k8s-tutorials/ha-rke/) For help setting up the infrastructure for a high-availability RKE cluster, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha)

For the tutorial to install a K3s Kubernetes cluster, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/k8s-tutorials/ha-with-external-db) For help setting up the infrastructure for a high-availability K3s cluster, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/k8s-tutorials/infrastructure-tutorials/infra-for-ha-with-external-db)

# Install the Rancher Helm Chart

Rancher is installed using the Helm package manager for Kubernetes. Helm charts provide templating syntax for Kubernetes YAML manifest documents.

With Helm, we can create configurable deployments instead of just using static files. For more information about creating your own catalog of deployments, check out the docs at https://helm.sh/.

For systems without direct internet access, see [Air Gap: Kubernetes install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/air-gap-installation/install-rancher/).

To choose a Rancher version to install, refer to [Choosing a Rancher Version.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/server-tags)

To choose a version of Helm to install Rancher with, refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm-version)

> **Note:** The installation instructions assume you are using Helm 3. For migration of installs started with Helm 2, refer to the official [Helm 2 to 3 migration docs.](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/) This [section]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2) provides a copy of the older installation instructions for Rancher installed on an RKE Kubernetes cluster with Helm 2, and it is intended to be used if upgrading to Helm 3 is not feasible.

To set up Rancher,

1. [Install the required CLI tools](#1-install-the-required-cli-tools)
2. [Add the Helm chart repository](#2-add-the-helm-chart-repository)
3. [Create a namespace for Rancher](#3-create-a-namespace-for-rancher)
4. [Choose your SSL configuration](#4-choose-your-ssl-configuration)
5. [Install cert-manager](#5-install-cert-manager) (unless you are bringing your own certificates, or TLS will be terminated on a load balancer)
6. [Install Rancher with Helm and your chosen certificate option](#6-install-rancher-with-helm-and-your-chosen-certificate-option)
7. [Verify that the Rancher server is successfully deployed](#7-verify-that-the-rancher-server-is-successfully-deployed)
8. [Save your options](#8-save-your-options)

### 1. Install the Required CLI Tools

The following CLI tools are required for setting up the Kubernetes cluster. Please make sure these tools are installed and available in your `$PATH`.

Refer to the [instructions provided by the Helm project](https://helm.sh/docs/intro/install/) for your specific platform.

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
- [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes. Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm-version) to choose a version of Helm to install Rancher.

### 2. Add the Helm Chart Repository

Use `helm repo add` command to add the Helm chart repository that contains charts to install Rancher. For more information about the repository choices and which is best for your use case, see [Choosing a Version of Rancher]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#helm-chart-repositories).

{{< release-channel >}}

```
helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
```

### 3. Create a Namespace for Rancher

We'll need to define a Kubernetes namespace where the resources created by the Chart should be installed. This should always be `cattle-system`:

```
kubectl create namespace cattle-system
```

### 4. Choose your SSL Configuration

The Rancher management server is designed to be secure by default and requires SSL/TLS configuration.

> **Note:** If you want terminate SSL/TLS externally, see [TLS termination on an External Load Balancer]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#external-tls-termination).

There are three recommended options for the source of the certificate used for TLS termination at the Rancher server:

- **Rancher-generated TLS certificate:** In this case, you will need to install `cert-manager` into the cluster. Rancher utilizes `cert-manager` to issue and maintain its certificates. Rancher will generate a CA certificate of its own, and sign a cert using that CA. `cert-manager` is then responsible for managing that certificate.
- **Let's Encrypt:** The Let's Encrypt option also uses `cert-manager`. However, in this case, cert-manager is combined with a special Issuer for Let's Encrypt that performs all actions (including request and validation) necessary for getting a Let's Encrypt issued cert. This configuration uses HTTP validation (`HTTP-01`), so the load balancer must have a public DNS record and be accessible from the internet.
- **Bring your own certificate:** This option allows you to bring your own public- or private-CA signed certificate. Rancher will use that certificate to secure websocket and HTTPS traffic. In this case, you must upload this certificate (and associated key) as PEM-encoded files with the name `tls.crt` and `tls.key`. If you are using a private CA, you must also upload that certificate. This is due to the fact that this private CA may not be trusted by your nodes. Rancher will take that CA certificate, and generate a checksum from it, which the various Rancher components will use to validate their connection to Rancher.


| Configuration                  | Helm Chart Option           | Requires cert-manager                 |
| ------------------------------ | ----------------------- | ------------------------------------- |
| Rancher Generated Certificates (Default) | `ingress.tls.source=rancher`  | [yes](#5-install-cert-manager) |
| Let’s Encrypt                  | `ingress.tls.source=letsEncrypt`  | [yes](#5-install-cert-manager) |
| Certificates from Files        | `ingress.tls.source=secret`        | no               |

### 5. Install cert-manager

> You should skip this step if you are bringing your own certificate files (option `ingress.tls.source=secret`), or if you use [TLS termination on an external load balancer]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#external-tls-termination). 

This step is only required to use certificates issued by Rancher's generated CA (`ingress.tls.source=rancher`) or to request Let's Encrypt issued certificates (`ingress.tls.source=letsEncrypt`).

{{% accordion id="cert-manager" label="Click to Expand" %}}

> **Important:** Recent changes to cert-manager require an upgrade. If you are upgrading Rancher and using a version of cert-manager older than v0.11.0, please see our [upgrade documentation]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/upgrading-cert-manager/).

These instructions are adapted from the [official cert-manager documentation](https://cert-manager.io/docs/installation/kubernetes/#installing-with-helm).

```
# Install the CustomResourceDefinition resources separately
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.0.4/cert-manager.crds.yaml

# **Important:**
# If you are running Kubernetes v1.15 or below, you
# will need to add the `--validate=false` flag to your
# kubectl apply command, or else you will receive a
# validation error relating to the
# x-kubernetes-preserve-unknown-fields field in
# cert-manager’s CustomResourceDefinition resources.
# This is a benign error and occurs due to the way kubectl
# performs resource validation.

# Create the namespace for cert-manager
kubectl create namespace cert-manager

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Update your local Helm chart repository cache
helm repo update

# Install the cert-manager Helm chart
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v1.0.4
```

Once you’ve installed cert-manager, you can verify it is deployed correctly by checking the cert-manager namespace for running pods:

```
kubectl get pods --namespace cert-manager

NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-5c6866597-zw7kh               1/1     Running   0          2m
cert-manager-cainjector-577f6d9fd7-tr77l   1/1     Running   0          2m
cert-manager-webhook-787858fcdb-nlzsq      1/1     Running   0          2m
```

{{% /accordion %}}

### 6. Install Rancher with Helm and Your Chosen Certificate Option

The exact command to install Rancher differs depending on the certificate configuration.

{{% tabs %}}
{{% tab "Rancher-generated Certificates" %}}


The default is for Rancher to generate a CA and uses `cert-manager` to issue the certificate for access to the Rancher server interface.

Because `rancher` is the default option for `ingress.tls.source`, we are not specifying `ingress.tls.source` when running the `helm install` command.

- Set the `hostname` to the DNS name you pointed at your load balancer.
- If you are installing an alpha version, Helm requires adding the `--devel` option to the command. 
- To install a specific Rancher version, use the `--version` flag, example: `--version 2.3.6`

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

This option uses `cert-manager` to automatically request and renew [Let's Encrypt](https://letsencrypt.org/) certificates. This is a free service that provides you with a valid certificate as Let's Encrypt is a trusted CA.

In the following command,

- `hostname` is set to the public DNS record,
- `ingress.tls.source` is set to `letsEncrypt`
- `letsEncrypt.email` is set to the email address used for communication about your certificate (for example, expiry notices)
- If you are installing an alpha version, Helm requires adding the `--devel` option to the command. 

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
In this option, Kubernetes secrets are created from your own certificates for Rancher to use.

When you run this command, the `hostname` option must match the `Common Name` or a `Subject Alternative Names` entry in the server certificate or the Ingress controller will fail to configure correctly.

Although an entry in the `Subject Alternative Names` is technically required, having a matching `Common Name` maximizes compatibility with older browsers and applications.

> If you want to check if your certificates are correct, see [How do I check Common Name and Subject Alternative Names in my server certificate?]({{<baseurl>}}/rancher/v2.0-v2.4/en/faq/technical/#how-do-i-check-common-name-and-subject-alternative-names-in-my-server-certificate)

- Set the `hostname`.
- Set `ingress.tls.source` to `secret`.
- If you are installing an alpha version, Helm requires adding the `--devel` option to the command. 

```
helm install rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret
```

If you are using a Private CA signed certificate , add `--set privateCA=true` to the command:

```
helm install rancher rancher-latest/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret \
  --set privateCA=true
```

Now that Rancher is deployed, see [Adding TLS Secrets]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/encryption/tls-secrets/) to publish the certificate files so Rancher and the Ingress controller can use them.
{{% /tab %}}
{{% /tabs %}}

The Rancher chart configuration has many options for customizing the installation to suit your specific environment. Here are some common advanced scenarios.

- [HTTP Proxy]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#http-proxy)
- [Private Docker Image Registry]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#private-registry-and-air-gap-installs)
- [TLS Termination on an External Load Balancer]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#external-tls-termination)

See the [Chart Options]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/chart-options/) for the full list of options.


### 7. Verify that the Rancher Server is Successfully Deployed

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

### 8. Save Your Options

Make sure you save the `--set` options you used. You will need to use the same options when you upgrade Rancher to new versions with Helm.

### Finishing Up

That's it. You should have a functional Rancher server.

In a web browser, go to the DNS name that forwards traffic to your load balancer. Then you should be greeted by the colorful login page.

Doesn't work? Take a look at the [Troubleshooting]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/troubleshooting/) Page


### Optional Next Steps

Enable the Enterprise Cluster Manager.
