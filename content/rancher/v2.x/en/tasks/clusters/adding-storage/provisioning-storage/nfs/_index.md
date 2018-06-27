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

<<<<<<< HEAD
>**Recommended:** To simplify the process of managing firewall rules, use NFSv4.

1. Using a remote Terminal connection, log into the Ubuntu server that you intend to use for NFS storage.

1. Enter the following command:

    ```
    sudo apt-get install nfs-kernel-server
    ```

1. Enter the command below, which sets the directory used for storage, along with user access rights. Modify the command if you'd like to keep storage at a different directory.

    ```
    mkdir -p /nfs && chown nobody:nogroup /nfs
    ```
    - The `-p /nfs` parameter creates a directory named `nfs` at root.
    - The `chown nobody:nogroup /nfs` parameter allows all access to the storage directory.

1. Create an NFS exports table. This table sets the directory paths on your NFS server that are exposed to the nodes that will use the server for storage.

    1. Open `/etc/exports` using your text editor of choice.
    1. Add the path of the `/nfs` folder that you created in step 3, along with the IP addresses of your cluster nodes. Add an entry for each IP address in your cluster. Follow each address and its accompanying parameters with a single space that is a delimiter.

        ```
        /nfs <IP_ADDRESS1>(rw,sync,no_subtree_check) <IP_ADDRESS2>(rw,sync,no_subtree_check) <IP_ADDRESS3>(rw,sync,no_subtree_check)
        ```

        **Tip:**  You can replace the IP addresses with a subnet. For example: `10.212.50.12&#47;24`

    1. Update the NFS table by entering the following command:

        ```
        exportfs -ra
        ```

1. Open the ports used by NFS.

    1. To find out what ports NFS is using, enter the following command:

        ```
        rpcinfo -p | grep nfs
        ```
    2. [Open the ports](https://help.ubuntu.com/lts/serverguide/firewall.html.en) that the previous command outputs. For example, the following command opens port 2049:

        ```
        sudo ufw allow 2049
        ```

**Result:** Your NFS server is configured to be used for storage with your Rancher nodes.

## What's Next?

Within Rancher, add the NFS server as a [storage volume](../../#adding-a-persistent-volume) and/or [storage class](../../#adding-storage-classes). After adding the server, you can use it for storage for your deployments.
=======
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
>>>>>>> updating storage docs
