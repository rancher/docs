---
title: HTTP Proxy Configuration
weight: 251
---

If you operate Rancher behind a proxy and you want to access services through the proxy (such as retrieving catalogs), you must provide Rancher information about your proxy. As Rancher is written in Go, it uses the common proxy environment variables as shown below.

Make sure `NO_PROXY` contains the network addresses, network address ranges and domains that should be excluded from using the proxy.

| Environment variable | Purpose                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| HTTP_PROXY           | Proxy address to use when initiating HTTP connection(s)                                                                 |
| HTTPS_PROXY          | Proxy address to use when initiating HTTPS connection(s)                                                                |
| NO_PROXY             | Network address(es), network address range(s) and domains to exclude from using the proxy when initiating connection(s) |

:::note Important:

NO_PROXY must be in uppercase to use network range (CIDR) notation.

:::

## Docker Installation

Passing environment variables to the Rancher container can be done using `-e KEY=VALUE` or `--env KEY=VALUE`. Required values for `NO_PROXY` in a [Docker Installation](../../pages-for-subheaders/rancher-on-a-single-node-with-docker.md) are:

- `localhost`
- `127.0.0.1`
- `0.0.0.0`
- `10.0.0.0/8`
- `cattle-system.svc`
- `.svc`
- `.cluster.local`

The example below is based on a proxy server accessible at `http://192.168.0.1:3128`, and excluding usage the proxy when accessing network range `192.168.10.0/24` and every hostname under the domain `example.com`.

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -e HTTP_PROXY="http://192.168.10.1:3128" \
  -e HTTPS_PROXY="http://192.168.10.1:3128" \
  -e NO_PROXY="localhost,127.0.0.1,0.0.0.0,10.0.0.0/8,cattle-system.svc,192.168.10.0/24,.svc,.cluster.local,example.com" \
  --privileged \
  rancher/rancher:latest
```

Privileged access is [required.](../../pages-for-subheaders/rancher-on-a-single-node-with-docker.md#privileged-access-for-rancher)

### Air-gapped proxy configuration

_New in v2.6.4_

You can now provision node driver clusters from an air-gapped cluster configured to use a proxy for outbound connections.

In addition to setting the default rules for a proxy server as shown above, you will need to add additional rules, shown below, to provision node driver clusters from a proxied Rancher environment.

You will configure your filepath according to your setup, e.g., `/etc/apt/apt.conf.d/proxy.conf`:

```
acl SSL_ports port 22
acl SSL_ports port 2376

acl Safe_ports port 22      # ssh
acl Safe_ports port 2376    # docker port
```