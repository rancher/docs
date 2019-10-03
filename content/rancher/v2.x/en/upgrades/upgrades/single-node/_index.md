---
title: Single Node Upgrade
weight: 1010
aliases:
  - /rancher/v2.x/en/upgrades/single-node-upgrade/
  - /rancher/v2.x/en/upgrades/upgrades/single-node-upgrade/
  - /rancher/v2.x/en/upgrades/upgrades/single-node-air-gap-upgrade
---

The following instructions will guide you through upgrading a high-availability Rancher server installation.

## Prerequisites

- **Review the [Known Upgrade Issues]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/#known-upgrade-issues) and [Caveats]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/#caveats)**

- **[Air Gap Installs Only:]({{< baseurl >}}/rancher/v2.x/en/installations/air-gap/) Collect and Populate Images for the new Rancher server version**

    Follow the guide to [populate your private registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap/populate-private-registry/) with the images for the Rancher version that you want to upgrade to.

## Placeholder Review

During upgrade, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets and all capital letters (`<EXAMPLE>`).

Here's an **example** of a command with a placeholder:

```
docker stop <RANCHER_CONTAINER_NAME>
```

In this command, `<RANCHER_CONTAINER_NAME>` is the name of your Rancher container.

Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the upgrade.

<sup>Terminal `docker ps` Command, Displaying Where to Find `<RANCHER_CONTAINER_TAG>` and `<RANCHER_CONTAINER_NAME>`</sup>
![Placeholder Reference]({{< baseurl >}}/img/rancher/placeholder-ref.png)

| Placeholder                | Example                    | Description                                               |
| -------------------------- | -------------------------- | --------------------------------------------------------- |
| `<RANCHER_CONTAINER_TAG>`  | `v2.1.3`                   | The rancher/rancher image you pulled for initial install. |
| `<RANCHER_CONTAINER_NAME>` | `festive_mestorf`          | The name of your Rancher container.                       |
| `<RANCHER_VERSION>`        | `v2.1.3`                   | The version of Rancher that you're creating a backup for. |
| `<DATE>`                   | `2018-12-19`               | The date that the data container or backup was created.   |
<br/>

You can obtain `<RANCHER_CONTAINER_TAG>` and `<RANCHER_CONTAINER_NAME>` by logging into your Rancher Server by remote connection and entering the command to view the containers that are running: `docker ps`. You can also view containers that are stopped using a different command: `docker ps -a`. Use these commands for help anytime during while creating backups.

## Upgrade Outline

During upgrade, you create a copy of the data from your current Rancher container and a backup in case something goes wrong. Then you deploy the new version of Rancher in a new container using your existing data. Follow the steps to upgrade Rancher server:

- A. Create a copy of the data from your Rancher server container
- B. Create a backup tarball
Get the options set from your current Rancher install
- C. Upgrade Rancher
- D. Verify the Upgrade
- E. Clean up your old Rancher server container

### A. Create a copy of the data from your Rancher server container

1. Using a remote Terminal connection, log into the node running your Rancher Server.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container.

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```

1. <a id="backup"></a>Use the command below, replacing each placeholder, to create a data container from the Rancher container that you just stopped.

    ```
    docker create --volumes-from <RANCHER_CONTAINER_NAME> --name rancher-data rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

### B. Create a backup tarball

1. <a id="tarball"></a>From the data container that you just created (`rancher-data`), create a backup tarball (`rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz`).

    This tarball will serve as a rollback point if something goes wrong during upgrade. Use the following command, replacing each [placeholder](#before-you-start).


    ```
    docker run --volumes-from rancher-data -v $PWD:/backup busybox tar zcvf /backup/rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz /var/lib/rancher
    ```

    **Step Result:** When you enter this command, a series of commands should run.

1. Enter the `ls` command to confirm that the backup tarball was created. It will have a name similar to `rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz`.

    ```
   [rancher@ip-10-0-0-50 ~]$ ls
   rancher-data-backup-v2.1.3-20181219.tar.gz
    ```

1. Move your backup tarball to a safe location external from your Rancher Server.

### C. Upgrade Rancher

1. Pull the most recent image of Rancher.

    ```
    docker pull rancher/rancher:latest
    ```

1. Start a new Rancher server container using the data from the `rancher-data` container. Remember to pass in all the environment variables that you had used when you started the original container.

    >**Note:** After upgrading Rancher Server, data from your upgraded server is now saved to the `rancher-data` container for use in future upgrades.

    >**Important:** _Do not_ stop the upgrade after initiating it, even if the upgrade process seems longer than expected. Stopping the upgrade may result in database migration errors during future upgrades.

    >**Did you...**
    >
    >- Use a proxy? See [HTTP Proxy Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/proxy/)
    >- Configure custom CA root certificate to access your services? See [Custom CA root certificate]({{< baseurl >}}/rancher/v2.x/en/admin-settings/custom-ca-root-certificate/)
    >- Record all transactions with the Rancher API? See [API Auditing](#api-audit-log)
    >

    Choose from the following options:

    * Single Node Upgrade
    * Single Node Upgrade for Air Gap Installs

  {{% tabs %}}
  {{% tab "Single Node Upgrade" %}}

  Select which option you had installed Rancher server

  {{% accordion id="option-a" label="Option A-Default Self-Signed Certificate" %}}

  If you have selected to use the Rancher generated self-signed certificate, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container.

  ```
	docker run -d --volumes-from rancher-data \
  --restart=unless-stopped \
	-p 80:80 -p 443:443 \
	rancher/rancher:latest
  ```

  {{% /accordion %}}

  {{% accordion id="option-b" label="Option B-Bring Your Own Certificate: Self-Signed" %}}

  If you have selected to bring your own self-signed certificate, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to have access to the same certificate that you had originally installed with.

  - Replace `<CERT_DIRECTORY>` with the directory path to your certificate file.
  - Replace `<FULL_CHAIN.pem>`,`<PRIVATE_KEY.pem>`, and `<CA_CERTS>` with your certificate names.

  ```
  docker run -d --volumes-from rancher-data \
    --restart=unless-stopped \
  	-p 80:80 -p 443:443 \
  	-v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
  	-v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
  	-v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
  	rancher/rancher:latest
  ```

  {{% /accordion %}}
  {{% accordion id="option-c" label="Option C-Bring Your Own Certificate: Signed by Recognized CA" %}}

  If you have selected to use a certificate signed by a recognized CA, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to have access to the same certificates that you had originally installed with.

  >**Reminder of the Prerequisite:** The certificate files must be in [PEM format]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#pem).

  After obtaining your certificate, run the Docker command below.

  - Use the `-v` flag and provide the path to your certificates to mount them in your container. Because your certificate is signed by a recognized CA, mounting an additional CA certificate file is unnecessary.

  	- Replace `<CERT_DIRECTORY>` with the directory path to your certificate file.
  	- Replace `<FULL_CHAIN.pem>` and `<PRIVATE_KEY.pem>` with your certificate names.

  - Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

  ```
  docker run -d --volumes-from rancher-data \
    --restart=unless-stopped \
  	-p 80:80 -p 443:443 \
  	-v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
  	-v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
  	rancher/rancher:latest --no-cacerts
  ```
  {{% /accordion %}}
  {{% accordion id="option-d" label="Option D-Let's Encrypt Certificate" %}}

  If you have selected to use [Let's Encrypt](https://letsencrypt.org/) certificates, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to provide the domain `<YOUR.DNS.NAME>` that you had used when you originally installed Rancher.

  >**Reminder of the Prerequisites:**
  >
  >- Create a record in your DNS that binds your Linux host IP address to the hostname that you want to use for Rancher access (`rancher.mydomain.com` for example).
  >- Open port `TCP/80` on your Linux host. The Let's Encrypt http-01 challenge can come from any source IP address, so port `TCP/80` must be open to all IP addresses.

	```
  docker run -d --volumes-from rancher-data \
    --restart=unless-stopped \
	  -p 80:80 -p 443:443 \
	  rancher/rancher:latest \
	  --acme-domain <YOUR.DNS.NAME>
  ```

  >**Remember:** Let's Encrypt provides rate limits for requesting new certificates. Therefore, limit how often you create or destroy the container. For more information, see [Let's Encrypt documentation on rate limits](https://letsencrypt.org/docs/rate-limits/).

  {{% /accordion %}}

  {{% /tab %}}
  {{% tab "Single Node Air Gap Upgrade" %}}

  For security purposes, SSL (Secure Sockets Layer) is required when using Rancher. SSL secures all Rancher network communication, like when you login or interact with a cluster.

  >**Did you...**
  >
  >- Configure custom CA root certificate to access your services? See [Custom CA root certificate]({{< baseurl >}}/rancher/v2.x/en/admin-settings/custom-ca-root-certificate/).
  >- Record all transactions with the Rancher API? See [API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#api-audit-log).

  - For Rancher prior to v2.3.0, you will need to mirror the `system-charts` repository to a location in your network that Rancher can reach. Then, after Rancher is installed, you will need to configure Rancher to use that repository. For details, refer to the documentation on [setting up the system charts for Rancher prior to v2.3.0.]({{<baseurl>}}/rancher/v2.x/en/installation/options/local-system-charts/#setting-up-system-charts-for-rancher-prior-to-v2-3-0)

  Choose from the following options:

  {{% accordion id="option-a" label="Option A-Default Self-Signed Certificate" %}}

  If you have selected to use the Rancher generated self-signed certificate, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container.

  Placeholder | Description
  ------------|-------------
  `<REGISTRY.YOURDOMAIN.COM:PORT>` |  Your private registry URL and port.
  `<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.


  ```
  docker run -d --volumes-from rancher-data \
      --restart=unless-stopped \
      -p 80:80 -p 443:443 \
      -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
      -e CATTLE_SYSTEM_CATALOG=bundled \ #Available as of v2.3.0, use the packaged Rancher system charts
      <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
  ```

  {{% /accordion %}}

  {{% accordion id="option-b" label="Option B-Bring Your Own Certificate: Self-Signed" %}}

  If you have selected to bring your own self-signed certificate, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to have access to the same certificate that you had originally installed with.

  Placeholder | Description
  ------------|-------------
  `<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
  `<FULL_CHAIN.pem>` | The path to your full certificate chain.
  `<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
  `<CA_CERTS>` | The path to the certificate authority's private key.
  `<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.
  `<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.

  ```
  docker run -d --restart=unless-stopped \
      -p 80:80 -p 443:443 \
      -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
      -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
      -v /<CERT_DIRECTORY>/<CA_CERTS.pem>:/etc/rancher/ssl/cacerts.pem \
      -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
      -e CATTLE_SYSTEM_CATALOG=bundled \ #Available as of v2.3.0, use the packaged Rancher system charts
      <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
  ```

  {{% /accordion %}}

  {{% accordion id="option-c" label="Option C-Bring Your Own Certificate: Signed by Recognized CA" %}}

  If you have selected to use a certificate signed by a recognized CA, you add the `--volumes-from rancher-data` to the command that you had started your original Rancher server container and need to have access to the same certificates that you had originally installed with.

  >**Reminder of the Prerequisite:** The certificate files must be in [PEM format]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/#pem).

  Placeholder | Description
  ------------|-------------
  `<CERT_DIRECTORY>` | The path to the directory containing your certificate files.
  `<FULL_CHAIN.pem>` | The path to your full certificate chain.
  `<PRIVATE_KEY.pem>` | The path to the private key for your certificate.
  `<REGISTRY.YOURDOMAIN.COM:PORT>` | Your private registry URL and port.
  `<RANCHER_VERSION_TAG>` | The release tag of the [Rancher version]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/) that you want to install.

  > **Note:**  Use the `--no-cacerts` as argument to the container to disable the default CA certificate generated by Rancher.

  ```
  docker run -d --volumes-from rancher-data \
      --restart=unless-stopped \
      -p 80:80 -p 443:443 \
      --no-cacerts \
      -v /<CERT_DIRECTORY>/<FULL_CHAIN.pem>:/etc/rancher/ssl/cert.pem \
      -v /<CERT_DIRECTORY>/<PRIVATE_KEY.pem>:/etc/rancher/ssl/key.pem \
      -e CATTLE_SYSTEM_DEFAULT_REGISTRY=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Set a default private registry to be used in Rancher
      -e CATTLE_SYSTEM_CATALOG=bundled \ #Available as of v2.3.0, use the packaged Rancher system charts
      <REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher:<RANCHER_VERSION_TAG>
  ```

  {{% /accordion %}}
  {{% /tab %}}
  {{% /tabs %}}

### D. Verify the Upgrade

Log into Rancher. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

>**Having network issues in your user clusters following upgrade?**
>
> See [Restoring Cluster Networking]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#restoring-cluster-networking).


### E. Clean up your old Rancher server container

Remove the previous Rancher Server container. If you only stop the previous Rancher Server container (and don't remove it), the container may restart after the next server reboot.

## Rolling Back

If your upgrade does not complete successfully, you can roll back Rancher server and its data back to its last healthy state. For more information, see [Single Node Rollback]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/single-node-rollbacks/).
