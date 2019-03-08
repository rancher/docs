---
title: Config Options
weight: 200
---

When setting up your `cluster.yml` for RKE, there are a lot of different options that can be configured to control the behavior of how RKE launches Kubernetes.

There are several options that can be configured in cluster configuration option. There are several [example yamls]({{< baseurl >}}/rke/v0.1.x/en/example-yamls/) that contain all the options.

### Configuring Nodes
* [Nodes]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes/)
* [Ignoring unsupported Docker versions](#supported-docker-versions)
* [Private Registries]({{< baseurl >}}/rke/v0.1.x/en/config-options/private-registries/)
* [Cluster Level SSH Key Path](#cluster-level-ssh-key-path)
* [SSH Agent](#ssh-agent)
* [Bastion Host]({{< baseurl >}}/rke/v0.1.x/en/config-options/bastion-host/)

### Configuring Kubernetes Cluster
* [Cluster Name](#cluster-name)
* [Kubernetes Version](#kubernetes-version)
* [System Images]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/)
* [Services]({{< baseurl >}}/rke/v0.1.x/en/config-options/services/)
* [Extra Args and Binds and Environment Variables]({{< baseurl >}}/rke/v0.1.x/en/config-options/services/services-extras/)
* [External Etcd]({{< baseurl >}}/rke/v0.1.x/en/config-options/services/external-etcd/)
* [Authentication]({{< baseurl >}}/rke/v0.1.x/en/config-options/authentication/)
* [Authorization]({{< baseurl >}}/rke/v0.1.x/en/config-options/authorization/)
* [Cloud Providers]({{< baseurl >}}/rke/v0.1.x/en/config-options/cloud-providers/)
* [Add-ons]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/)
  * [Add-ons Jobs Timeout](#add-ons-jobs-timeout)
  * [Network Plugins]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/network-plugins/)
  * [Ingress Controller]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/ingress-controllers/)
  * [User-Defined-Add-ons]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/user-defined-add-ons/)


## Cluster Level Options

### Cluster Name

By default, the name of your cluster will be `local`. If you want a different name, you would use the `cluster_name` directive to change the name of your cluster. The name will be set in your cluster's generated kubeconfig file.

```yaml
cluster_name: mycluster
```

### Supported Docker Versions

By default, RKE will check the installed Docker version on all hosts and fail with an error if the version is not supported by Kubernetes. The list of [supported Docker versions](https://github.com/rancher/rke/blob/master/docker/docker.go#L37-L41) are set specifically for each Kubernetes version. To override this behavior, set this option to `true`.

The default value is `false`.

```yaml
ignore_docker_version: true
```

### Kubernetes Version

You can select which version of Kubernetes to install for your cluster. Each version of RKE has a specific list of supported Kubernetes versions. If a version is defined in `kubernetes_version` and is not found in this list, the default version is used, As of version 0.2.0 this behavior has changed and the version is now being checked against all versions, and if the version is not found in the list then an error will be presented.

If you want to use a different version than listed below, please use the [system images]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/) option.

To find out what the list of supported Kubernetes versions are for your version of RKE, please refer to the [release notes](https://github.com/rancher/rke/releases) of the RKE version that you are running.

You can set the Kubernetes version as follows:

```yaml
kubernetes_version: "v1.11.6-rancher1-1"
```

To list the supported versions and system images of specific version of RKE release, you can run the following command:
```
$ rke config --system-images --all

INFO[0000] Generating images list for version [v1.13.4-rancher1-2]:
.......
INFO[0000] Generating images list for version [v1.11.8-rancher1-1]:
.......
INFO[0000] Generating images list for version [v1.12.6-rancher1-2]:
.......
```

In case both `kubernetes_version` and [system images](#rke-system-images) are defined, the system images configuration will take precedence over `kubernetes_version`.

### Cluster Level SSH Key Path

RKE connects to host(s) using `ssh`. Typically, each node will have an independent path for each ssh key, i.e. `ssh_key_path`, in the `nodes` section, but if you have a SSH key that is able to access **all** hosts in your cluster configuration file, you can set the path to that ssh key at the top level. Otherwise, you would set the ssh key path in the [nodes]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes/).

If ssh key paths are defined at the cluster level and at the node level, the node-level key will take precedence.

```yaml
ssh_key_path: ~/.ssh/test
```

### SSH Agent

RKE supports using ssh connection configuration from a local ssh agent. The default value for this option is `false`. If you want to set using a local ssh agent, you would set this to `true`.

```yaml
ssh_agent_auth: true
```

If you want to use an SSH private key with a passphrase, you will need to add your key to `ssh-agent` and have the environment variable `SSH_AUTH_SOCK` configured.

```
$ eval "$(ssh-agent -s)"
Agent pid 3975
$ ssh-add /home/user/.ssh/id_rsa
Enter passphrase for /home/user/.ssh/id_rsa:
Identity added: /home/user/.ssh/id_rsa (/home/user/.ssh/id_rsa)
$ echo $SSH_AUTH_SOCK
/tmp/ssh-118TMqxrXsEx/agent.3974
```

### Add-ons Job Timeout

You can define [add-ons]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/) to be deployed after the Kubernetes cluster comes up, which uses Kubernetes [jobs](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/). RKE will stop attempting to retrieve the job status after the timeout, which is in seconds. The default timeout value is `30` seconds.

```yaml
addon_job_timeout: 30
```
