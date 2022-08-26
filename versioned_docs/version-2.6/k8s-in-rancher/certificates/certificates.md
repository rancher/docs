---
title: Encrypting HTTP Communication
description: Learn how to add an SSL (Secure Sockets Layer) certificate or TLS (Transport Layer Security) certificate
weight: 3060
---

When you create an ingress within Rancher/Kubernetes, you must provide it with a secret that includes a TLS private key and certificate, which are used to encrypt and decrypt communications that come through the ingress. You can make certificates available for ingress use by adding the certificate to the ingress deployment.

>**Prerequisites:** You must have a TLS private key and certificate available to upload.

### 1. Create a Secret


1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to deploy your ingress and click **More Resources > Core > Secrets**.
1. Click **Create**.
1. Click **TLS Certificate**.
1. Enter a name for the secret. Note: Your secret must have a unique name among the other certificates, registries, and secrets within your project/workspace.
1. In the **Private Key** field, either copy and paste your certificate's private key into the text box (include the header and footer), or click **Read from a file** to browse to the private key on your file system. If possible, we recommend using **Read from a file** to reduce likelihood of error. Note: Private key files end with an extension of `.key`.
1. In the **Certificate** field, either copy and paste your certificate into the text box (include the header and footer), or click **Read from a file** to browse to the certificate on your file system. If possible, we recommend using **Read from a file** to reduce likelihood of error. Note: Certificate files end with an extension of `.crt`.
1. Click **Create**.

### 2. Add the Secret to an Ingress

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to deploy your ingress and click **Service Discovery > Ingresses**.
1. Click **Create**.
1. Select the **Namespace** of the ingress.
1. Enter a **Name** for the ingress.
1. In the **Certificates** tab, select the secret containing your certificate and private key.
1. Click **Create**.

## What's Next?

Now you can add the certificate when launching an ingress within the current project or namespace. For more information, see [Adding Ingress]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/load-balancers-and-ingress/ingress/).
