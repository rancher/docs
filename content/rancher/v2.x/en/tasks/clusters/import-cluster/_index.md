---
title: Importing a Cluster
weight: 3400
---
You can import an existing Kubernetes cluster and then manage it using Rancher.

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

> *Note:* You can not re-import a cluster that is currently active in a Rancher setup. 
