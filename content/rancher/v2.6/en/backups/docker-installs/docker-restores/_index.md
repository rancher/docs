---
title: Restoring Backups—Docker Installs
shortTitle: Restores
weight: 3
aliases:
  - /rancher/v2.5/en/installation/after-installation/single-node-backup-and-restoration/
  - /rancher/v2.5/en/backups/restorations/single-node-restoration
  - /rancher/v2.5/en/backups/v2.5/docker-installs/docker-restores
---

If you encounter a disaster scenario, you can restore your Rancher Server to your most recent backup.

## Before You Start

During restore of your backup, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets and all capital letters (`<EXAMPLE>`). Here's an example of a command with a placeholder:

```
docker run  --volumes-from <RANCHER_CONTAINER_NAME> -v $PWD:/backup \
busybox sh -c "rm /var/lib/rancher/* -rf  && \
tar pzxvf /backup/rancher-data-backup-<RANCHER_VERSION>-<DATE>"
```

In this command, `<RANCHER_CONTAINER_NAME>` and `<RANCHER_VERSION>-<DATE>` are environment variables for your Rancher deployment.

Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the procedure below.

<sup>Terminal `docker ps` Command, Displaying Where to Find `<RANCHER_CONTAINER_TAG>` and `<RANCHER_CONTAINER_NAME>`</sup>
![Placeholder Reference]({{<baseurl>}}/img/rancher/placeholder-ref.png)

| Placeholder                | Example                    | Description                                               |
| -------------------------- | -------------------------- | --------------------------------------------------------- |
| `<RANCHER_CONTAINER_TAG>`  | `v2.0.5`                   | The rancher/rancher image you pulled for initial install. |
| `<RANCHER_CONTAINER_NAME>` | `festive_mestorf`          | The name of your Rancher container.                       |
| `<RANCHER_VERSION>`        | `v2.0.5`                   | The version number for your Rancher backup.               |
| `<DATE>`                   | `9-27-18`                  | The date that the data container or backup was created.   |
<br/>

You can obtain `<RANCHER_CONTAINER_TAG>` and `<RANCHER_CONTAINER_NAME>` by logging into your Rancher Server by remote connection and entering the command to view the containers that are running: `docker ps`. You can also view containers that are stopped using a different command: `docker ps -a`. Use these commands for help anytime during while creating backups.

## Restoring Backups

Using a [backup]({{<baseurl>}}/rancher/v2.5/en/backups/backups/single-node-backups/) that you created earlier, restore Rancher to its last known healthy state.

1. Using a remote Terminal connection, log into the node running your Rancher Server.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container:

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```
1. Move the backup tarball that you created during completion of [Creating Backups—Docker Installs]({{<baseurl>}}/rancher/v2.5/en/backups/backups/single-node-backups/) onto your Rancher Server. Change to the directory that you moved it to. Enter `dir` to confirm that it's there.

    If you followed the naming convention we suggested in [Creating Backups—Docker Installs]({{<baseurl>}}/rancher/v2.5/en/backups/backups/single-node-backups/), it will have a name similar to  `rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz`.

1. Enter the following command to delete your current state data and replace it with your backup data, replacing the placeholders. Don't forget to close the quotes.

    >**Warning!** This command deletes all current state data from your Rancher Server container. Any changes saved after your backup tarball was created will be lost.

    ```
    docker run  --volumes-from <RANCHER_CONTAINER_NAME> -v $PWD:/backup \
    busybox sh -c "rm /var/lib/rancher/* -rf  && \
    tar pzxvf /backup/rancher-data-backup-<RANCHER_VERSION>-<DATE>.tar.gz"
    ```

    **Step Result:** A series of commands should run.

1. Restart your Rancher Server container, replacing the placeholder. It will restart using your backup data.

    ```
    docker start <RANCHER_CONTAINER_NAME>
    ```

1.  Wait a few moments and then open Rancher in a web browser. Confirm that the restore succeeded and that your data is restored.
