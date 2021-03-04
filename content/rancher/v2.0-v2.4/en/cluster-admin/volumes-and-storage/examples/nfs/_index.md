---
title: NFS Storage
weight: 3054
aliases:
  - /rancher/v2.0-v2.4/en/tasks/clusters/adding-storage/provisioning-storage/nfs/
---

Before you can use the NFS storage volume plug-in with Rancher deployments, you need to provision an NFS server.

>**Note:**
>
>- If you already have an NFS share, you don't need to provision a new NFS server to use the NFS volume plugin within Rancher. Instead, skip the rest of this procedure and complete [adding storage]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/volumes-and-storage/).
>
>- This procedure demonstrates how to set up an NFS server using Ubuntu, although you should be able to use these instructions for other Linux distros (e.g. Debian, RHEL, Arch Linux, etc.). For official instruction on how to create an NFS server using another Linux distro, consult the distro's documentation.

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

Within Rancher, add the NFS server as a storage volume and/or storage class. After adding the server, you can use it for storage for your deployments.
