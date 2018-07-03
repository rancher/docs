---
title: Persistent NFS Volume
weight: 3700
---

The following guide will demonstrate how to configure a persistent NFS
volume.

## Configure NFS Server

The first step is to provision a NFS server. This is an **optional** step and
can be skipped, if you already have a NFS share. I will be using a 3 node
cluster call running **Ubuntu**. You should be able to replicate this setup on
other Linux hosts (e.g. Debian, RHEL, Arch Linux, and etc.).

To simplify the process of managing firewall rules, you should use **NFSv4**.

**Note:** if using a firewall, make sure to allow port **2049** for NFSv4.

For other versions of NFS, you will most likely need to allow 111, 2049, and
other ports.

To examine the ports beings used by NFS, execute the following command:

```
rpcinfo -p | grep nfs
```

To install NFS server, execute the following command:

```
sudo apt-get install nfs-kernel-server
```

As a simple example, a **/nfs** directory will be created in the **root** of
the host. To permit access to the directory, the **nobody:nogroup** owner and
group will be used.

```
mkdir -p /nfs && chown nobody:nogroup /nfs
```

The final step is to create the NFS exports table. This is where you specify the
paths on the host that you would like to expose to NFS clients.

Edit the **/etc/exports** file and add the the **/nfs** directory. In this
specific example I have allowed all 3 nodes to connect to the share.

**Note:**  You can replace the 3 nodes with a subnet such as **10.212.50.12&#47;24**

```
/nfs 159.89.139.111(rw,sync,no_subtree_check) \
  159.65.102.218(rw,sync,no_subtree_check) \
  159.65.102.232(rw,sync,no_subtree_check)
```

Make sure that all entries are in one line followed by a space as the delimiter.
To make my example more readable, I seperated into multiple lines. In the actual
**/etc/exports** file this will not work.

Update the NFS table by issuing the following commad:

```
exportfs -ra
```

## Create NFS Persistent Volume

Now we are ready to create the actual NFS persistent volume through Rancher. If
you followed this guide, you should have a NFS share by now.

- Head on over to cluster > **Storage**
- Click on Add Volume
- Enter the name of the volume
- Select NFS Share as the Volume Plugin
- Enter the Capacity (amount in **GiB**)
- Enter the path of the share
- Enter the NFS server IP address
- Click on Save

&nbsp;

![Create NFS Persistent Volume]({{< baseurl >}}/img/rancher/nfs/nfs1.png)

## Create Persistent Volume Claim

The next step is to create a persistent volume claim. This will bind the volume
and allow request for storage. The persistent volume claim allows a pod to consume
the allocated storage from the volume.

**Note:** this step can be done in the Workloads or Volumes section.

- Head on over to cluster > project > **Workloads**
- Click on Deploy
- Enter the name of the workload to deploy
- Select the desired Workload Type (Run one pod on each node)
- Enter a Docker Image to pull
- Click on Volumes
- Select Add a new persistent volume (claim)
- If a claim already exists, you can select Use an existing persistent volume (claim)
- Enter a name for the Volume Claim
- Select the Persistent Volume to claim
- Click Define
- Enter the Mount Point path to mount the share
- Click Launch

You can select other options like what ports to expose. In this guide the intent
was to show how to create a persistent NFS share and that is why I exclude other
settings for a workload.

![Create NFS Persistent Volume Claim]({{< baseurl >}}/img/rancher/nfs/nfs2.png)

For the specific example, I selected to run one pod on each node. You can alter
this setting depending on your needs.

![Deploy Workload]({{< baseurl >}}/img/rancher/nfs/nfs3.png)

As you can see from the image above, I created a new volume claim from the workload
deployment page. You can also create a new volume claim outside of the deployment.
When a volume claim already exists, you can run a deployment and select use an existing
persistent volume claim.

## End Product

Congratulations you now have a workload deployed with a NFS persistent volume.
If you followed the example above, you should have 3 pods deployed. To test that
the NFS volume was mounted, execute a shell inside each pod and navigate to /nfs.

![Pods]({{< baseurl >}}/img/rancher/nfs/nfs4.png)

```
root@ubuntu-mq4p6:/# cd /nfs/
root@ubuntu-mq4p6:/nfs# ls
test.txt
root@ubuntu-mq4p6:/nfs# touch test2.txt
root@ubuntu-mq4p6:/nfs# cat /etc/hostname >> test2.txt
```

You can repeat for each pod to see that the files are being updated

## Reference

For more information on persistent volumes and NFS you can checkout the following
references listed bellow.

- [Kubernetes -> Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [man -> exports(5)](http://man7.org/linux/man-pages/man5/exports.5.html)
- [Ubuntu -> Setting Up NFS How To](https://help.ubuntu.com/community/SettingUpNFSHowTo#NFS_Server)
