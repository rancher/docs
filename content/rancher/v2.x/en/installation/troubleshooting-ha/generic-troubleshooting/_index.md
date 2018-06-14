---
title: Generic troubleshooting
weight: 5 
---

Below are steps that you can follow to determine what is wrong in your cluster.

* All nodes should be present and in **Ready** state

To check, run the command:

```
kubectl --kubeconfig kube_config_rancher-cluster.yml get nodes
```

If a node is not shown in this output or a node is not in **Ready** state, you can check the logging of the `kubelet` container. Login to the node and run `docker logs kubelet`.

* All pods/jobs should be in **Running**/**Completed** state

To check, run the command:

```
kubectl --kubeconfig kube_config_rancher-cluster.yml get pods --all-namespaces
```

If a pod is not in **Running** state, you can dig into the root cause by running:

<h5>Describe pod</h5>

```
kubectl --kubeconfig kube_config_rancher-cluster.yml describe pod POD_NAME -n NAMESPACE
```

<h5>Pod logs</h5>

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs POD_NAME -n NAMESPACE
```

If a job is not in **Completed** state, you can dig into the root cause by running:

<h5>Describe job</h5>

```
kubectl --kubeconfig kube_config_rancher-cluster.yml describe job JOB_NAME -n NAMESPACE
```

<h5>Logs from the pods of the job</h5>

```
kubectl --kubeconfig kube_config_rancher-cluster.yml logs -l job-name=JOB_NAME -n NAMESPACE
```

* List all Kubernetes cluster events

Kubernetes cluster events are stored, and can be retrieved by running:

```
kubectl --kubeconfig kube_config_rancher-cluster.yml get events --all-namespaces
```
