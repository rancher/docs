---
title: Rolling Back—Single Node Installs
weight: 25
---

Rolling back an unsuccessful Rancher upgrade requires you to run the upgrade command again, with a couple of modifications:

- Run the upgrade command using the server tag for your prior Rancher install.
- Run the upgrade command while pointing toward the backup container you created while completing [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrade-scenarios/single-node-upgrade/).

>**Warning!** Rolling back to a previous version of Rancher destroys any changes made to Rancher following the upgrade. Unrecoverable data loss may occur.

1. Pull the version of Rancher that you were running prior to upgrade.

    ```
docker pull rancher/rancher:<PRIOR_VERSION>
    ```

1. Launch a Rancher Server container that you created while completing [Step 3 of Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrade-scenarios/single-node-upgrade/#backup).

    Replace the `<PRIOR_VERSION>` placeholders with the version number of Rancher that you're rolling back to before upgrade.

    ```
docker run -d --volumes-from rancher-data-snapshot-<PRIOR_VERSION> --restart=unless-stopped \
-p 80:80 -p 443:443 rancher/rancher:<PRIOR_VERSION>
    ```
    >**Note:** _Do not_ stop the rollback after initiating it, even if the rollback process seems longer than expected. Stopping the rollback may result in database issues during future upgrades.