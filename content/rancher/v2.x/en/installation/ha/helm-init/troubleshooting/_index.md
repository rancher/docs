---
title: Troubleshooting
weight: 276
---

### Helm commands show forbidden

When Helm is initiated in the cluster without specifying the correct `ServiceAccount`, the command `helm init` will succeed but you won't be able to execute most of the other `helm` commands. The following error will be shown:

```
Error: configmaps is forbidden: User "system:serviceaccount:kube-system:default" cannot list configmaps in the namespace "kube-system"
```

To resolve this, the server component (`tiller`) needs to be removed and added with the correct `ServiceAccount`. You can use `helm reset --force` to remove the `tiller` from the cluster. Please check if it is removed using `helm version --server`.

```
helm reset --force
Tiller (the Helm server-side component) has been uninstalled from your Kubernetes Cluster.
helm version --server
Error: could not find tiller
```

When you have confirmed that `tiller` has been removed, please follow the steps provided in [Initialize Helm on the cluster]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/#initialize-helm-on-the-cluster) to install `tiller` with the correct `ServiceAccount`.
