---
title: Migration Tools CLI Reference
weight: 100
---

The migration-tools CLI includes multiple commands and options to assist your migration from v1.6 to v2.0. This reference to find out what commands and options are available when using .

## Download

The migration-tools CLI for your platform can be downloaded from our [GitHub releases page](https://github.com/rancher/migration-tools/releases). The tool is available for Linux, Mac, and Windows platforms.

## Usage

```
migration-tools [global options] command [command options] [arguments...]
```

## Global Options

The migration-tools CLI includes a handful of options that can be used regardless of which commands you are using. These options are not required to run the tool. Rather, they're useful for troubleshooting.

| Global Option     | Description                                  |
| ----------------- | -------------------------------------------- |
| `--debug`         | Enables debug logging.                       |
| `--log <VALUE>`   | Outputs logs to the path you enter.          |
| `--help`, `-h`    | Displays a list of all commands available.   |
| `--version`, `-v` | Prints the version of migration-tools CLI in use.|


## Commands and Command Options

This section contains reference material for commands and options available for the migration-tools CLI.

Command | Options | Required? | Description
--------|---------|-------------|-----
`export`|         | N/A | Exports Compose files for every Stack running in a Cattle environment in Rancher v1.6.
        |`--url <VALUE>` | ✓ | Rancher API endpoint URL (`<RANCHER_URL>`).
        |`--access-key <VALUE>` | ✓ | Rancher API access key. Using an admin [API key]({{< baseurl >}}/rancherv2.x/en/user-settings/api-keys) exports stacks from all cattle environments (`<RANCHER_ACCESS_KEY>`).
        |`--secret-key <VALUE>` | ✓ | Rancher [API secret key]({{< baseurl >}}/rancherv2.x/en/user-settings/api-keys) (`<RANCHER_SECRET_KEY>`).
        |`--export-dir <VALUE>` |   | Base directory that Compose files export to under sub-directories created for each environment/stack (default: `Export`).
        |`--all`, `--a`          |   | Export all stacks. Using this flag exports any stack in a state of inactive, stopped, or removing.
        |`--system`, `--s`       |   | Export system and infrastructure stacks.
`parse` |         | N/A | Parse Docker Compose and Rancher Compose files to get Kubernetes manifests.
        |`--docker-file <VALUE>` |  | Parses Docker Compose file to output Kubernetes manifest (default: `docker-compose.yml`)
        |`--output-file <VALUE>` |  | Name of file that outputs listing checks and advice for conversion (default: `output.txt`).
        |`--rancher-file <VALUE>` |  | Parses Rancher Compose file to output Kubernetes manifest (default: `rancher-compose.yml`)
`help`, `h` |     | N/A | Shows a list of options available for use with preceding command.
