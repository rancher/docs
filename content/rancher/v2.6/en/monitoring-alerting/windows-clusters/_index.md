---
title: Windows Cluster Support for Monitoring V2
shortTitle: Windows Clusters
weight: 5
---

_Available as of v2.5.8_

Starting at Monitoring V2 14.5.100 (used by default in Rancher 2.5.8), Monitoring V2 can now be deployed on a Windows cluster and will scrape metrics from Windows nodes using [prometheus-community/windows_exporter](https://github.com/prometheus-community/windows_exporter) (previously named `wmi_exporter`).

- [Comparison to Monitoring V1](#comparison-to-monitoring-v1)
- [Cluster Requirements](#cluster-requirements)
  - [Upgrading Existing Clusters to wins v0.1.0](#upgrading-existing-clusters-to-wins-v0-1-0)

# Comparison to Monitoring V1

Unlike Monitoring V1 for Windows, metrics collected by `windows_exporter` will be labeled as `windows_` instead of `wmi_` in accordance to a naming change from upstream from `wmi_exporter` to `windows_exporter`.

In addition, Monitoring V2 for Windows will no longer require users to keep port 9796 open on Windows hosts since the host metrics will published directly onto a port exposed on the windows-exporter Pod. This feature was powered by recent changes made by `wins` v0.1.0 to support publishing ports exposed on the hostNetwork on Pods that use wins to run a privileged Windows binary as a host process.

# Cluster Requirements

Monitoring V2 for Windows can only scrape metrics from Windows hosts that have a minimum `wins` version of v0.1.0.  To be able to fully deploy Monitoring V2 for Windows, all of your hosts must meet this requirement.

If you provision a fresh RKE1 cluster in Rancher 2.5.8, your cluster should already meet this requirement.

### Upgrading Existing Clusters to wins v0.1.0

If the cluster was provisioned before Rancher 2.5.8 (even if the current Rancher version is 2.5.8), you will not be able to successfully deploy Monitoring V2 for Windows until you upgrade the wins version on each host to at least v0.1.0.

To facilitate this upgrade, Rancher 2.5.8 has released a brand new Helm chart called `rancher-wins-upgrader`.

> **Prerequisite:** Make sure Monitoring V1 for Windows is uninstalled.

1. Deploy `rancher-wins-upgrader` with the following override:
    ```yaml
    # Masquerading bootstraps the wins-upgrader installation via
    # a previously whitelisted process path since the normal install path, 
    # c:\etc\rancher\wins\wins-upgrade.exe is not normally whitelisted. 
    # In this case, we are using the previously whitelisted process 
    # path used by Monitoring V1.
    masquerade:
      enabled: true
      as: c:\\etc\wmi-exporter\wmi-exporter.exe
    ```
    > **Note for Non-Default Windows Prefix Path:** If you set up the RKE cluster with a `cluster.yml` that has a non-default `win_prefix_path`, you will need to update the `masquerade.as` field with your prefix path in place of  `c:\\`. 
    >
    > For example, if you have `win_prefix_path: 'c:\host\opt\'`, then you will need to set `as: c:\host\opt\etc\wmi-exporter\wmi-exporter.exe`.
2. Once all your hosts have been successfully upgraded, please ensure that you deploy the Helm chart once again with default values to avoid conflicts with the following settings:
    ```yaml
    masquerade:
      enabled: false
    ```

**Result:** The hosts are ready for Monitoring V2 to be installed. You may choose to uninstall the `rancher-wins-upgrader` chart or keep it in your cluster to facilitate future upgrades.

For more information on how it can be used, please see the [README.md](https://github.com/rancher/wins/blob/master/charts/rancher-wins-upgrader/README.md) of the chart.
