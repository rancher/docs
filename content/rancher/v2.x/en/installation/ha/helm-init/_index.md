---
title: 3 - Initialize Helm (Install tiller)
weight: 195
---

Helm is the package management tool of choice for Kubernetes. Helm "charts" provide templating syntax for Kubernetes YAML manifest documents. With Helm we can create configurable deployments instead of just using static files. For more information about creating your own catalog of deployments, check out the docs at [https://helm.sh/](https://helm.sh/).

### Initialize Helm on the cluster

Helm installs the `tiller` service on your cluster to manage charts. Since RKE enables RBAC by default we will need to use `kubectl` to create a `serviceaccount` and `clusterrolebinding` so `tiller` has permission to deploy to the cluster.

* Create the `ServiceAccount` in the `kube-system` namespace.
* Create the `ClusterRoleBinding` to give the `tiller` account access to the cluster.
* Finally use `helm` to initialize the `tiller` service

```
kubectl -n kube-system create serviceaccount tiller
kubectl create clusterrolebinding tiller \
  --clusterrole cluster-admin \
  --serviceaccount=kube-system:tiller
```

##### Helm init

`helm init` installs the `tiller` service in the `kube-system` namespace on your cluster.

```
helm init --service-account tiller
```

> **Note:** This `tiller` install has full cluster access, which should be acceptable if the cluster is dedicated to Rancher server. Check out the [helm docs](https://docs.helm.sh/using_helm/#role-based-access-control) for restricting `tiller` access to suit your security requirements.

### [Next: Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha//helm-rancher/)