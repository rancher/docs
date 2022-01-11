---
title: Certificate Rotation
weight: 2040
---

> **Warning:** Rotating Kubernetes certificates may result in your cluster being temporarily unavailable as components are restarted. For production environments, it's recommended to perform this action during a maintenance window.

By default, Kubernetes clusters require certificates and Rancher launched Kubernetes clusters automatically generate  certificates for the Kubernetes components. Rotating these certificates is important before the certificates expire as well as if a certificate is compromised. After the certificates are rotated, the Kubernetes components are automatically restarted.

Certificates can be rotated for the following services:

- etcd
- kubelet (node certificate)
- kubelet (serving certificate, if [enabled]({{<baseurl>}}/rke/latest/en/config-options/services/#kubelet-options))
- kube-apiserver
- kube-proxy
- kube-scheduler
- kube-controller-manager

> **Note:** For users who didn't rotate their webhook certificates, and they have expired after one year, please see this [page]({{<baseurl>}}/rancher/v2.6/en/troubleshooting/expired-webhook-certificates/) for help.

