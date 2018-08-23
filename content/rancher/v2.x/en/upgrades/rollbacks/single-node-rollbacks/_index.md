---
title: Single Node Rollback
weight: 1015
aliases:
  - /rancher/v2.x/en/backups/rollbacks/single-node-rollbacks
  - /rancher/v2.x/en/upgrades/single-node-rollbacks
---

Rolling back an unsuccessful Rancher upgrade requires you to
restore the backup you created while completing [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrade-scenarios/single-node-upgrade/).

>**Warning!** Rolling back to a previous version of Rancher destroys any changes made to Rancher following the upgrade. Unrecoverable data loss may occur.

1. Pull the version of Rancher that you were running prior to upgrade.

    ```
docker pull rancher/rancher:<PRIOR_VERSION>
    ```

2. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

    ```
docker stop <RANCHER_CONTAINER_ID>
    ```

3. Go to the location where you saved your [backup tar balls]({{< baseurl>}}/rancher/v2.x/en/upgrades/single-node-upgrade/#backup). Run the following command to create a data container from the backup tar ball.

     ```
docker run  --volumes-from rancher-data \
   -v $PWD:/backup alpine sh -c "rm /var/lib/rancher/* -rf  \
   && tar zxvf /backup/<BACKUP_FILENAME>.tar.gz"
     ```

4. Start a new Rancher Server container that uses the `<RANCHER_VERSION>` data container that you created in [Step 3]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-upgrade/#backup) of [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-upgrade).
    ```
docker run -d --volumes-from rancher-data \
  --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:<RANCHER_VERSION>
    ```
    >**Note:** _Do not_ stop the rollback after initiating it, even if the rollback process seems longer than expected. Stopping the rollback may result in database issues during future upgrades.
