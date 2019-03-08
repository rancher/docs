---
title: Custom values.yaml for Catalog Apps
weight: 4035
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/custom-values-for-apps/
---

For both Rancher or custom catalog apps, the user can override the default values in the `Answers` section.

For example, setting custom values of the default values.yaml

```YAML
outer:
  inner: value
servers:
- port: 80
  host: example
```

need to be translated into `outer.inner=value`, `servers[0].port=80` and `servers[0].host=example` respectively in the Answers section
(Read more about [Format of Custom Values Using `--Set`](https://github.com/helm/helm/blob/master/docs/using_helm.md#the-format-and-limitations-of---set)).

![dot-custom-values-form.png]({{< baseurl >}}/img/rancher/catalog/dot-custom-values-form.png)
or through `Edit as YAML` view:
![dot-custom-values.png]({{< baseurl >}}/img/rancher/catalog/dot-custom-values.png)
<hr>

### Supports Real Custom `values.yaml` for Catalog Apps
_Available as of v2.2.0_

From Rancher v2.2.0, you can now set custom values using a YAML formatted structure through `Edit as YAML`.

![custom-values-yaml.png]({{< baseurl >}}/img/rancher/catalog/custom-values-yaml.png)

It allows the user to customize more complicated input values like multi-lines, array, and JSON object in a user-friendly format compared with `dot-structure`.

![custom-values-yaml-long.png]({{< baseurl >}}/img/rancher/catalog/custom-values-yaml-long.png)
