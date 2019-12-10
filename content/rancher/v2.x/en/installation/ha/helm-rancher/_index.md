---
title: "3.  Install Rancher"
weight: 200
---

Rancher installation is managed using the Helm package manager for Kubernetes.  Helm “charts” provide templating syntax for Kubernetes YAML manifest documents. With Helm we can create configurable deployments instead of just using static files. For more information about creating your own catalog of deployments, check out the docs at https://helm.sh/.

For systems without direct internet access, see [Air Gap: High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/).

Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.x/en/installation/helm-version) to choose a version of Helm to install Rancher.

> **Note:** Helm 2 and Helm 3 are installed differently. For migration of installs started with Helm 2, refer to the official [Helm 2 to 3 Migration Docs](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/)

# Install Helm

Helm requires a simple CLI tool to be installed. Refer to the [instructions provided by the Helm project](https://helm.sh/docs/intro/install/) for your specific platform.

### Add the Helm Chart Repository

Use `helm repo add` command to add the Helm chart repository that contains charts to install Rancher. For more information about the repository choices and which is best for your use case, see [Choosing a Version of Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories).

{{< release-channel >}}

```
helm repo add rancher-<CHART_REPO> https://releases.rancher.com/server-charts/<CHART_REPO>
```

### Create a Namespace for Rancher
We'll need to define a namespace where the resources created by the Chart should be installed. This should always be `cattle-system`:

```
kubectl create namespace cattle-system
```

### Additional Steps for Helm 2 Users

Only follow the steps in this section if you are using Helm 2.

Helm is controlled with the Helm CLI, but in Helm 2, Tiller is the service that communicates with the Kubernetes API to manage the Helm packages.

{{% accordion id="tiller-steps" label="Click to Expand" %}}
### Install Tiller on the Cluster

> **Important:** Due to an issue with Helm v2.12.0 and cert-manager, please use Helm v2.12.1 or higher.	
Helm installs the `tiller` service on your cluster to manage charts. Since RKE enables RBAC by default ,we will need to use `kubectl` to create a `serviceaccount` and `clusterrolebinding` so `tiller` has permission to deploy to the cluster.	

* Create the `ServiceAccount` in the `kube-system` namespace.	
* Create the `ClusterRoleBinding` to give the `tiller` account access to the cluster.	
* Finally use `helm` to install the `tiller` service	

```plain	
kubectl -n kube-system create serviceaccount tiller	
kubectl create clusterrolebinding tiller \	
  --clusterrole=cluster-admin \	
  --serviceaccount=kube-system:tiller	
helm init --service-account tiller	
# Users in China: You will need to specify a specific tiller-image in order to initialize tiller. 	
# The list of tiller image tags are available here: https://dev.aliyun.com/detail.html?spm=5176.1972343.2.18.ErFNgC&repoId=62085. 	
# When initializing tiller, you'll need to pass in --tiller-image	
helm init --service-account tiller \	
--tiller-image registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:<tag>	
```	

> **Note:** This`tiller`install has full cluster access, which should be acceptable if the cluster is dedicated to Rancher server. Check out the [helm docs](https://docs.helm.sh/using_helm/#role-based-access-control) for restricting `tiller` access to suit your security requirements.	

### Test your Tiller installation	

Run the following command to verify the installation of `tiller` on your cluster:	

```	
kubectl -n kube-system  rollout status deploy/tiller-deploy	
Waiting for deployment "tiller-deploy" rollout to finish: 0 of 1 updated replicas are available...	
deployment "tiller-deploy" successfully rolled out	
```	

And run the following command to validate Helm can talk to the `tiller` service:	

```	
helm version	
Client: &version.Version{SemVer:"v2.12.1", GitCommit:"02a47c7249b1fc6d8fd3b94e6b4babf9d818144e", GitTreeState:"clean"}	
Server: &version.Version{SemVer:"v2.12.1", GitCommit:"02a47c7249b1fc6d8fd3b94e6b4babf9d818144e", GitTreeState:"clean"}	
```

### Troubleshooting: Helm commands show forbidden	

When Helm is initiated in the cluster without specifying the correct `ServiceAccount`, the command `helm init` will succeed but you won't be able to execute most of the other `helm` commands. The following error will be shown:	

```	
Error: configmaps is forbidden: User "system:serviceaccount:kube-system:default" cannot list configmaps in the namespace "kube-system"	
```	

To resolve this, the server component (`tiller`) needs to be removed and added with the correct `ServiceAccount`. You can use `helm reset --force` to remove the `tiller` from the cluster. Please check if it is removed using `helm version --server`.	

```	
helm reset --force	
Tiller (the Helm server-side component) has been uninstalled from your Kubernetes Cluster.	
helm version --server	
Error: could not find tiller	
```	

When you have confirmed that `tiller` has been removed, please follow the steps provided in [Initialize Helm (Install tiller)]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/) to install `tiller` with the correct `ServiceAccount`.
{{% /accordion %}}

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

**Note:** cert-manager is only required for certificates issued by Rancher's generated CA (`ingress.tls.source=rancher`) and Let's Encrypt issued certificates (`ingress.tls.source=letsEncrypt`). You should skip this step if you are using your own certificate files (option `ingress.tls.source=secret`) or if you use [TLS termination on an External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination).

> **Important:**
> Due to an issue with Helm v2.12.0 and cert-manager, please use Helm v2.12.1 or higher.

> Recent changes to cert-manager require an upgrade. If you are upgrading Rancher and using a version of cert-manager older than v0.9.1, please see our [upgrade documentation]({{< baseurl >}}/rancher/v2.x/en/installation/options/upgrading-cert-manager/).

Rancher relies on [cert-manager](https://github.com/jetstack/cert-manager) to issue certificates from Rancher's own generated CA or to request Let's Encrypt certificates.

These instructions are adapted from the [official cert-manager documentation](https://docs.cert-manager.io/en/latest/getting-started/install/kubernetes.html#installing-with-helm).


1. Install the CustomResourceDefinition resources separately
    ```plain
    kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.9/deploy/manifests/00-crds.yaml
    ```

1. Create the namespace for cert-manager
    ```plain
    kubectl create namespace cert-manager
    ```

1. Label the cert-manager namespace to disable resource validation
    ```plain
    kubectl label namespace cert-manager certmanager.k8s.io/disable-validation=true
    ```

1. Add the Jetstack Helm repository
    ```plain
    helm repo add jetstack https://charts.jetstack.io
    ```

1. Update your local Helm chart repository cache
    ```plain
    helm repo update
    ```

1. Install the cert-manager Helm chart. The command is different for Helm 2 and Helm 3.

{{% tabs %}}
{{% tab "Helm 3" %}}
```plain
helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version v0.9.1
```
{{% /tab %}}
{{% tab "Helm 2" %}}
```plain
helm install \
  --name cert-manager
  --namespace cert-manager \
  --version v0.9.1 \
     jetstack/cert-manager
```
{{% /tab %}}
{{% /tabs %}}

Once you’ve installed cert-manager, you can verify it is deployed correctly by checking the cert-manager namespace for running pods:

```
kubectl get pods --namespace cert-manager

NAME                                            READY   STATUS      RESTARTS   AGE
cert-manager-7cbdc48784-rpgnt                   1/1     Running     0          3m
cert-manager-webhook-5b5dd6999-kst4x            1/1     Running     0          3m
cert-manager-cainjector-3ba5cd2bcd-de332x       1/1     Running     0          3m
```

If the ‘webhook’ pod (2nd line) is in a ContainerCreating state, it may still be waiting for the Secret to be mounted into the pod. Wait a couple of minutes for this to happen but if you experience problems, please check the [troubleshooting](https://docs.cert-manager.io/en/latest/getting-started/troubleshooting.html) guide.

<br/>

#### Rancher Generated Certificates

> **Note:** You need to have [cert-manager](#optional-install-cert-manager) installed before proceeding.

The default is for Rancher to generate a CA and uses `cert-manager` to issue the certificate for access to the Rancher server interface. Because `rancher` is the default option for `ingress.tls.source`, we are not specifying `ingress.tls.source` when running the `helm install` command.

- Set the `hostname` to the DNS name you pointed at your load balancer.

The Helm command to install Rancher is different depending on the version of Helm.

{{% tabs %}}
{{% tab "Helm 3" %}}
```
helm install rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org
```
{{% /tab %}}
{{% tab "Helm 2" %}}
```
helm install rancher-<CHART_REPO>/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org
```
{{% /tab %}}
{{% /tabs %}}

Wait for Rancher to be rolled out:

```
kubectl -n cattle-system rollout status deploy/rancher
Waiting for deployment "rancher" rollout to finish: 0 of 3 updated replicas are available...
deployment "rancher" successfully rolled out
```

#### Let's Encrypt

> **Note:** You need to have [cert-manager](#optional-install-cert-manager) installed before proceeding.

This option uses `cert-manager` to automatically request and renew [Let's Encrypt](https://letsencrypt.org/) certificates. This is a free service that provides you with a valid certificate as Let's Encrypt is a trusted CA. This configuration uses HTTP validation (`HTTP-01`) so the load balancer must have a public DNS record and be accessible from the internet.

- Set `hostname` to the public DNS record, set `ingress.tls.source` to `letsEncrypt` and `letsEncrypt.email` to the email address used for communication about your certificate (for example, expiry notices)

The Helm command to install Rancher is different depending on the version of Helm.

{{% tabs %}}
{{% tab "Helm 3" %}}
```
helm install rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=letsEncrypt \
  --set letsEncrypt.email=me@example.org
```
{{% /tab %}}
{{% tab "Helm 2" %}}
```
helm install rancher-<CHART_REPO>/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=letsEncrypt  \
  --set letsEncrypt.email=me@example.org
```
{{% /tab %}}
{{% tabs %}}

Wait for Rancher to be rolled out:

```
kubectl -n cattle-system rollout status deploy/rancher
Waiting for deployment "rancher" rollout to finish: 0 of 3 updated replicas are available...
deployment "rancher" successfully rolled out
```

#### Certificates from Files

Create Kubernetes secrets from your own certificates for Rancher to use.


> **Note:** The `Common Name` or a `Subject Alternative Names` entry in the server certificate must match the `hostname` option, or the ingress controller will fail to configure correctly. Although an entry in the `Subject Alternative Names` is technically required, having a matching `Common Name` maximizes compatibility with older browsers/applications. If you want to check if your certificates are correct, see [How do I check Common Name and Subject Alternative Names in my server certificate?]({{< baseurl >}}/rancher/v2.x/en/faq/technical/#how-do-i-check-common-name-and-subject-alternative-names-in-my-server-certificate)

- Set `hostname` and set `ingress.tls.source` to `secret`.
- If you are using a Private CA signed certificate , add `--set privateCA=true` to the command shown below.

The Helm command to install Rancher is different depending on the version of Helm.

{{% tabs %}}
{{% tab "Helm 3" %}}
```
helm install rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret
```
{{% /tab %}}
{{% tab "Helm 2" %}}
```
helm install rancher-<CHART_REPO>/rancher \
  --name rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret
```
{{% /tab %}}
{{% /tabs %}}

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
