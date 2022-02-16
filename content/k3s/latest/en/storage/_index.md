---
title: "Volumes and Storage"
weight: 30
---

When deploying an application that needs to retain data, you’ll need to create persistent storage. Persistent storage allows you to store application data external from the pod running your application. This storage practice allows you to maintain application data, even if the application’s pod fails.

A persistent volume (PV) is a piece of storage in the Kubernetes cluster, while a persistent volume claim (PVC) is a request for storage. For details on how PVs and PVCs work, refer to the official Kubernetes documentation on [storage.](https://kubernetes.io/docs/concepts/storage/volumes/)

This page describes how to set up persistent storage with a local storage provider, or with [Longhorn.](#setting-up-longhorn)

# What's changed in K3s storage?

K3s removes several optional volume plugins and all built-in (sometimes referred to as "in-tree") cloud providers. We do this in order to achieve a smaller binary size and to avoid dependence on third-party cloud or data center technologies and services, which may not be available in many K3s use cases. We are able to do this because their removal affects neither core Kubernetes functionality nor conformance.

The following volume plugins have been removed from K3s:

* cephfs
* fc
* flocker
* git_repo
* glusterfs
* portworx
* quobyte
* rbd
* storageos

Both components have out-of-tree alternatives that can be used with K3s: The Kubernetes [Container Storage Interface (CSI)](https://github.com/container-storage-interface/spec/blob/master/spec.md) and [Cloud Provider Interface (CPI)](https://kubernetes.io/docs/tasks/administer-cluster/running-cloud-controller/).

Kubernetes maintainers are actively migrating in-tree volume plugins to CSI drivers. For more information on this migration, please refer [here](https://kubernetes.io/blog/2021/12/10/storage-in-tree-to-csi-migration-status-update/).

# Setting up the Local Storage Provider
K3s comes with Rancher's Local Path Provisioner and this enables the ability to create persistent volume claims out of the box using local storage on the respective node. Below we cover a simple example. For more information please reference the official documentation [here](https://github.com/rancher/local-path-provisioner/blob/master/README.md#usage).

Create a hostPath backed persistent volume claim and a pod to utilize it:

### pvc.yaml

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: local-path-pvc
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: local-path
  resources:
    requests:
      storage: 2Gi
```

### pod.yaml

```
apiVersion: v1
kind: Pod
metadata:
  name: volume-test
  namespace: default
spec:
  containers:
  - name: volume-test
    image: nginx:stable-alpine
    imagePullPolicy: IfNotPresent
    volumeMounts:
    - name: volv
      mountPath: /data
    ports:
    - containerPort: 80
  volumes:
  - name: volv
    persistentVolumeClaim:
      claimName: local-path-pvc
```

Apply the yaml:

```
kubectl create -f pvc.yaml
kubectl create -f pod.yaml
```

Confirm the PV and PVC are created:

```
kubectl get pv
kubectl get pvc
```

The status should be Bound for each.

# Setting up Longhorn

[comment]: <> (pending change - longhorn may support arm64 and armhf in the future.)

> **Note:** At this time Longhorn only supports amd64 and arm64 (experimental).

K3s supports [Longhorn](https://github.com/longhorn/longhorn). Longhorn is an open-source distributed block storage system for Kubernetes.

Below we cover a simple example. For more information, refer to the official documentation [here](https://github.com/longhorn/longhorn/blob/master/README.md).

Apply the longhorn.yaml to install Longhorn:

```
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/master/deploy/longhorn.yaml
```

Longhorn will be installed in the namespace `longhorn-system`.

Apply the yaml to create the PVC and pod:

```
kubectl create -f pvc.yaml
kubectl create -f pod.yaml
```

### pvc.yaml

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: longhorn-volv-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: longhorn
  resources:
    requests:
      storage: 2Gi
```

### pod.yaml

```
apiVersion: v1
kind: Pod
metadata:
  name: volume-test
  namespace: default
spec:
  containers:
  - name: volume-test
    image: nginx:stable-alpine
    imagePullPolicy: IfNotPresent
    volumeMounts:
    - name: volv
      mountPath: /data
    ports:
    - containerPort: 80
  volumes:
  - name: volv
    persistentVolumeClaim:
      claimName: longhorn-volv-pvc
```

Confirm the PV and PVC are created:

```
kubectl get pv
kubectl get pvc
```

The status should be Bound for each.
