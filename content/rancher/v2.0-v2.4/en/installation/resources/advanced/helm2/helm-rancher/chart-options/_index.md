---
title: Chart Options
weight: 276
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/helm2/helm-rancher/chart-options
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
| `addLocal` | "auto" | `string` - Have Rancher detect and import the local Rancher server cluster |
| `antiAffinity` | "preferred" | `string` - AntiAffinity rule for Rancher pods - "preferred, required" |
| `auditLog.destination` | "sidecar" | `string` - Stream to sidecar container console or hostPath volume - "sidecar, hostPath" |
| `auditLog.hostPath` | "/var/log/rancher/audit" | `string` - log file destination on host (only applies when `auditLog.destination` is set to `hostPath`) |
| `auditLog.level` | 0 | `int` - set the [API Audit Log]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/api-auditing) level. 0 is off. [0-3] |
| `auditLog.maxAge` | 1 | `int` - maximum number of days to retain old audit log files (only applies when `auditLog.destination` is set to `hostPath`) |
| `auditLog.maxBackups` | 1 | `int` - maximum number of audit log files to retain (only applies when `auditLog.destination` is set to `hostPath`) |
| `auditLog.maxSize` | 100 | `int` - maximum size in megabytes of the audit log file before it gets rotated  (only applies when `auditLog.destination` is set to `hostPath`) |
| `busyboxImage` | "busybox" | `string` - Image location for busybox image used to collect audit logs _Note: Available as of v2.2.0_ |
| `debug` | false | `bool` - set debug flag on rancher server |
| `extraEnv` | [] | `list` - set additional environment variables for Rancher _Note: Available as of v2.2.0_ |
| `imagePullSecrets` | [] | `list` - list of names of Secret resource containing private registry credentials |
| `ingress.extraAnnotations` | {} | `map` - additional annotations to customize the ingress |
| `ingress.configurationSnippet` | "" | `string` - Add additional Nginx configuration. Can be used for proxy configuration. _Note: Available as of v2.0.15, v2.1.10 and v2.2.4_ |
| `proxy` | "" | `string` -  HTTP[S] proxy server for Rancher |
| `noProxy` | "127.0.0.0/8,10.0.0.0/8,cattle-system.svc,172.16.0.0/12,192.168.0.0/16" | `string` - comma separated list of hostnames or ip address not to use the proxy |
| `resources` | {} | `map` - rancher pod resource requests & limits |
| `rancherImage` | "rancher/rancher" | `string` - rancher image source |
| `rancherImageTag` | same as chart version | `string` - rancher/rancher image tag |
| `tls` | "ingress" | `string` - See [External TLS Termination](#external-tls-termination) for details. - "ingress, external" |
| `systemDefaultRegistry` | "" | `string` - private registry to be used for all system Docker images, e.g., http://registry.example.com/ _Available as of v2.3.0_ |
| `useBundledSystemChart` | `false` | `bool` - select to use the system-charts packaged with Rancher server. This option is used for air gapped installations. _Available as of v2.3.0_

<br/>

### API Audit Log

Enabling the [API Audit Log]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/api-auditing/).

You can collect this log as you would any container log. Enable the [Logging service under Rancher Tools]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/) for the `System` Project on the Rancher server cluster.

```plain
--set auditLog.level=1
```

By default enabling Audit Logging will create a sidecar container in the Rancher pod. This container (`rancher-audit-log`) will stream the log to `stdout`.  You can collect this log as you would any container log. When using the sidecar as the audit log destination, the `hostPath`, `maxAge`, `maxBackups`, and `maxSize` options do not apply. It's advised to use your OS or Docker daemon's log rotation features to control disk space use. Enable the [Logging service under Rancher Tools]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/) for the Rancher server cluster or System Project.

Set the `auditLog.destination` to `hostPath` to forward logs to volume shared with the host system instead of streaming to a sidecar container. When setting the destination to `hostPath` you may want to adjust the other auditLog parameters for log rotation.

### Setting Extra Environment Variables

_Available as of v2.2.0_

You can set extra environment variables for Rancher server using `extraEnv`. This list uses the same `name` and `value` keys as the container manifest definitions. Remember to quote the values.

```plain
--set 'extraEnv[0].name=CATTLE_TLS_MIN_VERSION'
--set 'extraEnv[0].value=1.0'
```

### TLS settings

_Available as of v2.2.0_

To set a different TLS configuration, you can use the `CATTLE_TLS_MIN_VERSION` and `CATTLE_TLS_CIPHERS` environment variables. For example, to configure TLS 1.0 as minimum accepted TLS version:

```plain
--set 'extraEnv[0].name=CATTLE_TLS_MIN_VERSION'
--set 'extraEnv[0].value=1.0'
```

See [TLS settings]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/tls-settings) for more information and options.

### Import `local` Cluster

By default Rancher server will detect and import the `local` cluster it's running on.  User with access to the `local` cluster will essentially have "root" access to all the clusters managed by Rancher server.

If this is a concern in your environment you can set this option to "false" on your initial install.

> Note: This option is only effective on the initial Rancher install. See [Issue 16522](https://github.com/rancher/rancher/issues/16522) for more information.

```plain
--set addLocal="false"
```

### Customizing your Ingress

To customize or use a different ingress with Rancher server you can set your own Ingress annotations.

Example on setting a custom certificate issuer:

```plain
--set ingress.extraAnnotations.'certmanager\.k8s\.io/cluster-issuer'=ca-key-pair
```

_Available as of v2.0.15, v2.1.10 and v2.2.4_

Example on setting a static proxy header with `ingress.configurationSnippet`. This value is parsed like a template so variables can be used.

```plain
--set ingress.configurationSnippet='more_set_input_headers X-Forwarded-Host {{ .Values.hostname }};'
```

### HTTP Proxy

Rancher requires internet access for some functionality (helm charts). Use `proxy` to set your proxy server.

Add your IP exceptions to the `noProxy` list. Make sure you add the Service cluster IP range (default: 10.43.0.1/16) and any worker cluster `controlplane` nodes. Rancher supports CIDR notation ranges in this list.

```plain
--set proxy="http://<username>:<password>@<proxy_url>:<proxy_port>/"
--set noProxy="127.0.0.0/8\,10.0.0.0/8\,172.16.0.0/12\,192.168.0.0/16"
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

For details on installing Rancher with a private registry, see:

- [Air Gap: Docker Install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/air-gap-single-node/)
- [Air Gap: Kubernetes Install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/air-gap-high-availability/)


### External TLS Termination

We recommend configuring your load balancer as a Layer 4 balancer, forwarding plain 80/tcp and 443/tcp to the Rancher Management cluster nodes. The Ingress Controller on the cluster will redirect http traffic on port 80 to https on port 443.

You may terminate the SSL/TLS on a L7 load balancer external to the Rancher cluster (ingress). Use the `--set tls=external` option and point your load balancer at port http 80 on all of the Rancher cluster nodes. This will expose the Rancher interface on http port 80. Be aware that clients that are allowed to connect directly to the Rancher cluster will not be encrypted. If you choose to do this we recommend that you restrict direct access at the network level to just your load balancer.

> **Note:** If you are using a Private CA signed certificate, add `--set privateCA=true` and see [Adding TLS Secrets - Using a Private CA Signed Certificate]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/helm-rancher/tls-secrets/) to add the CA cert for Rancher.

Your load balancer must support long lived websocket connections and will need to insert proxy headers so Rancher can route links correctly.

#### Configuring Ingress for External TLS when Using NGINX v0.25

In NGINX v0.25, the behavior of NGINX has [changed](https://github.com/kubernetes/ingress-nginx/blob/master/Changelog.md#0220) regarding forwarding headers and external TLS termination. Therefore, in the scenario that you are using external TLS termination configuration with NGINX v0.25, you must edit the `cluster.yml` to enable the `use-forwarded-headers` option for ingress:

```yaml
ingress:
  provider: nginx
  options:
    use-forwarded-headers: "true"
```

#### Required Headers

* `Host`
* `X-Forwarded-Proto`
* `X-Forwarded-Port`
* `X-Forwarded-For`

#### Recommended Timeouts

* Read Timeout: `1800 seconds`
* Write Timeout: `1800 seconds`
* Connect Timeout: `30 seconds`

#### Health Checks

Rancher will respond `200` to health checks on the `/healthz` endpoint.


#### Example NGINX config

This NGINX configuration is tested on NGINX 1.14.

  >**Note:** This NGINX configuration is only an example and may not suit your environment. For complete documentation, see [NGINX Load Balancing - HTTP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/).

* Replace `IP_NODE1`, `IP_NODE2` and `IP_NODE3` with the IP addresses of the nodes in your cluster.
* Replace both occurrences of `FQDN` to the DNS name for Rancher.
* Replace `/certs/fullchain.pem` and `/certs/privkey.pem` to the location of the server certificate and the server certificate key respectively.

```
worker_processes 4;
worker_rlimit_nofile 40000;

events {
    worker_connections 8192;
}

http {
    upstream rancher {
        server IP_NODE_1:80;
        server IP_NODE_2:80;
        server IP_NODE_3:80;
    }

    map $http_upgrade $connection_upgrade {
        default Upgrade;
        ''      close;
    }

    server {
        listen 443 ssl http2;
        server_name FQDN;
        ssl_certificate /certs/fullchain.pem;
        ssl_certificate_key /certs/privkey.pem;

        location / {
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Port $server_port;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://rancher;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            # This allows the ability for the execute shell window to remain open for up to 15 minutes. Without this parameter, the default is 1 minute and will automatically close.
            proxy_read_timeout 900s;
            proxy_buffering off;
        }
    }

    server {
        listen 80;
        server_name FQDN;
        return 301 https://$server_name$request_uri;
    }
}
```
