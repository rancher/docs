---
title: Upgrade Cert-manager
weight: 2040
---

[Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753) In order to upgrade cert-manager to the newer version follow these instructions:


```
# Back up existing resources as a precaution
kubectl get -o yaml --all-namespaces issuer,clusterissuer,certificates > cert-manager-backup.yaml

# Delete the existing deployment
helm delete --purge cert-manager

# Install the CustomResourceDefinition resources separately
kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.9/deploy/manifests/00-crds.yaml

# Label the kube-system namespace to disable resource validation
kubectl label namespace kube-system certmanager.k8s.io/disable-validation=true

# Add the Jetstack Helm repository
helm repo add jetstack https://charts.jetstack.io

# Update your local Helm chart repository cache
helm repo update

# Install the new version of cert-manager
helm install --version 0.9.1 --name cert-manager --namespace kube-system jetstack/cert-manager
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