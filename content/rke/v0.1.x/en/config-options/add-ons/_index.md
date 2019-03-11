---
title: Add-Ons
weight: 260
---

RKE supports pluggable add-ons. Add-ons are used to deploy several cluster components including:

* [Network plug-ins]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/network-plugins/)
* [Ingress controller]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/ingress-controllers/)
* [DNS provider]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/dns/)

The images used for these add-ons under the [`system_images` directive]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/). For each Kubernetes version, there are default images associated with each add-on, but these can be overridden by changing the image tag in `system_images`.

In addition to these pluggable add-ons, you can specify an add-on that you want deployed after the cluster deployment is complete.

RKE only adds additional add-ons when using `rke up` multiple times. RKE does **not** support removing of cluster add-ons when doing `rke up` with a different list of add-ons.

As of v0.1.8, RKE will update an add-on if it is the same name.

Prior to v0.1.8, update any add-ons by by using `kubectl edit`.


## Critical and Non-Critical Add-ons

As of version v0.1.7, add-ons are split into two categories:

- **Critical add-ons:** If these add-ons fail to deploy for any reason, RKE will error out.
- **Non-critical add-ons:** If these add-ons fail to deploy, RKE will only log a warning and continue deploying any other add-ons.

Currently, only the [network plug-in]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/network-plugins/) is considered critical. KubeDNS, [ingress controllers]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/ingress-controllers/) and [user-defined add-ons]({{< baseurl >}}/rke/v0.1.x/en/config-options/add-ons/user-defined-add-ons/) are considered non-critical.

## Add-on deployment jobs

RKE uses Kubernetes jobs to deploy add-ons. In some cases, add-ons deployment takes longer than expected. As of with version v0.1.7, RKE provides an option to control the job check timeout in seconds. This timeout is set at the cluster level.

```yaml
addon_job_timeout: 30
```
