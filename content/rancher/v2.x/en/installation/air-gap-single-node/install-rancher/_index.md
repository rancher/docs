---
title: "3. Choose an SSL Option and Install Rancher"
weight: 300
---

For development and testing in air gap environments, we recommend installing Rancher by running a single Docker container. In this installation scenario, you'll deploy Rancher to your air gap host using an image pulled from your private registry.

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS.

- As of Rancher v2.3.0, a local copy of `system-charts` has been packaged into the `rancher/rancher` container. To be able to use these features in an air gap install, you will need to run the Rancher install command with an extra flag, `-e CATTLE_SYSTEM_CATALOG=bundled`, which tells Rancher to use the local copy of the charts instead of attempting to fetch them from GitHub.
- For Rancher prior to v2.3.0, you will need to mirror the `system-charts` repository to a location in your network that Rancher can reach. Then, after Rancher is installed, you will need to configure Rancher to use that repository. For details, refer to the documentation on [setting up the system charts for Rancher prior to v2.3.0.]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0)

>**Do you want to...**
>
>- Configure custom CA root certificate to access your services? See [Custom CA root certificate]({{< baseurl >}}/rancher/v2.x/en/admin-settings/custom-ca-root-certificate/).
>- Record all transactions with the Rancher API? See [API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#api-audit-log).

Choose from the following options:

{{% accordion id="option-a" label="Option A-Default Self-Signed Certificate" %}}

If you are installing Rancher in a development or testing environment where identity verification isn't a concern, install Rancher using the self-signed certificate that it generates. This installation option omits the hassle of generating a certificate yourself.

Log into your Linux host, and then run the installation command below. 

If your private registry doesn't require credentials, you can set it as default when starting the rancher/rancher container by using the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`.

- Replace `<REGISTRY.YOURDOMAIN.COM:PORT>` with your private registry URL and port.
- Replace `<RANCHER_VERSION_TAG>` with release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.

```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -e CATTLE_SYSTEM_CATALOG=bundled \ # For Rancher v2.3.0+ only
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG> \
    --set extraEnv[0].name=CATTLE_SYSTEM_DEFAULT_REGISTRY \
    --set extraEnv[0].value=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set extraEnv[1].name=CATTLE_SYSTEM_CATALOG \
    --set extraEnv[1].value=bundled 
```

{{% /accordion %}}
{{% accordion id="option-b" label="Option B-Bring Your Own Certificate: Self-Signed" %}}
In development or testing environments where your team will access your Rancher server, create a self-signed certificate for use with your install so that your team can verify they're connecting to your instance of Rancher.

>**Prerequisites:**
>From a computer with an internet connection, create a self-signed certificate using [OpenSSL](https://www.openssl.org/) or another method of your choice.
>
>- The certificate files must be in [PEM format]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#pem).
>- In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [SSL FAQ / Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#cert-order).

After creating your certificate, run the Docker command below to install Rancher. Use the `-v` flag and provide the path to your certificates to mount them in your container.

When entering the command, use the table below to replace each placeholder.

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<CA_CERTS>` | The path to the certificate authority's private key.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port. This configures Rancher to use your private registry when starting the `rancher/rancher` container.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.

If your private registry doesn't require credentials, you can set it as default when starting the rancher/rancher container by using the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`. This will allow Rancher to use the registry when provisioning other clusters without additional configuration.

```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -e CATTLE_SYSTEM_CATALOG=bundled \ # For Rancher v2.3.0+ only
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
    -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    -v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG> \
    --set extraEnv[0].name=CATTLE_SYSTEM_DEFAULT_REGISTRY \
    --set extraEnv[0].value=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set extraEnv[1].name=CATTLE_SYSTEM_CATALOG \
    --set extraEnv[1].value=bundled 
```

{{% /accordion %}}
{{% accordion id="option-c" label="Option C-Bring Your Own Certificate: Signed by Recognized CA" %}}

In production environments where you're exposing an app publicly, use a certificate signed by a recognized CA so that your user base doesn't encounter security warnings.

>**Prerequisite:** The certificate files must be in [PEM format]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#pem).

After obtaining your certificate, run the Docker command below, replacing each placeholder. Because your certificate is signed by a recognized CA, mounting an additional CA certificate file is unnecessary.

When entering the command, use the table below to replace each placeholder.

If your private registry doesn't require credentials, you can set it as default when starting the rancher/rancher container by using the environment variable `CATTLE_SYSTEM_DEFAULT_REGISTRY`. This will allow Rancher to use the registry when provisioning other clusters without additional configuration.

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port. Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.


```
docker run -d --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    -e CATTLE_SYSTEM_CATALOG=bundled \ # For Rancher v2.3.0+ only
    -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
    -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
    <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG> --no-cacerts \
    --set extraEnv[0].name=CATTLE_SYSTEM_DEFAULT_REGISTRY \
    --set extraEnv[0].value=<REGISTRY.YOURDOMAIN.COM:PORT> \
    --set extraEnv[1].name=CATTLE_SYSTEM_CATALOG \
    --set extraEnv[1].value=bundled 
```

{{% /accordion %}}


If you are installing Rancher v2.3.0, the installation is complete.

If you are installing Rancher prior to v2.3.0, the final step is to [configure the Rancher system charts.]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0)