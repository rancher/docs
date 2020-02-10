---
title: "Kubernetes Dashboard"
weight: 10
---

This quick-start guide will help you to deploy and configure the [Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) on K3s.

### Deploying the Kubernetes Dashboard

```bash
kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc5/aio/deploy/recommended.yaml
```

### Dashboard admin-user RBAC Configuration

> **Important:** Granting admin privileges to the Dashboard's Service Account might be a security risk! The admin-user created in this guide will have administrative privileges and is for educational purposes only.

Create the following resource manifest files:

`dashboard.admin-user.yml`
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kube-system
```

`dashboard.admin-user-role.yml`
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kube-system
```

Deploy the `admin-user` configuration:

```bash
kubectl create -f dashboard.admin-user.yml -f dashboard.admin-user-role.yml
```

### Obtain the Bearer Token

```bash
kubectl -n kube-system describe secret admin-user-token | grep ^token
```

### Local Access to the Dashboard

Local proxy configuration:

```bash
kubectl proxy
```

The Dashboard is now accessible at:

* http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
* `Sign In` with the `admin-user` Bearer Token

#### Advanced: Remote Access to the Dashboard

[Port Forwarding](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/) can be used to Access Applications in a Cluster.

### Upgrading the Dashboard

The latest Dashboard releases are available from: https://github.com/kubernetes/dashboard/releases/latest

```bash
kubectl delete ns kubernetes-dashboard
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/[...]
```

### Deleting the Dashboard and admin-user configuration

```bash
kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc5/aio/deploy/recommended.yaml
kubectl delete -f dashboard.admin-user.yml -f dashboard.admin-user-role.yml
```
