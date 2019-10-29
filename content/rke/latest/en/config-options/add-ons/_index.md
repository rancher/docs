---
title: Add-Ons
weight: 260
---

RKE supports configuring pluggable add-ons in the cluster YML. Add-ons are used to deploy several cluster components including:

* [Network plug-ins]({{< baseurl >}}/rke/latest/en/config-options/add-ons/network-plugins/)
* [Ingress controller]({{< baseurl >}}/rke/latest/en/config-options/add-ons/ingress-controllers/)
* [DNS provider]({{< baseurl >}}/rke/latest/en/config-options/add-ons/dns/)
* [Metrics Server]({{< baseurl >}}/rke/latest/en/config-options/add-ons/metrics-server/)

These add-ons require images that can be found under the [`system_images` directive]({{< baseurl >}}/rke/latest/en/config-options/system-images/). For each Kubernetes version, there are default images associated with each add-on, but these can be overridden by changing the image tag in `system_images`.

There are a few things worth noting:

* In addition to these pluggable add-ons, you can specify an add-on that you want deployed after the cluster deployment is complete.
* As of v0.1.8, RKE will update an add-on if it is the same name.
* Prior to v0.1.8, update any add-ons by using `kubectl edit`.

## Critical and Non-Critical Add-ons

As of version v0.1.7, add-ons are split into two categories:

- **Critical add-ons:** If these add-ons fail to deploy for any reason, RKE will error out.
- **Non-critical add-ons:** If these add-ons fail to deploy, RKE will only log a warning and continue deploying any other add-ons.

Currently, only the [network plug-in]({{< baseurl >}}/rke/latest/en/config-options/add-ons/network-plugins/) is considered critical. KubeDNS, [ingress controllers]({{< baseurl >}}/rke/latest/en/config-options/add-ons/ingress-controllers/) and [user-defined add-ons]({{< baseurl >}}/rke/latest/en/config-options/add-ons/user-defined-add-ons/) are considered non-critical.

## Add-on deployment jobs

RKE uses Kubernetes jobs to deploy add-ons. In some cases, add-ons deployment takes longer than expected. As of with version v0.1.7, RKE provides an option to control the job check timeout in seconds. This timeout is set at the cluster level.

```yaml
addon_job_timeout: 30
```

## Add-on placement

_Applies to v0.2.3 and higher_

| Component          | nodeAffinity nodeSelectorTerms             | nodeSelector | Tolerations |
| ------------------ | ------------------------------------------ | ------------ | ----------- |
| Calico             | `beta.kubernetes.io/os:NotIn:windows`  | none | - `NoSchedule:Exists`<br/>- `NoExecute:Exists`<br/>- `CriticalAddonsOnly:Exists` |
| Flannel            | `beta.kubernetes.io/os:NotIn:windows`  | none | - `operator:Exists` |
| Canal              | `beta.kubernetes.io/os:NotIn:windows`  | none         | - `NoSchedule:Exists`<br/>- `NoExecute:Exists`<br/>- `CriticalAddonsOnly:Exists` |
| Weave              | `beta.kubernetes.io/os:NotIn:windows`  | none | - `NoSchedule:Exists`<br/>- `NoExecute:Exists` |
| CoreDNS            | `node-role.kubernetes.io/worker:Exists` | `beta.kubernetes.io/os:linux` | - `NoSchedule:Exists`<br/>- `NoExecute:Exists`<br/>- `CriticalAddonsOnly:Exists` |
| kube-dns           | - `beta.kubernetes.io/os:NotIn:windows`<br/>- `node-role.kubernetes.io/worker` `Exists` | none  | - `NoSchedule:Exists`<br/>- `NoExecute:Exists`<br/>- `CriticalAddonsOnly:Exists` |
| nginx-ingress      | - `beta.kubernetes.io/os:NotIn:windows`<br/>- `node-role.kubernetes.io/worker` `Exists` | none | - `NoSchedule:Exists`<br/>- `NoExecute:Exists` |
| metrics-server     | - `beta.kubernetes.io/os:NotIn:windows`<br/>- `node-role.kubernetes.io/worker` `Exists` | none | - `NoSchedule:Exists`<br/>- `NoExecute:Exists` |
