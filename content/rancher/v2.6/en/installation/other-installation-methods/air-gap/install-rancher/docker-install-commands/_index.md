---
title: Docker Install Commands
weight: 1
---

The Docker installation is for Rancher users who want to test out Rancher. 

Instead of running on a Kubernetes cluster, you install the Rancher server component on a single node using a `docker run` command. Since there is only one node and a single Docker container, if the node goes down, there is no copy of the etcd data available on other nodes and you will lose all the data of your Rancher server. 

For Rancher v2.5+, the backup application can be used to migrate the Rancher server from a Docker install to a Kubernetes install using [these steps.]({{<baseurl>}}/rancher/v2.5/en/backups/migrating-rancher)

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

| Environment Variable Key         | Environment Variable Value       | Description     |
| -------------------------------- | -------------------------------- | ---- |
| `CATTLE_SYSTEM_DEFAULT_REGISTRY` | `<REGISTRY.YOURDOMAIN.COM:PORT>` | Configure Rancher server to always pull from your private registry when provisioning clusters.  |
| `CATTLE_SYSTEM_CATALOG`          | `bundled`                        | Configure Rancher server to use the packaged copy of Helm system charts. The [system charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. These [Helm charts](https://github.com/rancher/system-charts) are located in GitHub, but since you are in an air gapped environment, using the charts that are bundled within Rancher is much easier than setting up a Git mirror. |

> **Do you want to...**
>
> - Configure custom CA root certificate to access your services? See [Custom CA root certificate]({{<baseurl>}}/rancher/v2.5/en/installation/options/custom-ca-root-certificate/).
> - Record all transactions with the Rancher API? See [API Auditing]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/advanced/#api-audit-log).

Choose from the following options:

### Option A: Default Self-Signed Certificate

{{% accordion id="option-a" label="Click to expand" %}}

If you are installing Rancher in a development or testing environment where identity verification isn't a concern, install Rancher using the self-signed certificate that it generates. This installation option omits the hassle of generating a certificate yourself.

Log into your Linux host, and then run the installation command below. When entering the command, use the table below to replace each placeholder.

| Placeholder                      | Description                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.                                                                                           |
| `<RANCHER_VERSION_TAG>`          | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to install. |

As of Rancher v2.5, privileged access is [required.](#privileged-access-for-rancher-v2-5)

```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    -e CATTLE_SYSTEM_CATALOG=bundled \ # Use the packaged Rancher system charts
    --privileged \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

{{% /accordion %}}

### Option B: Bring Your Own Certificate: Self-Signed

{{% accordion id="option-b" label="Click to expand" %}}

In development or testing environments where your team will access your Rancher server, create a self-signed certificate for use with your install so that your team can verify they're connecting to your instance of Rancher.

> **Prerequisites:**
> From a computer with an internet connection, create a self-signed certificate using [OpenSSL](https://www.openssl.org/) or another method of your choice.
>
> - The certificate files must be in PEM format.
> - In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [Certificate Troubleshooting.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/troubleshooting)

After creating your certificate, log into your Linux host, and then run the installation command below. When entering the command, use the table below to replace each placeholder. Use the `-v` flag and provide the path to your certificates to mount them in your container.

| Placeholder                      | Description                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `<CERT_DIRECTORY>`               | The path to the directory containing your certificate files.                                                                  |
| `<FULL_CHAIN.pem>`               | The path to your full certificate chain.                                                                                      |
| `<PRIVATE_KEY.pem>`              | The path to the private key for your certificate.                                                                             |
| `<CA_CERTS.pem>`                     | The path to the certificate authority's certificate.                                                                          |
| `<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.                                                                                           |
| `<RANCHER_VERSION_TAG>`          | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to install. |

As of Rancher v2.5, privileged access is [required.](#privileged-access-for-rancher-v2-5)

```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
    -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    -v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
    -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    -e CATTLE_SYSTEM_CATALOG=bundled \ # Use the packaged Rancher system charts
    --privileged \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

{{% /accordion %}}

### Option C: Bring Your Own Certificate: Signed by Recognized CA

{{% accordion id="option-c" label="Click to expand" %}}

In development or testing environments where you're exposing an app publicly, use a certificate signed by a recognized CA so that your user base doesn't encounter security warnings.

> **Prerequisite:** The certificate files must be in PEM format.

After obtaining your certificate, log into your Linux host, and then run the installation command below. When entering the command, use the table below to replace each placeholder. Because your certificate is signed by a recognized CA, mounting an additional CA certificate file is unnecessary.

| Placeholder                      | Description                                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `<CERT_DIRECTORY>`               | The path to the directory containing your certificate files.                                                                  |
| `<FULL_CHAIN.pem>`               | The path to your full certificate chain.                                                                                      |
| `<PRIVATE_KEY.pem>`              | The path to the private key for your certificate.                                                                             |
| `<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.                                                                                           |
| `<RANCHER_VERSION_TAG>`          | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to install. |

> **Note:** Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

As of Rancher v2.5, privileged access is [required.](#privileged-access-for-rancher-v2-5)

```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    --no-cacerts \
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
    -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
    -e CATTLE_SYSTEM_CATALOG=bundled \ # Use the packaged Rancher system charts
    --privileged
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

{{% /accordion %}}



> **Note:** If you don't intend to send telemetry data, opt out [telemetry]({{<baseurl>}}/rancher/v2.5/en/faq/telemetry/) during the initial login.

