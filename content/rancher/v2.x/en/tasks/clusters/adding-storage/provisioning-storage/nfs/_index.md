---
title: Provisioning NFS Storage
weight: 3500
draft: true
---

Before you can use the NFS storage volume plug-in with Rancher deployments, you need to provision an NFS server.

>**Note:**
>
>- If you already have an NFS share, you don't need to provision a new NFS server to use the NFS volume plugin within Rancher. Instead, skip the rest of this procedure and complete [Adding Storage](../..).
>
>- This procedure demonstrates how to setup an NFS server using Ubuntu, although you should be able to use these instructions for other Linux distros (e.g. Debian, RHEL, Arch Linux, etc.). For official instruction on how to create an NFS server using another Linux distro, consult the distro's documentation.

>**Prerequisites:**
>
>- To simplify the process of managing firewall rules, use NFSv4.
>
>- If using a firewall and NFSv4, open port 2049.
>
>- 

3 node cluster call

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
