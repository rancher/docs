---
title: Configuration for Storage Classes in Azure
weight: 3
---

If you are using Azure VMs for your nodes, you can use [Azure files](https://docs.microsoft.com/en-us/azure/aks/azure-files-dynamic-pv) as a StorageClass for the cluster.

In order to have the Azure platform create the required storage resources, follow these steps:

1.  [Configure the Azure cloud provider.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/azure)
1.  Configure `kubectl` to connect to your cluster.
1.  Copy the `ClusterRole` and `ClusterRoleBinding` manifest for the service account:

        ---
        apiVersion: rbac.authorization.k8s.io/v1
        kind: ClusterRole
        metadata:
          name: system:azure-cloud-provider
        rules:
        - apiGroups: ['']
          resources: ['secrets']
          verbs:     ['get','create']
        ---
        apiVersion: rbac.authorization.k8s.io/v1
        kind: ClusterRoleBinding
        metadata:
          name: system:azure-cloud-provider
        roleRef:
          kind: ClusterRole
          apiGroup: rbac.authorization.k8s.io
          name: system:azure-cloud-provider
        subjects:
        - kind: ServiceAccount
          name: persistent-volume-binder
          namespace: kube-system

1.  Create these in your cluster using one of the follow command.

    ```
    # kubectl create -f <MANIFEST>
    ```
