---
title: Downloading a Kubeconfig File
weight: 3600
draft: true
---

When you create a new cluster using Rancher, Rancher automatically creates a Kubeconfig file for the cluster. This file can then be used for authenticating with your clusters using Rancher CLI. Download

1. From the **Global** view, open the cluster that you want to download a Kubeconfig file for.
2. Click **Kubeconfig File**.
3. Copy the contents of the generated file to your clipboard.
4. Paste the contents into a new file on your local computer.

> **Note:** The default location that kubectl uses for the kubeconfig file is `~/.kube/config`, but you can use any condition and specify it using the `--kubeconfig` flag, as in the sample that follows:
> 
> ```
kubectl --kubeconfig /custom/path/kube.config get pods
```
