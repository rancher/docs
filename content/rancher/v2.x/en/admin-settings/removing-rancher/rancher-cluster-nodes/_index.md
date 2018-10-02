---
title: Removing Rancher from Rancher Server Nodes
weight: 2000
---

When you want to remove Rancher from your [installation cluster]({{< baseurl >}}/rancher/v2.x/en/installation/ha/) as part of a Rancher reinstall (or uninstall), follow the instructions below to download and run _system-tools_, a utility that removes all Rancher components from Rancher Server nodes provisioned by RKE.

### Download and Configuration

You can download the latest version of Rancher system-tools from its GitHub [releases page](https://github.com/rancher/system-tools/releases). Download the version of system-tools for the OS that you're running the tool from.

Operating System | File
-----------------|-----
MacOS            | `system-tools_darwin-amd64`
Linux            | `system-tools_linux-amd64`
Windows          | `system-tools_windows-amd64.exe`

<br>

After you download the tools, complete the following actions:

1. Rename the file to `system-tools`.

1. Give the file executable permissions by running the following command:

    ```
    chmod +x system-tools
    ```
1. Download the Kubeconfig File for your Rancher installation cluster and place it in the `/.kube/config` on your workstation. System-tools uses this file to access your installation cluster.

    For instructions on how to download the Kubeconfig file, see [Accessing Clusters with kubectl and a kubeconfig File]({{< baseurl >}}rancher/v2.x/en/k8s-in-rancher/kubectl/#accessing-clusters-with-kubectl-and-a-kubeconfig-file).

1. Move `system-tools` to the same directory as the kubeconfig file: `~/.kube/config`.
 
### Using the System-Tool

System-tools is a utility for running operational tasks on Rancher clusters. In this use case, it will help you remove the Rancher from your installation nodes.

#### Usage

After you move the `system-tools` and kubeconfig file to your workstation's `~/.kube/config` directory, you can run system-tools by changing to the `~/.kube/config`  directory and entering the following command.

>**Warning:** This command will remove data from your etcd nodes. Make sure you have created a [backup of etcd]({{< baseurl >}}/rancher/v2.x/en/backups/backups) before executing the command.

```
./system-tools remove --kubeconfig <$KUBECONFIG> --namespace <NAMESPACE>
```

<br/>
When you run this command, the components listed in [What Gets Removed?](#what-gets-removed) are deleted.


##### Options

| Option                                         | Description                                                                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `--kubeconfig <$KUBECONFIG>, -c <$KUBECONFIG>` | The cluster's kubeconfig file absolute path (`<$KUBECONFIG>`).                                                         |
| `--namespace <NAMESPACE>, -n cattle-system`    | Rancher 2.x deployment namespace (`<NAMESPACE>`). If no namespace is defined, the options defaults to `cattle-system`. |
| `--force`                                      | Skips the the interactive removal confirmation and removes the Rancher deployment without prompt.                      |


## What Gets Removed?

When removing Rancher from server nodes provisioned using RKE, the following components are deleted.


- The Rancher deployment namespace (`cattle-system` by default).
- `serviceAccount`, `clusterRoles`, and `clusterRoleBindings` labeled by Rancher.  
- Labels, Annotations, and Finalizers.
- Rancher Deployment.
- Machines, clusters, projects, and user custom resource deployments (CRDs).
- All resources create under the `management.cattle.io` API Group.
- All CRDs created by Rancher v2.0.x.


>**Using 2.0.8 or Earlier?**
>
>These versions of Rancher do not automatically delete the `serviceAccount`, `clusterRole`, and `clusterRoleBindings` resources after the job runs. You'll have to delete them yourself.