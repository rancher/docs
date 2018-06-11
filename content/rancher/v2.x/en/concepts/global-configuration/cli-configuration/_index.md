---
title: Rancher CLI Configuration
weight: 1
---

Rancher CLI (Command Line Interface) is a unified tool that you can use to manage Rancher Server. With this tool, you can operate Rancher using command line rather than GUI.

### Download Rancher CLI

You can download Rancher CLI from [GitHub](https://github.com/rancher/cli/releases). Download the version of Rancher CLI that corresponds with your version of Rancher Server.

>**Note:** Rancher CLI only works with its corresponding Rancher Server release. Rancher Server and Rancher CLI installations that don't share the same version are incompatible.

### Configuration Requirements

After you download Rancher CLI, you need to make a few configurations. Rancher CLI requires:

- Your [Rancher Server URL]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/server-url), which is used to connect to Rancher Server.
- An [API token]({{< baseurl >}}/rancher/v2.x/en/tasks/user-settings/api-keys), which is used to authenticate with Rancher.

### Common Usage

Begin using Rancher CLI by logging into your Rancher Server. Log in using the following command (replace `<BEARER_TOKEN>` and `<SERVER_URL>` with your information):

```bash
$ ./rancher login https://<SERVER_URL> -t <BEARER_TOKEN>
```

If Rancher Server uses a self-signed certificate, Rancher CLI prompts you to continue with the connection.

Rancher CLI uses a _context_ to determine what resources to fetch when running commands. Context is another name for the cluster/project that's currently in focus.

The `./rancher context switch` command displays a list of contexts available and allows the user to change contexts.

**Other Common Commands:**

* `rancher ps`
   
    Lists workloads in the current context.

* `rancher clusters`
   
    Lists all clusters in the current context.

* `rancher kubectl` 

    Runs `kubectl` commands against the cluster. This command requires `kubectl` to be installed. However Rancher, CLI will pull the kubeconfig.

### Rancher CLI Help

Once logged into Rancher Server using the CLI, enter `./rancher --help` for a list of commands.

All commands accept the `--help` flag, which documents each command's usage.