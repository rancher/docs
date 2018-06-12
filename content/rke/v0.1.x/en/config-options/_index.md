---
title: Config Options
weight: 3000
draft: true
---

When setting up your cluster.yml for RKE, there are a lot of different options that can be configured to control RKE behavior.

## Cluster options

#### Cluster Name

`cluster_name` is an optional value that you can set to identify your cluster. The name will be set in your cluster's generated kubeconfig file.

The default value for this option is `local`.

```yaml
cluster_name: mycluster

```

#### Supported Docker Versions
By default, RKE will check the installed Docker version on all hosts and fail with an error if the version is not supported by Kubernetes. To override this behavior, set this option to `true`.

The default value is `false`.

```yaml
ignore_docker_version: true
```

#### SSH Key Path
RKE connects to host(s) using `ssh`. Typically, each node will have an independent path for each ssh key, i.e. `ssh_key_path`) in the `nodes` section, but if you have a SSH key that is able to access **all** hosts in your cluster configuration file, you can set the path to that ssh key at the top level.

If both cluster-level and node-level ssh keys are defined, the node-level key will take precedence.
```yaml
ssh_key_path: ~/.ssh/test
```

#### SSH Agent

RKE supports using ssh connection configuration from a local ssh agent. The default value for this option is `false`.

```yaml
ssh_agent_auth: true
```

#### Kubernetes Version

Use this option to choose Kubernetes version to install. Since this option was added mainly to be used by Rancher v2.0, it has a limited number of supported tags:

 |Kubernetes version|
 |-----------------|
 |v1.10.3-rancher2-1|
 |v1.10.1-rancher2-1|
 |v1.10.0-rancher1-1|
 |v1.9.7-rancher2-1|
 |v1.9.5-rancher1-1|
 |v1.8.11-rancher2-1|
 |v1.8.10-rancher1-1|

The current default Kubernetes version used by RKE is `v1.10.3-rancher2-1`. If a version is defined in `kubernetes_version` and is not found in this list, the default is used.

There are two ways to select a Kubernetes version:

- Using the kubernetes image defined in [System Images](#rke-system-images)
- Using the configuration option `kubernetes_version`

In case both are defined, the system images configuration will take precedence over `kubernetes_version`.


#### Addons Job Timeout

RKE kubernetes add-ons are deployed using kubernetes jobs. RKE will give up on trying to get the job status after this timeout in seconds. The default timeout value is `30` seconds.

```yaml
addon_job_timeout: 30
```
<!--add in sections for each option with high level description and link-->
