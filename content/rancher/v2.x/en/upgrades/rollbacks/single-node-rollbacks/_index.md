---
title: Single Node Rollback
weight: 1015
aliases:
  - /rancher/v2.x/en/backups/rollbacks/single-node-rollbacks
  - /rancher/v2.x/en/upgrades/single-node-rollbacks
---

Rolling back an unsuccessful Rancher upgrade requires you to restore the backup you created while completing [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrade-scenarios/single-node-upgrade/).

## Before You Start

During backup creation, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets (`<example>`). Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the [procedure below](#creating-a-backup).

<sup>Terminal `docker ps` Command and Rancher UI</sup>
![Placeholder Reference]({{< baseurl >}}/img/rancher/placeholder-ref.png)

| Legend | Placeholder                | Example                    | Description |
| ------ | -------------------------- | -------------------------- | ----------------- | 
| A      | `<PRIOR_RANCHER_VERSION>`  | `v2.0.5`                   | The rancher/rancher image you pulled for install.|
| B      | `<RANCHER_CONTAINER_NAME>` | `festive_mestorf`          | The name of your Rancher container.|
| C      | `<RANCHER_VERSION>`        | `v2.0.5`                   | The version of Rancher run in your container. |
<br/>

- Obtain `<PRIOR_RANCHER_VERSION>`  and `<RANCHER_CONTAINER_NAME>` by logging into your Rancher Server by remote connection and entering `docker ps`.

- Obtain `<RANCHER_VERSION>` by logging into Rancher and viewing the bottom left of the browser window.

## Rolling Back Rancher

If you have issues upgrading Rancher, roll it back to its laster known healthy state by pulling the last version you used and then restoring the backup you made before upgrade.

>**Warning!** Rolling back to a previous version of Rancher destroys any changes made to Rancher following the upgrade. Unrecoverable data loss may occur.

1. Using a remote Terminal connection, log into your Rancher Server.

1. Pull the version of Rancher that you were running prior to upgrade. Replace the `<PRIOR_RANCHER_VERSION>` with [that version](#before-you-start).

    For example, if you were running Rancher v2.0.5 before upgrade, pull v2.0.5.

    ```
    docker pull rancher/rancher:<PRIOR_RANCHER_VERSION>
    ```
    
1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container.

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```
    You can obtain the name for your Rancher container by entering `docker ps`.

1. Make sure you're in your home directory (`cd ~`). Enter `dir` to make sure the tarball you created during [Step 4](({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-upgrade/#tarball)) while following [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/single-node-upgrade/) is available.

    It will have a name similar to  (`rancher-data-backup-<RANCHER_VERSION>`).

1. Run the following command to create a data container from the backup tarball, replacing the [placeholder](#before-you-start) Don't forget to close the quotes.

    ```
    docker run  --volumes-from rancher-data
    -v $PWD:/backup alpine sh -c "rm /var/lib/rancher/* -rf
    && tar zxvf /backup/rancher-data-backup-<RANCHER_VERSION>"
    ```

1. Start a new Rancher Server container with the `<PRIOR_RANCHER_VERSION>` tag [placeholder](#before-you-start) pointing to the data container.
    ```
    docker run -d --volumes-from rancher-data 
    --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher:<PRIOR_RANCHER_VERSION>
    ```
    >**Note:** _Do not_ stop the rollback after initiating it, even if the rollback process seems longer than expected. Stopping the rollback may result in database issues during future upgrades.

1.  Wait a few moments and then open Rancher in a web browser. Confirm that the rollback succeeded and that your data is restored.

**Result:** Rancher is rolled back to its version and data state prior to upgrade.