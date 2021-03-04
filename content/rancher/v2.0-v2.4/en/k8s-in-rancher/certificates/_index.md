---
title: Encrypting HTTP Communication
description: Learn how to add an SSL (Secure Sockets Layer) certificate or TLS (Transport Layer Security) certificate to either a project, a namespace, or both, so that you can add it to deployments
weight: 3060
aliases:
  - /rancher/v2.0-v2.4/en/tasks/projects/add-ssl-certificates/
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/certificates  
---

When you create an ingress within Rancher/Kubernetes, you must provide it with a secret that includes a TLS private key and certificate, which are used to encrypt and decrypt communications that come through the ingress. You can make certificates available for ingress use by navigating to its project or namespace, and then uploading the certificate. You can then add the certificate to the ingress deployment.

Add SSL certificates to either projects, namespaces, or both. A project scoped certificate will be available in all its namespaces.

>**Prerequisites:** You must have a TLS private key and certificate available to upload.

1. From the **Global** view, select the project where you want to deploy your ingress.

1. From the main menu, select **Resources > Secrets > Certificates**. Click **Add Certificate**. (For Rancher before v2.3, click **Resources > Certificates.**)

1. Enter a **Name** for the certificate.

    >**Note:** Kubernetes classifies SSL certificates as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your SSL certificate must have a unique name among the other certificates, registries, and secrets within your project/workspace.

1. Select the **Scope** of the certificate.

    - **Available to all namespaces in this project:** The certificate is available for any deployment in any namespaces in the project.

    - **Available to a single namespace:** The certificate is only available for the deployments in one namespace. If you choose this option, select a **Namespace** from the drop-down list or click **Add to a new namespace** to add the certificate to a namespace you create on the fly.

1. From **Private Key**, either copy and paste your certificate's private key into the text box (include the header and footer), or click **Read from a file** to browse to the private key on your file system. If possible, we recommend using **Read from a file** to reduce likelihood of error.

    Private key files end with an extension of `.key`.

1. From **Certificate**, either copy and paste your certificate into the text box (include the header and footer), or click **Read from a file** to browse to the certificate on your file system. If possible, we recommend using **Read from a file** to reduce likelihood of error.

    Certificate files end with an extension of `.crt`.

**Result:** Your certificate is added to the project or namespace. You can now add it to deployments.

- If you added an SSL certificate to the project, the certificate is available for deployments created in any project namespace.
- If you added an SSL certificate to a namespace, the certificate is available only for deployments in that namespace.
- Your certificate is added to the **Resources > Secrets > Certificates** view. (For Rancher before v2.3, it is added to **Resources > Certificates.**)

## What's Next?

Now you can add the certificate when launching an ingress within the current project or namespace. For more information, see [Adding Ingress]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/load-balancers-and-ingress/ingress/).
