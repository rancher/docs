---
title: Migration Tools CLI Reference
weight: 100
---

The migration-tools CLI includes multiple commands and options to assist your migration from Rancher v1.6 to Rancher v2.x.

## Download

The migration-tools CLI for your platform can be downloaded from our [GitHub releases page](https://github.com/rancher/migration-tools/releases). The tool is available for Linux, Mac, and Windows platforms.

## Usage

```
migration-tools [global options] command [command options] [arguments...]
```

## Migration Tools Global Options

The migration-tools CLI includes a handful of global options.

| Global Option     | Description                                  |
| ----------------- | -------------------------------------------- |
| `--debug`         | Enables debug logging.                       |
| `--log <VALUE>`   | Outputs logs to the path you enter.          |
| `--help`, `-h`    | Displays a list of all commands available.   |
| `--version`, `-v` | Prints the version of migration-tools CLI in use.|

## Commands and Command Options

### Migration-Tools Export Reference

The `migration-tools export` command exports all stacks from your Rancher v1.6 server into Compose files.

#### Options

| Option | Required? | Description|
| --- | --- |--- |
|`--url <VALUE>` | ✓ | Rancher API endpoint URL (`<RANCHER_URL>`). |
|`--access-key <VALUE>` | ✓ | Rancher API access key. Using an account API key exports all stacks from all cattle environments (`<RANCHER_ACCESS_KEY>`). |
|`--secret-key <VALUE>` | ✓ | Rancher API secret key associated with the access key. (`<RANCHER_SECRET_KEY>`). |
|`--export-dir <VALUE>` |   | Base directory that Compose files export to under sub-directories created for each environment/stack (default: `Export`). |
|`--all`, `--a`          |   | Export all stacks. Using this flag exports any stack in a state of inactive, stopped, or removing. |
|`--system`, `--s`       |   | Export system and infrastructure stacks. |


#### Usage

Execute the following command, replacing each placeholder with your values. The access key and secret key are Account API keys, which will allow you to export from all Cattle environments.

```
migration-tools export --url <RANCHER_URL> --access-key <RANCHER_ACCESS_KEY> --secret-key <RANCHER_SECRET_KEY> --export-dir <EXPORT_DIR>
```

**Result:** The migration-tools CLI exports Compose files for each stack in every Cattle environments in the `--export-dir` directory. If you omitted this option, the files are saved to your current directory.

### Migration-Tools Parse Reference

The `migration-tools parse` command parses the Compose files for a stack and uses [Kompose](https://github.com/kubernetes/kompose) to generate an equivalent Kubernetes manifest. It also outputs an `output.txt` file, which lists all the constructs that will need manual intervention in order to be converted to Kubernetes.

#### Options

| Option | Required? | Description
| ---|---|---
|`--docker-file <VALUE>` |  | Parses Docker Compose file to output Kubernetes manifest(default: `docker-compose.yml`)
|`--output-file <VALUE>` |  | Name of file that outputs listing checks and advice for conversion (default: `output.txt`).
|`--rancher-file <VALUE>` |  | Parses Rancher Compose file to output Kubernetes manifest(default: `rancher-compose.yml`)

#### Subcommands

| Subcommand | Description |
| ---|---|
| `help`, `h` |   Shows a list of options available for use with preceding command. |

#### Usage

Execute the following command, replacing each placeholder with the absolute path to your Stack's Compose files. For each stack, you'll have to re-run the command for each pair of Compose files that was exported.

```
migration-tools parse --docker-file <DOCKER_COMPOSE_ABSOLUTE_PATH> --rancher-file <RANCHER_COMPOSE_ABSOLUTE_PATH>
```

>**Note:** If you omit the `--docker-file` and `--rancher-file` options from your command, the migration-tools CLI checks its home directory for these Compose files.

**Result:** The migration-tools CLI parses your Compose files and outputs Kubernetes manifest specs as well as an `output.txt` file. For each service in the stack, a Kubernetes manifest is created and named the same as your service. The `output.txt` file lists all constructs for each service in `docker-compose.yml` that requires special handling to be successfully migrated to Rancher v2.x. Each construct links to the relevant blog articles on how to implement it in Rancher v2.x. 
