---
title: Troubleshooting Controlplane Nodes
weight: 2
---

This section applies to nodes with the `controlplane` role.

# Check if the Controlplane Containers are Running

There are three specific containers launched on nodes with the `controlplane` role:

* `kube-apiserver`
* `kube-controller-manager`
* `kube-scheduler`

The containers should have status **Up**. The duration shown after **Up** is the time the container has been running.

```
docker ps -a -f=name='kube-apiserver|kube-controller-manager|kube-scheduler'
```

Example output:
```
CONTAINER ID        IMAGE                                COMMAND                  CREATED             STATUS              PORTS               NAMES
26c7159abbcc        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kube-apiserver
f3d287ca4549        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kube-scheduler
bdf3898b8063        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kube-controller-manager
```

# Controlplane Container Logging

:::note

If you added multiple nodes with the `controlplane` role, both `kube-controller-manager` and `kube-scheduler` use a leader election process to determine the leader. Only the current leader will log the performed actions. See [Kubernetes leader election](../other-troubleshooting-tips/kubernetes-resources.md#kubernetes-leader-election) how to retrieve the current leader.

:::

The logging of the containers can contain information on what the problem could be.

```
docker logs kube-apiserver
docker logs kube-controller-manager
docker logs kube-scheduler
```

# RKE2 Server Logging

If Rancher provisions an RKE2 cluster that can't communicate with Rancher, you can run this command on a server node in the downstream cluster to get the RKE2 server logs:

```
journalctl -u rke2-server -f
```