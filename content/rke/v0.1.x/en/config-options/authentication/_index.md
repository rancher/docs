---
title: Authentication
weight: 235
---

RKE supports x509 authentication strategy. You can additionally define a list of SANs (Subject Alternative Names) to add to the Kubernetes API Server PKI certificates. As an example, this allows you to connect to your Kubernetes cluster API Server through a load balancer instead of a single node.

```yaml
authentication:
    strategy: x509
    sans:
      - "10.18.160.10"
      - "my-loadbalancer-1234567890.us-west-2.elb.amazonaws.com"
```

RKE also supports the webhook authentication strategy. You can enable both x509 and webhook strategies by using a `|` separator in the configuration. Contents of the webhook config file should be provided, see [Kubernetes webhook documentation](https://kubernetes.io/docs/reference/access-authn-authz/webhook/) for information on the file format. Additionally, a cache timeout for webhook authentication responses can be set.

```yaml
authentication:
    strategy: x509|webhook
    webhook:
      config_file: "...."
      cache_timeout: 5s
```
