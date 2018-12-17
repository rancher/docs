---
title: Importing Kubernetes Clusters
weight: 2300
aliases:
  - /rancher/v2.x/en/tasks/clusters/import-cluster/
---

You can import an existing Kubernetes cluster and then manage it using Rancher. Keep in mind that editing your Kubernetes cluster (for example: adding/removing nodes, upgrading Kubernetes cluster version and changing Kubernetes component parameters) still has to be done outside of Rancher.

>**Prerequisites:**
>
>- If your existing Kubernetes cluster already has a `cluster-admin` role defined, you must have this `cluster-admin` privilege to import the cluster into Rancher. In order to apply the privilege, you need to run `kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user [USER_ACCOUNT]` before running the `kubectl` command to import the cluster.
>- By default, GKE users are not given this privilege, so you will need to run the command before importing GKE clusters. To learn more about GKE RBAC, please click [here](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Import**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. Click **Create**.

6. The prerequisite for `cluster-admin` privileges is shown (see **Prerequisites** above), including an example command to fulfil the prerequisite.

7. Copy the `kubectl` command to your clipboard and run it on a node where kubeconfig is configured to point to the cluster you want to import. If you are unsure it is configured correctly, run `kubectl get nodes` to verify before running the command shown in {{< product >}}.

8. If you are using self signed certificates, you will receive the message `certificate signed by unknown authority`. To work around this validation, copy the command starting with `curl` displayed in {{< product >}} to your clipboard. Then run the command on a node where kubeconfig is configured to point to the cluster you want to import.

9. When you finish running the command(s) on your node, click **Done**.

{{< result_import-cluster >}}

> **Note:**
> You can not re-import a cluster that is currently active in a Rancher setup.
