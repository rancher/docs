---
title: Deploying the NGINX Ingress Controller
weight: 1
---

By default, K3s uses Traefik as the Ingress controller for your cluster. In this section, you'll learn how to disable Traefik and deploy `nginx-ingress` as the Ingress controller.

# Requirements

These instructions were tested with K3s 1.17.x.

# Deploying NGINX Ingress

1. [Install K3s with Traefik disabled](#1-install-k3s-with-traefik-disabled)
2. [Confirm the cluster is running](#2-confirm-the-cluster-is-running)
3. [Confirm Traefik is not running](#3-confirm-traefik-is-not-running)
4. [Create the nginx-ingress manifest](#4-create-the-nginx-ingress-manifest)
5. [Confirm the nginx-ingress pods are running](#5-confirm-the-nginx-ingress-pods-are-running)

### 1. Install K3s with Traefik disabled

The first step to using NGINX or any alternative Ingress controller is to tell K3s that you do not want to deploy Traefik. When installing K3s add the following `--no-deploy traefik` flag to the `INSTALL_K3S_EXEC` environment variable:

```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--no-deploy traefik" sh -s -
```

If you have already downloaded the k3s.sh installation script, you can run the following:

```bash
INSTALL_K3S_EXEC="--no-deploy traefik" k3s.sh
```

This will install the K3s server and form a single node cluster.

### 2. Confirm the cluster is running

Confirm the cluster is operational ("Ready") by running:

```
$ kubectl get nodes
NAME                STATUS   ROLES    AGE    VERSION
ip-10-0-0-100       Ready    master   1m     v1.17.4+k3s1
```

> If you already had the kubectl binary installed on your host, you may need to run `k3s kubectl` instead of `kubectl`.

### 3. Confirm Traefik is not running

Next, confirm your out-of-box pods are running and Traefik is not running:

```bash
$ kubectl get pods -A
NAMESPACE                   NAME                                                      READY   STATUS      RESTARTS   AGE
kube-system                 local-path-provisioner-58fb86bdfd-vt57d                   1/1     Running     0          1m
kube-system                 metrics-server-6d684c7b5-qmlcn                            1/1     Running     0          1m
kube-system                 coredns-d798c9dd-72qrq                                    1/1     Running     0          1m
```

### 4. Create the nginx-ingress manifest

K3s allows you to deploy Helm Charts by placing a `HelmChart` YAML in `/var/lib/rancher/k3s/server/manifests`. Create this file by running:

```yaml
$ cat >/var/lib/rancher/k3s/server/manifests/nginx-ingress.yaml <<EOF
apiVersion: v1
kind: Namespace
metadata:
  name: ingress-nginx
---
apiVersion: helm.cattle.io/v1
kind: HelmChart
metadata:
  name: ingress-nginx
  namespace: kube-system
spec:
  chart: nginx-ingress
  repo: https://kubernetes-charts.storage.googleapis.com
  targetNamespace: ingress-nginx
  version: v1.39.1
  set:
  valuesContent: |-
    fullnameOverride: ingress-nginx
    controller:
      kind: DaemonSet
      hostNetwork: true
      service:
        enabled: false
      metrics:
        enabled: true
      config:
        use-forwarded-headers: "true"
EOF
```
K3s periodically polls the manifests folder and applies the YAML in these files. 

### 5. Confirm the nginx-ingress pods are running

After about a minute, you should see new pods running, including the NGINX Ingress controller and default backend:

```bash
$ kubectl get pods -A
NAMESPACE                   NAME                                                      READY   STATUS      RESTARTS   AGE
kube-system                 local-path-provisioner-58fb86bdfd-vt57d                   1/1     Running     0          2m
kube-system                 metrics-server-6d684c7b5-qmlcn                            1/1     Running     0          2m
kube-system                 coredns-d798c9dd-72qrq                                    1/1     Running     0          2m
kube-system                 helm-install-ingress-nginx-s99ct                          0/1     Completed   0          1m
ingress-nginx               ingress-nginx-default-backend-7fb8995f4d-h6rkb            1/1     Running     0          1m
ingress-nginx               ingress-nginx-controller-c8mkg                            1/1     Running     0          1m
```

You'll also see a `helm-install-ingress-nginx` pod in your environment. K3s uses this pod to deploy the Helm Chart and it's normal for it to be in a READY=0/1 and STATUS=Completed state once the Helm Chart has been successfully deployed. In the event your Helm Chart failed to deploy, you can view the logs of this pod to troubleshoot further.