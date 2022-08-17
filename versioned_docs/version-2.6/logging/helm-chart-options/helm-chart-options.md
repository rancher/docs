---
title: rancher-logging Helm Chart Options
shortTitle: Helm Chart Options
weight: 4
---

- [Enable/Disable Windows Node Logging](#enable-disable-windows-node-logging)
- [Working with a Custom Docker Root Directory](#working-with-a-custom-docker-root-directory)
- [Adding NodeSelector Settings and Tolerations for Custom Taints](#adding-nodeselector-settings-and-tolerations-for-custom-taints)
- [Enabling the Logging Application to Work with SELinux](#enabling-the-logging-application-to-work-with-selinux)
- [Additional Logging Sources](#additional-logging-sources)
- [Systemd Configuration](#systemd-configuration)

### Enable/Disable Windows Node Logging

You can enable or disable Windows node logging by setting `global.cattle.windows.enabled` to either `true` or `false` in the `values.yaml`.

By default, Windows node logging will be enabled if the Cluster Dashboard UI is used to install the logging application on a Windows cluster.

In this scenario, setting `global.cattle.windows.enabled` to `false` will disable Windows node logging on the cluster.
When disabled, logs will still be collected from Linux nodes within the Windows cluster.

> Note: Currently an [issue](https://github.com/rancher/rancher/issues/32325) exists where Windows nodeAgents are not deleted when performing a `helm upgrade` after disabling Windows logging in a Windows cluster. In this scenario, users may need to manually remove the Windows nodeAgents if they are already installed.

### Working with a Custom Docker Root Directory

If using a custom Docker root directory, you can set `global.dockerRootDirectory` in `values.yaml`.

This will ensure that the Logging CRs created will use your specified path rather than the default Docker `data-root` location.

Note that this only affects Linux nodes.

If there are any Windows nodes in the cluster, the change will not be applicable to those nodes.

### Adding NodeSelector Settings and Tolerations for Custom Taints

You can add your own `nodeSelector` settings and add `tolerations` for additional taints by editing the logging Helm chart values. For details, see [this page.](../taints-tolerations)

### Enabling the Logging Application to Work with SELinux

> **Requirements:** Logging v2 was tested with SELinux on RHEL/CentOS 7 and 8.

[Security-Enhanced Linux (SELinux)](https://en.wikipedia.org/wiki/Security-Enhanced_Linux) is a security enhancement to Linux. After being historically used by government agencies, SELinux is now industry standard and is enabled by default on CentOS 7 and 8.

To use Logging v2 with SELinux, we recommend installing the `rancher-selinux` RPM according to the instructions on [this page.]({{<baseurl>}}/rancher/v2.6/en/security/selinux/#installing-the-rancher-selinux-rpm)

Then, when installing the logging application, configure the chart to be SELinux aware by changing `global.seLinux.enabled` to `true` in the `values.yaml`.

### Additional Logging Sources

By default, Rancher collects logs for [control plane components](https://kubernetes.io/docs/concepts/overview/components/#control-plane-components) and [node components](https://kubernetes.io/docs/concepts/overview/components/#node-components) for all cluster types.

In some cases, Rancher may be able to collect additional logs.

The following table summarizes the sources where additional logs may be collected for each node types:

| Logging Source | Linux Nodes (including in Windows cluster) | Windows Nodes |
| --- | --- | ---|
| RKE | ✓ | ✓ |
| RKE2 | ✓ | |
| K3s | ✓ | |
| AKS | ✓ | |
| EKS | ✓ | |
| GKE | ✓ | |

To enable hosted Kubernetes providers as additional logging sources, enable **Enable enhanced cloud provider logging** option when installing or upgrading the Logging Helm chart.

When enabled, Rancher collects all additional node and control plane logs the provider has made available, which may vary between providers

If you're already using a cloud provider's own logging solution such as AWS CloudWatch or Google Cloud operations suite (formerly Stackdriver), it is not necessary to enable this option as the native solution will have unrestricted access to all logs.

### Systemd Configuration

In Rancher logging, `SystemdLogPath` must be configured for K3s and RKE2 Kubernetes distributions. 

K3s and RKE2 Kubernetes distributions log to journald, which is the subsystem of systemd that is used for logging. In order to collect these logs, the `systemdLogPath` needs to be defined. While the `run/log/journal` directory is used by default, some Linux distributions do not default to this path. For example, Ubuntu defaults to `var/log/journal`. To determine your `systemdLogPath` configuration, see steps below.

**Steps for Systemd Configuration:**

* Run  `cat /etc/systemd/journald.conf | grep -E ^\#?Storage | cut -d"=" -f2` on one of your nodes.
* If `persistent` is returned, your `systemdLogPath` should be `/var/log/journal`.
* If `volatile` is returned, your `systemdLogPath` should be `/run/log/journal`. 
* If `auto` is returned, check if `/var/log/journal` exists. 
  * If `/var/log/journal` exists, then use `/var/log/journal`. 
  * If `/var/log/journal` does not exist, then use `/run/log/journal`. 

> **Note:** If any value not described above is returned, Rancher Logging will not be able to collect control plane logs. To address this issue, you will need to perform the following actions on every control plane node:

> * Set `Storage=volatile` in  journald.conf.
> * Reboot your machine.
> * Set `systemdLogPath` to `/run/log/journal`. 