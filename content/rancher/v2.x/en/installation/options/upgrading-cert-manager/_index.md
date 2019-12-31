---
title: Upgrading Cert-Manager
weight: 2040
---

Rancher uses cert-manager to automatically generate and renew TLS certificates for HA deployments of Rancher. As of Fall 2019, two important changes to cert-manager are set to occur that you need to take action on if you have an HA deployment of Rancher:

1. [Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753)
1. [Cert-manager is deprecating and replacing the certificate.spec.acme.solvers field](https://docs.cert-manager.io/en/latest/tasks/upgrading/upgrading-0.7-0.8.html#upgrading-from-v0-7-to-v0-8). This change has no exact deadline.

To address these changes, this guide will do two things:

1. Document the procedure for upgrading cert-manager
1. Explain the cert-manager API changes and link to cert-manager's offficial documentation for migrating your data


## Performing the upgrade
>**Note:** The namespace used in these instructions depends on the namespace cert-manager is currently installed in. If it is in kube-system use that in the instructions below. You can verify by running `kubectl get pods --all-namespaces` and checking which namespace the cert-manager-\* pods are listed in. Do not change the namespace cert-manager is running in or this can cause issues.

In order to upgrade cert-manager, follow these instructions:

{{% accordion id="normal" label="Upgrading cert-manager with Internet access" %}}
1. Back up existing resources as a precaution
    ```plain
    kubectl get -o yaml --all-namespaces issuer,clusterissuer,certificates > cert-manager-backup.yaml
    ```

1. Delete the existing deployment
    ```plain
    helm delete --purge cert-manager
    ```

1. Install the CustomResourceDefinition resources separately
    ```plain
    kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.9/deploy/manifests/00-crds.yaml
    ```

1. Label the kube-system namespace to disable resource validation
    ```plain
    kubectl label namespace kube-system certmanager.k8s.io/disable-validation=true
    ```

1. Add the Jetstack Helm repository
    ```plain
    helm repo add jetstack https://charts.jetstack.io
    ```

1. Update your local Helm chart repository cache
    ```plain
    helm repo update
    ```

1. Install the new version of cert-manager
    ```plain
    helm install --version 0.9.1 --name cert-manager --namespace kube-system jetstack/cert-manager
    ```
{{% /accordion %}}

{{% accordion id="airgap" label="Upgrading cert-manager in an airgapped environment" %}}
### Prerequisites

Before you can perform the upgrade, you must prepare your air gapped environment by adding the necessary container images to your private registry and downloading or rendering the required Kubernetes manifest files.

1. Follow the guide to [Prepare your Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/prepare-private-reg/) with the images needed for the upgrade.

1. From a system connected to the internet, add the cert-manager repo to Helm

    ```plain
    helm repo add jetstack https://charts.jetstack.io
    helm repo update
    ```

1. Fetch the latest cert-manager chart available from the [Helm chart repository](https://hub.helm.sh/charts/jetstack/cert-manager).

    ```plain
    helm fetch jetstack/cert-manager --version v0.9.1
    ```

1. Render the cert manager template with the options you would like to use to install the chart. Remember to set the `image.repository` option to pull the image from your private registry. This will create a `cert-manager` directory with the Kubernetes manifest files.

    ```plain
    helm template ./cert-manager-v0.9.1.tgz --output-dir . \
    --name cert-manager --namespace kube-system \
    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
    --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-webhook
    --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-cainjector
    ```

1. Download the required CRD file for cert-manager

    ```plain
    curl -L -o cert-manager/cert-manager-crd.yaml https://raw.githubusercontent.com/jetstack/cert-manager/release-0.9/deploy/manifests/00-crds.yaml
    ```

### Install cert-manager

1. Back up existing resources as a precaution

    ```plain
    kubectl get -o yaml --all-namespaces issuer,clusterissuer,certificates > cert-manager-backup.yaml
    ```

1. Delete the existing cert-manager installation

    ```plain
    kubectl -n kube-system delete deployment,sa,clusterrole,clusterrolebinding -l 'app=cert-manager' -l 'chart=cert-manager-v0.5.2'
    ```

1. Install the CustomResourceDefinition resources separately

    ```plain
    kubectl apply -f cert-manager/cert-manager-crd.yaml
    ```

1. Label the kube-system namespace to disable resource validation

    ```plain
    kubectl label namespace kube-system certmanager.k8s.io/disable-validation=true
    ```

1. Install cert-manager

    ```plain
    kubectl -n kube-system apply -R -f ./cert-manager
    ```
{{% /accordion %}}


Once you’ve installed cert-manager, you can verify it is deployed correctly by checking the kube-system namespace for running pods:

```
kubectl get pods --namespace kube-system

NAME                                            READY   STATUS      RESTARTS   AGE
cert-manager-7cbdc48784-rpgnt                   1/1     Running     0          3m
cert-manager-webhook-5b5dd6999-kst4x            1/1     Running     0          3m
cert-manager-cainjector-3ba5cd2bcd-de332x       1/1     Running     0          3m
```

If the ‘webhook’ pod (2nd line) is in a ContainerCreating state, it may still be waiting for the Secret to be mounted into the pod. Wait a couple of minutes for this to happen but if you experience problems, please check cert-manager's [troubleshooting](https://docs.cert-manager.io/en/latest/getting-started/troubleshooting.html) guide.

> **Note:** The above instructions ask you to add the disable-validation label to the kube-system namespace. Here are additional resources that explain why this is necessary:
>
> - [Information on the disable-validation label](https://docs.cert-manager.io/en/latest/tasks/upgrading/upgrading-0.4-0.5.html?highlight=certmanager.k8s.io%2Fdisable-validation#disabling-resource-validation-on-the-cert-manager-namespace)
> - [Information on webhook validation for certificates](https://docs.cert-manager.io/en/latest/getting-started/webhook.html)

## Cert-Manager API change and data migration

Cert-manager has deprecated the use of the `certificate.spec.acme.solvers` field and will drop support for it completely in an upcoming release.

Per the cert-manager documentation, a new format for configuring ACME certificate resources was introduced in v0.8. Specifically, the challenge solver configuration field was moved. Both the old format and new are supported as of v0.9, but support for the old format will be dropped in an upcoming release of cert-manager. The cert-manager documentation strongly recommends that after upgrading you update your ACME Issuer and Certificate resources to the new format.

Details about the change and migration instructions can be found in the [cert-manager v0.7 to v0.8 upgrade instructions](https://docs.cert-manager.io/en/latest/tasks/upgrading/upgrading-0.7-0.8.html).
