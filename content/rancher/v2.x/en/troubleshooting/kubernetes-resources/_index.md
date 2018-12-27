---
title: Kubernetes resources
weight: 101
---

The commands/steps listed on this page can be used to check the most important Kubernetes resources and apply to [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) clusters.

Make sure you configured the correct kubeconfig (for example, `export KUBECONFIG=$PWD/kube_config_rancher-cluster.yml` for Rancher HA) or are using the embedded kubectl via the UI.

### Nodes

#### Get nodes

Run the command below and check the following:

- All nodes in your cluster should be listed, make sure there is not one missing.
- All nodes should have the **Ready** status (if not in **Ready** state, check the `kubelet` container logs on that node using `docker logs kubelet`)
- Check if all nodes report the correct version.
- Check if OS/Kernel/Docker values are shown as expected (possibly you can relate issues due to upgraded OS/Kernel/Docker)


```
kubectl get nodes
``` 

Example output:

```
NAME                              STATUS    ROLES          AGE       VERSION   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
etcd-0                            Ready     etcd           2m        v1.11.5   <none>        Ubuntu 16.04.5 LTS   4.4.0-138-generic   docker://17.3.2
etcd-1                            Ready     etcd           2m        v1.11.5   <none>        Ubuntu 16.04.5 LTS   4.4.0-138-generic   docker://17.3.2
etcd-2                            Ready     etcd           2m        v1.11.5   <none>        Ubuntu 16.04.5 LTS   4.4.0-138-generic   docker://17.3.2
controlplane-0                    Ready     controlplane   2m        v1.11.5   <none>        Ubuntu 16.04.5 LTS   4.4.0-138-generic   docker://17.3.2
controlplane-1                    Ready     controlplane   1m        v1.11.5   <none>        Ubuntu 16.04.5 LTS   4.4.0-138-generic   docker://17.3.2
worker-0                          Ready     worker         2m        v1.11.5   <none>        Ubuntu 16.04.5 LTS   4.4.0-138-generic   docker://17.3.2
worker-1                          Ready     worker         2m        v1.11.5   <none>        Ubuntu 16.04.5 LTS   4.4.0-138-generic   docker://17.3.2
```

#### Get node conditions

Run the command below to list nodes with [Node Conditions](https://kubernetes.io/docs/concepts/architecture/nodes/#condition) that are active that could prevent normal operation.

```
kubectl get nodes -o go-template='{{range .items}}{{$node := .}}{{range .status.conditions}}{{if ne .type "Ready"}}{{if eq .status "True"}}{{$node.metadata.name}}{{": "}}{{.type}}{{":"}}{{.status}}{{"\n"}}{{end}}{{end}}{{end}}{{end}}'
```

Example output:

```
worker-0: DiskPressure:True
```

### Ingress Controller

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

#### Pod details

```
kubectl -n ingress-nginx describe pods -l app=ingress-nginx
```

#### Pod container logs

```
kubectl -n ingress-nginx logs -l app=ingress-nginx
```

#### Namespace events

```
kubectl -n ingress-nginx get events
```

### Rancher agents

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

### Generic

#### All pods/jobs should have status **Running**/**Completed**

To check, run the command:

```
kubectl get pods --all-namespaces
```

If a pod is not in **Running** state, you can dig into the root cause by running:

##### Describe pod

```
kubectl describe pod POD_NAME -n NAMESPACE
```

##### Pod container logs

```
kubectl logs POD_NAME -n NAMESPACE
```

If a job is not in **Completed** state, you can dig into the root cause by running:

##### Describe job

```
kubectl describe job JOB_NAME -n NAMESPACE
```

##### Logs from the containers of pods of the job

```
kubectl logs -l job-name=JOB_NAME -n NAMESPACE
```

#### Evicted pods

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
