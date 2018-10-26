---
title: 2—Run the Migration Tool
weight: 100
---

To use the Migration Tool, run the command below while pointing to the compose files exported from each stack that you want to migrate. If you want to migrate multiple stacks, you'll have to re-run the command for each pair of compose files that you exported.

#### Usage

You can run the Migration Tool by entering the following command, replacing each placeholder with the absolute path to your Stack's compose files.

```
migration-tools --docker-file <DOCKER_COMPOSE_ABSOLUTE_PATH> --rancher-file <RANCHER_COMPOSE_ABSOLUTE_PATH>
```

#### Options

When using the Migration Tool, you can specify the paths to your Docker and Rancher compose files, regardless of where they are on your file system.

| Option                 | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `--docker-file <DOCKER_COMPOSE_ABSOLUTE_PATH>`  | The absolute path to an exported Docker compose file (default value: `docker-compose.yml`)<sup>1</sup>.   |
| `--rancher-file <RANCHER_COMPOSE_ABSOLUTE_PATH>` | The absolute path to an alternate Rancher compose file (default value: `rancher-compose.yml`)<sup>1</sup>. |
| `--help, -h`           | Lists usage for the Migration Tool.                                                                                |
| `--version, -v`        | Lists the version of the Migration Tool in use.                                                         |

><sup>1</sup> If you omit the `--docker-file` and `--rancher-file` options from your command, the migration tool will check its home directory for compose files.

#### Output

After you run the migration tool, the following files output to the same directory that you ran the tool from.


| Output                | Description                                                                                                                                                                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `output.txt`          | This file lists all constructs for each service in `docker-compose.yml` that requires special handling to be successfully migrated to Rancher 2.0. Each construct links to the relevant blog articles on how to implement it in Rancher 2.0 (these articles are also listed below). |
| Kubernetes YAML specs | The Migration Tool internally invokes [Kompose](https://github.com/kubernetes/kompose) to generate Kubernetes YAML specs for each service you're migrating to 2.0. Each YAML spec file is named for the service you're migrating.
