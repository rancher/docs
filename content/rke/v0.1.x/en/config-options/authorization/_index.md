---
title: Authorization
weight: 240
---

Kubernetes supports multiple [Authorization Modules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/#authorization-modules). Currently, RKE only supports the [RBAC module](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

By default, RBAC is already enabled. If you wanted to turn off RBAC support, **which isn't recommended**, you set the authorization mode to `none`.

```yaml
authorization:
    # Use `mode: none` to disable authorization
    mode: rbac
```
