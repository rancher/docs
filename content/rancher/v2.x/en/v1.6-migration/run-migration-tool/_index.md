---
title: 2—Run the Migration Tool
weight: 100
---

To help with migration from 1.6 to 2.0, Rancher has developed a Migration Tool. This tool checks if your Rancher 1.6 applications can be migrated to 2.0. If an application can't be migrated, the tool will help you identify what's lacking.

The Migration Tool analyzes Docker Compose config files (i.e., `docker-compose.yml` and `rancher-compose.yml`) that you've exported from your Rancher 1.6 Stacks.
It then outputs a list of constructs present in the Compose files that are unsupported in Rancher 2.0. These constructs require special handling or are parameters that cannot be converted to Kubernetes YAML.

## Outline

<!-- TOC -->

- [A. Download the Migration Tool](#a-download-the-migration-tool)
- [B. Configure the Migration Tool](#b-configure-the-migration-tool)
- [C. Run the Migration Tool](#c-run-the-migration-tool)

<!-- /TOC -->

## A. Download the Migration Tool

The Migration Tool for your platform can be downloaded from its [GitHub releases page](https://github.com/rancher/migration-tools/releases). The tool is available for Linux, Mac, and Windows platforms.

## B. Configure the Migration Tool

After the tool is downloaded, you need to make some configurations to run it.

1. Modify the Migration Tool file to make it an executable.

    1. Open Terminal and change to the directory that contains the Migration Tool file.

    1. Rename the Migration Tool file to `migration-tools` so that it no longer includes the platform name.

    1. Enter the following command to make `migration-tools` an executable:

        ```
        chmod +x migration-tools
        ```
1. Export the configuration for each Rancher 1.6 Stack that you want to migrate to 2.0.

    1. Log into Rancher 1.6 and select **Stacks > All**.

    1. From the **All Stacks** page, select  **Ellipsis (...) > Export Config** for each Stack that you want to migrate.

    1. Extract the downloaded `compose.zip`. Move the folder contents (`docker-compose.yml` and `rancher-compose.yml`) into the same directory as `migration-tools`.

## C. Run the Migration Tool

To use the Migration Tool, run the command below while pointing to the compose files exported from each stack that you want to migrate. If you want to migrate multiple stacks, you'll have to re-run the command for each pair of compose files that you exported.


### Usage

You can run the Migration Tool by entering the following command, replacing each placeholder with the absolute path to your Stack's compose files.

```
migration-tools --docker-file <DOCKER_COMPOSE_ABSOLUTE_PATH> --rancher-file <RANCHER_COMPOSE_ABSOLUTE_PATH>
```

### Options

When using the Migration Tool, you can specify the paths to your Docker and Rancher compose files, regardless of where they are on your file system.

| Option                 | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `--docker-file <DOCKER_COMPOSE_ABSOLUTE_PATH>`  | The absolute path to an exported Docker compose file (default value: `docker-compose.yml`)<sup>1</sup>.   |
| `--rancher-file <RANCHER_COMPOSE_ABSOLUTE_PATH>` | The absolute path to an alternate Rancher compose file (default value: `rancher-compose.yml`)<sup>1</sup>. |
| `--help, -h`           | Lists usage for the Migration Tool.                                                                                |
| `--version, -v`        | Lists the version of the Migration Tool in use.                                                         |

><sup>1</sup> If you omit the `--docker-file` and `--rancher-file` options from your command, the migration tool will check its home directory for compose files.

### Output

After you run the Migration Tool, the following files output to the same directory that you ran the tool from.


| Output                | Description                                                                                                                                                                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `output.txt`          | This file lists all constructs for each service in `docker-compose.yml` that requires special handling to be successfully migrated to Rancher 2.0. Each construct links to the relevant blog articles on how to implement it in Rancher 2.0 (these articles are also listed below). |
| Kubernetes YAML specs | The Migration Tool internally invokes [Kompose](https://github.com/kubernetes/kompose) to generate Kubernetes YAML specs for each service you're migrating to 2.0. Each YAML spec file is named for the service you're migrating.


### What Do I Do with `output.txt`?

View the output in your favorite text editor. This file lists each construct you need to migrate manually. Instructions for helping migrate these constructs are available in future sections.

>**Note:** Some constructs cannot be migrated without assistance from Rancher support. If `output.txt` includes a section about obtaining help from Rancher support, browse to [our website](https://rancher.com/contact/) and click the Support button. Complete the form. A support representative will contact you shortly.

### [Next: Migrate 1.6 Apps to 2.0]({{< baseurl >}} /rancher/v2.x/en/v1.6-migration/migrate-apps)