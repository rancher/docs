---
title: Chart Options
weight: 276
---

### Common Options

| Option | Default Value | Description |
| --- | --- | --- |
| `hostname` | " " | `string` - the Fully Qualified Domain Name for your Rancher Server |
| `ingress.tls.source` | "rancher" | `string` - Where to get the cert for the ingress. - "rancher, letsEncrypt, secret" |
| `letsEncrypt.email` | " " | `string` - Your email address |
| `letsEncrypt.environment` | "production" | `string` - Valid options: "staging, production" |
| `privateCA` | false | `bool` - Set to true if your cert is signed by a private CA |

<br/>

### Advanced Options

| Option | Default Value | Description |
| --- | --- | --- |
| `debug` | false | `bool` - set debug flag on rancher server |
| `imagePullSecrets` | [] | `list` - list of names of Secret resource containing private registry credentials |
| `resources` | {} | `map` - rancher pod resource requests & limits |
| `rancherImage` | "rancher/rancher" | `string` - rancher image source |
| `rancherImageTag` | same as chart version | `string` - rancher/rancher image tag |

<br/>

### Private or Air Gap Registry

You can point to a private registry for an "Air Gap" install.

#### Create Registry Secret

Use `kubectl` to create a docker-registry secret in the `cattle-system` namespace.

```
kubectl -n cattle-system create secret docker-registry regcred \
--docker-server="reg.example.com:5000" \
--docker-username=<user> \
--docker-password=<password> \
--docker-email=<email>
```

#### Registry Options

Add the `rancherImage` to point to your private registry image and `imagePullSecrets` to your install command.

```
--set rancherImage=reg.example.com:5000/rancher/rancher \
--set imagePullSecrets[0].name=regcred
```