---
title: CLI with Rancher
weight: 100
---

Interact with Rancher using command line interface (CLI) tools from your workstation.

## Rancher CLI

Follow the steps in [rancher cli](../../cli).

Ensure you can run `rancher kubectl get pods` successfully.


## kubectl
Install the `kubectl` utility. See [install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).


Configure kubectl by visiting your cluster in the Rancher Web UI then clicking on `Kubeconfig`, copying contents and putting into your `~/.kube/config` file.

Run `kubectl cluster-info` or `kubectl get pods` successfully.

## Authentication with kubectl and kubeconfig Tokens with TTL

_**Available as of v2.4.6**_

_Requirements_

If admins have [enforced TTL on kubeconfig tokens]({{<baseurl>}}/rancher/v2.0-v2.4/en/api/api-tokens/#setting-ttl-on-kubeconfig-tokens), the kubeconfig file requires the [Rancher cli](../cli) to be present in your PATH when you run `kubectl`. Otherwise, you’ll see error like:
`Unable to connect to the server: getting credentials: exec: exec: "rancher": executable file not found in $PATH`.

This feature enables kubectl to authenticate with the Rancher server and get a new kubeconfig token when required. The following auth providers are currently supported:

1. Local
2. Active Directory
3. FreeIpa, OpenLdap
4. SAML providers - Ping, Okta, ADFS, Keycloak, Shibboleth

When you first run kubectl, for example, `kubectl get pods`, it will ask you to pick an auth provider and log in with the Rancher server.
The kubeconfig token is cached in the path where you run kubectl under `./.cache/token`. This token is valid till [it expires](../../api/api-tokens/#setting-ttl-on-kubeconfig-tokens-period), or [gets deleted from the Rancher server](../../api/api-tokens/#deleting-tokens)
Upon expiration, the next `kubectl get pods` will ask you to log in with the Rancher server again.

_Note_

As of CLI [v2.4.10](https://github.com/rancher/cli/releases/tag/v2.4.10), the kubeconfig token can be cached at a chosen path with `cache-dir` flag or env var `RANCHER_CACHE_DIR`.

_**Current Known Issues**_

1. If [authorized cluster endpoint]({{<baseurl>}}/rancher/v2.0-v2.4/en/overview/architecture/#4-authorized-cluster-endpoint) is enabled for RKE clusters to [authenticate directly with downstream cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/cluster-access/kubectl/#authenticating-directly-with-a-downstream-cluster) and Rancher server goes down, all kubectl calls will fail after the kubeconfig token expires. No new kubeconfig tokens can be generated if Rancher server isn't accessible.
2. If a kubeconfig token is deleted from Rancher [API tokens]({{<baseurl>}}/rancher/v2.0-v2.4/en/api/api-tokens/#deleting-tokens) page, and the token is still cached, cli won't ask you to login again until the token expires or is deleted. 
`kubectl` calls will result into an error like `error: You must be logged in to the server (the server has asked for the client to provide credentials`. Tokens can be deleted using `rancher token delete`.
