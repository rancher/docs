---
title: Custom Cloud Provider
weight: 255
---

If you want to enable a different cloud provider, RKE allows for custom cloud provider options. A name must be provided and the custom Cloud Provider options can be passed in as a multiline string in `customCloudProvider`.

For example, in order to use the oVirt cloud provider with Kubernetes, here's the following cloud provider information:

```
[connection]
uri = https://localhost:8443/ovirt-engine/api
username = admin@internal
password = admin
```

To add this cloud config file to RKE, the `cloud_provider` would be need to be set.

```yaml
cloud_provider:
    name: ovirt
    # Note the pipe as this is what indicates a multiline string
    customCloudProvider: |-
      [connection]
      uri = https://localhost:8443/ovirt-engine/api
      username = admin@internal
      password = admin
```
