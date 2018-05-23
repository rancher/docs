---
title: Single Node Backup and Restoration
weight: 365
---

After completing your single node installation of Rancher, or before your upgrade to a newer version of Rancher, create a backup of your current installation. Use this backup as a restoration point your Rancher install or upgrade encounters issues.

## Backing Up Your Rancher Server

>**Prerequisite:** Open Rancher and write down the version number displayed in the lower-left of the browser (example: `v2.0.0`). You'll need this number during the backup process.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

	```
docker stop <RANCHER_CONTAINER_ID>
	```

	>**Tip:** You can obtain the ID for your Rancher container by entering the following command: `docker container ls`

2. Create a backup container. This container backs up the data from your current Rancher Server, which you can use as a recovery point.

	- Replace `<RANCHER_CONTAINER_ID>` with the same ID from the previous step.
	- Replace `<RANCHER_CONTAINER_TAG>` and `<RANCHER_VERSION>` with the version of Rancher that you are currently running, as mentioned in the  **Prerequisite** above.

	```
docker create --volumes-from <RANCHER_CONTAINER_ID>
--name rancher-backup-<RANCHER_VERSION> rancher/rancher:<RANCHER_CONTAINER_TAG>
	```

3. Restart Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

	```
docker start <RANCHER_CONTAINER_ID>
	```


## Restoring Your Rancher Server

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

	```
docker stop <RANCHER_CONTAINER_ID>
	```

2. Launch a new Rancher Server container using the most recent `rancher-backup-<RANCHER_VERSION>` container.

	```
docker run -d --volumes-from rancher-backup-<RANCHER_VERSION> --restart=unless-stopped \
-p 80:80 -p 443:443 rancher/rancher:<CURRENT_RANCHER_VERSION>
