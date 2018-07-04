---
title: 4 - Initialize Helm (Install tiller)
weight: 276
---

`helm` is the package management tool of choice for Kubernetes. `helm` `charts` provide templating syntax for Kubernetes YAML manifest documents. With `helm` we can create configurable deployments instead of just using static files. For more information about creating your own catalog of deployments, check out the docs at [https://helm.sh/](https://helm.sh/)

## Initialize Helm on your Cluster

`helm` installs the `tiller` service on your cluster to manage `chart` deployments. Since `rke` has RBAC enabled by default we will need to use `kubectl` to create a `serviceaccount` and `clusterrolebinding` so `tiller` can deploy to our cluster for us.

* Create the `ServiceAccount` in the `kube-system` namespace.
* Create the `ClusterRoleBinding` to give the `tiller` account access to the cluster.
* Finally use `helm` to initialize the `tiller` service

```
kubectl -n kube-system create serviceaccount tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
```

> NOTE: This `tiller` install has full cluster access, which should be acceptable if the cluster is dedicated to Rancher server. Check out the [helm docs](https://docs.helm.sh/using_helm/#role-based-access-control) for restricting `tiller` access to suit your security requirements.