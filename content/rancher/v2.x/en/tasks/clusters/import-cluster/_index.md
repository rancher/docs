---
title: Importing a Cluster
weight: 3400
---

You can import an existing Kubernetes cluster and then manage it using Rancher.

>**Prerequisites:**
>
>- If your existing Kubernetes cluster already has a `cluster-admin` role defined, you must have this `cluster-admin` privilege to import the cluster into Rancher. In order to apply the privilege, you need to run `kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user [USER_ACCOUNT]` before running the `kubectl` command to import the cluster.
>- By default, GKE users are not given this privilege, so you will need to run the command before importing GKE clusters. To learn more about GKE RBAC, please click [here](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Import**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5.	Click **Create**.

6.	Copy the first command displayed to your clipboard.

7. Log into one of your cluster nodes using your preferred shell, such as PuTTy or a remote Terminal connection. Run the command copied to your clipboard.

8.	If you receive a message of `certificate signed by unknown authority`, copy the second command displayed in {{< product >}} to your clipboard. Then run the command on your cluster node.

9. When you finish running the command(s) on your Linux host(s), click **Done**.

{{< result_create-cluster >}}

> **Note:**
> You can not re-import a cluster that is currently active in a Rancher setup. 
