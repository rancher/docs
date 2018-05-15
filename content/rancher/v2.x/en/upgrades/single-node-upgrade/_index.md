---
title: Single Node Upgrade
weight: 1010
draft: true
---
Upgrading Rancher Server running on a single node requires only a few commands.

1. Stop your Rancher container. Replace `<RANCHER_CONTAINER_ID>` with the ID of your Rancher container.

	```
docker stop <RANCHER_CONTAINER_ID>
	```

	>**Tip:** You can obtain the ID for your Rancher container by entering the following command: `docker container ls`

2. Create a `rancher-data` container. This container backs up the data from your current Rancher install, which you'll restore later.

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
-p 8080:8080 rancher/rancher:latest
	```
	>**Note:** _Do not_ stop the upgrade after initiating it, even if the upgrade process seems longer than expected. Stopping the upgrade may result in database migration errors during future upgrades.
	><br/>
	><br/>
	>**Note:** After standing up your upgraded Rancher Server, data from your upgraded server is also saved to the `rancher-data` container for use in future upgrades.

5. Remove the previous Rancher Server container.

	If you only stop the previous Rancher Server container (and don't remove it), the container may restart after the next server reboot.

**Result:** Rancher server is upgraded to the latest version.
