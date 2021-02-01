---
title: Advanced Options for Docker Installs
weight: 5
---

When installing Rancher, there are several [advanced options]({{<baseurl>}}/rancher/v2.5/en/installation/options/) that can be enabled:

- [Custom CA Certificate](#custom-ca-certificate)
- [API Audit Log](#api-audit-log)
- [TLS Settings](#tls-settings)
- [Air Gap](#air-gap)
- [Persistent Data](#persistent-data)
- [Running `rancher/rancher` and `rancher/rancher-agent` on the Same Node](#running-rancher-rancher-and-rancher-rancher-agent-on-the-same-node)

### Custom CA Certificate

If you want to configure Rancher to use a CA root certificate to be used when validating services, you would start the Rancher container sharing the directory that contains the CA root certificate.

Use the command example to start a Rancher container with your private CA certificates mounted.

- The volume flag (`-v`) should specify the host directory containing the CA root certificates.
- The environment variable flag (`-e`) in combination with `SSL_CERT_DIR` and directory declares an environment variable that specifies the mounted CA root certificates directory location inside the container.
- Passing environment variables to the Rancher container can be done using `-e KEY=VALUE` or `--env KEY=VALUE`.
- Mounting a host directory inside the container can be done using `-v host-source-directory:container-destination-directory` or `--volume host-source-directory:container-destination-directory`.

The example below is based on having the CA root certificates in the `/host/certs` directory on the host and mounting this directory on `/container/certs` inside the Rancher container.

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /host/certs:/container/certs \
  -e SSL_CERT_DIR="/container/certs" \
  --privileged \
  rancher/rancher:latest
```

### API Audit Log

The API Audit Log records all the user and system transactions made through Rancher server.

The API Audit Log writes to `/var/log/auditlog` inside the rancher container by default. Share that directory as a volume and set your `AUDIT_LEVEL` to enable the log.

See [API Audit Log]({{<baseurl>}}/rancher/v2.5/en/installation/api-auditing) for more information and options.

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /var/log/rancher/auditlog:/var/log/auditlog \
  -e AUDIT_LEVEL=1 \
  --privileged \
  rancher/rancher:latest
```

### TLS settings

To set a different TLS configuration, you can use the `CATTLE_TLS_MIN_VERSION` and `CATTLE_TLS_CIPHERS` environment variables. For example, to configure TLS 1.0 as minimum accepted TLS version:

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -e CATTLE_TLS_MIN_VERSION="1.0" \
  --privileged \
  rancher/rancher:latest
```

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)

See [TLS settings]({{<baseurl>}}/rancher/v2.5/en/admin-settings/tls-settings) for more information and options.

### Air Gap

If you are visiting this page to complete an air gap installation, you must prepend your private registry URL to the server tag when running the installation command in the option that you choose. Add `<REGISTRY.DOMAIN.COM:PORT>` with your private registry URL in front of `rancher/rancher:latest`.

**Example:**

     <REGISTRY.DOMAIN.COM:PORT>/rancher/rancher:latest

### Persistent Data

Rancher uses etcd as a datastore. When Rancher is installed with Docker, the embedded etcd is being used. The persistent data is at the following path in the container: `/var/lib/rancher`.

You can bind mount a host volume to this location to preserve data on the host it is running on:

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /opt/rancher:/var/lib/rancher \
  --privileged \
  rancher/rancher:latest
```

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)

### Running `rancher/rancher` and `rancher/rancher-agent` on the Same Node

In the situation where you want to use a single node to run Rancher and to be able to add the same node to a cluster, you have to adjust the host ports mapped for the `rancher/rancher` container.

If a node is added to a cluster, it deploys the nginx ingress controller which will use port 80 and 443. This will conflict with the default ports we advise to expose for the `rancher/rancher` container.

Please note that this setup is not recommended for production use, but can be convenient for development/demo purposes.

To change the host ports mapping, replace the following part `-p 80:80 -p 443:443` with `-p 8080:80 -p 8443:443`:

```
docker run -d --restart=unless-stopped \
  -p 8080:80 -p 8443:443 \
  --privileged \
  rancher/rancher:latest
```

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)
