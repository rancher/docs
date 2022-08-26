---
title: Rancher HA
weight: 104
---

The commands/steps listed on this page can be used to check your Rancher Kubernetes Installation.

Make sure you configured the correct kubeconfig (for example, `export KUBECONFIG=$PWD/kube_config_rancher-cluster.yml`).

### Check Rancher pods

Rancher pods are deployed as a Deployment in the `cattle-system` namespace.

Check if the pods are running on all nodes:

```
kubectl -n cattle-system get pods -l app=rancher -o wide
```

Example output:

```
NAME                       READY   STATUS    RESTARTS   AGE   IP          NODE
rancher-7dbd7875f7-n6t5t   1/1     Running   0          8m    x.x.x.x     x.x.x.x
rancher-7dbd7875f7-qbj5k   1/1     Running   0          8m    x.x.x.x     x.x.x.x
rancher-7dbd7875f7-qw7wb   1/1     Running   0          8m    x.x.x.x     x.x.x.x
```

If a pod is unable to run (Status is not **Running**, Ready status is not showing `1/1` or you see a high count of Restarts), check the pod details, logs and namespace events.                                                                                                       

#### Pod details

```
kubectl -n cattle-system describe pods -l app=rancher
```

#### Pod container logs

```
kubectl -n cattle-system logs -l app=rancher
```

#### Namespace events

```
kubectl -n cattle-system get events
```

### Check ingress

Ingress should have the correct `HOSTS` (showing the configured FQDN) and `ADDRESS` (host address(es) it will be routed to).

```
kubectl -n cattle-system get ingress
```

Example output:

```
NAME      HOSTS                    ADDRESS                   PORTS     AGE
rancher   rancher.yourdomain.com   x.x.x.x,x.x.x.x,x.x.x.x   80, 443   2m
```

### Check ingress controller logs

When accessing your configured Rancher FQDN does not show you the UI, check the ingress controller logging to see what happens when you try to access Rancher:

```
kubectl -n ingress-nginx logs -l app=ingress-nginx
```

### Leader election

The leader is determined by a leader election process. After the leader has been determined, the leader (`holderIdentity`) is saved in the `cattle-controllers` ConfigMap (in this example, `rancher-7dbd7875f7-qbj5k`).

```
kubectl -n kube-system get configmap cattle-controllers -o jsonpath='{.metadata.annotations.control-plane\.alpha\.kubernetes\.io/leader}'
{"holderIdentity":"rancher-7dbd7875f7-qbj5k","leaseDurationSeconds":45,"acquireTime":"2019-04-04T11:53:12Z","renewTime":"2019-04-04T12:24:08Z","leaderTransitions":0}
```

