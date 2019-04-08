---
title: Certificate Rotation
weight: 2040
---

_Available as of v2.2.0_

By default, Kubernetes clusters require certificates and Rancher launched Kubernetes clusters automatically generate  certificates for the Kubernetes components. Rotating these certificates is important before the certificates expire as well as if a certificate is compromised. After the certificates are rotated, the Kubernetes components are automatically restarted.

> **Note:** Even though the RKE CLI can use custom certificates for the Kubernetes cluster components, Rancher currently doesn't allow the ability to upload these in Rancher Launched Kubernetes clusters.

Certificates can be rotated for the following services:

- etcd
- kubelet
- kube-apiserver
- kube-proxy
- kube-scheduler
- kube-controller-manager

Rancher launched Kubernetes clusters have the ability to rotate the auto-generated certificates through the UI.

1. In the **Global** view, navigate to the cluster that you want to rotate certificates.

2. Select the **Ellipsis (...) > Rotate Certificates**.

3. Select which certificates that you want to rotate.

   * Rotate all Service certificates (keep the same CA)
   * Rotate an individual service and choose one of the services from the drop down menu

4. Click **Save**.

**Results:** The selected certificates will be rotated and the related services will be restarted to start using the new certificate.

_Certificate Rotation for v2.1.14 and v2.0.9_

Certificate Rotation for all services was backported to **v2.1.14** and **v2.0.9**, the following services will be rotated:

- etcd
- kubelet
- kube-apiserver
- kube-proxy
- kube-scheduler
- kube-controller-manager

Certificates can be rotated through the API using the following steps:

1. In the **Global** view, navigate to the cluster that you want to rotate certificates.

2. Select the **Ellipsis (...) > View in API**.

3. Click on **RotateCertificates**.

4. Click on **Show Request**.

5. Click on **Send Request**.

**Results:** All kubernetes certificates will be rotated.
