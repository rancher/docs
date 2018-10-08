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
| `additionalTrustedCAs` | false | `bool` - See [Additional Trusted CAs](#additional-trusted-cas) |
| `auditLog.destination` | "sidecar" | `string` - Stream to sidecar container console or hostPath volume - "sidecar, hostPath" |
| `auditLog.hostPath` | "/var/log/rancher/audit" | `string` - log file destination on host |
| `auditLog.level` | 0 | `int` - set the [API Audit Log]({{< baseurl >}}/rancher/v2.x/en/installation/api-auditing) level. 0 is off. [0-3] |
| `auditLog.maxAge` | 1 | `int` - maximum number of days to retain old audit log files |
| `auditLog.maxBackups` | 1 | `int` - maximum number of audit log files to retain |
| `auditLog.maxSize` | 100 | `int` - maximum size in megabytes of the audit log file before it gets rotated |
| `debug` | false | `bool` - set debug flag on rancher server |
| `imagePullSecrets` | [] | `list` - list of names of Secret resource containing private registry credentials |
| `proxy` | "" | `string` - string - HTTP[S] proxy server for Rancher |
| `noProxy` | "localhost,127.0.0.1" | `string` - comma separated list of hostnames or ip address not to use the proxy |
| `resources` | {} | `map` - rancher pod resource requests & limits |
| `rancherImage` | "rancher/rancher" | `string` - rancher image source |
| `rancherImageTag` | same as chart version | `string` - rancher/rancher image tag |
| `tls` | "ingress" | `string` - **DEPRECATED**: Changing this option is not recommended. See [External TLS Termination](#external-tls-termination) for details. - "ingress, external" |

<br/>

### API Audit Log

Enabling the [API Audit Log](https://rancher.com/docs/rancher/v2.x/en/installation/api-auditing/).

You can collect this log as you would any container log. Enable the [Logging service under Rancher Tools](https://rancher.com/docs/rancher/v2.x/en/tools/logging/) for the `System` Project on the Rancher server cluster.

```plain
--set auditLog.level=1
```

By default enabling Audit Logging will create a sidecar container in the Rancher pod. This container (`rancher-audit-log`) will stream the log to `stdout`.  You can collect this log as you would any container log. Enable the [Logging service under Rancher Tools](https://rancher.com/docs/rancher/v2.x/en/tools/logging/) for the Rancher server cluster or System Project.

Set the `auditLog.destination` to `hostPath` to forward logs to volume shared with the host system instead of streaming to a sidecar container. When setting the destination to `hostPath` you may want to adjust the other auditLog parameters for log rotation.

### HTTP Proxy

Rancher requires internet access for some functionality (helm charts). Use `proxy` to set your proxy server.

Add your IP exceptions to the `noProxy` list. Make sure you add the Service cluster IP range (default: 10.43.0.1/16) and any worker cluster `controlplane` nodes. Rancher supports CIDR notation ranges in this list.

```plain
--set proxy="http://<username>:<password>@<proxy_url>:<proxy_port>/"
--set noProxy="127.0.0.1,localhost,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"
```

### Additional Trusted CAs

If you have private registries, catalogs or a proxy that intercepts certificates, you may need to add additional trusted CAs to Rancher.

```plain
--set additionalTrustedCAs=true
```

Once the Rancher deployment is created, copy your CA certs in pem format into a file named `ca-additional.pem` and use `kubectl` to create the `tls-ca-additional` secret in the `cattle-system` namespace.

```plain
kubectl -n cattle-system create secret generic tls-ca-additional --from-file=ca-additional.pem
```

### Private Registry and Air Gap Installs

See [Installing Rancher - Air Gap]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/) for details on installing Rancher with a private registry.

### External TLS Termination

Due to security concerns and configuration variability, terminating TLS exclusively on an external load balancer is being deprecated. This option will be removed in future versions of the Helm chart.

We recommend configuring your load balancer as a Layer 4 balancer, forwarding plain 80/tcp and 443/tcp to the Rancher Management cluster nodes. The Ingress Controller on the cluster will redirect http traffic on port 80 to https on port 443.

You may configure your load balancer as a Layer 7 balancer with a SSL/TLS certificate, but you will need to configure the load balancer to forward to the https endpoints on the Rancher Management Cluster nodes.

#### Conversion

##### Certificates

Make sure you have a copy of the following:

* Server Certificate
* Server Certificate Private Key
* Any Chain Certificates
* Private CA Root Certificate (if Private CA)

The certificate doesn't need to be the same one used by the external load balancer, but it can be.  If you creating a new certificate and used a Private CA to sign the certificate installed on the external load balancer, use the same CA to sign the new certificate.

##### Gather Chart Options

The Helm chart options for setting up TLS with provided certificates can be found in the [Install Rancher - Certificates from Files (Kubernetes Secrets)]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/#certificates-from-files-kubernetes-secret) section.

In general you will need to swap out:

```plain
--set tls=external
```

With:

```plain
  --set ingress.tls.source=secret
```

> **Note:** if your certificates are signed by a private CA don't forget to add the `--set privateCA=true` option.

##### Upgrade

Once you have selected the `helm --set` options for your SSL configuration, follow the [Rancher Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/ha-server-upgrade-helm) instructions replacing the deprecated chart options with the new configuration.

Example with privateCA option:

```plain
helm upgrade rancher rancher-stable/rancher \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret \
  --set privateCA=true
```

##### Populate Certificate Secrets

The Ingress controller will wait until you have populated the certificate secrets before serving the Rancher application. See [Adding TLS Secrets]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/tls-secrets/) for details.
