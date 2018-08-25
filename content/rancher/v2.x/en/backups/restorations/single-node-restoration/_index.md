---
title: Restoring Backups—Single Node Installs
shortTitle: Singe Node Installs
weight: 365
aliases:
  - /rancher/v2.x/en/installation/after-installation/single-node-backup-and-restoration/
---

If you encounter a disaster scenario, you can restore your Rancher Server to your most recent backup.

1. Using a remote Terminal connection, log into your Rancher Server.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_NAME>` with the name of your Rancher container.

    ```
    docker stop <RANCHER_CONTAINER_NAME>
    ```
    You can obtain the name for your Rancher container by entering `docker ps`.
    ![Stop Rancher Container]({{< baseurl >}}/img/rancher/docker-container-ps-output.png)

1. Make sure you're in your home directory (`cd ~`). Enter `dir` to make sure the tarball you created during [Step 4](({{< baseurl >}}/rancher/v2.x/en/backups/backups/single-node-backups/#tarball)) while following [Creating Backups—Single Node Installs]({{< baseurl >}}/rancher/v2.x/en/backups/backups/single-node-backups/) is available.

    It will have a name similar to  (`rancher-data-backup-<RANCHER_VERSION>`).

1. Enter the following command to delete your current state data and start your backup data. Don't forget to close the quotes.

    ```
    docker run  --volumes-from <RANCHER_CONTAINER_NAME> -v $PWD:/backup 
    alpine sh -c "rm /var/lib/rancher/* -rf  && 
    tar zxvf /backup/rancher-data-backup-<RANCHER_VERSION>"
    ```

    >**Warning!** This command deletes all current state data from your Rancher Server container. Any changes saved after your backup tarball was created will be lost.

1. Restart your Rancher Server container. It will restart using your backup data.

    ```
    docker start <RANCHER_CONTAINER_NAME>
    ```

1.  Wait a few moments and then open Rancher in a web browser. Confirm that the rollback succeeded and that your data is restored.