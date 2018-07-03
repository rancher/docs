---
  title: Contributing to Rancher
  weight: 5001
---

### Repositories

All of repositories are located within our main GitHub organization. There are many repositories used for Rancher, but we’ll provide descriptions of some of the main ones used in Rancher.

- [Rancher Repo](https://github.com/rancher/rancher): This repository is the main source code for Rancher 2.x.

- [Rancher Types Repo](https://github.com/rancher/types): This repository is the repo that has all the API types for Rancher 2.x.

- [Rancher API Framework Repo](https://github.com/rancher/norman): This repository is an API framework for building Rancher style APIs backed by Kubernetes Custom Resources.

- [Rancher CLI Repo](https://github.com/rancher/cli): This repository is the source code for the Rancher CLI used in Rancher 2.x.


### Bugs, Issues or Questions

If you find any bugs or are having any trouble, please search the [reported issue](https://github.com/rancher/rancher/issues) as someone may have experienced the same issue or we are actively working on a solution.

If you can't find anything related to your issue, contact us by [filing an issue](https://github.com/rancher/rancher/issues/new). Though we have many repositories related to Rancher, we want the bugs filed in the Rancher repository so we won't miss them! If you want to ask a question or ask fellow users about an use case, we suggest creating a post on the [Rancher Forums](https://forums.rancher.com).

Please follow this checklist when filing an issue which will helps us investigate and fix the issue. More info means more data we can use to determine what is causing the issue or what might be related to the issue.

>**Note:** For large amounts of data, please use [GitHub Gist](https://gist.github.com/) or similar and link the created resource in the issue.
>**Important:** Please remove any sensitive data as it will be publicly viewable.

- Provide as much as detail as possible on the used resources. As the source of the issue can be many things, including as much of detail as possible helps to determine the root cause. See some examples below:
  - Hosts (what cloud does it happen on, what Amazon Machine Image are you using, what DigitalOcean droplet are you using, what image are you provisioning that we can rebuild or use when we try to reproduce)
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
        --tail=all \
        --timestamps \
        $(docker ps  -q -f  label=org.label-schema.vcs-url=https://github.com/rancher/rancher.git)
        ```
      - High Availability

        ```
        kubectl --kubeconfig $KUBECONFIG logs \
        -n cattle-system \
        --timestamps=true \
        -f $(kubectl --kubeconfig $KUBECONFIG get pods -n cattle-system -o json | jq -r '.items[] | select(.spec.containers[].name="cattle-server") | .metadata.name')
        ```
  - System logging (these might not all exist, depending on operating system)
      - `/var/log/messages`
      - `/var/log/syslog`
      - `/var/log/kern.log`
  - Docker daemon logging (these might not all exist, depending on operating system)
      - `/var/log/docker.log`

If you are experiencing performance issues, please provide as much of data (files or screenshots) of metrics which can help determing what is going on. If you have an issue related to a machine, it helps to supply output of `top`, `free -m`, `df` which shows processes/memory/disk usage.


### Docs

If you have any updates to our documentation, please make any pull request to our docs repo.

- [Rancher 2.x Docs Repo](https://github.com/rancher/docs): This repo is where all the docs for Rancher 2.x are located. They are located in the `content` folder in the repo.

- [Rancher 1.x Docs Repo](https://github.com/rancher/rancher.github.io): This repo is where all the docs for Rancher 1.x are located. They are located in the `rancher` folder in the repo.
