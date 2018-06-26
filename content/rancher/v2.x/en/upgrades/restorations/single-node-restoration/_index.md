---
title: Restoring Backups—Single Node Installs
shortTitle: Singe Node Installs
weight: 365
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
---

Backup to a restoration point for your Rancher install if you encounter issues when upgrading.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

    ```
docker stop <RANCHER_CONTAINER_ID>
    ```

1. Launch a new Rancher Server container using the most recent `rancher-backup-<RANCHER_VERSION>` container that you backed up.
 
    For more information on obtaining this container name, see [Creating Backups—Single Node Installs](/Users/markbishop/Documents/GitHub/docs/content/rancher/v2.x/en/upgrades/backups/single-node-backups/#backup).

	```
docker run -d --volumes-from rancher-backup-<RANCHER_VERSION> --restart=unless-stopped \
-p 80:80 -p 443:443 rancher/rancher:<CURRENT_RANCHER_VERSION>
    ```
