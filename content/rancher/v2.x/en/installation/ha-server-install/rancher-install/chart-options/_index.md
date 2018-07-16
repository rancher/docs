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
| `tls` | "ingress" | `string` - Where to terminate SSL. - "ingress, external"

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

### External TLS Termination

If you wish to terminate the SSL/TLS on a load-balancer external to the Rancher cluster (ingress), use the `--tls=external` option and point your load balancer at port http 80.

> NOTE: If you are using a Private CA signed cert, add `--set privateCA=true` and see [Adding TLS Secrets - Private CA Signed - Additional Steps](../tls-secrets/#private-ca-signed---additional-steps) to add the CA cert for Rancher.

Your load balancer must support long lived websocket connections and will need to insert proxy headers so Rancher can route links correctly.

> NOTE: The `tls=external` option will expose the Rancher interface on http port 80.  Clients that are allowed to connect directly to the Rancher cluster will not be encrypted. We recommend that you restrict direct access at the network level to just your load balancer.

#### Required headers

* `Host`
* `X-Forwarded-Proto`
* `X-Forwarded-Port`
* `X-Forwarded-For`

#### Health checks

Rancher will respond `200` to health checks on the `/healthz` endpoint.
