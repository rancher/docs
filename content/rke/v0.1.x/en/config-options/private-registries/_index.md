---
title: Private Registries
weight: 215
draft: true
---

RKE supports the ability to configure multiple private Docker registries. By passing in your registry and credentials, it allows the nodes to pull images from these private registries.  

```yaml
private_registries:
    - url: registry.com
      user: Username
      password: password
    - url: myregistry.com
      user: myuser
      password: mypassword
```

> **Note:** If you are using a Docker Hub registry, you can omit the `url` or set it to `docker.io`.

### Air-gapped Setups

If you are in an air-gapped setup, you will need to not only configure your private registry credentials, but you will need to also update all your [system images]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/) so they are going to pull from the private registry. By default, these system images are pulling from `docker.io`.
