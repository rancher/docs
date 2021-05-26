---
title: Using Fleet Behind a Proxy
weight: 3
---

_Available as of v2.5.8_

In this sections, you'll learn how to enable Fleet in a setup that has a Rancher server with a public IP and a registered K3s cluster that has no public IP, but is configured to use a proxy.

Rancher does not establish connections with registered downstream clusters. The Rancher agent deployed on the downstream cluster must be able to establish the connection with Rancher.

To set up Fleet to work behind a proxy, you will need to set the **Agent Environment Variables* * for the downstream cluster. These are cluster-level configuration options.

To add the environment variable,

1. In the Rancher UI, go to the cluster view for the registered K3s cluster that needs to use a proxy.
1. Click **&#8942; > Edit**.
1. Click **Advanced Options.**
1. Click **Add Environment Variable.**
1. Enter environment variables according to the table below.
1. Click **Save.**

**Result:** The Fleet agent works behind a proxy.

### Required Environment Variables

When adding Fleet agent environment variables for the proxy, replace <PROXY_IP> with your private proxy IP.

| Variable Name | Value |
|------------------|--------|
| `HTTP_PROXY` | http://<PROXY_IP>:8888 |
| `HTTPS_PROXY | http://<PROXY_IP>:8888
| `NO_PROXY`     | 127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.svc,.cluster.local |