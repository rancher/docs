---
title: Config Options
weight: 3000
draft: true
---

When setting up your cluster.yml for RKE, there are a lot of different options that can be configured.


## Using RKE to generate a cluster.ml

RKE supports command `rke config` which generates a cluster config template for the user, to start using this command just write:

```bash
rke config --name mycluster.yml
```

RKE will ask some questions around the cluster file like number of the hosts, ips, ssh users, etc, `--empty` option will generate an empty cluster.yml file, also if you just want to print on the screen and not save it in a file you can use `--print`.

## Cluster Yaml Links

## Naming your Cluster

```
# If set, this is the cluster name that will be used in the kube config file
# Default value is "local"
cluster_name: mycluster

```

## Docker Version check

```
# If set to true, rke won't fail when unsupported Docker version is found
ignore_docker_version: false
```

## Kubernetes authorization (RBAC)

```
# Kubernetes authorization mode
# Use `mode: rbac` to enable RBAC
# Use `mode: none` to disable authorization
authorization:
  mode: rbac
```

## SSH Key path

```
ssh_key_path: ~/.ssh/test
```


<!--add in sections for each option with high level description and link-->
