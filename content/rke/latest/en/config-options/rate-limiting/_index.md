---
title: Rate Limiting
weight: 241
---

Using the `EventRateLimit` admission control enforces a limit on the number of events that the API Server will accept in a given time period. In a large multi-tenant cluster, there might be a small percentage of tenants that flood the server with event requests, which could have a significant impact on the performance of the cluster overall. Therefore, it is recommended to limit the rate of events that the API server will accept.

You might want to configure event rate limit as part of compliance with the CIS (Center for Internet Security) Kubernetes Benchmark. Event rate limiting corresponds to the CIS Kubernetes Benchmark 1.1.36 - Ensure that the admission control plugin `EventRateLimit` is set (Scored).

Rate limits can be configured for the server, a namespace, a user, or a combination of a source and an object.

For configuration details, refer to the [official Kubernetes documentation.](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#eventratelimit)

### Example Configurations

The following configuration in the `cluster.yml` can be used to enable the event rate limit by default:

```yaml
services:
  kube-api:
    event_rate_limit:
      enabled: true
```

When the event rate limit is enabled, you should be able to see the default values at `/etc/kubernetes/admission.yaml`:

```yaml
...
plugins:
- configuration:
    apiVersion: eventratelimit.admission.k8s.io/v1alpha1
    kind: Configuration
    limits:
    - burst: 20000
      qps: 5000
      type: Server
...
```

To customize the event rate limit, the entire Kubernetes resource for the configuration must be provided in the `configuration` directive:

```yaml
services:
  kube-api:
    event_rate_limit:
      enabled: true
      configuration:
        apiVersion: eventratelimit.admission.k8s.io/v1alpha1
        kind: Configuration
        limits:
        - type: Server
          qps: 6000
          burst: 30000
```