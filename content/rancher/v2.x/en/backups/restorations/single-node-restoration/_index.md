---
title: Restoring Backups—Single Node Installs
shortTitle: Singe Node Installs
weight: 365
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
---

If you encounter a disaster scenario, you can restore your Rancher Server to your most recent backup.

## Before You Start

During restoration of your backup, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets and all capital letters (`<EXAMPLE>`). Here's an example of a command with a placeholder:

```
docker run  --volumes-from <RANCHER_CONTAINER_NAME> -v $PWD:/backup 
alpine sh -c "rm /var/lib/rancher/* -rf  && 
tar zxvf /backup/rancher-data-backup-<RANCHER_VERSION>"
```

In this command, `<RANCHER_CONTAINER_NAME>` and `<RANCHER_VERSION>` are environment variables for your Rancher deployment.

Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the [procedure below](#restoring-backups).

<sup>Terminal `docker ps` Command and Rancher UI, Displaying Where to Find Placeholders</sup>
![Placeholder Reference]({{< baseurl >}}/img/rancher/placeholder-ref.png)

| Legend | Placeholder                | Example                    | Description |
| ------ | -------------------------- | -------------------------- | ----------------- | 
| A      | `<RANCHER_CONTAINER_TAG>`  | `v2.0.5`                   | The rancher/rancher image you pulled for install.|
| B      | `<RANCHER_CONTAINER_NAME>` | `festive_mestorf`          | The name of your Rancher container.|
| C      | `<RANCHER_VERSION>`        | `v2.0.5`                   | The version of Rancher run in your container. |
<br/>

- Obtain `<RANCHER_CONTAINER_TAG>` and `<RANCHER_CONTAINER_NAME>` by logging into your Rancher Server by remote connection and entering `docker ps`.

- Obtain `<RANCHER_VERSION>` by logging into Rancher and viewing the bottom left of the browser window.

## Restoring Backups

Using a backup that you created earlier, restore Rancher to its last known healthy state.

1. Using a remote Terminal connection, log into your Rancher Server.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the [name of your Rancher container](#before-you-start).

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```
1. Make sure you're in your home directory (`cd ~`). Enter `dir` to make sure the tarball you created during [Step 4]({{< baseurl >}}/rancher/v2.x/en/backups/backups/single-node-backups/#tarball) while following [Creating Backups—Single Node Installs]({{< baseurl >}}/rancher/v2.x/en/backups/backups/single-node-backups/) is available.

    It will have a name similar to  `rancher-data-backup-<RANCHER_VERSION>`.

    ![Backup Backup Tarball]({{< baseurl >}}/img/rancher/dir-backup-tarball-clear.png)


1. Enter the following command to delete your current state data and start your backup data, replacing the [placeholders](#before-you-start). Don't forget to close the quotes.

    >**Warning!** This command deletes all current state data from your Rancher Server container. Any changes saved after your backup tarball was created will be lost.

    ```
    docker run  --volumes-from <RANCHER_CONTAINER_NAME> -v $PWD:/backup 
    alpine sh -c "rm /var/lib/rancher/* -rf  && 
    tar zxvf /backup/rancher-data-backup-<RANCHER_VERSION>.tar.gz"
    ```

    **Step Result:** A series of commands should run.

1. Restart your Rancher Server container, replacing the [placeholder](#before-you-start). It will restart using your backup data.

    ```
    docker start <RANCHER_CONTAINER_NAME>
    ```

1.  Wait a few moments and then open Rancher in a web browser. Confirm that the rollback succeeded and that your data is restored.