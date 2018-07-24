---
title: Rancher HTTP Proxy Configuration
weight: 360
---
If you operate Rancher behind a proxy and you need to reach the Internet to perform tasks (such as using Helm catalogs), you must provide Rancher information about your proxy. As Rancher is written in Go, it uses the common proxy environment variables as shown below.

* Make sure `NO_PROXY` contains the network ranges that should be accessed without the proxy configuration. This should include `localhost`, `127.0.0.1`, `0.0.0.0`, all your local network ranges that are accessible without a proxy.

Environment variable | Example value
---------------------|----------------
HTTP_PROXY           | `http://10.0.0.1:3128`
HTTPS_PROXY          | `http://10.0.0.1:3128`
NO_PROXY             | `localhost,127.0.0.1,0.0.0.0,<your_network_range(s)>`

## Start Rancher Container with Proxy Information 

Passing environment variables to the Rancher container can be done using `-e KEY=VALUE` or `--env KEY=VALUE`. The example below is based on a local network range of `10.0.0.0/8`.

```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -e HTTP_PROXY="http://10.0.0.1:3128" \
  -e HTTPS_PROXY="http://10.0.0.1:3128" \
  -e NO_PROXY="localhost,127.0.0.1,0.0.0.0,10.0.0.0/8" \
  rancher/rancher:latest
```
