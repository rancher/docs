---
title: Creating Backups—Single Node Installs
weight: 25
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
  - /rancher/v2.x/en/installation/backups-and-restoration/single-node-backup-and-restoration/
---

After completing your single node installation of Rancher, we recommend creating backups of it on a regular basis. Use these backups as a restoration point in a disaster scenario.

<a id="prereq"></a>

>**Prerequisite:** Open Rancher and write down the version number displayed in the lower-left of the browser (example: `v2.0.5`). You'll need this number during the backup process.
>
>![Version Number]({{< baseurl >}}/img/rancher/rancher-version.png)

1. Using a remote Terminal connection, log into your Rancher Server.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container.

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```
    <a id="placeholders"></a>You can obtain the name for your Rancher container by entering `docker ps`.
    ![Stop Rancher Container]({{< baseurl >}}/img/rancher/docker-container-ps-output.png)

1. <a id="backup"></a>Using the command below, create a data container from the Rancher container you just stopped.

    ```
    docker create --volumes-from <RANCHER_CONTAINER_NAME> --name rancher-data-<RANCHER_VERSION> rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

    Replace each of the command placeholders using help from the table below.

    <a id="ref-table"></a>

    Placeholder | Example | Description
    ---------|----------|---------
    `<RANCHER_CONTAINER_NAME>` | `festive_mestorf` | The name of your [Rancher container](#placeholders).
    `<RANCHER_VERSION>` | `v2.0.5` | The [version](#prereq) of Rancher run in your container.
    `<RANCHER_CONTAINER_TAG>` | `v2.0.5` | The [rancher/rancher image](#placeholders) you pulled for install.
    <br/>
    ![Backup Data Container]({{< baseurl >}}/img/rancher/backup-container.png)

1. <a id="tarball"></a>From the data container that you just created (`rancher-data-<RANCHER_VERSION>`), create a backup tarball (`rancher-data-backup-<RANCHER_VERSION>.tar.gz`). Use the following command, replacing each [placeholder](#ref-table).

    ```
    docker run  --volumes-from rancher-data-<RANCHER_VERSION> -v $PWD:/backup alpine tar zcvf /backup/rancher-data-backup-<RANCHER_VERSION>.tar.gz /var/lib/rancher
    ```

    **Step Result:** A stream of commands runs on screen.

1. Enter the `dir` command to confirm that the backup tarball was created. It will have a name similar to `rancher-data-backup-<RANCHER_VERSION>`.

    ![Backup Backup Tarball]({{< baseurl >}}/img/rancher/dir-backup-tarball.png)

1. Restart Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your [Rancher container](#placeholders).

    ```
    docker start <RANCHER_CONTAINER_NAME>
    ```

**Result:** A backup tarball of your Rancher Server data is created. Make note of the current directory, as this is where the tarball resides. See [Restoring Backups: Single Node Installs]({{< baseurl >}}/rancher/v2.x/en/backups/restorations/single-node-restoration) if you need to restore backup data.
