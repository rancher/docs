---
title: About Custom CA Root Certificates
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/custom-ca-root-certificate/
  - /rancher/v2.0-v2.4/en/installation/resources/choosing-version/encryption/custom-ca-root-certificate
---

If you're using Rancher in an internal production environment where you aren't exposing apps publicly, use a certificate from a private certificate authority (CA).

Services that Rancher needs to access are sometimes configured with a certificate from a custom/internal CA root, also known as self signed certificate. If the presented certificate from the service cannot be validated by Rancher, the following error displays: `x509: certificate signed by unknown authority`.

To validate the certificate, the CA root certificates need to be added to Rancher. As Rancher is written in Go, we can use the environment variable `SSL_CERT_DIR` to point to the directory where the CA root certificates are located in the container. The CA root certificates directory can be mounted using the Docker volume option (`-v host-source-directory:container-destination-directory`) when starting the Rancher container.

Examples of services that Rancher can access:

- Catalogs
- Authentication providers
- Accessing hosting/cloud API when using Node Drivers

## Installing with the custom CA Certificate

For details on starting a Rancher container with your private CA certificates mounted, refer to the installation docs:

- [Docker install Custom CA certificate options]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/single-node-docker/advanced/#custom-ca-certificate)

- [Kubernetes install options for Additional Trusted CAs]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#additional-trusted-cas)

