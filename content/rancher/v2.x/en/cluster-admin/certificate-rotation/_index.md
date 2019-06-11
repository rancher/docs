---
title: Certificate Rotation
weight: 2040
---

> **Warning:** Rotating Kubernetes certificates may result in your cluster being temporarily unavailable as components are restarted. For production environments, it's recommended to perform this action during a maintenance window.

By default, Kubernetes clusters require certificates and Rancher launched Kubernetes clusters automatically generate  certificates for the Kubernetes components. Rotating these certificates is important before the certificates expire as well as if a certificate is compromised. After the certificates are rotated, the Kubernetes components are automatically restarted.

Certificates can be rotated for the following services:

- etcd
- kubelet
- kube-apiserver
- kube-proxy
- kube-scheduler
- kube-controller-manager


### Certificate Rotation in Rancher v2.2.x

_Available as of v2.2.0_

Rancher launched Kubernetes clusters have the ability to rotate the auto-generated certificates through the UI.

1. In the **Global** view, navigate to the cluster that you want to rotate certificates.

2. Select the **Ellipsis (...) > Rotate Certificates**.

3. Select which certificates that you want to rotate.

   * Rotate all Service certificates (keep the same CA)
   * Rotate an individual service and choose one of the services from the drop down menu

4. Click **Save**.

**Results:** The selected certificates will be rotated and the related services will be restarted to start using the new certificate.

> **Note:** Even though the RKE CLI can use custom certificates for the Kubernetes cluster components, Rancher currently doesn't allow the ability to upload these in Rancher Launched Kubernetes clusters.


### Certificate Rotation in Rancher v2.1.x and v2.0.x

_Available as of v2.0.14 and v2.1.9_

Rancher launched Kubernetes clusters have the ability to rotate the auto-generated certificates through the API.

1. In the **Global** view, navigate to the cluster that you want to rotate certificates.

2. Select the **Ellipsis (...) > View in API**.

3. Click on **RotateCertificates**.

4. Click on **Show Request**.

5. Click on **Send Request**.

**Results:** All kubernetes certificates will be rotated.
