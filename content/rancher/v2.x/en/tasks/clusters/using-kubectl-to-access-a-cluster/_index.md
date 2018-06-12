---
title: Using kubectl to Access a Cluster
weight: 3450
draft: true
---
You can access and manage your Kubernetes clusters using the kubectl shell.

## Using kubectl Shell



2. Click **Launch kubectl**.


1. From the **Global** view, open the cluster that you want to access with kubectl. 
2. Copy the cluster's kubeconfig file to your workstation. 
    1. Click **Kubeconfig File**.
    2. Copy the contents of the generated file to your clipboard.
    3. Paste the contents into a new file on your local computer. Move the file to `~/.kube/config`.

    > **Note:** The default location that kubectl uses for the kubeconfig file is `~/.kube/config`, but you can use any condition and specify it using the `--kubeconfig` flag, as in the sample that follows:
    > 
    > ```
    kubectl --kubeconfig /custom/path/kube.config get pods
    ```
    


## Configuring My `kubectl`

After you open kubectl, direct it toward a kubeconfig file to access and manage one of your Kubernetes clusters. To specify a kubeconfig file, click **Kubeconfig File**, copy the contents to an empty file, and then save it to `~/.kube/config`.

For more information, see:

- [Kubeconfig Files]({{< baseurl >}}/rancher/v2.x/en/concepts/clusters/kubeconfig-files).
- [Kubernetes Documentation: Organizing Cluster Access Using kubeconfig Files](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/)