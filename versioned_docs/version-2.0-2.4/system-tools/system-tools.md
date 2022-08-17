---
title: System Tools
weight: 22
---

System Tools is a tool to perform operational tasks on [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) clusters or [installations of Rancher on an RKE cluster.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/) The tasks include:

* Collect logging and system metrics from nodes.
* Remove Kubernetes resources created by Rancher.

The following commands are available:

| Command | Description
|---|---
| [logs](#logs) | Collect Kubernetes cluster component logs from nodes.
| [stats](#stats) | Stream system metrics from nodes.
| [remove](#remove) | Remove Kubernetes resources created by Rancher.

# Download System Tools

You can download the latest version of System Tools from the [GitHub releases page](https://github.com/rancher/system-tools/releases/latest). Download the version of `system-tools` for the OS that you are using to interact with the cluster.

Operating System | Filename
-----------------|-----
MacOS            | `system-tools_darwin-amd64`
Linux            | `system-tools_linux-amd64`
Windows          | `system-tools_windows-amd64.exe`

After you download the tools, complete the following actions:

1. Rename the file to `system-tools`.

1. Give the file executable permissions by running the following command:

    > **Using Windows?**
    The file is already an executable, you can skip this step.

    ```
    chmod +x system-tools
    ```

# Logs

The logs subcommand will collect log files of core Kubernetes cluster components from nodes in [Rancher-launched Kubernetes clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) or nodes on an [RKE Kubernetes cluster that Rancher is installed on.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/). See [Troubleshooting]({{<baseurl>}}//rancher/v2.0-v2.4/en/troubleshooting/) for a list of core Kubernetes cluster components.

System Tools will use the provided kubeconfig file to deploy a DaemonSet, that will copy all the logfiles from the core Kubernetes cluster components and add them to a single tar file (`cluster-logs.tar` by default). If you only want to collect logging from a single node, you can specify the node by using `--node NODENAME` or `-n NODENAME`.

### Usage

```
./system-tools_darwin-amd64 logs --kubeconfig <KUBECONFIG>
```

The following are the options for the logs command:

| Option                                                 | Description
| ------------------------------------------------------ | ------------------------------------------------------
| `--kubeconfig <KUBECONFIG_PATH>, -c <KUBECONFIG_PATH>` | The cluster's kubeconfig file.
| `--output <FILENAME>, -o cluster-logs.tar`             | Name of the created tarball containing the logs. If no output filename is defined, the options defaults to `cluster-logs.tar`.
| `--node <NODENAME>, -n node1`                         | Specify the nodes to collect the logs from. If no node is specified, logs from all nodes in the cluster will be collected.

# Stats

The stats subcommand will display system metrics from nodes in [Rancher-launched Kubernetes clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) or nodes in an [RKE Kubernetes cluster that Rancher is installed on.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/).

System Tools will deploy a DaemonSet, and run a predefined command based on `sar` (System Activity Report) to show system metrics.

### Usage

```
./system-tools_darwin-amd64 stats --kubeconfig <KUBECONFIG>
```

The following are the options for the stats command:

| Option                                                 | Description
| ------------------------------------------------------ | ------------------------------
| `--kubeconfig <KUBECONFIG_PATH>, -c <KUBECONFIG_PATH>` | The cluster's kubeconfig file.
| `--node <NODENAME>, -n node1`                          | Specify the nodes to display the system metrics from. If no node is specified, logs from all nodes in the cluster will be displayed.
| `--stats-command value, -s value`                      | The command to run to display the system metrics. If no command is defined, the options defaults to `/usr/bin/sar -u -r -F 1 1`.

# Remove

>**Warning:** This command will remove data from your etcd nodes. Make sure you have created a [backup of etcd]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/backups) before executing the command.

When you install Rancher on a Kubernetes cluster, it will create Kubernetes resources to run and to store configuration data. If you want to remove Rancher from your cluster, you can use the `remove` subcommand to remove the Kubernetes resources. When you use the `remove` subcommand, the following resources will be removed:

- The Rancher deployment namespace (`cattle-system` by default).
- Any `serviceAccount`, `clusterRoles`, and `clusterRoleBindings` that Rancher applied the `cattle.io/creator:norman` label to. Rancher applies this label to any resource that it creates as of v2.1.0.
- Labels, annotations, and finalizers.
- Rancher Deployment.
- Machines, clusters, projects, and user custom resource deployments (CRDs).
- All resources create under the `management.cattle.io` API Group.
- All CRDs created by Rancher v2.x.

>**Using 2.0.8 or Earlier?**
>
>These versions of Rancher do not automatically delete the `serviceAccount`, `clusterRole`, and `clusterRoleBindings` resources after the job runs. You'll have to delete them yourself.

### Usage

When you run the command below, all the resources listed [above](#remove) will be removed from the cluster.

>**Warning:** This command will remove data from your etcd nodes. Make sure you have created a [backup of etcd]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/backups) before executing the command.

```
./system-tools remove --kubeconfig <KUBECONFIG> --namespace <NAMESPACE>
```

The following are the options for the `remove` command:

| Option                                         | Description
| ---------------------------------------------- | ------------
| `--kubeconfig <KUBECONFIG_PATH>, -c <KUBECONFIG_PATH>` | The cluster's kubeconfig file
| `--namespace <NAMESPACE>, -n cattle-system`    | Rancher 2.x deployment namespace (`<NAMESPACE>`). If no namespace is defined, the options defaults to `cattle-system`.
| `--force`                                      | Skips the interactive removal confirmation and removes the Rancher deployment without prompt.
