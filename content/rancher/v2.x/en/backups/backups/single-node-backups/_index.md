---
title: Creating Backups—Single Node Installs
weight: 25
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
  - /rancher/v2.x/en/installation/backups-and-restoration/single-node-backup-and-restoration/
---

After completing your single node installation of Rancher, you can create a backup of your current installation at any time. We recommend making a backup before [upgrading]({{< baseurl >}}/rancher/v2.x/en/upgrades/single-node-upgrade/). Use this backup as a restoration point in disaster scenarios or when you need to [rollback]({{< baseurl >}}/rancher/v2.x/en/backups/rollbacks/single-node-rollbacks/) to an older version.

>**Prerequisite:** Open Rancher and write down the version number displayed in the lower-left of the browser (example: `v2.0.0`). You'll need this number during the backup process.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

    ```
docker stop <RANCHER_CONTAINER_ID>
    ```

    >**Tip:** You can obtain the ID for your Rancher container by entering the following command: `docker ps`.

2. <a id="backup"></a>Create a data container. This container contains the data from your current Rancher Server, and can be used to start Rancher Server.

    - Replace `<RANCHER_CONTAINER_ID>` with the same ID from the previous step.
    - Replace `<RANCHER_VERSION>` and `<RANCHER_CONTAINER_TAG>` with the version of Rancher that you are currently running, as mentioned in the  **Prerequisite** above.

    ```
docker create --volumes-from <RANCHER_CONTAINER_ID> \
--name rancher-data-<RANCHER_VERSION> rancher/rancher:<RANCHER_CONTAINER_TAG>
    ```

3. During upgrade, you point to a Rancher server to the same Rancher data container and the Rancher data in the data container will continue to be updated/changed. Therefore, you need to get a snapshot of the data to be used for disaster recovery or in case you need to rollback the upgrade.

    ```
docker run  --volumes-from rancher-data-<RANCHER_VERSION> \
-v $PWD:/backup alpine tar zcvf \
/backup/rancher-data-backup-<RANCHER_VERSION>.tar.gz /var/lib/rancher
    ```

3. After you've created your backup, you can either restart Rancher server or [upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/single-node-upgrade/). Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

    ```
# Restart Rancher server
docker start <RANCHER_CONTAINER_ID>
    ```

**Result:** A backup of your Rancher Server is created. If you ever need to restore your backup, see [Restoring Backups: Single Node Installs]({{< baseurl >}}/rancher/v2.x/en/backups/restorations/single-node-restoration).
