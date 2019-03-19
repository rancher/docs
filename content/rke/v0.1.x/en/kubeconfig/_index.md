---
title: Kubeconfig File
weight: 145
---

In order to start interacting with your Kubernetes cluster, you will use a different binary called `kubectl`. You will need to [install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your local machine.

A _kubeconfig file_ is a file used to configure access to Kubernetes when used in conjunction with the kubectl commandline tool (or other clients).

For more details on how kubeconfig and kubectl work together, see the [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/).

When you deployed Kubernetes, a kubeconfig is automatically generated for your RKE cluster. This file is created and saved as `kube_config_cluster.yml`.

>**Note:** By default, kubectl checks `~/.kube/config` for a kubeconfig file, but you can use any directory you want using the `--kubeconfig` flag. For example:
>
>```
kubectl --kubeconfig /custom/path/kube.config get pods
```

Confirm that kubectl is working by checking the version of your Kubernetes cluster

```
kubectl --kubeconfig kube_config_cluster.yml version

Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.0", GitCommit:"fc32d2f3698e36b93322a3465f63a14e9f0eaead", GitTreeState:"clean", BuildDate:"2018-03-27T00:13:02Z", GoVersion:"go1.9.4", Compiler:"gc", Platform:"darwin/amd64"}
Server Version: version.Info{Major:"1", Minor:"8+", GitVersion:"v1.8.9-rancher1", GitCommit:"68595e18f25e24125244e9966b1e5468a98c1cd4", GitTreeState:"clean", BuildDate:"2018-03-13T04:37:53Z", GoVersion:"go1.8.3", Compiler:"gc", Platform:"linux/amd64"}
```

The client and server version are reported, indicating that you have a local `kubectl` client and are able to request the server version from the newly built cluster. Now, you can issue [any kubectl command](https://kubernetes.io/docs/reference/kubectl/kubectl/) to your cluster, like requesting the nodes that are in the cluster.

```
kubectl --kubeconfig kube_config_cluster.yml get nodes
NAME            STATUS    ROLES                      AGE       VERSION
10.0.0.1         Ready     controlplane,etcd,worker   35m       v1.10.3-rancher1
```
