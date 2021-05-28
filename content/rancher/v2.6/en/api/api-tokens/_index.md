---
title: API Tokens
weight: 1
aliases:
  - /rancher/v2.5/en/cluster-admin/api/api-tokens/
---

By default, some cluster-level API tokens are generated with infinite time-to-live (`ttl=0`). In other words, API tokens with `ttl=0` never expire unless you invalidate them. Tokens are not invalidated by changing a password.

You can deactivate API tokens by deleting them or by deactivating the user account.

### Deleting tokens
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


### Setting TTL on Kubeconfig Tokens

Admins can set a global TTL on Kubeconfig tokens. Once the token expires the kubectl command will require the user to authenticate to Rancher.

1. Disable the kubeconfig-generate-token setting in the Rancher API view at `https://<Rancher-Server-IP/v3/settings/kubeconfig-generate-token`. This setting instructs Rancher to no longer automatically generate a token when a user clicks on download a kubeconfig file. The kubeconfig file will now provide a command to login to Rancher.

2. Edit the setting and set the value to `false`. 

3. Go to setting kubeconfig-token-ttl-minutes in the Rancher API view at `https://<Rancher-Server-IP/v3/settings/kubeconfig-token-ttl-minutes`. By default, kubeconfig-token-ttl-minutes is 960 (16 hours).

4. Edit the setting and set the value to desired duration in minutes.
_**Note:**_ This value cannot exceed max-ttl of API tokens.(`https://<Rancher-Server-IP/v3/settings/auth-token-max-ttl-minutes`). `auth-token-max-ttl-minutes` is set to 1440 (24 hours) by default.  `auth-token-max-ttl-minutes would default to 0 allowing tokens to never expire`.


 