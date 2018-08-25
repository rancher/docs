---
title: Single Node Upgrade
weight: 1010
aliases:
  - /rancher/v2.x/en/upgrades/single-node-upgrade/
---
To upgrade Rancher Server 2.x when a new version is released, create a data backup for your current Rancher deployment, pull the latest image of Rancher, and then start a new Rancher container using your data backup.

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
    - Replace `<RANCHER_CONTAINER_TAG>` with tag of your Rancher image (`v2.0.5` in our example).

     ```
    docker create --volumes-from <RANCHER_CONTAINER_NAME> --name rancher-data rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

1. <a id="tarball"></a>From the data container that you just created (`rancher-data`), create an upgrade tarball (`rancher-data-backup-<RANCHER_VERSION>.tar.gz`).

    This tarball will serve as a rollback point if something goes wrong during upgrade.

    ```
    docker run  --volumes-from rancher-data -v $PWD:/backup alpine tar zcvf /backup/rancher-data-backup-<RANCHER_VERSION>.tar.gz /var/lib/rancher
    ```

1. Enter the `dir` command to confirm that the backup tarball was created.

1. Pull the most recent image of Rancher.

    ```
    docker pull rancher/rancher:latest
    ```

    >**Attention Air Gap Users:**
    > If you are visiting this page to complete [Air Gap Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/air-gap-upgrade), prepend your private registry URL to the image when running the `docker run` command.
    >
    > Example: `<registry.yourdomain.com:port>/rancher/rancher:latest`
    >

1. Launch a new Rancher Server container using the `rancher-data` container.

    ```
    docker run -d --volumes-from rancher-data --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:latest
    ```

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

1. Remove the previous Rancher Server container.

    If you only stop the previous Rancher Server container (and don't remove it), the container may restart after the next server reboot.

**Result:** Rancher Server is upgraded to the latest version.

>**Note:** If your upgrade does not complete successfully, you can roll Rancher Server and its data back to its last healthy state. For more information, see [Restoring Backups—Single Node Installs]({{< baseurl >}}/rancher/v2.x/en/backups/restorations/single-node-restoration/).
