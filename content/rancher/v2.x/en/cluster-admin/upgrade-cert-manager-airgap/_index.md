---
title: Upgrade Cert-manager Airgap
weight: 2040
---

[Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753) In order to upgrade cert-manager to the newer version follow these instructions:

>**Note:** The namespaces used in these instructions depends on the namespace cert-manager is currently installed in. If it is in kube-system use that in the instructions below. You can verify by running `kubectl get pods --all-namespaces` and checking which namespace the cert-manager-* pods are listed in. Do not change the namespace cert-manager is running in or this can cause issues. 

## Prerequisites

- **Populate Images**

    Follow the guide to [Prepare the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/prepare-private-reg/) with the images for the upgrade Rancher release.

- **Prepare cert-manager**

1. From a system connected to the internet, add the cert-manager repo to helm

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
    ```

1. Download the required CRD file for cert-manager

    ```plain
    curl -L -o cert-manager/cert-manager-crd.yaml https://raw.githubusercontent.com/jetstack/cert-manager/release-0.9/deploy/manifests/00-crds.yaml
    ```

## Install cert-manager

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

Once you’ve installed cert-manager, you can verify it is deployed correctly by checking the kube-system namespace for running pods:

```
kubectl get pods --namespace kube-system

NAME                                            READY   STATUS      RESTARTS   AGE
cert-manager-7cbdc48784-rpgnt                   1/1     Running     0          3m
cert-manager-webhook-5b5dd6999-kst4x            1/1     Running     0          3m
cert-manager-cainjector-3ba5cd2bcd-de332x       1/1     Running     0          3m
```

If the ‘webhook’ pod (2nd line) is in a ContainerCreating state, it may still be waiting for the Secret to be mounted into the pod. Wait a couple of minutes for this to happen but if you experience problems, please check the [troubleshooting](https://docs.cert-manager.io/en/latest/getting-started/troubleshooting.html) guide.

[Additional information on the annotation.](https://docs.cert-manager.io/en/latest/tasks/upgrading/upgrading-0.4-0.5.html?highlight=certmanager.k8s.io%2Fdisable-validation#disabling-resource-validation-on-the-cert-manager-namespace)

[Additional information on the webhook feature.](https://docs.cert-manager.io/en/latest/getting-started/webhook.html)