---
title: Custom CA root certificate
weight: 1110
aliases:
  - /rancher/v2.x/en/installation/custom-ca-root-certificate/
  - /rancher/v2.x/en/admin-settings/custom-ca-root-certificate/
---
If you're using Rancher in an internal production environment where you aren't exposing apps publicly, use a certificate from a private certificate authority (CA).

Services that Rancher needs to access are sometimes configured with a certificate from a custom/internal CA root, also known as self signed certificate. If the presented certificate from the service cannot be validated by Rancher, the following error displays: `x509: certificate signed by unknown authority`.

To validate the certificate, the CA root certificates need to be added to Rancher. As Rancher is written in Go, we can use the environment variable `SSL_CERT_DIR` to point to the directory where the CA root certificates are located in the container. The CA root certificates directory can be mounted using the Docker volume option (`-v host-source-directory:container-destination-directory`) when starting the Rancher container.

Examples of services that Rancher can access:

* Catalogs
* Authentication providers
* Accessing hosting/cloud API when using Node Drivers

## Installing with the custom CA Certificate

The Audit Log is enabled and configured by passing environment variables to the Rancher server container. See the following to enable on your installation.

- [Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#custom-ca-certificate)

- [HA Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#additional-trusted-cas)
