---
title: Installing Rancher behind an HTTP Proxy
weight: 4
---

In a lot of enterprise environments, servers or VMs running on premise do not have direct Internet access, but must connect to external services through a HTTP(S) proxy for security reasons. This tutorial shows step by step how to set up a highly available Rancher installation in such an environment.

Alternatively, it is also possible to set up Rancher completely air-gapped without any Internet access. This process is described in detail in the [Rancher docs](air-gapped-helm-cli-install.md).

# Installation Outline

1. [Set up infrastructure](../getting-started/installation-and-upgrade/other-installation-methods/rancher-behind-an-http-proxy/set-up-infrastructure.md)
2. [Set up a Kubernetes cluster](../getting-started/installation-and-upgrade/other-installation-methods/rancher-behind-an-http-proxy/install-kubernetes.md)
3. [Install Rancher](../getting-started/installation-and-upgrade/other-installation-methods/rancher-behind-an-http-proxy/install-rancher.md)
