---
title: Rancher CLI Configuration
weight: 1
---

The CLI needs an API token and the URL of your server in order to start using it. Instructions for creating the API token and getting your server URL can be found at TODOMARK: Add a link to the docs on how to create an API key for the user to use in the CLI login

Begin using the CLI by running

```bash
$ rancher login -t <token> <server_URL>
```

If the rancher server is using a self signed cert the CLI will ask for confirmation to continue connecting to the server.

Once logged in run `rancher --help` for a list of commands

All commands accept the `--help` flag to further describe the usage

The CLI uses a context to determine what resources to fetch when running commands. A context is a cluster/project currently focused on.

`rancher context switch` displays a list of available contexts and allows user selection to change to context

Common Commands:

* `rancher ps` to show workloads in the current Context
* `rancher clusters` to view all clusters
* `rancher kubectl` runs kubectl commands against the cluster
(requires kubectl to be installed but CLI will pull the kubeconfig)