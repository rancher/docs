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

2. Select the **&#8942; > Rotate Certificates**.

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

2. Select the **&#8942; > View in API**.

3. Click on **RotateCertificates**.

4. Click on **Show Request**.

5. Click on **Send Request**.

**Results:** All Kubernetes certificates will be rotated.

### Rotating Expired Certificates After Upgrading Older Rancher Versions

If you are upgrading from Rancher v2.0.13 or earlier, or v2.1.8 or earlier, and your clusters have expired certificates, some manual steps are required to complete the certificate rotation.

1. For the `controlplane` and `etcd` nodes, log in to each corresponding host and check if the certificate `kube-apiserver-requestheader-ca.pem` is in the following directory:

    ```
    cd /etc/kubernetes/.tmp
    ```

    If the certificate is not in the directory, perform the following commands:

    ```
    cp kube-ca.pem kube-apiserver-requestheader-ca.pem
    cp kube-ca-key.pem kube-apiserver-requestheader-ca-key.pem
    cp kube-apiserver.pem kube-apiserver-proxy-client.pem
    cp kube-apiserver-key.pem kube-apiserver-proxy-client-key.pem
    ```

    If the `.tmp` directory does not exist, you can copy the entire SSL certificate to `.tmp`:

    ```
    cp -r /etc/kubernetes/ssl /etc/kubernetes/.tmp
    ```

1. Rotate the certificates. For Rancher v2.0.x and v2.1.x, use the [Rancher API.](#certificate-rotation-in-rancher-v2-1-x-and-v2-0-x) For Rancher 2.2.x, [use the UI.](#certificate-rotation-in-rancher-v2-2-x)

1. After the command is finished, check if the `worker` nodes are Active. If not, log in to each `worker` node and restart the kubelet and proxy.