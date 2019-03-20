---
title: Certificate Rotation
weight: 2245
---

_Available as of v2.2.0_

By default, Kubernetes clusters require certificates and Rancher launched Kubernetes clusters have certificates automatically generated for them.

> **Note:** Even though the RKE CLI can use custom certificates for the Kubernetes cluster components, Rancher currently doesn't allow the ability to upload these in Rancher Launched Kubernetes clusters.
When generating certificates, the cluster certificates are set to expire after 1 year and the CA certificate expires after 10 years. Rotating these certificates are important before the certificates expire as well as if a certificate is compromised.

After the certificates are rotated, the Kubernetes components are automatically restarted. Certificates can be rotated for the following services:

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

   * Rotate the CA and all Service certificates
   * Rotate all Service certificates (keep the same CA)
   * Rotate an individual service and choose one of the services from the drop down menu

4. Click **Save**.

**Results:** The selected certificates will be rotated and the related services will be restarted to start using the new certificate.
