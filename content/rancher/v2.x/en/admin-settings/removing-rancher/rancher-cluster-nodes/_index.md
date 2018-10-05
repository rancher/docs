---
title: Removing Rancher from Your Rancher Server Nodes
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
1. Find the kubeconfig file that was generated during your Rancher installation, `kube_config_rancher-cluster.yml`. Move it to the `~/.kube` on your workstation, if it isn't already there. Create this directory if it doesn't exist.

    System-tools uses this file to access your installation cluster.


### Using the System-Tool

System-tools is a utility for running operational tasks on Rancher clusters. In this use case, it will help you remove the Rancher from your installation nodes.

#### Usage

After you move the `system-tools` and kubeconfig file to your workstation's `~/.kube` directory, you can run system-tools by changing to the `~/.kube`  directory and entering the following command.

>**Warning:** This command will remove data from your etcd nodes. Make sure you have created a [backup of etcd]({{< baseurl >}}/rancher/v2.x/en/backups/backups) before executing the command.

```
./system-tools remove --kubeconfig <$KUBECONFIG> --namespace <NAMESPACE>
```

<br/>
When you run this command, the components listed in [What Gets Removed?](#what-gets-removed) are deleted.


##### Options

| Option                                         | Description                                                                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `--kubeconfig <KUBECONFIG_PATH>, -c <KUBECONFIG_PATH>` | The cluster's kubeconfig file absolute path, usually `~/.kube/kube_config_rancher-cluster.yml`.<sup>1</sup>    |
| `--namespace <NAMESPACE>, -n cattle-system`    | Rancher 2.x deployment namespace (`<NAMESPACE>`). If no namespace is defined, the options defaults to `cattle-system`. |
| `--force`                                      | Skips the the interactive removal confirmation and removes the Rancher deployment without prompt.                      |

> <sup>1</sup> If you are working with multiple Kubernetes clusters, you can place  `kube_config_rancher-cluster.yml` in another directory path and then set the `KUBECONFIG` environment variable to its path.
>```
>export KUBECONFIG=$(pwd)/kube_config_rancher-cluster.yml
>```

## What Gets Removed?

When removing Rancher from server nodes launched using RKE, the following components are deleted.


- The Rancher deployment namespace (`cattle-system` by default).
- Any `serviceAccount`, `clusterRoles`, and `clusterRoleBindings` that Rancher applied the `cattle.io/creator:norman` label to. Rancher applies this label to any resource that it creates as of v2.1.0.  
- Labels, annotations, and finalizers.
- Rancher Deployment.
- Machines, clusters, projects, and user custom resource deployments (CRDs).
- All resources create under the `management.cattle.io` API Group.
- All CRDs created by Rancher v2.0.x.


>**Using 2.0.8 or Earlier?**
>
>These versions of Rancher do not automatically delete the `serviceAccount`, `clusterRole`, and `clusterRoleBindings` resources after the job runs. You'll have to delete them yourself.
