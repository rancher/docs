---
title: 3 - Initialize Helm (Install tiller)
weight: 195
---

Helm is the package management tool of choice for Kubernetes. Helm charts provide templating syntax for Kubernetes YAML manifest documents. With Helm we can create configurable deployments instead of just using static files. For more information about creating your own catalog of deployments, check out the docs at [https://helm.sh/](https://helm.sh/).

> **Note:** For systems without direct internet access see [Helm - Air Gap]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/#helm) for install details.

### Initialize Helm on the Cluster

Helm installs the `tiller` service on your cluster to manage charts. Since RKE enables RBAC by default we will need to use `kubectl` to create a `serviceaccount` and `clusterrolebinding` so `tiller` has permission to deploy to the cluster.

* Create the `ServiceAccount` in the `kube-system` namespace.
* Create the `ClusterRoleBinding` to give the `tiller` service account access to the cluster.
* Finally use `helm` to initialize the `tiller` service

```plain
kubectl -n kube-system create serviceaccount tiller

kubectl create clusterrolebinding tiller \
  --clusterrole cluster-admin \
  --serviceaccount=kube-system:tiller

helm init --service-account tiller

# Note: If you are in China, you'll need to specify a specific tiller-image in order to initialize tiller. 
# The list of tiller image tags are available here: https://dev.aliyun.com/detail.html?spm=5176.1972343.2.18.ErFNgC&repoId=62085. 
# When initializing tiller, you'll need to pass in --tiller-image

helm init --service-account tiller |
--tiller-image registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:<tag>
```

> **Note:** This `tiller` install has full cluster access, which should be acceptable if the cluster is dedicated to Rancher server. Check out the [helm docs](https://docs.helm.sh/using_helm/#role-based-access-control) for restricting `tiller` access to suit your security requirements.

### Issues or errors?

See the [Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/troubleshooting/) page.

### [Next: Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/)
