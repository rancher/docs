---
title: Updating a Private CA Certificate
weight: 10
---

Follow these steps to update the SSL certificate of the ingress in a Rancher [high availability Kubernetes installation]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/) or to switch from the default self-signed certificate to a custom certificate.

A summary of the steps is as follows:

1. Create or update the `tls-rancher-ingress` Kubernetes secret resource with the new certificate and private key.
2. Create or update the `tls-ca` Kubernetes secret resource with the root CA certificate (only required when using a private CA).
3. Update the Rancher installation using the Helm CLI.
4. Reconfigure the Rancher agents to trust the new CA certificate.

The details of these instructions are below.

# 1. Create/update the certificate secret resource

First, concatenate the server certificate followed by any intermediate certificate(s) to a file named `tls.crt` and provide the corresponding certificate key in a file named `tls.key`.

If you are switching the install from using the Rancher self-signed certificate or Let’s Encrypt issued certificates, use the following command to create the `tls-rancher-ingress` secret resource in your Rancher HA cluster:

```
$ kubectl -n cattle-system create secret tls tls-rancher-ingress \
  --cert=tls.crt \
  --key=tls.key
```

Alternatively, to update an existing certificate secret:

```
$ kubectl -n cattle-system create secret tls tls-rancher-ingress \
  --cert=tls.crt \
  --key=tls.key \
  --dry-run --save-config -o yaml | kubectl apply -f -
```

# 2. Create/update the CA certificate secret resource

If the new certificate was signed by a private CA, you will need to copy the corresponding root CA certificate into a file named `cacerts.pem` and create or update the `tls-ca secret` in the `cattle-system` namespace. If the certificate was signed by an intermediate CA, then the `cacerts.pem` must contain both the intermediate and root CA certificates (in this order).

To create the initial secret:

```
$ kubectl -n cattle-system create secret generic tls-ca \
  --from-file=cacerts.pem
```

To update an existing `tls-ca` secret:

```
$ kubectl -n cattle-system create secret generic tls-ca \
  --from-file=cacerts.pem \
  --dry-run --save-config -o yaml | kubectl apply -f -
```

# 3. Reconfigure the Rancher deployment

> Before proceeding, generate an API token in the Rancher UI (<b>User > API & Keys</b>) and save the Bearer Token which you might need in step 4.

This step is required if Rancher was initially installed with self-signed certificates (`ingress.tls.source=rancher`) or with a Let's Encrypt issued certificate (`ingress.tls.source=letsEncrypt`).

It ensures that the Rancher pods and ingress resources are reconfigured to use the new server and optional CA certificate.

To update the Helm deployment you will need to use the same (`--set`) options that were used during initial installation. Check with:

```
$ helm get values rancher -n cattle-system
```

Also get the version string of the currently deployed Rancher chart:

```
$ helm ls -A
```

Upgrade the Helm application instance using the original configuration values and making sure to specify `ingress.tls.source=secret` as well as the current chart version to prevent an application upgrade.    

If the certificate was signed by a private CA, add the `set privateCA=true` argument as well. Also make sure to read the documentation describing the initial installation using custom certificates.

```
helm upgrade rancher rancher-stable/rancher \
  --namespace cattle-system \
  --version <DEPLOYED_CHART_VERSION> \
  --set hostname=rancher.my.org \
  --set ingress.tls.source=secret \
  --set ...
```

When the upgrade is completed, navigate to `https://<Rancher_SERVER>/v3/settings/cacerts` to verify that the value matches the CA certificate written in the `tls-ca` secret earlier.

# 4. Reconfigure Rancher agents to trust the private CA

This section covers three methods to reconfigure Rancher agents to trust the private CA. This step is required if either of the following is true:

- Rancher was initially configured to use the Rancher self-signed certificate (`ingress.tls.source=rancher`) or with a Let's Encrypt issued certificate (`ingress.tls.source=letsEncrypt`)
- The root CA certificate for the new custom certificate has changed

### Why is this step required?

When Rancher is configured with a certificate signed by a private CA, the CA certificate chain is downloaded into Rancher agent containers. Agents compare the checksum of the downloaded certificate against the `CATTLE_CA_CHECKSUM` environment variable. This means that, when the private CA certificate is changed on Rancher server side, the environvment variable `CATTLE_CA_CHECKSUM` must be updated accordingly.

### Which method should I choose?

Method 1 is the easiest one but requires all clusters to be connected to Rancher after the certificates have been rotated. This is usually the case if the process is performed right after updating the Rancher deployment (Step 3).

If the clusters have lost connection to Rancher but you have [Authorized Cluster Endpoints](https://rancher.com/docs/rancher/v2.0-v2.4/en/cluster-admin/cluster-access/ace/) enabled, then go with method 2.

Method 3 can be used as a fallback if method 1 and 2 are unfeasible.

### Method 1: Kubectl command

For each cluster under Rancher management (including `local`) run the following command using the Kubeconfig file of the Rancher management cluster (RKE or K3S).

```
kubectl patch clusters <REPLACE_WITH_CLUSTERID> -p '{"status":{"agentImage":"dummy"}}' --type merge
```

This command will cause all Agent Kubernetes resources to be reconfigured with the checksum of the new certificate.


### Method 2: Manually update checksum

Manually patch the agent Kubernetes resources by updating the `CATTLE_CA_CHECKSUM` environment variable to the value matching the checksum of the new CA certificate. Generate the new checksum value like so:

```
$ curl -k -s -fL <RANCHER_SERVER>/v3/settings/cacerts | jq -r .value > cacert.tmp
$ sha256sum cacert.tmp | awk '{print $1}'
```

Using a Kubeconfig for each downstream cluster update the environment variable for the two agent deployments.

```
$ kubectl edit -n cattle-system ds/cattle-node-agent
$ kubectl edit -n cattle-system deployment/cluster-agent
```

### Method 3: Recreate Rancher agents

With this method you are recreating the Rancher agents by running a set of commands on a controlplane node of each downstream cluster.

First, generate the agent definitions as described here: https://gist.github.com/superseb/076f20146e012f1d4e289f5bd1bd4971

Then, connect to a controlplane node of the downstream cluster via SSH, create a Kubeconfig and apply the definitions:
https://gist.github.com/superseb/b14ed3b5535f621ad3d2aa6a4cd6443b