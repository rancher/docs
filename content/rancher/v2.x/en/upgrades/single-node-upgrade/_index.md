---
title: Single Node Upgrade
weight: 1010
---
To upgrade Rancher Server 2.x to the latest version, you need to enter only a few commands.

>**Prerequisite:** Open Rancher and write down the version number displayed in the lower-left of the browser (example: `v2.0.0`). You'll need this number during the upgrade process.

1. Stop the container currently running Rancher Server. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

	```
docker stop <RANCHER_CONTAINER_ID>
	```

	>**Tip:** You can obtain the ID for your Rancher container by entering the following command: `docker container ls`

2. Create a `rancher-data` container. This container backs up the data from your current Rancher Server, which you'll restore in step 4.

	- Replace `<RANCHER_CONTAINER_ID>` with the same ID from the previous step.
	- Replace `<RANCHER_CONTAINER_TAG>` with the version of Rancher that you are currently running, as mentioned in the  **Prerequisite** above.

	```
docker create --volumes-from <RANCHER_CONTAINER_ID> \
--name rancher-data rancher/rancher:<RANCHER_CONTAINER_TAG>
	```

3. Pull the most recent image of Rancher.

	```
docker pull rancher/rancher:latest
	```

4. Launch a new Rancher Server container using the `rancher-data` container.

	```
docker run -d --volumes-from rancher-data --restart=unless-stopped \
-p 80:80 -p 443:443 rancher/rancher:latest
	```
	>**Note:** _Do not_ stop the upgrade after initiating it, even if the upgrade process seems longer than expected. Stopping the upgrade may result in database migration errors during future upgrades.
	><br/>
	><br/>
	>**Note:** After upgrading Rancher Server, data from your upgraded server is also saved to the `rancher-data` container for use in future upgrades.

5. Remove the previous Rancher Server container.

	If you only stop the previous Rancher Server container (and don't remove it), the container may restart after the next server reboot.

6. Log into Rancher. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

**Result:** Rancher Server is upgraded to the latest version.
