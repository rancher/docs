---
title: "Initialize Helm: Install the Tiller Service"
description: "With Helm, you can create configurable deployments instead of using static files. In order to use Helm, the Tiller service needs to be installed on your cluster."
weight: 195
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/helm2/helm-init
---

Helm is the package management tool of choice for Kubernetes. Helm "charts" provide templating syntax for Kubernetes YAML manifest documents. With Helm we can create configurable deployments instead of just using static files. For more information about creating your own catalog of deployments, check out the docs at [https://helm.sh/](https://helm.sh/). To be able to use Helm, the server-side component `tiller` needs to be installed on your cluster.

For systems without direct internet access, see [Helm - Air Gap]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap) for install details.

Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm-version) to choose a version of Helm to install Rancher.

> **Note:** The installation instructions assume you are using Helm 2. The instructions will be updated for Helm 3 soon. In the meantime, if you want to use Helm 3, refer to [these instructions.](https://github.com/ibrokethecloud/rancher-helm3)

### Install Tiller on the Cluster

> **Important:** Due to an issue with Helm v2.12.0 and cert-manager, please use Helm v2.12.1 or higher.

Helm installs the `tiller` service on your cluster to manage charts. Since RKE enables RBAC by default we will need to use `kubectl` to create a `serviceaccount` and `clusterrolebinding` so `tiller` has permission to deploy to the cluster.

* Create the `ServiceAccount` in the `kube-system` namespace.
* Create the `ClusterRoleBinding` to give the `tiller` account access to the cluster.
* Finally use `helm` to install the `tiller` service

```plain
kubectl -n kube-system create serviceaccount tiller

kubectl create clusterrolebinding tiller \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:tiller

helm init --service-account tiller

# Users in China: You will need to specify a specific tiller-image in order to initialize tiller. 
# The list of tiller image tags are available here: https://dev.aliyun.com/detail.html?spm=5176.1972343.2.18.ErFNgC&repoId=62085. 
# When initializing tiller, you'll need to pass in --tiller-image

helm init --service-account tiller \
--tiller-image registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:<tag>
```

> **Note:** This`tiller`install has full cluster access, which should be acceptable if the cluster is dedicated to Rancher server. Check out the [helm docs](https://docs.helm.sh/using_helm/#role-based-access-control) for restricting `tiller` access to suit your security requirements.

### Test your Tiller installation

Run the following command to verify the installation of `tiller` on your cluster:

```
kubectl -n kube-system  rollout status deploy/tiller-deploy
Waiting for deployment "tiller-deploy" rollout to finish: 0 of 1 updated replicas are available...
deployment "tiller-deploy" successfully rolled out
```

And run the following command to validate Helm can talk to the `tiller` service:

```
helm version
Client: &version.Version{SemVer:"v2.12.1", GitCommit:"02a47c7249b1fc6d8fd3b94e6b4babf9d818144e", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.12.1", GitCommit:"02a47c7249b1fc6d8fd3b94e6b4babf9d818144e", GitTreeState:"clean"}
```

### Issues or errors?

See the [Troubleshooting]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/helm-init/troubleshooting/) page.

### [Next: Install Rancher]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/helm-rancher/)
