---
title: 3. Install Rancher
weight: 300
---

Now that you have a running RKE cluster, you can install Rancher in it. For security reasons all traffic to Rancher must be encrypted with TLS. For this tutorial you are going to automatically issue a self-signed certificate through [cert-manager](https://cert-manager.io/). In a real-world use-case you will likely use Let's Encrypt or provide your own certificate. 

> **Note:** These installation instructions assume you are using Helm 3.

### Install cert-manager

Add the cert-manager helm repository:

```
helm repo add jetstack https://charts.jetstack.io
```

Create a namespace for cert-manager:

```
kubectl create namespace cert-manager
```

Install the CustomResourceDefinitions of cert-manager:

```
kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v0.15.2/cert-manager.crds.yaml
```

And install it with Helm. Note that cert-manager also needs your proxy configured in case it needs to communicate with Let's Encrypt or other external certificate issuers:

```
helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager --version v0.15.2 \
  --set http_proxy=http://${proxy_host} \
  --set https_proxy=http://${proxy_host} \
  --set no_proxy=127.0.0.0/8\\,10.0.0.0/8\\,cattle-system.svc\\,172.16.0.0/12\\,192.168.0.0/16\\,.svc\\,.cluster.local
```

Now you should wait until cert-manager is finished starting up:

```
kubectl rollout status deployment -n cert-manager cert-manager
kubectl rollout status deployment -n cert-manager cert-manager-webhook
```

### Install Rancher

Next you can install Rancher itself. First add the helm repository:

```
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
```

Create a namespace:

```
kubectl create namespace cattle-system
```

And install Rancher with Helm. Rancher also needs a proxy configuration so that it can communicate with external application catalogs or retrieve Kubernetes version update metadata:

```
helm upgrade --install rancher rancher-latest/rancher \
   --namespace cattle-system \
   --set hostname=rancher.example.com \
   --set proxy=http://${proxy_host}
   --set no_proxy=127.0.0.0/8\\,10.0.0.0/8\\,cattle-system.svc\\,172.16.0.0/12\\,192.168.0.0/16\\,.svc\\,.cluster.local
```

After waiting for the deployment to finish:

```
kubectl rollout status deployment -n cattle-system rancher
```

You can now navigate to `https://rancher.example.com` and start using Rancher.

> **Note:** If you don't intend to send telemetry data, opt out [telemetry]({{<baseurl>}}/rancher/v2.5/en/faq/telemetry/) during the initial login. Leaving this active in an air-gapped environment can cause issues if the sockets cannot be opened successfully.

### Additional Resources

These resources could be helpful when installing Rancher:

- [Rancher Helm chart options]({{<baseurl>}}/rancher/v2.5/en/installation/resources/chart-options/)
- [Adding TLS secrets]({{<baseurl>}}/rancher/v2.5/en/installation/resources/encryption/tls-secrets/)
- [Troubleshooting Rancher Kubernetes Installations]({{<baseurl>}}/rancher/v2.5/en/installation/options/troubleshooting/)
