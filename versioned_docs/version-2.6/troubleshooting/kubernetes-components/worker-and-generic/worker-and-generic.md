---
title: Troubleshooting Worker Nodes and Generic Components
weight: 4
---

This section applies to every node as it includes components that run on nodes with any role.

# Check if the Containers are Running

There are two specific containers launched on nodes with the `worker` role:

* kubelet
* kube-proxy

The containers should have status `Up`. The duration shown after `Up` is the time the container has been running.

```
docker ps -a -f=name='kubelet|kube-proxy'
```

Example output:
```
CONTAINER ID        IMAGE                                COMMAND                  CREATED             STATUS              PORTS               NAMES
158d0dcc33a5        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kube-proxy
a30717ecfb55        rancher/hyperkube:v1.11.5-rancher1   "/opt/rke-tools/en..."   3 hours ago         Up 3 hours                              kubelet
```

# Container Logging

The logging of the containers can contain information on what the problem could be.

```
docker logs kubelet
docker logs kube-proxy
```
