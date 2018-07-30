---
title: Restoring Backups—Single Node Installs
shortTitle: Singe Node Installs
weight: 365
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
---

Restoring to a backup for your Rancher install if you encounter issues in your Rancher setup.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

    ```
docker stop <RANCHER_CONTAINER_ID>
    ```

2. Go to the location where you saved your [backup tar balls]({{< baseurl >}}/rancher/v2.x/en/backups/backups/single-node-backups/#backup). Run the following command to delete your current state data and start your backup data:

    ```
docker run  --volumes-from <RANCHER_CONTAINER_ID> -v $PWD:/backup \
alpine sh -c "rm /var/lib/rancher/* -rf  && \
tar zxvf /backup/<BACKUP_FILENAME>.tar.gz"
    ```

    >**Warning!** Running this command will delete ALL current state data from your Rancher Server container. Any changes that happened after the backup point you are restoring will be lost.

3. Start you rancher server container back. The container will start with the data from the restored backup.

    ```
docker start <RANCHER_CONTAINER_ID>
    ```
