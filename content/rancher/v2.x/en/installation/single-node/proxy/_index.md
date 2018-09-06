---
title: HTTP Proxy Configuration
weight: 251
aliases:
- /rancher/v2.x/en/installation/proxy-configuration/
---
If you operate Rancher behind a proxy and you want to access services through the proxy (such as retrieving catalogs), you must provide Rancher information about your proxy. As Rancher is written in Go, it uses the common proxy environment variables as shown below.

Make sure `NO_PROXY` contains the network addresses, network address ranges and domains that should be excluded from using the proxy.

Environment variable      | Purpose
--------------------------|---------
HTTP_PROXY                | Proxy address to use when initiating HTTP connection(s)
HTTPS_PROXY               | Proxy address to use when initiating HTTPS connection(s)
NO_PROXY                  | Network address(es), network address range(s) and domains to exclude from using the proxy when initiating connection(s)

> **Note** NO_PROXY must be in uppercase to use network range (CIDR) notation.

## Single Node Installation

Passing environment variables to the Rancher container can be done using `-e KEY=VALUE` or `--env KEY=VALUE`. Required values for `NO_PROXY` in a [Single Node Installation]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/) are:

* `localhost`
* `127.0.0.1`
* `0.0.0.0`

The example below is based on a proxy server accessible at `http://192.168.0.1:3128`, and excluding usage the proxy when accessing network range `192.168.10.0/24` and every hostname under the domain `example.com`.

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -e HTTP_PROXY="http://192.168.10.1:3128" \
  -e HTTPS_PROXY="http://192.168.10.1:3128" \
  -e NO_PROXY="localhost,127.0.0.1,0.0.0.0,192.168.10.0/24,example.com" \
  rancher/rancher:latest
```
