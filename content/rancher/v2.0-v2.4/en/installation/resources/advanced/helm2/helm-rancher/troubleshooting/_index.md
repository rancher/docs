---
title: Troubleshooting
weight: 276
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/helm2/helm-rancher/troubleshooting
---

### Where is everything

Most of the troubleshooting will be done on objects in these 3 namespaces.

* `cattle-system` - `rancher` deployment and pods.
* `ingress-nginx` - Ingress controller pods and services.
* `kube-system` - `tiller` and `cert-manager` pods.

### "default backend - 404"

A number of things can cause the ingress-controller not to forward traffic to your rancher instance. Most of the time its due to a bad ssl configuration.

Things to check

* [Is Rancher Running](#is-rancher-running)
* [Cert CN is "Kubernetes Ingress Controller Fake Certificate"](#cert-cn-is-kubernetes-ingress-controller-fake-certificate)

### Is Rancher Running

Use `kubectl` to check the `cattle-system` system namespace and see if the Rancher pods are in a Running state.

```
kubectl -n cattle-system get pods

NAME                           READY     STATUS    RESTARTS   AGE
pod/rancher-784d94f59b-vgqzh   1/1       Running   0          10m
```

If the state is not `Running`, run a `describe` on the pod and check the Events.

```
kubectl -n cattle-system describe pod

...
Events:
  Type     Reason                 Age   From                Message
  ----     ------                 ----  ----                -------
  Normal   Scheduled              11m   default-scheduler   Successfully assigned rancher-784d94f59b-vgqzh to localhost
  Normal   SuccessfulMountVolume  11m   kubelet, localhost  MountVolume.SetUp succeeded for volume "rancher-token-dj4mt"
  Normal   Pulling                11m   kubelet, localhost  pulling image "rancher/rancher:v2.0.4"
  Normal   Pulled                 11m   kubelet, localhost  Successfully pulled image "rancher/rancher:v2.0.4"
  Normal   Created                11m   kubelet, localhost  Created container
  Normal   Started                11m   kubelet, localhost  Started container
```

### Checking the rancher logs

Use `kubectl` to list the pods.

```
kubectl -n cattle-system get pods

NAME                           READY     STATUS    RESTARTS   AGE
pod/rancher-784d94f59b-vgqzh   1/1       Running   0          10m
```

Use `kubectl` and the pod name to list the logs from the pod.

```
kubectl -n cattle-system logs -f rancher-784d94f59b-vgqzh
```

### Cert CN is "Kubernetes Ingress Controller Fake Certificate"

Use your browser to check the certificate details. If it says the Common Name is "Kubernetes Ingress Controller Fake Certificate", something may have gone wrong with reading or issuing your SSL cert.

> **Note:** if you are using LetsEncrypt to issue certs it can sometimes take a few minuets to issue the cert.

#### cert-manager issued certs (Rancher Generated or LetsEncrypt)

`cert-manager` has 3 parts.

* `cert-manager` pod in the `kube-system` namespace.
* `Issuer` object in the `cattle-system` namespace.
* `Certificate` object in the `cattle-system` namespace.

Work backwards and do a `kubectl describe` on each object and check the events. You can track down what might be missing.

For example there is a problem with the Issuer:

```
kubectl -n cattle-system describe certificate
...
Events:
  Type     Reason          Age                 From          Message
  ----     ------          ----                ----          -------
  Warning  IssuerNotReady  18s (x23 over 19m)  cert-manager  Issuer rancher not ready
```

```
kubectl -n cattle-system describe issuer
...
Events:
  Type     Reason         Age                 From          Message
  ----     ------         ----                ----          -------
  Warning  ErrInitIssuer  19m (x12 over 19m)  cert-manager  Error initializing issuer: secret "tls-rancher" not found
  Warning  ErrGetKeyPair  9m (x16 over 19m)   cert-manager  Error getting keypair for CA issuer: secret "tls-rancher" not found
```

#### Bring Your Own SSL Certs

Your certs get applied directly to the Ingress object in the `cattle-system` namespace.

Check the status of the Ingress object and see if its ready.

```
kubectl -n cattle-system describe ingress
```

If its ready and the SSL is still not working you may have a malformed cert or secret.

Check the nginx-ingress-controller logs. Because the nginx-ingress-controller has multiple containers in its pod you will need to specify the name of the container.

```
kubectl -n ingress-nginx logs -f nginx-ingress-controller-rfjrq nginx-ingress-controller
...
W0705 23:04:58.240571       7 backend_ssl.go:49] error obtaining PEM from secret cattle-system/tls-rancher-ingress: error retrieving secret cattle-system/tls-rancher-ingress: secret cattle-system/tls-rancher-ingress was not found
```

### no matches for kind "Issuer"

The SSL configuration option you have chosen requires cert-manager to be installed before installing Rancher or else the following error is shown:

```
Error: validation failed: unable to recognize "": no matches for kind "Issuer" in version "certmanager.k8s.io/v1alpha1"
```

Install cert-manager and try installing Rancher again.
