---
title: API Tokens
weight: 1
---

By default, some cluster-level API tokens are generated with infinite time-to-live (`ttl=0`). In other words, API tokens with `ttl=0` never expire unless you invalidate them. Tokens are not invalidated by changing a password.

You can deactivate API tokens by deleting them or by deactivating the user account.

To delete a token,

1. Go to the list of all tokens in the Rancher API view at `https://<Rancher-Server-IP>/v3/tokens`.

1. Access the token you want to delete by its ID. For example, `https://<Rancher-Server-IP>/v3/tokens/kubectl-shell-user-vqkqt`

1. Click **Delete.**

Here is the complete list of tokens that are generated with `ttl=0`:

| Token | Description |
|-------|-------------|
| `kubeconfig-*` | Kubeconfig token |
| `kubectl-shell-*` | Access to `kubectl` shell in the browser |
| `agent-*` | Token for agent deployment |
| `compose-token-*` | Token for compose |
| `helm-token-*` | Token for Helm chart deployment |
| `*-pipeline*` | Pipeline token for project |
| `telemetry-*` | Telemetry token |
| `drain-node-*` | Token for drain (we use `kubectl` for drain because there is no native Kubernetes API) |
