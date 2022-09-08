---
title: Registering Existing Clusters
weight: 6
---

The cluster registration feature replaced the feature to import clusters.

The control that Rancher has to manage a registered cluster depends on the type of cluster. For details, see [Management Capabilities for Registered Clusters.](#management-capabilities-for-registered-clusters)

- [Prerequisites](#prerequisites)
- [Registering a Cluster](#registering-a-cluster)
- [Management Capabilities for Registered Clusters](#management-capabilities-for-registered-clusters)
- [Configuring K3s Cluster Upgrades](#configuring-k3s-cluster-upgrades)
- [Debug Logging and Troubleshooting for Registered K3s Clusters](#debug-logging-and-troubleshooting-for-registered-k3s-clusters)
- [Authorized Cluster Endpoint Support for RKE2 and K3s Clusters](#authorized-cluster-endpoint-support-for-rke2-and-k3s-clusters)
- [Annotating Registered Clusters](#annotating-registered-clusters)

# Prerequisites

### Kubernetes Node Roles

Registered RKE Kubernetes clusters must have all three node roles - etcd, controlplane and worker. A cluster with only controlplane components cannot be registered in Rancher.

For more information on RKE node roles, see the [best practices.](../../../pages-for-subheaders/checklist-for-production-ready-clusters.md#cluster-architecture)

### Permissions

If your existing Kubernetes cluster already has a `cluster-admin` role defined, you must have this `cluster-admin` privilege to register the cluster in Rancher.

In order to apply the privilege, you need to run:

```plain
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user [USER_ACCOUNT]
```

before running the `kubectl` command to register the cluster.

By default, GKE users are not given this privilege, so you will need to run the command before registering GKE clusters. To learn more about role-based access control for GKE, please click [here](https://cloud.google.com/kubernetes-engine/docs/how-to/role-based-access-control).

If you are registering a K3s cluster, make sure the `cluster.yml` is readable. It is protected by default. For details, refer to [Configuring a K3s cluster to enable importation to Rancher.](#configuring-a-k3s-cluster-to-enable-registration-in-rancher)

### EKS Clusters

EKS clusters must have at least one managed node group to be imported into Rancher or provisioned from Rancher successfully.

# Registering a Cluster

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, **Import Existing**.
1. Choose the type of cluster.
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. If you are importing a generic Kubernetes cluster in Rancher, perform the following steps for setup:<br/>
  a. Click **Agent Environment Variables** under **Cluster Options** to set environment variables for [rancher cluster agent](launch-kubernetes-with-rancher/about-rancher-agents.md). The environment variables can be set using key value pairs. If rancher agent requires use of proxy to communicate with Rancher server, `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY` environment variables can be set using agent environment variables.<br/>
  b. Enable Project Network Isolation to ensure the cluster supports Kubernetes `NetworkPolicy` resources. Users can select the **Project Network Isolation** option under the **Advanced Options** dropdown to do so.
1. Click **Create**.
1. The prerequisite for `cluster-admin` privileges is shown (see **Prerequisites** above), including an example command to fulfil the prerequisite.
1. Copy the `kubectl` command to your clipboard and run it on a node where kubeconfig is configured to point to the cluster you want to import. If you are unsure it is configured correctly, run `kubectl get nodes` to verify before running the command shown in Rancher.
1. If you are using self-signed certificates, you will receive the message `certificate signed by unknown authority`. To work around this validation, copy the command starting with `curl` displayed in Rancher to your clipboard. Then run the command on a node where kubeconfig is configured to point to the cluster you want to import.
1. When you finish running the command(s) on your node, click **Done**.

**Result:**

- Your cluster is registered and assigned a state of **Pending**. Rancher is deploying resources to manage your cluster.
- You can access your cluster after its state is updated to **Active**.
- **Active** clusters are assigned two Projects: `Default` (containing the namespace `default`) and `System` (containing the namespaces `cattle-system`, `ingress-nginx`, `kube-public` and `kube-system`, if present).


:::note

You can not re-register a cluster that is currently active in a Rancher setup.

:::

### Configuring a K3s Cluster to Enable Registration in Rancher

The K3s server needs to be configured to allow writing to the kubeconfig file.

This can be accomplished by passing `--write-kubeconfig-mode 644` as a flag during installation:

```
$ curl -sfL https://get.k3s.io | sh -s - --write-kubeconfig-mode 644
```

The option can also be specified using the environment variable `K3S_KUBECONFIG_MODE`:

```
$ curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE="644" sh -s -
```

### Configuring an Imported EKS Cluster with Terraform

You should define **only** the minimum fields that Rancher requires when importing an EKS cluster with Terraform. This is important as Rancher will overwrite what was in the EKS cluster with any config that the user has provided.

:::caution

Even a small difference between the current EKS cluster and a user-provided config could have unexpected results.

:::

The minimum config fields required by Rancher to import EKS clusters with Terraform using `eks_config_v2` are as follows:

- cloud_credential_id
- name
- region
- imported (this field should always be set to `true` for imported clusters)

Example YAML configuration for imported EKS clusters:

```
resource "rancher2_cluster" "my-eks-to-import" {
  name        = "my-eks-to-import"
  description = "Terraform EKS Cluster"
  eks_config_v2 {
    cloud_credential_id = rancher2_cloud_credential.aws.id
    name                = var.aws_eks_name
    region              = var.aws_region
    imported            = true
  }
}
```

# Management Capabilities for Registered Clusters

The control that Rancher has to manage a registered cluster depends on the type of cluster.

- [Features for All Registered Clusters](#2-5-8-features-for-all-registered-clusters)
- [Additional Features for Registered K3s Clusters](#2-5-8-additional-features-for-registered-k3s-clusters)
- [Additional Features for Registered EKS and GKE Clusters](#additional-features-for-registered-eks-and-gke-clusters)

### Features for All Registered Clusters

After registering a cluster, the cluster owner can:

- [Manage cluster access](../../advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md) through role-based access control
- Enable [monitoring, alerts and notifiers](../../../pages-for-subheaders/monitoring-and-alerting.md)
- Enable [logging](../../../pages-for-subheaders/logging.md)
- Enable [Istio](../../../pages-for-subheaders/istio.md)
- Use [pipelines](../../advanced-user-guides/manage-projects/ci-cd-pipelines.md)
- Manage projects and workloads

### Additional Features for Registered K3s Clusters

[K3s](https://rancher.com/docs/k3s/latest/en/) is a lightweight, fully compliant Kubernetes distribution.

When a K3s cluster is registered in Rancher, Rancher will recognize it as K3s. The Rancher UI will expose the features for [all registered clusters,](#features-for-all-registered-clusters) in addition to the following features for editing and upgrading the cluster:

- The ability to [upgrade the K3s version](../../../getting-started/installation-and-upgrade/upgrade-and-roll-back-kubernetes.md)
- The ability to configure the maximum number of nodes that will be upgraded concurrently
- The ability to see a read-only version of the K3s cluster's configuration arguments and environment variables used to launch each node in the cluster

### Additional Features for Registered EKS and GKE Clusters

Registering an Amazon EKS cluster or GKE cluster allows Rancher to treat it as though it were created in Rancher.

Amazon EKS clusters and GKE clusters can now be registered in Rancher. For the most part, these registered clusters are treated the same way as clusters created in the Rancher UI, except for deletion.

When you delete an EKS cluster or GKE cluster that was created in Rancher, the cluster is destroyed. When you delete a cluster that was registered in Rancher, it is disconnected from the Rancher server, but it still exists and you can still access it in the same way you did before it was registered in Rancher.

The capabilities for registered clusters are listed in the table on [this page.](../../../pages-for-subheaders/kubernetes-clusters-in-rancher-setup.md)

# Configuring K3s Cluster Upgrades

:::tip

It is a Kubernetes best practice to back up the cluster before upgrading. When upgrading a high-availability K3s cluster with an external database, back up the database in whichever way is recommended by the relational database provider.

:::

The **concurrency** is the maximum number of nodes that are permitted to be unavailable during an upgrade. If number of unavailable nodes is larger than the **concurrency,** the upgrade will fail. If an upgrade fails, you may need to repair or remove failed nodes before the upgrade can succeed.

- **Controlplane concurrency:** The maximum number of server nodes to upgrade at a single time; also the maximum unavailable server nodes
- **Worker concurrency:** The maximum number worker nodes to upgrade at the same time; also the maximum unavailable worker nodes

In the K3s documentation, controlplane nodes are called server nodes. These nodes run the Kubernetes master, which maintains the desired state of the cluster. In K3s, these controlplane nodes have the capability to have workloads scheduled to them by default.

Also in the K3s documentation, nodes with the worker role are called agent nodes. Any workloads or pods that are deployed in the cluster can be scheduled to these nodes by default.

# Debug Logging and Troubleshooting for Registered K3s Clusters

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

# Authorized Cluster Endpoint Support for RKE2 and K3s Clusters

_Available as of v2.6.3_

Authorized Cluster Endpoint (ACE) support has been added for registered RKE2 and K3s clusters. This support includes manual steps you will perform on the downstream cluster to enable the ACE. For additional information on the authorized cluster endpoint, click [here](../../advanced-user-guides/manage-clusters/access-clusters/authorized-cluster-endpoint.md).

:::note Notes:

- These steps only need to be performed on the control plane nodes of the downstream cluster. You must configure each control plane node individually.

- The following steps will work on both RKE2 and K3s clusters registered in v2.6.x as well as those registered (or imported) from a previous version of Rancher with an upgrade to v2.6.x.

- These steps will alter the configuration of the downstream RKE2 and K3s clusters and deploy the `kube-api-authn-webhook`. If a future implementation of the ACE requires an update to the `kube-api-authn-webhook`, then this would also have to be done manually. For more information on this webhook, click [here](../../advanced-user-guides/manage-clusters/access-clusters/authorized-cluster-endpoint.md#about-the-kube-api-auth-authentication-webhook).

:::

###### **Manual steps to be taken on the control plane of each downstream cluster to enable ACE:**

1. Create a file at `/var/lib/rancher/{rke2,k3s}/kube-api-authn-webhook.yaml` with the following contents:

        apiVersion: v1
        kind: Config
        clusters:
        - name: Default
          cluster:
            insecure-skip-tls-verify: true
            server: http://127.0.0.1:6440/v1/authenticate
        users:
        - name: Default
          user:
            insecure-skip-tls-verify: true
        current-context: webhook
        contexts:
        - name: webhook
          context:
            user: Default
            cluster: Default

1. Add the following to the config file (or create one if it doesn’t exist); note that the default location is `/etc/rancher/{rke2,k3s}/config.yaml`:

        kube-apiserver-arg:
            - authentication-token-webhook-config-file=/var/lib/rancher/{rke2,k3s}/kube-api-authn-webhook.yaml

1. Run the following commands:

        sudo systemctl stop {rke2,k3s}-server
        sudo systemctl start {rke2,k3s}-server

1. Finally, you **must** go back to the Rancher UI and edit the imported cluster there to complete the ACE enablement. Click on **⋮ > Edit Config**, then click the **Networking** tab under Cluster Configuration. Finally, click the **Enabled** button for **Authorized Endpoint**. Once the ACE is enabled, you then have the option of entering a fully qualified domain name (FQDN) and certificate information.

      :::note

      The <b>FQDN</b> field is optional, and if one is entered, it should point to the downstream cluster. Certificate information is only needed if there is a load balancer in front of the downstream cluster that is using an untrusted certificate. If you have a valid certificate, then nothing needs to be added to the <b>CA Certificates</b> field.

      :::

# Annotating Registered Clusters

For all types of registered Kubernetes clusters except for K3s Kubernetes clusters, Rancher doesn't have any information about how the cluster is provisioned or configured.

Therefore, when Rancher registers a cluster, it assumes that several capabilities are disabled by default. Rancher assumes this in order to avoid exposing UI options to the user even when the capabilities are not enabled in the registered cluster.

However, if the cluster has a certain capability, such as the ability to use a pod security policy, a user of that cluster might still want to select pod security policies for the cluster in the Rancher UI. In order to do that, the user will need to manually indicate to Rancher that pod security policies are enabled for the cluster.

By annotating a registered cluster, it is possible to indicate to Rancher that a cluster was given a pod security policy, or another capability, outside of Rancher.

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

To annotate a registered cluster,

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the custom cluster you want to annotate and click **⋮ > Edit Config**.
1. Expand the **Labels & Annotations** section.
1. Click **Add Annotation**.
1. Add an annotation to the cluster with the format `capabilities/<capability>: <value>` where `value` is the cluster capability that will be overridden by the annotation. In this scenario, Rancher is not aware of any capabilities of the cluster until you add the annotation.
1. Click **Save**.

**Result:** The annotation does not give the capabilities to the cluster, but it does indicate to Rancher that the cluster has those capabilities.
