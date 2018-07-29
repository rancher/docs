---
title: Roll Backs—Single Node Installs
weight: 25
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
  - /rancher/v2.x/en/backups/restorations/single-node-restoration/
---

There are two scenarios where you'll need to rollback to prior image of Rancher. The instructions change slightly for each scenario.

<!-- TOC -->

- [Recovering from an Unsuccessful Upgrade](#recovering-from-an-unsuccessful-upgrade): In this scenario, you need to restore both the prior version of Rancher and your state data.
- [Recovering from a Disaster Scenario](#recovering-from-a-disaster-scenario): In this scenario, you'll only need to restore you state data.

<!-- /TOC -->

## Recovering from an Unsuccessful Upgrade

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
docker run  --volumes-from rancher-data-<PRIOR_VERSION> \
   -v $PWD:/backup alpine sh -c "rm /var/lib/rancher/* -rf  \
   && tar zxvf /backup/<BACKUP_FILENAME>.tar.gz"
     ```

4. Start a new Rancher Server container with the `<PRIOR_VERSION>` tag pointing to the data container.
    ```
docker run -d --volumes-from rancher-data-<PRIOR_VERSION> \
  --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:<PRIOR_VERSION>
    ```
    >**Note:** _Do not_ stop the rollback after initiating it, even if the rollback process seems longer than expected. Stopping the rollback may result in database issues during future upgrades.

## Recovering from a Disaster Scenario

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

