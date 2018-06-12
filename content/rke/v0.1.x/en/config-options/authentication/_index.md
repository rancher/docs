---
title: Authentication
weight: 3000
draft: true
---

RKE supports x509 authentication strategy. You can additionally define a list of SANs (Subject Alternative Names) to add to the Kubernetes API Server PKI certificates. This allows you to connect to your Kubernetes cluster API Server through a load balancer, for example, rather than a single node.

```yaml
authentication:
  strategy: x509
  sans:
  - "10.18.160.10"
  - "my-loadbalancer-1234567890.us-west-2.elb.amazonaws.com"
```
