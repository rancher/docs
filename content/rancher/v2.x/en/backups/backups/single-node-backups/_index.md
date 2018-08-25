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
    You can obtain the name for your Rancher container by entering `docker ps`.
    ![Stop Rancher Container]({{< baseurl >}}/img/rancher/docker-container-ps-output.png)

1. <a id="backup"></a>Using the command below, create a data container from the Rancher container you just stopped.

    - Replace `<RANCHER_CONTAINER_NAME>` with the name from the previous step (our example uses `festive_mestorf`).
    - Replace `<RANCHER_VERSION>` with the version of Rancher that you are currently running, as mentioned in the [Prerequisite](#prereq) (`v2.0.5` in our example). 
    - Replace `<RANCHER_CONTAINER_TAG>` with tag of your Rancher image (`v2.0.5` in our example).

     ```
    docker create --volumes-from <RANCHER_CONTAINER_NAME> --name rancher-data-<RANCHER_VERSION> rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

1. From the data container that you just created (`rancher-data-<RANCHER_VERSION>`), create a backup tarball (`rancher-data-backup-<RANCHER_VERSION>.tar.gz`).

    ```
    docker run  --volumes-from rancher-data-<RANCHER_VERSION> -v $PWD:/backup alpine tar zcvf /backup/rancher-data-backup-<RANCHER_VERSION>.tar.gz /var/lib/rancher
    ```

1. Restart Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container.

    ```
    docker start <RANCHER_CONTAINER_NAME>
    ```

**Result:** A backup tarball of your Rancher Server data is created. Make note of the current directory, as this is where the tarball resides. See [Restoring Backups: Single Node Installs]({{< baseurl >}}/rancher/v2.x/en/backups/restorations/single-node-restoration) if you need to restore backup data.
