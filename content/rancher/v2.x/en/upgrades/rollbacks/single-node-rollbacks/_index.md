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

1. Pull the version of Rancher that you were running prior to upgrade (which was the version that you wrote down for the [prereq]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-upgrade/#prereq).

    ```
    docker pull rancher/rancher:<PRIOR_RANCHER_VERSION>
    ```
    For example, if you were running Rancher v2.0.5 before upgrade, pull v2.0.5.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container.

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```
    You can obtain the name for your Rancher container by entering `docker ps`.

1. Make sure you're in your home directory (`cd ~`). Enter `dir` to make sure the tarball you created during [Step 4](({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-upgrade/#tarball)) while following [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-upgrade/) is available.

    It will have a name similar to  (`rancher-data-backup-<RANCHER_VERSION>`).

1. Run the following command to create a data container from the backup tarball. Don't forget to close the quotes.

     ```
    docker run  --volumes-from rancher-data
    -v $PWD:/backup alpine sh -c "rm /var/lib/rancher/* -rf
    && tar zxvf /backup/rancher-data-backup-<RANCHER_VERSION>"
     ```

1. Start a new Rancher Server container with the `<PRIOR_RANCHER_VERSION>` tag pointing to the data container.
    ```
    docker run -d --volumes-from rancher-data 
    --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:<PRIOR_RANCHER_VERSION>
    ```
    >**Note:** _Do not_ stop the rollback after initiating it, even if the rollback process seems longer than expected. Stopping the rollback may result in database issues during future upgrades.

1.  Wait a few moments and then open Rancher in a web browser. Confirm that the rollback succeeded and that your data is restored.

**Result:** Rancher is rolled back to its version and data state prior to upgrade.