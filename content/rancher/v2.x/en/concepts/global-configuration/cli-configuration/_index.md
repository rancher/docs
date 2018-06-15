---
title: Rancher CLI 
weight: 1
---

Rancher CLI (Command Line Interface) is a unified tool that you can use to manage Rancher Server. With this tool, you can operate Rancher using command line rather than GUI.

### Download Rancher CLI

You can download Rancher CLI from [GitHub](https://github.com/rancher/cli/releases). Download the version of Rancher CLI that corresponds with your version of Rancher Server.

>**Note:** Rancher CLI only works with its corresponding Rancher Server release. Rancher Server and Rancher CLI installations that don't share the same version are incompatible.

### Requirements

After you download Rancher CLI, you need to make a few configurations. Rancher CLI requires:

- Your [Rancher Server URL]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/server-url), which is used to connect to Rancher Server.
- An API Bearer Token, which is used to authenticate with Rancher. For more information about obtaining a Bearer Token, see [Creating an API Key]({{< baseurl >}}/rancher/v2.x/en/tasks/user-settings/api-keys/_index.md).

### CLI Authentication

Before you can use Rancher CLI to control your Rancher Server, you must authenticate using an API Bearer Token. Log in using the following command (replace `<BEARER_TOKEN>` and `<SERVER_URL>` with your information):

```bash
$ ./rancher login https://<SERVER_URL> -t <BEARER_TOKEN>
```

If Rancher Server uses a self-signed certificate, Rancher CLI prompts you to continue with the connection.

### Project Selection

To select a [cluster]({{< baseurl >}}/rancher/v2.x/en/concepts/clusters/) or [project]({{< baseurl >}}/rancher/v2.x/en/concepts/projects/) to work on, use the command `./rancher context switch`. When you enter this command, a list of available projects displays. Enter a number to choose your project.

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

- `apps, [app]`
              
    Operations with apps.
  
- `catalog`

    Operations with catalogs.

- `clusters, [cluster]`

    Operations on clusters.

- `context`

    Operations for the context.

- `inspect`

    View details of resources.

- `kubectl`
  
    Run kubectl commands.

- `login, [l]`

    Login to a Rancher Server.

- `namespaces, [namespace]`

    Operations on namespaces.

- `nodes, [node]`

    Operations on nodes.

- `projects, [project]`

    Operations on projects.

- `ps`

    Show workloads in a project.

- `settings, [setting]`

    Show settings for the current server.

- `ssh` 

    SSH into a node.

- `help, [h]`

    Shows a list of commands or help for one command.

### Rancher CLI Help

Once logged into Rancher Server using the CLI, enter `./rancher --help` for a list of commands.

All commands accept the `--help` flag, which documents each command's usage.