---
title: Importing Existing Clusters
description: Learn how you can create a cluster in Rancher by importing an existing Kubernetes cluster. Then, you can manage it using Rancher
metaTitle: 'Kubernetes Cluster Management'
metaDescription: 'Learn how you can import an existing Kubernetes cluster and then manage it using Rancher'
weight: 5
aliases:
  - /rancher/v2.0-v2.4/en/tasks/clusters/import-cluster/
---

_Available as of v2.0.x-v2.4.x_

When managing an imported cluster, Rancher connects to a Kubernetes cluster that has already been set up. Therefore, Rancher does not provision Kubernetes, but only sets up the Rancher agents to communicate with the cluster.

Rancher features, including management of cluster, role-based access control, policy, and workloads, are available for imported clusters. Note that Rancher does not automate the provisioning or scaling of imported clusters.

For all imported Kubernetes clusters except for K3s clusters, the configuration of an imported cluster still has to be edited outside of Rancher. Some examples of editing the cluster include adding and removing nodes, upgrading the Kubernetes version, and changing Kubernetes component parameters.

Rancher v2.4 added the capability to import a K3s cluster into Rancher, as well as the ability to upgrade Kubernetes by editing the cluster in the Rancher UI.

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Importing a cluster](#importing-a-cluster)
- [Imported K3s clusters](#imported-k3s-clusters)
  - [Additional features for imported K3s clusters](#additional-features-for-imported-k3s-clusters)
  - [Configuring a K3s Cluster to Enable Importation to Rancher](#configuring-a-k3s-cluster-to-enable-importation-to-rancher)
  - [Debug Logging and Troubleshooting for Imported K3s clusters](#debug-logging-and-troubleshooting-for-imported-k3s-clusters)
- [Annotating imported clusters](#annotating-imported-clusters)

# Features

After importing a cluster, the cluster owner can:

- [Manage cluster access]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/) through role-based access control
- Enable [monitoring]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) and [logging]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/)
- Enable [Istio]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/)
- Use [pipelines]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/pipelines/)
- Configure [alerts]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/alerts/) and [notifiers]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers/)
- Manage [projects]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/) and [workloads]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/)

After importing a K3s cluster, the cluster owner can also [upgrade Kubernetes from the Rancher UI.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/upgrading-kubernetes/)

# Prerequisites

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

# Importing a Cluster

1. From the **Clusters** page, click **Add Cluster**.
2. Choose **Import**.
3. Enter a **Cluster Name**.
4. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.}
5. Click **Create**.
6. The prerequisite for `cluster-admin` privileges is shown (see **Prerequisites** above), including an example command to fulfil the prerequisite.
7. Copy the `kubectl` command to your clipboard and run it on a node where kubeconfig is configured to point to the cluster you want to import. If you are unsure it is configured correctly, run `kubectl get nodes` to verify before running the command shown in Rancher.
8. If you are using self signed certificates, you will receive the message `certificate signed by unknown authority`. To work around this validation, copy the command starting with `curl` displayed in Rancher to your clipboard. Then run the command on a node where kubeconfig is configured to point to the cluster you want to import.
9. When you finish running the command(s) on your node, click **Done**.

**Result:**

- Your cluster is imported and assigned a state of **Pending.** Rancher is deploying resources to manage your cluster.</li>
- You can access your cluster after its state is updated to **Active.**
- **Active** clusters are assigned two Projects: `Default` (containing the namespace `default`) and `System` (containing the namespaces `cattle-system`, `ingress-nginx`, `kube-public` and `kube-system`, if present).

> **Note:**
> You can not re-import a cluster that is currently active in a Rancher setup.

# Imported K3s Clusters

You can now import a K3s Kubernetes cluster into Rancher. [K3s]({{<baseurl>}}/k3s/latest/en/) is a lightweight, fully compliant Kubernetes distribution. You can also upgrade Kubernetes by editing the K3s cluster in the Rancher UI.

### Additional Features for Imported K3s Clusters

_Available as of v2.4.0_

When a K3s cluster is imported, Rancher will recognize it as K3s, and the Rancher UI will expose the following features in addition to the functionality for other imported clusters:

- The ability to upgrade the K3s version
- The ability to configure the maximum number of nodes that will be upgraded concurrently
- The ability to see a read-only version of the K3s cluster's configuration arguments and environment variables used to launch each node in the cluster.

### Configuring K3s Cluster Upgrades

> It is a Kubernetes best practice to back up the cluster before upgrading. When upgrading a high-availability K3s cluster with an external database, back up the database in whichever way is recommended by the relational database provider.

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

### Debug Logging and Troubleshooting for Imported K3s Clusters

Nodes are upgraded by the system upgrade controller running in the downstream cluster. Based on the cluster configuration, Rancher deploys two [plans](https://github.com/rancher/system-upgrade-controller#example-upgrade-plan) to upgrade K3s nodes: one for controlplane nodes and one for workers. The system upgrade controller follows the plans and upgrades the nodes. 

To enable debug logging on the system upgrade controller deployment, edit the [configmap](https://github.com/rancher/system-upgrade-controller/blob/50a4c8975543d75f1d76a8290001d87dc298bdb4/manifests/system-upgrade-controller.yaml#L32) to set the debug environment variable to true. Then restart the `system-upgrade-controller` pod.

Logs created by the `system-upgrade-controller` can be viewed by running this command:

```
kubectl logs -n cattle-system system-upgrade-controller
```

The current status of the plans can be viewed with this command:

```
kubectl get plans -A -o yaml
```

If the cluster becomes stuck in upgrading, restart the `system-upgrade-controller`.

To prevent issues when upgrading, the [Kubernetes upgrade best practices](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/) should be followed.

# Annotating Imported Clusters

For all types of imported Kubernetes clusters except for K3s Kubernetes clusters, Rancher doesn't have any information about how the cluster is provisioned or configured.

Therefore, when Rancher imports a cluster, it assumes that several capabilities are disabled by default. Rancher assumes this in order to avoid exposing UI options to the user even when the capabilities are not enabled in the imported cluster.

However, if the cluster has a certain capability, such as the ability to use a pod security policy, a user of that cluster might still want to select pod security policies for the cluster in the Rancher UI. In order to do that, the user will need to manually indicate to Rancher that pod security policies are enabled for the cluster.

By annotating an imported cluster, it is possible to indicate to Rancher that a cluster was given a pod security policy, or another capability, outside of Rancher.

This example annotation indicates that a pod security policy is enabled:

```
"capabilities.cattle.io/pspEnabled": "true"
```

The following annotation indicates Ingress capabilities. Note that that the values of non-primitive objects need to be JSON encoded, with quotations escaped.

```
"capabilities.cattle.io/ingressCapabilities": "[  
  {
    "customDefaultBackend":true,
    "ingressProvider":"asdf"
  }
]"
```

These capabilities can be annotated for the cluster:

- `ingressCapabilities`
- `loadBalancerCapabilities`
- `nodePoolScalingSupported`
- `nodePortRange`
- `pspEnabled`
- `taintSupport`

All the capabilities and their type definitions can be viewed in the Rancher API view, at `[Rancher Server URL]/v3/schemas/capabilities`.

To annotate an imported cluster,

1. Go to the cluster view in Rancher and select **&#8942; > Edit.**
1. Expand the **Labels & Annotations** section.
1. Click **Add Annotation.**
1. Add an annotation to the cluster with the format `capabilities/<capability>: <value>` where `value` is the cluster capability that will be overridden by the annotation. In this scenario, Rancher is not aware of any capabilities of the cluster until you add the annotation.
1. Click **Save.**

**Result:** The annotation does not give the capabilities to the cluster, but it does indicate to Rancher that the cluster has those capabilities.