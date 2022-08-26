---
title: CLI with Rancher
description: Interact with Rancher using command line interface (CLI) tools from your workstation.
weight: 21
---

- [Rancher CLI](#rancher-cli)
  - [Download Rancher CLI](#download-rancher-cli)
  - [Requirements](#requirements)
  - [CLI Authentication](#cli-authentication)
  - [Project Selection](#project-selection)
  - [Commands](#commands)
  - [Rancher CLI Help](#rancher-cli-help)
  - [Limitations](#limitations)
- [kubectl](#kubectl)
  - [kubectl Utility](#kubectl-utility)
  - [Authentication with kubectl and kubeconfig Tokens with TTL](#authentication-with-kubectl-and-kubeconfig-tokens-with-ttl) 

# Rancher CLI

The Rancher CLI (Command Line Interface) is a unified tool that you can use to interact with Rancher. With this tool, you can operate Rancher using a command line rather than the GUI.

### Download Rancher CLI

The binary can be downloaded directly from the UI. The link can be found in the right hand side of the footer in the UI. We have binaries for Windows, Mac, and Linux. You can also check the [releases page for our CLI](https://github.com/ranchcli/releases) for direct downloads of the binary.

1. In the upper left corner, click **☰**.
1. At the bottom, click **v2.6.x**, where **v2.6.x** is a hyperlinked text indicating the installed Rancher version.
1. Under the **CLI Downloads section**, there are links to download the binaries for Windows, Mac, and Linux. You can also check the [releases page for our CLI](https://github.com/ranchcli/releases) for direct downloads of the binary.

### Requirements

After you download the Rancher CLI, you need to make a few configurations. Rancher CLI requires:

- Your Rancher Server URL, which is used to connect to Rancher Server.
- An API Bearer Token, which is used to authenticate with Rancher. For more information about obtaining a Bearer Token, see [Creating an API Key](../reference-guides/user-settings/api-keys.md).

### CLI Authentication

Before you can use Rancher CLI to control your Rancher Server, you must authenticate using an API Bearer Token. Log in using the following command (replace `<BEARER_TOKEN>` and `<SERVER_URL>` with your information):

```bash
$ ./rancher login https://<SERVER_URL> --token <BEARER_TOKEN>
```

If Rancher Server uses a self-signed certificate, Rancher CLI prompts you to continue with the connection.

### Project Selection

Before you can perform any commands, you must select a Rancher project to perform those commands against. To select a [project](../how-to-guides/advanced-user-guides/manage-clusters/projects-and-namespaces.md) to work on, use the command `./rancher context switch`. When you enter this command, a list of available projects displays. Enter a number to choose your project.

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
INFO[0005] Saving config to /Users/markbishop/.ranchcli2.json
```

Ensure you can run `rancher kubectl get pods` successfully.

### Commands

The following commands are available for use in Rancher CLI.

| Command  | Result  |
|---|---|
| `apps, [app]`  | Performs operations on catalog applications (i.e., individual [Helm charts](https://docs.helm.sh/developing_charts/)) or Rancher charts.  |
| `catalog`  | Performs operations on [catalogs]({{<baseurl>}}/rancher/v2.6/helm-charts).  |
| `clusters, [cluster]`  | Performs operations on your [clusters](kubernetes-clusters-in-rancher-setup.md).  |
| `context`  | Switches between Rancher [projects](../how-to-guides/advanced-user-guides/manage-clusters/projects-and-namespaces.md). For an example, see [Project Selection](#project-selection).  |
| `inspect [OPTIONS] [RESOURCEID RESOURCENAME]`  | Displays details about [Kubernetes resources](https://kubernetes.io/docs/reference/kubectl/cheatsheet/#resource-types) or Rancher resources (i.e.: [projects](../how-to-guides/advanced-user-guides/manage-clusters/projects-and-namespaces.md) and [workloads](workloads-and-pods.md)). Specify resources by name or ID.  |
| `kubectl`  |Runs [kubectl commands](https://kubernetes.io/docs/reference/kubectl/overview/#operations).   |
| `login, [l]`  | Logs into a Rancher Server. For an example, see [CLI Authentication](#cli-authentication).  |
| `namespaces, [namespace]`  |Performs operations on namespaces.   |
| `nodes, [node]`  |Performs operations on nodes.   |
| `projects, [project]`  | Performs operations on [projects](../how-to-guides/advanced-user-guides/manage-clusters/projects-and-namespaces.md).  |
| `ps`  | Displays [workloads](workloads-and-pods.md) in a project.  |
| `settings, [setting]`  | Shows the current settings for your Rancher Server.  |
| `ssh`  | Connects to one of your cluster nodes using the SSH protocol.  |
| `help, [h]`  | Shows a list of commands or help for one command.  |


### Rancher CLI Help

Once logged into Rancher Server using the CLI, enter `./rancher --help` for a list of commands.

All commands accept the `--help` flag, which documents each command's usage.

### Limitations

The Rancher CLI **cannot** be used to install [dashboard apps or Rancher feature charts](helm-charts-in-rancher.md).

# kubectl

Interact with Rancher using kubectl.

### kubectl Utility

Install the `kubectl` utility. See [install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Configure kubectl by visiting your cluster in the Rancher Web UI, clicking on `Kubeconfig`, copying contents, and putting them into your `~/.kube/config` file.

Run `kubectl cluster-info` or `kubectl get pods` successfully.

### Authentication with kubectl and kubeconfig Tokens with TTL

_Requirements_

If admins have [enforced TTL on kubeconfig tokens](../reference-guides/about-the-api/api-tokens.md#setting-ttl-on-kubeconfig-tokens), the kubeconfig file requires the [Rancher CLI](cli-with-rancher.md) to be present in your PATH when you run `kubectl`. Otherwise, you’ll see an error like: 
`Unable to connect to the server: getting credentials: exec: exec: "rancher": executable file not found in $PATH`. 

This feature enables kubectl to authenticate with the Rancher server and get a new kubeconfig token when required. The following auth providers are currently supported: 

1. Local
2. Active Directory (LDAP only)
3. FreeIPA
4. OpenLDAP 
5. SAML providers: Ping, Okta, ADFS, Keycloak, Shibboleth 

When you first run kubectl, for example, `kubectl get pods`, it will ask you to pick an auth provider and log in with the Rancher server. 
The kubeconfig token is cached in the path where you run kubectl under `./.cache/token`. This token is valid until [it expires](../reference-guides/about-the-api/api-tokens.md#setting-ttl-on-kubeconfig-tokens-period), or [gets deleted from the Rancher server](../reference-guides/about-the-api/api-tokens.md#deleting-tokens). 
Upon expiration, the next `kubectl get pods` will ask you to log in with the Rancher server again. 
