---
title: HTTP Proxy Configuration
weight: 277
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/helm2/rke-add-on/proxy
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher Helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install ]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/).
>
>If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

If you operate Rancher behind a proxy and you want to access services through the proxy (such as retrieving catalogs), you must provide Rancher information about your proxy. As Rancher is written in Go, it uses the common proxy environment variables as shown below.

Make sure `NO_PROXY` contains the network addresses, network address ranges and domains that should be excluded from using the proxy.

Environment variable      | Purpose
--------------------------|---------
HTTP_PROXY                | Proxy address to use when initiating HTTP connection(s)
HTTPS_PROXY               | Proxy address to use when initiating HTTPS connection(s)
NO_PROXY                  | Network address(es), network address range(s) and domains to exclude from using the proxy when initiating connection(s)

> **Note** NO_PROXY must be in uppercase to use network range (CIDR) notation.

## Kubernetes installation

When using Kubernetes installation, the environment variables need to be added to the RKE Config File template.

* [Kubernetes Installation with External Load Balancer (TCP/Layer 4) RKE Config File Template]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-4-lb/#5-download-rke-config-file-template)
* [Kubernetes Installation with External Load Balancer (HTTPS/Layer 7) RKE Config File Template]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/layer-7-lb/#5-download-rke-config-file-template)

The environment variables should be defined in the `Deployment` inside the RKE Config File Template. You only have to add the part starting with `env:` to (but not including) `ports:`. Make sure the indentation is identical to the preceding `name:`. Required values for `NO_PROXY` are:

* `localhost`
* `127.0.0.1`
* `0.0.0.0`
* Configured `service_cluster_ip_range` (default: `10.43.0.0/16`)

The example below is based on a proxy server accessible at `http://192.168.0.1:3128`, and excluding usage of the proxy when accessing network range `192.168.10.0/24`, the configured `service_cluster_ip_range` (`10.43.0.0/16`) and every hostname under the domain `example.com`. If you have changed the `service_cluster_ip_range`, you have to update the value below accordingly.

```yaml
...
---
  kind: Deployment
  apiVersion: extensions/v1beta1
  metadata:
    namespace: cattle-system
    name: cattle
  spec:
    replicas: 1
    template:
      metadata:
        labels:
          app: cattle
      spec:
        serviceAccountName: cattle-admin
        containers:
        - image: rancher/rancher:latest
          imagePullPolicy: Always
          name: cattle-server
          env:
          - name: HTTP_PROXY
            value: "http://192.168.10.1:3128"
          - name: HTTPS_PROXY
            value: "http://192.168.10.1:3128"
          - name: NO_PROXY
            value: "localhost,127.0.0.1,0.0.0.0,10.43.0.0/16,192.168.10.0/24,example.com"
          ports:
...
```
