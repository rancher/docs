---
title: Single Node Upgrade
weight: 1010
---
To upgrade Rancher Server 2.x after a new version is released, create a backup of your server and then run the upgrade command.
<a id="prereq"></a>

>**Prerequisites:** Open Rancher and write down the version number displayed in the lower-left of the browser (example: `v2.0.0`). You'll need this number during the upgrade process.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

    ```
docker stop <RANCHER_CONTAINER_ID>
    ```

    >**Tip:** You can obtain the ID for your Rancher container by entering the following command: `docker ps`.

1. Create a container of your current Rancher data for use in your upgraded Rancher Server. Name the container `rancher-data`.

    - Replace `<RANCHER_CONTAINER_ID>` with the same ID from the previous step.
    - Replace `<RANCHER_CONTAINER_TAG>` with the version of Rancher that you are currently running, as mentioned in the  **Prerequisite** above.

    ```
docker create --volumes-from <RANCHER_CONTAINER_ID> \
--name rancher-data rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

1. <a id="backup"></a>Create a backup tar ball of your current Rancher data. If you need to rollback, use this backup tar ball.

    - Replace `<RANCHER_VERSION>` with the tag for the version of Rancher currently installed.

    ```
docker run  --volumes-from rancher-data -v $PWD:/backup \
alpine tar zcvf /backup/rancher-data-backup-<RANCHER_VERSION>.tar.gz \
/var/lib/rancher
    ```

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
docker run -d --volumes-from rancher-data --restart=unless-stopped \
-p 80:80 -p 443:443 rancher/rancher:latest
    ```
    >**Note:** _Do not_ stop the upgrade after initiating it, even if the upgrade process seems longer than expected. Stopping the upgrade may result in database migration errors during future upgrades.
    ><br/>
    ><br/>
    >**Note:** After upgrading Rancher Server, data from your upgraded server is now saved to the `rancher-data` container for use in future upgrades.

1. Remove the previous Rancher Server container.

    If you only stop the previous Rancher Server container (and don't remove it), the container may restart after the next server reboot.

1. Log into Rancher. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

**Result:** Rancher Server is upgraded to the latest version.

>**Note:** If your upgrade does not complete successfully, you can roll Rancher Server and its data back to its last healthy state. For more information, see [Restoring Backups—Single Node Installs]({{< baseurl >}}/rancher/v2.x/en/backups/restorations/single-node-restoration/).
