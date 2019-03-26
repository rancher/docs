---
title: Metrics Server
weight: 263
---

By default, RKE deploys [Metrics Server](https://github.com/kubernetes-incubator/metrics-server) to provide metrics on resources in your cluster.

RKE will deploy Metrics Server as a Deployment.

The image used for Metrics Server is under the [`system_images` directive]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/). For each Kubernetes version, there is a default image associated with the Metrics Server, but these can be overridden by changing the image tag in `system_images`.

## Disabling the Metrics Server

_Available as of v0.2.0_

You can disable the default controller by specifying `none` to the monitoring `provider` directive in the cluster configuration.

```yaml
monitoring:
    provider: none
```
