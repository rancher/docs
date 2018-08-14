---
title: Using a Private CA Root Certificate
weight: 365
---
Services that Rancher needs to access are sometimes configured with a certificate from an custom/internal Certificate Authority (CA) root, also known as self signed certificate. If the presented certificate from the service cannot be validated by Rancher, the following error will appear: `x509: certificate signed by unknown authority`.

To validate the certificate, the CA root certificates need to be added to Rancher. As Rancher is written in Go, we can use the environment variable `SSL_CERT_DIR` to point to the directory where the CA root certificates are located in the container. The CA root certificates directory can be mounted using the Docker volume option (`-v host-source-directory:container-destination-directory`) when starting the Rancher container.

Examples of services that Rancher can access:

* Catalogs
* Authentication providers
* Accessing hosting/cloud API when using Node Drivers

## Start Rancher Container with custom CA root certificates

The requirements are:

* Mount the host directory containing the CA root certificates in the container using the volume option.
* Add the environment variable `SSL_CERT_DIR` with as value the mounted CA root certificates directory location inside the container.

Passing environment variables to the Rancher container can be done using `-e KEY=VALUE` or `--env KEY=VALUE`, mounting a host directory inside the container can be done using `-v host-source-directory:container-destination-directory` or `--volume host-source-directory:container-destination-directory`.

The example below is based on having the CA root certificates in the `/host/certs` directory on the host and mounting this directory on `/container/certs` inside the Rancher container.

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /host/certs:/container/certs \
  -e SSL_CERT_DIR="/container/certs" \
  rancher/rancher:latest
```
