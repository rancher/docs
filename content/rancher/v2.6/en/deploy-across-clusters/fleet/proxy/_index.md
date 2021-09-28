---
title: Using Fleet Behind a Proxy
weight: 3
---

In this section, you'll learn how to enable Fleet in a setup that has a Rancher server with a public IP a Kubernetes cluster that has no public IP, but is configured to use a proxy.

Rancher does not establish connections with registered downstream clusters. The Rancher agent deployed on the downstream cluster must be able to establish the connection with Rancher.

To set up Fleet to work behind a proxy, you will need to set the **Agent Environment Variables** for the downstream cluster. These are cluster-level configuration options.

Through the Rancher UI, you can configure these environment variables for any cluster type, including registered and custom clusters. The variables can be added while editing an existing cluster or while provisioning a new cluster.

For public downstream clusters, it is sufficient to [set the required environment variables in the Rancher UI.](#setting-environment-variables-in-the-rancher-ui)

For private nodes or private clusters, the environment variables need to be set on the nodes themselves. Then the environment variables are configured from the Rancher UI, typically when provisioning a custom cluster or when registering the private cluster. For an example of how to set the environment variables on Ubuntu node in a K3s Kubernetes cluster, see [this section.](#setting-environment-variables-on-private-nodes)

# Required Environment Variables

When adding Fleet agent environment variables for the proxy, replace <PROXY_IP> with your private proxy IP.

| Variable Name | Value |
|------------------|--------|
| `HTTP_PROXY` | http://<PROXY_IP>:8888 |
| `HTTPS_PROXY` | http://<PROXY_IP>:8888
| `NO_PROXY`     | 127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.svc,.cluster.local |

# Setting Environment Variables in the Rancher UI

To add the environment variable to an existing cluster,

1. Click **☰ > Cluster Management**.
1. Go to the cluster where you want to add environment variables and click **⋮ > Edit Config**.
1. Click **Advanced Options**.
1. Click **Add Environment Variable**.
1. Enter the [required environment variables](#required-environment-variables)
1. Click **Save**.

**Result:** The Fleet agent works behind a proxy.

# Setting Environment Variables on Private Nodes

For private nodes and private clusters, the proxy environment variables need to be set on the nodes themselves, as well as configured from the Rancher UI.

This example shows how the environment variables would be set up on an Ubuntu node in a K3s Kubernetes cluster:

```
ssh -o ForwardAgent=yes ubuntu@<public_proxy_ip>
ssh <k3s_ip>
export proxy_private_ip=<private_proxy_ip>
export HTTP_PROXY=http://${proxy_private_ip}:8888
export HTTPS_PROXY=http://${proxy_private_ip}:8888
export NO_PROXY=127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,.svc,.cluster.local
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
```