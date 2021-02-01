---
title: Kubernetes resources
weight: 101
---

The commands/steps listed on this page can be used to check the most important Kubernetes resources and apply to [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) clusters.

Make sure you configured the correct kubeconfig (for example, `export KUBECONFIG=$PWD/kube_config_rancher-cluster.yml` for Rancher HA) or are using the embedded kubectl via the UI.

- [Nodes](#nodes)
  - [Get nodes](#get-nodes)
  - [Get node conditions](#get-node-conditions)
- [Kubernetes leader election](#kubernetes-leader-election)
  - [Kubernetes controller manager leader](#kubernetes-controller-manager-leader)
  - [Kubernetes scheduler leader](#kubernetes-scheduler-leader)
- [Ingress controller](#ingress-controller)
  - [Pod details](#pod-details)
  - [Pod container logs](#pod-container-logs)
  - [Namespace events](#namespace-events)
  - [Debug logging](#debug-logging)
  - [Check configuration](#check-configuration)
- [Rancher agents](#rancher-agents)
  - [cattle-node-agent](#cattle-node-agent)
  - [cattle-cluster-agent](#cattle-cluster-agent)
- [Jobs and pods](#jobs-and-pods)
  - [Check that pods or jobs have status Running/Completed](#check-that-pods-or-jobs-have-status-running-completed)
  - [Describe pod](#describe-pod)
  - [Pod container logs](#pod-container-logs)
  - [Describe job](#describe-job)
  - [Logs from the containers of pods of the job](#logs-from-the-containers-of-pods-of-the-job)
  - [Evicted pods](#evicted-pods)
  - [Job does not complete](#job-does-not-complete)

# Nodes

### Get nodes

Run the command below and check the following:

- All nodes in your cluster should be listed, make sure there is not one missing.
- All nodes should have the **Ready** status (if not in **Ready** state, check the `kubelet` container logs on that node using `docker logs kubelet`)
- Check if all nodes report the correct version.
- Check if OS/Kernel/Docker values are shown as expected (possibly you can relate issues due to upgraded OS/Kernel/Docker)


```
kubectl get nodes -o wide
``` 

Example output:

```
NAME             STATUS   ROLES          AGE   VERSION   INTERNAL-IP      EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
controlplane-0   Ready    controlplane   31m   v1.13.5   138.68.188.91    <none>        Ubuntu 18.04.2 LTS   4.15.0-47-generic   docker://18.9.5
etcd-0           Ready    etcd           31m   v1.13.5   138.68.180.33    <none>        Ubuntu 18.04.2 LTS   4.15.0-47-generic   docker://18.9.5
worker-0         Ready    worker         30m   v1.13.5   139.59.179.88    <none>        Ubuntu 18.04.2 LTS   4.15.0-47-generic   docker://18.9.5
```

### Get node conditions

Run the command below to list nodes with [Node Conditions](https://kubernetes.io/docs/concepts/architecture/nodes/#condition)

```
kubectl get nodes -o go-template='{{range .items}}{{$node := .}}{{range .status.conditions}}{{$node.metadata.name}}{{": "}}{{.type}}{{":"}}{{.status}}{{"\n"}}{{end}}{{end}}'
```

Run the command below to list nodes with [Node Conditions](https://kubernetes.io/docs/concepts/architecture/nodes/#condition) that are active that could prevent normal operation.

```
kubectl get nodes -o go-template='{{range .items}}{{$node := .}}{{range .status.conditions}}{{if ne .type "Ready"}}{{if eq .status "True"}}{{$node.metadata.name}}{{": "}}{{.type}}{{":"}}{{.status}}{{"\n"}}{{end}}{{else}}{{if ne .status "True"}}{{$node.metadata.name}}{{": "}}{{.type}}{{": "}}{{.status}}{{"\n"}}{{end}}{{end}}{{end}}{{end}}'
```

Example output:

```
worker-0: DiskPressure:True
```

# Kubernetes leader election

### Kubernetes Controller Manager leader

The leader is determined by a leader election process. After the leader has been determined, the leader (`holderIdentity`) is saved in the `kube-controller-manager` endpoint (in this example, `controlplane-0`).

```
kubectl -n kube-system get endpoints kube-controller-manager -o jsonpath='{.metadata.annotations.control-plane\.alpha\.kubernetes\.io/leader}'
{"holderIdentity":"controlplane-0_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","leaseDurationSeconds":15,"acquireTime":"2018-12-27T08:59:45Z","renewTime":"2018-12-27T09:44:57Z","leaderTransitions":0}>
```

### Kubernetes Scheduler leader

The leader is determined by a leader election process. After the leader has been determined, the leader (`holderIdentity`) is saved in the `kube-scheduler` endpoint (in this example, `controlplane-0`).

```
kubectl -n kube-system get endpoints kube-scheduler -o jsonpath='{.metadata.annotations.control-plane\.alpha\.kubernetes\.io/leader}'
{"holderIdentity":"controlplane-0_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx","leaseDurationSeconds":15,"acquireTime":"2018-12-27T08:59:45Z","renewTime":"2018-12-27T09:44:57Z","leaderTransitions":0}>
```

# Ingress Controller

The default Ingress Controller is NGINX and is deployed as a DaemonSet in the `ingress-nginx` namespace. The pods are only scheduled to nodes with the `worker` role.

Check if the pods are running on all nodes:

```
kubectl -n ingress-nginx get pods -o wide
```

Example output:

```
kubectl -n ingress-nginx get pods -o wide
NAME                                    READY     STATUS    RESTARTS   AGE       IP               NODE
default-http-backend-797c5bc547-kwwlq   1/1       Running   0          17m       x.x.x.x          worker-1
nginx-ingress-controller-4qd64          1/1       Running   0          14m       x.x.x.x          worker-1
nginx-ingress-controller-8wxhm          1/1       Running   0          13m       x.x.x.x          worker-0
```

If a pod is unable to run (Status is not **Running**, Ready status is not showing `1/1` or you see a high count of Restarts), check the pod details, logs and namespace events.

### Pod details

```
kubectl -n ingress-nginx describe pods -l app=ingress-nginx
```

### Pod container logs

```
kubectl -n ingress-nginx logs -l app=ingress-nginx
```

### Namespace events

```
kubectl -n ingress-nginx get events
```

### Debug logging

To enable debug logging:

```
kubectl -n ingress-nginx patch ds nginx-ingress-controller --type='json' -p='[{"op": "add", "path": "/spec/template/spec/containers/0/args/-", "value": "--v=5"}]'
```

### Check configuration

Retrieve generated configuration in each pod:

```
kubectl -n ingress-nginx get pods -l app=ingress-nginx --no-headers -o custom-columns=.NAME:.metadata.name | while read pod; do kubectl -n ingress-nginx exec $pod -- cat /etc/nginx/nginx.conf; done
```

# Rancher agents

Communication to the cluster (Kubernetes API via `cattle-cluster-agent`) and communication to the nodes (cluster provisioning via `cattle-node-agent`) is done through Rancher agents.

#### cattle-node-agent

Check if the cattle-node-agent pods are present on each node, have status **Running** and don't have a high count of Restarts:

```
kubectl -n cattle-system get pods -l app=cattle-agent -o wide
```

Example output:

```
NAME                      READY     STATUS    RESTARTS   AGE       IP                NODE
cattle-node-agent-4gc2p   1/1       Running   0          2h        x.x.x.x           worker-1
cattle-node-agent-8cxkk   1/1       Running   0          2h        x.x.x.x           etcd-1
cattle-node-agent-kzrlg   1/1       Running   0          2h        x.x.x.x           etcd-0
cattle-node-agent-nclz9   1/1       Running   0          2h        x.x.x.x           controlplane-0
cattle-node-agent-pwxp7   1/1       Running   0          2h        x.x.x.x           worker-0
cattle-node-agent-t5484   1/1       Running   0          2h        x.x.x.x           controlplane-1
cattle-node-agent-t8mtz   1/1       Running   0          2h        x.x.x.x           etcd-2
```

Check logging of a specific cattle-node-agent pod or all cattle-node-agent pods:

```
kubectl -n cattle-system logs -l app=cattle-agent
```

#### cattle-cluster-agent

Check if the cattle-cluster-agent pod is present in the cluster, has status **Running** and doesn't have a high count of Restarts:

```
kubectl -n cattle-system get pods -l app=cattle-cluster-agent -o wide
```

Example output:

```
NAME                                    READY     STATUS    RESTARTS   AGE       IP           NODE
cattle-cluster-agent-54d7c6c54d-ht9h4   1/1       Running   0          2h        x.x.x.x      worker-1
```

Check logging of cattle-cluster-agent pod:

```
kubectl -n cattle-system logs -l app=cattle-cluster-agent
```

# Jobs and Pods

### Check that pods or jobs have status **Running**/**Completed**

To check, run the command:

```
kubectl get pods --all-namespaces
```

If a pod is not in **Running** state, you can dig into the root cause by running:

### Describe pod

```
kubectl describe pod POD_NAME -n NAMESPACE
```

### Pod container logs

```
kubectl logs POD_NAME -n NAMESPACE
```

If a job is not in **Completed** state, you can dig into the root cause by running:

### Describe job

```
kubectl describe job JOB_NAME -n NAMESPACE
```

### Logs from the containers of pods of the job

```
kubectl logs -l job-name=JOB_NAME -n NAMESPACE
```

### Evicted pods

Pods can be evicted based on [eviction signals](https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/#eviction-policy).

Retrieve a list of evicted pods (podname and namespace):

```
kubectl get pods --all-namespaces -o go-template='{{range .items}}{{if eq .status.phase "Failed"}}{{if eq .status.reason "Evicted"}}{{.metadata.name}}{{" "}}{{.metadata.namespace}}{{"\n"}}{{end}}{{end}}{{end}}'
```

To delete all evicted pods:

```
kubectl get pods --all-namespaces -o go-template='{{range .items}}{{if eq .status.phase "Failed"}}{{if eq .status.reason "Evicted"}}{{.metadata.name}}{{" "}}{{.metadata.namespace}}{{"\n"}}{{end}}{{end}}{{end}}' | while read epod enamespace; do kubectl -n $enamespace delete pod $epod; done
```

Retrieve a list of evicted pods, scheduled node and the reason:

```
kubectl get pods --all-namespaces -o go-template='{{range .items}}{{if eq .status.phase "Failed"}}{{if eq .status.reason "Evicted"}}{{.metadata.name}}{{" "}}{{.metadata.namespace}}{{"\n"}}{{end}}{{end}}{{end}}' | while read epod enamespace; do kubectl -n $enamespace get pod $epod -o=custom-columns=NAME:.metadata.name,NODE:.spec.nodeName,MSG:.status.message; done
```

### Job does not complete

If you have enabled Istio, and you are having issues with a Job you deployed not completing, you will need to add an annotation to your pod using [these steps.]({{<baseurl>}}/rancher/v2.5/en/istio/setup/enable-istio-in-namespace)

Since Istio Sidecars run indefinitely, a Job cannot be considered complete even after its task has completed. This is a temporary workaround and will disable Istio for any traffic to/from the annotated Pod. Keep in mind this may not allow you to continue to use a Job for integration testing, as the Job will not have access to the service mesh.