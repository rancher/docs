---
title: Backing up Rancher Installed with Docker
shortTitle: Backups
weight: 3
---

After completing your Docker installation of Rancher, we recommend creating backups of it on a regular basis. Having a recent backup will let you recover quickly from an unexpected disaster.

## Before You Start

During the creation of your backup, you'll enter a series of commands, replacing placeholders with data from your environment. These placeholders are denoted with angled brackets and all capital letters (`&lt;EXAMPLE&gt;`). Here's an example of a command with a placeholder:

```
docker run  --volumes-from rancher-data-&lt;DATE&gt; -v $PWD:/backup busybox tar pzcvf /backup/rancher-data-backup-&lt;RANCHER_VERSION&gt;-&lt;DATE&gt;.tar.gz /var/lib/rancher
```

In this command, `&lt;DATE&gt;` is a placeholder for the date that the data container and backup were created. `9-27-18` for example.

Cross reference the image and reference table below to learn how to obtain this placeholder data. Write down or copy this information before starting the [procedure below](#creating-a-backup).

<sup>Terminal `docker ps` Command, Displaying Where to Find `&lt;RANCHER_CONTAINER_TAG&gt;` and `&lt;RANCHER_CONTAINER_NAME&gt;`</sup>
![Placeholder Reference]({{<baseurl>}}/img/rancher/placeholder-ref.png)

| Placeholder                | Example                    | Description                                               |
| -------------------------- | -------------------------- | --------------------------------------------------------- |
| `&lt;RANCHER_CONTAINER_TAG&gt;`  | `v2.0.5`                   | The rancher/rancher image you pulled for initial install. |
| `&lt;RANCHER_CONTAINER_NAME&gt;` | `festive_mestorf`          | The name of your Rancher container.                       |
| `&lt;RANCHER_VERSION&gt;`        | `v2.0.5`                   | The version of Rancher that you're creating a backup for. |
| `&lt;DATE&gt;`                   | `9-27-18`                  | The date that the data container or backup was created.   |
<br/>

You can obtain `&lt;RANCHER_CONTAINER_TAG&gt;` and `&lt;RANCHER_CONTAINER_NAME&gt;` by logging into your Rancher Server by remote connection and entering the command to view the containers that are running: `docker ps`. You can also view containers that are stopped with `docker ps -a`. Use these commands for help anytime while creating backups.

## Creating a Backup

This procedure creates a backup that you can restore if Rancher encounters a disaster scenario.


1. Using a remote Terminal connection, log into the node running your Rancher Server.

1. Stop the container currently running Rancher Server. Replace `&lt;RANCHER_CONTAINER_NAME&gt;` with the name of your Rancher container.

    ```
    docker stop &lt;RANCHER_CONTAINER_NAME&gt;
    ```
1. <a id="backup"></a>Use the command below, replacing each placeholder, to create a data container from the Rancher container that you just stopped.

    ```
    docker create --volumes-from &lt;RANCHER_CONTAINER_NAME&gt; --name rancher-data-&lt;DATE&gt; rancher/rancher:&lt;RANCHER_CONTAINER_TAG&gt;
    ```

1. <a id="tarball"></a>From the data container that you just created (`rancher-data-&lt;DATE&gt;`), create a backup tarball (`rancher-data-backup-&lt;RANCHER_VERSION&gt;-&lt;DATE&gt;.tar.gz`). Use the following command, replacing each placeholder:

    ```
    docker run  --volumes-from rancher-data-&lt;DATE&gt; -v $PWD:/backup:z busybox tar pzcvf /backup/rancher-data-backup-&lt;RANCHER_VERSION&gt;-&lt;DATE&gt;.tar.gz /var/lib/rancher
    ```

    **Step Result:** A stream of commands runs on the screen.

1. Enter the `ls` command to confirm that the backup tarball was created. It will have a name similar to `rancher-data-backup-&lt;RANCHER_VERSION&gt;-&lt;DATE&gt;.tar.gz`.

1. Move your backup tarball to a safe location external to your Rancher Server. Then delete the `rancher-data-&lt;DATE&gt;` container from your Rancher Server.

1. Restart Rancher Server. Replace `&lt;RANCHER_CONTAINER_NAME&gt;` with the name of your Rancher container:

    ```
    docker start &lt;RANCHER_CONTAINER_NAME&gt;
    ```

**Result:** A backup tarball of your Rancher Server data is created. See [Restoring Backups: Docker Installs]({{<baseurl>}}/rancher/v2.6/en/backups/docker-installs/docker-restores) if you need to restore backup data.
