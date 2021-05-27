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


### Enable/Disable Windows Node Logging

_Available as of v2.5.8_

You can enable or disable Windows node logging by setting `global.cattle.windows.enabled` to either `true` or `false` in the `values.yaml`.

By default, Windows node logging will be enabled if the Cluster Explorer UI is used to install the logging application on a Windows cluster.

In this scenario, setting `global.cattle.windows.enabled` to `false` will disable Windows node logging on the cluster.
When disabled, logs will still be collected from Linux nodes within the Windows cluster.

> Note: Currently an [issue](https://github.com/rancher/rancher/issues/32325) exists where Windows nodeAgents are not deleted when performing a `helm upgrade` after disabling Windows logging in a Windows cluster. In this scenario, users may need to manually remove the Windows nodeAgents if they are already installed.

### Working with a Custom Docker Root Directory

_Applies to v2.5.6+_

If using a custom Docker root directory, you can set `global.dockerRootDirectory` in `values.yaml`.

This will ensure that the Logging CRs created will use your specified path rather than the default Docker `data-root` location.

Note that this only affects Linux nodes.

If there are any Windows nodes in the cluster, the change will not be applicable to those nodes.

### Adding NodeSelector Settings and Tolerations for Custom Taints

You can add your own `nodeSelector` settings and add `tolerations` for additional taints by editing the logging Helm chart values. For details, see [this page.](../taints-tolerations)

### Enabling the Logging Application to Work with SELinux

_Available as of v2.5.8_

> **Requirements:** Logging v2 was tested with SELinux on RHEL/CentOS 7 and 8.

[Security-Enhanced Linux (SELinux)](https://en.wikipedia.org/wiki/Security-Enhanced_Linux) is a security enhancement to Linux. After being historically used by government agencies, SELinux is now industry standard and is enabled by default on CentOS 7 and 8.

To use Logging v2 with SELinux, we recommend installing the `rancher-selinux` RPM according to the instructions on [this page.]({{<baseurl>}}/rancher/v2.5/en/security/selinux/#installing-the-rancher-selinux-rpm)

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

To enable hosted Kubernetes providers as additional logging sources, go to **Cluster Explorer > Logging > Chart Options** and select the **Enable enhanced cloud provider logging** option.

When enabled, Rancher collects all additional node and control plane logs the provider has made available, which may vary between providers

If you're already using a cloud provider's own logging solution such as AWS CloudWatch or Google Cloud operations suite (formerly Stackdriver), it is not necessary to enable this option as the native solution will have unrestricted access to all logs.
