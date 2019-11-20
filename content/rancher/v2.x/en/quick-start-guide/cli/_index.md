---
title: CLI with Rancher
weight: 100
---

Interact with Rancher using command line interface (CLI) tools from your workstation.

## Rancher CLI

Follow the steps in [rancher cli](../cli).

Ensure you can run `rancher kubectl get pods` successfully.


## kubectl
Install the `kubectl` utility. See [install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).


Configure kubectl by visiting your cluster in the Rancher Web UI then clicking on `Kubeconfig`, copying contents and putting into your `~/.kube/config` file.

Run `kubectl cluster-info` or `kubectl get pods` successfully.

