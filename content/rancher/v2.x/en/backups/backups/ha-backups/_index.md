---
title: Creating Backups—High Availability Installs
weight: 50
aliases:
  - /rancher/v2.x/en/installation/after-installation/ha-backup-and-restoration/
  - /rancher/v2.x/en/installation/backups-and-restoration/ha-backup-and-restoration/
---
This section describes how to create backups of your high-availability Rancher install.

>**Prerequisites:** {{< requirements_rollback >}}

## Backup Outline

Backing up your high-availability Rancher cluster is process that involves completing multiple tasks.

1.  [Take Snapshots of the `etcd` Database](#1-take-snapshots-of-the-etcd-database)

	Take snapshots of your current `etcd` database using Rancher Kubernetes Engine (RKE).

1.  [Store Snapshot(s) Externally](#2-backup-snapshots-to-a-safe-location)

	After taking your snapshots, export them to a safe location that won't be affected if your cluster encounters issues.

<br/>

### 1. Take Snapshots of the `etcd` Database

Take snapshots of your `etcd` database. You can use these snapshots later to recover from a disaster scenario. There are two ways to take snapshots: recurringly, or as a one-off.  Each option is better suited to a specific use case. Read the short description below each link to know when to use each option.

- [Option A: Recurring Snapshots](#option-a-recurring-snapshots)

	After you stand up a high-availability Rancher install, we recommend configuring RKE to automatically take recurring snapshots so that you always have a safe restoration point available.

- [Option B: One-Time Snapshots](#option-b-one-time-snapshots)

	We advise taking one-time snapshots before events like upgrades or restoration of another snapshot.

#### Option A: Recurring Snapshots

For all high-availability Rancher installs, we recommend taking recurring snapshots so that you always have a safe restoration point available.

To take recurring snapshots, enable the `etcd-snapshot` service, which is a service that's included with RKE. This service runs in a service container alongside the `etcd` container. You can enable this service by adding some code to `rancher-cluster.yml`.

**To Enable Recurring Snapshots:**

1. Open `rancher-cluster.yml` with your favorite text editor.

2. Edit the code for the `etcd` service to enable recurring snapshots. As of RKE v0.2.0, snapshots can be saved in a S3 compatible backend.  

    _Using RKE v0.2.0+_

    ```
    services:
      etcd:
        backup_config:
          enabled: true     # enables recurring etcd snapshots
          interval_hours: 6 # time increment between snapshots
          retention: 60     # time in days before snapshot purge
          # Optional S3
          s3backupconfig:
            access_key: "myaccesskey"
            secret_key:  "myaccesssecret"
            bucket_name: "my-backup-bucket"
            folder: "folder-name" # Available as of v2.3.0
            endpoint: "s3.eu-west-1.amazonaws.com"
            region: "eu-west-1"
    ```

    _Using RKE v0.1.x_

    ```
    services:
      etcd:
        snapshot: true # enables recurring etcd snapshots
        creation: 6h0s # time increment between snapshots
        retention: 24h # time increment before snapshot purge
    ```

4. Save and close `rancher-cluster.yml`.
5. Open **Terminal** and change directory to the location of the RKE binary. Your `rancher-cluster.yml` file must reside in the same directory.
6. Run the following command:

	```
	rke up --config rancher-cluster.yml
	```

**Result:** RKE is configured to take recurring snapshots of `etcd` on all nodes running the `etcd` role. Snapshots are saved locally to the following directory: `/opt/rke/etcd-snapshots/`. If configured, the snapshots are also uploaded to your S3 compatible backend.

#### Option B: One-Time Snapshots

When you're about to upgrade Rancher or restore it to a previous snapshot, you should snapshot your live image so that you have a backup of `etcd` in its last known state.

**To Take a One-Time Local Snapshot:**

1. Open **Terminal** and change directory to the location of the RKE binary. Your `rancher-cluster.yml` file must reside in the same directory.

2. Enter the following command. Replace `<SNAPSHOT.db>` with any name that you want to use for the snapshot (e.g. `upgrade.db`).

	```
	rke etcd snapshot-save --name <SNAPSHOT.db> --config rancher-cluster.yml
	```

**Result:** RKE takes a snapshot of `etcd` running on each `etcd` node. The file is saved to `/opt/rke/etcd-snapshots`.

**To Take a One-Time S3 Snapshot:**

_Available as of RKE v0.2.0_

1. Open **Terminal** and change directory to the location of the RKE binary. Your `rancher-cluster.yml` file must reside in the same directory.

2. Enter the following command. Replace `<SNAPSHOT.db>` with any name that you want to use for the snapshot (e.g. `upgrade.db`).

    ```shell
    rke etcd snapshot-save --config rancher-cluster.yml --name snapshot-name  \
    --s3 --access-key S3_ACCESS_KEY --secret-key S3_SECRET_KEY \
    --bucket-name s3-bucket-name  --s3-endpoint  s3.amazonaws.com \
    --folder folder-name # Available as of v2.3.0
    ```

**Result:** RKE takes a snapshot of `etcd` running on each `etcd` node. The file is saved to `/opt/rke/etcd-snapshots`. It is also uploaded to the S3 compatible backend.

### 2. Backup Local Snapshots to a Safe Location

> **Note:** If you are using RKE v0.2.0, you can enable saving the backups to a S3 compatible backend directly and skip this step.

After taking the `etcd` snapshots, save them to a safe location so that they're unaffected if your cluster experiences a disaster scenario. This location should be persistent.

In this documentation, as an example, we're using Amazon S3 as our safe location, and [S3cmd](http://s3tools.org/s3cmd) as our tool to create the backups. The backup location and tool that you use are ultimately your decision.

**Example:**

```
root@node:~# s3cmd mb s3://rke-etcd-snapshots
root@node:~# s3cmd put /opt/rke/etcd-snapshots/snapshot.db s3://rke-etcd-snapshots/
```
