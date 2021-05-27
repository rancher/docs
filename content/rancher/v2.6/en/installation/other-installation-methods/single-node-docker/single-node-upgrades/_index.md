---
title: Upgrading Rancher Installed with Docker
weight: 1010
aliases:
  - /rancher/v2.5/en/upgrades/single-node-upgrade/
  - /rancher/v2.5/en/upgrades/upgrades/single-node-air-gap-upgrade
  - /rancher/v2.5/en/upgrades/upgrades/single-node
  - /rancher/v2.5/en/upgrades/upgrades/single-node-upgrade/
  - /rancher/v2.5/en/installation/install-rancher-on-k8s/upgrades/upgrades/single-node/
---

The following instructions will guide you through upgrading a Rancher server that was installed with Docker.

# Prerequisites

- **Review the [known upgrade issues]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/upgrades/#known-upgrade-issues) in the Rancher documentation for the most noteworthy issues to consider when upgrading Rancher. A more complete list of known issues for each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12) Note that upgrades to or from any chart in the [rancher-alpha repository]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/chart-options/#helm-chart-repositories/) aren’t supported.
- **For [air gap installs only,]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap) collect and populate images for the new Rancher server version.** Follow the guide to [populate your private registry]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap/populate-private-registry/) with the images for the Rancher version that you want to upgrade to.

# Placeholder Review

During upgrade, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets and all capital letters (`<EXAMPLE>`).

Here's an **example** of a command with a placeholder:

```
docker stop <RANCHER_CONTAINER_NAME>
```

In this command, `<RANCHER_CONTAINER_NAME>` is the name of your Rancher container.

# Get Data for Upgrade Commands

To obtain the data to replace the placeholders, run:

```
docker ps
```

Write down or copy this information before starting the upgrade.

<sup>Terminal `docker ps` Command, Displaying Where to Find `<RANCHER_CONTAINER_TAG>` and `<RANCHER_CONTAINER_NAME>`</sup>
![Placeholder Reference]({{<baseurl>}}/img/rancher/placeholder-ref.png)

| Placeholder                | Example                    | Description                                               |
| -------------------------- | -------------------------- | --------------------------------------------------------- |
| `<RANCHER_CONTAINER_TAG>`  | `v2.1.3`                   | The rancher/rancher image you pulled for initial install. |
| `<RANCHER_CONTAINER_NAME>` | `festive_mestorf`          | The name of your Rancher container.                       |
| `<RANCHER_VERSION>`        | `v2.1.3`                   | The version of Rancher that you're creating a backup for. |
| `<DATE>`                   | `2018-12-19`               | The date that the data container or backup was created.   |
<br/>

You can obtain `<RANCHER_CONTAINER_TAG>` and `<RANCHER_CONTAINER_NAME>` by logging into your Rancher server by remote connection and entering the command to view the containers that are running: `docker ps`. You can also view containers that are stopped using a different command: `docker ps -a`. Use these commands for help anytime during while creating backups.

# Upgrade Outline

During upgrade, you create a copy of the data from your current Rancher container and a backup in case something goes wrong. Then you deploy the new version of Rancher in a new container using your existing data. Follow the steps to upgrade Rancher server:

- [1. Create a copy of the data from your Rancher server container](#1-create-a-copy-of-the-data-from-your-rancher-server-container)
- [2. Create a backup tarball](#2-create-a-backup-tarball)
- [3. Pull the new Docker image](#3-pull-the-new-docker-image)
- [4. Start the new Rancher server container](#4-start-the-new-rancher-server-container)
- [5. Verify the Upgrade](#5-verify-the-upgrade)
- [6. Clean up your old Rancher server container](#6-clean-up-your-old-rancher-server-container)

# 1. Create a copy of the data from your Rancher server container

1. Using a remote Terminal connection, log into the node running your Rancher server.

1. Stop the container currently running Rancher server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container.

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```

1. <a id="backup"></a>Use the command below, replacing each placeholder, to create a data container from the Rancher container that you just stopped.

    ```
    docker create --volumes-from <RANCHER_CONTAINER_NAME> --name rancher-data rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

# 2. Create a backup tarball

1. <a id="tarball"></a>From the data container that you just created (`rancher-data`), create a backup tarball (`rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz`).

    This tarball will serve as a rollback point if something goes wrong during upgrade. Use the following command, replacing each placeholder.


    ```
    docker run --volumes-from rancher-data -v $PWD:/backup busybox tar zcvf /backup/rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz /var/lib/rancher
    ```

    **Step Result:** When you enter this command, a series of commands should run.

1. Enter the `ls` command to confirm that the backup tarball was created. It will have a name similar to `rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz`.

    ```
   [rancher@ip-10-0-0-50 ~]$ ls
   rancher-data-backup-v2.1.3-20181219.tar.gz
    ```

1. Move your backup tarball to a safe location external from your Rancher server.

# 3. Pull the New Docker Image

Pull the image of the Rancher version that you want to upgrade to.

Placeholder | Description
------------|-------------
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to upgrade to.

```
docker pull rancher/rancher:<RANCHER_VERSION_TAG>
```

# 4. Start the New Rancher Server Container

Start a new Rancher server container using the data from the `rancher-data` container. Remember to pass in all the environment variables that you had used when you started the original container.

>**Important:** _Do not_ stop the upgrade after initiating it, even if the upgrade process seems longer than expected. Stopping the upgrade may result in database migration errors during future upgrades.

If you used a proxy, see [HTTP Proxy Configuration.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/proxy/)

If you configured a custom CA root certificate to access your services, see [Custom CA root certificate.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/advanced/#custom-ca-certificate)

If you are recording all transactions with the Rancher API, see [API Auditing]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/advanced/#api-audit-log)

To see the command to use when starting the new Rancher server container, choose from the following options:

- Docker Upgrade
- Docker Upgrade for Air Gap Installs

{{% tabs %}}
{{% tab "Docker Upgrade" %}}

Select which option you had installed Rancher server

### Option A: Default Self-Signed Certificate

{{% accordion id="option-a" label="Click to expand" %}}

If you have selected to use the Rancher generated self-signed certificate, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container.

Placeholder | Description
------------|-------------
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to upgrade to.

```
docker run -d --volumes-from rancher-data \
  --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  --privileged \
  rancher/rancher:<RANCHER_VERSION_TAG>
```

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)

{{% /accordion %}}

### Option B: Bring Your Own Certificate: Self-Signed

{{% accordion id="option-b" label="Click to expand" %}}

If you have selected to bring your own self-signed certificate, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to have access to the same certificate that you had originally installed with.

>**Reminder of the Cert Prerequisite:** The certificate files must be in PEM format. In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates.

Placeholder | Description
------------|-------------
 `<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<CA_CERTS.pem>` | The path to the certificate authority's certificate.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to upgrade to.

```
docker run -d --volumes-from rancher-data \
  --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
  -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
  -v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
  --privileged \
  rancher/rancher:<RANCHER_VERSION_TAG>
```

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)

{{% /accordion %}}

### Option C: Bring Your Own Certificate: Signed by Recognized CA

{{% accordion id="option-c" label="Click to expand" %}}

If you have selected to use a certificate signed by a recognized CA, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to have access to the same certificates that you had originally installed with. Remember to include `--no-cacerts` as an argument to the container to disable the default CA certificate generated by Rancher.

>**Reminder of the Cert Prerequisite:** The certificate files must be in PEM format. In your certificate file, include all intermediate certificates provided by the recognized CA. Order your certificates with your certificate first, followed by the intermediates. For an example, see [Certificate Troubleshooting.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/troubleshooting)

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to upgrade to.

```
docker run -d --volumes-from rancher-data \
  --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
  -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
  --privileged \
  rancher/rancher:<RANCHER_VERSION_TAG> \
  --no-cacerts
```

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)
{{% /accordion %}}

### Option D: Let's Encrypt Certificate

{{% accordion id="option-d" label="Click to expand" %}}

>**Remember:** Let's Encrypt provides rate limits for requesting new certificates. Therefore, limit how often you create or destroy the container. For more information, see [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).

If you have selected to use [Let's Encrypt](https://letsencrypt.org/) certificates, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to provide the domain that you had used when you originally installed Rancher.

>**Reminder of the Cert Prerequisites:**
>
>- Create a record in your DNS that binds your Linux host IP address to the hostname that you want to use for Rancher access (`rancher.mydomain.com` for example).
>- Open port `TCP/80` on your Linux host. The Let's Encrypt http-01 challenge can come from any source IP address, so port `TCP/80` must be open to all IP addresses.

Placeholder | Description
------------|-------------
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to upgrade to.
`<YOUR.DNS.NAME>` | The domain address that you had originally started with

```
docker run -d --volumes-from rancher-data \
  --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  --privileged \
  rancher/rancher:<RANCHER_VERSION_TAG> \
  --acme-domain <YOUR.DNS.NAME>
```

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)

{{% /accordion %}}

{{% /tab %}}
{{% tab "Docker Air Gap Upgrade" %}}

For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

When starting the new Rancher server container, choose from the following options:

### Option A: Default Self-Signed Certificate

{{% accordion id="option-a" label="Click to expand" %}}

If you have selected to use the Rancher generated self-signed certificate, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container.

Placeholder | Description
------------|-------------
`<REGISTRY.YOURDOMAIN.COM:PORT>` |  Your private registry URL and port.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to to upgrade to.

```
  docker run -d --volumes-from rancher-data \
      --restart=unless-stopped \
      -p 80:80 -p 443:443 \
      -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
      -e CATTLE_SYSTEM_CATALOG=bundled \ # Use the packaged Rancher system charts
      --privileged \
      <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```

As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)
{{% /accordion %}}

### Option B: Bring Your Own Certificate: Self-Signed

{{% accordion id="option-b" label="Click to expand" %}}

If you have selected to bring your own self-signed certificate, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to have access to the same certificate that you had originally installed with.

>**Reminder of the Prerequisite:** The certificate files must be in PEM format. In your certificate file, include all intermediate certificates in the chain. Order your certificates with your certificate first, followed by the intermediates. For an example, see [Certificate Troubleshooting.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/troubleshooting)

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<CA_CERTS.pem>` | The path to the certificate authority's certificate.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to upgrade to.

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
As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)
{{% /accordion %}}

### Option C: Bring Your Own Certificate: Signed by Recognized CA

{{% accordion id="option-c" label="Click to expand" %}}

If you have selected to use a certificate signed by a recognized CA, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to have access to the same certificates that you had originally installed with.

 >**Reminder of the Prerequisite:** The certificate files must be in PEM format. In your certificate file, include all intermediate certificates provided by the recognized CA. Order your certificates with your certificate first, followed by the intermediates. For an example, see [Certificate Troubleshooting.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/troubleshooting)

Placeholder | Description
------------|-------------
`<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
`<FULL_CHAIN.pem>` | The path to your full certificate chain.
`<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
`<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.
`<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/) that you want to upgrade to.

> **Note:**  Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

```
docker run -d --volumes-from rancher-data \
    --restart=unless-stopped \
     -p 80:80 -p 443:443 \
     --no-cacerts \
     -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
     -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
     -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
     -e CATTLE_SYSTEM_CATALOG=bundled \ # Use the packaged Rancher system charts
     --privileged
     <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
```
As of Rancher v2.5, privileged access is [required.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/#privileged-access-for-rancher-v2-5)
{{% /accordion %}}
{{% /tab %}}
{{% /tabs %}}

**Result:** You have upgraded Rancher. Data from your upgraded server is now saved to the `rancher-data` container for use in future upgrades.

# 5. Verify the Upgrade

Log into Rancher. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

>**Having network issues in your user clusters following upgrade?**
>
> See [Restoring Cluster Networking]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/namespace-migration).


# 6. Clean up Your Old Rancher Server Container

Remove the previous Rancher server container. If you only stop the previous Rancher server container (and don't remove it), the container may restart after the next server reboot.

# Rolling Back

If your upgrade does not complete successfully, you can roll back Rancher server and its data back to its last healthy state. For more information, see [Docker Rollback]({{<baseurl>}}/rancher/v2.5/en/upgrades/rollbacks/single-node-rollbacks/).
