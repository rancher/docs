---
title: Rolling Back Rancher Installed with Docker
weight: 1015
aliases:
  - /rancher/v2.0-v2.4/en/upgrades/single-node-rollbacks
  - /rancher/v2.0-v2.4/en/upgrades/rollbacks/single-node-rollbacks
---

If a Rancher upgrade does not complete successfully, you'll have to roll back to your Rancher setup that you were using before [Docker Upgrade]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/single-node-upgrade). Rolling back restores:

- Your previous version of Rancher.
- Your data backup created before upgrade.

## Before You Start

During rollback to a prior version of Rancher, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets and all capital letters (`<EXAMPLE>`). Here's an example of a command with a placeholder:

```
docker pull rancher/rancher:<PRIOR_RANCHER_VERSION>
```

In this command, `<PRIOR_RANCHER_VERSION>` is the version of Rancher you were running before your unsuccessful upgrade. `v2.0.5` for example.

Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the procedure below.

<sup>Terminal `docker ps` Command, Displaying Where to Find `<PRIOR_RANCHER_VERSION>` and `<RANCHER_CONTAINER_NAME>`</sup>
![Placeholder Reference]({{<baseurl>}}/img/rancher/placeholder-ref-2.png)

| Placeholder                | Example                    | Description                                             |
| -------------------------- | -------------------------- | ------------------------------------------------------- |
| `<PRIOR_RANCHER_VERSION>`  | `v2.0.5`                   | The rancher/rancher image you used before upgrade.      |
| `<RANCHER_CONTAINER_NAME>` | `festive_mestorf`          | The name of your Rancher container.                     |
| `<RANCHER_VERSION>`        | `v2.0.5`                   | The version of Rancher that the backup is for.          |
| `<DATE>`                   | `9-27-18`                  | The date that the data container or backup was created. |
<br/>

You can obtain `<PRIOR_RANCHER_VERSION>` and `<RANCHER_CONTAINER_NAME>` by logging into your Rancher Server by remote connection and entering the command to view the containers that are running: `docker ps`. You can also view containers that are stopped using a different command: `docker ps -a`. Use these commands for help anytime during while creating backups.

## Rolling Back Rancher

If you have issues upgrading Rancher, roll it back to its latest known healthy state by pulling the last version you used and then restoring the backup you made before upgrade.

>**Warning!** Rolling back to a previous version of Rancher destroys any changes made to Rancher following the upgrade. Unrecoverable data loss may occur.

1. Using a remote Terminal connection, log into the node running your Rancher Server.

1. Pull the version of Rancher that you were running before upgrade. Replace the `<PRIOR_RANCHER_VERSION>` with that version.

    For example, if you were running Rancher v2.0.5 before upgrade, pull v2.0.5.

    ```
    docker pull rancher/rancher:<PRIOR_RANCHER_VERSION>
    ```

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container.

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```
    You can obtain the name for your Rancher container by entering `docker ps`.

1. Move the backup tarball that you created during completion of [Docker Upgrade]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/single-node-upgrade/) onto your Rancher Server. Change to the directory that you moved it to. Enter `dir` to confirm that it's there.

    If you followed the naming convention we suggested in [Docker Upgrade]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/single-node-upgrade/), it will have a name similar to  (`rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz`).

1. Run the following command to replace the data in the `rancher-data` container with the data in the backup tarball, replacing the placeholder. Don't forget to close the quotes.

    ```
    docker run  --volumes-from rancher-data \
    -v $PWD:/backup busybox sh -c "rm /var/lib/rancher/* -rf \
    && tar zxvf /backup/rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz"
    ```

1. Start a new Rancher Server container with the `<PRIOR_RANCHER_VERSION>` tag placeholder pointing to the data container.
    ```
    docker run -d --volumes-from rancher-data \
    --restart=unless-stopped \
    -p 80:80 -p 443:443 \
    rancher/rancher:<PRIOR_RANCHER_VERSION>
    ```
    
    >**Note:** _Do not_ stop the rollback after initiating it, even if the rollback process seems longer than expected. Stopping the rollback may result in database issues during future upgrades.

1.  Wait a few moments and then open Rancher in a web browser. Confirm that the rollback succeeded and that your data is restored.

**Result:** Rancher is rolled back to its version and data state before upgrade.
