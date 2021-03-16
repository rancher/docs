---
title: Using the Rancher Command Line Interface 
description: The Rancher CLI is a unified tool that you can use to interact with Rancher. With it, you can operate Rancher using a command line interface rather than the GUI
metaTitle: "Using the Rancher Command Line Interface "
metaDescription: "The Rancher CLI is a unified tool that you can use to interact with Rancher. With it, you can operate Rancher using a command line interface rather than the GUI"
weight: 21
aliases:
  - /rancher/v2.5/en/cluster-admin/cluster-access/cli
---

The Rancher CLI (Command Line Interface) is a unified tool that you can use to interact with Rancher. With this tool, you can operate Rancher using a command line rather than the GUI.

### Download Rancher CLI

The binary can be downloaded directly from the UI. The link can be found in the right hand side of the footer in the UI. We have binaries for Windows, Mac, and Linux. You can also check the [releases page for our CLI](https://github.com/rancher/cli/releases) for direct downloads of the binary.

### Requirements

After you download the Rancher CLI, you need to make a few configurations. Rancher CLI requires:

- Your Rancher Server URL, which is used to connect to Rancher Server.
- An API Bearer Token, which is used to authenticate with Rancher. For more information about obtaining a Bearer Token, see [Creating an API Key]({{<baseurl>}}/rancher/v2.5/en/user-settings/api-keys/).

### CLI Authentication

Before you can use Rancher CLI to control your Rancher Server, you must authenticate using an API Bearer Token. Log in using the following command (replace `<BEARER_TOKEN>` and `<SERVER_URL>` with your information):

```bash
$ ./rancher login https://<SERVER_URL> --token <BEARER_TOKEN>
```

If Rancher Server uses a self-signed certificate, Rancher CLI prompts you to continue with the connection.

### Project Selection

Before you can perform any commands, you must select a Rancher project to perform those commands against. To select a [project]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/projects-and-namespaces/) to work on, use the command `./rancher context switch`. When you enter this command, a list of available projects displays. Enter a number to choose your project.

**Example: `./rancher context switch` Output**
```
User:rancher-cli-directory user$ ./rancher context switch
NUMBER    CLUSTER NAME   PROJECT ID              PROJECT NAME   
1         cluster-2      c-7q96s:p-h4tmb         project-2      
2         cluster-2      c-7q96s:project-j6z6d   Default        
3         cluster-1      c-lchzv:p-xbpdt         project-1      
4         cluster-1      c-lchzv:project-s2mch   Default       
Select a Project:
```

After you enter a number, the console displays a message that you've changed projects.

```
INFO[0005] Setting new context to project project-1
INFO[0005] Saving config to /Users/markbishop/.rancher/cli2.json
```

### Commands

The following commands are available for use in Rancher CLI.

| Command  | Result  |
|---|---|
| `apps, [app]`  | Performs operations on catalog applications (i.e. individual [Helm charts](https://docs.helm.sh/developing_charts/) or Rancher charts.  |
| `catalog`  | Performs operations on [catalogs]({{<baseurl>}}/rancher/v2.5/en/catalog/).  |
| `clusters, [cluster]`  | Performs operations on your [clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/).  |
| `context`  | Switches between Rancher [projects]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/projects-and-namespaces/). For an example, see [Project Selection](#project-selection).  |
| `inspect [OPTIONS] [RESOURCEID RESOURCENAME]`  | Displays details about [Kubernetes resources](https://kubernetes.io/docs/reference/kubectl/cheatsheet/#resource-types) or Rancher resources (i.e.: [projects]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/projects-and-namespaces/) and [workloads]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/workloads/)). Specify resources by name or ID.  |
| `kubectl`  |Runs [kubectl commands](https://kubernetes.io/docs/reference/kubectl/overview/#operations).   |
| `login, [l]`  | Logs into a Rancher Server. For an example, see [CLI Authentication](#cli-authentication).  |
| `namespaces, [namespace]`  |Performs operations on namespaces.   |
| `nodes, [node]`  |Performs operations on nodes.   |
| `projects, [project]`  | Performs operations on [projects]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/projects-and-namespaces/).  |
| `ps`  | Displays [workloads]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/workloads) in a project.  |
| `settings, [setting]`  | Shows the current settings for your Rancher Server.  |
| `ssh`  | Connects to one of your cluster nodes using the SSH protocol.  |
| `help, [h]`  | Shows a list of commands or help for one command.  |


### Rancher CLI Help

Once logged into Rancher Server using the CLI, enter `./rancher --help` for a list of commands.

All commands accept the `--help` flag, which documents each command's usage.
