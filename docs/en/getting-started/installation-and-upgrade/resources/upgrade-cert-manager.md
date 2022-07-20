---
title: Upgrading Cert-Manager
weight: 4
---

Rancher uses cert-manager to automatically generate and renew TLS certificates for HA deployments of Rancher. As of Fall 2019, three important changes to cert-manager are set to occur that you need to take action on if you have an HA deployment of Rancher:

1. [Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753)
1. [Cert-manager is deprecating and replacing the certificate.spec.acme.solvers field](https://cert-manager.io/docs/installation/upgrading/upgrading-0.7-0.8/). This change has no exact deadline.
1. [Cert-manager is deprecating `v1alpha1` API and replacing its API group](https://cert-manager.io/docs/installation/upgrading/upgrading-0.10-0.11/)

To address these changes, this guide will do two things:

1. Document the procedure for upgrading cert-manager
1. Explain the cert-manager API changes and link to cert-manager's official documentation for migrating your data

:::note Important:

If you are upgrading cert-manager to the latest version from a version older than 1.5, follow the steps in [Option C](#option-c-upgrade-to-new-cert-manager-from-versions-15-and-below) below to do so. Note that you do not need to reinstall Rancher to perform this upgrade.

:::

# Upgrade Cert-Manager

The namespace used in these instructions depends on the namespace cert-manager is currently installed in. If it is in kube-system use that in the instructions below. You can verify by running `kubectl get pods --all-namespaces` and checking which namespace the cert-manager-\* pods are listed in. Do not change the namespace cert-manager is running in or this can cause issues.

In order to upgrade cert-manager, follow these instructions:

### Option A: Upgrade cert-manager with Internet Access

<details id="normal">
  <summary>Click to expand</summary>

1. [Back up existing resources](https://cert-manager.io/docs/tutorials/backup/) as a precaution

    ```plain
    kubectl get -o yaml --all-namespaces \
    issuer,clusterissuer,certificates,certificaterequests > cert-manager-backup.yaml
    ```

    :::note Important:

    If you are upgrading from a version older than 0.11.0, Update the apiVersion on all your backed up resources from `certmanager.k8s.io/v1alpha1` to `cert-manager.io/v1alpha2`. If you use any cert-manager annotations on any of your other resources, you will need to update them to reflect the new API group. For details, refer to the documentation on [additional annotation changes.](https://cert-manager.io/docs/installation/upgrading/upgrading-0.10-0.11/#additional-annotation-changes)

    :::

1. [Uninstall existing deployment](https://cert-manager.io/docs/installation/uninstall/kubernetes/#uninstalling-with-helm)

    ```plain
    helm uninstall cert-manager
    ```

    Delete the CustomResourceDefinition using the link to the version vX.Y.Z you installed

    ```plain
    kubectl delete -f https://github.com/cert-manager/cert-manager/releases/download/vX.Y.Z/cert-manager.crds.yaml

    ```

1. Install the CustomResourceDefinition resources separately

    ```plain
    kubectl apply --validate=false -f https://github.com/cert-manager/cert-manager/releases/download/vX.Y.Z/cert-manager.crds.yaml

    ```

    :::note

    If you are running Kubernetes v1.15 or below, you will need to add the `--validate=false` flag to your `kubectl apply` command above. Otherwise, you will receive a validation error relating to the `x-kubernetes-preserve-unknown-fields` field in cert-manager’s CustomResourceDefinition resources. This is a benign error and occurs due to the way kubectl performs resource validation.

    :::

1. Create the namespace for cert-manager if needed

    ```plain
    kubectl create namespace cert-manager
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
    helm install \
      cert-manager jetstack/cert-manager \
      --namespace cert-manager \
      --version v0.12.0
    ```

1. [Restore back up resources](https://cert-manager.io/docs/tutorials/backup/#restoring-resources)

    ```plain
    kubectl apply -f cert-manager-backup.yaml
    ```

</details>

### Option B: Upgrade cert-manager in an Air-Gapped Environment

<details id="airgap">
  <summary>Click to expand</summary>

### Prerequisites

Before you can perform the upgrade, you must prepare your air gapped environment by adding the necessary container images to your private registry and downloading or rendering the required Kubernetes manifest files.

1. Follow the guide to [Prepare your Private Registry](../other-installation-methods/air-gapped-helm-cli-install/publish-images.md) with the images needed for the upgrade.

1. From a system connected to the internet, add the cert-manager repo to Helm

    ```plain
    helm repo add jetstack https://charts.jetstack.io
    helm repo update
    ```

1. Fetch the latest cert-manager chart available from the [Helm chart repository](https://artifacthub.io/packages/helm/cert-manager/cert-manager).

    ```plain
    helm fetch jetstack/cert-manager --version v0.12.0
    ```

1. Render the cert manager template with the options you would like to use to install the chart. Remember to set the `image.repository` option to pull the image from your private registry. This will create a `cert-manager` directory with the Kubernetes manifest files.

    The Helm 3 command is as follows:

    ```plain
    helm template cert-manager ./cert-manager-v0.12.0.tgz --output-dir . \
    --namespace cert-manager \
    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
    --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-webhook
    --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-cainjector
    ```

    The Helm 2 command is as follows:

    ```plain
    helm template ./cert-manager-v0.12.0.tgz --output-dir . \
    --name cert-manager --namespace cert-manager \
    --set image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-controller
    --set webhook.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-webhook
    --set cainjector.image.repository=<REGISTRY.YOURDOMAIN.COM:PORT>/quay.io/jetstack/cert-manager-cainjector
    ```

1. Download the required CRD file for cert-manager (old and new)

    ```plain
    curl -L -o cert-manager/cert-manager-crd.yaml https://raw.githubusercontent.com/cert-manager/cert-manager/release-0.12/deploy/manifests/00-crds.yaml
    curl -L -o cert-manager/cert-manager-crd-old.yaml https://raw.githubusercontent.com/cert-manager/cert-manager/release-X.Y/deploy/manifests/00-crds.yaml
    ```

### Install cert-manager

1. Back up existing resources as a precaution

    ```plain
    kubectl get -o yaml --all-namespaces \
    issuer,clusterissuer,certificates,certificaterequests > cert-manager-backup.yaml
    ```

    :::note Important:

    If you are upgrading from a version older than 0.11.0, Update the apiVersion on all your backed up resources from `certmanager.k8s.io/v1alpha1` to `cert-manager.io/v1alpha2`. If you use any cert-manager annotations on any of your other resources, you will need to update them to reflect the new API group. For details, refer to the documentation on [additional annotation changes.](https://cert-manager.io/docs/installation/upgrading/upgrading-0.10-0.11/#additional-annotation-changes)

    :::

1. Delete the existing cert-manager installation

    ```plain
    kubectl -n cert-manager \
    delete deployment,sa,clusterrole,clusterrolebinding \
    -l 'app=cert-manager' -l 'chart=cert-manager-v0.5.2'
    ```

    Delete the CustomResourceDefinition using the link to the version vX.Y you installed

    ```plain
    kubectl delete -f cert-manager/cert-manager-crd-old.yaml
    ```

1. Install the CustomResourceDefinition resources separately

    ```plain
    kubectl apply -f cert-manager/cert-manager-crd.yaml
    ```

    :::note Important:

    If you are running Kubernetes v1.15 or below, you will need to add the `--validate=false` flag to your `kubectl apply` command above. Otherwise, you will receive a validation error relating to the `x-kubernetes-preserve-unknown-fields` field in cert-manager’s CustomResourceDefinition resources. This is a benign error and occurs due to the way kubectl performs resource validation.

    :::

1. Create the namespace for cert-manager

    ```plain
    kubectl create namespace cert-manager
    ```

1. Install cert-manager

    ```plain
    kubectl -n cert-manager apply -R -f ./cert-manager
    ```

1. [Restore back up resources](https://cert-manager.io/docs/tutorials/backup/#restoring-resources)

    ```plain
    kubectl apply -f cert-manager-backup.yaml
    ```

</details>

### Option C: Upgrade cert-manager from Versions 1.5 and Below

<details id="normal">
  <summary>Click to expand</summary>

Previously, in order to upgrade cert-manager from an older version, an uninstall and reinstall of Rancher was recommended. Using the method below, you may upgrade cert-manager without those additional steps in order to better preserve your production environment:

1. Install `cmctl`, the cert-manager CLI tool, using [the installation guide](https://cert-manager.io/docs/usage/cmctl/#installation).

1. Ensure that any cert-manager custom resources that may have been stored in etcd at a deprecated API version get migrated to v1:

    ```
    cmctl upgrade migrate-api-version
    ```
    Refer to the [API version migration docs](https://cert-manager.io/docs/usage/cmctl/#migrate-api-version) for more information. Please also see the [docs to upgrade from 1.5 to 1.6](https://cert-manager.io/docs/installation/upgrading/upgrading-1.5-1.6/) and the [docs to upgrade from 1.6. to 1.7](https://cert-manager.io/docs/installation/upgrading/upgrading-1.6-1.7/) if needed.

1. Upgrade cert-manager to v1.7.1 with a normal `helm upgrade`. You may go directly from version 1.5 to 1.7 if desired.

1. Follow the Helm tutorial to [update the API version of a release manifest](https://helm.sh/docs/topics/kubernetes_apis/#updating-api-versions-of-a-release-manifest). The chart release name is `release_name=rancher` and the release namespace is `release_namespace=cattle-system`.

1. In the decoded file, search for `cert-manager.io/v1beta1` and **replace it** with `cert-manager.io/v1`.

1. Upgrade Rancher normally with `helm upgrade`.

</details>

### Verify the Deployment

Once you’ve installed cert-manager, you can verify it is deployed correctly by checking the kube-system namespace for running pods:

```
kubectl get pods --namespace cert-manager

NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-5c6866597-zw7kh               1/1     Running   0          2m
cert-manager-cainjector-577f6d9fd7-tr77l   1/1     Running   0          2m
cert-manager-webhook-787858fcdb-nlzsq      1/1     Running   0          2m
```

## Cert-Manager API change and data migration

---
_New in v2.6.4_

Rancher now supports cert-manager versions 1.6.2 and 1.7.1. We recommend v1.7.x because v 1.6.x will reach end-of-life on March 30, 2022. To read more, see the [cert-manager docs](../../../pages-for-subheaders/install-upgrade-on-a-kubernetes-cluster.md#4-install-cert-manager). For instructions on upgrading cert-manager from version 1.5 to 1.6, see the upstream cert-manager documentation [here](https://cert-manager.io/docs/installation/upgrading/upgrading-1.5-1.6/). For instructions on upgrading cert-manager from version 1.6 to 1.7, see the upstream cert-manager documentation [here](https://cert-manager.io/docs/installation/upgrading/upgrading-1.6-1.7/).

---

Cert-manager has deprecated the use of the `certificate.spec.acme.solvers` field and will drop support for it completely in an upcoming release.

Per the cert-manager documentation, a new format for configuring ACME certificate resources was introduced in v0.8. Specifically, the challenge solver configuration field was moved. Both the old format and new are supported as of v0.9, but support for the old format will be dropped in an upcoming release of cert-manager. The cert-manager documentation strongly recommends that after upgrading you update your ACME Issuer and Certificate resources to the new format.

Details about the change and migration instructions can be found in the [cert-manager v0.7 to v0.8 upgrade instructions](https://cert-manager.io/docs/installation/upgrading/upgrading-0.7-0.8/).

The v0.11 release marks the removal of the v1alpha1 API that was used in previous versions of cert-manager, as well as our API group changing to be cert-manager.io instead of certmanager.k8s.io.

We have also removed support for the old configuration format that was deprecated in the v0.8 release. This means you must transition to using the new solvers style configuration format for your ACME issuers before upgrading to v0.11. For more information, see the [upgrading to v0.8 guide](https://cert-manager.io/docs/installation/upgrading/upgrading-0.7-0.8/).

Details about the change and migration instructions can be found in the [cert-manager v0.10 to v0.11 upgrade instructions](https://cert-manager.io/docs/installation/upgrading/upgrading-0.10-0.11/).

More info about [cert-manager upgrade information](https://cert-manager.io/docs/installation/upgrading/).

