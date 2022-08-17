---
title: Imported clusters
weight: 105
---

The commands/steps listed on this page can be used to check clusters that you are importing or that are imported in Rancher.

Make sure you configured the correct kubeconfig (for example, `export KUBECONFIG=$PWD/kubeconfig_from_imported_cluster.yml`)

### Rancher agents

Communication to the cluster (Kubernetes API via cattle-cluster-agent) and communication to the nodes is done through Rancher agents.

If the cattle-cluster-agent cannot connect to the configured `server-url`, the cluster will remain in **Pending** state, showing `Waiting for full cluster configuration`. 

#### cattle-node-agent

> Note: Starting in Rancher 2.5 cattle-node-agents are only present in clusters created in Rancher with RKE.

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
