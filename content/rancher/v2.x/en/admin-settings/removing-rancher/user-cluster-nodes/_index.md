---
title: Removing Rancher from User Cluster Nodes
weight: 2000
draft: true
---


When you no longer have use for Rancher in a cluster that you've [provisioned using Rancher]({{< baseurl >}}rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher), and you want to remove Rancher from its nodes, follow one of the sets of instructions below based on your [cluster type]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-options). The method you'll use to remove Rancher changes based on the type of cluster.

## Hosted Kubernetes Providers

To remove Rancher from , simply delete them from Rancher. The cluster will remove Rancher components through the Norman API (Rancher's API framework).

<!-- MB 9/19: I know this is probably BS, but I need to confirm with a dev on how to remove Rancher from a hosted cluster -->

## Nodes Launched by RKE / Nodes Hosted by a Provider

For clusters nodes provisioned using the following options, you can remove Rancher by downloading and running the Rancher [system-tools](https://github.com/rancher/system-tools/releases):

- [Nodes hosted by an IaaS]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#node-pools)
- [Custom nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#custom-nodes)
- [Nodes hosted by a Kubernetes Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#hosted-kubernetes-cluster)

### Using the System-Tool

System-tool is a utility that cleans up rancher projects. In this use case, it will help you remove the Rancher management plane from your cluster nodes. 

#### Usage

>**Warning:** This command will remove data from your nodes. Make sure you have created a backup of files you want to keep before executing the command, as data will be lost.

```
system-tools remove [command options] [arguments...]
```

##### Options

| Option                                         | Description                                                                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `--kubeconfig <$KUBECONFIG>, -c <$KUBECONFIG>` | The cluster's kubeconfig file absolute path (`<$KUBECONFIG>`).                                                         |
| `--namespace <NAMESPACE>, -n cattle-system`    | Rancher 2.x deployment namespace (`<NAMESPACE>`). If no namespace is defined, the options defaults to `cattle-system`. |
| `--force`                                      | Skips the the interactive removal confirmation and removes the Rancher deployment without prompt.                      |

## Imported Cluster

{{% tabs %}}
{{% tab "By UI / API" %}}
After you initiate the removal of an [imported cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#import-existing-cluster) using the Rancher UI (or API), the following events occur.

>**Warning:** This process will remove data from your nodes. Make sure you have created a backup of files you want to keep before executing the command, as data will be lost.

1. Rancher creates a `serviceAccount` that it uses to remove the cluster. This account is assigned the [clusterRole](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole) and [clusterRoleBinding](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding) permissions, which are required to remove the cluster. 

1. Using the `serviceAccount`, Rancher schedules and runs a [job](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/) that cleans the Rancher and Kubernetes components off of the node. This job also references the `serviceAccount` and its roles as dependencies, so the job deletes them before its completion. This process:

    - Removes the `cattle-system` namespace from the cluster.
    - Removes the `serviceAccount`, `clusterRole`, and `clusterRole` resources.
    - Cleans up all remaining namespaces in the cluster (i.e., removes finalizers, annotations, and labels).
 
    >**Using 2.0.7 or Earlier?**
    >
    >These versions of Rancher do not automatically delete the `serviceAccount`, `clusterRole`, and `clusterRole` resources after the job runs. You'll have to delete them yourself.

1. Rancher is removed from the cluster nodes. However, the cluster persists, running the native version of Kubernetes. 
{{% /tab %}}
{{% tab "By Script" %}}
Rather than cleaning 

>**Prerequisite:**
>
>Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

1. Open a web browser, navigate to [GitHub](https://github.com/rancher/rancher/blob/master/cleanup/user-cluster.sh), and download `user-cluster.sh`.

1. Open kubectl. 

1. Using kubectl, make the script executable by running the following command from the same directory as `user-cluster.sh`:

    ```
    chmod +x user-cluster.sh
    ```

1. **Air Gap Users Only:** Open `user-cluster.sh` and replace `yaml_url` with the URL in `user-cluster.yml`.

    If you aren't an air gap user, skip this step.

1. From the same directory, run the script:

    >**Tip:** 
    >
    >Add the `-dry-run` flag to preview the script's outcome without making changes.

    ```
    ./user-cluster.sh rancher/agent:latest
    ```


 
{{% /tab %}}

{{% /tabs %}}



