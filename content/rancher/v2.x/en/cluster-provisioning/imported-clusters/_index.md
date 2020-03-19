---
title: Importing Existing Clusters into Rancher
description: Learn how you can create a cluster in Rancher by importing an existing Kubernetes cluster. Then, you can manage it using Rancher
metaTitle: 'Kubernetes Cluster Management'
metaDescription: 'Learn how you can import an existing Kubernetes cluster and then manage it using Rancher'
weight: 2300
aliases:
  - /rancher/v2.x/en/tasks/clusters/import-cluster/
---

When managing an imported cluster, Rancher connects to a Kubernetes cluster that has already been set up. Therefore, Rancher does not provision Kubernetes, but only sets up the Rancher agents to communicate with the cluster.

Rancher features, including management of cluster, role-based access control, policy, and workloads, are available for imported clusters. Note that Rancher does not automate the provisioning or scaling of imported clusters.

For all imported Kubernetes clusters except for K3s clusters, the configuration of an imported cluster still has to be edited outside of Rancher. Some examples of editing the cluster include adding and removing nodes, upgrading the Kubernetes version, and changing Kubernetes component parameters.

Rancher v2.4 added the capability to import a K3s cluster into Rancher, as well as the ability to upgrade Kubernetes by editing the cluster in the Rancher UI.

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Importing a cluster](#importing-a-cluster)
- [Additional features for imported K3s clusters](#additional-features-for-imported-k3s-clusters)
- [Configuring a K3s Cluster to Enable Importation to Rancher](#configuring-a-k3s-cluster-to-enable-importation-to-rancher)

### Features

After importing a cluster, the cluster owner can:

- [Manage cluster access]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/) through role-based access control
- Enable [monitoring]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/monitoring/) and [logging]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/logging/)
- Enable [Istio]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/)
- Use [pipelines]({{<baseurl>}}/rancher/v2.x/en/project-admin/pipelines/)
- Configure [alerts]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/alerts/) and [notifiers]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/notifiers/)
- Manage [projects]({{<baseurl>}}/rancher/v2.x/en/project-admin/) and [workloads]({{<baseurl>}}/rancher/v2.x/en/k8s-in-rancher/workloads/)

After importing a K3s cluster, the cluster owner can also [upgrade Kubernetes from the Rancher UI.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/upgrading-kubernetes/)

### Prerequisites

If your existing Kubernetes cluster already has a `cluster-admin` role defined, you must have this `cluster-admin` privilege to import the cluster into Rancher.

In order to apply the privilege, you need to run:

```plain
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user [USER_ACCOUNT]
```

before running the `kubectl` command to import the cluster.

By default, GKE users are not given this privilege, so you will need to run the command before importing GKE clusters. To learn more about role-based access control for GKE, please click [here](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).

> If you are importing a K3s cluster, make sure the `cluster.yml` is readable. It is protected by default. For details, refer to [Configuring a K3s cluster to enable importation to Rancher.](#configuring-a-k3s-cluster-to-enable-importation-to-rancher)

### Importing a Cluster

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

### Additional Features for Imported K3s Clusters

_Available as of v2.4.0_

You can now import a K3s Kubernetes cluster into Rancher. [K3s]({{<baseurl>}}/k3s/latest/en/) is lightweight, fully compliant Kubernetes distribution. You can also upgrade Kubernetes by editing the K3s cluster in the Rancher UI.

When a K3s cluster is imported, Rancher will recognize it as K3s, and the Rancher UI will expose the following features in addition to the functionality for other imported clusters:

- The ability to upgrade the K3s version
- The ability to configure the maximum number of nodes that will be upgraded concurrently
- The ability to see a read-only version of the K3s cluster's configuration arguments and environment variables used to launch each node in the cluster.

The **concurrency** is the maximum number of nodes that are permitted to be unavailable during an upgrade. If number of unavailable nodes is larger than the **concurrency,** the upgrade will fail. If an upgrade fails, you may need to repair or remove failed nodes before the upgrade can succeed.

- **Controlplane concurrency:** The maximum number of server nodes to upgrade at a single time; also the maximum unavailable server nodes
- **Worker concurrency:** The maximum number worker nodes to upgrade at the same time; also the maximum unavailable worker nodes

In the K3s documentation, controlplane nodes are called server nodes. These nodes run the Kubernetes master, which maintains the desired state of the cluster. In K3s, these controlplane nodes have the capability to have workloads scheduled to them by default.

Also in the K3s documentation, nodes with the worker role are called agent nodes. Any workloads or pods that are deployed in the cluster can be scheduled to these nodes by default.

### Configuring a K3s Cluster to Enable Importation to Rancher

The K3s server needs to be configured to allow writing to the kubeconfig file.

This can be accomplished by passing `--write-kubeconfig-mode 644` as a flag during installation:

```
$ curl -sfL https://get.k3s.io | sh -s - --write-kubeconfig-mode 644
```

The option can also be specified using the environment variable `K3S_KUBECONFIG_MODE`:

```
$ curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -s -
```