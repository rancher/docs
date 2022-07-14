---
title: Restoring Backups—Docker Installs
shortTitle: Restores
weight: 3
---

If you encounter a disaster scenario, you can restore your Rancher Server to your most recent backup.

## Before You Start

During restore of your backup, you'll enter a series of commands, filling placeholders with data from your environment. These placeholders are denoted with angled brackets and all capital letters (`&lt;EXAMPLE&gt;`). Here's an example of a command with a placeholder:

```
docker run  --volumes-from &lt;RANCHER_CONTAINER_NAME&gt; -v $PWD:/backup \
busybox sh -c "rm /var/lib/rancher/* -rf  && \
tar pzxvf /backup/rancher-data-backup-&lt;RANCHER_VERSION&gt;-&lt;DATE&gt;"
```

In this command, `&lt;RANCHER_CONTAINER_NAME&gt;` and `&lt;RANCHER_VERSION&gt;-&lt;DATE&gt;` are environment variables for your Rancher deployment.

Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the procedure below.

<sup>Terminal `docker ps` Command, Displaying Where to Find `&lt;RANCHER_CONTAINER_TAG&gt;` and `&lt;RANCHER_CONTAINER_NAME&gt;`</sup>
![Placeholder Reference]({{<baseurl>}}/img/rancher/placeholder-ref.png)

| Placeholder                | Example                    | Description                                               |
| -------------------------- | -------------------------- | --------------------------------------------------------- |
| `&lt;RANCHER_CONTAINER_TAG&gt;`  | `v2.0.5`                   | The rancher/rancher image you pulled for initial install. |
| `&lt;RANCHER_CONTAINER_NAME&gt;` | `festive_mestorf`          | The name of your Rancher container.                       |
| `&lt;RANCHER_VERSION&gt;`        | `v2.0.5`                   | The version number for your Rancher backup.               |
| `&lt;DATE&gt;`                   | `9-27-18`                  | The date that the data container or backup was created.   |
<br/>

You can obtain `&lt;RANCHER_CONTAINER_TAG&gt;` and `&lt;RANCHER_CONTAINER_NAME&gt;` by logging into your Rancher Server by remote connection and entering the command to view the containers that are running: `docker ps`. You can also view containers that are stopped using a different command: `docker ps -a`. Use these commands for help anytime during while creating backups.

## Restoring Backups

Using a [backup]({{<baseurl>}}/rancher/v2.6/en/backups/docker-installs/docker-backups) that you created earlier, restore Rancher to its last known healthy state.

1. Using a remote Terminal connection, log into the node running your Rancher Server.

1. Stop the container currently running Rancher Server. Replace `&lt;RANCHER_CONTAINER_NAME&gt;` with the name of your Rancher container:

    ```
    docker stop &lt;RANCHER_CONTAINER_NAME&gt;
    ```
1. Move the backup tarball that you created during completion of [Creating Backups—Docker Installs]({{<baseurl>}}/rancher/v2.6/en/backups/docker-installs/docker-backups) onto your Rancher Server. Change to the directory that you moved it to. Enter `dir` to confirm that it's there.

    If you followed the naming convention we suggested in [Creating Backups—Docker Installs]({{<baseurl>}}/rancher/v2.6/en/backups/docker-installs/docker-backups/), it will have a name similar to  `rancher-data-backup-&lt;RANCHER_VERSION&gt;-&lt;DATE&gt;.tar.gz`.

1. Enter the following command to delete your current state data and replace it with your backup data, replacing the placeholders. Don't forget to close the quotes.

    :::danger

    This command deletes all current state data from your Rancher Server container. Any changes saved after your backup tarball was created will be lost.

    :::

    ```
    docker run  --volumes-from &lt;RANCHER_CONTAINER_NAME&gt; -v $PWD:/backup \
    busybox sh -c "rm /var/lib/rancher/* -rf  && \
    tar pzxvf /backup/rancher-data-backup-&lt;RANCHER_VERSION&gt;-&lt;DATE&gt;.tar.gz"
    ```

    **Step Result:** A series of commands should run.

1. Restart your Rancher Server container, replacing the placeholder. It will restart using your backup data.

    ```
    docker start &lt;RANCHER_CONTAINER_NAME&gt;
    ```

1.  Wait a few moments and then open Rancher in a web browser. Confirm that the restore succeeded and that your data is restored.
