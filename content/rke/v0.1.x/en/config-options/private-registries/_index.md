---
title: Private Registries
weight: 3000
draft: true
---
RKE supports configuring multiple private/authenticated Docker registries. This is useful if you have private images to use or are deploying your cluster in an air-gapped environment.
```yaml
private_registries:
  - url: registry.com
    user: Username
    password: password
  - url: myregistry.com
    user: myuser
    password: mypassword
```
