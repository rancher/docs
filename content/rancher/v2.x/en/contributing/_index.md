---
title: Contributing to Rancher
weight: 9000
aliases:
  - /rancher/v2.x/en/faq/contributing/
---

### Repositories

All of repositories are located within our main GitHub organization. There are many repositories used for Rancher, but we'll provide descriptions of some of the main ones used in Rancher.

Repository | URL | Description
-----------|-----|-------------
Rancher | https://github.com/rancher/rancher | This repository is the main source code for Rancher 2.x.
Types | https://github.com/rancher/types | This repository is the repository that has all the API types for Rancher 2.x.
API Framework | https://github.com/rancher/norman | This repository is an API framework for building Rancher style APIs backed by Kubernetes Custom Resources.
User Interface | https://github.com/rancher/ui | This repository is the source of the UI.
(Rancher) Docker Machine | https://github.com/rancher/machine | This repository is the source of the Docker Machine binary used when using Node Drivers. This is a fork of the `docker/machine` repository.
machine-package | https://github.com/rancher/machine-package | This repository is used to build the Rancher Docker Machine binary.
kontainer-engine | https://github.com/rancher/kontainer-engine | This repository is the source of kontainer-engine, the tool to provision hosted Kubernetes clusters.
RKE repository | https://github.com/rancher/rke | This repository is the source of Rancher Kubernetes Engine, the tool to provision Kubernetes clusters on any machine.
CLI | https://github.com/rancher/cli | This repository is the source code for the Rancher CLI used in Rancher 2.x.
(Rancher) Helm repository | https://github.com/rancher/helm | This repository is the source of the packaged Helm binary. This is a fork of the `helm/helm` repository.
Telemetry repository | https://github.com/rancher/telemetry | This repository is the source for the Telemetry binary.
loglevel repository | https://github.com/rancher/loglevel | This repository is the source of the loglevel binary, used to dynamically change log levels.

To see all libraries/projects used in Rancher, see the `vendor.conf` in the `rancher/rancher` repository.

![Rancher diagram]({{< baseurl >}}/img/rancher/ranchercomponentsdiagram.svg)<br/>
<sup>Rancher components used for provisioning/managing Kubernetes clusters.</sup>

### Building

Every repository should have a Makefile and can be built using the `make` command. The `make` targets are based on the scripts in the `/scripts` directory in the repository (plus additional `trash` commands, please see below for more information about using `trash`), and each target will use [Dapper](https://github.com/rancher/dapper) to run the target in an isolated environment. The `Dockerfile.dapper` will be used for this process, and includes all the necessary build tooling needed.

The default target is `ci`, and will run `./scripts/validate`, `./scripts/build`, `./scripts/test` and `./scripts/package`. The resulting binaries of the build will be in `./build/bin` and are usually also packaged in a Docker image.

Dependencies on other libraries/projects are managed using [Trash](https://github.com/rancher/trash). See the [Trash README](https://github.com/rancher/trash/blob/master/README.md) to discover how it can be used. In short, it uses a `vendor.conf` file to specify the source repository and revision to fetch, checkout and copy to the `./vendor` directory. After updating `vendor.conf`, you can run `make trash` to update dependencies for your change. When the dependencies are updated, you can build the project again using `make` so that it will be built using the updated dependencies.

### Bugs, Issues or Questions

If you find any bugs or are having any trouble, please search the [reported issue](https://github.com/rancher/rancher/issues) as someone may have experienced the same issue or we are actively working on a solution.

If you can't find anything related to your issue, contact us by [filing an issue](https://github.com/rancher/rancher/issues/new). Though we have many repositories related to Rancher, we want the bugs filed in the Rancher repository so we won't miss them! If you want to ask a question or ask fellow users about an use case, we suggest creating a post on the [Rancher Forums](https://forums.rancher.com).

Please follow this checklist when filing an issue which will helps us investigate and fix the issue. More info means more data we can use to determine what is causing the issue or what might be related to the issue.

>**Note:** For large amounts of data, please use [GitHub Gist](https://gist.github.com/) or similar and link the created resource in the issue.
>**Important:** Please remove any sensitive data as it will be publicly viewable.

- Provide as much as detail as possible on the used resources. As the source of the issue can be many things, including as much of detail as possible helps to determine the root cause. See some examples below:
  - Hosts (What specifications does the host have, like CPU/memory/disk, what cloud does it happen on, what Amazon Machine Image are you using, what DigitalOcean droplet are you using, what image are you provisioning that we can rebuild or use when we try to reproduce)
  - Operating System (What operating system are you using. Providing specifics helps here like the output of `cat /etc/os-release` for exact OS release and `uname -r` for exact kernel used)
  - Docker (What Docker version are you using, how did you install it? Most of the details of Docker can be found by supplying output of `docker version` and `docker info`)
  - Environment (Are you in a proxy environment, are you using recognized CA/self signed certificates, are you using an external loadbalancer)
  - Rancher (What version of Rancher are you using, this can be found on the bottom left of the UI or be retrieved from the image tag you are running on the host)
  - Clusters (What kind of cluster did you create, how did you create it, what did you specify when you were creating it)
- Provide as much detail on how you got into the reported situation. This helps the person to reproduce the situation you are in.
  - Provide manual steps or automation scripts used to get from a newly created setup to the situation you reported.
- Provide data/logs from the used resources.
  - Rancher
      - Single node

        ```
        docker logs \
        --timestamps \
        $(docker ps | grep -E "rancher/rancher:|rancher/rancher " | awk '{ print $1 }')
        ```
      - High Availability (HA) install using `kubectl`

        > **Note:** Make sure you configured the correct kubeconfig (for example, `export KUBECONFIG=$PWD/kube_config_rancher-cluster.yml` for Rancher HA) or are using the embedded kubectl via the UI.

        ```
        kubectl -n cattle-system \
        logs \
        -l app=rancher \
        --timestamps=true
        ```
      - High Availability (HA) install using `docker` on each of the nodes in the RKE cluster

        ```
        docker logs \
        --timestamps \
        $(docker ps | grep -E "rancher/rancher@|rancher_rancher" | awk '{ print $1 }')
        ```
      - High Availability (HA) RKE Add-On Install

        > **Note:** Make sure you configured the correct kubeconfig (for example, `export KUBECONFIG=$PWD/kube_config_rancher-cluster.yml` for Rancher HA) or are using the embedded kubectl via the UI.

        ```
        kubectl -n cattle-system \
        logs \
        --timestamps=true \
        -f $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name="cattle-server") | .metadata.name')
        ```
  - System logging (these might not all exist, depending on operating system)
      - `/var/log/messages`
      - `/var/log/syslog`
      - `/var/log/kern.log`
  - Docker daemon logging (these might not all exist, depending on operating system)
      - `/var/log/docker.log`

If you are experiencing performance issues, please provide as much of data (files or screenshots) of metrics which can help determining what is going on. If you have an issue related to a machine, it helps to supply output of `top`, `free -m`, `df` which shows processes/memory/disk usage.

### Docs

If you have any updates to our documentation, please make any pull request to our docs repo.

- [Rancher 2.x Docs repository](https://github.com/rancher/docs): This repo is where all the docs for Rancher 2.x are located. They are located in the `content` folder in the repo.

- [Rancher 1.x Docs repository](https://github.com/rancher/rancher.github.io): This repo is where all the docs for Rancher 1.x are located. They are located in the `rancher` folder in the repo.
