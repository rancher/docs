---
title: Private Registries
weight: 215
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

### Default Registry

RKE v0.1.10-rc2 supports specifying a default registry from the list of private registries to be used with all system images by default, for example:

```yaml
private_registries:
    - url: registry.com
      user: Username
      password: password
      is_default: true
```
This way RKE will use `registry.com` as the default registry for all system images used, so for example `rancher/rke-tools:v0.1.14` will become `registry.com/rancher/rke-tools:v0.1.14`.

### Air-gapped Setups

If you are in an air-gapped setup, before version v0.1.10-rc2 you will need to not only configure your private registry credentials, but you will need to also update all your [system images]({{< baseurl >}}/rke/v0.1.x/en/config-options/system-images/) so they are going to pull from the private registry, however after version v0.1.10-rc2 you can specify the default registry described in the previous section. By default, these system images are pulling from `docker.io`.
