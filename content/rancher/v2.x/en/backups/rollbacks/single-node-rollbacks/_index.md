---
title: Roll Backs—Single Node Installs
weight: 25
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
  - /rancher/v2.x/en/backups/restorations/single-node-restoration/
---

There are two scenarios where rolling back to a recent backup may be required.

<!-- TOC -->

- [Recovering from an Unsuccessful Upgrade](#recovering-from-an-unsuccessful-upgrade): In this scenario, you restore the Rancher application and data to backups taken before upgrade.
- [Recovering from a Disaster Scenario](#recovering-from-a-disaster-scenario): In this scenario, you'll only need to restore your data.

<!-- /TOC -->

## Recovering from an Unsuccessful Upgrade

If you experience an unsuccessful upgrade, you can restore to backups you created during the [upgrade process]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrade-scenarios/single-node-upgrade/).

>**Warning!** Rolling back to a previous version destroys any changes made to Rancher following the upgrade. Unrecoverable data loss may occur.

1. Pull the version of Rancher that you were running prior to upgrade.

    ```
docker pull rancher/rancher:<PRIOR_VERSION>
    ```

2. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

    ```
docker stop <RANCHER_CONTAINER_ID>
    ```

3. Go to the location where you saved your [backup tarballs]({{< baseurl>}}/rancher/v2.x/en/upgrades/single-node-upgrade/#backup). Run the following command to create a data container from the backup tarball.

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

If you experience a disaster scenario, you can restore to your most recent backup with minimal data loss.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

    ```
docker stop <RANCHER_CONTAINER_ID>
    ```

2. Go to the location where you saved your [backup tarballs]({{< baseurl >}}/rancher/v2.x/en/backups/backups/single-node-backups/#backup). Run the following command to delete your current state data and start your backup data:

    ```
docker run  --volumes-from <RANCHER_CONTAINER_ID> -v $PWD:/backup \
alpine sh -c "rm /var/lib/rancher/* -rf  && \
tar zxvf /backup/<BACKUP_FILENAME>.tar.gz"
    ```

    >**Warning!** Running this command will delete ALL current state data from your Rancher Server container. Any changes that happened after the backup point you are restoring will be lost.

3. Start your Rancher Server container. The container will start with the data from the restored backup.

    ```
docker start <RANCHER_CONTAINER_ID>
    ```

