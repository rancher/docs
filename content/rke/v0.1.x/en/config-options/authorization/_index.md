---
title: Authorization
weight: 3000
draft: true
---

Kubernetes supports multiple [Authorization Modules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/#authorization-modules). Currently, RKE provides support for the [RBAC module](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) only.

RBAC is enabled by default in RKE. It's possible to disable authorization support by seeting the authorization mode to `none`

```yaml
# Use `mode: none` to disable authorization
authorization:
  mode: rbac
```
<!-- explain cluster authorization configuration-->
