---
title: Creating Backups—Single Node Installs
weight: 25
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
  - /rancher/v2.x/en/installation/backups-and-restoration/single-node-backup-and-restoration/
---

After completing your single node installation of Rancher, we recommend creating backups of it on a regular basis. Use these backups as a restoration point in a disaster scenario.

## Before You Start

During backup creation, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets (`<example>`). Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the [procedure below](#creating-a-backup).

<sup>Terminal `docker ps` Command and Rancher UI</sup>
![Placeholder Reference]({{< baseurl >}}/img/rancher/placeholder-ref.png)

| Legend | Placeholder                | Example                    | Description |
| ------ | -------------------------- | -------------------------- | ----------------- | 
| A      | `<RANCHER_CONTAINER_TAG>`  | `v2.0.5`                   | The rancher/rancher image you pulled for install.|
| B      | `<RANCHER_CONTAINER_NAME>` | `festive_mestorf`          | The name of your Rancher container.|
| C      | `<RANCHER_VERSION>`        | `v2.0.5`                   | The version of Rancher run in your container. |
<br/>

- Obtain `<RANCHER_CONTAINER_TAG>` and `<RANCHER_CONTAINER_NAME>` by logging into your Rancher Server by remote connection and entering `docker ps`.

- Obtain `<RANCHER_VERSION>` by logging into Rancher and viewing the bottom left of the browser window.


## Creating a Backup

This procedure creates a backup that you can restore to in case Rancher encounters a disaster scenario.


1. Using a remote Terminal connection, log into your Rancher Server.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the [name of your Rancher container](#before-you-start).

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```
1. <a id="backup"></a>Use the command below, replacing each [placeholder](#before-you-start), to create a data container from the Rancher container that you just stopped.

    ```
    docker create --volumes-from <RANCHER_CONTAINER_NAME> --name rancher-data-<RANCHER_VERSION> rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

1. <a id="tarball"></a>From the data container that you just created (`rancher-data-<RANCHER_VERSION>`), create a backup tarball (`rancher-data-backup-<RANCHER_VERSION>.tar.gz`). Use the following command, replacing each [placeholder](#before-you-start).

    ```
    docker run  --volumes-from rancher-data-<RANCHER_VERSION> -v $PWD:/backup alpine tar zcvf /backup/rancher-data-backup-<RANCHER_VERSION>.tar.gz /var/lib/rancher
    ```

    **Step Result:** A stream of commands runs on screen.

1. Enter the `dir` command to confirm that the backup tarball was created. It will have a name similar to `rancher-data-backup-<RANCHER_VERSION>`.

    ![Backup Backup Tarball]({{< baseurl >}}/img/rancher/dir-backup-tarball.png)

1. Restart Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your [Rancher container](#before-you-start).

    ```
    docker start <RANCHER_CONTAINER_NAME>
    ```

**Result:** A backup tarball of your Rancher Server data is created. Make note of the current directory, as this is where the tarball resides. See [Restoring Backups: Single Node Installs]({{< baseurl >}}/rancher/v2.x/en/backups/restorations/single-node-restoration) if you need to restore backup data.
