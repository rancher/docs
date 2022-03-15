---
title: Rotation of Expired Webhook Certificates
weight: 120
---

For Rancher versions that have `rancher-webhook` installed, certain versions created certificates that will expire after one year. It will be necessary for you to rotate your webhook certificate if the certificate did not renew. 

New and existing rancher-webhook deployments will automatically renew its TLS certificate when it is 30 or fewer days within expiration date. If an older version is in use, there are two methods to work around this issue:

##### 1. Users with cluster access, run the following commands:
```
kubectl delete secret -n cattle-system cattle-webhook-tls
kubectl delete mutatingwebhookconfigurations.admissionregistration.k8s.io --ignore-not-found=true rancher.cattle.io
kubectl delete pod -n cattle-system -l app=rancher-webhook
```

##### 2. Users with no cluster access via `kubectl`:

1. Delete the `cattle-webhook-tls` secret in the `cattle-system` namespace in the local cluster.

2. Delete the `rancher.cattle.io` mutating webhook

3. Delete the `rancher-webhook` pod in the `cattle-system` namespace in the local cluster.

**Note:** The webhook certificate expiration issue is not specific to `cattle-webhook-tls` as listed in the examples. You will fill in your expired certificate secret accordingly.
