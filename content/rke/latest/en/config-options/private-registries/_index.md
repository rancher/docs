---
title: Private Registries
weight: 215
---

RKE supports the ability to configure multiple private Docker registries in the `cluster.yml`. By passing in your registry and credentials, it allows the nodes to pull images from these private registries.  

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

As of v0.1.10, RKE supports specifying a default registry from the list of private registries to be used with all [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/) . In this example .RKE will use `registry.com` as the default registry for all system images, e.g. `rancher/rke-tools:v0.1.14` will become `registry.com/rancher/rke-tools:v0.1.14`.

```yaml
private_registries:
    - url: registry.com
      user: Username
      password: password
      is_default: true # All system images will be pulled using this registry. 
```

### Air-gapped Setups

By default, all system images are being pulled from DockerHub. If you are on a system that does not have access to DockerHub, you will need to create a private registry that is populated with all the required [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/). 

As of v0.1.10, you have to configure your private registry credentials, but you can specify this registry as a default registry so that all [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/) are pulled from the designated private registry. You can use the command `rke config --system-images` to get the list of default system images to populate your private registry. 

Prior to v0.1.10, you had to configure your private registry credentials **and** update the names of all the [system images]({{< baseurl >}}/rke/latest/en/config-options/system-images/) in the `cluster.yml` so that the image names would have the private registry URL appended before each image name. 

