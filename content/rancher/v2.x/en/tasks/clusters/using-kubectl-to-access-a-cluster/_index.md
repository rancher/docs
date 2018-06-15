---
title: Using kubectl to Access a Cluster
weight: 3450
draft: true
---
You can access and manage your Kubernetes clusters using the kubectl shell, all within the Rancher GUI.

1. From the **Global** view, open the cluster that you want to access with kubectl.

2. Copy the cluster's kubeconfig file to your workstation.
    
    1. Click **Kubeconfig File**.
    2. Copy the contents displayed to your clipboard.
    3. Paste the contents into a new file on your local computer. Move the file to `~/.kube/config`.

    > **Note:** The default location that kubectl uses for the kubeconfig file is `~/.kube/config`, but you can use any directory and specify it using the `--kubeconfig` flag, as in the sample that follows:
    > 
    > ```
    kubectl --kubeconfig /custom/path/kube.config get pods
    ```
    
3. Click **Launch kubectl**. Use the window that opens to interact with your Kubernetes cluster.

    For more information on using kubectl, see [Kubernetes Documentation: Overview of kubectl](https://kubernetes.io/docs/reference/kubectl/overview/).
