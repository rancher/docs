---
title: Install Rancher on a Linux OS
weight: 2
---

> This section is under construction.

Rancher is both a platform and a Kubernetes distribution. In this section you'll learn how to install the Rancher binary. You will use the Rancher CLI to set up a Rancher Kubernetes cluster that has the Rancher server Helm chart preinstalled.

There are two main ways that Rancher can be installed:

1. You can use Helm to install the Rancher Helm chart on any Kubernetes cluster.
2. You can use the Rancher CLI to install a Rancher Kubernetes cluster. This cluster comes with the Rancher Helm chart built in.

The installation path that you choose will affect the way that you upgrade Rancher, but not the way that Rancher is backed up and restored.

This section focuses on the installation path in which the Rancher Helm chart is installed on an existing Kubernetes cluster.
