---
title: Single Node Upgrade
weight: 1010
aliases:
  - /rancher/v2.x/en/upgrades/single-node-upgrade/
---
To upgrade Rancher Server 2.x when a new version is released, create a data container for your current Rancher deployment, pull the latest image of Rancher, and then start a new Rancher container using your data container.

> **Note:** If you are upgrading from from Rancher v2.0.13 or earlier, or v2.1.8 or earlier, and your cluster's certificates have expired, you will need to perform [additional steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/certificate-rotation/#rotating-expired-certificates-after-upgrading-older-rancher-versions) to rotate the certificates.

## Before You Start

During upgrade, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets and all capital letters (`<EXAMPLE>`). 

Here's an **example** of a command with a placeholder:

```
docker stop <RANCHER_CONTAINER_NAME>
```

In this command, `<RANCHER_VERSION>-<DATE>` is the version number and date of creation for a backup of Rancher.

Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the [procedure below](#completing-the-upgrade).

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

## Prerequisites
**Upgrades to v2.0.7+ only:** Starting in v2.0.7, Rancher introduced the `system` project, which is a project that's automatically created to store important namespaces that Kubernetes needs to operate. During upgrade to v2.0.7+, Rancher expects these namespaces to be unassigned from all projects. Before beginning upgrade, check your system namespaces to make sure that they're unassigned to [prevent cluster networking issues]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#preventing-cluster-networking-issues).

## Caveats
Upgrades _to_ or _from_ any tag containing [alpha]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#server-tags) aren't supported.

## Completing the Upgrade

During upgrade, you create a copy of the data from your current Rancher container and a backup in case something goes wrong. Then you deploy the new version of Rancher in a new container using your existing data.

1. Using a remote Terminal connection, log into the node running your Rancher Server.


1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the [name of your Rancher container](#before-you-start).

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```

1. <a id="backup"></a>Use the command below, replacing each [placeholder](#before-you-start), to create a data container from the Rancher container that you just stopped.

    ```
    docker create --volumes-from <RANCHER_CONTAINER_NAME> --name rancher-data rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

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


1. Pull the most recent image of Rancher.

    ```
    docker pull rancher/rancher:latest
    ```

    >**Attention Air Gap Users:**
    > If you are visiting this page to complete [Air Gap Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/air-gap-upgrade), prepend your private registry URL to the image when running the `docker run` command.
    >
    > Example: `<registry.yourdomain.com:port>/rancher/rancher:latest`
    >

1. Start a new Rancher Server container using the data from the `rancher-data` container.

    ```
    docker run -d --volumes-from rancher-data --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:latest
    ```

    >**Attention Let’s Encrypt Users:**
    >
    >Remember to append `--acme-domain <YOUR.DNS.NAME>` to the run command, otherwise Rancher will fall back to using self signed certificates.
    >```
    >docker run -d --volumes-from rancher-data --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:latest --acme-domain <YOUR.DNS.NAME>
    >```


    >**Want records of all transactions with the Rancher API?**
    >
    >Enable the [API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/api-auditing) feature by adding the flags below into your upgrade command.
    >```
    -e AUDIT_LEVEL=1 \
    -e AUDIT_LOG_PATH=/var/log/auditlog/rancher-api-audit.log \
    -e AUDIT_LOG_MAXAGE=20 \
    -e AUDIT_LOG_MAXBACKUP=20 \
    -e AUDIT_LOG_MAXSIZE=100 \
    ```

    >**Note:** _Do not_ stop the upgrade after initiating it, even if the upgrade process seems longer than expected. Stopping the upgrade may result in database migration errors during future upgrades.
    ><br/>
    ><br/>
    >**Note:** After upgrading Rancher Server, data from your upgraded server is now saved to the `rancher-data` container for use in future upgrades.

1. Log into Rancher. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

    <!--![Confirm Upgrade]({{< baseurl >}})/img/rancher/)-->

1. Remove the previous Rancher Server container.

    If you only stop the previous Rancher Server container (and don't remove it), the container may restart after the next server reboot.

**Result:** Rancher is upgraded. Log back into Rancher to confirm that the  upgrade succeeded.

>**Having Network Issues Following Upgrade?**
>
> See  [Restoring Cluster Networking]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#restoring-cluster-networking).

## Rolling Back

If your upgrade does not complete successfully, you can roll Rancher Server and its data back to its last healthy state. For more information, see [Single Node Rollback]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/single-node-rollbacks/).
